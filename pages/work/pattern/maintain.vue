<template>
	<view>
		<!-- <uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" :title="title" @clickLeft="back" right-text="Save" @clickRight="handleData"/> -->
		<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" :title="title" @clickLeft="back">
			<template v-slot:left>
				<view class="flex items-center" @click="back">
					<image style="width: 20rpx;" src="/static/back.png" mode="widthFix"></image>
					<text style="font-size: 26rpx;margin-left: 20rpx;">{{$t("com.cancel")}}</text>
				</view>
			</template>
			<template v-slot:right>
				<view class="flex items-center" @click="confirmSend">
					<text style="font-size: 26rpx;margin-left: 20rpx;">{{$t("com.confirm")}}</text>
				</view>
			</template>
		</uni-nav-bar>

		<!-- <view class="modeLists" @touchstart="touchscreen" @touchend="touchEndscreen"> -->
		<view class="modeLists">
			<view class="modeList">
				<view class="title">{{$t('week-setting')}}</view>
				<view class="content" style="padding-top: 30rpx;padding-bottom: 30rpx;">
					<template v-for="(item2,index2) in totalWeeks">
						<text :key="index2" class="ctList" :style="(isInArray(item.weeks,item2) == true?'background-color: #00AD8D;':'')" @click="onCheckWeek(item2)">{{item2}}</text>
					</template>
				</view>
			</view>
			<view class="modeList">
				<view class="title">{{$t('time-bucket-setting')}}</view>
				<view class="flex" style="position: relative;">
					<div class="middleline" style="left: 47%;"></div>
					<!-- <view @click="showPicker(1)"> -->
					<view class="content" style="padding: 0;">
						<view>
							<view>
								{{$t('start-time')}}
							</view>
							<!-- <view style="display: flex;align-items: center;">
								<text style="color:#989898;" v-if="is24hour">{{item.btime}}</text>
								<text style="color:#989898;" v-else>
									{{change12H(item.btime)}}
									<span class="timeapm" v-if="Number(item.btime.split(':')[0]) <12">AM</span>
									<span class="timeapm" v-else>PM</span>
								</text>
								<uni-icons type="right" size="20" color="#989898"></uni-icons>
							</view> -->
							
						</view>
						<view style="width: 45vw;">
							<Insidepicker :is24system="is24hour" @confirm="confirm" :value="item.btime" :tIndex="1"></Insidepicker>
						</view>
					</view>
					<!-- <view @click="showPicker(2)"> -->
					<view class="content" style="padding: 0;">
						<view>
							<view style="text-align: center;">
								{{$t('end-time')}}
							</view>
							<!-- <view style="display: flex;align-items: center;">
								<text style="color:#989898;" v-if="is24hour">{{item.etime}}</text>
								<text style="color:#989898;" v-else>
									{{change12H(item.etime)}}
									<span class="timeapm" v-if="Number(item.etime.split(':')[0]) <12">AM</span>
									<span class="timeapm" v-else>PM</span>
								</text>
								<uni-icons type="right" size="20" color="#989898"></uni-icons>
							</view> -->
						</view>
						<view style="width: 45vw;">
							<Insidepicker :is24system="is24hour" @confirm="confirm" :value="item.etime" :tIndex="2"></Insidepicker>
						</view>
					</view>
					</view>
			</view>
			<view class="modeList">
				<view class="title">{{$t('hz-setting')}}</view>
				<view class="flex" style="margin-top: 20rpx;position: relative;">
					<div class="middleline"></div>
					<!-- <view @click="showPicker2(1)"> -->
					<view style="width: 45vw;">
						<view class="pad16">
							<view style="text-align: center;">
								{{$t('spray-work-time')}}
							</view>
							<!-- <view style="display: flex;align-items: center;">
								<text style="color:#989898;">{{item.wtimes}}</text>
								<uni-icons type="right" size="20" color="#989898"></uni-icons>
							</view> -->
						</view>
						<view>
							 <picker-view indicator-style="height:40px;" :value="[selValue]" @change="confirm2($event,1)" class="picker-view" v-if="secondList.length>0">
								<picker-view-column>
									<view class="picker-list-item" v-for="(item,index) in secondList" :key="index">{{item.val}}</view>
								</picker-view-column>
							</picker-view>
						</view>
					</view>
					<!-- <view @click="showPicker2(2)"> -->
					<view style="width: 45vw;">
					<view class="pad16">
						<view style="text-align: center;">
							{{$t('spray-pause-time')}}
						</view>
						<!-- <view style="display: flex;align-items: center;">
							<text style="color:#989898;">{{item.ptimes}}</text>
							<uni-icons type="right" size="20" color="#989898"></uni-icons>
						</view> -->
					</view>
					<view>
						 <picker-view indicator-style="height:40px;" :value="[selValue1]" @change="confirm2($event,2)" class="picker-view" v-if="pauseList.length>0">
							<picker-view-column>
								<view class="picker-list-item" v-for="(item,index) in pauseList" :key="index">{{item.val}}</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
				</view>
			</view>
			<!-- <view style="text-align: center;margin-top: 80rpx;">
				<image :src="item.selected == true? '../../../static/switch.png':'../../../static/switch1.png'"
					mode="heightFix" style="height:120rpx;" @click="handleControl"></image>
			</view> -->
			<!-- <xp-picker ref="picker" actionPosition="top" mode="hi" @confirm="confirm" v-model="currTime">
				<view></view>
			</xp-picker> -->
			
		</view>
		<Hmpicker ref="picker" actionPosition="top" :is24system="is24hour" @confirm="confirm" v-model="currTime"></Hmpicker>
		<Mypicker :list="secondList"  @myselect="confirm2" searchKey='val' :title="pickTit" :showSearch="false" :currentSel="selValue" ref="picker2"></Mypicker>
		<Mypicker :list="pauseList"  @myselect="confirm2" searchKey='val' :title="pickTit" :showSearch="false" :currentSel="selValue" ref="picker1"></Mypicker>
	</view>
</template>

<script>
	import {
		queryProductTSL,
		queryBusinessAttributes,
		batchControlDevice,
		getDeviceInfo,
		queryDeviceInfo,
		deviceWriteDps
	} from '../../../api/devices.js'
	import { hexToAscii, asciiToHex } from '@/utils/common.js'
	import Mypicker from '@/components/my-picker/index.vue'
	import Hmpicker from '@/components/hm-picker/index.vue'
	import Insidepicker from '@/components/inside-picker/index.vue'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			Mypicker,
			Hmpicker,
			Insidepicker
		},
		data() {
			return {
				title: '',
				pickTit:this.$t('tit-select-s'),
				item: {},
				selTimeIndex: '',
				selTimesIndex: '',
				currTime: '',
				currTimes: 0,
				totalWeeks: [this.$t('com.mon'),this.$t('com.tue'),this.$t('com.wed'),this.$t('com.thur'),this.$t('com.fri'),this.$t('com.sat'),this.$t('com.sun')],
				selIndex: 0,
				devicemsg: {}, //设备信息：pk，dk,
				isChanged:false,
				showp: false, //控制组件延时显示
				secondList:[], //香薰工作时间
				pauseList:[], //香薰暂停时间
				selValue:0,
				selValue1:0,
				platform: uni.getStorageSync('platform'),
				initX: 0, //记录开始滑动的x值，滑动结束的时候判断向左向右
				timeDiff: 0 //开始滑动到滑动结束的时间差
			}
		},
		onLoad(e) {
			this.devicemsg = e;
			this.item = JSON.parse(e.itemStr);
			this.title = '';
			this.selIndex = e.index;
			this.$store.commit('SET_MARK','work_list')
			console.log('暂停最小值',this.pauseTimeMin);
			console.log('暂停最大值',this.pauseTimeMax);
			console.log('工作最小值',this.workTimeMin);
			console.log('工作最大值',this.workTimeMax);
			console.log('步长',this.workStep);
			let pauseCount = ((this.pauseTimeMax - this.pauseTimeMin)/this.workStep).toFixed(0)
			let workCount = ((this.workTimeMax - this.workTimeMin)/this.workStep).toFixed(0)
			for(let i=0;i<=pauseCount;i++){
				let value = this.pauseTimeMin+this.workStep*i
				if(value >= this.pauseTimeMin){
					if(value >= this.pauseTimeMax){
						this.pauseList.push({id: i,val:this.pauseTimeMax.toString()});
					}else{
						this.pauseList.push({id: i,val:value.toString()});
					}
				}
			}
			for(let i=0;i<=workCount;i++){
				let value = this.workTimeMin+this.workStep*i
				if(value >= this.workTimeMin){
					if(value >= this.workTimeMax){
						this.secondList.push({id: i,val:this.workTimeMax.toString()});
					}else{
						this.secondList.push({id: i,val:value.toString()});
					}
				}
			}
			console.log('香薰工作时间',this.secondList);
			console.log('香薰暂停时间',this.pauseList);
			this.selValue = this.getArrayIndex(this.item.wtimes);
			this.selValue1 = this.getArrayIndex(this.item.ptimes);
			// for (let i = this.pauseTimeMin; i <= this.pauseTimeMax; i++) {
			// 	if(i%this.workStep == 0){
			// 		this.pauseList.push({id:this.pauseList.length + 1,val:i.toString()});
			// 	}
			// }
			// for(let i = this.workTimeMin; i <= this.workTimeMax; i++){
			// 	if(i>=15&&i%this.workStep == 0){
			// 		this.secondList.push({id:this.secondList.length + 1,val:i.toString()});
			// 	}
			// }
			// 香薰工作/暂停时间为5-900秒，步长为5
			// for (let i = 5; i <= 500; i++) {
			// 	if(i%5 == 0){
			// 		this.secondList.push({id:this.secondList.length + 1,val:i.toString()});
			// 	}
			// 	if(i>=15&&i%5 == 0){
			// 		this.pauseList.push({id:this.pauseList.length + 1,val:i.toString()});
			// 	}
			// }
		},
		onShow() {

		},
		computed: {
			...mapGetters(['pauseTimeMin','pauseTimeMax','workTimeMin','workTimeMax','workStep']),
			is24hour(){
				let flag 
				 if(this.$store.state.device.is24hour==1){
					 flag = true
				 }else{
					 flag = false
				 }
				return flag
			}
		},
		onBackPress(options) {
			console.log(options);
			// if(this.isChanged){
			// 	this.handleData();
			// }
		},
		onUnload() {
			console.log('我被触发了');
		},
		methods: {
			change12H(time){
				const Hours = time.split(':')[0]
				let newHour = Hours<=12? Hours: (Number(Hours)-12).toString().padStart(2,'0')
				if(newHour == 0){
					newHour = '12' //凌晨12点
				}
				return newHour+':'+time.split(':')[1]
			},
			touchscreen(e){
				if(this.platform == 'android'){
					
				}else{
					console.log('开始滑动屏幕',e);
					this.initX = e.touches[0].clientX
					this.timeDiff = new Date().getTime()
				}
			},
			touchEndscreen(e){
				if(this.platform == 'android'){
					
				}else{
					console.log('结束滑动屏幕',e);
					let direction = e.changedTouches[0].clientX*1 - this.initX*1
					console.log(direction);
					let newTime = new Date().getTime()
					let slideTime = newTime-this.timeDiff //滑动时间
					console.log('滑动了'+slideTime+'ms');
					if(direction>0){
						console.log('向右滑动');
						if(slideTime > 70){
							if(this.isChanged){
								console.log('我被执行了');
								this.handleData();
							}
						}
					}else{
						console.log('向左边滑动');
					}
				}
			},
			showPicker(type) {
				switch (type) {
					case 1:
						this.currTime = this.item.btime
						break;
					case 2:
						this.currTime = this.item.etime
						break;
					default:
						break;
				}
				setTimeout(() => {
					this.$refs.picker.show()
				}, 100);

				this.selTimeIndex = type;
			},
			confirm(e,selTimeIndex) {
				console.log(e);
				console.log(selTimeIndex);
				const { value } = e
				// switch (this.selTimeIndex) {
				switch (selTimeIndex) {
					case 1:
						if(value>this.item.etime){
							uni.showToast({
								title: this.$t("stime-greater-etime"),
								icon: 'none'
							})
							return false
						}else{
							this.item.btime = value;
						}
						break;
					case 2:
						if(value<this.item.btime){
							uni.showToast({
								title: this.$t("stime-greater-etime"),
								icon: 'none'
							})
							return false
						}else{
							this.item.etime = value;
						}
						break;
					default:
						break;
				}
				
				this.setData(this.item);
			},
			getArrayIndex(times){
				let idx = 0;
				for (let i = 0; i < this.secondList.length; i++) {
					if(times == parseInt(this.secondList[i].val)){
						idx = i;
						break;
					}
				}
				
				return idx;
			},
			getArrayIndex2(times){
				let idx = 0;
				for (let i = 0; i < this.pauseList.length; i++) {
					if(times == parseInt(this.pauseList[i].val)){
						idx = i;
						break;
					}
				}
				
				return idx;
			},
			showPicker2(type) {
				switch (type) {
					case 1:
						this.selValue = this.getArrayIndex(this.item.wtimes);
						this.$refs.picker2.setSelValue(this.selValue);
						setTimeout(() => {
							this.$refs.picker2.showpop()
						}, 100)
						break;
					case 2:
						this.selValue = this.getArrayIndex2(this.item.ptimes);
						this.$refs.picker1.setSelValue(this.selValue);
						setTimeout(() => {
							this.$refs.picker1.showpop()
						}, 100)
						break;
					default:
						break;
				}
				this.showp = true
				this.selTimesIndex = type;
			},
			confirm2(e,selTimesIndex) {
				console.log(e);
				// console.log(selTimesIndex);
				const idx = e.detail.value[0]
				let eve
				switch (selTimesIndex) {
					case 1:
						// this.item.wtimes = parseInt(e.val)
						eve = this.secondList[idx]
						console.log(eve);
						this.selValue = idx
						this.item.wtimes = parseInt(eve.val)
						break;
					case 2:
						// this.item.ptimes = parseInt(e.val)
						eve = this.pauseList[idx]
						this.selValue1 = idx
						this.item.ptimes = parseInt(eve.val)
						break;
					default:
						break;
				}

				this.setData(this.item);
			},
			getMinuteSencodTime(times) {
				let t = parseInt(times);
				let minuteTime = parseInt(t / 60);
				let secondTime = parseInt(t % 60);

				const ts = (minuteTime.toString().length == 1 ? '0' + minuteTime.toString() : minuteTime.toString()) +
					':' + (secondTime.toString().length == 1 ? '0' + secondTime.toString() : secondTime.toString())

				return ts;
			},
			getSenconds(value) {
				let minuteTimes = value.split(':')[0];
				let secondTimes = value.split(':')[1];

				let totalSenconds = parseInt(minuteTimes) * 60 + parseInt(secondTimes);

				let ts = totalSenconds.toString();

				return totalSenconds;
			},
			onCheckWeek(value) {
				let arr = this.item.weeks;
				if (this.isInArray(arr, value)) {
					let newSet = new Set(arr);
					newSet.delete(value);
					let newArr = [...newSet];
					this.item.weeks = newArr;
				} else {
					arr.push(value);
					const that = this;
					let newArr = arr.sort(function(a, b) {
						var order = [that.$t('com.mon'),that.$t('com.tue'),that.$t('com.wed'),that.$t('com.thur'),that.$t('com.fri'),that.$t('com.sat'),that.$t('com.sun')];
						return order.indexOf(a) - order.indexOf(b);
					});

					this.item.weeks = newArr;

				}

				this.setData(this.item);

			},
			handleControl() {
				let type = 'switch';
				this.item.selected = !this.item.selected;
				this.setData(this.item);
			},
			isInArray(item, val) {
				for (let i = 0; i < item.length; i++) {
					if (item[i] == val) {
						return true;
					}
				}

				return false;
			},
			setData(item) {
				let itemList = uni.getStorageSync('workModelItem');
				itemList[this.selIndex] = item;
				uni.setStorageSync('workModelItem', itemList);
				console.log(uni.getStorageSync('workModelItem'));
				this.isChanged = true;
			},
			handleData() {
				const tCheck = this.timeCheck()
				if(!tCheck){
					uni.showToast({
						title: this.$t("stime-greater-etime"),
						icon: 'none'
					})
					return false
				}
				let itemList = uni.getStorageSync('workModelItem');
				let allBytes = [];
				for (let i = 0; i < itemList.length; i++) {
					const item = itemList[i];

					// Pl:模式标志(分别代表五个模式:0-4)
					const p1 = i;
					// P2:为该模式工作日b0~b6表示周一至周日
					const p2 = this.weekToByte(item.weeks);
					//P3,P4: 起始时间、小时分钟
					const p3 = parseInt(item.btime.split(':')[0]);
					const p4 = parseInt(item.btime.split(':')[1]);
					//P5,P6: 结束时间、小时分钟:
					const p5 = parseInt(item.etime.split(':')[0]);
					const p6 = parseInt(item.etime.split(':')[1]);
					console.log(p3+':'+p4+':'+p5+':'+p6);
				
					
					//P7: 控制开关0关闭，1打开
					const p7 = (item.selected == true ? 1 : 0);
		
					//P8，P9:工作时间，P8低八位，P9是高八位
					const bytes = this.getLowHighBytes(parseInt(item.wtimes));
					const p8 = bytes[1];
					const p9 = bytes[0];
					//P10,P11:停止时间，P10低八位，P11是高八位
					const bytes2 = this.getLowHighBytes(parseInt(item.ptimes));
					const p10 = bytes2[1];
					const p11 = bytes2[0];

					allBytes.push(p1);
					allBytes.push(p2);
					allBytes.push(p3);
					allBytes.push(p4);
					allBytes.push(p5);
					allBytes.push(p6);
					allBytes.push(p7);
					allBytes.push(p8);
					allBytes.push(p9);
					allBytes.push(p10);
					allBytes.push(p11);

				}

				var hexStr = allBytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
				console.log(hexStr);
				// const ls = this.hex2IntList(hexStr)
				// const newArr = []
				// for(let i in ls){
				// 	newArr.push({
				// 		code: 0,
				// 		dataType: '2',
				// 		id: 18,
				// 		value: ls[i]
				// 	})
				// }
				// console.log(ls);
				// this.sendOrder(newArr);
				this.sendOrder(hexStr);
				// this.sendOrder(asciiToHex(hexStr));
			},
			//校验开始结束时间
			timeCheck(){
				let flag = false
				const [bH,bM] = this.item.btime.split(':')
				const [eH,eM] = this.item.etime.split(':')
				// console.log(parseInt(bH));
				// console.log(parseInt(bM));
				// console.log(parseInt(eH));
				// console.log(parseInt(eM));
				if(parseInt(eH)>parseInt(bH)){
					flag = true
					// console.log('满足条件1');
				}else if(parseInt(eH)==parseInt(bH)){
					if(parseInt(eM)>=parseInt(bM)){
						// console.log('满足条件2');
						flag = true
					}
				}
				return flag
			},
			confirmSend(){
				this.handleData()
			},
			//16进制数据转int型
			hex2IntList(hexStr){
				// 一个int型占4个字节
				const len = Math.ceil(hexStr.length/8) //分成几个int型
				console.log(len);
				let hexlist = []
				// let hexlist2 = []
				for(let i=0; i<len; i++){
					let hexData = hexStr.substr(i*8,8)
					// hexlist2.push(hexData)
					hexlist.push(parseInt(hexData,16))
				}
				console.log(hexlist);
				// console.log(hexlist2);
				return hexlist
			},
			// 星期转八位
			weekToByte(weeks) {
				console.log(weeks);
				const mon = this.$t('com.mon');
				const tue = this.$t('com.tue');
				const wed = this.$t('com.wed');
				const thur = this.$t('com.thur');
				const fri = this.$t('com.fri');
				const sat = this.$t('com.sat');
				const sun = this.$t('com.sun');
				let bits = ['0', '0', '0', '0', '0', '0', '0', '0'];
				for (var i = 0; i < weeks.length; i++) {
					switch (weeks[i]) {
						case mon:
							bits[7] = '1';
							break;
						case tue:
							bits[6] = '1';
							break;
						case wed:
							bits[5] = '1';
							break;
						case thur:
							bits[4] = '1';
							break;
						case fri:
							bits[3] = '1';
							break;
						case sat:
							bits[2] = '1';
							break;
						case sun:
							bits[1] = '1';
							break;
						default:
							break;
					}
				}

				const bitstr = bits.join('');

				return parseInt(bitstr, 2);
			},
			// 获取数值的底高八位
			getLowHighBytes(integerValue) {
				var lowByte = integerValue & 0xFF;
				var highByte = (integerValue >> 8) & 0xFF;
				var sumOfBytes = lowByte + (highByte << 8);

				if (sumOfBytes === integerValue) {
					return [lowByte, highByte];
				} else {
					return null;
				}
			},
			sendOrder2(hexStr){
				// pk	是	pk
				// dk	是	dk
				// sendMode: 0-自动 1-wifi 3-蓝牙 
				// list:[{
				// 	dataType: "1", 	1-BOOL布尔型 2-INT整数型 3-FLOAT浮点数型 4-DOUBLE 5-ENUM 6-TEXT 7-DATE 8-STRUCT 9-ARRAY
				// 	code: 0,
				// 	id: 1,
				// 	value: JSON.parse(params.switch.switch) 
				// }]
				let para = {
					pk: this.devicemsg.productKey,
					dk: this.devicemsg.deviceKey,
					sendMode: 0,
					list:[{
						// dataType: "9",
						// code: 'work_list',
						dataType: "6",
						code: 'work_list',
						id: 18,
						value: hexStr,
					}]
				}
				deviceWriteDps(para).then(res => {
					// console.log('maintain发送指令结果：');
					this.back()
					console.log(res)
					uni.$emit('updateWM', {
						// msg: '更新工作模式...'
					})
				})
			},
			//下发指令
			sendOrder(hexStr) {
				let datas = {
					work_list: hexStr
				};

				let para = {
					type: 2,
					data: JSON.stringify([datas]),
					deviceList: [{
						productKey: this.devicemsg.productKey,
						deviceKey: this.devicemsg.deviceKey,
						gatewayDeviceKey: '',
						gatewayProductKey: '',
					}],
					cacheTime: 86400,
					dataFormat: 2,
					isCache: 1,
					isCover: 2
				}
				console.log(para);
				batchControlDevice(para).then(res => {
					this.back()
					// console.log('maintain发送指令结果：');
					console.log(res)
					uni.$emit('updateWM', {
						// msg: '更新工作模式...'
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.uni-nav-bar-text {
		font-size: 20px;
	}

	.modeLists {
		padding: 0 20rpx 20rpx;
		height: 90vh;
		
		.modeList {
			background-color: #ffffff;
			border-radius: 10rpx;
			margin-top: 20rpx;

			.title {
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;
				font-weight: bold;
				font-size: 16px;
			}

			.content {
				padding: 20rpx;

				>view {
					display: flex;
					// justify-content: space-between;
					justify-content: center;
					padding-bottom: 16rpx;
					padding-top: 16rpx;
				}

				>view:active {
					background-color: #f8f8f8;
				}

				.ct {
					color: #000;
					padding-right: 20rpx;
				}
			}
		}
	}


	.gray {
		color: #B5B5B5;
	}

	.green {
		color: #00AD8D;
	}

	.pdl10 {
		padding-left: 10rpx;
	}

	.pdr10 {
		padding-right: 10rpx;
	}

	.ctList {
		font-size: 12px;
		color: #fff;
		// background-color: #00AD8D;
		background-color: #AAAAAA;
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
	}
	.timeapm{	
		margin-left: 20rpx;
	}
	.picker-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		position: relative;
	}
	.picker-view {
		// width: 750rpx;
		width: 300rpx;
		// height: 200rpx;
		height: 15vh;
		margin-top: 20rpx;
	}
	.middleline{
		width: 2rpx;
		height: 70%;
		background-color: #eee;
		position: absolute;
		left: 46%;
		top: 50%;
		transform: translateY(-50%);
	}
	.pad16{
		padding: 16rpx 0;
	}
</style>