<template>
	<view>
		<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" right-icon="gear" :title="devName" @clickLeft="back" @clickRight="navitoSet"/>
		<!-- <view v-if="warring" class="no-oil">
			{{$t('com.starvation')}}
		</view> -->
		
		<!-- <view class="ttip" v-if="funEntity.oilState != 0 ">
			<text>{{$t('estimated-use-time')}}:{{oilEntity.useDay}}{{$t('com.day')}} </text>
		</view> -->
		<view class="timg">
			<view style="position: relative;">
				<image src="/static/images/timebg.png" mode="heightFix" style="height:340rpx;"></image>
				<view v-if="parameterMode==1">
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
					<div>剩余时间</div>
					<div style="margin-top: 16rpx;font-size: 42rpx;font-weight: bold;">{{timeFormat(simpleMode)}}</div>
				</view>
			</view>
			<!-- <view v-if="parameterMode==1" class="flex justify-center" style="font-size: 28rpx;margin-top: 48rpx;"> -->
			<view class="flex justify-center" style="font-size: 28rpx;margin-top: 48rpx;">
				<div class="modetimes" :style="{borderRadius: '30rpx 0 0 30rpx',color:currentState==1? '#fff':'#000',backgroundColor:currentState==1? '#00BD54':'#F1F1F1'}">{{$t('com.work')}} 
					<span v-if="currentState==1" class="ml-10">{{countdownNum}}</span>
					<span v-else class="ml-10">
						<span v-if="parameterMode == 0">
							{{maxWorktime}}
						</span>
						<span v-else>
							{{curModeMsg.wtimes||0}}
						</span>
					</span>
				s</div> 
				<div class="modetimes" :style="{borderRadius:'0 30rpx 30rpx 0',color:currentState==2? '#fff':'#000',backgroundColor:currentState==2? '#00BD54':'#F1F1F1'}">{{$t('com.pause')}} 
					<span v-if="currentState==2" class="ml-10">{{countdownNum}}</span>
					<span v-else class="ml-10">
						<span v-if="parameterMode == 0">
							{{maxPausetime}}
						</span>
						<span v-else>
							{{curModeMsg.ptimes||0}}
						</span>
					</span>
				s</div>
			</view>
			<!-- <view v-else class="flex justify-center" style="margin-top: 20rpx;">
				<div class="modetimes" style="background-color: #00BD54;border-radius: 30rpx;color: #fff;">
					剩余时间: {{timeFormat(simpleMode)}}
				</div> 
			</view> -->
		</view>
		<view class="oilV">
			<view>
				<uni-row>
					<uni-col :span="6">
						<view class="oilItem" @click="openOCPopup()">
							<view>{{$t('oil-capacity')}}</view>
							<view class="o2"><text class="oilTxt">{{oilEntity.capacity}}</text>ML</view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem" @click="openCAPPopup()">
							<view>{{$t('surplus-capacity')}}</view>
							<view class="o2"><text class="oilTxt">{{oilEntity.remain}}</text>ML</view>
							<view class="lineV"></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem">
							<view>{{$t('com.qtrip')}}</view>
							<view class="o2"><text class="oilTxt">{{(oilEntity.realityConsumption/10).toFixed(1)}}</text>ML/H</view>
							<view class="lineV"></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem">
							<view>{{$t('com.signal')}}</view>
							<view>
								<image v-if="!isOffline" src="@/static/bleon.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
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
						<view>{{$t('work-pattern')}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<image src="../../../static/time.png" mode="heightFix" style="height:50rpx;"></image>
					</view>
				</view>

				<view style="width:calc(50% - 10rpx);float: right;" @click="openOTPopup()">
					<view>
						<view>{{$t('oil-type')}}</view>
						<view>{{typeEntity.oilType}}</view>
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
		<view style="position: absolute;top: 150rpx;right: 30rpx; text-align: center;">
			<image :src="switchSelected == true? '../../../static/switch.png':'../../../static/switch1.png'" mode="heightFix" style="height:120rpx;" @click="handleControl"></image>
			<div :style="{color:switchSelected == true? '#00cb9b':'#cfcfcf'}">{{switchSelected == true? 'ON':'OFF'}}</div>
		</view>
		<view class="flex">
			<button size="mini" @click="clearLogger">清除日志</button>
			<button size="mini" @click="demo">添加一条</button>
		</view>
		<!-- <view class="logger" ref="scrollContainer">
			<div v-for="item in testlogger">{{item}}</div>
		</view> -->
		<scroll-view class="logger" scroll-y :scroll-top="scrollTop" @scroll="onScroll">
			<div style="width: 95vw;word-wrap:break-word;" v-for="item in testlogger">{{item}}</div>
		</scroll-view>
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
		<view class="disV" v-if="isOffline">
			<view>
				<view>{{$t('notconnect-tip')}}</view>
			</view>
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
				scrollTop: 0,
				oldScrollTop: 0,
				// logList: ['123456'],
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
					workModel: this.$t('com.pattern'),
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
				devicemsg: {}, //设备信息：pk，dk
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
				warring: false,//精油报警
				oilConditionHex:'',//油状态16进制
				platform: uni.getStorageSync('platform'), //平台
				rssiNum: null,//信号值
				rssiTimer: null,
				errorCode:'',
				bleHasreport: false,
				updateModeTimer: null, //当前模式心跳包
				currentState: 0, //当前工作的状态 0-停止状态，1-工作状态，2-暂停状态 
				countdownNum: 0, //工作、暂停倒计时
				countDownTimer: null, //倒计时定时器
				curModeMsg:{wtimes:10,ptimes:20},
				maxWorktime: 0,//简易模式最大工作时间
				maxPausetime: 0,//简易模式最大暂停时间
				// curModeMsg:{ //当前启用模式的信息
				// 	modeNum: 1, //模式几
				// 	btime: '', //开始时间
				// 	etime: '', //结束时间
				// 	wtimes: '', //工作时间
				// 	ptimes :'', //暂停时间
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
			...mapGetters(['isOffline','pauseTimeMin','pauseTimeMax','workTimeMin','workTimeMax','workStep','workModelHexStr','parameterMode','simpleMode','testlogger'])
		},
		onLoad(e) {
			// this.devicemsg = e;
			// this.title = this.devicemsg.deviceName;
			// if (this.devicemsg.onlineStatus != 1) {
			// 	this.isOffline = true;
			// }
			// this.filterCurModeMsg('001f0a140d3b01000a0005017f03000f0001000a0078027f0000000001000a0078037f0000000001000a0078047f0000000001000a0078')
			this.bleHasreport = false
			this.bleDeviceId = e.deviceId
			this.getTimeData()
			this.connetDevice(this.bleDeviceId)
			this.characteristicValueChange()
			this.checkConnetState()
			// uni.showLoading({
			// 	mask: true
			// })
		},
		onUnload() {
			clearInterval(this.rssiTimer)
			this.rssiTimer = null
			// this.closeble(this.bleDeviceId)
			uni.closeBluetoothAdapter()
		},
		onShow() {
			this.getOilTypeValue()
			// this.changeData(23,'000501f4000501f405')
			// this.filterCurModeMsg('001f0800160000000a0005017f0d000f0001000a0078027f0c020c0701000a0078037f0c00110001000a0078047f07000a0001000a0078')		
			console.log(this.updateModeTimer);
			if(!this.updateModeTimer && this.workModelHexStr){
				this.filterCurModeMsg(this.workModelHexStr)
				this.updateModeTimer = setInterval(()=>{
					this.filterCurModeMsg(this.workModelHexStr)
				},5000)
			}
		},
		onHide() {
			if(this.updateModeTimer){
				clearInterval(this.updateModeTimer)
				this.updateModeTimer = null
			}
		},
		methods: {
			onScroll(e) {
				console.log('滚动',e);
			  this.oldScrollTop = e.detail.scrollTop
			},
			// 滚动到容器底部
			scrollToBottom() {
				// const container = this.$refs.scrollContainer;
				this.scrollTop = 999
				// 备选方案：通过延迟确保滚动生效
			  setTimeout(() => {
				this.scrollTop = this.scrollTop + 1
			  }, 1000)
			},
			demo(){
				let logList = this.testlogger
				logList.push('1225488asdasdsa5d456as4d56sa4d564sa65d4as65d465as4d654as65d465as4d9')
				this.$store.commit('SET_TESTLOGGER',logList)
				this.$nextTick(() => {
					this.scrollToBottom();
				});
			},
			clearLogger(){
				this.$store.commit('SET_TESTLOGGER',[])
			},
			timeFormat(time){
				// console.log(time);
				if(!time) return "00:00"
				const h = Math.floor(time/60)
				const m = time%60
				let times = h.toString().padStart(2,'0') + ':' + m.toString().padStart(2,'0')
				return times
			},
			//设置倒计时
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
					// 简易模式
					if(this.currentState == 1){
						// 工作
						this.countdownNum = this.maxWorktime
					}else if(this.currentState == 2){
						// 暂停
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
					newHour = '12' //凌晨12点
				}
				return newHour+':'+time.split(':')[1]
			},
			//筛选出当前执行的定时模式
			filterCurModeMsg(hexStr){
				const nowDate = new Date()
				let nowDate2 = new Date()
				const curH = nowDate.getHours() //当前小时
				const curM = nowDate.getMinutes() //当前分钟
				const days = nowDate.getDay() //周几
				// console.log(curH);
				// console.log(curM);
				const curMin = Number(curH)*60+Number(curM) //统一把当前的时间小时转换为分钟
				// console.log(curMin);
				let isSet = false //判断是否存在全部定时器未开启的情况
				let modeList = []; //当前工作中模式的列表
				let nextModeList = [] //下次个执行的模式数据。比如2组定时都开启了,时间分别为 组一(9:00-10:00) 组二(12:00-13:00),当前时间为11:30,则需要把组2的数据先显示出来,因为未到时间所以频率都为0
				let defaultList = [] //第二天的定时数据。如果当前时间没有符合条件的定时（今天的定时器都执行完毕），则默认显示第一条定时（第二天最早的一条定时）
				const byteArr = this.hexToBytes(hexStr);
				const groupSize = byteArr.length / 11;
				let sTime = ''
				for (let n = 0; n < groupSize; n++) {
					const p1 = byteArr[11 * n]; // Pl:模式标志(分别代表五个模式:0-4)
					const p2 = byteArr[11 * n + 1]; // P2:为该模式工作日b0~b6表示周一至周日
					const p3 = byteArr[11 * n + 2]; // P3,P4: 起始时间、小时分钟
					const p4 = byteArr[11 * n + 3];
					const p5 = byteArr[11 * n + 4]; // P5,P6: 结束时间、小时分钟
					const p6 = byteArr[11 * n + 5];
					const p7 = byteArr[11 * n + 6]; // P7: 控制开关0关闭，1打开
					const p8 = byteArr[11 * n + 7]; // P8，P9:工作时间，P8低八位，P9是高八位
					const p9 = byteArr[11 * n + 8];
					const p10 = byteArr[11 * n + 9]; // P10,P11:停止时间，P10低八位，P11是高八位
					const p11 = byteArr[11 * n + 10];
					
					// console.log('p2==========>',p2);
					const hasInWeekend = this.hasInWeekendTime(p2,days) //今天（周几）是否有开启定时
				
					const model = {
						pattern: this.$t('com.pattern') + (p1 + 1).toString(),
						selected: (p7 == 1 ? true : false),
						btime: p3.toString().padStart(2,'0') + ':' + p4.toString().padStart(2,'0'),
						etime: p5.toString().padStart(2,'0') + ':' + p6.toString().padStart(2,'0'),
						bmin: Number(p3)*60+Number(p4), //时转换为分
						emin: Number(p5)*60+Number(p6), //时转换为分
						wtimes: this.getIntegerValue(p9, p8),
						ptimes: this.getIntegerValue(p11, p10),
					}
					if(p7 == 1){
						isSet = true
					}
					// if(defaultList.length==0){
					if(model.bmin!=model.emin && p7 == 1){
						// const tomorrowDays = Number(days)+1 ==7? 0:Number(days)+1
						// const hasIntomorrow = this.hasInWeekendTime(p2,tomorrowDays) //查询明天是否包含该定时
						// console.log('hasIntomorrow==>',hasIntomorrow);
						// if(hasIntomorrow){
							const model2 = {
								week: Number(p2).toString(2).padStart(7,'0').split('').reverse(),
								pattern: this.$t('com.pattern') + (p1 + 1).toString(),
								btime: p3.toString().padStart(2,'0') + ':' + p4.toString().padStart(2,'0'),
								etime: p5.toString().padStart(2,'0') + ':' + p6.toString().padStart(2,'0'),
								bmin: Number(p3)*60+Number(p4), //时转换为分
								emin: Number(p5)*60+Number(p6), //时转换为分
								wtimes: 0,
								ptimes: 0,
							}
							defaultList.push(model2)
						// }
					}
					
					if(p7 == 1 && hasInWeekend && model.bmin!=model.emin){
						//1、定时是否开启 
						
						// if(p7 == 1 && curMin>model.bmin&& curMin<model.emin ){
								
						// console.log(model.btime);
						if(model.bmin<=curMin && model.emin>=curMin){
							//2、定时开始时间必须小于等于当前时间 3、结束时间必须大于等于当前时间
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
					// 当前是否有满足条件的定时开启
					// 按开始时间排序
					// modeList.sort((a, b) => a.bmin - b.emin);
					// console.log(modeList);
					// console.log('==========正常情况显示==========');
					this.curModeMsg = modeList[0]
				}else{
					// 是否满足后面时间还有未开启的定时器
					if(nextModeList.length>0){
						// console.log('==========后面还有开始的定时器，这个时间点之前的定时器已经执行完。目前处于等待状态==========');
						nextModeList.sort((a, b) => a.bmin - b.bmin);
						this.curModeMsg = nextModeList[0]
					}else{
						if(isSet){
							// 如果不满足以上条件则说明今日的定时器已经全部执行完成，把第一次开启的定时器作为明天的定时显示（已废弃）
							// 如果不满足以上条件则说明今日的定时器已经全部执行完成，defaultList数组内会排除掉关闭的定时和两个时间相同的定时，在这里处理星期和时间的排序
							if(defaultList.length>0){
								// 先按照星期日期排序
								console.log(this.sortByNearestAvailableDay(defaultList));
								const defaultFilterList = this.sortByNearestAvailableDay(defaultList)
								if(defaultFilterList.length>0){
									this.curModeMsg = defaultFilterList[0]
								}else{
									//虽然定时器开关打开了，但是每一天都为关闭的状态（周定时）
									this.curModeMsg = {
										wtimes:0,
										ptimes:0
									}
								}
							}
							// defaultList = defaultList.sort((a, b) => a.bmin - b.bmin);
							// console.log(defaultList);
							// console.log(JSON.stringify(defaultList));
							
						}else{
							// console.log('==========全部定时器都关闭==========');
							//全部定时器未开启的情况
							this.curModeMsg = {
								wtimes:0,
								ptimes:0
							}
						}
					}
				}
				
			},
			sortByNearestAvailableDay(data) {
			  // 获取今天是星期几（0=周日, 6=周六）
			  const today = new Date().getDay();
			  let targetDay = today;
			  let num = 0
			  while (true) {
				if(num < 8){
			    // 检查当前目标日期是否有效（0-6）
			    if (targetDay < 0) targetDay = 6;
			    if (targetDay > 6) targetDay = 0;
			    
			    // 查找匹配当前目标日期的数据
			    const availableData = data.filter(item => item.week[targetDay] === '1');
			    
			    // 如果找到数据，则按btime排序
			    if (availableData.length > 0) {
			      return availableData.sort((a, b) => {
			        const timeA = a.btime.split(':').map(Number);
			        const timeB = b.btime.split(':').map(Number);
			        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
			      });
			    }
			    
			    // 如果没有找到数据，继续检查下一个日期
				num++
			    targetDay = (targetDay + 1) % 7;
				}else{
					return []
				}
			  }
			},
			//判断定时在今天有无开启
			hasInWeekendTime(timeData,week){
				//这个辅助函数通过今天是周几作为下标，看看对应数组内的值是0还是1，为0则关闭，为1则开启
				// timeData为10进制的数字，用bit判断周几有定时; week:周几 0-7，0为周日
				const timeStr = timeData.toString(2).padStart(7,'0') //补齐7天数据
				const timeList = timeStr.split('').reverse() //数组格式且周一到周日顺序排列
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
			// 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。获取实时信号
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
				let week = nowDate.getDay() //周几（0-6）
				if(week == 0){ //适配文档(1-7代表周一至周日)
					week = 7
				}
				let nowyear = nowDate.getFullYear()
				let yearStr = +nowyear - 2000
				let yearHex = +yearStr.toString(16)//年16进制
				if(yearHex.length<2){
					yearHex = '0'+yearHex
				}
				let monthHex = (nowDate.getMonth()+1).toString(16)//月16进制
				if(monthHex.length<2){
					monthHex = '0'+monthHex
				}
				let dayHex = nowDate.getDate().toString(16)//日16进制
				if(dayHex.length<2){
					dayHex = '0'+dayHex
				}
				let hourHex = nowDate.getHours().toString(16)//小时16进制
				if(hourHex.length<2){
					hourHex = '0'+hourHex
				}
				let minuteHex = nowDate.getMinutes().toString(16)//分钟16进制
				if(minuteHex.length<2){
					minuteHex = '0'+minuteHex
				}
				let secondHex = (Number(nowDate.getSeconds())+2).toString(16)//秒16进制
				if(secondHex.length<2){
					secondHex = '0'+secondHex
				}
				let weekHex = week.toString(16) //周几16进制
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
			connetDevice(deviceId){//连接设备
				let _this = this
				uni.createBLEConnection({
					timeout: 5000,
					deviceId,
					success: res => {
						console.log(res);
						console.log('连接蓝牙成功:' + res.errMsg);
						setTimeout(()=>{
							if(this.platform == 'android'){ 
								_this.setMtu(deviceId)
							}else{
								_this.getServices(deviceId)
							}
							// _this.rssiTimer = setInterval(()=>{
							// 	_this.getBleRSSI()
							// },3000)
						},2000)
					},
					fail: e => {
						console.log('连接低功耗蓝牙失败，错误码：' + e.errCode); 
						if (e.errCode !== 0) {
							uni.hideLoading()
							// _this.isOffline = true;
							_this.$store.commit('SET_OFFLINE',true)
							_this.errorCode = e.errCode
							// initTypes(e.errCode);
						}
					}
				})
			},
			setMtu(deviceId){
				let _this = this
				uni.setBLEMTU({deviceId,mtu:256,success:sue=>{
					console.log('succ====>',sue);
					setTimeout(()=>{
						_this.getServices(deviceId)
					},1500)
				}})
			},
			getServices(deviceId){//获取蓝牙设备所有服务
				let _this = this
				uni.getBLEDeviceServices({
				  deviceId,
				  success(res) {
				    console.log('device services:', res.services)
					_this.getValueChange(deviceId)
					
				  }
				})
			},
			getValueChange(deviceId){
				let _this = this
				//找到型号为K5-BTS的设备
				uni.notifyBLECharacteristicValueChange({
				  state: true, // 启用 notify 功能
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId,
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId:'0000FFF0-0000-1000-8000-00805F9B34FB',
				  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				  characteristicId:'0000FFF1-0000-1000-8000-00805F9B34FB',
				  success(res) {
					console.log(res)
					console.log('notifyBLECharacteristicValueChange success', res.errMsg)
					setTimeout(()=>{
						console.log(_this.timeData);
						getApp().writeData(_this.bleDeviceId,_this.timeData,false,'1c')
					},1000)
					setTimeout(()=>{
						uni.hideLoading()
						getApp().writeData(_this.bleDeviceId,'00',true)
					},2000)
				  }
				})
			},
			characteristicValueChange(){//监听特征值变化
				let _this = this
				uni.onBLECharacteristicValueChange(function (res) {
					console.log(res);
					console.log(getApp().ab2hex(res.value));
					let hexStr = getApp().ab2hex(res.value)
					let loggerList = _this.testlogger
					loggerList.push('receive<==========='+hexStr)
					_this.$store.commit('SET_TESTLOGGER',loggerList)
					_this.$nextTick(() => {
						_this.scrollToBottom();
					});
					let dpId = parseInt(hexStr.substring(12,14),16) 
					let value = hexStr.substring(20,hexStr.length-2)
					if(dpId == 20){
						_this.oilConditionHex = value
					}
					_this.changeData(dpId,value)
				})
			},
			//基础值赋值
			changeData(dpId,value){
				console.log('dpId...',dpId);
				console.log('value...',value);
				let val
				switch (dpId){
					case 1: //开关 BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.switchSelected = false
						}else{
							this.switchSelected = true
						}
						break;
					case 3://喷雾挡位 ENUM枚举 0 - 大容量 1 - 中容量 2 - 小容量
						// let val = parseInt(value,16)
						// if(val == 0){
						
						// }else if(val == 1){
					
						// }else{
							
						// }
						break;
					case 4: // 风扇开关 BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.selEntity.fanSelected = false
						}else{
							this.selEntity.fanSelected = true
						}
						break;
					case 5: //童锁 BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.selEntity.lockSelected = false
						}else{
							this.selEntity.lockSelected = true
						}
						break;
					case 9: //灯光开关 BOOL
						val = parseInt(value,16)
						if(val == 0){
							this.selEntity.lampSelected = false
						}else{
							this.selEntity.lampSelected = true
						}
						break;
					case 16: //故障 INT 1气泵异常，2风扇异常，电机异常
						// let val = parseInt(value,16)
						// if(val == 1){
							
						// }else if(val == 2){
							
						// }
						break;
					case 17: //精油报警
						let val = parseInt(value,16)
						if(val == 0){
							// this.warring = true
							this.warring = false
						}else if(val == 1){
							this.warring = true
							// this.warring = false
						}
						break;
					case 18: //工作模式 
						/*  Pl:模式标志(分别代表五个模式:0-4)
							P2:为该模式工作日b0~b6表示周一至周日
							P3,P4: 起始时间、小时分钟
							P5,P6: 结束时间、小时分钟: 
							P7: 控制开关0关闭，1打开
							P8，P9:工作时间，P8低八位，P9是高八位
							P10,P11:停止时间，P10低八位，
							P11是高八位
						*/
					   // this.workModelHexStr = value
					   this.filterCurModeMsg(value)
					   this.$store.commit('SET_MOMDELSTR',value)
						break;
					case 20: //功能定义
						/*  P1，P2:精油总容量: P1高八位，P2低八位
							P3，P4:精油当前容里: P3高八位，P4低八位
							P5: 精油消耗速度最后一位表示小数，比如:P5为50，表示5.0ML/H
							P6，P7:精油可用天数: P6高八位，P7低八位
						*/
					    this.getOilStatusEntity(value)
						break;
					case 22: //功能定义 
						/*  byte0-精油检测方式：0无，1-计算型，2-探测型
							byte1-方式：0无电机，1有电机。无不显示图标
							byte2-氛围灯：0无，1日光灯，2彩灯，3炫彩灯，无不显示图标
							byte3-电量显示：0无，1有，无不显示图标
							byte4-人休感应：0无，1有，无不显示图标
						*/
					    this.getFunData(value)
						break;
					case 23: //工作，暂停，步进时间范围
						/*  P1，P2:暂停时间最小值: P1高八位，P2低八位；
							P3，P4:暂停时间最大值: P3高八位，P4低八位；
							P5，P6:工作时间最小值: P5高八位，P6低八位；
							P7，P8:工作时间最大值: P7高八位，P8低八位；
							P9:步进值；
						*/
					    this.bleHasreport = true
					    this.getWorkData(value)
						break;
					case 24: //工作/暂停时间
						/*  P1:状态（0为停止状态，1为工作状态，2为暂停状态）
							P2,P3为对应的时：P2高八位，P3低八位
							P4,P5为当前模式的最大工作时间（P4高八位，P5低八位）
							P6,P7为当前模式的最大暂停时间（P6高八位，P7低八位）
						*/
					    const state = value.substr(0,2) //状态
					    const time = value.substr(2,4) //时长
					    const maxWorktime = value.substr(6,4) //最大工作时间
					    const maxPausetime = value.substr(10,4) //最大暂停时间
					    this.currentState = parseInt(state,16)
					    this.countdownNum = parseInt(time,16)
					    this.maxWorktime = parseInt(maxWorktime,16)
					    this.maxPausetime = parseInt(maxPausetime,16)
						console.log('当前的状态是===========>',state);
						console.log('当前的时间是===========>',time);
						this.setCountDownTimer(this.currentState)
						break;
					case 25://参数运行模式
						/* 0：简单模式；1：专业模式 */
						const valInt = parseInt(value,16)
						this.$store.commit('SET_PARAMETERMODE',valInt)
						break;
					case 26://简单模式下香氛浓度模式个数
						/*	数值为几代表有几个香氛浓度模式 */
						const gearNum = parseInt(value,16)
						this.$store.commit('SET_GEARNUM',gearNum)
						break;
					case 27://简单模式下参数
						/* P1，P2:定时时间: P1高八位，P2低八位；P3:香氛浓度模式（数值为几代表运行第几种香氛浓度） */
						const simpleTime = parseInt(value.substr(0,4),16) //定时时间
						const currentmode = parseInt(value.substr(4,6),16) //香氛浓度模式
						this.$store.commit('SET_SIMPLEMODE',simpleTime)
						this.$store.commit('SET_CURGEAR',currentmode)
						break;
				}
			},
			//===============================
			// //二进制数组转换为16进制
			// ab2hex(buffer){
			//   const hexArr = Array.prototype.map.call(new Uint8Array(buffer),
			//    function(bit){
			// 	 return ('00' + bit.toString(16)).slice(-2) 
			//   }) 
			//    return hexArr.join('') 
			// },
			// //状态数据单元
			// dataHexStr(dpid,type,value){
			// 	// 参数参考上面的 数据部分
			// 	let len = (value.length/2).toString(16)
			// 	//补齐2byte长度
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
				console.log('设置容量为=',this.capTypeValue);
				console.log('总容量=',this.oilEntity.capacity);
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
				// let data = getApp().dataHexStr('14','01','0096009515018c')//重置
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
			//保存精油类型的名称到本地
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
					if(hasOil>-1){ //判断本地数组里有无这个设备的记录，有则直接修改名称，无则push进数组
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
						url: `/pages/blemodule/blepattern/testmaintain`
					})
				}else{
					uni.showToast({
						icon:'none',
						title: this.$t("openSwitchTip")
					})
				}
			},
			// 油状态值（十六进制字符串）
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
			// 精油状态：容量、剩余容量、油耗
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
					consumption: p5? p5 : 0, //参考油耗
					useDay: this.getIntegerValue(p7, p6),
					realityConsumption:  p8? p8 : 0, //真实油耗
				};

				this.getCanUsedDays();
			},
			//减少精油油耗
			preCons(){
				let minConsumption = (this.oilEntity.consumption*0.7).toFixed(0)
				// console.log(minConsumption);
				if(this.oilEntity.realityConsumption<=minConsumption){
					return false
				}else{
					this.oilEntity.realityConsumption -= 1
				}
			},
			//增加精油油耗
			addCons(){
				let maxConsumption = (this.oilEntity.consumption*1.3).toFixed(0)
				// console.log(maxConsumption);
				if(this.oilEntity.realityConsumption>=maxConsumption){
					return false
				}else{
					this.oilEntity.realityConsumption += 1
				}
			},
			//油耗恢复默认值
			refreshCons(){
				this.oilEntity.realityConsumption = this.oilEntity.consumption
			},
			// 精油类型
			getOilTypeValue(datalist) {
				if(uni.getStorageSync('bleLocalOilTypeList')){
					let localArr = uni.getStorageSync('bleLocalOilTypeList')
					let hasOil = localArr.findIndex(ite=>ite.bleDeviceId === this.bleDeviceId)
					if(hasOil>-1){ //判断本地数组里有无这个设备的记录，有则直接修改名称，无则push进数组
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
			//功能定义
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
			checkConnetState(){//监听蓝牙断开重连
				let _this = this
				uni.onBLEConnectionStateChange(res=>{
					console.log('蓝牙已断开',res)
					if(!res.connected){//蓝牙断开重连过程
						// _this.isOffline = true;
						console.log('设置状态为true');
						_this.$store.commit('SET_OFFLINE',true)
						clearInterval(_this.rssiTimer)
						_this.rssiTimer = null
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
				const p1 = byteArr[0]; // -精油检测方式：0无，1-计算型，2-探测型
				const p2 = byteArr[1]; // -方式：0无电机，1有电机。无不显示图标
				const p3 = byteArr[2]; // -氛围灯：0无，1日光灯，2彩灯，3炫彩灯，无不显示图标
				const p4 = byteArr[3]; // -电量显示：0无，1有，无不显示图标
				const p5 = byteArr[4]; // -人休感应：0无，1有，无不显示图标
				const p6 = byteArr[5]; // -风扇：0无，1有，无不显示图标
				const p7 = byteArr[6]; // -按键锁：0无，1有，无不显示图标

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
				const p1 = workdata.substr(0,4) //暂停时间最小值
				const p2 = workdata.substr(4,4) //暂停时间最大值
				const p3 = workdata.substr(8,4) //工作时间最小值
				const p4 = workdata.substr(12,4) //工作时间最大值
				const p5 = workdata.substr(16,2) //步进值
				// console.log('暂停最小值',p1);
				// console.log('暂停最大值',p2);
				// console.log('工作最小值',p3);
				// console.log('工作最大值',p4);
				// console.log('步长',p5);
				this.$store.commit('SET_PAUSETIMEMIN',parseInt(p1,16))
				this.$store.commit('SET_PAUSETIMEMAX',parseInt(p2,16))
				this.$store.commit('SET_WORKTIMEMIN',parseInt(p3,16))
				this.$store.commit('SET_WORKTIMEMAX',parseInt(p4,16))
				this.$store.commit('SET_WORKSTEP',parseInt(p5,16))
			},
			//下发指令
			sendOrder(type) {
				let datas = {};

				switch (type) {
					case 'fan': //风扇开关
						datas = {
							fan_switch: this.selEntity.fanSelected
						}
						break;
					case 'lamp': // 氛围灯
						datas = {
							light_switch: this.selEntity.lampSelected
						}
						break;
					case 'lock': // 锁屏开关
						datas = {
							lock: this.selEntity.lockSelected
						}
						break;
					case 'up_down': // 点击开关
						datas = {
							up_down: (this.selEntity.tvSelected == true ? 0 : 1)
						}
						break;
					case 'switch': // 设备开关
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
					console.log('发送指令结果：');
					console.log(res)
				})
			},
			// 获取低八位、高八位的整数值
			getIntegerValue(lowByte, highByte) {
				var integerValue = (highByte << 8) | lowByte;
				return integerValue;
			},
			// 十六进制转byte数组
			hexToBytes(hex) {
				let bytes = [];
				for (let i = 0; i < hex.length; i += 2) {
					bytes.push(parseInt(hex.substr(i, 2), 16));
				}
				return bytes;
			},
			// 可使用天数
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
	.ttip {
		color: #000000;
		height: 40px;
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

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
		padding-top: 44rpx;
		padding-bottom: 52rpx;
		position: relative;
		background: linear-gradient(#87dfca,#def4de);
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
	}

	.oilV>view {
		background-color: #ffffff;
		border-radius: 10rpx;
	}

	.oilItem {
		padding: 20rpx 0;
		text-align: center;
		position: relative;
	}

	.oilItem>view {
		padding: 6rpx 0;
	}

	.oilItem .o2 {
		font-size: 9px;
	}

	.oilItem .oilTxt {
		font-weight: bold;
		font-size: 16px;
	}

	.lineV {
		position: absolute;
		height: 50rpx;
		border: 1rpx solid #EFEFEF;
		top: 45rpx;
	}

	.tmV {
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.tmV>view>view {
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
	}

	.tmV>view>view>view>view:first-child {
		font-size: 16px;
		font-weight: bold;
	}

	.tmV>view>view>view>view:last-child {
		color: #B5B5B5;
		font-size: 12px;
		margin-top: 20rpx;
	}

	.conV {

		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 10rpx;
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
		background-color: #ffffff;
		border-radius: 10rpx;
		text-align: center;
		padding: 20rpx 0;
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
			background-color: #f5f6f7;
			height: 90rpx;
			border-radius: 10rpx;

			.icon {
				font-size: 38rpx;
				margin-left: 10px;
				color: #999;
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
			background-color: #f5f6f7;
			padding: 30rpx 40rpx;
			border-radius: 10rpx;
			font-size: 34rpx;
			font-weight: bold;
		}
		
		.login-btn {
			margin-top: 40px;
			height: 45px;
			background-color: #01CBA5;
			color: #ffffff;
			border-radius: 10px;
		}

		.login-btn2 {
			margin-top: 40px;
			height: 45px;
			background-color: #AAAAAA;
			color: #ffffff;
			border-radius: 10px;
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
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 40rpx;

	}

	.pv>view:first-child {
		font-size: 16px;
		padding-bottom: 20rpx;
		font-weight: bold;
	}

	.wmlists {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-height: 420rpx;
		overflow: auto;
	}

	.wmlist {
		background-color: #f5f6f7;
		padding: 40rpx;
		margin: 10rpx;
		border-radius: 26rpx;
		border: 1px solid #ffffff;
	}

	.selwmList {
		background-image: url('../../../static/check.png');
		background-position: right bottom;
		background-repeat: no-repeat;
		border: 1px solid #00AD8D;
	}
	.no-oil{
		background-color: #ff0000;
		color: #fff;
		padding: 10rpx 0;
		padding-left: 60rpx;
	}
	.self-symbol{
		width: 58rpx;
	}
	.modetimes{
		padding: 18rpx 40rpx;
		// background-color: #00BD54;
	}
	.ml-10{
		margin-left: 10rpx;
	}
	.logger{
		width: 100%;
		height: 20vh;
		max-height: 20vh;
		background-color: #000000;
		color: #fff;
		overflow-y: auto;
	}
</style>