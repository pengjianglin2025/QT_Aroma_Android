<template>
	<view>
		<!-- <uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" :title="title" @clickLeft="back"> -->
		<uni-nav-bar fixed="true" :border="false" status-bar :title="title">
			<template v-slot:left>
				<view class="flex items-center" @click="back">
					<image style="width: 20rpx;" src="/static/back.png" mode="widthFix"></image>
					<text style="font-size: 26rpx;margin-left: 20rpx;">{{$t("com.cancel")}}</text>
				</view>
			</template>
			<template v-slot:right>
				<view class="flex items-center" @click="setData(item)">
					<text style="font-size: 26rpx;margin-left: 20rpx;">{{$t("com.confirm")}}</text>
				</view>
			</template>
		</uni-nav-bar>
		<view class="modeLists">
			<view class="modeList">
				<view class="title">模式选择</view>
				<view class="content flex radio-btn-group">
					<div class="radio-btn" :style="{backgroundColor: modeFlag==0? '#00bd54':'#F0F0F0',color: modeFlag==0? '#fff':'#000'}" @click="changeMode(0)">简易模式</div>
					<div class="radio-btn" :style="{marginLeft: '30rpx',backgroundColor: modeFlag==1? '#00bd54':'#F0F0F0',color: modeFlag==1? '#fff':'#000'}" @click="changeMode(1)">专业模式</div>
				</view>
			</view>
			<view v-if="modeFlag==1">
				<MajorMode></MajorMode>
			</view>
			<view v-if="modeFlag==0">
			<!-- 简易模式的时间设置 -->
			<view class="modeList">
				<view class="title time-title">
					<view>定时设置</view>
					<!-- <view style="font-weight: normal;color: #a3a3a3;font-size: 26rpx;">剩余时间：05:11</view> -->
				</view>
				<view class="flex" style="position: relative;">
					<div class="middleline" style="left: 47%;"></div>
					<view class="content" style="padding: 0;">
						<view>
							<view>
								小时
							</view>
						</view>
						<view style="width: 45vw;">
							<picker-view :indicator-style="indicatorStyle" :value="hvalue" @change="setTiming($event,1)" class="picker-view">
								<picker-view-column>
									<view class="item" v-for="(item,index) in hList" :key="index">{{item.toString().padStart(2,'0')}}</view>
								</picker-view-column>
							</picker-view>
						</view>
					</view>
					<view class="content" style="padding: 0;">
						<view>
							<view>
								分钟
							</view>
						</view>
						<view style="width: 45vw;">
							<picker-view :indicator-style="indicatorStyle" :value="mvalue" @change="setTiming($event,2)" class="picker-view">
								<picker-view-column>
									<view class="item" v-for="(item,index) in mList" :key="index">{{item.toString().padStart(2,'0')}}</view>
								</picker-view-column>
							</picker-view>
						</view>
					</view>
				</view>
			</view>
			<view class="modeList">
				<view class="title">挡位设置</view>
				<view class="content flex radio-btn-group">
					<div class="radio-btn" v-for="(item,idx) in gearList" :style="{marginLeft: idx%5==0? '0':'30rpx',marginTop: idx>4? '20rpx':'0',backgroundColor: idx==gearIdx? '#00bd54':'#F0F0F0',color: idx==gearIdx? '#fff':'#000'}" @click="changeGear(idx)">{{item}}</div>
				</view>
			</view>
			</view>
			<Hmpicker ref="picker" actionPosition="top" :is24system="is24hour" @confirm="confirm" v-model="currTime"></Hmpicker>
		</view>
		<view class="disV" v-if="isOffline">
			<view>
				<view>{{$t('notconnect-tip')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Mypicker from '@/components/my-picker/index.vue'
	import Hmpicker from '@/components/hm-picker/index.vue'
	import Insidepicker from '@/components/inside-picker/index.vue'
	import { mapGetters } from 'vuex'
	import MajorMode from './comp/majorMode.vue'
	export default {
		components: {
			Mypicker,
			Hmpicker,
			Insidepicker,
			MajorMode
		},
		data() {
			return {
				title: this.$t('add-pattern'),
				item: {},
				selTimeIndex: '',
				currTime: '',
				selIndex: 0,
				devicemsg: {}, //设备信息：pk，dk,
				isChanged:false,
				modeFlag: 1,//0：简单模式；1：专业模式 
				indicatorStyle: `height: 50px;`,
				hList:[0,1,2,3,4,5,6], //小时数组
				mList:[0,30], //分钟数组
				gearList: [1,2,3,4,5],// 挡位列表
				gearIdx: 1,
				hvalue: [0],
				mvalue: [1],
				curTime: 90,//简易模式 设置的定时时间（机器获取，单位:min）
			}
		},
		computed: {
			...mapGetters(['deviceId','isOffline','parameterMode','gearNum','simpleMode','curGear']),
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
		onLoad(e) {
			console.log(e);
			// this.devicemsg = e;
			// this.item = JSON.parse(e.itemStr);
			// console.log(this.item);
			// this.title = this.item.pattern;
			this.modeFlag = this.parameterMode
			this.selIndex = e.index;
			this.curTime = this.simpleMode
			console.log('简易模式时间',this.curTime);
			this.gearIdx = 1*this.curGear-1
			// if(this.modeFlag==0) this.initTime()
			this.initTime()
			if(this.gearNum){
				let gList = []
				for(let i=1; i<=this.gearNum; i++){
					gList.push(i)
				}
				this.gearList = gList
			}
		},
		onShow() {
			console.log(this.is24hour);
		},
		methods: {
			//初始化定时（简易模式）
			initTime(){
				// this.curTime
				const h = Math.floor(this.curTime/60)
				const m = this.curTime%60
				if(m*1!=30 && m*1!=0){
					return false
				}
				const hIdx = this.hList.findIndex(ite=>ite===h)
				const mIdx = this.mList.findIndex(ite=>ite===m)
				this.hvalue = [hIdx]
				this.mvalue = [mIdx]
			},
			//设置定时，时和分
			setTiming(e,idx){
				const { value } = e.detail
				// console.log(e);
				// console.log(value);
				if(idx == 1){
					// 时
					this.hvalue = value
				}else if(idx == 2){
					// 分
					this.mvalue = value
				}
				const h = this.hList[this.hvalue]
				const m = this.mList[this.mvalue]
				const time = h*60+m*1
				this.curTime = time
				console.log(this.hvalue);
				console.log(this.mvalue);
				console.log(time);
			},
			//切换模式
			changeMode(num){
				console.log(num);
				this.modeFlag = num
				this.$store.commit('SET_PARAMETERMODE',num)
			},
			//简易模式切换挡位
			changeGear(num){
				console.log(num);
				// this.gearIdx = this.gearList[num]
				this.gearIdx = num
			},
			confirm(e,selTimeIndex) {
				const { value } = e
				// console.log(value);
				switch (selTimeIndex) {
					case 1:
						this.item.btime = value;
						break;
					case 2:
						this.item.etime = value;
						break;
					default:
						break;
				}
				// console.log(this.item);
				// this.setData(this.item);
			},
			setData(item) {
				const modeHex = Number(this.modeFlag).toString(16).padStart(2,'0')
				this.$store.commit('SET_PARAMETERMODE',this.modeFlag)
				const modedata = getApp().dataHexStr('19','01',modeHex)
				console.log(modedata);
				getApp().writeData(this.deviceId,modedata);
				if(this.modeFlag == 0){
					setTimeout(()=>{
						console.log(this.curTime);
						const timeHex = Number(this.curTime).toString(16).padStart(4,'0')
						this.$store.commit('SET_SIMPLEMODE',this.curTime)
						console.log(timeHex);
						console.log(this.gearList);
						console.log(this.gearIdx);
						const gear = Number(this.gearList[this.gearIdx]).toString(16).padStart(2,'0')
						this.$store.commit('SET_CURGEAR',this.gearList[this.gearIdx])
						console.log(gear);
						const sendHex = timeHex+gear
						console.log(sendHex);
						let data = getApp().dataHexStr('1B','00',sendHex)
						getApp().writeData(this.deviceId,data);
					},500)
				}
				setTimeout(()=>{
					uni.navigateBack()
				},1500)
			},
			//校验开始结束时间
			timeCheck(){
				let flag = false
				console.log(this.item.btime);
				console.log(this.item.etime);
				const [bH,bM] = this.item.btime.split(':')
				const [eH,eM] = this.item.etime.split(':')
				console.log(parseInt(bH));
				console.log(parseInt(bM));
				console.log(parseInt(eH));
				console.log(parseInt(eM));
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
			handleData() {
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
				let data = getApp().dataHexStr('12','00',hexStr)
				getApp().writeData(this.deviceId,data);
				this.$store.commit('SET_MOMDELSTR',hexStr)
				uni.$emit('updateWM', {
					// msg: '更新工作模式...'
					msg: hexStr
				})
				uni.navigateBack()
			},
			// 星期转八位
			weekToByte(weeks) {
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
			}
		}
	}
</script>

<style lang="scss">
	.uni-nav-bar-text {
		font-size: 20px;
	}

	.modeLists {
		padding: 0 20rpx 20rpx;

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
		font-size: 14px;
		color: #fff;
		// background-color: #00AD8D;
		background-color: #F0F0F0;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
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
		
		.item {
			line-height: 100rpx;
			text-align: center;
		}
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
	
	.radio-btn-group{
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		flex-wrap: wrap;
		// :not(:first-child){
		// 	margin-left: 30rpx;
		// }
		
		.radio-btn{
			padding: 20rpx 40rpx;
			background-color: #F0F0F0;
			color: #fff;
			border-radius: 18rpx;
			font-size: 28rpx;
			// margin-left: 30rpx;
		}
	}
	.time-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>