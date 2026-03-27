<template>
<view class="setting-page">
	<view class="page-title temp-page-title">
		<image class="back-icon" src="../../../static/back.png" @click="back"></image>
		<view class="title-text">{{$t('index.setting')}}</view>
	</view>

	<!-- 信息列表 -->
	<view class="list-card">
		<!-- 设备名称 -->
		<view class="list-item arrow" @click="showSetNamePop">
			<text class="item-label">{{$t('device-name')}}</text>
			<view class="item-right">
				<text class="item-value">{{deviceMsg.deviceName}}</text>
				<text class="arrow-icon">›</text>
			</view>
		</view>
		<view class="divider"></view>
		<!-- 设备ID -->
		<view class="list-item">
			<text class="item-label">{{$t('device-sn')}}</text>
			<text class="item-value">{{bleDeviceId}}</text>
		</view>
		<view class="divider"></view>
		<!-- 固件升级 -->
		<view class="list-item arrow" @click="toOtaPage">
			<text class="item-label">固件升级</text>
			<view class="item-right">
				<text class="item-value">OTA</text>
				<text class="arrow-icon">›</text>
			</view>
		</view>
	</view>

	<!-- 移除设备 -->
	<view class="delete-dev" @click="delDevice">
		{{$t('delete-device')}}
	</view>

	<!-- 修改名称弹窗 -->
	<uni-popup ref="gname" type="center">
		<view class="err-pop">
			<view class="gr-name text-center" style="padding: 20rpx 0;font-size: 40rpx;">{{$t('device-name')}}</view>
			<view class="input-item flex align-center input-shadow">
			  <input v-model="changeName" class="input" type="text" :placeholder="$t('input-group-name')" maxlength="30" />
			</view>
			<view class="close-errpop" @click="editDeviceName">
				<view class="login-btn cu-btn block lg round" style="width: 80%;margin: auto;background-color: #01CBA5;color: #fff;text-align:center;padding:20rpx 0;border-radius:50rpx;">{{$t('com.confirm')}}</view>
			</view>
		</view>
	</uni-popup>
</view>
</template>

<script>
import { unBindDevice, changeDeviceInfo, queryDeviceInfo } from '@/api/devices.js'
import { mapGetters } from 'vuex'
export default{
	data(){
		return{
			pk:null,
			dk:null,
			bleDeviceId:'',
			changeName:'',
			deviceMsg:{
				deviceName:null
			},
		}
	},
	computed:{
		devName(){
			return this.$store.state.device.deviceName
		},
		...mapGetters(['isOffline'])
	},
	onLoad(data) {
		this.bleDeviceId = data.bleDeviceId
		this.deviceMsg.deviceName = this.devName
	},
	onShow() {
		console.log(uni.getStorageSync('bleDeviceList'));
	},
	methods:{
		showSetNamePop(){
			if(this.isOffline){
				uni.showToast({ title: this.$t("offline-tip"), icon: 'none' })
			}else{
				this.changeName = this.deviceMsg.deviceName
				this.$refs.gname.open('center')
			}
		},
		hideSetNamePop(){
			this.$refs.gname.close()
		},
		editDeviceName(){
			this.$modal.msg(this.$t('success'))
			this.$store.commit('SET_DEVICENAME',this.changeName)
			this.deviceMsg.deviceName = this.changeName
			let devList = uni.getStorageSync('bleDeviceList')
			for(let i in devList){
				if(devList[i].deviceId == this.bleDeviceId){
					devList[i].deviceName = this.changeName
				}
			}
			uni.setStorageSync('bleDeviceList',devList)
			this.hideSetNamePop()
		},
		toOtaPage(){
			uni.navigateTo({
				url: '/pages/blemodule/ota/index?deviceId=' + this.bleDeviceId
			})
		},
		delDevice(){
			let that = this
			uni.showModal({
			  title: this.$t('com.tip'),
			  content: this.$t('confirm-remove-device'),
			  cancelText: this.$t('com.cancel'),
			  confirmText: this.$t('com.confirm'),
			  success: function(res) {
			    if (res.confirm) {
					that.$store.commit('DELETE_BLEDEVICELIST',that.bleDeviceId)
					that.$tab.reLaunch('/pages/blemodule/index')
			    }
			  }
			})
		}
	}
}
</script>

<style scoped>
.setting-page {
	min-height: 100vh;
	background-color: #F5F6FA;
	padding-bottom: 60rpx;
}

/* 信息卡片 */
.list-card {
	margin: 24rpx 30rpx;
	background: #fff;
	border-radius: 20rpx;
	overflow: hidden;
}

.list-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 36rpx;
	height: 110rpx;
	font-size: 30rpx;
	color: #222;
}

.item-label {
	font-size: 30rpx;
	color: #222;
}

.item-value {
	font-size: 28rpx;
	color: #848484;
}

.item-right {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.arrow-icon {
	font-size: 40rpx;
	color: #C0C0C0;
	margin-left: 8rpx;
	line-height: 1;
}

.divider {
	height: 1rpx;
	background-color: #F0F0F0;
	margin-left: 36rpx;
}

/* 移除设备按钮 */
.delete-dev {
	text-align: center;
	width: 630rpx;
	height: 98rpx;
	line-height: 98rpx;
	background: #01CBA5;
	border-radius: 50rpx;
	color: #fff;
	font-size: 34rpx;
	margin: 40rpx auto 0;
}
</style>
