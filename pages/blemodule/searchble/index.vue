<template>
<view>
	<!-- 鏍囬 -->
	<view class="page-title temp-page-title">
		<image class="back-icon" src="../../../static/back.png" @click="back"></image>
		<div class="title-text">
			{{$t('search-device')}}
		</div>
	</view>
	<view v-if="searchBleList.length>0">
		<scroll-view class="devicelist-content" scroll-y="true" show-scrollbar>
			<view v-for="(item,index) in searchBleList" :key="item.deviceId || item.mac || item.name || index" class="device-item2 mrtop">
				<view class="flex justify-between align-center">
					<view class="flex align-center" style="width: 75%;">
						<div>
							<!-- <image style="width: 88rpx;" mode="widthFix" src="../../../static/off-light.png"></image> -->
							<image v-if="item.name.indexOf('ivy00')>-1" src="../../../static/off-light.png" mode="widthFix" style="width:88rpx;height: 100rpx;"></image>
							<image v-else-if="item.name.indexOf('ivy01')>-1" src="../../../static/01.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-else-if="item.name.indexOf('ivy02')>-1" src="../../../static/02.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-else-if="item.name.indexOf('ivy03')>-1" src="../../../static/03.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-else-if="item.name.indexOf('ivy04')>-1" src="../../../static/04.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-else-if="item.name.indexOf('ivy05')>-1" src="../../../static/05.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-else src="../../../static/off-light.png" mode="widthFix" style="width:88rpx;height: 100rpx;"></image>
						</div>
						<div>
							<view class="device-name">
								{{item.name}}
							</view>
							<view class="device-statetext">
								deviceId:
							</view>
							<view class="device-statetext">
								{{item.deviceId}}
							</view>
						</div>
					</view>
					<view class="connet-button" @click="connectDevice(item)">{{$t('connect')}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
	<view v-else>
		<view class="mrt-114">
			<image class="search-loading" src="../../../static/images/home/searchimg.png" mode=""></image>
		</view>
		<view class="mrt-186">
			<div class="opentips1">{{$t('open-bluetooth')}}</div>
			<div class="opentips2">{{$t('searching-bluetooth')}}</div>
			<div class="opentips2" v-if="longtimeFlag">{{$t('longtime-tips')}}</div>
		</view>
	</view>
</view>
</template>

<script>
import { openBluetoothAdapter,stopBluetoothDevicesDiscovery } from '@/bluetooth/index.js'
import { mapGetters } from 'vuex'
export default{
	data(){
		return{
			isrepeat: false ,//闃叉杩炴帴鐨勬椂鍊欓噸澶嶇偣鍑?
			longtimeFlag: false,//闀挎椂闂存悳绱笉鍑鸿澶囨彁绀哄埛鏂?
		}
	},
	computed:{
		...mapGetters(['searchBleList','bleDeviceList'])
	},
	watch:{
		searchBleList(newVal,oldVal){
			console.log(newVal);
			console.log(oldVal);
		}
	},
	onPullDownRefresh(e) {
		this.showtips()
		openBluetoothAdapter()
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onShow() {
		this.isrepeat = false
		// setTimeout(()=>{
		openBluetoothAdapter()
		// },3000)
		// },500)
	},
	onLoad(){
		// this.$store.commit('SET_SEARCHBLELIST',[])
		// openBluetoothAdapter()
		this.$store.commit('SET_ISBLEINIT',true)
		this.showtips()
		console.log(this.searchBleList);
	},
	onUnload() {
		// stopBluetoothDevicesDiscovery()
		this.$store.commit('SET_SEARCHBLELIST',[])
	},
	methods:{
		getBleDetailUrl(deviceName, deviceId){
			if((deviceName || '').indexOf('ivy07') > -1){
				return `/pages/blemodule/bledeviceDetail/ivy07index?deviceId=${deviceId}&deviceName=${deviceName}`
			}
			return `/pages/blemodule/bledeviceDetail/index?deviceId=${deviceId}&deviceName=${deviceName}`
		},
		//鎶婅澶囨坊鍔犲埌鏈湴璁惧鍒楄〃
		connectDevice(item){
			console.log(item);
			if(this.isrepeat){
				return false
			}
			let bleObj = {
				deviceId: item.deviceId,
				deviceName: item.name, //璁惧鍚嶇О锛屼慨鏀硅繖涓笉褰卞搷鍨嬪彿鍥剧墖鏄剧ず
				localName: item.name,//鏈湴鍚嶇О锛屾牴鎹繖涓瀷鍙峰垽鏂澶囧浘鐗?
				data:''
			}
			// if(this.bleDeviceList.length>0){
			// 	let idx = this.bleDeviceList.findIndex(ite=>{
			// 		return ite.deviceId==item.deviceId
			// 	})
			// 	if(idx>-1){
			// 		// console.log(this.$modal);
			// 		this.$modal.msg('宸插瓨鍦?)
			// 	}else{
			// 		this.$store.commit('SET_BLEDEVICELIST',item)
			// 	}
			// }else{
				this.$store.commit('SET_BLEDEVICELIST',bleObj)
			// }
			stopBluetoothDevicesDiscovery()
			this.$store.commit('SET_SEARCHBLELIST',[])
			this.isrepeat = true
			setTimeout(()=>{
				console.log('椤甸潰璺宠浆');
				uni.navigateTo({
					url: this.getBleDetailUrl(item.name, item.deviceId)
				})
			},500)
		},
		showtips(){
			this.longtimeFlag = false
			setTimeout(()=>{
				this.longtimeFlag = true
			},5000)
		}
	}
}
</script>

<style>
	page {
		background-color: #fff;
	}
	.mrtop {
		margin-top: 36rpx;
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
	.connet-button {
		padding: 18rpx 44rpx;
		border-radius: 32rpx;
		background-color: #01CBA5;
		color: #fff;
		font-size: 28rpx;
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
</style>



