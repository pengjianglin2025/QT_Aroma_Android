const APP_OTA_CMDWORD = '30'
const APP_OTA_QUERY_INFO = '00'
const APP_OTA_ENTER_BOOT = '01'

const OTA_CMD_CONN_PARAM_UPDATE = 1
const OTA_CMD_MTU_UPDATE = 2
const OTA_CMD_VERSION = 3
const OTA_CMD_CREATE_OTA_SETTING = 4
const OTA_CMD_CREATE_OTA_IMAGE = 5
const OTA_CMD_VALIDATE_OTA_IMAGE = 6
const OTA_CMD_ACTIVATE_OTA_IMAGE = 7

export const OTA_COMMANDS = {
  APP_OTA_CMDWORD,
  APP_OTA_QUERY_INFO,
  APP_OTA_ENTER_BOOT,
  OTA_CMD_CONN_PARAM_UPDATE,
  OTA_CMD_MTU_UPDATE,
  OTA_CMD_VERSION,
  OTA_CMD_CREATE_OTA_SETTING,
  OTA_CMD_CREATE_OTA_IMAGE,
  OTA_CMD_VALIDATE_OTA_IMAGE,
  OTA_CMD_ACTIVATE_OTA_IMAGE,
}

const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c >>> 0
  }
  return table
})()

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function ab2hex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), bit => ('00' + bit.toString(16)).slice(-2))
    .join('')
}

export function hexToArrayBuffer(hex) {
  const typedArray = new Uint8Array(
    hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16))
  )
  return typedArray.buffer
}

export function bytesToHex(bytes) {
  return Array.prototype.map.call(bytes, bit => ('00' + bit.toString(16)).slice(-2)).join('')
}

export function u32ToBytes(value) {
  return new Uint8Array([
    (value >>> 24) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 8) & 0xff,
    value & 0xff,
  ])
}

export function concatUint8Arrays(parts) {
  const total = parts.reduce((sum, item) => sum + item.length, 0)
  const merged = new Uint8Array(total)
  let offset = 0
  parts.forEach(item => {
    merged.set(item, offset)
    offset += item.length
  })
  return merged
}

export function parseAppOtaResponse(buffer) {
  const hex = ab2hex(buffer).toLowerCase()
  if (!hex.startsWith('55aa0030')) {
    return null
  }
  const len = parseInt(hex.substring(8, 12), 16)
  const dataHex = hex.substring(12, 12 + len * 2)
  if (!dataHex) {
    return null
  }
  const bytes = new Uint8Array(hexToArrayBuffer(dataHex))
  return {
    subcmd: bytes[0],
    status: bytes[1],
    bytes,
    hex,
  }
}

export function parseDfuCcResponse(buffer) {
  const bytes = new Uint8Array(buffer)
  if (!bytes.length) {
    return null
  }
  return {
    cmd: bytes[0],
    status: bytes.length > 1 ? bytes[1] : 0,
    bytes,
    hex: ab2hex(buffer),
  }
}

export function parseConfigText(text) {
  const config = {
    app1: { startAddress: 0, version: 0, size: 0 },
    app2: { startAddress: 0, version: 0, size: 0 },
    imageUpdate: { startAddress: 0, version: 0, size: 0 },
  }
  text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .forEach(line => {
      const parts = line.split(':')
      if (parts.length < 2) {
        return
      }
      const key = parts[0].trim()
      const raw = parts.slice(1).join(':').trim()
      const value = parseInt(raw, 16) >>> 0
      switch (key) {
        case 'APP1_START_ADDRESS':
          config.app1.startAddress = value
          break
        case 'APP1_VERSION':
          config.app1.version = value
          break
        case 'APP1_SIZE':
          config.app1.size = value
          break
        case 'APP2_START_ADDRESS':
          config.app2.startAddress = value
          break
        case 'APP2_VERSION':
          config.app2.version = value
          break
        case 'APP2_SIZE':
          config.app2.size = value
          break
        case 'IMAGE_UPDATE_START_ADDRESS':
          config.imageUpdate.startAddress = value
          break
        case 'IMAGE_UPDATE_VERSION':
          config.imageUpdate.version = value
          break
        case 'IMAGE_UPDATE_SIZE':
          config.imageUpdate.size = value
          break
        default:
          break
      }
    })
  return config
}

export function crc32FromUint8Array(data) {
  let crc = 0xffffffff
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function javaByteArrayToUint8Array(byteArray) {
  const length = byteArray.length
  const data = new Uint8Array(length)
  for (let i = 0; i < length; i++) {
    let value = byteArray[i]
    if (value < 0) {
      value += 256
    }
    data[i] = value
  }
  return data
}

function uint8ArrayToText(data) {
  let text = ''
  for (let i = 0; i < data.length; i++) {
    text += String.fromCharCode(data[i])
  }
  return text
}

export function readOtaZipPackage(zipPath) {
  return new Promise((resolve, reject) => {
    try {
      if (typeof plus === 'undefined' || !plus.android) {
        reject(new Error('仅支持在 App 端读取 OTA 压缩包'))
        return
      }
      const ZipFile = plus.android.importClass('java.util.zip.ZipFile')
      const ByteArrayOutputStream = plus.android.importClass('java.io.ByteArrayOutputStream')
      const zipFile = new ZipFile(zipPath)
      const entries = zipFile.entries()
      const files = {}
      while (entries.hasMoreElements()) {
        const entry = entries.nextElement()
        if (entry.isDirectory()) {
          continue
        }
        const inputStream = zipFile.getInputStream(entry)
        const outputStream = new ByteArrayOutputStream()
        const buffer = plus.android.newArray('byte', 4096)
        let size = inputStream.read(buffer)
        while (size !== -1) {
          outputStream.write(buffer, 0, size)
          size = inputStream.read(buffer)
        }
        const javaBytes = outputStream.toByteArray()
        files[entry.getName()] = javaByteArrayToUint8Array(javaBytes)
        inputStream.close()
        outputStream.close()
      }
      zipFile.close()
      const dfuSetting = files['dfu_setting.dat']
      const configTextFile = files['config.txt']
      if (!dfuSetting || !configTextFile) {
        reject(new Error('OTA 压缩包缺少 dfu_setting.dat 或 config.txt'))
        return
      }
      const config = parseConfigText(uint8ArrayToText(configTextFile))
      resolve({
        path: zipPath,
        files,
        dfuSetting,
        config,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function buildAppOtaPayload(subcmd) {
  return {
    cmdWord: APP_OTA_CMDWORD,
    dataHex: subcmd,
  }
}

export function buildDfuVersionCommand(config) {
  return concatUint8Arrays([
    new Uint8Array([OTA_CMD_VERSION]),
    u32ToBytes(config.app1.size || 0),
    u32ToBytes(config.app2.size || 0),
    u32ToBytes(config.imageUpdate.size || 0),
    u32ToBytes(config.imageUpdate.version || 0),
  ])
}

export function buildCreateSettingCommand(size) {
  return concatUint8Arrays([
    new Uint8Array([OTA_CMD_CREATE_OTA_SETTING]),
    u32ToBytes(size),
  ])
}

export function buildCreateImageCommand(offset, size, crc) {
  return concatUint8Arrays([
    new Uint8Array([OTA_CMD_CREATE_OTA_IMAGE]),
    u32ToBytes(offset),
    u32ToBytes(size),
    u32ToBytes(crc),
  ])
}

export function buildSimpleDfuCommand(cmd) {
  return new Uint8Array([cmd])
}

export function getSelectionImagePackage(selection, otaPackage) {
  if (selection === 1 && otaPackage.files['APP1.bin']) {
    return {
      key: 'APP1.bin',
      data: otaPackage.files['APP1.bin'],
      meta: otaPackage.config.app1,
      label: 'APP1',
    }
  }
  if (selection === 2 && otaPackage.files['APP2.bin']) {
    return {
      key: 'APP2.bin',
      data: otaPackage.files['APP2.bin'],
      meta: otaPackage.config.app2,
      label: 'APP2',
    }
  }
  if (selection === 3 && otaPackage.files['ImageUpdate.bin']) {
    return {
      key: 'ImageUpdate.bin',
      data: otaPackage.files['ImageUpdate.bin'],
      meta: otaPackage.config.imageUpdate,
      label: 'ImageUpdate',
    }
  }
  return null
}

