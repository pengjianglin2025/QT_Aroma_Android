<template>
<view>
	<!-- 标题 -->
	<view class="page-title temp-page-title">
		<image class="back-icon" src="../../../static/back.png" @click="back"></image>
		<div class="title-text">
			{{title}}
		</div>
	</view>
	<view class="flex justify-around items-center light-list">
		<view class="text-center light-item" :style="{border: selectedlist.indexOf(item.id)>-1? '4rpx solid #FF784C':'', backgroundColor: selectedlist.indexOf(item.id)>-1&&setIdx == 1?  selectColor: item.bgColor}"
		 v-for="(item,index) in lightList" :key="item.name || item.id || index" @click="selectedLight(item)">{{item.name}}</view>
	</view>
	<view v-if="setIdx==1">
		<view class="usage-tips">Apply a color to the selected bulds：</view>
		<view class="mrt-40 flex justify-center">
			<view v-for="(item,index) in colorList" :key="item.value || index" class="flex justify-center items-center ml-32 selected-border" :style="{border: colorIdx==index? '4rpx solid '+item.value:''}" @click="changeColor(index)">
				<div class="color-radio" :style="{backgroundColor: item.value}"></div>
			</view>
		</view>
		<RenderjsColor style="margin-top: 68rpx;" :pickerWidth="232" @change="colorSelected" @changing="colorSelected"></RenderjsColor>
	</view>
	<view v-if="setIdx==2">
		<view class="group-title" style="padding-left: 40rpx;">
			Brightness
		</view>
		<view class="flex justify-center items-center mrt-40">
			<image class="progress-btn mr-20" src="../../../static/images/device/reducebtn.png" mode="" @click="redu(1)"></image>
			<view class="progress-bg">
				<MoveSlider style="width: 100%;" :backgroundColor="'linear-gradient(to left,'+ currentColor+', transparent)'" :content="'1222k'" @sliderChange="brightMove" @sliderMove="brightMove" :curvalue="brightnessText">
					<template slot="content">
						{{brightnessText}}%
					</template>
				</MoveSlider>
			</view>
			<image class="progress-btn ml-20" src="../../../static/images/device/addbtn.png" mode="" @click="add(1)"></image>
		</view>
	</view>
	<view v-if="setIdx==3">
		<view class="group-title" style="padding-left: 40rpx;">
			Speed
		</view>
		<view class="flex justify-center items-center mrt-40">
			<image class="progress-btn mr-20" src="../../../static/images/device/reducebtn.png" mode="" @click="redu(2)"></image>
			<view class="progress-bg">
				<MoveSlider style="width: 100%;" :backgroundColor="'#B1B1B1'" :content="'1222k'" @sliderChange="speedChange" @sliderMove="speedMove" :curvalue="speedVal">
					<template slot="content">
						{{speedVal}}
					</template>
				</MoveSlider>
			</view>
			<image class="progress-btn ml-20" src="../../../static/images/device/addbtn.png" mode="" @click="add(2)"></image>
		</view>
	</view>
</view>
</template>

<script>
import MoveSlider from "@/components/move-slider/index.vue"
import RenderjsColor from "@/components/renderjs-color-picker/renderjs-color-picker.vue"
import { converRgbToArgb, converArgbToRgb, HEXtoRGB } from "@/utils/common.js"
export default{
	components:{
		RenderjsColor,
		MoveSlider
	},
	data(){
		return{
			title:'',
			setIdx:'',//区分1:colour 2:white temp 3:speed
			colorIdx: 0, //当前颜色index
			selectedlist:[],//被选中的列表
			selectColor: '#FF0000',
			lightList:[{
				name: '1',
				id: 1,
				bgColor: '#FFE0D6'//背景色
			},{
				name: '2',
				id: 2,
				bgColor: '#FFE0D6'//背景色
			},{
				name: '3',
				id: 3,
				bgColor: '#FFE0D6'//背景色
			},{
				name: '4',
				id: 4,
				bgColor: '#FFE0D6'//背景色
			},{
				name: '5',
				id: 5,
				bgColor: '#FFE0D6'//背景色
			},{
				name: '6',
				id: 6,
				bgColor: '#FFE0D6'//背景色
			}],
			colorList:[{//原色列表
				id:1,
				value:'#FF0000'
			},{
				id:2,
				value:'#00ff00'
			},{
				id:3,
				value:'#0000ff'
			},{
				id:4,
				value:'#ffff00'
			},{
				id:5,
				value:'#ff00ff'
			},{
				id:6,
				value:'#00ffff'
			}],
			brightnessText: 1,
			timemap: 0, //当前时间戳
			setTime: 500,//发送时间间隔
			currentColor: null,
			speedVal: 1
		}
	},
	onLoad(data) {
		this.setIdx = data.setIdx
		if(this.setIdx == 1){
			this.title = 'Colour'
		}else if(this.setIdx == 2){
			this.title = 'White Temp'
		}else if(this.setIdx == 3){
			this.title = 'Speed'
		}
	},
	methods:{
		colorSelected(color){
			let { rgb } = color
			this.selectColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
			console.log(this.selectColor);
			console.log(color);
		},
		//切换选择的颜色
		changeColor(idx){
			this.colorIdx = idx
			let currentColor = this.colorList[idx].value
			// //转换成rgb数组
			let currentRGB = HEXtoRGB(currentColor)
			this.selectColor = `rgb(${currentRGB[0]},${currentRGB[1]},${currentRGB[2]})`
		},
		//选中/取消选中某个灯
		selectedLight(item){
			if(this.selectedlist.indexOf(item.id)>-1){
				let index = this.selectedlist.indexOf(item.id)
				this.selectedlist.splice(index,1)
			}else{
				this.selectedlist.push(item.id)
			}
		},
		//亮度移动
		brightMove(e){
			// console.log(e);
			let time = new Date().getTime()
			this.brightnessText = e.value
			// if(time-this.timemap > this.setTime){
			// 	this.setbright(this.brightnessText)
			// 	this.timemap = new Date().getTime()
			// }
		},
		//亮度选中
		brightChange(e){
			console.log(e);
			this.brightnessText = e.value
			this.setbright(this.brightnessText)
		},
		speedChange(e){
			this.speedVal = e.value
			// let para = {
			// 	speed: this.speedVal
			// }
			// this.sendOrder(para)
		},
		speedMove(e){
			this.speedVal = e.value
			let time = new Date().getTime()
			// if(time-this.timemap>500){
			// 	let para = {
			// 		speed: this.speedVal
			// 	}
			// 	this.sendOrder(para)
			// 	this.timemap = new Date().getTime()
			// }
		},
	}
}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
	.light-list{
		border-bottom: 2rpx solid #C3C4C6;
	}
	.light-item{
		width: 96rpx;
		height: 96rpx;
		border-radius: 16rpx;
		color: #fff;
		font-size: 44rpx;
		line-height: 96rpx;
		/* background-color: #FFE0D6; */
		margin-top: 40rpx;
		margin-bottom: 60rpx;
	}
	.usage-tips{
		font-size: 28rpx;
		text-align: center;
		margin: 60rpx 0;
	}
</style>