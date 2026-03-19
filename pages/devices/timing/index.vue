<template>
<view style="background-color: #fff;">
	<view class="page-title temp-page-title">
		<image class="back-icon" src="../../../static/back.png" @click="back"></image>
		<div class="title-text">
			定时
		</div>
	</view>
	<view class="flex justify-around text-center timing-top">
		<view class="" @click="selTab(1)">
			<image class="day-icon" src="../../../static/images/device/daysel.png" mode=""></image>
			<div>日定时</div>
		</view>
		<view class="" @click="selTab(2)">
			<image class="time-icon" src="../../../static/images/device/week.png" mode=""></image>
			<div>周定时</div>
		</view>
		<view class="" @click="selTab(3)">
			<image class="time-icon" src="../../../static/images/device/cloud.png" mode=""></image>
			<div>云事件</div>
		</view>
	</view>
	<view class="" v-if="curidx==1">
		<view class="flex justify-between items-center set-content">
			<view class="">
				<div class="timing-time">9:00-18:00</div>
				<div class="timing-days">每周一、周二、周三、周四、周五，周六，周日</div>
			</view>
			<switch checked="true" color="#FF6939" style="transform: scale(0.8);" @change="" />
		</view>
		<view class="flex justify-between items-center set-content">
			<view class="">
				<div class="timing-time">9:00-18:00</div>
				<div class="timing-days">每周一、周二、周三、周四、周五，周六，周日</div>
			</view>
			<switch checked="true" color="#FF6939" style="transform: scale(0.8);" @change="" />
		</view>
		<view class="flex justify-between items-center set-content">
			<view class="">
				<div class="timing-time">9:00-18:00</div>
				<div class="timing-days">每周一、周二、周三、周四、周五，周六，周日</div>
			</view>
			<switch checked="true" color="#FF6939" style="transform: scale(0.8);" @change="" />
		</view>
	</view>
	<view style="padding: 40rpx;font-size: 32rpx;" v-if="curidx==2">
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周一</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周二</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周三</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周四</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周五</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周六</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
		<view class="list-cell-arrow work-timing">
		  <view class="menu-item-box">
		    <view>周日</view>
			<view class="time-text">晚安模式</view>
		  </view>
		</view>
	</view>
	<view class="" style="padding: 40rpx;font-size: 32rpx;" v-if="curidx==3">
		<view class="flex justify-between items-center">
			<div style="font-weight: bold;">任务定时</div>
			<switch checked="true" color="#FF6939" style="transform: scale(0.8);" @change="" />
		</view>
		<view style="margin-top: 52rpx;">
			<view class="list-cell-arrow work-timing">
			  <view class="menu-item-box">
			    <view>定时一</view>
				<view class="time-text">2023/8/8-2023/8/9</view>
			  </view>
			</view>
			<view class="list-cell-arrow work-timing">
			  <view class="menu-item-box">
			    <view>定时二</view>
				<view class="time-text">2023/8/8-2023/8/9</view>
			  </view>
			</view>
			<view class="list-cell-arrow work-timing">
			  <view class="menu-item-box">
			    <view>定时三</view>
				<view class="time-text">2023/8/8-2023/8/9</view>
			  </view>
			</view>
			<view class="list-cell-arrow work-timing">
			  <view class="menu-item-box">
			    <view>定时四</view>
				<view class="time-text">2023/8/8-2023/8/9</view>
			  </view>
			</view>
			<view class="list-cell-arrow work-timing">
			  <view class="menu-item-box">
			    <view>定时五</view>
				<view class="time-text">2023/8/8-2023/8/9</view>
			  </view>
			</view>
		</view>
		
	</view>
</view>
</template>

<script>
export default{
	data(){
		return{
			curidx:1
		}
	},
	methods:{
		selTab(idx){
			this.curidx = idx
		}
	}
}
</script>

<style scoped>
	.work-timing{
		position: relative;
		padding: 20rpx 0;
		border-top: 4rpx solid #dbdbdb;
	}
	.day-icon{
		width: 56rpx;
		height: 56rpx;
	}
	.time-icon{
		width: 52rpx;
		height: 52rpx;
	}
	.timing-top{
		color: #989898;
		margin-top: 42rpx;
		margin-bottom: 60rpx;
	}
	.set-content{
		padding: 40rpx;
		border-top: 4rpx solid #dbdbdb;
	}
	.timing-time{
		color: #151515;
		font-size: 44rpx;
	}
	.timing-days{
		color: #989898;
		font-size: 24rpx;
	}
	.time-text{
		position: absolute;
		top: 50%;
		right: 80rpx;
		transform: translateY(-50%);
		color: #848484;
	}
</style>