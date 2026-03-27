<template>
  <view class="ota-page">
    <view class="page-title">
      <image class="back-icon" src="/static/back.png" @click="back"></image>
      <view class="title-text">固件升级</view>
    </view>

    <!-- 设备信息卡片 -->
    <view class="card" v-if="deviceInfo">
      <view class="card-title">设备信息</view>
      <view class="info-row">
        <text class="info-label">当前Bank</text>
        <text class="info-value">APP{{ deviceInfo.bankId }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">固件版本</text>
        <text class="info-value">{{ fmtVersion(deviceInfo.appVersion) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">升级包版本</text>
        <text class="info-value">{{ fmtVersion(deviceInfo.imageVersion) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">升级包状态</text>
        <text class="info-value" :style="deviceInfo.activated ? 'color:#01CBA5' : 'color:#999'">
          {{ deviceInfo.activated ? '已就绪' : '无' }}
        </text>
      </view>
    </view>

    <!-- 升级包选择 -->
    <view class="card">
      <view class="card-title">选择升级包</view>
      <view class="file-row" @click="chooseZip" v-if="!zipPath">
        <image src="/static/images/add.png" mode="aspectFit" style="width:40rpx;height:40rpx;"></image>
        <text class="file-hint">点击选择 .zip 固件包</text>
      </view>
      <view class="file-row selected" v-else>
        <text class="file-name">{{ zipName }}</text>
        <text class="file-change" @click="chooseZip">重新选择</text>
      </view>

      <view v-if="otaPackage" style="margin-top:20rpx;">
        <view class="info-row">
          <text class="info-label">包含 APP1</text>
          <text class="info-value">{{ otaPackage.config.app1.size ? fmtSize(otaPackage.config.app1.size) : '-' }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">包含 APP2</text>
          <text class="info-value">{{ otaPackage.config.app2.size ? fmtSize(otaPackage.config.app2.size) : '-' }}</text>
        </view>
        <view class="info-row">
          <text class="info-label">包含 ImageUpdate</text>
          <text class="info-value">{{ otaPackage.config.imageUpdate.size ? fmtSize(otaPackage.config.imageUpdate.size) : '-' }}</text>
        </view>
      </view>
    </view>

    <!-- 升级镜像选择 -->
    <view class="card" v-if="otaPackage">
      <view class="card-title">升级目标</view>
      <view class="target-row" v-if="otaPackage.files['APP1.bin']" @click="targetSelection = 1">
        <view class="radio" :class="targetSelection === 1 ? 'radio-active' : ''"></view>
        <text>APP1（v{{ fmtVersion(otaPackage.config.app1.version) }}）</text>
      </view>
      <view class="target-row" v-if="otaPackage.files['APP2.bin']" @click="targetSelection = 2">
        <view class="radio" :class="targetSelection === 2 ? 'radio-active' : ''"></view>
        <text>APP2（v{{ fmtVersion(otaPackage.config.app2.version) }}）</text>
      </view>
      <view class="target-row" v-if="otaPackage.files['ImageUpdate.bin']" @click="targetSelection = 3">
        <view class="radio" :class="targetSelection === 3 ? 'radio-active' : ''"></view>
        <text>ImageUpdate（v{{ fmtVersion(otaPackage.config.imageUpdate.version) }}）</text>
      </view>
    </view>

    <!-- 进度 -->
    <view class="card" v-if="phase !== 'idle'">
      <view class="card-title">升级进度</view>
      <view class="phase-text">{{ phaseText }}</view>
      <view class="progress-bar-bg" v-if="progress > 0">
        <view class="progress-bar-fill" :style="'width:' + progress + '%'"></view>
      </view>
      <view class="progress-pct" v-if="progress > 0">{{ progress }}%</view>
      <view class="log-box">
        <text class="log-line" v-for="(line, i) in logLines" :key="i">{{ line }}</text>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="btn-area">
      <button class="query-btn" @click="queryDeviceInfo" :disabled="phase !== 'idle'">
        查询设备信息
      </button>
      <button
        class="upgrade-btn"
        @click="startUpgrade"
        :disabled="!canUpgrade"
        :style="canUpgrade ? '' : 'opacity:0.5'"
      >
        开始升级
      </button>
    </view>
  </view>
</template>

<script>
import {
  readOtaZipPackage,
  buildAppOtaPayload,
  getSelectionImagePackage,
  buildDfuVersionCommand,
  buildCreateSettingCommand,
  buildCreateImageCommand,
  buildSimpleDfuCommand,
  crc32FromUint8Array,
  concatUint8Arrays,
  bytesToHex,
  ab2hex,
  hexToArrayBuffer,
  sleep,
  OTA_COMMANDS,
} from '@/utils/ota.js'

// DFU BLE 服务 UUID（NS_IUS / Bootloader 阶段使用）
const DFU_SERVICE_UUID        = '0000FF10-0000-1000-8000-00805F9B34FB'
const DFU_WRITE_UUID          = '0000FF11-0000-1000-8000-00805F9B34FB'
const DFU_NOTIFY_UUID         = '0000FF12-0000-1000-8000-00805F9B34FB'
const DFU_CCCD_UUID           = '00002902-0000-1000-8000-00805F9B34FB'

// App 协议 BLE 服务（正常连接阶段使用）
const APP_SERVICE_UUID        = '0000FFF0-0000-1000-8000-00805F9B34FB'
const APP_WRITE_UUID          = '0000FFF2-0000-1000-8000-00805F9B34FB'
const APP_NOTIFY_UUID         = '0000FFF1-0000-1000-8000-00805F9B34FB'

const CHUNK_SIZE = 128   // 每包 128 字节

export default {
  data() {
    return {
      bleDeviceId: '',    // 正常模式下设备 ID
      dfuDeviceId: '',    // bootloader 广播后扫描到的设备 ID
      deviceInfo: null,   // 查询到的 OTA 信息
      zipPath: '',
      zipName: '',
      otaPackage: null,
      targetSelection: 0,
      phase: 'idle',      // idle | querying | entering | scanning | uploading | done | error
      progress: 0,
      logLines: [],
    }
  },
  computed: {
    phaseText() {
      const map = {
        idle: '',
        querying: '正在查询设备信息...',
        entering: '正在进入 Bootloader...',
        scanning: '正在扫描 DFU 设备...',
        uploading: '正在传输固件...',
        done: '升级完成！设备重启中...',
        error: '升级失败，请重试',
      }
      return map[this.phase] || ''
    },
    canUpgrade() {
      return this.phase === 'idle' && !!this.otaPackage && this.targetSelection > 0
    },
  },
  onLoad(e) {
    this.bleDeviceId = e.deviceId || ''
    console.log('[OTA] onLoad bleDeviceId:', this.bleDeviceId)
  },
  onShow() {
    // 每次页面显示时重新使能 APP Notify，确保 Android 端通知能到达本页面监听器
    if (!this.bleDeviceId) return
    uni.notifyBLECharacteristicValueChange({
      deviceId: this.bleDeviceId,
      serviceId: APP_SERVICE_UUID,
      characteristicId: APP_NOTIFY_UUID,
      state: true,
      success: () => console.log('[OTA] APP notify 使能成功'),
      fail: (e) => console.warn('[OTA] APP notify 使能失败:', JSON.stringify(e)),
    })
  },
  onUnload() {
    this.stopDfuScan()
  },
  methods: {
    back() {
      uni.navigateBack()
    },

    log(msg) {
      const time = new Date().toTimeString().slice(0, 8)
      this.logLines = [...this.logLines.slice(-49), `[${time}] ${msg}`]
    },

    fmtVersion(v) {
      if (!v) return '0.0.0'
      const major = (v >>> 24) & 0xFF
      const minor = (v >>> 16) & 0xFF
      const patch = v & 0xFFFF
      return `${major}.${minor}.${patch}`
    },

    fmtSize(bytes) {
      return (bytes / 1024).toFixed(1) + ' KB'
    },

    // ── 协议帧编码 ──────────────────────────────────────────────────────────
    buildAppFrame(cmdWord, payload) {
      const len = payload ? payload.length : 0
      const frame = new Uint8Array(7 + len)
      frame[0] = 0x55
      frame[1] = 0xAA
      frame[2] = 0x00            // RECEIVE_VERSION: MCU expects 0x00 from app
      frame[3] = parseInt(cmdWord, 16)
      frame[4] = (len >> 8) & 0xFF
      frame[5] = len & 0xFF
      if (payload) frame.set(payload, 6)
      let sum = 0
      for (let i = 0; i < 6 + len; i++) sum += frame[i]
      frame[6 + len] = sum & 0xFF
      return frame.buffer
    },

    // ── 写 BLE 特征值 ──────────────────────────────────────────────────────
    writeBle(deviceId, serviceId, charId, buffer) {
      return new Promise((resolve, reject) => {
        uni.writeBLECharacteristicValue({
          deviceId,
          serviceId,
          characteristicId: charId,
          value: buffer,
          success: (res) => { console.log('[OTA] writeBLE ok', charId); resolve(res) },
          fail: (err) => { console.error('[OTA] writeBLE fail', charId, JSON.stringify(err)); reject(err) },
        })
      })
    },

    // ── 发送 App 协议帧（0x30 命令）────────────────────────────────────────
    sendAppOtaCmd(subcmdHex) {
      const payload = new Uint8Array([parseInt(subcmdHex, 16)])
      const buf = this.buildAppFrame(OTA_COMMANDS.APP_OTA_CMDWORD, payload)
      const hexStr = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')
      console.log('[OTA] sendAppOtaCmd subcmd=' + subcmdHex + ' frame=' + hexStr + ' devId=' + this.bleDeviceId)
      return this.writeBle(this.bleDeviceId, APP_SERVICE_UUID, APP_WRITE_UUID, buf)
    },

    // ── 使能 APP Notify（每次查询前调用，确保连接后 notify 有效）──────────
    enableAppNotify() {
      return new Promise((resolve) => {
        uni.notifyBLECharacteristicValueChange({
          deviceId: this.bleDeviceId,
          serviceId: APP_SERVICE_UUID,
          characteristicId: APP_NOTIFY_UUID,
          state: true,
          success: () => { console.log('[OTA] APP notify 使能成功'); resolve() },
          fail: (e) => { console.warn('[OTA] APP notify 使能失败:', JSON.stringify(e)); resolve() },
        })
      })
    },

    // ── 查询设备 OTA 信息 ──────────────────────────────────────────────────
    async queryDeviceInfo() {
      if (this.phase !== 'idle') return
      this.phase = 'querying'
      this.deviceInfo = null
      this.logLines = []
      this.log('使能通知...')
      await this.enableAppNotify()
      await sleep(300)
      this.log('发送查询指令 0x30/0x00')

      try {
        const rsp = await this.sendCmdWaitReply(
          OTA_COMMANDS.APP_OTA_QUERY_INFO,
          3000
        )
        console.log('[OTA] sendCmdWaitReply returned, subcmd=' + (rsp && rsp.subcmd) + ' status=' + (rsp && rsp.status))
        if (!rsp || rsp.subcmd !== 0x00 || rsp.status !== 0x00) {
          throw new Error(`查询失败: ${JSON.stringify(rsp)}`)
        }
        // bytes[2]=协议版本 bytes[3]=bankId bytes[4-7]=appAddr bytes[8-11]=appVer bytes[12-15]=imgVer bytes[16]=activated
        const b = rsp.bytes
        this.deviceInfo = {
          protoVersion: b[2],
          bankId: b[3],
          appAddress: (b[4] << 24) | (b[5] << 16) | (b[6] << 8) | b[7],
          appVersion: (b[8] << 24) | (b[9] << 16) | (b[10] << 8) | b[11],
          imageVersion: (b[12] << 24) | (b[13] << 16) | (b[14] << 8) | b[15],
          activated: b[16] === 1,
        }
        console.log('[OTA] deviceInfo set:', JSON.stringify(this.deviceInfo))
        this.log(`Bank=${this.deviceInfo.bankId} AppVer=${this.fmtVersion(this.deviceInfo.appVersion)}`)
        uni.showToast({ title: '查询成功', icon: 'success' })
      } catch (e) {
        console.error('[OTA] queryDeviceInfo error:', String(e))
        this.log('查询失败: ' + String(e))
        uni.showToast({ title: '查询失败', icon: 'none' })
      } finally {
        this.phase = 'idle'
      }
    },

    // ── 等待 BLE Notify 回复 ───────────────────────────────────────────────
    sendCmdWaitReply(subcmdHex, timeout = 5000) {
      return new Promise(async (resolve, reject) => {
        let solved = false

        // uni.offBLECharacteristicValueChange 在 uni-app Android 上不存在，用 solved 标志代替去重
        const offHandler = () => {}

        const timer = setTimeout(() => {
          if (solved) return
          solved = true
          offHandler()
          reject(new Error('等待回复超时'))
        }, timeout)

        const handler = (res) => {
          const hex = ab2hex(res.value).toLowerCase()
          console.log('[OTA] notify dev=' + res.deviceId + ' hex=' + hex)
          if (res.deviceId !== this.bleDeviceId) {
            console.log('[OTA] notify ignored: devId mismatch, expect=' + this.bleDeviceId)
            return
          }
          if (!hex.startsWith('55aa') || hex.substring(6, 8) !== '30') {
            console.log('[OTA] notify ignored: not OTA cmd (hex[6:8]=' + hex.substring(6,8) + ')')
            return
          }
          const len = parseInt(hex.substring(8, 12), 16)
          const dataHex = hex.substring(12, 12 + len * 2)
          if (!dataHex) { console.log('[OTA] notify: empty dataHex'); return }
          const bytes = new Uint8Array(hexToArrayBuffer(dataHex))
          console.log('[OTA] notify: subcmd=' + bytes[0].toString(16) + ' status=' + bytes[1])
          if (bytes[0] !== parseInt(subcmdHex, 16)) {
            console.log('[OTA] notify: subcmd mismatch, expect=' + subcmdHex)
            return
          }
          if (solved) return
          solved = true
          clearTimeout(timer)
          offHandler()
          console.log('[OTA] notify: resolving promise...')
          resolve({ subcmd: bytes[0], status: bytes[1], bytes })
        }

        uni.onBLECharacteristicValueChange(handler)
        try {
          await this.sendAppOtaCmd(subcmdHex)
        } catch (e) {
          if (solved) return
          solved = true
          clearTimeout(timer)
          offHandler()
          reject(e)
        }
      })
    },

    // ── 选择 ZIP 包 ────────────────────────────────────────────────────────
    chooseZip() {
      uni.chooseFile({
        count: 1,
        extension: ['.zip'],
        success: async (res) => {
          const filePath = res.tempFilePaths[0]
          this.zipPath = filePath
          this.zipName = filePath.split('/').pop()
          this.otaPackage = null
          this.targetSelection = 0
          try {
            uni.showLoading({ title: '解析中...' })
            const pkg = await readOtaZipPackage(filePath)
            this.otaPackage = pkg
            this.log(`ZIP 解析成功，包含 ${Object.keys(pkg.files).join(', ')}`)
            // 默认选非空的那个镜像
            if (pkg.files['APP1.bin'] && pkg.config.app1.size) this.targetSelection = 1
            else if (pkg.files['APP2.bin'] && pkg.config.app2.size) this.targetSelection = 2
            else if (pkg.files['ImageUpdate.bin'] && pkg.config.imageUpdate.size) this.targetSelection = 3
          } catch (e) {
            this.log('ZIP 解析失败: ' + e.message)
            uni.showToast({ title: '解析失败', icon: 'none' })
          } finally {
            uni.hideLoading()
          }
        },
        fail: () => {}
      })
    },

    // ── 开始 OTA 升级主流程 ────────────────────────────────────────────────
    async startUpgrade() {
      if (!this.canUpgrade) return
      const imgPkg = getSelectionImagePackage(this.targetSelection, this.otaPackage)
      if (!imgPkg) {
        uni.showToast({ title: '所选镜像不存在', icon: 'none' })
        return
      }

      const confirmed = await new Promise(resolve =>
        uni.showModal({
          title: '确认升级',
          content: `将升级 ${imgPkg.label}，设备会重启，是否继续？`,
          success: res => resolve(res.confirm),
        })
      )
      if (!confirmed) return

      this.logLines = []
      this.progress = 0

      try {
        // Step 1: 进入 Bootloader
        await this.stepEnterBootloader()
        // Step 2: 等待 DFU 广播并连接
        await this.stepScanAndConnectDfu()
        // Step 3: 传输固件
        await this.stepTransferFirmware(imgPkg)
        // Step 4: 激活
        await this.stepActivate()

        this.phase = 'done'
        this.progress = 100
        this.log('升级完成！')
        uni.showModal({ title: '升级成功', content: '设备正在重启，请稍后重新连接', showCancel: false })
      } catch (e) {
        this.phase = 'error'
        this.log('升级失败: ' + (e.message || e))
        uni.showToast({ title: '升级失败', icon: 'none' })
      }
    },

    // ── Step 1: 发送 EnterBoot 命令 ────────────────────────────────────────
    async stepEnterBootloader() {
      this.phase = 'entering'
      this.log('发送进入 Bootloader 命令 0x30/0x01')
      const rsp = await this.sendCmdWaitReply(OTA_COMMANDS.APP_OTA_ENTER_BOOT, 5000)
      if (!rsp || rsp.status !== 0x00) {
        throw new Error(`EnterBoot 响应异常: status=${rsp ? rsp.status : 'null'}`)
      }
      this.log('设备正在进入 Bootloader，等待断线...')
      await sleep(3000)  // 等待设备断开 BLE 并重启 Bootloader
    },

    // ── Step 2: 扫描 DFU 设备 ─────────────────────────────────────────────
    stepScanAndConnectDfu() {
      this.phase = 'scanning'
      this.log('开始扫描 DFU 设备...')
      return new Promise((resolve, reject) => {
        let found = false
        const scanTimeout = setTimeout(() => {
          this.stopDfuScan()
          if (!found) reject(new Error('扫描 DFU 设备超时（30s）'))
        }, 30000)

        uni.startBluetoothDevicesDiscovery({
          services: [DFU_SERVICE_UUID],
          allowDuplicatesKey: false,
        })

        uni.onBluetoothDeviceFound((res) => {
          const dev = res.devices[0]
          if (!dev) return
          const name = dev.name || dev.localName || ''
          this.log(`扫描到: ${name} (${dev.deviceId})`)
          // DFU 模式下设备广播名通常含 'DFU' 或与原 BLE 名相关
          if (name.toUpperCase().includes('DFU') || name.toUpperCase().includes('NS') || name.includes('BT-ivy')) {
            found = true
            clearTimeout(scanTimeout)
            this.stopDfuScan()
            this.dfuDeviceId = dev.deviceId
            this.log(`连接 DFU 设备: ${dev.deviceId}`)
            this.connectDfuDevice(dev.deviceId).then(resolve).catch(reject)
          }
        })
      })
    },

    stopDfuScan() {
      uni.stopBluetoothDevicesDiscovery()
    },

    connectDfuDevice(deviceId) {
      return new Promise((resolve, reject) => {
        uni.createBLEConnection({
          deviceId,
          timeout: 10000,
          success: async () => {
            this.log('DFU BLE 已连接，发现服务...')
            await sleep(1000)
            // 使能 DFU Notify
            uni.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId: DFU_SERVICE_UUID,
              characteristicId: DFU_NOTIFY_UUID,
              state: true,
              success: () => { this.log('DFU Notify 已使能'); resolve() },
              fail: reject,
            })
          },
          fail: reject,
        })
      })
    },

    // ── Step 3: 传输固件 ───────────────────────────────────────────────────
    async stepTransferFirmware(imgPkg) {
      this.phase = 'uploading'
      const deviceId = this.dfuDeviceId
      const data = imgPkg.data         // Uint8Array
      const meta = imgPkg.meta         // { startAddress, version, size }
      const dfuSetting = this.otaPackage.dfuSetting

      // 3a: 发送版本信息
      this.log('发送版本信息...')
      const verCmd = buildDfuVersionCommand(this.otaPackage.config)
      await this.writeDfu(deviceId, verCmd.buffer)
      await sleep(200)

      // 3b: 发送 DFU Setting
      this.log(`发送 DFU Setting (${dfuSetting.length} bytes)...`)
      const settingCmd = buildCreateSettingCommand(dfuSetting.length)
      await this.writeDfu(deviceId, settingCmd.buffer)
      await sleep(200)
      await this.sendChunked(deviceId, dfuSetting)

      // 3c: 发送固件镜像
      const crc = crc32FromUint8Array(data)
      this.log(`发送固件 ${imgPkg.label} (${data.length} bytes, CRC=0x${crc.toString(16).toUpperCase()})...`)
      const imageCmd = buildCreateImageCommand(meta.startAddress, data.length, crc)
      await this.writeDfu(deviceId, imageCmd.buffer)
      await sleep(200)
      await this.sendChunked(deviceId, data, true)
    },

    writeDfu(deviceId, buffer) {
      return this.writeBle(deviceId, DFU_SERVICE_UUID, DFU_WRITE_UUID, buffer)
    },

    async sendChunked(deviceId, data, trackProgress = false) {
      const total = data.length
      let offset = 0
      while (offset < total) {
        const chunk = data.slice(offset, offset + CHUNK_SIZE)
        await this.writeDfu(deviceId, chunk.buffer)
        offset += chunk.length
        if (trackProgress) {
          this.progress = Math.round(offset / total * 90)  // 留 10% 给激活步骤
        }
        await sleep(20)
      }
    },

    // ── Step 4: 激活 ──────────────────────────────────────────────────────
    async stepActivate() {
      this.log('验证并激活固件...')
      const validateCmd = buildSimpleDfuCommand(OTA_COMMANDS.OTA_CMD_VALIDATE_OTA_IMAGE)
      await this.writeDfu(this.dfuDeviceId, validateCmd.buffer)
      await sleep(500)
      const activateCmd = buildSimpleDfuCommand(OTA_COMMANDS.OTA_CMD_ACTIVATE_OTA_IMAGE)
      await this.writeDfu(this.dfuDeviceId, activateCmd.buffer)
      this.log('激活指令已发送')
      await sleep(1000)
    },
  },
}
</script>

<style scoped>
.ota-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60rpx;
}
.page-title {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 80rpx 30rpx 30rpx;
}
.back-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
.title-text {
  font-size: 36rpx;
  font-weight: bold;
}
.card {
  background: #fff;
  margin: 20rpx 24rpx;
  border-radius: 16rpx;
  padding: 24rpx;
}
.card-title {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 16rpx;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 30rpx;
}
.info-label { color: #333; }
.info-value { color: #666; }
.file-row {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border: 2rpx dashed #ccc;
  border-radius: 12rpx;
  justify-content: center;
}
.file-row.selected {
  border-color: #01CBA5;
  border-style: solid;
  justify-content: space-between;
}
.file-hint { color: #999; font-size: 28rpx; margin-left: 16rpx; }
.file-name { color: #333; font-size: 28rpx; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-change { color: #01CBA5; font-size: 26rpx; margin-left: 20rpx; flex-shrink: 0; }
.target-row {
  display: flex;
  align-items: center;
  padding: 18rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 30rpx;
}
.radio {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #ccc;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.radio-active {
  background: #01CBA5;
  border-color: #01CBA5;
}
.phase-text {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 16rpx;
}
.progress-bar-bg {
  height: 16rpx;
  background: #eee;
  border-radius: 8rpx;
  margin-bottom: 10rpx;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: #01CBA5;
  border-radius: 8rpx;
  transition: width 0.3s;
}
.progress-pct {
  font-size: 26rpx;
  color: #01CBA5;
  text-align: right;
  margin-bottom: 16rpx;
}
.log-box {
  background: #1a1a1a;
  border-radius: 12rpx;
  padding: 16rpx;
  max-height: 300rpx;
  overflow-y: auto;
}
.log-line {
  display: block;
  font-size: 22rpx;
  color: #aaffaa;
  font-family: monospace;
  line-height: 1.6;
}
.btn-area {
  padding: 20rpx 24rpx 0;
  display: flex;
  gap: 20rpx;
}
.query-btn {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  background: #fff;
  border: 2rpx solid #01CBA5;
  color: #01CBA5;
  border-radius: 44rpx;
  font-size: 30rpx;
}
.upgrade-btn {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  background: linear-gradient(to right, #01CBA5, #00AD8D);
  color: #fff;
  border-radius: 44rpx;
  font-size: 30rpx;
  border: none;
}
</style>
