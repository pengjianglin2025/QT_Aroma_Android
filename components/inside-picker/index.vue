<template>
<view>
	<picker-view :value="selected" @change="_change" :style="{'height':height+'vh'}" indicator-style="height:40px;" class="picker-view">
		<picker-view-column class="xp-picker-column" v-if="is24system==false">
			<view class="xp-picker-list-item" v-for="(item,index) in minCols[0]" :key="index">{{item}}</view>
		</picker-view-column>
		<picker-view-column class="xp-picker-column" v-if="is24system==false">
			<view class="xp-picker-list-item" v-for="(item,index) in cols[1]" :key="index">{{item}}</view>
		</picker-view-column>
		<picker-view-column class="xp-picker-column" v-if="is24system==true">
			<view class="xp-picker-list-item" v-for="(item,index) in cols[0]" :key="index">{{item}}</view>
		</picker-view-column>
		<picker-view-column class="xp-picker-column">
			<view class="xp-picker-list-item" v-for="(item,index) in minCols[2]" :key="index">{{item}}</view>
		</picker-view-column>
	</picker-view>
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
		height: {
			type: [Number, String],
			default: 15
		},
		is24system:{
			type: Boolean,
			default: true
		},
		tIndex:{
			type: [Number, String],
			default: 1
		},
		value: String,
	},
	created() {
		console.log(this.value);
		console.log(timesList);
		setTimeout(()=>{
			if(this.is24system == true){
				this.selected = [0,0]
				this.cols = [times24List,minList]
			}else{
				// this.cols = [times12List,minList]
				this.selected = [0,0,0]
				this.cols = [timemap,timesList,minList]
			}
			this.setSelected()
		},300)
		
	},
	methods:{
		_change(e){
			const newValue = e.detail.value
			console.log(newValue);
			this.selected = newValue
			this._confirm()
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
			console.log(this.tIndex);
			const val = result.value
			if (!this.isError) {
				this.$emit('input', val)
				this.$emit('confirm', result,this.tIndex)
				this.isConfirm = true
				if (this.formItem) this.formItem.setValue(val)
			}
			this.pickerVisible = false
		},
	}
}
</script>

<style scoped lang="scss">
	.picker-view {
		// width: 750rpx;
		width: 300rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
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
</style>