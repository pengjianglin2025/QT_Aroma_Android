<template>
<view class="page-mode">
	<view class="mode-grid"></view>
	<view class="mode-glow mode-glow-a"></view>
	<view class="mode-glow mode-glow-b"></view>

	<view class="hero-panel">
		<view class="hero-copy">
			<text class="hero-title">{{$t('welcome')}} Aroma Buddy</text>
			<text class="hero-subtitle">{{$t('selectmode')}}</text>
		</view>

		<view class="hero-visual">
			<view class="signal-ring ring-outer"></view>
			<view class="signal-ring ring-mid"></view>
			<view class="signal-core">
				<view class="signal-wave wave-top"></view>
				<view class="signal-wave wave-bottom"></view>
				<view class="signal-chip"></view>
			</view>
			<view class="signal-orbit orbit-a"></view>
			<view class="signal-orbit orbit-b"></view>
		</view>
	</view>

	<view class="mode-card-stack">
		<view class="mode-card" @click="getSearchBle">
			<view class="mode-icon mode-icon-ble">
				<image class="mode-icon-image" src="/static/ble.png" mode="aspectFit"></image>
			</view>
			<view class="mode-copy">
				<text class="mode-label">{{$t('btn-bluetooth')}}</text>
				<text class="mode-desc">Direct local control</text>
			</view>
			<text class="mode-arrow">›</text>
		</view>

		<view class="mode-card" @click="navToLogin">
			<view class="mode-icon mode-icon-wifi">
				<image class="mode-icon-image" src="/static/network.png" mode="aspectFit"></image>
			</view>
			<view class="mode-copy">
				<text class="mode-label">{{$t('btn-wifi')}}</text>
				<text class="mode-desc">Cloud scenes and devices</text>
			</view>
			<text class="mode-arrow">›</text>
		</view>
	</view>

	<view class="footer-bar">
		<text class="footer-link" @click="navToPrivacy">{{$t('Privacy')}}</text>
	</view>
</view>
</template>

<script>
import { isLogin } from '@/api/login.js'
import { mapGetters } from 'vuex'

export default{
	data(){
		return {}
	},
	computed:{
		...mapGetters(['bleDeviceList'])
	},
	methods:{
		getSearchBle(){
			uni.setStorageSync('lastmode','ble')
			if(this.bleDeviceList.length > 0){
				this.$tab.reLaunch('/pages/blemodule/index')
			}else{
				this.$tab.navigateTo('/pages/blemodule/searchble/index')
			}
		},
		checkLogin() {
			isLogin().then(res => {
				if(res.data){
					this.$tab.reLaunch('/pages/index')
				}
			}).catch(() => {})
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
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		padding: 108rpx 34rpx 56rpx;
		background:
			radial-gradient(circle at 18% 16%, rgba(57, 233, 211, 0.22), transparent 28%),
			radial-gradient(circle at 84% 12%, rgba(64, 121, 255, 0.18), transparent 26%),
			linear-gradient(180deg, #07111f 0%, #0a1830 38%, #091423 100%);
	}
	.mode-grid{
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(135, 233, 255, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(135, 233, 255, 0.06) 1px, transparent 1px);
		background-size: 44rpx 44rpx;
		mask-image: linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.3) 72%, transparent);
	}
	.mode-glow{
		position: absolute;
		border-radius: 999rpx;
		filter: blur(22rpx);
		opacity: 0.88;
	}
	.mode-glow-a{
		top: 118rpx;
		right: -76rpx;
		width: 280rpx;
		height: 280rpx;
		background: radial-gradient(circle, rgba(76, 234, 218, 0.45) 0%, rgba(76, 234, 218, 0) 70%);
	}
	.mode-glow-b{
		left: -70rpx;
		bottom: 188rpx;
		width: 240rpx;
		height: 240rpx;
		background: radial-gradient(circle, rgba(74, 124, 255, 0.38) 0%, rgba(74, 124, 255, 0) 72%);
	}
	.hero-panel{
		position: relative;
		z-index: 1;
		padding: 34rpx 28rpx 40rpx;
		border-radius: 34rpx;
		background: linear-gradient(180deg, rgba(14, 30, 56, 0.82) 0%, rgba(9, 21, 39, 0.66) 100%);
		border: 1px solid rgba(126, 220, 255, 0.16);
		box-shadow: 0 24rpx 60rpx rgba(0, 0, 0, 0.28);
		backdrop-filter: blur(18rpx);
	}
	.hero-copy{
		display: flex;
		flex-direction: column;
	}
	.eyebrow{
		color: rgba(153, 237, 255, 0.78);
		font-size: 28rpx;
		letter-spacing: 4rpx;
		text-transform: uppercase;
	}
	.hero-title{
		margin-top: 14rpx;
		color: #f5fbff;
		font-size: 56rpx;
		font-weight: 700;
		line-height: 1.14;
	}
	.hero-subtitle{
		margin-top: 16rpx;
		color: rgba(199, 224, 255, 0.76);
		font-size: 28rpx;
		line-height: 1.6;
	}
	.hero-visual{
		position: relative;
		width: 460rpx;
		height: 460rpx;
		margin: 46rpx auto 0;
	}
	.signal-ring{
		position: absolute;
		inset: 0;
		border-radius: 50%;
	}
	.ring-outer{
		border: 3rpx solid rgba(90, 241, 224, 0.55);
		box-shadow: 0 0 42rpx rgba(56, 240, 220, 0.28);
	}
	.ring-mid{
		inset: 28rpx;
		border: 2rpx dashed rgba(117, 192, 255, 0.34);
		opacity: 0.95;
	}
	.signal-core{
		position: absolute;
		top: 82rpx;
		left: 82rpx;
		width: 296rpx;
		height: 296rpx;
		border-radius: 50%;
		background:
			radial-gradient(circle at 30% 24%, rgba(116, 255, 227, 0.96), rgba(40, 195, 173, 0.88) 38%, rgba(17, 91, 108, 0.96) 100%);
		box-shadow:
			inset 0 12rpx 26rpx rgba(255,255,255,0.15),
			0 20rpx 42rpx rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}
	.signal-wave{
		position: absolute;
		left: -10%;
		width: 120%;
		height: 42%;
		border-radius: 48%;
		background: rgba(217, 252, 255, 0.22);
		filter: blur(2rpx);
	}
	.wave-top{
		top: 34rpx;
		transform: rotate(-6deg);
	}
	.wave-bottom{
		bottom: 26rpx;
		background: rgba(6, 44, 71, 0.16);
		transform: rotate(8deg);
	}
	.signal-chip{
		position: absolute;
		left: 50%;
		top: 50%;
		width: 128rpx;
		height: 128rpx;
		transform: translate(-50%, -50%);
		border-radius: 32rpx;
		background: linear-gradient(135deg, rgba(240,255,255,0.9), rgba(129,247,226,0.26));
		border: 2rpx solid rgba(220, 255, 255, 0.45);
		box-shadow: 0 0 32rpx rgba(186, 255, 251, 0.24);
	}
	.signal-orbit{
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(172, 255, 247, 0.92) 0%, rgba(172, 255, 247, 0.14) 56%, transparent 70%);
	}
	.orbit-a{
		top: 40rpx;
		right: 84rpx;
		width: 26rpx;
		height: 26rpx;
	}
	.orbit-b{
		left: 52rpx;
		bottom: 94rpx;
		width: 20rpx;
		height: 20rpx;
	}
	.mode-card-stack{
		position: relative;
		z-index: 1;
		margin-top: 42rpx;
	}
	.mode-card{
		display: flex;
		align-items: center;
		padding: 28rpx 26rpx;
		margin-top: 22rpx;
		border-radius: 30rpx;
		background: linear-gradient(180deg, rgba(16, 36, 64, 0.92) 0%, rgba(10, 23, 43, 0.88) 100%);
		border: 1px solid rgba(118, 224, 255, 0.14);
		box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.22);
		backdrop-filter: blur(14rpx);
	}
	.mode-icon{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 92rpx;
		height: 92rpx;
		border-radius: 26rpx;
		flex-shrink: 0;
	}
	.mode-icon-ble{
		background: linear-gradient(135deg, rgba(57, 233, 211, 0.3), rgba(18, 144, 255, 0.18));
		box-shadow: inset 0 0 0 1px rgba(149, 247, 238, 0.16);
	}
	.mode-icon-wifi{
		background: linear-gradient(135deg, rgba(94, 173, 255, 0.32), rgba(94, 173, 255, 0.14));
		box-shadow: inset 0 0 0 1px rgba(164, 214, 255, 0.16);
	}
	.mode-icon-image{
		width: 42rpx;
		height: 42rpx;
	}
	.mode-copy{
		display: flex;
		flex-direction: column;
		margin-left: 22rpx;
		flex: 1;
	}
	.mode-label{
		color: #f4fbff;
		font-size: 34rpx;
		font-weight: 600;
		letter-spacing: 1rpx;
	}
	.mode-desc{
		margin-top: 8rpx;
		color: rgba(186, 209, 232, 0.72);
		font-size: 24rpx;
	}
	.mode-arrow{
		color: rgba(185, 243, 255, 0.72);
		font-size: 48rpx;
		font-weight: 300;
		line-height: 1;
		padding-left: 18rpx;
	}
	.footer-bar{
		position: relative;
		z-index: 1;
		margin-top: 36rpx;
		text-align: right;
		padding-right: 10rpx;
	}
	.footer-link{
		color: rgba(173, 227, 255, 0.78);
		font-size: 26rpx;
		letter-spacing: 1rpx;
	}
</style>
