<template>
<view class="page-mode">
	<view class="logo-content-img">
		<view class="logo-content">
			<view>{{$t('hello')}}，</view>
			<view>{{$t('welcome')}} Aroma Buddy</view>
			<view>{{$t('selectmode')}}</view>
		</view>
	</view>
	<view class="" style="text-align: center;overflow: hidden;margin-top: 60rpx;">
		<image mode="heightFix" src="../static/circle-style.png"></image>
	</view>
	<view class="btn-content">
		<button class="login-btn cu-btn block" style="background-color: #01CBA5;" @click="getSearchBle">
			<image style="width: 40rpx;margin-right: 20rpx;" src="/static/ble.png" mode="widthFix"></image>
			{{$t('btn-bluetooth')}}
		</button>
		<button class="login-btn cu-btn block" style="background-color: #01CBA5;" @click="navToLogin">
			<image style="width: 40rpx;margin-right: 20rpx;" src="/static/network.png" mode="widthFix"></image>
			{{$t('btn-wifi')}}
		</button>
	</view>
	<view style="margin-top: 30rpx;color: #fff;text-align: right;padding-right: 50rpx;font-size: 30rpx;">
		<span @click="navToPrivacy">{{$t('Privacy')}}</span>
	</view>
</view>
</template>

<script>
import { isLogin } from '@/api/login.js'
import { mapGetters } from 'vuex'
export default{
	data(){
		return{
			// appName: this.$t('app-name'),
		}
	},
	computed:{
		...mapGetters(['bleDeviceList'])
	},
	methods:{
		getSearchBle(){
			uni.setStorageSync('lastmode','ble')
			if(this.bleDeviceList.length>0){
				this.$tab.reLaunch('/pages/blemodule/index')
			}else{
				this.$tab.navigateTo('/pages/blemodule/searchble/index') 
			}
		},
		checkLogin() {
			isLogin().then(res=>{
				console.log(res);
				if(res.data){
					this.$tab.reLaunch('/pages/index')
				}
				// else{
				// 	this.$tab.reLaunch('/pages/login') 
				// }
			  }).catch(err=>{
				// console.log(err);
				// this.$tab.reLaunch('/pages/login') 
			})
		},
		navToLogin(){
			uni.setStorageSync('lastmode','wifi')
			this.$tab.navigateTo('/pages/login') 
		},
		navToPrivacy(){
			this.$tab.navigateTo('/pages/privacy')
		}
	}
}
</script>

<style>
	.page-mode{
		min-height: 100vh;
		/* background-color: #01CBA5; */
		background: linear-gradient(#11ce96,#a2f5e6);
	}
	.logo-content-img>.logo-content {
		padding-left: 40rpx;
		padding-top: 120rpx;
		color: #ffffff;
		font-size: 40rpx;
	}
	.login-btn {
		margin-top: 40px;
		height: 45px;
		/* background: #01CBA5; */
		color: #ffffff;
		border-radius: 10px;
	}
	.btn-content{
		padding: 0 40rpx;
		margin-top: 80rpx;
		/* transform: translateY(-50%); */
	}
</style>