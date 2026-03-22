<template>
	<view class="">
		<!-- 标题 -->
		<view class="page-title temp-page-title">
			<image class="back-icon" src="../../../static/back.png" @click="back"></image>
			<div class="title-text">
				{{$t('search-device')}}
			</div>
			<!-- <image style="width: 35rpx;height: 35rpx;" src="../../../static/images/home/scan.png" mode="" @click="scanDevice"></image> -->
		</view>
		<view v-if="deviceList.length>0">
			<scroll-view class="devicelist-content" scroll-y="true" show-scrollbar>
				<view v-for="(item,index) in deviceList" :key="item.mac || (item.bleDevice && item.bleDevice.mac) || index" class="device-item2 mrtop">
					<view class="flex justify-between align-center">
						<view class="flex align-center">
							<div class="flex justify-center items-center" style="width: 152rpx;height: 152rpx;overflow: hidden;background-color: #37375A;">
								<image class="search-dev-img" :src="item.productLogo" mode=""></image>
								<!-- <image style="width: 88rpx;" mode="widthFix" :src="item.productLogo"></image>
								<image v-if="item.pk == 'p11r26'||item.productKey == 'p11r26'" src="../../../static/off-light.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.pk == 'p11sq3'||item.productKey == 'p11sq3'" src="../../../static/01.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.pk == 'p11sq4'||item.productKey == 'p11sq4'" src="../../../static/02.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.pk == 'p11sq5'||item.productKey == 'p11sq5'" src="../../../static/03.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.pk == 'p11sq6'||item.productKey == 'p11sq6'" src="../../../static/04.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.pk == 'p11tgR'||item.productKey == 'p11tgR'" src="../../../static/05.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image> -->
							</div>
							<div>
								<view class="device-name">
									{{item.deviceName}}
								</view>
								<view class="device-statetext">
									productKey:
								</view>
								<view class="device-statetext" v-if="platform=='android'">
									{{item.bleDevice.productKey||item.bleDevice.pk}}
								</view>
								<view class="device-statetext" v-else>
									PIN:{{item.peripheralModel.productKey||item.peripheralModel.pk}}
								</view>
							</div>
						</view>
						<view class="connet-button" @click="showWifiPop(item)">{{$t('connect')}}</view>
					</view>
				</view>
			</scroll-view>

		</view>
		<view v-else>
			<view class="mrt-114">
				<image class="search-loading" src="../../../static/images/home/searchimg.png" mode=""></image>
			</view>
			<view class="mrt-186">
				<div class="opentips1">{{$t('open-network')}}</div>
				<div class="opentips2">{{$t('searching-device')}}</div>
			</view>
		</view>
		<view class="hisV">
			<text @click="showConWifiHistory">{{$t('wifi-connect-history')}}</text>
		</view>
		<uni-popup ref="wifipop" type="center" :mask-click="false">
			<view class="wifi-msg">
				<span style="position: absolute;font-size: 50rpx;right: 26rpx;top: 16rpx;" @click="closeWifiPop">x</span>
				<view class="wifi-title">
					{{$t('enter-wifi')}}
				</view>
				<view class="wifi-title">
					{{$t('choose-wifi')}}
				</view>
				<div style="text-align: center;margin-top: 30rpx;">
					<image class="tips-img" src="../../../static/connettips.png" mode=""></image>
				</div>
				<div v-if="isConnect" style="font-size: 40rpx;color: green;text-align: center;">{{$t('connecting')}}</div>
				<view class="flex justify-center items-center write-name" style="margin-top: 30rpx;position: relative;">
					<image class="wifi-icon" src="../../../static/WIFI.png" mode=""></image>
					<view class="wifi-ipt">
						<input class="" type="text" v-model="connetParams.ssid" :placeholder="$t('wifi-name')" value="">
					</view>
					<image class="wifi-icon" style="position: absolute;right: 80rpx;" src="../../../static/tab.png" mode="" @click="goSelectwifi"></image>
				</view>
				<view class="flex justify-center items-center write-name" style="position: relative;">
					<image class="psw-icon" src="../../../static/mima.png" mode=""></image>
					<view class="wifi-ipt">
						<input :type="wifiPswType" v-model="connetParams.pwd" :placeholder="$t('wifi-pwd')" value="">
					</view>
					<uni-icons v-if="wifiPswType=='text'" class="wifi-icon" color="#5ed2ef" style="position: absolute;right: 80rpx;" type="eye" size="20" @click="wifiPswType='password'"></uni-icons>
					<uni-icons v-if="wifiPswType=='password'" class="wifi-icon" color="#5ed2ef" style="position: absolute;right: 80rpx;" type="eye-slash" size="20" @click="wifiPswType='text'"></uni-icons>
					<!-- <image class="wifi-icon" style="position: absolute;right: 80rpx;" src="../../../static/tab.png" mode="" @click="wifiPswType='text'"></image> -->
					<!-- <div></div> -->
				</view>
				<view class="connet-btn" :style="{backgroundColor: isConnect? '#c5c5c5':'#FF6939'}" @click="connetDevice">
					<uni-icons v-if="isConnect" type="spinner-cycle"></uni-icons>
					<!-- 连接 -->
					{{$t('connect')}}
				</view>
				<view class="connet-btn" style="margin-top: 20rpx;" @click="disconnetDevice">
					<!-- 取消 -->
					{{$t('com.cancel')}}
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="wifiHistoryPop" type="center" :mask-click="true">
			<view class="wifi-msg">
				<view class="wifihisTitle">
					{{$t('wifi-connect-history')}}
				</view>
				<view>
					<uni-row>
						<uni-col :span="4">
							No.
						</uni-col>
						<uni-col :span="10">
							{{$t('wifi-name')}}

						</uni-col>
						<uni-col :span="10">

							{{$t('wifi-pwd')}}
						</uni-col>
					</uni-row>
				</view>
				<view class="wifihisContent">
					<view v-for="(item,index) in hisList" :key="item.ssid || item.bssid || index" class="wifihisList">
						<uni-row>
							<uni-col :span="4">
								{{index + 1}}
							</uni-col>
							<uni-col :span="10">
								{{item.ssid}}
							</uni-col>
							<uni-col :span="10">
								{{item.password}}
							</uni-col>
						</uni-row>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 开启附近权限提示 -->
		<uni-popup ref="vicinity" type="bottom" :mask-click="true">
			<view class="vicinity-content">
				<view class="vicinity-title">
					<!-- 建议开启蓝牙 -->
					{{$t('recommend')}}
					<uni-icons style="position: absolute;top: 50%;transform: translateY(-50%);right: 8%;" type="closeempty" @click="closeVicinityPop()"></uni-icons>
				</view>
				<view class="vicinity-tips">
					<!-- 允许本应用连接"附近的设备"权限 -->
					{{$t('connect-tips')}}
					<div style="margin-top: 10rpx;color: #FF6939;" @click="navtoSetting()">
						<!-- 去设置 -->{{$t('go-setting')}}
					</div>
				</view>
			</view>
		</uni-popup>
		<!-- 连接上之后修改名称 -->
		<uni-popup ref="gname" type="center" :mask-click="false">
			<view class="err-pop">
				<div class="gr-name text-center" style="padding: 20rpx 0;font-size: 40rpx;">{{$t('device-name')}}</div>
				<view class="input-item flex align-center input-shadow">
				  <input v-model="changeName" class="input" type="text" :placeholder="$t('device-name')" maxlength="30" />
				</view>
				<div class="close-errpop" @click="editDeviceName">
					<span class="login-btn cu-btn block lg round" style="width: 80%;margin: auto;background-color: #FF6939;color: #fff;">{{$t('com.confirm')}}</span> 
				</div>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		startConfigDevices
	} from "../../../api/config.js"
	import {
		bindDeviceSn,
		queryDeviceInfo,
		changeDeviceInfo,
		queryUserDeviceList
	} from "../../../api/devices.js"
	var configModule = uni.requireNativePlugin('XM-ConfigModule')
	export default {
		data() {
			return {
				// deviceList: [{
				// 	"nodeId": 0,
				// 	"capabilitiesBitmask": 1,
				// 	"progress": 0,
				// 	"name": "QUEC_BLE_f736",
				// 	"deviceBindPreState": 0,
				// 	"deviceBindModel": 0,
				// 	"endpoint": 0,
				// 	"discriminator": 0,
				// 	"messageType": 0,
				// 	"mac": "B4:ED:D5:78:F6:3B",
				// 	"productKey": "p11qj8",
				// 	"deviceKey": "b4edd578f736",
				// 	"bindingTiming": 0,
				// 	"fabricId": 0,
				// 	"deviceTypeId": 0,
				// 	"matterVendorId": 0,
				// 	"request": false,
				// 	"deviceBleConnect": 0,
				// 	"deviceType": 1,
				// 	"isNative": 0,
				// 	"matterProductId": 0,
				// 	"deviceBindState": 100
				// }],
				isConnect: false,//是否显示连接中提示
				deviceList:[],
				selectedDevice: {}, //点击弹窗的时候选中的那个设备信息
				connetParams: {
					list: {},
					ssid: null,
					pwd: uni.getStorageSync('wifipsw')||null,
				},
				scanObj: {}, //扫码出来的对象数组,
				hisList: [],
				changeName: null, //修改名称
				platform: uni.getStorageSync('platform'), 
				deviceKeyList: uni.getStorageSync('deviceKeyList'), //主页设备包含的deviceKeyList，扫描过滤主页已有设备
				bindDeviceList:uni.getStorageSync('bindDeviceList'),
				wifiPswType: 'password', //wifi输入的密码类型
			}
		},
		onLoad() {
			// this.requestLocation()
			// #ifdef APP
			setTimeout(() => {
				uni.startWifi({
					success(res) {
						console.log(res);
					}
				})
			}, 300)
			// #endif
			
			// setTimeout(()=>{
			// 	this.searchDevice()
			// },200)

		},
		onShow() {
			console.log('onshow.....');
			console.log(this.deviceKeyList);
			// setTimeout(()=>{
			// 	this.$refs.wifipop.open('center')
			// },1000)
			this.openBluetooth()
			// setTimeout(()=>{
			// 	this.showWifiPop()
			// },2000)
			// #ifdef APP
			setTimeout(()=>{
				this.getNowMsg()
			},1000)
			// #endif
		},
		onHide() {
			this.closeSearch()
		},
		onUnload() {
			this.closeSearch()
		},
		methods: {
			//获取设备详情
			getDeviceInfo(pk,dk){
				let para = {
					pk,
					dk
				}
				queryDeviceInfo(para).then(res=>{
					console.log(res);
					this.changeName = res.data.productName
					this.showgnamePop()
					console.log(this.changeName);
				})
			},
			closeVicinityPop(){
				this.$refs.vicinity.close()
			},
			showgnamePop(){
				this.$refs.gname.open('center')
			},
			closenamePop(){
				this.$refs.gname.close()
			},
			//跳转到手机设置
			navtoSetting(){
				this.closeVicinityPop()
				var main = plus.android.runtimeMainActivity(); //获取activity
				var Intent = plus.android.importClass('android.content.Intent');  
				// var mIntent = new Intent('android.settings.APPLICATION_SETTINGS');
				var Settings = plus.android.importClass('android.provider.Settings');  
				var Uri = plus.android.importClass('android.net.Uri')
				var intent = new Intent()
				intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
				var uri = Uri.fromParts('package', main.getPackageName(), null)
				intent.setData(uri)
				main.startActivity(intent)
				// var intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);//可设置表中所有Action字段  
				// main.startActivity(mIntent);
			},
			requestLocation(){
				let that = this
				 const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter')
				 const blueadapter = BluetoothAdapter.getDefaultAdapter();
				 console.log(blueadapter.startLeScan());
				// plus.android.requestPermissions(['android.permission.BLUETOOTH_SCAN'], function(e){
				// 	console.log(e);
				// 	if(e.deniedAlways.length>0){	//权限被永久拒绝
				// 		// 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
				// 		console.log('Always Denied!!! '+e.deniedAlways.toString()); 
				// 	}
				// 	if(e.deniedPresent.length>0){	//权限被临时拒绝
				// 		// 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限
				// 		console.log('Present Denied!!! '+e.deniedPresent.toString());
				// 	}
				// 	if(e.granted.length>0){	//权限被允许
				// 		//调用依赖获取定位权限的代码
				// 		console.log('Granted!!! '+e.granted.toString());
				// 		that.openBluetooth()
				// 	}
				// }, function(e){
				// 	console.log('Request Permissions error:'+JSON.stringify(e));
				// });
			},
			//获取当前连接wifi的信息
			getNowMsg() {
				let that = this
				uni.getConnectedWifi({
					success(res) {
						console.log(res);
						that.connetParams.ssid = res.wifi.SSID
					}
				})
			},
			//调用蓝牙权限，初始化蓝牙
			openBluetooth() {
				let that = this
				uni.openBluetoothAdapter({
					success(res) {
						console.log(res);
						that.searchDevice() 
					},
					fail(err){
						uni.showModal({
							title: this.$t('tipstitle'),
							content: this.$t('Bluetooth-init-fail'),
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									var main = plus.android.runtimeMainActivity(); //获取activity  
									var Intent = plus.android.importClass('android.content.Intent');  
									var Settings = plus.android.importClass('android.provider.Settings');  
									var intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);//可设置表中所有Action字段  
									main.startActivity(intent);
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						console.log(err);
					}
				})
			},
			//扫码二维码绑定
			scanDevice() {
				let that = this
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + JSON.stringify(res.result));
						that.scanObj = that.changeObj(res.result)
						that.bindDevice()
					}
				});
			},
			//处理扫码获取的数据转化成{key:value}
			changeObj(str) {
				let strArr = str.split(/&/g)
				let newArr = {}
				for (let i in strArr) {
					let key = strArr[i].split('=')[0]
					let val = strArr[i].split('=')[1]
					newArr = Object.assign(newArr, {
						[key]: val
					})
				}
				return newArr
			},
			//扫码绑定设备
			bindDevice() {
				let para = {
					pk: this.scanObj.pk,
					sn: this.scanObj.sn,
					deviceName: ''
				}
				console.log(para);
				bindDeviceSn(para).then(res => {
					console.log(res);
				})
			},
			//搜索附近设备
			searchDevice(){
				console.log(configModule);
				console.log('调用方法');
				let para = {
					name:'',
					mac:''
				}
				configModule.startBleScanDevice(para,res=>{
					console.log(res);
					if (res.success) {
						if(this.deviceKeyList.length>0){//如果设备列表界面有设备
							let hasLocalDev = []
							if(this.platform == 'android'){
								hasLocalDev = this.deviceKeyList.filter(ite=>ite.dk===res.data.deviceKey)
							}else{
								hasLocalDev = this.deviceKeyList.filter(ite=>ite.dk===res.data.dk)
							}
							if(hasLocalDev.length==0){
								// 这里的逻辑是先判断搜索出来的设备和本地设备存不存在（被绑定过的设备也会被搜索出来，所以本地已有的设备需要过滤），如果搜索到的设备key值在设备列表没出现过，则走这个判断
								if (this.deviceList.length > 0) {
									console.log(this.deviceList);
									let hasDevice = false //判断列表重是否已存在该设备
									for (let i in this.deviceList) {
										if (this.deviceList[i].mac === res.data.mac) {
											hasDevice = true
											break
										}
									}
									if (!hasDevice) {
										this.deviceList.push(res.data)
									}
								} else {
									this.deviceList.push(res.data)
								}
							}else{
								// 如果搜索到的设备在设备列表里已经存在
								console.log('是否出现过',hasLocalDev);
								console.log('是否出现过',hasLocalDev[0].onlineStatus);
								if(hasLocalDev[0].onlineStatus == 0){
									//判断设备列表的设备是否处于在线状态（有一种情况是设备重置了网络模块，但是设备列表里面还是能查出该设备，只是显示离线状态。再次绑定后可切换为在线）
									if (this.deviceList.length > 0) {
										console.log(this.deviceList);
										let hasDevice = false //判断列表重是否已存在该设备
										for (let i in this.deviceList) {
											if (this.deviceList[i].mac === res.data.mac) {
												hasDevice = true
												break
											}
										}
										if (!hasDevice) {
											this.deviceList.push(res.data)
										}
									} else {
										this.deviceList.push(res.data)
									}
								}
							}
							// console.log(hasLocalDev);
						}else{ //如果设备列表界面没有设备（新用户或者用户移除所有设备情况）
							if (this.deviceList.length > 0) {
								// console.log(this.deviceList);
								let hasDevice = false //判断列表重是否已存在该设备
								for (let i in this.deviceList) {
									if (this.deviceList[i].mac === res.data.mac) {
										hasDevice = true
										break
									}
								}
								if (!hasDevice) {
									this.deviceList.push(res.data)
								}
							} else {
								this.deviceList.push(res.data)
							}
						}
					} else {
						// this.$modal.msg(res.data)
						this.$refs.vicinity.open('bottom')
					}
				})
			},
			//搜索附近设备
			searchDevice1() {
				console.log(configModule);
				console.log('调用方法');
				let para = {
					name: '',
					mac: ''
				}
				configModule.startBleScanDevice(para, res => {
					console.log('搜索出的设备',res);
					console.log(this.deviceKeyList);
					if (res.success) {
						// if(this.bindDeviceList.length > 0){
						// 	let hasLocalDev1
						// 	if(this.platform == 'android'){
						// 		hasLocalDev1 = this.bindDeviceList.findIndex(ite=>ite.dk==res.data.deviceKey)
						// 	}else{
						// 		hasLocalDev1 = this.bindDeviceList.findIndex(ite=>ite.dk==res.data.dk)
						// 	}
						// 	console.log(hasLocalDev1);
						// }
						if(this.deviceKeyList.length>0){//如果设备列表界面有设备
							let hasLocalDev = []
							if(this.platform == 'android'){
								hasLocalDev = this.deviceKeyList.filter(ite=>ite.dk.toLocaleLowerCase() ===res.data.bleDevice.deviceKey.toLocaleLowerCase())
							}else{
								hasLocalDev = this.deviceKeyList.filter(ite=>ite.dk.toLocaleLowerCase()===res.data.dk.toLocaleLowerCase())
							}
							// console.log('是否出现过',hasLocalDev);
							// if(hasLocalDev==-1){
							if(hasLocalDev.length==0){
								// 这里的逻辑是先判断搜索出来的设备和本地设备存不存在（被绑定过的设备也会被搜索出来，所以本地已有的设备需要过滤），如果搜索到的设备key值在设备列表没出现过，则走这个判断
								if (this.deviceList.length > 0) {
									console.log(this.deviceList);
									let hasDevice = false //判断列表重是否已存在该设备
									for (let i in this.deviceList) {
										if (this.deviceList[i].bleDevice.mac == res.data.bleDevice.mac) {
											hasDevice = true
											break
										}
									}
									if (!hasDevice) {
										this.deviceList.push(res.data)
									}
								} else {
									this.deviceList.push(res.data)
								}
							}else{
								// 如果搜索到的设备在设备列表里已经存在
								console.log('是否出现过',hasLocalDev);
								console.log('是否出现过',hasLocalDev[0].onlineStatus);
								if(hasLocalDev[0].onlineStatus == 0){
									//判断设备列表的设备是否处于在线状态（有一种情况是设备重置了网络模块，但是设备列表里面还是能查出该设备，只是显示离线状态。再次绑定后可切换为在线）
									if (this.deviceList.length > 0) {
										console.log(this.deviceList);
										let hasDevice = false //判断列表重是否已存在该设备
										for (let i in this.deviceList) {
											if (this.deviceList[i].bleDevice.mac == res.data.bleDevice.mac) {
												hasDevice = true
												break
											}
										}
										if (!hasDevice) {
											this.deviceList.push(res.data)
										}
									} else {
										this.deviceList.push(res.data)
									}
								}
							}
							// console.log(hasLocalDev);
						}else{ //如果设备列表界面没有设备（新用户或者用户移除所有设备情况）
							if (this.deviceList.length > 0) {
								// console.log(this.deviceList);
								let hasDevice = false //判断列表重是否已存在该设备
								for (let i in this.deviceList) {
									if (this.deviceList[i].mac == res.data.mac) {
										hasDevice = true
										break
									}
								}
								if (!hasDevice) {
									this.deviceList.push(res.data)
								}
							} else {
								this.deviceList.push(res.data)
							}
						}
					} else {
						// this.$modal.msg(res.data)
						this.$refs.vicinity.open('bottom')
					}
				})
			},
			//关闭搜索
			closeSearch() {
				console.log('停止搜索');
				configModule.stopBleScanDevice(res => {
					console.log(res);
				})
			},
			//打开连接wifi的弹窗
			showWifiPop(item) {
				this.selectedDevice = item
				console.log(item);
				// this.getNowMsg()
				this.$refs.wifipop.open('center')
			},
			//关闭连接wifi的弹窗
			closeWifiPop() {
				this.$refs.wifipop.close()
			},
			disconnetDevice(){
				this.isConnect = false
				this.closeWifiPop()
			},
			//连接设备
			connetDevice() {
				if(this.isConnect){
					return false
				}
				if (this.connetParams.ssid === '') {
					this.$modal.msg(this.$t('input-wifi-name'))
					return false
				}
				if (this.connetParams.pwd === '') {
					this.$modal.msg(this.$t('input-wifi-pwd'))
					return false
				}
				uni.setStorageSync('wifipsw',this.connetParams.pwd)
				this.closeSearch()
				this.isConnect = true
				// uni.showLoading({
				// 	title: this.$t('connecting'),
				// 	mask: true
				// });
				let para = {
					deviceBean: this.selectedDevice,
					ssid: this.connetParams.ssid,
					password: this.connetParams.pwd,
				}
				console.log(para);
				// startConfigDevices(para).then(res => {
				configModule.startConfigDevices(para,res=>{
					console.log(res);
					// uni.hideLoading()
					
					if(this.platform == 'android'){
						if(res.data.quecResult && res.data.quecResult==true){
							this.isConnect = false
							this.closeWifiPop()
						// if (res.data.quecResult.code == 200) {
							this.saveWifiData();
							// this.$tab.reLaunch(`/pages/index`)
								// this.getDeviceInfo(this.selectedDevice.productKey,this.selectedDevice.deviceKey)
								// console.log(this.selectedDevice);
								// console.log(this.selectedDevice.bleDevice.deviceKey);
							// if('QUEC_PAIRING_WIFI_BINDING_FAIL')
							// if(res.data.errorCode.type == 'QUEC_PAIRING_WIFI_BINDING_SUCCESS'){
							if(res.data.errorCode.type.indexOf('SUCCESS')>-1){
								this.getDeviceList(this.selectedDevice.bleDevice.deviceKey)
							}else{
								this.$modal.msg('fail')
							}
						}else{
							if(res.data.quecResult==false){
								console.log('我被执行了',res.data.quecResult);
								this.isConnect = false
								this.$modal.msg('fail')
							}
						}
						//  else {
						// 	this.$modal.msg(res.data.quecResult.message)
						// }
					}else{
						if (res.success && res.success==true) {
							this.saveWifiData();
							this.closeWifiPop()
							// this.$tab.reLaunch(`/pages/index`)
								// this.getDeviceInfo(this.selectedDevice.pk,this.selectedDevice.dk)
							this.getDeviceList(this.selectedDevice.peripheralModel.dk)
						} 
						// else {
						// 	this.$modal.msg(res.data.quecResult.message)
						// }
					}
				})
				// .catch(err=>{
				// 	// console.log('我被执行了',err);
				// 	this.isConnect = false
				// })
			},
			//查询用户设备列表
			getDeviceList(dk){
				let para = {
					Page: 1, //页数
					pageSize: 100, //每页多少条
					deviceName: '' //非必填
				}
				console.log('dk-------------->', dk);
				queryUserDeviceList(para).then(res => {
					console.log('设备列表', res);
					let list
					if(this.platform == 'android'){
						list = res.data.list
					}else{
						list = res.data
					}
					let conDev = list.filter(ite=>ite.deviceKey.toLocaleLowerCase() == dk.toLocaleLowerCase()) 
					// console.log('连接的设备===>',conDev);
					this.changeName = conDev[0].deviceName
					if(this.platform == 'android'){
						this.selectedDevice.bleDevice.deviceKey = conDev[0].deviceKey
					}else{
						this.selectedDevice.peripheralModel.dk = conDev[0].deviceKey
					}
					// console.log(this.changeName);
					this.showgnamePop()
				})
			},
			//打开手机wifi界面
			goSelectwifi() {
				if (plus.os.name == 'iOS') {
					plus.runtime.openURL("app-Prefs:root=WIFI")
				} else {
					var main = plus.android.runtimeMainActivity(); //获取activity  
					var Intent = plus.android.importClass('android.content.Intent');
					var Settings = plus.android.importClass('android.provider.Settings');
					var intent = new Intent(Settings.ACTION_WIFI_SETTINGS); //可设置表中所有Action字段  
					main.startActivity(intent);
				}
			},
			saveWifiData() {
				const obj = {
					ssid: this.connetParams.ssid,
					password: this.connetParams.pwd
				};

				let dataList = uni.getStorageSync('wifiConnectData');
				if (dataList) {
					dataList.push(obj)
				} else {
					dataList = [obj];
				}

				uni.setStorageSync('wifiConnectData', dataList);
			},
			showConWifiHistory() {
				this.$refs.wifiHistoryPop.open('center')

				let dataList = uni.getStorageSync('wifiConnectData');

				if (dataList && dataList.length > 0) {
					this.hisList = dataList;
				}
			},
			//修改设备名称
			editDeviceName(pk,dk){
				let para
				console.log(this.platform);
				if(this.platform == 'android'){
					para = {
						deviceName: this.changeName,
						dk: this.selectedDevice.bleDevice.deviceKey,
						pk: this.selectedDevice.bleDevice.productKey
					}
				}else{
					para = {
						deviceName: this.changeName,
						dk: this.selectedDevice.peripheralModel.dk,
						pk: this.selectedDevice.peripheralModel.pk
					}
				}
				console.log(para);
				changeDeviceInfo(para).then(res=>{
					console.log(res);
					this.$modal.msg(this.$t('success'))
					this.$tab.reLaunch(`/pages/index`)
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
	.search-dev-img{
		width: 122rpx;
		height: 144rpx;
	}
	.mrt-114 {
		margin-top: 114rpx;
		text-align: center;
	}

	.mrt-186 {
		margin-top: 186rpx;
	}

	.opentips1 {
		font-size: 32rpx;
		text-align: center;
		font-weight: bold;
	}

	.opentips2 {
		font-size: 28rpx;
		margin-top: 20rpx;
		text-align: center;
		color: #989898;
	}

	.devicelist-content {
		padding: 0 36rpx;
		height: 53vh;
	}

	.device-item2 {
		padding: 34rpx 40rpx;
		background-color: #f1f1f1;
		border-radius: 20rpx;
	}

	.device-name {
		color: #151515;
		font-size: 32rpx;
		padding-left: 40rpx;
		font-weight: bold;
		max-width: 380rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.device-statetext {
		font-size: 28rpx;
		padding-left: 40rpx;
		margin-top: 10rpx;
		color: #989898;
	}

	.mrtop {
		margin-top: 36rpx;
	}

	.connet-button {
		padding: 18rpx 44rpx;
		/* width: 122rpx;
		height: 56rpx; */
		border-radius: 32rpx;
		background-color: #01CBA5;;
		color: #fff;
		font-size: 28rpx;
	}

	.wifi-msg {
		position: relative;
		width: 85vw;
		padding: 50rpx 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.wifi-ipt {
		width: 80%;
		border: 2rpx solid grey;
		border-radius: 36rpx;
		margin-left: 30rpx;
		padding: 10rpx 0;
		padding-left: 20rpx;
	}

	.write-name {
		margin-top: 30rpx;
		font-size: 26rpx;
	}

	.wifi-title {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
	}

	.connet-btn {
		padding: 16rpx 48rpx;
		background: #FF6939;
		color: #fff;
		text-align: center;
		border-radius: 30rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		width: 90%;
	}

	.wifi-icon {
		width: 36rpx;
		height: 40rpx;
	}

	.psw-icon {
		width: 36rpx;
		height: 40rpx;
	}

	.tips-img {
		width: 70vw;
		height: 35vw;
	}

	.search-loading {
		width: 490rpx;
		height: 490rpx;
		animation: turn 1s infinite;
	}

	@keyframes turn {
		0% {
			transform: rotate(0deg);
		}

		10% {
			transform: rotate(36deg);
		}

		20% {
			transform: rotate(72deg);
		}

		30% {
			transform: rotate(108deg);
		}

		40% {
			transform: rotate(144deg);
		}

		50% {
			transform: rotate(180deg);
		}

		60% {
			transform: rotate(216deg);
		}

		70% {
			transform: rotate(252deg);
		}

		80% {
			transform: rotate(288deg);
		}

		90% {
			transform: rotate(324deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.hisV {
		text-decoration: underline;
		color: #1890ff;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 20rpx;
		width: 100%;
		padding: 20rpx;
	}

	.wifihisTitle {
		text-align: center;
		font-weight: bold;
		padding-bottom: 20rpx;
	}

	.wifihisContent {
		height: 600rpx;
	}

	.wifihisList {
		border-top: 1px solid #f8f8f8;
		padding: 20rpx;
	}
	.vicinity-content{
		background: #fff;
		border-top-right-radius: 50rpx;
		border-top-left-radius: 50rpx;
		padding-bottom: 50rpx;
	}
	.vicinity-title{
		position: relative;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		padding: 20rpx 0;
	}
	.vicinity-tips{
		background-color: #f7f7f7;
		padding: 30rpx;
		font-size: 32rpx;
		width: 88%;
		margin: auto;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}
</style>