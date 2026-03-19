<template>
<view class="" style="background-color: #fff;padding-bottom: 40rpx;">
	<view class="page-title temp-page-title">
		<image class="back-icon" src="../../../static/back.png" @click="back"></image>
		<div class="title-text">
			{{$t('index.setting')}}
		</div>
	</view>
	<view style="padding: 40rpx;font-size: 32rpx;">
		<view class="list-cell-arrow work-timing" @click="showSetNamePop">
		  <view class="menu-item-box">
		    <view>{{$t('device-name')}}</view>
			<view class="time-text">{{deviceMsg.deviceName}}</view>
		  </view>
		</view>
		<view class="work-timing">
		  <view class="menu-item-box">
		    <view>{{$t('device-sn')}}</view>
			<view style="margin-top: 10rpx;color: #848484;">{{bleDeviceId}}</view>
		  </view>
		</view>
		<!-- <view class="work-timing">
		  <view class="menu-item-box">
		    <view>productKey</view>
			<view class="time-text">{{deviceMsg.productKey}}</view>
		  </view>
		</view>
		<view class=" work-timing">
		  <view class="menu-item-box">
		    <view>设备SN</view>
			<view style="color: #848484;">{{deviceMsg.sn}}</view>
		  </view>
		</view> -->
	</view>
	<view class="delete-dev" @click="delDevice">
		{{$t('delete-device')}}
	</view>
	<uni-popup ref="gname" type="center">
		<view class="err-pop">
			<div class="gr-name text-center" style="padding: 20rpx 0;font-size: 40rpx;">{{$t('device-name')}}</div>
			<view class="input-item flex align-center input-shadow">
			  <input v-model="changeName" class="input" type="text" :placeholder="$t('input-group-name')" maxlength="30" />
			</view>
			<div class="close-errpop" @click="editDeviceName">
				<span class="login-btn cu-btn block lg round" style="width: 80%;margin: auto;background-color: #01CBA5;color: #fff;">{{$t('com.confirm')}}</span> 
			</div>
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
			bleDeviceId:'',//蓝牙设备id
			changeName:'',
			deviceMsg:{
				deviceName:null
			},//设备详情信息
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
		// this.pk = data.pk
		// this.dk = data.dk
	},
	onShow() {
		console.log(uni.getStorageSync('bleDeviceList'));
	},
	methods:{
		//打开修改名称弹窗
		showSetNamePop(){
			if(this.isOffline){
				uni.showToast({
					title: this.$t("offline-tip"),
					icon: 'none'
				})
			}else{
				this.changeName = this.deviceMsg.deviceName
				this.$refs.gname.open('center')
			}
		},
		//关闭修改名称弹窗
		hideSetNamePop(){
			this.$refs.gname.close()
		},
		//修改设备名称
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
		//移除设备
		delDevice(){
			let that = this
			uni.showModal({
			  title: this.$t('com.tip'),
			  content: this.$t('confirm-remove-device'),
			  cancelText: this.$t('com.cancel'),
			  confirmText:this.$t('com.confirm'),
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
	.work-timing{
		position: relative;
		padding: 20rpx 0;
	}
	.time-text{
		position: absolute;
		top: 50%;
		right: 80rpx;
		transform: translateY(-50%);
		color: #848484;
	}
	.delete-dev{
		text-align: center;
		width: 630rpx;
		height: 98rpx;
		line-height: 98rpx;
		background: linear-gradient(to right,#01CBA5,#01CBA5);
		border-radius: 12rpx;
		color: #fff;
		font-size: 36rpx;
		margin: auto;
	}
</style>