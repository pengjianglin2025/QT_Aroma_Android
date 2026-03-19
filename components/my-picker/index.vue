<template>
<view>
	<uni-popup ref="popup" type="bottom" @change="handleChange">
	<view class="pop-content">
		<view class="flex justify-around flex-item-center pop-comfire">
			<div @click="cancel">{{$t('com.cancel')}}</div>
			<div class="pop-title">{{title}}</div>
			<div style="color: #FF6939;" @click="comfire">{{$t('com.confirm')}}</div>
		</view> 
		<view class="picker-search" v-if="showSearch">
			<input v-model="searchVal" :placeholder="$t('index.search')" type="text">
		</view>
		 <picker-view :value="selList" :indicator-style="indicatorStyle" immediate-change @change="bindChange" class="picker-view">
			<picker-view-column v-if="pickerList.length>0">
				<view class="item" v-for="(item,index) in pickerList" :key="index">{{item[searchKey]}}</view>
			</picker-view-column>
		</picker-view>
	</view>
	</uni-popup>
</view>
</template>

<script>
import uniPopup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
export default{
	props:{
		title:{
			type: String,
			default:'please select'
		},
		list:{
			type: Array,
			default: [],
			require: true
		},
		currentSel:{
			type: Number,
			default: 0
		},
		searchKey:{
			type: String,
			default: 'name'
		},
		showSearch:{
			type:Boolean,
			default:true
		}
	},
	data(){
		return{
			selList:[0],
			pickerList:[],//处理过的数组
			indicatorStyle:`height:50px`,
			searchVal: '',//搜索关键词
		}
	},
	watch:{
		searchVal(newVal,oldVal){
			// console.log('new',newVal);
			let isEnglishLet = this.isEnglishLetter(newVal)	//是否包含文字
			if(isEnglishLet){
				let isAllLower = this.isAllLowerCase(newVal) //是否全部为小写字母
				let newValLetter 
				// console.log(isAllLower);
				if(isAllLower){
					newValLetter = newVal
				}else{
					newValLetter = newVal.toLocaleLowerCase()
				}
				// console.log(newValLetter);
				this.pickerList = this.list.filter(item=>{return item[this.searchKey].toLocaleLowerCase().indexOf(newValLetter)>-1})
			}else{
				this.pickerList = this.list.filter(item=>{return item[this.searchKey].indexOf(newVal)>-1})
			}
			// this.pickerList = this.list.filter(item=>{return item.name == newVal})
		}
	},
	created() {
		// console.log(this.list);
		this.pickerList = this.list
		this.selList = [this.currentSel]
	},
	methods:{
		//判断一个字符串是否全部由小写字母组成  
		isAllLowerCase(str) {
		  return /^[a-z]+$/.test(str);  
		},
		//判断输入内容是否为纯英文（不包含文字）
		isEnglishLetter(input) {
		    var regex = /^[A-Za-z]+$/; 
		    return regex.test(input);  
		},
		showpop(){
			// console.log('我被调用');
			this.$refs.popup.open('bottom')
		},
		//关闭弹窗
		cancel(){
			this.$refs.popup.close()
		},
		//确认
		comfire(){
			// console.log(this.pickerList[this.selList]);
			let selectedObj = this.pickerList[this.selList]
			this.$refs.popup.close()
			this.$emit('myselect',selectedObj);
		},
		handleChange(e){
			const { show } = e
			if(show==false){
				// this.comfire()
				console.log('我被执行了');
			}
		},
		bindChange(e){
			// console.log(e);
			this.selList = e.detail.value
		},
		setSelValue(val){
			this.selList = [val]
		}
	}
}
</script>

<style>
.picker-view {
	width: 750rpx;
	height: 400rpx;
	margin-top: 20rpx;
}
.item {
	line-height: 100rpx;
	text-align: center;
}
.pop-content{
	width: 100%;
	/* height: 40vh; */
	height: 578rpx;
	background-color: #fff;
	border-radius: 16rpx 16rpx 0 0;
}
.pop-comfire{
	font-size: 28rpx;
	padding: 40rpx 0;
	position: relative;
}
.pop-comfire::after{
	content: '';
	display: inline-block;
	width: 100%;
	height: 2rpx;
	position: absolute;
	left: 0;
	bottom: -4rpx;
	background-color: #E8E8E8;
}
.pop-title{
	font-size: 32rpx;
	font-weight: bold;
}
.picker-search{
	background-color: #EDEDED;
	padding: 12rpx 40rpx;
}
</style>