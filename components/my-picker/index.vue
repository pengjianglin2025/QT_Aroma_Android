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
					<view class="item" v-for="(item,index) in pickerList" :key="index">{{getItemLabel(item)}}</view>
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
			default: () => [],
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
			pickerList:[],
			indicatorStyle:'height:50px',
			searchVal: '',
		}
	},
	watch:{
		list: {
			handler(newList){
				this.refreshPickerList(this.searchVal, newList)
			},
			immediate: true
		},
		searchVal(newVal){
			this.refreshPickerList(newVal, this.list)
		}
	},
	created() {
		this.selList = [this.currentSel]
	},
	methods:{
		refreshPickerList(keyword, list){
			const sourceList = Array.isArray(list) ? list : []
			if(!keyword){
				this.pickerList = sourceList
			}else if(this.isEnglishLetter(keyword)){
				const normalizedKeyword = this.isAllLowerCase(keyword) ? keyword : keyword.toLocaleLowerCase()
				this.pickerList = sourceList.filter(item => {
					const field = item && item[this.searchKey] ? String(item[this.searchKey]) : ''
					return field.toLocaleLowerCase().indexOf(normalizedKeyword) > -1
				})
			}else{
				this.pickerList = sourceList.filter(item => {
					const field = item && item[this.searchKey] ? String(item[this.searchKey]) : ''
					return field.indexOf(keyword) > -1
				})
			}
			if(!this.pickerList.length){
				this.selList = [0]
			}else if(this.selList[0] > this.pickerList.length - 1){
				this.selList = [0]
			}
		},
		isAllLowerCase(str) {
		  return /^[a-z]+$/.test(str)
		},
		isEnglishLetter(input) {
		    return /^[A-Za-z]+$/.test(input)
		},
		showpop(){
			this.$refs.popup.open('bottom')
		},
		cancel(){
			this.$refs.popup.close()
		},
		comfire(){
			const selectedIndex = Array.isArray(this.selList) ? this.selList[0] : 0
			const selectedObj = this.pickerList[selectedIndex]
			this.$refs.popup.close()
			this.$emit('myselect',selectedObj)
		},
		getItemLabel(item){
			if(!item || typeof item !== 'object'){
				return ''
			}
			return item[this.searchKey] || item.val || item.name || item.label || item.countryName || item.nationalityName || ''
		},
		handleChange(e){
			const { show } = e
			if(show === false){
				this.searchVal = ''
			}
		},
		bindChange(e){
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
