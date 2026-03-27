<template>
	<view class="device-shell">
		<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" right-icon="gear" :title="devName" @clickLeft="back" @clickRight="navitoSet"/>
		<view v-if="warring" class="no-oil">
			<!-- 缂烘补 -->{{$t('com.starvation')}}
		</view>
		<view class="ttip" v-if="oilParamsReady && funEntity.oilState != 0 && parameterMode != 0">
			<text>{{$t('estimated-use-time')}}:{{oilEntity.useDay}}{{$t('com.day')}} </text>
		</view>
		<view class="timg">
			<view style="position: relative;">
				<image src="/static/images/timebg.png" mode="heightFix" style="height:340rpx;"></image>
				<view v-if="modeParamsReady && parameterMode==1">
					<view class="tcon" style="font-size: 42rpx;" v-if="curModeMsg.btime&&curModeMsg.etime">
						<view v-if="is24hour">
							<div>{{curModeMsg.btime}}</div>
							<div>-</div>
							<div>{{curModeMsg.etime}}</div>
						</view>
						<view v-else>
							<div>{{change12H(curModeMsg.btime)}}{{Number(curModeMsg.btime.split(':')[0]) <12? 'AM':'PM'}}</div>
							<div>-</div>
							<div>{{change12H(curModeMsg.etime)}}{{Number(curModeMsg.etime.split(':')[0]) <12? 'AM':'PM'}}</div>
						</view>
					</view>
				</view>
				<view v-else class="tcon">
					<div>{{runtimeParamsReady ? simpleModeLabel : '-'}}</div>
					<div style="margin-top: 16rpx;font-size: 42rpx;font-weight: bold;">{{runtimeParamsReady ? timeFormat(simpleMode) : '-'}}</div>
				</view>
			</view>
			<!-- <view v-if="parameterMode==1" class="flex justify-center" style="font-size: 28rpx;margin-top: 48rpx;"> -->
			<view class="flex justify-center" style="font-size: 28rpx;margin-top: 48rpx;">
				<div class="modetimes" :style="{borderRadius: '30rpx 0 0 30rpx',color:currentState==1? '#fff':'#000',backgroundColor:currentState==1? '#00BD54':'#F1F1F1'}">{{$t('com.work')}} 
					<span v-if="currentState==1" class="ml-10">{{countdownNum}}</span>
					<span v-else class="ml-10">
						<span v-if="runtimeParamsReady && parameterMode == 0">
							{{maxWorktime}}
						</span>
						<span v-else-if="runtimeParamsReady">
							{{curModeMsg.wtimes||0}}
						</span>
						<span v-else>-</span>
					</span>
				s</div> 
				<div class="modetimes" :style="{borderRadius:'0 30rpx 30rpx 0',color:currentState==2? '#fff':'#000',backgroundColor:currentState==2? '#00BD54':'#F1F1F1'}">{{$t('com.pause')}} 
					<span v-if="currentState==2" class="ml-10">{{countdownNum}}</span>
					<span v-else class="ml-10">
						<span v-if="runtimeParamsReady && parameterMode == 0">
							{{maxPausetime}}
						</span>
						<span v-else-if="runtimeParamsReady">
							{{curModeMsg.ptimes||0}}
						</span>
						<span v-else>-</span>
					</span>
				s</div>
			</view>
			<!-- <view v-else class="flex justify-center" style="margin-top: 20rpx;">
				<div class="modetimes" style="background-color: #00BD54;border-radius: 30rpx;color: #fff;">
					鍓╀綑鏃堕棿: {{timeFormat(simpleMode)}}
				</div> 
			</view> -->
		</view>
		<view class="oilV">
			<view>
				<uni-row>
					<uni-col :span="6">
						<view class="oilItem">
							<view>{{$t('oil-capacity')}}</view>
							<view class="o2"><text class="oilTxt">{{oilParamsReady ? oilEntity.capacity : '-'}}</text><template v-if="oilParamsReady">ML</template></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem" @click="openCAPPopup()">
							<view>{{$t('surplus-capacity')}}</view>
							<view class="o2"><text class="oilTxt editableTxt">{{oilParamsReady ? oilEntity.remain : '-'}}</text><template v-if="oilParamsReady">ML</template></view>
							<view class="lineV"></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem">
							<view>{{$t('com.qtrip')}}</view>
							<view class="o2"><text class="oilTxt">{{oilParamsReady ? (oilEntity.realityConsumption/10).toFixed(1) : '-'}}</text><template v-if="oilParamsReady">ML/H</template></view>
							<view class="lineV"></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem">
							<view>{{$t('com.signal')}}</view>
							<view>
								<image v-if="bleLinkActive" src="@/static/bleon.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
								<image v-else src="@/static/bleoff.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
							</view>
							<view class="lineV"></view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
		<view class="tmV">
			<view>
				<view style="width:calc(50% - 10rpx);float: left;" @click="toWorkModel()">
					<view>
						<view>{{typeEntity.workModel}}</view>
						<view>{{modeParamsReady ? currentModeDisplay : '-'}}</view>
						<!-- <view>{{$t('work-pattern')}}</view> -->
					</view>
					<view style="display: flex;align-items: center;">
						<image src="../../../static/time.png" mode="heightFix" style="height:50rpx;"></image>
					</view>
				</view>

				<view style="width:calc(50% - 10rpx);float: right;" @click="openOTPopup()">
					<view>
						<view>{{$t('oil-type')}}</view>
						<view class="editableTxt">{{oilTypeReady ? typeEntity.oilType : '-'}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<image src="../../../static/oil.png" mode="heightFix" style="height:50rpx;"></image>
					</view>
				</view>
			</view>
			<view style="clear: both;"></view>
		</view>
		<view class="conV">
			<uni-row>
				<uni-col :span="8" v-if="funEntity.fanValue != 0">
					<view class="funList">
						<view :style="selEntity.fanSelected == true?'background-color:#0BC173':''" @click="handleSelectedIndex(1)">
							<view>
								<view>
									<image
										:src="selEntity.fanSelected == true?'../../../static/fan1.png':'../../../static/fan.png'"
										mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text
										:style="selEntity.fanSelected == true?'color:#ffffff':''">{{$t('com.fan')}}</text>
								</view>
							</view>
						</view>
					</view>
				</uni-col>
				<uni-col :span="8" v-if="funEntity.lampValue != 0">
					<view class="funList">
						<view :style="selEntity.lampSelected == true?'background-color:#0BC173':''" @click="handleSelectedIndex(2)">
							<view>
								<view>
									<image :src="selEntity.lampSelected == true?'../../../static/lamp1.png':'../../../static/lamp.png'"	mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text :style="selEntity.lampSelected == true?'color:#ffffff':''">{{$t('com.light')}}</text>
								</view>
							</view>
						</view>
					</view>

				</uni-col>
				<uni-col :span="8" v-if="funEntity.lockValue != 0">
					<view class="funList">
						<view :style="selEntity.lockSelected == true?'background-color:#0BC173':''" @click="handleSelectedIndex(3)">
							<view>
								<view>
									<image
										:src="selEntity.lockSelected == true?'../../../static/lock1.png':'../../../static/lock.png'"
										mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text
										:style="selEntity.lockSelected == true?'color:#ffffff':''">{{$t('com.lock')}}</text>
								</view>
							</view>
						</view>
					</view>

				</uni-col>
				<uni-col :span="8" v-if="funEntity.tvValue != 0">
					<view class="funList">
						<view :style="selEntity.tvSelected == true?'background-color:#0BC173':''" @click="handleSelectedIndex(4)">
							<view>
								<view>
									<image :src="selEntity.tvSelected == true?'../../../static/television1.png':'../../../static/television.png'" mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text :style="selEntity.tvSelected == true?'color:#ffffff':''">{{$t('com.bsg')}}</text>
								</view>
							</view>
						</view>
					</view>

				</uni-col>
			</uni-row>
		</view>
		<view style="text-align: center;margin-top: 80rpx;">
			<image :src="switchSelected == true? '../../../static/switch.png':'../../../static/switch1.png'" mode="heightFix" style="height:120rpx;" @click="handleControl"></image>
			<div :style="{color:switchSelected == true? '#00cb9b':'#cfcfcf'}">{{switchSelected == true? 'ON':'OFF'}}</div>
		</view>
		<!-- <view style="text-align: center;margin-top: 80rpx;">
			<button @click="setCountDownTimer(1)">work</button>
			<button @click="setCountDownTimer(2)">pause</button>
		</view> -->
		
		<uni-popup ref="capPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('surplus-capacity')}}</view>
				<view class="input-item flex align-center">
					<input v-model="capTypeValue" class="input" type="number" maxlength="30" @input="validateNumber"/>
				</view>
				<view>
					<view class="action-btn">
						<button @click="handlecapType" class="login-btn cu-btn block lg">{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="otPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('oil-type')}}</view>
				<view class="input-item flex align-center">
					<input v-model="oilTypeValue" class="input" type="text" :placeholder="$t('input-oil-type')"
						maxlength="30" @input="checkOilTypeInput" />
				</view>
				<view>
					<view class="action-btn">
						<button @click="handleOilType" class="login-btn cu-btn block lg"
							v-if="canOt">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="ocPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('oil-capacity')}}</view>
				<view class="input-item flex align-center">
					<input v-model="oilCapacityValue" class="input" type="text" :placeholder="$t('input-oil-capacity')" maxlength="30"
						@input="checkOilCapacityInput" />
				</view>
				<view>
					<view class="action-btn">
						<button @click="handleOilCapacity" class="login-btn cu-btn block lg" v-if="canOc">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="consumePopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('com.qtrip')}}</view>
				<view class="flex align-center justify-center">
					<div class="self-symbol" style="margin-right: 30rpx;" @click="preCons">
						<image src="../../../static/images/pre.png" mode="widthFix"></image>
					</div>
					<view class="cons-value">{{(oilEntity.realityConsumption/10).toFixed(1)}}</view>
					<div class="self-symbol" style="margin-left: 30rpx;position: relative;" >
						<image src="../../../static/images/add.png" mode="widthFix" @click="addCons"></image>
						<image style="position: absolute;width: 54rpx;right: -88rpx;top: 50%;transform: translateY(-50%);" src="../../../static/images/refresh.png" mode="widthFix" @click="refreshCons"></image>
					</div>
				</view>
				<view>
					<view class="action-btn">
						<button @click="handleConsume" class="login-btn cu-btn block lg">{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="wmPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('work-pattern')}}</view>
				<view class="wmlists">
					<template v-for="(item,index) in wmList">
						<view :class="'wmlist ' + (item.selected == true?'selwmList':'')" :key="index" @click="selectWorkModel(index)">
							<view>{{item.pattern}}</view>
						</view>
					</template>
				</view>

				<view>
					<view class="action-btn">
						<button @click="handleWorkModel" class="login-btn cu-btn block lg" v-if="canWm">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="disV" v-if="isOffline && !isConnecting && !isReconnecting">
			<view>
				<view>{{$t('notconnect-tip')}}</view>
			</view>
		</view>
		<!-- BLE Debug Log -->
		<view class="ble-log-btn" @click="showBleLog=!showBleLog">LOG</view>
		<view class="ble-log-panel" v-if="showBleLog">
		<view class="ble-log-header">
			<text>协议日志 ({{bleLog.length}})</text>
			<text @click="bleLog=[]" style="color:#f66;">清空</text>
		</view>
			<scroll-view scroll-y class="ble-log-body" :scroll-top="bleLogScrollTop">
				<view v-for="(item,idx) in bleLog" :key="idx" :class="'ble-log-item '+(item.dir==='RX'?'log-rx':'log-tx')">
					<text class="log-time">{{item.time}} </text><text class="log-dir">{{item.dir}} </text><text class="log-hex">{{item.hex}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		queryProductTSL,
		queryBusinessAttributes,
		batchControlDevice,
		getDeviceInfo,
		queryDeviceInfo,
		closeChannel
	} from '../../../api/devices.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				entity: {
					useDay: 0,
					workSec: 0,
					pauseSec: 0,
					lastOpenTime: ''
				},
				oilEntity: {
					useDay: 0,
					capacity: 0,
					remain: 0,
					consumption: 20,
					realityConsumption: 20
				},
				typeEntity: {
					workModel: this.$t('work-pattern'),
					oilType: this.$t('oil-type'),
				},
				selEntity: {
					fanSelected: false,
					lampSelected: false,
					lockSelected: false,
					tvSelected: false
				},
				capTypeValue:'',
				oilTypeValue: '',
				oilCapacityValue: '',
				canOt: false,
				canOc: false,
				canWm: true,
				wmList: [],
				selectedIndex: -1,
				devicemsg: {}, //璁惧淇℃伅锛歱k锛宒k
				title: this.$t('aramis-control'),
				switchSelected: false,
				deviceModel: {},
				// isOffline: false,
				funEntity: {
					oilState: 0,
					lampValue: 0,
					tvValue: 0,
					fanValue: 0,
					lockValue: 0
				},
				bleDeviceId:'',
				timeData:'',
				warring: false,//绮炬补鎶ヨ
				oilConditionHex:'',//娌圭姸鎬?6杩涘埗
				platform: uni.getStorageSync('platform'), //骞冲彴
				rssiNum: null,//淇″彿鍊?
				rssiTimer: null,
				reconnectTimer: null,
				notifyRetryTimer: null,
				isLeavingPage: false,
				isConnecting: false,
				isReconnecting: false,
				bleLinkActive: false,
				listenersReady: false,
				pageParamsReady: false,
				oilParamsReady: false,
				runtimeParamsReady: false,
				modeParamsReady: false,
				oilTypeReady: false,
				errorCode:'',
				bleHasreport: false,
				bleLog: [],
				showBleLog: false,
				bleLogScrollTop: 0,
				liveSyncTimer: null,
				missingParamsRetryTimer: null,
				initRecoveryTimer: null,
				initRecoveryCount: 0,
				lastAllParamsRequestAt: 0,
				updateModeTimer: null, //褰撳墠妯″紡蹇冭烦鍖?
				currentState: 0, //褰撳墠宸ヤ綔鐨勭姸鎬?0-鍋滄鐘舵€侊紝1-宸ヤ綔鐘舵€侊紝2-鏆傚仠鐘舵€?
				countdownNum: 0, //宸ヤ綔銆佹殏鍋滃€掕鏃?
				countDownTimer: null, //鍊掕鏃跺畾鏃跺櫒
				curModeMsg:{wtimes:10,ptimes:20},
				maxWorktime: 0,//绠€鏄撴ā寮忔渶澶у伐浣滄椂闂?
				maxPausetime: 0,//绠€鏄撴ā寮忔渶澶ф殏鍋滄椂闂?
				// curModeMsg:{ //褰撳墠鍚敤妯″紡鐨勪俊鎭?
				// 	modeNum: 1, //妯″紡鍑?
				// 	btime: '', //寮€濮嬫椂闂?
				// 	etime: '', //缁撴潫鏃堕棿
				// 	wtimes: '', //宸ヤ綔鏃堕棿
				// 	ptimes :'', //鏆傚仠鏃堕棿
				// }
			}
		},
		computed:{
			devName(){
				return this.$store.state.device.deviceName
			},
			is24hour(){
				let flag 
				 if(this.$store.state.device.is24hour==1){
					 flag = true
				 }else{
					 flag = false
				 }
				return flag
			},
			currentModeDisplay(){
				if(this.parameterMode == 0){
					const text = this.$t('simple-mode')
					return text === 'simple-mode' ? '简单模式' : text
				}
				if(this.curModeMsg && this.curModeMsg.modeNum){
					const modeText = this.$t('professional-mode')
					const timerText = this.$t('timer-item-prefix')
					return (modeText === 'professional-mode' ? '专业模式' : modeText) + ' - ' + (timerText === 'timer-item-prefix' ? '定时' : timerText) + this.curModeMsg.modeNum
				}
				const text = this.$t('professional-mode')
				return text === 'professional-mode' ? '专业模式' : text
			},
			simpleModeLabel(){
				if(Number(this.simpleMode) >= 1440){
					return ''
				}
				const text = this.$t('remain-time')
				return text === 'remain-time' ? '剩余时间' : text
			},
			...mapGetters(['isOffline','pauseTimeMin','pauseTimeMax','workTimeMin','workTimeMax','workStep','workModelHexStr','parameterMode','simpleMode'])
		},
		watch:{
			parameterMode(val){
				this.modeParamsReady = true
				if(val === 0){
					if(this.updateModeTimer){
						clearInterval(this.updateModeTimer)
						this.updateModeTimer = null
					}
					this.curModeMsg = {}
					if(this.simpleMode !== null && this.simpleMode !== undefined){
						this.runtimeParamsReady = true
					}
					this.setCountDownTimer(this.currentState)
				}else{
					if(this.workModelHexStr){
						this.filterCurModeMsg(this.workModelHexStr)
					}
					if(!this.updateModeTimer && this.workModelHexStr){
						this.updateModeTimer = setInterval(()=>{
							this.filterCurModeMsg(this.workModelHexStr)
						},5000)
					}
				}
			},
			simpleMode(){
				if(this.parameterMode === 0){
					this.runtimeParamsReady = true
				}
			},
			workModelHexStr(val){
				if(val && this.parameterMode === 1){
					this.modeParamsReady = true
					this.filterCurModeMsg(val)
				}
			}
		},
		onLoad(e) {
			// this.devicemsg = e;
			// this.title = this.devicemsg.deviceName;
			// if (this.devicemsg.onlineStatus != 1) {
			// 	this.isOffline = true;
			// }
			// this.filterCurModeMsg('001f0a140d3b01000a0005017f03000f0001000a0078027f0000000001000a0078037f0000000001000a0078047f0000000001000a0078')
			this.bleHasreport = false
			this.pageParamsReady = false
			this.oilParamsReady = false
			this.runtimeParamsReady = false
			this.modeParamsReady = false
			this.oilTypeReady = false
			this.isLeavingPage = false
			this.isConnecting = false
			this.bleLinkActive = false
			this.$store.commit('SET_OFFLINE',false)
			this.bleDeviceId = e.deviceId
			this.getTimeData()
			this.ensureBleListeners()
			this.connetDevice(this.bleDeviceId)
			uni.showLoading({
				mask: true
			})
		},
		onUnload() {
			this.isLeavingPage = true
			this.isConnecting = false
			this.bleLinkActive = false
			this.pageParamsReady = false
			this.oilParamsReady = false
			this.runtimeParamsReady = false
			this.modeParamsReady = false
			this.oilTypeReady = false
			this.clearReconnectTimer()
			this.clearNotifyRetryTimer()
			this.clearMissingParamsRetryTimer()
			this.stopInitRecovery()
			this.stopRealtimeSync()
			this.teardownBleListeners()
			clearInterval(this.rssiTimer)
			this.rssiTimer = null
			if(this.bleDeviceId){
				this.closeble(this.bleDeviceId)
			}
		},
		onShow() {
			this.getOilTypeValue()
			this.oilTypeReady = true
			// this.changeData(23,'000501f4000501f405')
			// this.filterCurModeMsg('001f0800160000000a0005017f0d000f0001000a0078027f0c020c0701000a0078037f0c00110001000a0078047f07000a0001000a0078')		
			console.log(this.updateModeTimer);
			if(!this.updateModeTimer && this.workModelHexStr){
				this.filterCurModeMsg(this.workModelHexStr)
				this.updateModeTimer = setInterval(()=>{
					this.filterCurModeMsg(this.workModelHexStr)
				},5000)
			}
			this.startRealtimeSync()
		},
		onHide() {
			if(this.updateModeTimer){
				clearInterval(this.updateModeTimer)
				this.updateModeTimer = null
			}
			this.clearNotifyRetryTimer()
			this.clearMissingParamsRetryTimer()
			this.stopInitRecovery()
			this.stopRealtimeSync()
		},
		methods: {
			getDetailSnapshotKey(){
				return `bleDetailSnapshot_${this.bleDeviceId || ''}`
			},
			restoreDetailSnapshot(){
				if(!this.bleDeviceId){
					return
				}
				const snapshot = uni.getStorageSync(this.getDetailSnapshotKey())
				if(!snapshot){
					return
				}
				if(snapshot.oilEntity){
					this.oilEntity = snapshot.oilEntity
				}
				if(snapshot.selEntity){
					this.selEntity = snapshot.selEntity
				}
				if(snapshot.funEntity){
					this.funEntity = snapshot.funEntity
				}
				if(snapshot.curModeMsg){
					this.curModeMsg = snapshot.curModeMsg
				}
				if(typeof snapshot.switchSelected === 'boolean'){
					this.switchSelected = snapshot.switchSelected
				}
				if(typeof snapshot.warring === 'boolean'){
					this.warring = snapshot.warring
				}
				if(typeof snapshot.currentState === 'number'){
					this.currentState = snapshot.currentState
				}
				if(typeof snapshot.countdownNum === 'number'){
					this.countdownNum = snapshot.countdownNum
				}
				if(typeof snapshot.maxWorktime === 'number'){
					this.maxWorktime = snapshot.maxWorktime
				}
				if(typeof snapshot.maxPausetime === 'number'){
					this.maxPausetime = snapshot.maxPausetime
				}
			},
			saveDetailSnapshot(){
				if(!this.bleDeviceId){
					return
				}
				uni.setStorageSync(this.getDetailSnapshotKey(), {
					oilEntity: this.oilEntity,
					selEntity: this.selEntity,
					funEntity: this.funEntity,
					switchSelected: this.switchSelected,
					warring: this.warring,
					currentState: this.currentState,
					countdownNum: this.countdownNum,
					maxWorktime: this.maxWorktime,
					maxPausetime: this.maxPausetime,
					curModeMsg: this.curModeMsg
				})
			},
			startRealtimeSync(){
				this.stopRealtimeSync()
				this.liveSyncTimer = setInterval(()=>{
					this.requestLatestParams()
				},3000)
			},
			stopRealtimeSync(){
				if(this.liveSyncTimer){
					clearInterval(this.liveSyncTimer)
					this.liveSyncTimer = null
				}
			},
			requestLatestParams(){
				if(this.isLeavingPage || !this.bleDeviceId || !this.bleLinkActive){
					return
				}
				if(!this.bleHasreport){
					return
				}
				getApp().writeData(this.bleDeviceId,'00',true,'',true)
			},
			timeFormat(time){
				if(time === null || time === undefined || time === ''){
					return "00:00"
				}
				if(Number(time) >= 1440){
					const text = this.$t('timer-off')
					return text === 'timer-off' ? '定时关闭' : text
				}
				const h = Math.floor(time/60)
				const m = time%60
				let times = h.toString().padStart(2,'0') + ':' + m.toString().padStart(2,'0')
				return times
			},
			//璁剧疆鍊掕鏃?
			setCountDownTimer(num){
				console.log(num);
				// this.currentState = num
				// if(num == 1){
				// 	this.countdownNum = 5
				// }else if(num == 2){
				// 	this.countdownNum = 10
				// }
				if(num==0){
					clearInterval(this.countDownTimer)
					this.countDownTimer = null
					return false
				}
				if(this.countDownTimer){
					clearInterval(this.countDownTimer)
					this.countDownTimer = null
				}
				if(this.parameterMode == 0){
					// 绠€鏄撴ā寮?
					if(this.currentState == 1){
						// 宸ヤ綔
						this.countdownNum = this.maxWorktime
					}else if(this.currentState == 2){
						// 鏆傚仠
						this.countdownNum = this.maxPausetime
					}
				}
				this.countDownTimer = setInterval(()=>{
					if(this.countdownNum>0) this.countdownNum--
				},1000)
			},
			change12H(time){
				console.log(time);
				const Hours = time.split(':')[0]
				let newHour = Hours<=12? Hours: (Number(Hours)-12).toString().padStart(2,'0')
				if(newHour == 0){
					newHour = '12' //鍑屾櫒12鐐?
				}
				return newHour+':'+time.split(':')[1]
			},
			//绛涢€夊嚭褰撳墠鎵ц鐨勫畾鏃舵ā寮?
			filterCurModeMsg(hexStr){
				const nowDate = new Date()
				let nowDate2 = new Date()
				const curH = nowDate.getHours() //褰撳墠灏忔椂
				const curM = nowDate.getMinutes() //褰撳墠鍒嗛挓
				const days = nowDate.getDay() //鍛ㄥ嚑
				// console.log(curH);
				// console.log(curM);
				const curMin = Number(curH)*60+Number(curM) //缁熶竴鎶婂綋鍓嶇殑鏃堕棿灏忔椂杞崲涓哄垎閽?
				// console.log(curMin);
				let isSet = false //鍒ゆ柇鏄惁瀛樺湪鍏ㄩ儴瀹氭椂鍣ㄦ湭寮€鍚殑鎯呭喌
				let modeList = []; //褰撳墠宸ヤ綔涓ā寮忕殑鍒楄〃
				let nextModeList = [] //涓嬫涓墽琛岀殑妯″紡鏁版嵁銆傛瘮濡?缁勫畾鏃堕兘寮€鍚簡,鏃堕棿鍒嗗埆涓?缁勪竴(9:00-10:00) 缁勪簩(12:00-13:00),褰撳墠鏃堕棿涓?1:30,鍒欓渶瑕佹妸缁?鐨勬暟鎹厛鏄剧ず鍑烘潵,鍥犱负鏈埌鏃堕棿鎵€浠ラ鐜囬兘涓?
				let defaultList = [] //绗簩澶╃殑瀹氭椂鏁版嵁銆傚鏋滃綋鍓嶆椂闂存病鏈夌鍚堟潯浠剁殑瀹氭椂锛堜粖澶╃殑瀹氭椂鍣ㄩ兘鎵ц瀹屾瘯锛夛紝鍒欓粯璁ゆ樉绀虹涓€鏉″畾鏃讹紙绗簩澶╂渶鏃╃殑涓€鏉″畾鏃讹級
				const byteArr = this.hexToBytes(hexStr);
				const groupSize = byteArr.length / 11;
				let sTime = ''
				for (let n = 0; n < groupSize; n++) {
					const p1 = byteArr[11 * n]; // Pl:妯″紡鏍囧織(鍒嗗埆浠ｈ〃浜斾釜妯″紡:0-4)
					const p2 = byteArr[11 * n + 1]; // P2:涓鸿妯″紡宸ヤ綔鏃0~b6琛ㄧず鍛ㄤ竴鑷冲懆鏃?
					const p3 = byteArr[11 * n + 2]; // P3,P4: 璧峰鏃堕棿銆佸皬鏃跺垎閽?
					const p4 = byteArr[11 * n + 3];
					const p5 = byteArr[11 * n + 4]; // P5,P6: 缁撴潫鏃堕棿銆佸皬鏃跺垎閽?
					const p6 = byteArr[11 * n + 5];
					const p7 = byteArr[11 * n + 6]; // P7: 鎺у埗寮€鍏?鍏抽棴锛?鎵撳紑
					const p8 = byteArr[11 * n + 7]; // P8锛孭9:宸ヤ綔鏃堕棿锛孭8浣庡叓浣嶏紝P9鏄珮鍏綅
					const p9 = byteArr[11 * n + 8];
					const p10 = byteArr[11 * n + 9]; // P10,P11:鍋滄鏃堕棿锛孭10浣庡叓浣嶏紝P11鏄珮鍏綅
					const p11 = byteArr[11 * n + 10];
					
					// console.log('p2==========>',p2);
					const hasInWeekend = this.hasInWeekendTime(p2,days) //浠婂ぉ锛堝懆鍑狅級鏄惁鏈夊紑鍚畾鏃?
				
					const model = {
						modeNum: p1 + 1,
						pattern: this.$t('com.pattern') + (p1 + 1).toString(),
						selected: (p7 == 1 ? true : false),
						btime: p3.toString().padStart(2,'0') + ':' + p4.toString().padStart(2,'0'),
						etime: p5.toString().padStart(2,'0') + ':' + p6.toString().padStart(2,'0'),
						bmin: Number(p3)*60+Number(p4), //鏃惰浆鎹负鍒?
						emin: Number(p5)*60+Number(p6), //鏃惰浆鎹负鍒?
						wtimes: this.getIntegerValue(p9, p8),
						ptimes: this.getIntegerValue(p11, p10),
					}
					if(p7 == 1){
						isSet = true
					}
					// if(defaultList.length==0){
					if(model.bmin!=model.emin && p7 == 1){
						// const tomorrowDays = Number(days)+1 ==7? 0:Number(days)+1
						// const hasIntomorrow = this.hasInWeekendTime(p2,tomorrowDays) //鏌ヨ鏄庡ぉ鏄惁鍖呭惈璇ュ畾鏃?
						// console.log('hasIntomorrow==>',hasIntomorrow);
						// if(hasIntomorrow){
							const model2 = {
								modeNum: p1 + 1,
								week: Number(p2).toString(2).padStart(7,'0').split('').reverse(),
								pattern: this.$t('com.pattern') + (p1 + 1).toString(),
								btime: p3.toString().padStart(2,'0') + ':' + p4.toString().padStart(2,'0'),
								etime: p5.toString().padStart(2,'0') + ':' + p6.toString().padStart(2,'0'),
								bmin: Number(p3)*60+Number(p4), //鏃惰浆鎹负鍒?
								emin: Number(p5)*60+Number(p6), //鏃惰浆鎹负鍒?
								wtimes: 0,
								ptimes: 0,
							}
							defaultList.push(model2)
						// }
					}
					
					if(p7 == 1 && hasInWeekend && model.bmin!=model.emin){
						//1銆佸畾鏃舵槸鍚﹀紑鍚?
						
						// if(p7 == 1 && curMin>model.bmin&& curMin<model.emin ){
								
						// console.log(model.btime);
						if(model.bmin<=curMin && model.emin>=curMin){
							//2銆佸畾鏃跺紑濮嬫椂闂村繀椤诲皬浜庣瓑浜庡綋鍓嶆椂闂?3銆佺粨鏉熸椂闂村繀椤诲ぇ浜庣瓑浜庡綋鍓嶆椂闂?
							modeList.push(model);
						}else if(model.bmin>=curMin){
							model.wtimes = 0
							model.ptimes = 0
							nextModeList.push(model)
						}
					}
				}
				// console.log(nextModeList);
				if(modeList.length>0){
					// 褰撳墠鏄惁鏈夋弧瓒虫潯浠剁殑瀹氭椂寮€鍚?
					// 鎸夊紑濮嬫椂闂存帓搴?
					// modeList.sort((a, b) => a.bmin - b.emin);
					// console.log(modeList);
					// console.log('==========姝ｅ父鎯呭喌鏄剧ず==========');
					this.curModeMsg = modeList[0]
				}else{
					// 鏄惁婊¤冻鍚庨潰鏃堕棿杩樻湁鏈紑鍚殑瀹氭椂鍣?
					if(nextModeList.length>0){
						// console.log('==========鍚庨潰杩樻湁寮€濮嬬殑瀹氭椂鍣紝杩欎釜鏃堕棿鐐逛箣鍓嶇殑瀹氭椂鍣ㄥ凡缁忔墽琛屽畬銆傜洰鍓嶅浜庣瓑寰呯姸鎬?=========');
						nextModeList.sort((a, b) => a.bmin - b.bmin);
						this.curModeMsg = nextModeList[0]
					}else{
						if(isSet){
							// 濡傛灉涓嶆弧瓒充互涓婃潯浠跺垯璇存槑浠婃棩鐨勫畾鏃跺櫒宸茬粡鍏ㄩ儴鎵ц瀹屾垚锛屾妸绗竴娆″紑鍚殑瀹氭椂鍣ㄤ綔涓烘槑澶╃殑瀹氭椂鏄剧ず锛堝凡搴熷純锛?
							// 濡傛灉涓嶆弧瓒充互涓婃潯浠跺垯璇存槑浠婃棩鐨勫畾鏃跺櫒宸茬粡鍏ㄩ儴鎵ц瀹屾垚锛宒efaultList鏁扮粍鍐呬細鎺掗櫎鎺夊叧闂殑瀹氭椂鍜屼袱涓椂闂寸浉鍚岀殑瀹氭椂锛屽湪杩欓噷澶勭悊鏄熸湡鍜屾椂闂寸殑鎺掑簭
							if(defaultList.length>0){
								// 鍏堟寜鐓ф槦鏈熸棩鏈熸帓搴?
								console.log(this.sortByNearestAvailableDay(defaultList));
								const defaultFilterList = this.sortByNearestAvailableDay(defaultList)
								if(defaultFilterList.length>0){
									this.curModeMsg = defaultFilterList[0]
								}else{
									//铏界劧瀹氭椂鍣ㄥ紑鍏虫墦寮€浜嗭紝浣嗘槸姣忎竴澶╅兘涓哄叧闂殑鐘舵€侊紙鍛ㄥ畾鏃讹級
									this.curModeMsg = {
										modeNum: '',
										wtimes:0,
										ptimes:0
									}
								}
							}
							// defaultList = defaultList.sort((a, b) => a.bmin - b.bmin);
							// console.log(defaultList);
							// console.log(JSON.stringify(defaultList));
							
						}else{
							// console.log('==========鍏ㄩ儴瀹氭椂鍣ㄩ兘鍏抽棴==========');
							//鍏ㄩ儴瀹氭椂鍣ㄦ湭寮€鍚殑鎯呭喌
							this.curModeMsg = {
								modeNum: '',
								wtimes:0,
								ptimes:0
							}
						}
					}
				}
				
			},
			sortByNearestAvailableDay(data) {
			  // 鑾峰彇浠婂ぉ鏄槦鏈熷嚑锛?=鍛ㄦ棩, 6=鍛ㄥ叚锛?
			  const today = new Date().getDay();
			  let targetDay = today;
			  let num = 0
			  while (true) {
				if(num < 8){
			    // 妫€鏌ュ綋鍓嶇洰鏍囨棩鏈熸槸鍚︽湁鏁堬紙0-6锛?
			    if (targetDay < 0) targetDay = 6;
			    if (targetDay > 6) targetDay = 0;
			    
			    // 鏌ユ壘鍖归厤褰撳墠鐩爣鏃ユ湡鐨勬暟鎹?
			    const availableData = data.filter(item => item.week[targetDay] === '1');
			    
			    // 濡傛灉鎵惧埌鏁版嵁锛屽垯鎸塨time鎺掑簭
			    if (availableData.length > 0) {
			      return availableData.sort((a, b) => {
			        const timeA = a.btime.split(':').map(Number);
			        const timeB = b.btime.split(':').map(Number);
			        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
			      });
			    }
			    
			    // 濡傛灉娌℃湁鎵惧埌鏁版嵁锛岀户缁鏌ヤ笅涓€涓棩鏈?
				num++
			    targetDay = (targetDay + 1) % 7;
				}else{
					return []
				}
			  }
			},
			//鍒ゆ柇瀹氭椂鍦ㄤ粖澶╂湁鏃犲紑鍚?
			hasInWeekendTime(timeData,week){
				//杩欎釜杈呭姪鍑芥暟閫氳繃浠婂ぉ鏄懆鍑犱綔涓轰笅鏍囷紝鐪嬬湅瀵瑰簲鏁扮粍鍐呯殑鍊兼槸0杩樻槸1锛屼负0鍒欏叧闂紝涓?鍒欏紑鍚?
				// timeData涓?0杩涘埗鐨勬暟瀛楋紝鐢╞it鍒ゆ柇鍛ㄥ嚑鏈夊畾鏃? week:鍛ㄥ嚑 0-7锛?涓哄懆鏃?
				const timeStr = timeData.toString(2).padStart(7,'0') //琛ラ綈7澶╂暟鎹?
				const timeList = timeStr.split('').reverse() //鏁扮粍鏍煎紡涓斿懆涓€鍒板懆鏃ラ『搴忔帓鍒?
				let weekidx = week==0? 6:Number(week)-1
				const hasToday = timeList[weekidx]==0? false:true
				return hasToday
			},
			validateNumber(e){
				let  value  = e.detail.value
				console.log(value);
				this.capTypeValue= value.replace(/[^\d]/g, "");
				this.$forceUpdate()
			},
			// 鑾峰彇鍦ㄨ摑鐗欐ā鍧楃敓鏁堟湡闂存墍鏈夊凡鍙戠幇鐨勮摑鐗欒澶囥€傚寘鎷凡缁忓拰鏈満澶勪簬杩炴帴鐘舵€佺殑璁惧銆傝幏鍙栧疄鏃朵俊鍙?
			getBleRSSI(){
				let _this = this
				uni.getBLEDeviceRSSI({
					deviceId: _this.bleDeviceId,
					success: res=>{
						console.log(res);
						this.rssiNum = res.RSSI
					}
				})
			},
			navitoSet(){
				uni.navigateTo({
					url: `/pages/blemodule/setting/index?bleDeviceId=${this.bleDeviceId}`
				})
			},
			getTimeData(){
				let nowDate = new Date()
				let week = nowDate.getDay() //鍛ㄥ嚑锛?-6锛?
				if(week == 0){ //閫傞厤鏂囨。(1-7浠ｈ〃鍛ㄤ竴鑷冲懆鏃?
					week = 7
				}
				let nowyear = nowDate.getFullYear()
				let yearStr = +nowyear - 2000
				let yearHex = Number(yearStr).toString(16)//骞?6杩涘埗
				if(yearHex.length<2){
					yearHex = '0'+yearHex
				}
				let monthHex = (nowDate.getMonth()+1).toString(16)//鏈?6杩涘埗
				if(monthHex.length<2){
					monthHex = '0'+monthHex
				}
				let dayHex = nowDate.getDate().toString(16)//鏃?6杩涘埗
				if(dayHex.length<2){
					dayHex = '0'+dayHex
				}
				let hourHex = nowDate.getHours().toString(16)//灏忔椂16杩涘埗
				if(hourHex.length<2){
					hourHex = '0'+hourHex
				}
				let minuteHex = nowDate.getMinutes().toString(16)//鍒嗛挓16杩涘埗
				if(minuteHex.length<2){
					minuteHex = '0'+minuteHex
				}
				let secondHex = (Number(nowDate.getSeconds())+2).toString(16)//绉?6杩涘埗
				if(secondHex.length<2){
					secondHex = '0'+secondHex
				}
				let weekHex = week.toString(16) //鍛ㄥ嚑16杩涘埗
				if(weekHex.length<2){
					weekHex = '0'+weekHex
				}
				let hexData = '01'+ yearHex + monthHex + dayHex + hourHex + minuteHex + secondHex + weekHex
				console.log(hexData);
				this.timeData = hexData
			},
			closeble(deviceId){
				uni.closeBLEConnection({
				  deviceId,
				  success(res) {
				    console.log(res)
				  }
				})
			},
			connetDevice(deviceId){//杩炴帴璁惧
				let _this = this
				if(_this.isLeavingPage || _this.isConnecting || !deviceId){
					return
				}
				_this.isConnecting = true
				_this.clearReconnectTimer()
				uni.openBluetoothAdapter({
					success() {
						uni.createBLEConnection({
							timeout: 5000,
							deviceId,
							success: res => {
								console.log(res);
			console.log('BLE connect success:' + res.errMsg);
								_this.isConnecting = false
								_this.isReconnecting = false
								_this.bleLinkActive = true
								_this.$store.commit('SET_OFFLINE',false)
								_this.errorCode = ''
				setTimeout(()=>{
									if(_this.platform == 'android'){ 
										_this.setMtu(deviceId)
									}else{
										_this.getServices(deviceId)
									}
								},500)
							},
							fail: e => {
			console.log('BLE connect fail:' + e.errCode);
								_this.isConnecting = false
								if (e.errCode !== 0) {
									uni.hideLoading()
									_this.bleLinkActive = false
									_this.$store.commit('SET_OFFLINE',true)
									_this.errorCode = e.errCode
									_this.scheduleReconnect()
								}
							}
						})
					},
					fail: e => {
						console.log('openBluetoothAdapter fail:' + e.errCode)
						_this.isConnecting = false
						_this.bleLinkActive = false
						_this.$store.commit('SET_OFFLINE',true)
						_this.errorCode = e.errCode
						_this.scheduleReconnect()
					}
				})
			},
			clearReconnectTimer(){
				if(this.reconnectTimer){
					clearTimeout(this.reconnectTimer)
					this.reconnectTimer = null
				}
			},
			clearNotifyRetryTimer(){
				if(this.notifyRetryTimer){
					clearTimeout(this.notifyRetryTimer)
					this.notifyRetryTimer = null
				}
			},
			clearMissingParamsRetryTimer(){
				if(this.missingParamsRetryTimer){
					clearTimeout(this.missingParamsRetryTimer)
					this.missingParamsRetryTimer = null
				}
			},
			stopInitRecovery(){
				if(this.initRecoveryTimer){
					clearTimeout(this.initRecoveryTimer)
					this.initRecoveryTimer = null
				}
				this.initRecoveryCount = 0
			},
			startInitRecovery(){
				this.stopInitRecovery()
				this.initRecoveryTimer = setTimeout(()=>{
					this.initRecoveryTimer = null
					if(this.isLeavingPage || this.pageParamsReady){
						return
					}
					this.initRecoveryCount = 1
					const missing = []
					if(!this.oilParamsReady) missing.push('dp20')
					if(!this.modeParamsReady) missing.push('dp18/25')
					if(!this.runtimeParamsReady) missing.push('dp23/24/27')
					this.addBleLog('DBG', 'init-recover-1')
					if(missing.length){
						this.addBleLog('DBG', 'missing:'+missing.join(','))
						this.requestAllParams('recover1')
					}
				},2600)
			},
			requestAllParams(reason){
				const now = Date.now()
				if(this.lastAllParamsRequestAt && (now - this.lastAllParamsRequestAt) < 1800){
					this.addBleLog('DBG', 'skip-08 too-fast'+(reason ? ' '+reason : ''))
					return
				}
				this.lastAllParamsRequestAt = now
				this.addBleLog('TX', '08:00'+(reason ? ' '+reason : ''))
				getApp().writeData(this.bleDeviceId,'00',true,'',true)
			},
			scheduleMissingParamsRetry(){
				this.clearMissingParamsRetryTimer()
				this.missingParamsRetryTimer = setTimeout(()=>{
					this.missingParamsRetryTimer = null
					if(this.isLeavingPage || this.pageParamsReady){
						return
					}
					const missing = []
					if(!this.oilParamsReady) missing.push('dp20')
					if(!this.modeParamsReady) missing.push('dp18/25')
					if(!this.runtimeParamsReady) missing.push('dp23/24/27')
					if(missing.length && this.initRecoveryCount < 2){
						this.initRecoveryCount = 2
						this.addBleLog('DBG', 'missing:'+missing.join(','))
						this.requestAllParams('retry')
					}
				},5200)
			},
			addBleLog(dir, hex) {
				const now = new Date()
				const pad2 = n => n.toString().padStart(2,'0')
				const pad3 = n => n.toString().padStart(3,'0')
				const time = pad2(now.getHours())+':'+pad2(now.getMinutes())+':'+pad2(now.getSeconds())+'.'+pad3(now.getMilliseconds())
				this.bleLog.push({ dir, hex: hex.toUpperCase(), time })
				if (this.bleLog.length > 200) this.bleLog.splice(0, 1)
				this.$nextTick(() => { this.bleLogScrollTop = 99999 })
			},
			scheduleReconnect(){
				if(this.isLeavingPage || !this.bleDeviceId || this.reconnectTimer || this.isConnecting){
					return
				}
				this.isReconnecting = true
				this.reconnectTimer = setTimeout(()=>{
					this.reconnectTimer = null
					if(this.isLeavingPage){
						return
					}
					this.connetDevice(this.bleDeviceId)
				}, 350)
			},
			setMtu(deviceId){
				let _this = this
				this.addBleLog('DBG', 'setMtu called')
				uni.setBLEMTU({deviceId,mtu:256,success:sue=>{
					console.log('succ====>',sue);
					_this.addBleLog('DBG', 'MTU:'+(sue.mtu||JSON.stringify(sue)))
					setTimeout(()=>{
						_this.getServices(deviceId)
					},500)
				}})
			},
			getServices(deviceId){//鑾峰彇钃濈墮璁惧鎵€鏈夋湇鍔?
				let _this = this
				uni.getBLEDeviceServices({
				  deviceId,
				  success(res) {
				    console.log('device services:', res.services)
					const targetService = (res.services || []).find(item => (item.uuid || '').toUpperCase() === '0000FFF0-0000-1000-8000-00805F9B34FB')
					if(!targetService){
						_this.addBleLog('ERR', 'service-FFF0-missing')
						_this.scheduleNotifyRetry(deviceId)
						return
					}
					_this.getCharacteristics(deviceId, targetService.uuid)
					
				  }
				})
			},
			getCharacteristics(deviceId, serviceId){
				let _this = this
				uni.getBLEDeviceCharacteristics({
					deviceId,
					serviceId,
					success(res) {
						const chars = res.characteristics || []
						const notifyChar = chars.find(item => (item.uuid || '').toUpperCase() === '0000FFF1-0000-1000-8000-00805F9B34FB')
						const writeChar = chars.find(item => (item.uuid || '').toUpperCase() === '0000FFF2-0000-1000-8000-00805F9B34FB')
						if(!notifyChar || !writeChar){
							_this.addBleLog('ERR', 'char-missing FFF1/FFF2')
							_this.scheduleNotifyRetry(deviceId)
							return
						}
						_this.getValueChange(deviceId, serviceId, notifyChar.uuid)
					},
					fail(err){
						_this.addBleLog('ERR', 'char-fail:'+(err.errCode || '')+' '+(err.errMsg || ''))
						_this.scheduleNotifyRetry(deviceId)
					}
				})
			},
			scheduleNotifyRetry(deviceId){
				this.clearNotifyRetryTimer()
				this.notifyRetryTimer = setTimeout(()=>{
					this.notifyRetryTimer = null
					if(this.isLeavingPage || !deviceId){
						return
					}
					this.addBleLog('DBG', 'notify-retry')
					this.getServices(deviceId)
				},300)
			},
			getValueChange(deviceId, serviceId = '0000FFF0-0000-1000-8000-00805F9B34FB', characteristicId = '0000FFF1-0000-1000-8000-00805F9B34FB'){
				let _this = this
				//鎵惧埌鍨嬪彿涓篕5-BTS鐨勮澶?
				this.addBleLog('DBG', 'gVC-called')
				uni.notifyBLECharacteristicValueChange({
				  state: true, // 鍚敤 notify 鍔熻兘
				  // 杩欓噷鐨?deviceId 闇€瑕佸凡缁忛€氳繃 createBLEConnection 涓庡搴旇澶囧缓绔嬮摼鎺?
				  deviceId,
				  // 杩欓噷鐨?serviceId 闇€瑕佸湪 getBLEDeviceServices 鎺ュ彛涓幏鍙?
				  serviceId,
				  // 杩欓噷鐨?characteristicId 闇€瑕佸湪 getBLEDeviceCharacteristics 鎺ュ彛涓幏鍙?
				  characteristicId,
				  success(res) {
					console.log(res)
					console.log('notifyBLECharacteristicValueChange success', res.errMsg)
					_this.clearNotifyRetryTimer()
					_this.addBleLog('DBG', 'notify-OK')
					_this.startInitRecovery()
					setTimeout(()=>{
						console.log(_this.timeData);
						_this.addBleLog('TX', '1c:'+_this.timeData)
						getApp().writeData(_this.bleDeviceId,_this.timeData,false,'1c',true)
					},300)
					setTimeout(()=>{
						uni.hideLoading()
						_this.requestAllParams()
						_this.scheduleMissingParamsRetry()
					},500)
				  },
				  fail(e){
					_this.addBleLog('ERR', 'notify-FAIL:'+e.errCode+' '+e.errMsg)
					console.log('notifyBLE fail', e)
					_this.scheduleNotifyRetry(deviceId)
				  }
				})
			},
			ensureBleListeners(){
				if(this.listenersReady){
					return
				}
				this.listenersReady = true
				this.characteristicValueChange()
				this.checkConnetState()
			},
			teardownBleListeners(){
				this.listenersReady = false
				if(typeof uni.offBLECharacteristicValueChange === 'function'){
					uni.offBLECharacteristicValueChange()
				}
				if(typeof uni.offBLEConnectionStateChange === 'function'){
					uni.offBLEConnectionStateChange()
				}
			},
			characteristicValueChange(){//鐩戝惉鐗瑰緛鍊煎彉鍖?
				let _this = this
				uni.onBLECharacteristicValueChange(function (res) {
					getApp().resolveBleWriteLoading()
					_this.bleLinkActive = true
					_this.$store.commit('SET_OFFLINE',false)
					console.log(res);
					console.log(getApp().ab2hex(res.value));
					let hexStr = getApp().ab2hex(res.value)
					_this.addBleLog('RX', hexStr)
					let dpId = parseInt(hexStr.substring(12,14),16) 
					let value = hexStr.substring(20,hexStr.length-2)
					if(dpId == 20){
						_this.oilConditionHex = value
					}
					if([20,22,23,24,25,26,27].includes(dpId)){
						_this.addBleLog('DBG', 'dp'+dpId+':'+value)
					}
					_this.changeData(dpId,value)
				})
			},
			//鍩虹鍊艰祴鍊?
			changeData(dpId,value){
				console.log('dpId...',dpId);
				console.log('value...',value);
				let val
				switch (dpId){
					case 1: //寮€鍏?BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.switchSelected = false
						}else{
							this.switchSelected = true
						}
						break;
					case 3://鍠烽浘鎸′綅 ENUM鏋氫妇 0 - 澶у閲?1 - 涓閲?2 - 灏忓閲?
						// let val = parseInt(value,16)
						// if(val == 0){
						
						// }else if(val == 1){
					
						// }else{
							
						// }
						break;
					case 4: // 椋庢墖寮€鍏?BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.selEntity.fanSelected = false
						}else{
							this.selEntity.fanSelected = true
						}
						break;
					case 5: //绔ラ攣 BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.selEntity.lockSelected = false
						}else{
							this.selEntity.lockSelected = true
						}
						break;
					case 9: //鐏厜寮€鍏?BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.selEntity.lampSelected = false
						}else{
							this.selEntity.lampSelected = true
						}
						break;
					case 16: //鏁呴殰 INT 1姘旀车寮傚父锛?椋庢墖寮傚父锛岀數鏈哄紓甯?
						// let val = parseInt(value,16)
						// if(val == 1){
							
						// }else if(val == 2){
							
						// }
						break;
					case 17: //绮炬补鎶ヨ
						let val = parseInt(value,16)
						if(val == 0){
							// this.warring = true
							this.warring = false
						}else if(val == 1){
							this.warring = true
							// this.warring = false
						}
						break;
					case 18: //宸ヤ綔妯″紡 
						/*  Pl:妯″紡鏍囧織(鍒嗗埆浠ｈ〃浜斾釜妯″紡:0-4)
							P2:涓鸿妯″紡宸ヤ綔鏃0~b6琛ㄧず鍛ㄤ竴鑷冲懆鏃?
							P3,P4: 璧峰鏃堕棿銆佸皬鏃跺垎閽?
							P5,P6: 缁撴潫鏃堕棿銆佸皬鏃跺垎閽? 
							P7: 鎺у埗寮€鍏?鍏抽棴锛?鎵撳紑
							P8锛孭9:宸ヤ綔鏃堕棿锛孭8浣庡叓浣嶏紝P9鏄珮鍏綅
							P10,P11:鍋滄鏃堕棿锛孭10浣庡叓浣嶏紝
							P11鏄珮鍏綅
						*/
					   // this.workModelHexStr = value
					   this.filterCurModeMsg(value)
					   this.$store.commit('SET_MOMDELSTR',value)
					   this.modeParamsReady = true
					   this.addBleLog('DBG', 'mode18-ready')
					   uni.$emit('bleWorkModelUpdated', { hex: value })
						break;
					case 20: //鍔熻兘瀹氫箟
						/*  P1锛孭2:绮炬补鎬诲閲? P1楂樺叓浣嶏紝P2浣庡叓浣?
							P3锛孭4:绮炬补褰撳墠瀹归噷: P3楂樺叓浣嶏紝P4浣庡叓浣?
							P5: 绮炬补娑堣€楅€熷害鏈€鍚庝竴浣嶈〃绀哄皬鏁帮紝姣斿:P5涓?0锛岃〃绀?.0ML/H
							P6锛孭7:绮炬补鍙敤澶╂暟: P6楂樺叓浣嶏紝P7浣庡叓浣?
						*/
					    this.getOilStatusEntity(value)
					    this.oilParamsReady = true
						this.addBleLog('DBG', 'oil-ready')
						break;
					case 22: //鍔熻兘瀹氫箟 
						/*  byte0-绮炬补妫€娴嬫柟寮忥細0鏃狅紝1-璁＄畻鍨嬶紝2-鎺㈡祴鍨?
							byte1-鏂瑰紡锛?鏃犵數鏈猴紝1鏈夌數鏈恒€傛棤涓嶆樉绀哄浘鏍?
							byte2-姘涘洿鐏細0鏃狅紝1鏃ュ厜鐏紝2褰╃伅锛?鐐僵鐏紝鏃犱笉鏄剧ず鍥炬爣
							byte3-鐢甸噺鏄剧ず锛?鏃狅紝1鏈夛紝鏃犱笉鏄剧ず鍥炬爣
							byte4-浜轰紤鎰熷簲锛?鏃狅紝1鏈夛紝鏃犱笉鏄剧ず鍥炬爣
						*/
					    this.getFunData(value)
						break;
					case 23: //宸ヤ綔锛屾殏鍋滐紝姝ヨ繘鏃堕棿鑼冨洿
						/*  P1锛孭2:鏆傚仠鏃堕棿鏈€灏忓€? P1楂樺叓浣嶏紝P2浣庡叓浣嶏紱
							P3锛孭4:鏆傚仠鏃堕棿鏈€澶у€? P3楂樺叓浣嶏紝P4浣庡叓浣嶏紱
							P5锛孭6:宸ヤ綔鏃堕棿鏈€灏忓€? P5楂樺叓浣嶏紝P6浣庡叓浣嶏紱
							P7锛孭8:宸ヤ綔鏃堕棿鏈€澶у€? P7楂樺叓浣嶏紝P8浣庡叓浣嶏紱
							P9:姝ヨ繘鍊硷紱
						*/
					    this.bleHasreport = true
					    this.getWorkData(value)
					    this.runtimeParamsReady = true
						this.addBleLog('DBG', 'runtime23-ready')
						break;
					case 24: //宸ヤ綔/鏆傚仠鏃堕棿
						/*  P1:鐘舵€侊紙0涓哄仠姝㈢姸鎬侊紝1涓哄伐浣滅姸鎬侊紝2涓烘殏鍋滅姸鎬侊級
							P2,P3涓哄搴旂殑鏃讹細P2楂樺叓浣嶏紝P3浣庡叓浣?
							P4,P5涓哄綋鍓嶆ā寮忕殑鏈€澶у伐浣滄椂闂达紙P4楂樺叓浣嶏紝P5浣庡叓浣嶏級
							P6,P7涓哄綋鍓嶆ā寮忕殑鏈€澶ф殏鍋滄椂闂达紙P6楂樺叓浣嶏紝P7浣庡叓浣嶏級
						*/
					    const state = value.substr(0,2) //鐘舵€?
					    const time = value.substr(2,4) //鏃堕暱
					    const maxWorktime = value.substr(6,4) //鏈€澶у伐浣滄椂闂?
					    const maxPausetime = value.substr(10,4) //鏈€澶ф殏鍋滄椂闂?
					    this.currentState = parseInt(state,16)
					    this.countdownNum = parseInt(time,16)
					    this.maxWorktime = parseInt(maxWorktime,16)
					    this.maxPausetime = parseInt(maxPausetime,16)
			console.log('current state =>', state);
			console.log('current time =>', time);
						this.setCountDownTimer(this.currentState)
						this.runtimeParamsReady = true
						this.addBleLog('DBG', 'runtime24-ready')
						break;
					case 25://鍙傛暟杩愯妯″紡
						/* 0锛氱畝鍗曟ā寮忥紱1锛氫笓涓氭ā寮?*/
						const valInt = parseInt(value,16)
						this.$store.commit('SET_PARAMETERMODE',valInt)
						if(valInt === 0){
							this.curModeMsg = {}
						}else if(this.workModelHexStr){
							this.filterCurModeMsg(this.workModelHexStr)
						}
						this.modeParamsReady = true
						this.addBleLog('DBG', 'mode25-ready')
						uni.$emit('bleParameterModeUpdated', { value: valInt })
						break;
					case 26://绠€鍗曟ā寮忎笅棣欐皼娴撳害妯″紡涓暟
						/*	鏁板€间负鍑犱唬琛ㄦ湁鍑犱釜棣欐皼娴撳害妯″紡 */
						const gearNum = parseInt(value,16)
						this.$store.commit('SET_GEARNUM',gearNum)
						break;
					case 27://绠€鍗曟ā寮忎笅鍙傛暟
						/* P1锛孭2:瀹氭椂鏃堕棿: P1楂樺叓浣嶏紝P2浣庡叓浣嶏紱P3:棣欐皼娴撳害妯″紡锛堟暟鍊间负鍑犱唬琛ㄨ繍琛岀鍑犵棣欐皼娴撳害锛?*/
						const simpleTime = parseInt(value.substr(0,4),16) //瀹氭椂鏃堕棿
						const currentmode = parseInt(value.substr(4,6),16) //棣欐皼娴撳害妯″紡
						this.$store.commit('SET_SIMPLEMODE',simpleTime)
						this.$store.commit('SET_CURGEAR',currentmode)
						this.runtimeParamsReady = true
						this.addBleLog('DBG', 'runtime27-ready')
						uni.$emit('bleSimpleModeUpdated', { simpleTime, currentmode })
						break;
				}
				this.pageParamsReady = this.oilParamsReady && this.runtimeParamsReady && this.modeParamsReady
				if(this.pageParamsReady){
					this.stopInitRecovery()
					uni.hideLoading()
				}
				this.$nextTick(()=>{
					this.saveDetailSnapshot()
				})
			},
			//===============================
			// //浜岃繘鍒舵暟缁勮浆鎹负16杩涘埗
			// ab2hex(buffer){
			//   const hexArr = Array.prototype.map.call(new Uint8Array(buffer),
			//    function(bit){
			// 	 return ('00' + bit.toString(16)).slice(-2) 
			//   }) 
			//    return hexArr.join('') 
			// },
			// //鐘舵€佹暟鎹崟鍏?
			// dataHexStr(dpid,type,value){
			// 	// 鍙傛暟鍙傝€冧笂闈㈢殑 鏁版嵁閮ㄥ垎
			// 	let len = (value.length/2).toString(16)
			// 	//琛ラ綈2byte闀垮害
			// 	len = len.length<2? '000'+len:len.length<3? '00'+len:len.length<4? '0'+len:len 
			// 	let instruct = dpid + type + len + value
			// 	return instruct
			// },
			handleSelectedIndex(index) {
				let type = '';
				let data
				if(!this.switchSelected){
					uni.showToast({
						icon:'none',
						title: this.$t("openSwitchTip")
					})
					return false
				}
				switch (index) {
					case 1:
						this.selEntity.fanSelected = !this.selEntity.fanSelected;
						if(this.selEntity.fanSelected){
							data = getApp().dataHexStr('04','01','01')
							getApp().writeData(this.bleDeviceId,data);
						}else{
							data = getApp().dataHexStr('04','01','00')
							getApp().writeData(this.bleDeviceId,data);
						}
						type = 'fan';
						break;
					case 2:
						this.selEntity.lampSelected = !this.selEntity.lampSelected;
						if(this.selEntity.lampSelected){
							data = getApp().dataHexStr('09','01','01')
							getApp().writeData(this.bleDeviceId,data);
						}else{
							data = getApp().dataHexStr('09','01','00')
							getApp().writeData(this.bleDeviceId,data);
						}
						type = 'lamp';
						break;
					case 3:
						this.selEntity.lockSelected = !this.selEntity.lockSelected;
						if(this.selEntity.lockSelected){
							data = getApp().dataHexStr('05','01','01')
							getApp().writeData(this.bleDeviceId,data);
							// this.writeData('0501000101');
						}else{
							data = getApp().dataHexStr('05','01','00')
							getApp().writeData(this.bleDeviceId,data);
							// this.writeData('0501000100');
						}
						type = 'lock';
						break;
					case 4:
						this.selEntity.tvSelected = !this.selEntity.tvSelected;
						if(this.selEntity.tvSelected){
							data = getApp().dataHexStr('0f','01','01')
							getApp().writeData(this.bleDeviceId,data);
						}else{
							data = getApp().dataHexStr('0f','01','00')
							getApp().writeData(this.bleDeviceId,data);
						}
						type = 'up_down';
						break;
				}
				
				// this.sendOrder(type);
			},
			handleControl() {
				let type = 'switch';
				let data
				this.switchSelected = !this.switchSelected;
				if(this.switchSelected){
					data = getApp().dataHexStr('01','01','01')
					getApp().writeData(this.bleDeviceId,data);
				}else{
					data = getApp().dataHexStr('01','01','00')
					getApp().writeData(this.bleDeviceId,data);
				}
				// this.sendOrder(type);
			},
			checkOilTypeInput(e) {
				if (this.oilTypeValue) {
					this.canOt = true;
				} else {
					this.canOt = false;
				}
			},
			openOTPopup() {
				this.$refs.otPopup.open();
				this.oilTypeValue = this.typeEntity.oilType;
				this.checkOilTypeInput();
			},
			handlecapType() {
			console.log('set capacity =>', this.capTypeValue);
			console.log('total capacity =>', this.oilEntity.capacity);
				if(Number(this.capTypeValue) > Number(this.oilEntity.capacity)){
					this.$modal.msgError(this.$t('exceed')+this.$t('oil-capacity'))
					return false
				}
				this.$refs.capPopup.close();
				// let curNum = Number(this.capTypeValue).toString(16)
				this.oilEntity.remain = this.capTypeValue;
				let capvalHex = Number(this.oilEntity.remain).toString(16)
				capvalHex = capvalHex.length==1? '000'+capvalHex: capvalHex.length==2? '00'+capvalHex: capvalHex.length==3? '0'+capvalHex: capvalHex
				let start = this.oilConditionHex.substring(0, 4)
				let end = this.oilConditionHex.substring(8, 16)
				this.oilConditionHex = start + capvalHex + end
				// console.log(curNum);
				console.log(this.oilConditionHex);
				// let data = getApp().dataHexStr('14','01','0096009515018c')//閲嶇疆
				let data = getApp().dataHexStr('14','01',this.oilConditionHex)
				console.log(data);
				getApp().writeData(this.bleDeviceId,data);
			},
			handleOilType() {
				this.$refs.otPopup.close();
				this.typeEntity.oilType = this.oilTypeValue;
				this.saveOilType()
				// let type = 'jy_type';
				// this.sendOrder(type);
			},
			//淇濆瓨绮炬补绫诲瀷鐨勫悕绉板埌鏈湴
			saveOilType(){
				let oilObj = {
					bleDeviceId: this.bleDeviceId,
					name: this.typeEntity.oilType
				}
				if(!uni.getStorageSync('bleLocalOilTypeList')){
					let arr = []
					arr.push(oilObj)
					uni.setStorageSync('bleLocalOilTypeList',arr)
				}else{
					let localArr = uni.getStorageSync('bleLocalOilTypeList')
					let hasOil = localArr.findIndex(ite=>ite.bleDeviceId === oilObj.bleDeviceId)
					if(hasOil>-1){ //鍒ゆ柇鏈湴鏁扮粍閲屾湁鏃犺繖涓澶囩殑璁板綍锛屾湁鍒欑洿鎺ヤ慨鏀瑰悕绉帮紝鏃犲垯push杩涙暟缁?
						localArr[hasOil].name = oilObj.name
					}else{
						localArr.push(oilObj)
					}
					uni.setStorageSync('bleLocalOilTypeList',localArr)
				}
			},
			checkOilCapacityInput(e) {
				if (this.oilCapacityValue) {
					this.canOc = true;
				} else {
					this.canOc = false;
				}
			},
			openCAPPopup(){
				this.$refs.capPopup.open();
				this.capTypeValue = this.oilEntity.remain
				this.checkOilCapacityInput();
			},
			openOCPopup() {
				// this.$refs.ocPopup.open();
				// this.oilCapacityValue = this.oilEntity.capacity;
				// this.checkOilCapacityInput();
				console.log('openOCPopup')
			},
			handleOilCapacity() {
				this.$refs.ocPopup.close();
				this.oilEntity.capacity = this.oilCapacityValue;
			},
			openWMPopup() {
				this.$refs.wmPopup.open();
				for (let i = 0; i < this.wmList.length; i++) {
					this.wmList[i].selected = false;
					if (this.wmList[i].pattern == this.typeEntity.workModel) {
						this.wmList[i].selected = true;
						this.selectedIndex = i;
						this.$forceUpdate();
					}
				}
			},
			openConsumePopup(){
				this.$refs.consumePopup.open();
			},
			handleConsume(){
				this.$refs.consumePopup.close();
				let conHex = Number(this.oilEntity.realityConsumption).toString(16)
				conHex = conHex.length==1? '0'+conHex:conHex
				let start = this.oilConditionHex.substring(0, 14)
				this.oilConditionHex = start + conHex
				console.log(conHex);
				console.log(this.oilConditionHex);
				let data = getApp().dataHexStr('14','01',this.oilConditionHex)
				console.log(data);
				getApp().writeData(this.bleDeviceId,data);
			},
			handleWorkModel() {
				this.$refs.wmPopup.close();
				this.typeEntity.workModel = this.wmList[this.selectedIndex].pattern;
			},
			selectWorkModel(index) {
				const oldSelectedItem = this.wmList[this.selectedIndex];
				if (oldSelectedItem) {
					oldSelectedItem.selected = false;
				}

				this.wmList[index].selected = true;
				this.selectedIndex = index;

				this.$forceUpdate();
			},
			toWorkModel() {
				let {
					deviceKey,
					productKey,
					deviceName
				} = this.devicemsg;
				if(this.switchSelected){
					uni.navigateTo({
						// url: `/pages/blemodule/blepattern/index`
						url: `/pages/blemodule/blepattern/ivy07maintain`
					})
				}else{
					uni.showToast({
						icon:'none',
						title: this.$t("openSwitchTip")
					})
				}
			},
			// 娌圭姸鎬佸€硷紙鍗佸叚杩涘埗瀛楃涓诧級
			getOilStatusValue(datalist) {
				var hexStr = '';
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'jy_status') {
						hexStr = datalist[i].resourceValce;
						break;
					}
				}

				return hexStr;
			},
			getEntity(datalist) {
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'fan_switch') {
						this.selEntity.fanSelected = datalist[i].resourceValce == 'true' ? true : false;
					}
					if (datalist[i].resourceCode == 'light_switch') {
						this.selEntity.lampSelected = datalist[i].resourceValce == 'true' ? true : false;
					}
					if (datalist[i].resourceCode == 'lock') {
						this.selEntity.lockSelected = datalist[i].resourceValce == 'true' ? true : false;
					}
					if (datalist[i].resourceCode == 'up_down') {
						this.selEntity.tvSelected = datalist[i].resourceValce == '0' ? true : false;
					}
					if (datalist[i].resourceCode == 'switch') {
						this.switchSelected = datalist[i].resourceValce == 'true' ? true : false;
					}
				}
			},
			// 绮炬补鐘舵€侊細瀹归噺銆佸墿浣欏閲忋€佹补鑰?
			getOilStatusEntity(datalist) {
				const hexStr = datalist;
				const byteArr = this.hexToBytes(hexStr);
				console.log(byteArr);
				const p1 = byteArr[0];
				const p2 = byteArr[1];
				const p3 = byteArr[2];
				const p4 = byteArr[3];
				const p5 = byteArr[4];
				const p6 = byteArr[5];
				const p7 = byteArr[6];
				const p8 = byteArr[7];
				
				this.oilEntity = {
					capacity: this.getIntegerValue(p2, p1),
					remain: this.getIntegerValue(p4, p3),
					// consumption: (p5 ?? 0 / 10).toFixed(1),
					consumption: p5? p5 : 0, //鍙傝€冩补鑰?
					useDay: this.getIntegerValue(p7, p6),
					realityConsumption:  p8? p8 : 0, //鐪熷疄娌硅€?
				};

				this.getCanUsedDays();
			},
			//鍑忓皯绮炬补娌硅€?
			preCons(){
				let minConsumption = (this.oilEntity.consumption*0.7).toFixed(0)
				// console.log(minConsumption);
				if(this.oilEntity.realityConsumption<=minConsumption){
					return false
				}else{
					this.oilEntity.realityConsumption -= 1
				}
			},
			//澧炲姞绮炬补娌硅€?
			addCons(){
				let maxConsumption = (this.oilEntity.consumption*1.3).toFixed(0)
				// console.log(maxConsumption);
				if(this.oilEntity.realityConsumption>=maxConsumption){
					return false
				}else{
					this.oilEntity.realityConsumption += 1
				}
			},
			//娌硅€楁仮澶嶉粯璁ゅ€?
			refreshCons(){
				this.oilEntity.realityConsumption = this.oilEntity.consumption
			},
			// 绮炬补绫诲瀷
			getOilTypeValue(datalist) {
				if(uni.getStorageSync('bleLocalOilTypeList')){
					let localArr = uni.getStorageSync('bleLocalOilTypeList')
					let hasOil = localArr.findIndex(ite=>ite.bleDeviceId === this.bleDeviceId)
					if(hasOil>-1){ //鍒ゆ柇鏈湴鏁扮粍閲屾湁鏃犺繖涓澶囩殑璁板綍锛屾湁鍒欑洿鎺ヤ慨鏀瑰悕绉帮紝鏃犲垯push杩涙暟缁?
						this.typeEntity.oilType = localArr[hasOil].name
					}
				}
				// for (let i = 0; i < datalist.length; i++) {
				// 	if (datalist[i].resourceCode == 'jy_type') {
				// 		this.typeEntity.oilType = datalist[i].resourceValce;
				// 		break;
				// 	}
				// }
			},
			//鍔熻兘瀹氫箟
			getFunDataValue(datalist) {
				var hexStr = '';
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'fun_data') {
						hexStr = datalist[i].resourceValce;
						break;
					}
				}

				return hexStr;
			},
			checkConnetState(){//鐩戝惉钃濈墮鏂紑閲嶈繛
				let _this = this
				uni.onBLEConnectionStateChange(res=>{
			console.log('BLE disconnected', res)
					if(res.deviceId && _this.bleDeviceId && res.deviceId !== _this.bleDeviceId){
						return
					}
					if(res.connected){
						_this.isConnecting = false
						const wasReconnecting = _this.isReconnecting
						_this.clearReconnectTimer()
						_this.isReconnecting = false
						_this.bleLinkActive = true
						_this.$store.commit('SET_OFFLINE',false)
						if(wasReconnecting && !_this.bleHasreport && _this.bleDeviceId){
							_this.getValueChange(_this.bleDeviceId)
						}
						return
					}
					if(!res.connected){//钃濈墮鏂紑閲嶈繛杩囩▼
						_this.isConnecting = false
						_this.bleLinkActive = false
						_this.bleHasreport = false
						// _this.isOffline = true;
			console.log('set offline true');
						_this.$store.commit('SET_OFFLINE',true)
						clearInterval(_this.rssiTimer)
						_this.rssiTimer = null
						_this.scheduleReconnect()
					}
				})
			},
			getFunData(datalist) {
				console.log(datalist);
				// const hexStr = this.getFunDataValue(datalist);
				// if (hexStr == '') {
				// 	console.log('no fun data...')
				// 	return
				// };
				// const byteArr = this.hexToBytes(hexStr);
				const byteArr = this.hexToBytes(datalist);
				const p1 = byteArr[0]; // -绮炬补妫€娴嬫柟寮忥細0鏃狅紝1-璁＄畻鍨嬶紝2-鎺㈡祴鍨?
				const p2 = byteArr[1]; // -鏂瑰紡锛?鏃犵數鏈猴紝1鏈夌數鏈恒€傛棤涓嶆樉绀哄浘鏍?
				const p3 = byteArr[2]; // -姘涘洿鐏細0鏃狅紝1鏃ュ厜鐏紝2褰╃伅锛?鐐僵鐏紝鏃犱笉鏄剧ず鍥炬爣
				const p4 = byteArr[3]; // -鐢甸噺鏄剧ず锛?鏃狅紝1鏈夛紝鏃犱笉鏄剧ず鍥炬爣
				const p5 = byteArr[4]; // -浜轰紤鎰熷簲锛?鏃狅紝1鏈夛紝鏃犱笉鏄剧ず鍥炬爣
				const p6 = byteArr[5]; // -椋庢墖锛?鏃狅紝1鏈夛紝鏃犱笉鏄剧ず鍥炬爣
				const p7 = byteArr[6]; // -鎸夐敭閿侊細0鏃狅紝1鏈夛紝鏃犱笉鏄剧ず鍥炬爣

				this.funEntity = {
					oilState: parseInt(p1),
					lampValue: parseInt(p3),
					tvValue: parseInt(p2),
					fanValue: parseInt(p6),
					lockValue: parseInt(p7),
				}

				console.log('this.funEntity...')
				console.log(this.funEntity)
			},
			getWorkData(workdata){
				console.log('getWorkData...')
				const p1 = workdata.substr(0,4) //鏆傚仠鏃堕棿鏈€灏忓€?
				const p2 = workdata.substr(4,4) //鏆傚仠鏃堕棿鏈€澶у€?
				const p3 = workdata.substr(8,4) //宸ヤ綔鏃堕棿鏈€灏忓€?
				const p4 = workdata.substr(12,4) //宸ヤ綔鏃堕棿鏈€澶у€?
				const p5 = workdata.substr(16,2) //姝ヨ繘鍊?
				// console.log('鏆傚仠鏈€灏忓€?,p1);
				// console.log('鏆傚仠鏈€澶у€?,p2);
				// console.log('宸ヤ綔鏈€灏忓€?,p3);
				// console.log('宸ヤ綔鏈€澶у€?,p4);
				// console.log('姝ラ暱',p5);
				this.$store.commit('SET_PAUSETIMEMIN',parseInt(p1,16))
				this.$store.commit('SET_PAUSETIMEMAX',parseInt(p2,16))
				this.$store.commit('SET_WORKTIMEMIN',parseInt(p3,16))
				this.$store.commit('SET_WORKTIMEMAX',parseInt(p4,16))
				this.$store.commit('SET_WORKSTEP',parseInt(p5,16))
			},
			//涓嬪彂鎸囦护
			sendOrder(type) {
				let datas = {};

				switch (type) {
					case 'fan': //椋庢墖寮€鍏?
						datas = {
							fan_switch: this.selEntity.fanSelected
						}
						break;
					case 'lamp': // 姘涘洿鐏?
						datas = {
							light_switch: this.selEntity.lampSelected
						}
						break;
					case 'lock': // 閿佸睆寮€鍏?
						datas = {
							lock: this.selEntity.lockSelected
						}
						break;
					case 'up_down': // 鐐瑰嚮寮€鍏?
						datas = {
							up_down: (this.selEntity.tvSelected == true ? 0 : 1)
						}
						break;
					case 'switch': // 璁惧寮€鍏?
						datas = {
							switch: this.switchSelected
						}
						break;
					case 'jy_type':
						datas = {
							jy_type: this.oilTypeValue
						}
						break;
				}


				let para = {
					type: 2,
					data: JSON.stringify([datas]),
					deviceList: [{
						productKey: this.devicemsg.productKey,
						deviceKey: this.devicemsg.deviceKey,
						gatewayDeviceKey: '',
						gatewayProductKey: '',
					}],
					cacheTime: 86400,
					dataFormat: 2,
					isCache: 1,
					isCover: 2
				}
				batchControlDevice(para).then(res => {
			console.log('send command result:');
					console.log(res)
				})
			},
			// 鑾峰彇浣庡叓浣嶃€侀珮鍏綅鐨勬暣鏁板€?
			getIntegerValue(lowByte, highByte) {
				var integerValue = (highByte << 8) | lowByte;
				return integerValue;
			},
			// 鍗佸叚杩涘埗杞琤yte鏁扮粍
			hexToBytes(hex) {
				let bytes = [];
				for (let i = 0; i < hex.length; i += 2) {
					bytes.push(parseInt(hex.substr(i, 2), 16));
				}
				return bytes;
			},
			// 鍙娇鐢ㄥぉ鏁?
			getCanUsedDays() {
				const consumption = this.oilEntity.realityConsumption;
				const hours = this.oilEntity.realityConsumption * this.oilEntity.remain;
				const days = hours / 24;
				let day = parseInt(days);
				if (days % 1 !== 0) {
					day += 1;
				}

				this.entity.useDay = day;
			}
		}
	}
</script>

<style lang="scss">
	.device-shell{
		min-height: 100vh;
		background:
			radial-gradient(circle at 18% 10%, rgba(73, 239, 220, 0.14), transparent 24%),
			radial-gradient(circle at 86% 12%, rgba(86, 132, 255, 0.16), transparent 22%),
			linear-gradient(180deg, #07111f 0%, #0a1730 48%, #08111f 100%);
	}
	.ttip {
		color: #b8f4ff;
		height: 82rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0 20rpx;
		border-radius: 18rpx;
		background: linear-gradient(180deg, rgba(13, 28, 50, 0.9) 0%, rgba(9, 20, 38, 0.82) 100%);
		border: 1px solid rgba(124, 218, 255, 0.14);
		box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.2);
	}

	.ttip2 {
		color: #B5B5B5;
		font-size: 12px;
		text-align: center;

	}

	.timg {
		position: relative;
		text-align: center;
		// display: flex;
		// justify-content: center;
		padding-top: 52rpx;
		padding-bottom: 62rpx;
		position: relative;
		background:
			radial-gradient(circle at 50% 20%, rgba(77, 245, 224, 0.32), transparent 20%),
			linear-gradient(180deg, #0f2442 0%, #132f55 38%, #10233f 100%);
		border-radius: 0 0 38rpx 38rpx;
		box-shadow: inset 0 -20rpx 30rpx rgba(255,255,255,0.05), 0 22rpx 46rpx rgba(0,0,0,0.22);
	}

	.tcon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		// height: 340rpx;
		// display: flex;
		// align-items: center;
		// color: #ffffff;
		font-size: 16px;
	}

	.oilV {
		padding: 0 20rpx;
		font-size: 14px;
		margin-top: 22rpx;
	}

	.oilV>view {
		background: linear-gradient(180deg, rgba(14, 30, 53, 0.96) 0%, rgba(9, 19, 36, 0.92) 100%);
		border-radius: 24rpx;
		border: 1px solid rgba(124, 218, 255, 0.12);
		box-shadow: 0 20rpx 42rpx rgba(0, 0, 0, 0.22);
		overflow: hidden;
	}

	.oilItem {
		padding: 28rpx 0;
		text-align: center;
		position: relative;
	}

	.oilItem>view {
		padding: 6rpx 0;
	}

	.oilItem .o2 {
		font-size: 20rpx;
		color: #8ea7c5;
	}

	.oilItem .oilTxt {
		font-weight: 700;
		font-size: 36rpx;
		color: #f4fbff;
	}

	.editableTxt {
		text-decoration: underline;
		text-decoration-color: #77dfff;
		text-underline-offset: 8rpx;
	}

	.lineV {
		position: absolute;
		height: 72rpx;
		border: 1rpx solid rgba(124, 218, 255, 0.16);
		top: 36rpx;
	}

	.tmV {
		padding: 0 20rpx;
		margin-top: 22rpx;
	}

	.tmV>view>view {
		background: linear-gradient(180deg, rgba(14, 30, 53, 0.96) 0%, rgba(9, 19, 36, 0.92) 100%);
		border-radius: 24rpx;
		display: flex;
		justify-content: space-between;
		padding: 34rpx 30rpx;
		border: 1px solid rgba(124, 218, 255, 0.12);
		box-shadow: 0 20rpx 42rpx rgba(0, 0, 0, 0.22);
	}

	.tmV>view>view>view>view:first-child {
		font-size: 32rpx;
		font-weight: 700;
		color: #f4fbff;
	}

	.tmV>view>view>view>view:last-child {
		color: #8ea7c5;
		font-size: 24rpx;
		margin-top: 14rpx;
		line-height: 1.35;
	}

	.conV {
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 16rpx;
		font-size: 14px;
	}


	.conV .descV {
		margin-top: 10rpx;
	}

	.funList {
		padding: 10rpx;
		text-align: center;
	}

	.funList>view {
		background: linear-gradient(180deg, rgba(14, 30, 53, 0.96) 0%, rgba(9, 19, 36, 0.92) 100%);
		border-radius: 22rpx;
		text-align: center;
		padding: 24rpx 0;
		border: 1px solid rgba(124, 218, 255, 0.12);
		box-shadow: 0 18rpx 34rpx rgba(0, 0, 0, 0.18);
	}

	.login-form-content {
		margin: 0 auto;

		padding-left: 20px;
		padding-right: 20px;


		.icon-left {
			padding-right: 40rpx;
		}

		.icon-left::after {
			content: "\e7eb";
			color: grey;
		}

		.input-item {
			margin: 40rpx auto;
			margin-top: 20rpx;
				background: linear-gradient(180deg, rgba(13, 28, 50, 0.9) 0%, rgba(9, 20, 38, 0.82) 100%);
			height: 90rpx;
				border-radius: 18rpx;
				border: 1px solid rgba(124, 218, 255, 0.14);

			.icon {
				font-size: 38rpx;
				margin-left: 10px;
				color: #8ea7c5;
			}

			.input {
				width: 100%;
				font-size: 28rpx;
				line-height: 40rpx;
				text-align: left;
				padding-left: 30rpx;
			}

		}
		.cons-value{
			background: linear-gradient(180deg, rgba(13, 28, 50, 0.9) 0%, rgba(9, 20, 38, 0.82) 100%);
			padding: 30rpx 40rpx;
			border-radius: 18rpx;
			font-size: 34rpx;
			font-weight: bold;
			color: #f4fbff;
		}
		
		.login-btn {
			margin-top: 40px;
			height: 45px;
			background: linear-gradient(135deg, #3df0d7 0%, #2f86ff 100%);
			color: #ffffff;
			border-radius: 18px;
		}

		.login-btn2 {
			margin-top: 40px;
			height: 45px;
			background: rgba(105, 121, 142, 0.4);
			color: rgba(255,255,255,0.65);
			border-radius: 18px;
		}

		.reg {
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
		}

		.xieyi {
			color: #333;
			margin-top: 20px;
		}

	}

	.pv {
		background: linear-gradient(180deg, rgba(14, 30, 53, 0.98) 0%, rgba(9, 19, 36, 0.95) 100%);
		border-radius: 24rpx;
		padding: 40rpx;
		border: 1px solid rgba(124, 218, 255, 0.14);

	}

	.pv>view:first-child {
		font-size: 16px;
		padding-bottom: 20rpx;
		font-weight: bold;
		color: #f4fbff;
	}

	.wmlists {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-height: 420rpx;
		overflow: auto;
	}

	.wmlist {
		background: rgba(20, 41, 70, 0.92);
		padding: 40rpx;
		margin: 10rpx;
		border-radius: 26rpx;
		border: 1px solid rgba(124, 218, 255, 0.12);
	}

	.selwmList {
		background-image: url('../../../static/check.png');
		background-position: right bottom;
		background-repeat: no-repeat;
		border: 1px solid #4eece0;
	}
	.no-oil{
		background-color: #ff4d5f;
		color: #fff;
		padding: 10rpx 0;
		padding-left: 60rpx;
	}
	.self-symbol{
		width: 58rpx;
	}
	.modetimes{
		padding: 20rpx 42rpx;
		min-width: 224rpx;
		box-shadow: 0 10rpx 20rpx rgba(68, 53, 31, 0.08);
		// background-color: #00BD54;
	}
	.ml-10{
		margin-left: 10rpx;
	}
	.ble-log-btn {
		position: fixed;
		bottom: 160rpx;
		right: 20rpx;
		z-index: 9999;
		background: rgba(0,0,0,0.65);
		color: #00ff88;
		font-size: 22rpx;
		padding: 10rpx 18rpx;
		border-radius: 30rpx;
	}
	.ble-log-panel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9998;
		height: 520rpx;
		background: rgba(10,10,10,0.92);
		display: flex;
		flex-direction: column;
	}
	.ble-log-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12rpx 20rpx;
		color: #fff;
		font-size: 26rpx;
		border-bottom: 2rpx solid #333;
		flex-shrink: 0;
	}
	.ble-log-body {
		flex: 1;
		height: 460rpx;
	}
	.ble-log-item {
		padding: 4rpx 12rpx;
		font-size: 20rpx;
		border-bottom: 1rpx solid #1a1a1a;
	}
	.log-rx { color: #00ff88; }
	.log-tx { color: #ffcc00; }
	.log-time { color: #666; font-size: 18rpx; }
	.log-dir { font-weight: bold; margin: 0 6rpx; }
	.log-hex { word-break: break-all; }
</style>

$2
