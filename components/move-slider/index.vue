<template>
<view style="position: relative;">
	<slider class="my-slider" activeColor="transparent" :backgroundColor="backgroundColor" :min="min" :max="max" :disabled="disabled" :value="curvalue" @changing="sliderMove" @change="sliderChange" :step="curstep" />
	<view class="slider-bg" :style="{background: backgroundColor}"></view>
	<view style="width: 90%;position: absolute;top: 0;">
		<view class="slider-block" :style="{left: toLeft+'%'}">
			<slot name="content"></slot>
		<!-- {{content}} -->
		</view>
	</view>
</view>
</template>

<script>
export default{
	props:{
		curvalue:{//当前进度
			type: Number,
			default: 1,
			required: true
		},
		curstep:{//步长，取值必须大于 0，并且可被(max - min)整除 （移动一次的值）
			type: Number,
			default: 1
		},
		min:{//最小值
			type: Number,
			default: 1
		},
		max:{//最大值
			type: Number,
			default: 100
		},
		disabled:{//是否禁用
			type: Boolean,
			default: false
		},
		backgroundColor:{
			type: String,
			// default: 'linear-gradient(to right, #ACACAC, transparent)'
			default: 'linear-gradient(to left, #ACACAC, transparent)'
		},
		// content:{//滑块里面的文字
		// 	type: String,
		// 	default:''
		// }
	},
	data(){
		return{
			toLeft: 0,
			range: 0//范围
		}
	},
	watch:{
		curvalue(newval,oldval){
			this.toLeft = (((newval-this.min)/this.range)*100).toFixed(0)
		}
	},
	created() {
		this.range = this.max - this.min
		this.toLeft = (((this.curvalue-this.min)/this.range)*100).toFixed(0)
		// console.log(this.toLeft);
	},
	methods:{
		sliderChange(e){
			console.log(e);
			this.toLeft = (((e.detail.value-this.min)/this.range)*100).toFixed(0)
			let para = {
				value: e.detail.value,
				percentage: this.toLeft
			}
			this.$emit('sliderChange',para)
		},
		sliderMove(e){
			// console.log(e);
			// this.toLeft = e.detail.value
			this.toLeft = (((e.detail.value-this.min)/this.range)*100).toFixed(0)
			let para = {
				value: e.detail.value,
				percentage: this.toLeft
			}
			this.$emit('sliderMove',para)
		}
	}
}
</script>

<style lang="scss">
	.slider-bg{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 56rpx;
		// background: linear-gradient(to left,#FFFFFF, #ACACAC);
		border-radius: 56rpx;
		box-shadow: 0 0 10rpx rgba(0,0,0,.16);
	}
	.slider-block{
		// width: 56rpx;
		// height: 56rpx;
		width: 86rpx;
		height: 86rpx;
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		box-shadow: 0 0 10rpx rgba(0,0,0,.16);
		left: 0;
		top: -10rpx;
		text-align: center;
		line-height: 86rpx;
		font-size: 28rpx;
		font-weight: bold;
	}
	.my-slider{
		position: relative;
		opacity: 0;
		z-index: 1;
		padding-top: 10rpx;
	}
	// /deep/.my-slider .uni-slider-handle-wrapper{
	// 	height: 56rpx;
	// 	border-radius: 56rpx;
	// }
</style>