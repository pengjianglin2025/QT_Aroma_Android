<template>
<view style="padding-bottom: 130rpx;">
	<uni-nav-bar fixed="true" status-bar left-width="0rpx" :border="false">
		<template v-slot="">
			<view class="flex items-center" @click="navtoSelMode">
				<image style="width: 20rpx;" src="/static/back.png" mode="widthFix"></image>
				<text style="font-size: 26rpx;margin-left: 20rpx;">{{$t("back")}}</text>
			</view>
			<!-- <view style="display: flex;;width:100%;font-size: 30rpx;">
				<view style="display: flex;align-items: center;padding:0 10rpx;">
					<view>
						<text class="selStyle">{{$t('index.all-device')}}</text>
						<view style="position: relative;">
							<view style="position: absolute;width:100%;">
								<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</template>
		<template v-slot:right>
			<!-- <view style="display: flex;align-items: center;margin-right: 40rpx;" @click="navtoWifi">
				<image class="add-device-btn" src="../../static/tab2.png" mode=""></image>
			</view> -->
			<!-- <view style="display: flex;align-items: center;" @click="navtoSeach"> -->
			<view style="display: flex;align-items: center;" @click="isShow=!isShow">
				<image class="add-device-btn" src="../../static/825.png" mode=""></image>
			</view>
		</template>
	</uni-nav-bar>
	<view style="position:fixed;width:100%;z-index: 2001;">
		<view style="position: relative;">
			<view class="setting-menu" v-if="isShow">
				<view class="flex items-center" @click="navtoSeach">
					<image style="width: 26rpx;height: 28rpx;" src="/static/images/home/search.png" mode="">
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
		<image src="../../static/banner.png" mode="widthFix" style="width:100%"></image>
	</view>
	<view style="display: flex;;width:100%;font-size: 30rpx;padding: 0 40rpx;padding-bottom: 40rpx;">
		<view style="display: flex;align-items: center;padding:0 10rpx;">
			<view>
				<text class="selStyle">{{$t('index.all-device')}}</text>
				<view style="position: relative;">
					<view style="position: absolute;width:100%;">
						<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 设备列表 -->
	<view style="width: 100%;">
		<scroll-view style="padding: 0 20rpx;" scroll-y="true" show-scrollbar>
			<view class="list-grid">
				<view v-for="(item,index) in bleDeviceList" class="device-item" @click="onSelectedDevice(item)">
					<view class="device-switch">
						<image v-if="item.localName.indexOf('ivy00')>-1" src="../../static/off-light.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy01')>-1" src="../../static/01.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy02')>-1" src="../../static/02.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy03')>-1" src="../../static/03.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy04')>-1" src="../../static/04.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy05')>-1" src="../../static/05.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else src="../../static/off-light.png" mode="heightFix" style="width:88rpx;height: 100rpx;"></image>
					</view>
					<view class="device-name">
						{{item.deviceName}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	<view class="tabbar">
		<uni-grid :column="2" :showBorder="false" :square="false">
			<uni-grid-item style="height: 100rpx;">
				<view class="grid-item-box" style="background-color: #fff;">
					<image class="tabbar-img" src="../../static/images/tabbar/indexsel.png" mode=""></image>
					<text class="text" style="color: #00CB74;">{{$t('index.home')}}</text>
				</view>
			</uni-grid-item>
			<uni-grid-item style="height: 100rpx;">
				<view class="grid-item-box" style="background-color: #fff;" @click="navToMine()">
					<image class="tabbar-img" src="../../static/images/tabbar/my.png" mode=""></image>
					<text class="text">{{$t('index.setting')}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { isLogin } from '@/api/login.js'
  import { queryUserInfo } from '@/api/system/user.js'
export default{
	data(){
		return{
			// bleDeviceList:[{deviceName:'设备'}]
			bleList: [],
			bleDeviceList: [],
			isShow: false
		}
	},
	computed:{
		// ...mapGetters(['bleDeviceList','isbleInit'])
		...mapGetters(['isbleInit'])
	},
	onLoad() {
		// console.log(this.bleDeviceList);
		// if(!this.isbleInit){ //如果蓝牙还没有初始化则初始化蓝牙
		// 	uni.openBluetoothAdapter({
		// 	  success(res) {
		// 	    console.log(res)
		// 	  }
		// 	})
		// }
	},
	onShow() {
		this.resetTime()
		if(uni.getStorageSync('bleDeviceList')){
			this.bleDeviceList = uni.getStorageSync('bleDeviceList')
		}
		setTimeout(()=>{
			//详情页返回的时候监听到蓝牙断开设置为true，在这里加个延时重置为false
			this.$store.commit('SET_OFFLINE',false)
			console.log('设置状态为false');
		},300)
		setTimeout(()=>{
			uni.openBluetoothAdapter({
			  success(res) {
			    console.log(res)
			  }
			})
		},500)
		
		console.log(this.bleDeviceList);
	},
	methods:{
		//跳转到'设置界面'
		navToMine(){
			this.$tab.reLaunch('/pages/blemodule/setting')
		},
		//跳转到蓝牙搜索界面
		navtoSeach() {
			this.$tab.navigateTo('/pages/blemodule/searchble/index')
		},
		onSelectedDevice(ite){
			this.$store.commit('SET_DEVICEID',ite.deviceId)
			this.$store.commit('SET_DEVICENAME',ite.deviceName) 
			// uni.navigateTo({
			// 	url: `/pages/blemodule/bledeviceDetail/testindex?deviceId=${ite.deviceId}&deviceName=${ite.deviceName}`
			// })
			if(ite.deviceName.indexOf("ivy07")>-1){
			// if(ite.deviceName.indexOf("ivy03")>-1){
				console.log('进入特殊界面拉~~~~~~~~~~~~~');
				uni.navigateTo({
					url: `/pages/blemodule/bledeviceDetail/ivy07index?deviceId=${ite.deviceId}&deviceName=${ite.deviceName}`
				})
			}else{
				uni.navigateTo({
					url: `/pages/blemodule/bledeviceDetail/index?deviceId=${ite.deviceId}&deviceName=${ite.deviceName}`
				})
			}
		},
		// 重置工作/暂停时间、步长
		resetTime(){
			this.$store.commit('SET_PAUSETIMEMIN',5)
			this.$store.commit('SET_PAUSETIMEMAX',500)
			this.$store.commit('SET_WORKTIMEMIN',5)
			this.$store.commit('SET_WORKTIMEMAX',500)
			this.$store.commit('SET_WORKSTEP',5)
		},
		navtoBle(){
			this.isShow = false;
		},
		navtoWifi(){
			this.isShow = false;
			queryUserInfo().then(res=>{
			  console.log(res);
			  if(res.success){
				this.$tab.reLaunch('/pages/index')
			  }else{
				this.$tab.reLaunch('/pages/login') 
			  }
			})
		},
		navtoSelMode(){
			let _this = this
			uni.showModal({
				title: _this.$t('tipstitle'),
				content: _this.$t('navtoSelectMode'),
				success: function (res) {
					if (res.confirm) {
						_this.$tab.reLaunch('/pages/selectMode')
						// isLogin().then(res=>{
						// 	console.log(res);
						// 	uni.setStorageSync('lastmode','wifi')
						// 	if(res.data){
						// 		_this.$tab.reLaunch('/pages/index')
						// 	}else{
						// 		_this.$tab.reLaunch('/pages/login') 
						// 	}
						//   }).catch(err=>{
						// 	console.log(err);
						// 	_this.$tab.reLaunch('/pages/login') 
						// })
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			
		}
	}
}
</script>
 
<style>
	.add-device-btn {
		width: 40rpx;
		height: 40rpx;
	}
	.list-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 34rpx;
	}
	.device-item {
		display: inline-block;
		/* max-width: 340rpx; */
		width: 340rpx;
		/* max-width: 318rpx; */
		padding-bottom: 20rpx;
		padding-top: 20rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}
	.device-name {
		color: #151515;
		font-size: 32rpx;
		/* padding-left: 40rpx; */
		font-weight: bold;
		/* width: 280rpx; */
		overflow: hidden;
		text-overflow: ellipsis;
		height: 42rpx;
		text-align: center;
	}
	.device-switch{
		/* padding-left: 40rpx; */
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 160rpx;
	}
	.tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		font-size: 20rpx;
		border-top: 2rpx solid #d9d9d9;
	}
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.tabbar-img{
		width: 48rpx;
		height: 48rpx;
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
</style>