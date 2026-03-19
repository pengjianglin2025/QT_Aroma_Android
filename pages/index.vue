<template>
	<view class="">
		<uni-nav-bar fixed="true" status-bar left-width="0rpx" :border="false">
			<template>
				<view class="flex items-center" @click="navtoSelMode">
					<image style="width: 20rpx;" src="/static/back.png" mode="widthFix"></image>
					<text style="font-size: 26rpx;margin-left: 20rpx;">{{$t("back")}}</text>
				</view>
				<!-- <view style="display: flex;;width:100%;font-size: 30rpx;">
					<view style="display: flex;align-items: center;padding:0 10rpx;" @click="groupSel(1)">
						<view>
							<text :class="groupIdx == 1?'selStyle':'normalStyle'">{{$t('index.all-device')}}</text>
							<view style="position: relative;" v-if="groupIdx == 1">
								<view style="position: absolute;width:100%;">
									<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-left: 10px;padding:0 10rpx;" @click="groupSel(2)">
						<view>
							<text :class="groupIdx == 2?'selStyle':'normalStyle'">{{$t('index.device-group')}}</text>
							<view style="position: relative;" v-if="groupIdx == 2">
								<view style="position: absolute;width:100%;">
									<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
								</view>
							</view>
						</view>
					</view>
				</view> -->
			</template>
			<template v-slot:right>
				<!-- <view style="display: flex;align-items: center;margin-right: 40rpx;" @click="navtoBle">
					<image class="add-device-btn" src="../static/tab2.png" mode=""></image>
				</view> -->
				<view style="display: flex;align-items: center;" @click="isShow=!isShow">
					<image class="add-device-btn" src="../static/825.png" mode=""></image>
				</view>
			</template>
		</uni-nav-bar>
		<view style="position:fixed;width:100%;z-index: 2001;">
			<view style="position: relative;">
				<view class="setting-menu" v-if="isShow">
				<!-- 	<view class="flex items-center" @click="scanDevice">
						<image style="width: 20rpx;height: 20rpx;" src="../static/images/home/scan.png" mode=""></image>
						<text style="padding-left: 10rpx;">{{$t('index.scan')}}</text>
					</view> -->
					<view class="flex items-center" @click="navtoSeach">
						<image style="width: 25rpx;height: 25rpx;" src="../static/images/home/search.png" mode="">
						</image>
						<text style="padding-left: 5rpx;">{{$t('index.search')}}</text>
					</view>
					<view class="flex items-center" style="margin-top: 40rpx;" @click="navtoBle">
						<image style="width: 24rpx;height: 26rpx;" src="/static/ble01.png" mode="">
						</image>
						<text style="padding-left: 5rpx;">{{$t('btn-bluetooth')}}</text>
					</view>
					<view class="flex items-center" style="margin-top: 40rpx;" @click="navtoWifi">
						<image style="width: 30rpx;height: 30rpx;" src="/static/WIFI.png" mode=""></image>
						<text style="padding-left: 10rpx;">{{$t('btn-wifi')}}</text>
					</view>
				</view>
			</view>
		</view>
		<view style="padding:20rpx;">
			<image src="../static/banner.png" mode="widthFix" style="width:100%"></image>
		</view>

		<view style="display: flex;;width:100%;font-size: 30rpx;padding: 0 40rpx;padding-bottom: 40rpx;">
			<view style="display: flex;align-items: center;padding:0 10rpx;" @click="groupSel(1)">
				<view>
					<text :class="groupIdx == 1?'selStyle':'normalStyle'">{{$t('index.all-device')}}</text>
					<view style="position: relative;" v-if="groupIdx == 1">
						<view style="position: absolute;width:100%;">
							<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-left: 10px;padding:0 10rpx;" @click="groupSel(2)">
				<view>
					<text :class="groupIdx == 2?'selStyle':'normalStyle'">{{$t('index.device-group')}}</text>
					<view style="position: relative;" v-if="groupIdx == 2">
						<view style="position: absolute;width:100%;">
							<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 设备列表 -->
		<view class="list-content">
			<scroll-view class="devicelist-content" scroll-y="true" show-scrollbar v-if="groupIdx==1">
				<view class="list-grid">
					<view v-for="(item,index) in devicelist" class="device-item" @click="onSelectedDevice(item,index)">
						<view class="device-switch">
							<view>
								<image v-if="item.productKey == 'p11r26'" src="../static/off-light.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.productKey == 'p11sq3'" src="../static/01.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.productKey == 'p11sq4'" src="../static/02.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.productKey == 'p11sq5'" src="../static/03.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.productKey == 'p11sq6'" src="../static/04.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
								<image v-if="item.productKey == 'p11tgR'" src="../static/05.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
							</view>
							<!-- <view>
								<image src="../static/off-btn.png" mode="widthFix" style="width:96rpx;" class="img2" @click="controlSwitch(item)">
								</image>
							</view> -->
						</view>
						<view class="device-name">
							{{item.deviceName}}
						</view>
						<view class="device-statetext">
							<!-- <uni-icons type="smallcircle-filled" :color="item.onlineStatus == 1?'#0BC173':'#CFCFCF'" size="1"></uni-icons> -->
							<span class="state_point" :style="{backgroundColor: item.onlineStatus == 1? '#0BC173':'#CFCFCF'}"></span>
							<text style="padding-left: 10rpx;"> {{item.onlineStatus == 1?$t('com.online'):$t('com.offline')}}</text>
						</view>
					</view>


					<view class="device-item" style="opacity: 0;">
						<view class="device-switch">
							<view>
								<image src="../static/off-light.png" mode="widthFix" style="width:88rpx;" class="img1">
								</image>
							</view>
							<view>
								<image src="../static/off-btn.png" mode="widthFix" style="width:96rpx;" class="img2">
								</image>
							</view>
						</view>
						<view class="device-name">

						</view>
						<view class="device-statetext">
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 分组列表 -->
			<scroll-view class="devicelist-content" scroll-y="true" show-scrollbar v-if="groupIdx==2">
				<view v-for="(item,index) in grouplist" :class="{'mrtop': index>0}" class="device-item2">
					<view class="flex justify-between align-center device-switch2">
						<view class="flex align-center"  @click="onSelectedGroup(item,index)">
							<div class="flex align-center">
								<image src="../static/04.png" mode="widthFix" style="width:88rpx;" class="img1">
								</image>
								<view>
									<view class="device-name">
										<text>{{item.name}}</text>
									</view>
								</view>
							</div>
						</view>
						<view  class="device-statetext2">
							<!-- <image src="../static/off-btn.png" mode="widthFix" style="width:96rpx;" class="img2">
							</image>
							<image src="../static/on-btn.png" mode="widthFix" style="width:96rpx;" class="img2">
							</image> -->
							<view style="">
								<view style="color:#01CBA5;box-shadow: 1rpx 1rpx 5rpx 1rpx #01CBA5;" @click="sendGroupSwitchOrder(item,true)">{{$t('index.open')}}</view>
								<view style="color:#848484;box-shadow: 1rpx 1rpx 5rpx 1rpx #848484;margin-left: 20rpx;" @click="sendGroupSwitchOrder(item,false)">{{$t('index.close')}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="mrtop device-item3" style="text-align: center;margin-bottom: 50rpx;" @click="showAddpop">
					<uni-icons type="plusempty" size="40" style="color: #FF8158;"></uni-icons>
				</view>
			</scroll-view>
		</view>
		<uni-popup ref="gname" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('group-name')}}</view>
				<view class="input-item flex align-center">
					<input v-model="groupName" class="input" type="text" :placeholder="$t('input-group-name')" maxlength="30"
						@input="checkGroupNameInput" />
				</view>
				<view>
					<view class="action-btn">
						<button @click="addGroup" class="login-btn cu-btn block lg" v-if="canAG">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="localPop" :is-mask-click="false">
			<view style="width: 95vw;background-color: #fff;border-radius: 10rpx;">
				<h2 style="text-align: center;padding: 30rpx 0;">Use your location</h2>
				<view style="margin-top: 20rpx;padding: 0 50rpx;text-align: center;font-size: 36rpx;">
					To see maps for automatically tracked activities,allow Aroma Buddy to use your location all of the time,
					Aroma Buddy collects location data to using smart devices even when the app isclosed or not in use.
				</view>`
				<view style="margin-top: 30rpx;display: flex;justify-content: center;align-items: center;padding: 30rpx 0;font-size: 44rpx;">
					<!-- <div style="color: #00CB74;margin-right: 100rpx;" @click="cancelAuth">Deny</div> -->
					<div style="color: #00CB74;" @click="confirmAuth">Next</div>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import { mapGetters } from 'vuex'
	import {
		bindDeviceSn,
		queryUserDeviceList,
		queryDeviceGroupList,
		addDeviceGroup,
		batchControlDevice,
		getGroupDeviceList
	} from "../api/devices.js"
	export default {
		data() {
			return {
				selType: 0,
				isShow: false,
				devicelist:[],
				// devicelist: [{ 
				// 	 deviceName:'test',
				// 	 onlineStatus: 1
				// }],
				grouplist: [],
				groupIdx: 1,
				dpCodes: {}, //数据点列表
				curindex: 0,
				pageHomeList: [],
				currentPage: 1,
				pageSize: 10,
				total: 0,
				groupName: '', //分组名称
				filter: {
					name: ''
				},
				scanObj: {}, //扫码出来的对象数组,
				selectedIndex: 0,
				selectedGroupIndex: 0,
				canAG: false,
				timer:null,
				platform: uni.getStorageSync('platform')
			}
		},
		computed: {
			...mapGetters(['bleDeviceList'])
		},
		onLoad() {
			// if(!uni.getStorageSync('agreeLocal')){
			// 	setTimeout(()=>{
			// 		this.$refs.localPop.open('center')
			// 	},500)
			// }
			this.getlocal()
			// for(let i=0;i<20;i++){
			// 	this.devicelist.push({
			// 		name: 'abcdefghi'+i,
			// 		modelId: i,
			// 		deviceStatus: 'online'
			// 	})
			// 	this.grouplist.push({
			// 		name: '分组'+i,
			// 		modelId: i,
			// 		deviceStatus: 'offline'
			// 	})
			// }
			
		},
		onHide() {
			clearInterval(this.timer)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onShow() {
			
			this.getDeviceList()
			this.getGroupList()
			this.timer = setInterval(()=>{
				this.getDeviceList()
			},5000)
			// this.devicelist = [{
			// 		deviceName: '1号包房',
			// 		deviceStatus: 1
			// 	},
			// 	{
			// 		deviceName: '1号包房号包房号包房号包房号包房号包房号包房号包房号包房',
			// 		deviceStatus: 1
			// 	},
			// 	{
			// 		deviceName: '1号包房',
			// 		deviceStatus: 0
			// 	}
			// ]

			// this.grouplist = [{
			// 		groupId: 1,
			// 		groupName: '1号包房',
			// 		deviceStatus: 1
			// 	},
			// 	{
			// 		groupId: 2,
			// 		groupName: '1号包房号包房号包房号包房',
			// 		deviceStatus: 1
			// 	},
			// 	{
			// 		groupId: 3,
			// 		groupName: '1号包房',
			// 		deviceStatus: 0
			// 	}
			// ]
		},
		methods: {
			//拒绝授权
			cancelAuth(){
				this.$refs.localPop.close()
			},
			//同意授权
			confirmAuth(){
				this.$refs.localPop.close()
				this.getlocal()
			},
			//跳转到蓝牙主页
			navtoSelMode(){
				let _this = this
				uni.showModal({
					title: _this.$t('tipstitle'),
					content: _this.$t('navtoSelectMode'),
					success: function (res) {
						if (res.confirm) {
							_this.$tab.reLaunch('/pages/selectMode')
							// uni.setStorageSync('lastmode','ble')
							// if(_this.bleDeviceList.length>0){
							// 	_this.$tab.reLaunch('/pages/blemodule/index')
							// }else{
							// 	_this.$tab.reLaunch('/pages/blemodule/searchble/login') 
							// }
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			navtoWifi(){
				this.isShow = false;
			},
			navtoBle() {
				this.isShow = false;
				uni.reLaunch({
					url: '/pages/blemodule/index'
				})
			},
			onSelectedDevice(item, index) {
				this.devicelist[this.selectedIndex].selected = false;
				this.devicelist[index].selected = true;
				this.selectedIndex = index;

				this.$forceUpdate();
				uni.setStorageSync('currentDevice',item)//储存当前选中的设备
				this.$store.commit('SET_DEVICENAME',item.deviceName)
				let {
					deviceKey,
					productKey,
					deviceName,
					onlineStatus,
				} = item
				let signalStrength = item.signalStrength || ''
				uni.navigateTo({
					url: `/pages/devices/regulate/index?deviceKey=${deviceKey}&productKey=${productKey}&deviceName=${deviceName}&onlineStatus=${onlineStatus}&signalStrength=${signalStrength}`
				})
			},
			onSelectedGroup(item, index) {
				console.log('item.............')
				console.log(item)
				this.grouplist[this.selectedGroupIndex].selected = false;
				this.grouplist[index].selected = true;
				this.selectedGroupIndex = index;
				this.$forceUpdate()

				let {
					name,
					dgid
				} = item
				uni.navigateTo({
					url: `/pages/devices/group/index?name=${name}&dgid=${dgid}`
				})
			},
			//获取定位权限
			getlocal() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log(res);
						uni.setStorageSync('agreeLocal',true)
					}
				});
			},
			showAddpop() {
				this.$refs.gname.open('center')
			},
			closeAddpop() {
				this.$refs.gname.close()
			},
			//添加分组
			addGroup() {
				let para = {
					name: this.groupName,
				}
				console.log(para);
				addDeviceGroup(para).then(res => {
					this.closeAddpop()
					this.getGroupList()
				})
			},
			//查询用户设备列表
			getDeviceList() {
				let para = {
					Page: 1, //页数
					pageSize: 100, //每页多少条
					deviceName: '' //非必填
				}
				queryUserDeviceList(para).then(res => {
					console.log('设备列表', res);
					if(this.platform == 'android'){
						this.devicelist = res.data.list
					}else{
						this.devicelist = res.data
					}
					let deviceKeyList = [] //设备dk值，用于搜索设备的时候筛选本地已被绑定设备
					let bindDeviceList = [] //设备信息，用于搜索界面筛选已绑定设备的离线情况（设备重置后APP列表里的设备不会被移除，会显示离线状态）
					if(this.devicelist.length>0){
						for(let i in this.devicelist){
							// deviceKeyList.push(this.devicelist[i].deviceKey)
							deviceKeyList.push({
								dk: this.devicelist[i].deviceKey,
								onlineStatus: this.devicelist[i].onlineStatus
							})
						}
					}
					uni.setStorageSync('deviceKeyList',deviceKeyList)
					uni.setStorageSync('bindDeviceList',bindDeviceList)
				})
			},
			//查询设备组列表
			getGroupList() {
				let para = {
					page: 1,
					pageSize: 100
				}
				queryDeviceGroupList(para).then(res => {
					console.log('分组列表', res);
					if(this.platform == 'android'){
						this.grouplist = res.data.list
					}else{
						this.grouplist = res.data
					}
				})
			},
			//跳转到搜索界面
			navtoSeach() {
				this.isShow = false;
				uni.navigateTo({
					url: '/pages/devices/search/index'
				})
			},
			
 			//全部设备和分组的切换
			groupSel(idx) {
				// console.log(idx);
				this.groupIdx = idx
				switch (idx){
					case 1:
					this.getDeviceList()
					
						break;
					case 2:
					this.getGroupList()
						break;
					default:
						break;
				}		
				// console.log(this.groupIdx);
			},
			showSearchpop() {
				this.$refs.searchpop.open('center')
			},
			//扫码二维码绑定
			// scanDevice() {
			// 	this.isShow = false;
			// 	let that = this
			// 	uni.scanCode({
			// 		success: function(res) {
			// 			console.log('条码类型：' + JSON.stringify(res.result));
			// 			that.scanObj = that.changeObj(res.result)
			// 			that.bindDevice()
			// 		}
			// 	});
			// },
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
					this.isShow = false
					this.getDeviceList()
				})
			},
			navtoDetail(item) {
				console.log(item);
				// if(item.onlineStatus==0){
				// 	// this.$modal.msg('设备离线')
				// 	this.$modal.msg('device offline')
				// 	return false
				// }
				let {
					deviceKey,
					productKey,
					deviceName
				} = item
				uni.navigateTo({
					url: `/pages/common/control/index?deviceKey=${deviceKey}&productKey=${productKey}&deviceName=${deviceName}`
				})
			},
			navtoGroup(data) {

				let {
					name,
					dgid
				} = data
				// uni.navigateTo({
				// 	url: `/pages/devices/group/index?name=${name}&dgid=${dgid}`
				// })
			},
			controlSwitch(item) {

				let flag = item.selected ?? false;
				let {
					productKey,
					deviceKey
				} = item
				let para = {
					productKey,
					deviceKey,
					switch: ''
				}
				if (flag) {
					para.switch = {
						switch: 'true'
					}
					this.sendOrder(para)
				} else {
					para.switch = {
						switch: 'false'
					}
					this.sendOrder(para)
				}
			},
			//下发指令
			sendOrder(params) {
				let para = {
					type: 2,
					data: JSON.stringify([params.switch]),
					deviceList: [{
						productKey: params.productKey,
						deviceKey: params.deviceKey,
						gatewayDeviceKey: '',
						gatewayProductKey: '',
					}],
					cacheTime: 86400,
					dataFormat: 2,
					isCache: 1,
					isCover: 2
				}
				console.log(para);
				batchControlDevice(para).then(res => {
					console.log(res);
					this.getBusinessAttributes()
				})
			},
			checkGroupNameInput() {
				if (this.groupName) {
					this.canAG = true;
				} else {
					this.canAG = false;
				}
			},
			// 发送分组设备开关指令
			sendGroupSwitchOrder(item,isOpen){
				uni.showLoading({
					title:'',
					mask: true
				})
				let para = {
					dgid: item.dgid,
					// pk: 'p11r26',
					pk:'',
					page: 1,
					pageSize: 100
				}
				getGroupDeviceList(para).then(res=>{
					console.log(res);
					let newList = [];
					let list 
					if(this.platform == 'android'){
						list = res.data.list
						for(let i = 0; i<list.length;i++){
							newList.push({
								productKey: list[i].pk,
								deviceKey: list[i].dk,
								gatewayDeviceKey: '',
								gatewayProductKey: '',
							});
						}
					}else{
						list = res.data
						for(let i = 0; i<list.length;i++){
							newList.push({
								productKey: list[i].productKey,
								deviceKey: list[i].deviceKey,
								gatewayDeviceKey: '',
								gatewayProductKey: '',
							});
						}
					}
					
					
					
					console.log('分组下设备列表...')
					console.log(list)
					
					const datas = {
						switch:isOpen
					}
					
					let para = {
						type: 2,
						data: JSON.stringify([datas]),
						deviceList: newList,
						cacheTime: 86400,
						dataFormat: 2,
						isCache: 1,
						isCover: 2
					}
					console.log(para);
					batchControlDevice(para).then(res => {
						uni.hideLoading()
						uni.showToast({
							title: this.$t('success'),
							icon: 'none',
							duration: 2000
						});
						console.log('发送分组设备开关指令结果：')
						console.log(res);
					}).catch(err=>{
						uni.hideLoading()
					})
					
				})
			}
		},

	}
</script>

<style lang="scss">
	.selStyle {
		color: #212121;
	}

	.normalStyle {
		color: #BABABA;
	}

	.state_point{
		display: inline-block;
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
	}
	// page{
	// 	background: url('../static/images/home/indexbg.png')0 -80rpx;
	// 	background-size: 100%;
	// 	background-repeat: no-repeat;
	// }
	.index-background {
		width: 100%;
		height: 536rpx;
		background: url('../static/images/home/bg2.png')0 0 no-repeat;
		background-size: 100%;
	}

	.top-background {
		width: 750rpx;
		/* height: 496rpx; */
		height: 296rpx;
	}

	.group-tab {
		/* display: flex; */
		font-size: 40rpx;

		.bottom-line {
			position: relative;
		}

		.bottom-line::after {
			content: '';
			display: inline-block;
			width: 90rpx;
			height: 14rpx;
			background-color: #848484;
			position: absolute;
			bottom: -18rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.add-device-btn {
		width: 40rpx;
		height: 40rpx;
		// position: absolute;
		// right: 34rpx;
		// top: 128rpx;
	}

	.search-device-btn {
		width: 48rpx;
		height: 48rpx;
	}

	.list-content {
		// width: 750rpx;
		/* min-height: 800rpx; */
		// height: 1066rpx;
		// background-color: #F8F8F8;
		// box-shadow: 0px -2rpx 12rpx rgba(4, 149, 110, 0.10);
		width: 100%;
		// padding-top: 32rpx;
	}

	.list-title {
		position: relative;
		height: 84rpx;
		top: -74rpx;
		// font-size: 40rpx;
		// display: flex;
		// justify-content: space-between;
		// padding: 54rpx 48rpx 28rpx 48rpx;
	}

	.devicelist-content {
		// padding: 0 36rpx;
		padding: 0 20rpx;
		// height: 53vh;
		// margin-top: 44rpx;
		// height: 962rpx;
		/* height: 894rpx; */
	}

	.device-item2 {
		padding: 34rpx 40rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.device-item3 {
		padding: 34rpx 40rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.device-item {
		display: inline-block;
		padding-bottom: 20rpx;
		border-radius: 20rpx;
		// max-width: 318rpx;
		// width: 320rpx;
		/* height: 340rpx; */
		// background-color: rgba(83, 233, 213, .2);
		background-color: #FFFFFF;
	}

	// .device-item:active {
	// 	background-color: #0BC173;

	// 	.device-switch {
	// 		view>.img1 {
	// 			content: url(../static/on-light.png) !important;
	// 		}

	// 		view>.img2 {
	// 			content: url(../static/on-btn.png) !important;
	// 		}
	// 	}

	// 	.device-name {
	// 		color: #ffffff;
	// 	}

	// 	.device-statetext {
	// 		color: #ffffff;

	// 		.uniui-smallcircle-filled {
	// 			color: #ffffff !important;
	// 		}
	// 	}
	// }

	// .device-item2:active {
	// 	background-color: #0BC173;

	// 	.device-switch2 view>.img1 {

	// 		content: url(../static/on-light.png) !important;
	// 	}

	// 	.device-switch2 view>.img2 {
	// 		content: url(../static/on-btn.png) !important;

	// 	}

	// 	.device-name {
	// 		color: #ffffff;
	// 	}

	// }

	.mrleft {
		margin-left: 38rpx;
	}

	.mrtop {
		margin-top: 36rpx;
	}

	.fixed {
		position: fixed;
		top: 536rpx;
		// overflow: hidden;
	}

	.device-switch {
		display: flex;
		justify-content: center;
		// justify-content: space-between;
		align-items: center;
		padding: 34rpx 22rpx;
		// padding-top: 74rpx;
	}

	.device-name {
		color: #151515;
		font-size: 32rpx;
		padding-left: 40rpx;
		font-weight: bold;
		width: 280rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 42rpx;
		// text-wrap: nowrap;
		white-space: nowrap;
		// padding: 0 28rpx;
	}

	.device-statetext {
		font-size: 28rpx;
		padding-left: 40rpx;
		// padding-left: 28rpx;
		margin-top: 10rpx;
		// color: #848484;
		color: #989898;
	}

	.sel-color {
		color: #ffffff !important;
	}


	.point {
		width: 22rpx;
		height: 22rpx;
		border-radius: 22rpx;
		background-color: red;
	}

	.search-view {
		width: 85vw;
		padding: 50rpx 30rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.search-name {
		width: 40vw;
		margin: 30rpx auto;
		border: 2rpx solid;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
	}

	.serach-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.connet-btn {
		padding: 16rpx 48rpx;
		background: #2FCFB0;
		color: #fff;
		text-align: center;
		border-radius: 10rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		width: 60%;
	}

	.group-tab-label {
		width: 55vw;
		position: absolute;
		left: 0;
		text-align: center;
		padding: 18rpx 0;
		font-size: 36rpx;
		// background-size: cover;
	}

	.group-tab-label-2 {
		width: 55vw;
		position: absolute;
		right: 0;
		padding: 18rpx 0;
		text-align: center;
		font-size: 36rpx;
		// background: url('../static/images/home/right-gray.png');
		// background-size: cover;
	}

	.list-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 34rpx;
	}

	.index-light-img {
		width: 60rpx;
		height: 216rpx;
	}

	.setting-menu {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
		background: #fff;
		padding: 40rpx 32rpx;
		border-radius: 14rpx;
		font-size: 30rpx;
		z-index: 9001;
	}

	.setting-menu::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: -10rpx;
		right: 20rpx;
		width: 20rpx;
		height: 20rpx;
		background: #fff;
		transform: rotate(45deg);
	}

	.err-pop {
		width: 672rpx;
		padding-bottom: 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		position: relative;

		.input-item {
			margin: 20px auto;
			background-color: #f5f6f7;
			height: 45px;
			width: 80%;
			border-radius: 20px;
		}

		.input {
			width: 100%;
			font-size: 14px;
			line-height: 20px;
			text-align: left;
			padding-left: 15px;
		}
	}

	.gr-name {
		font-size: 32rpx;
		padding: 20rpx;
		padding-top: 40rpx;
	}

	.close-errpop {
		text-align: center;
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
			margin: 20px auto;
			margin-top: 10px;
			background-color: #f5f6f7;
			height: 45px;
			border-radius: 5px;

			.icon {
				font-size: 38rpx;
				margin-left: 10px;
				color: #999;
			}

			.input {
				width: 100%;
				font-size: 14px;
				line-height: 20px;
				text-align: left;
				padding-left: 15px;
			}

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

	.device-statetext2 {
		>view {
			display: flex;

			>view {
				width: 76rpx;
				height: 76rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
	.img2{
		opacity: 0;
	}
</style>