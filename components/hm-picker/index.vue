<template>
<view class="xp-h-full">
	<view class="xp-picker" :style="{'visibility':pickerVisible?'visible':'hidden'}">
		<!-- <view class="xp-picker-mask" :class="{'xp-picker-animation':animation}" :style="{'opacity':pickerVisible?0.6:0}" @tap="_cancel"></view> -->
		<view class="xp-picker-mask" :class="{'xp-picker-animation':animation}" :style="{'opacity':pickerVisible?0.6:0}" @tap="cancelPicker"></view>
		<view class="xp-picker-container"
			:class="{'xp-picker-container--show':pickerVisible,'xp-picker-animation':animation}">
			<view v-if="actionPosition==='top'" class="xp-picker-action">
				<view class="xp-picker-action--cancel" @tap="_cancel">{{$t('com.cancel')}}</view>
				<view class="xp-picker-action--confirm" @tap="_confirm">{{$t('com.confirm')}}</view>
			</view>
			<picker-view style="margin-top: 40rpx;" :style="{'height':height+'vh'}" indicator-style="height:40px;" :value="selected" @change="_change">
				<picker-view-column class="xp-picker-column" v-if="is24system==false">
					<view class="xp-picker-list-item" v-for="(item,index) in minCols[0]" :key="index">
						{{item}}
					</view>
					<!-- <view class="xp-picker-list-item">
						<span class="timeunit">AM</span>
					</view>
					<view class="xp-picker-list-item">
						<span class="timeunit">PM</span>
					</view> -->
				</picker-view-column>
				<picker-view-column class="xp-picker-column"  v-if="is24system==false">
					<view class="xp-picker-list-item" v-for="(item,index) in cols[1]" :key="index">
						<!-- <span class="timeunit" v-if="is24system==false&&index==0">AM</span>
						<span class="timeunit" v-if="is24system==false&&index==12">PM</span> -->
						{{item}}
					</view>
				</picker-view-column>
				<picker-view-column class="xp-picker-column"  v-if="is24system==true">
					<view class="xp-picker-list-item" v-for="(item,index) in cols[0]" :key="index">
						{{item}}
					</view>
				</picker-view-column>
				<picker-view-column class="xp-picker-column">
					<view class="xp-picker-list-item" v-for="(item,index) in minCols[2]" :key="index">
						{{item}}
					</view>
				</picker-view-column>
			</picker-view>
			<view v-if="is24system" class="colon">{{':'}}</view>
			<view v-if="is24system==false" class="colon2">{{':'}}</view>
			<view v-if="actionPosition==='bottom'" class="xp-picker-btns">
				<button class="xp-button xp-button--cancel" @tap="_cancel">{{$t('com.cancel')}}</button>
				<button class="xp-button xp-button--confirm" @tap="_confirm">{{$t('com.confirm')}}</button>
			</view>
		</view>
	</view>
</view>
</template>

<script>
const times12List = ['12','01','02','03','04','05','06','07','08','09','10','11','12','01','02','03','04','05','06','07','08','09','10','11']
const times24List = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
const timesList = ['01','02','03','04','05','06','07','08','09','10','11','12']
const timemap= ['AM','PM']
let minList = []
for(let i=0;i<60;i++){
	minList.push(i.toString().padStart(2,'0'))
}
export default{
	data(){
		return{
			pickerVisible: false,
			cols: [],
			minCols: [timemap,times24List,minList],
			selected: []
		}
	},
	props:{
		animation: {
			type: Boolean,
			default: true
		},
		height: {
			type: [Number, String],
			default: 35
		},
		actionPosition: {
			type: String,
			default: "bottom"
		},
		is24system:{
			type: Boolean,
			default: true
		},
		value: String,
	},
	created() {
		if(this.is24system == true){
			this.selected = [0,0]
			this.cols = [times24List,minList]
		}else{
			// this.cols = [times12List,minList]
			this.selected = [0,0,0]
			this.cols = [timemap,timesList,minList]
		}
		this.setSelected()
	},
	methods:{
		show() {
			this.initSelected()
			this.pickerVisible = true
		},
		_cancel() {
			this.pickerVisible = false
		},
		cancelPicker(){
			this._confirm()
			this.pickerVisible = false
		},
		initSelected() {
			let dt
			dt = this.value
			if (!dt) dt = getLocalTime(this.mode)
			if (!dt) return
			this.setSelected(dt)
		},
		_resolveCurrentDt() {
			let str = ""
			for (let i = 0; i < this.selected.length; i++){
				if(this.is24system==true){
					// str += this.minCols[i][this.selected[i]]
					str += this.cols[i][this.selected[i]]
				}else{
					if(i>0){
						str += this.cols[i][this.selected[i]]
					} 
				}
			}
			let ht,mt
			if(this.is24system==false){
				if(this.cols[0][this.selected[0]] == 'PM'){
					ht  = Number(str.slice(0, 2))+12 == 24? '12': (Number(str.slice(0, 2))+12).toString()
					mt = str.slice(2)
				}else{
					ht = str.slice(0, 2)==12? '00':str.slice(0, 2)
					mt = str.slice(2)
				}
			}else{
				ht = str.slice(0, 2)
				mt = str.slice(2)
			}
			let dt = ht + ':' + mt
			return dt
		},
		_getResult() {
			const value = this._resolveCurrentDt()
			const detail = {
				value
			}
			const tp = new Date(value).getTime()
			if (!isNaN(tp)) detail.timestamp = tp
			return detail
		},
		_confirm() {
			const result = this._getResult()
			// console.log(result);
			const val = result.value
			if (!this.isError) {
				this.$emit('input', val)
				this.$emit('confirm', result)
				this.isConfirm = true
				if (this.formItem) this.formItem.setValue(val)
			}
			this.pickerVisible = false
		},
		_change(e){
			const newValue = e.detail.value
			this.selected = newValue
		},
		setSelected() {
			// console.log(this.value);
			// console.log(this.minCols);
			const arr = this.value.split(/-|:|\s/)
			// console.log(arr);
			let a
			if(this.is24system == false){
				// console.log(arr);
				if(arr[0]=='00'){
					arr[0] = '12'
					arr.unshift('AM')
				}else if(arr[0]=='12'){
					
					arr.unshift('PM')
				}else if(arr[0]>=13){
					arr[0] = (Number(arr[0])-12).toString().padStart(2,'0')
					arr.unshift('PM')
				}else{
					arr.unshift('AM')
				}
				// console.log(arr);
				a = this.cols
			}else{
				a = this.cols
			}
			// console.log(a);
			for (let i = 0; i < a.length; i++){
				// console.log(a[i]);
				// console.log(arr[i]);
				this.$set(this.selected, i, a[i].indexOf(arr[i]))
			}
			// console.log(this.selected);
		}
	}
}
</script>

<style scoped lang="scss">
	.xp-h-full {
		height: 100%;
	}

	.picker-label {
		height: 100%;
		display: flex;
		align-items: center;
		padding-left: 10px;
		font-size: 13px;
	}

	.is-placeholder {
		color: #999;
	}

	.xp-picker {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		font-size: 30rpx;
	}

	.xp-picker-container {
		position: fixed;
		bottom: 0;
		transform: translateY(100%);
		z-index: 999;
		width: 100%;
		background-color: #fff;
		visibility: hidden;
		border-radius: 16px 16px 0 0;
	}

	.xp-picker-container--show {
		transform: translateY(0);
		visibility: visible;
	}

	.xp-picker-mask {
		z-index: 998;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
	}

	.xp-picker-animation {
		transition: all 0.25s;
	}

	.xp-picker-error {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #ff0000
	}

	.xp-picker-action {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
		position: relative;
		font-size: 34rpx;
		border-bottom: 0.5px solid #e5e5e5
	}

	.xp-picker-btns {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		position: relative;
	}

	.xp-button {
		line-height: 2.3;
		font-size: 32rpx;
		margin: 0;
		padding: 0 80rpx;
		transform: translate(0upx, 0upx);
	}

	.xp-button:active:not([disabled]) {
		transform: translate(1upx, 1upx);
	}

	.xp-button:after {
		border: none;
	}

	.xp-button--cancel {
		background-color: #f5f5f5;
		color: #47a16e;
	}

	.xp-button--confirm {
		background-color: #47a16e;
		color: #fff;
	}

	.xp-picker-action--cancel {
		opacity: .7;
	}

	.xp-picker-action--confirm {
		color: #007aff;
	}

	.xp-picker-column {
		text-align: center;
		border: none;
		font-size: 32rpx;
	}

	.xp-picker-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		position: relative;
	}
	.timeunit{
		// position: absolute;
		// left: 10%;
		// top: 50%;
		// transform: translateY(-50%);
	}

	.colon {
		font-size: 28px;
		position: absolute;
		left: 50%;
		top: 58.8%;
		transform: translate(-50%, -50%);
	}
	.colon2{
		font-size: 28px;
		position: absolute;
		left: 66%;
		top: 58.8%;
		transform: translateY(-50%);
	}
</style>