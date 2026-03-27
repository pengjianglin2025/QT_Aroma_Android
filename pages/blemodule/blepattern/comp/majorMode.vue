<template>
<view>
	<view class="modeLists">
		<template v-for="(item,index) in modeList">
			<view :key="index" class="modeList">
				<view class="title"  @click="handleAddModel(item,index)">{{item.pattern}}</view>
				<view style="display: flex;justify-content: space-between;">
					<view class="content"  @click="handleAddModel(item,index)">
						<view class="flex items-center" style="justify-content: flex-start;">
							<text class="ct">{{$t('com.time')}}</text>
							<text class="gray"> 
								<span v-if="is24hour">{{item.btime}}</span> 
								<span v-else>{{change12H(item.btime)}}
									<span class="timeapm" v-if="Number(item.btime.split(':')[0]) <12">AM</span>
									<span class="timeapm" v-else>PM</span>
								</span> 
							<text class="pdl10 pdr10">-
							</text>
								<span v-if="is24hour">{{item.etime}}</span> 
								<span v-else>{{change12H(item.etime)}}
									<span class="timeapm" v-if="Number(item.etime.split(':')[0]) <12">AM</span>
									<span class="timeapm" v-else>PM</span>
								</span> 
							</text>
						</view>
						<view class="flex items-center" style="justify-content: flex-start;">
							<text space="ensp">
								<text class="ct">{{$t('com.hz')}}</text>
								<text class="gray">{{$t('com.work')}}</text>
								<text class="pdl10" :style="{color: item.selected==true? '#00AD8D':'#B5B5B5'}">{{item.wtimes}}</text>
								<text class="gray"> 
									<text class="pdl10 pdr10">-</text>
									{{$t('com.pause')}}
								</text> 
								<text class="pdl10" :style="{color: item.selected==true? '#00AD8D':'#B5B5B5'}">{{item.ptimes}}</text>
							</text>
						</view>
						<view class="flex items-center" style="justify-content: flex-start;"><text class="ct">{{$t('com.week')}}</text>
							<view style="color: #00ad8d;font-size: 30rpx;" v-if="item.weeks&&item.weeks.length==7">
								<text class="ctList-every" :style="{background: item.selected? '#00AD8D':'#B5B5B5'}">{{$t("everyday")}}</text>
							</view>
							<view v-else>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.mon'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.mon')}}</text>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.tue'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.tue')}}</text>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.wed'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.wed')}}</text>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.thur'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.thur')}}</text>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.fri'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.fri')}}</text>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.sat'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.sat')}}</text>
								<text class="ctList" :style="{background: item.selected==true&&item.weeks.indexOf($t('com.sun'))>-1? '#00AD8D':'#B5B5B5'}">{{$t('com.sun')}}</text>
							</view>
						</view>
					</view>
					<view style="align-items: center;display: flex;">
						<switch style="transform: scale(0.8);margin-right: 40rpx;" :checked="item.selected" color="#00AD8D" @change="handleControl(item,index)"></switch>
					</view>
				</view>
			</view>
		</template>
	</view>
</view>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	name:'majorMode',
	props:{
		maintainPage: {
			type: String,
			default: 'maintain'
		}
	},
	data(){
		return{
			devicemsg: {}, //璁惧淇℃伅锛歱k锛宒k
			modeList: [],
		}
	},
	computed:{
		...mapGetters(['workModelHexStr','deviceId','isOffline']),
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
	watch:{
		workModelHexStr(val){
			if(val){
				this.getWorkModelList(val)
			}
		}
	},
	created() {
		this.$store.commit('SET_OFFLINE',false)
		console.log('妯″紡鍙傛暟=====',this.workModelHexStr);
		this.getWorkModelList(this.workModelHexStr) //璁板緱鏀惧紑娉ㄩ噴锛侊紒
		const that = this;
		uni.$on('updateWM', function(data) {
			console.log('receive updateWM event:', data.msg);
			console.log(data.msg);
			that.getWorkModelList(data.msg)
		})
		uni.$on('bleWorkModelUpdated', function(data) {
			if(data && data.hex){
				that.getWorkModelList(data.hex)
			}
		})
	},
	methods:{
		change12H(time){
				const Hours = time.split(':')[0]
				let newHour = Hours<=12? Hours: (Number(Hours)-12).toString().padStart(2,'0')
				if(newHour == 0){
					newHour = '12' // midnight 12:xx
				}
				return newHour+':'+time.split(':')[1]
			},
		handleControl(item,idx) {
			this.modeList[idx].selected = !this.modeList[idx].selected;
			// this.getWorkModelList();
			this.handleData()
		},
		handleAddModel(item, index) {
			// if(item.selected==false){
			// 	return false
			// }else{
				let {
					deviceKey,
					productKey,
					deviceName
				} = this.devicemsg;
				console.log(item);
				uni.navigateTo({
					url: `/pages/blemodule/blepattern/${this.maintainPage}?itemStr=${JSON.stringify(item)}&index=${index}&deviceKey=${deviceKey}&productKey=${productKey}&deviceName=${deviceName}`
				})
			// }
		},
		getWorkModelList(hexStr) {
			let modeList = [];
			const byteArr = this.hexToBytes(hexStr);
			const groupSize = byteArr.length / 11;
			for (let n = 0; n < groupSize; n++) {
				const p1 = byteArr[11 * n]; // Pl:妯″紡鏍囧織(鍒嗗埆浠ｈ〃浜斾釜妯″紡:0-4)
				const p2 = byteArr[11 * n + 1]; // P2:涓鸿妯″紡宸ヤ綔鏃0~b6琛ㄧず鍛ㄤ竴鑷冲懆鏃?
				const p3 = byteArr[11 * n + 2]; // P3,P4: 璧峰鏃堕棿銆佸皬鏃跺垎閽?
				const p4 = byteArr[11 * n + 3];
				const p5 = byteArr[11 * n + 4]; // P5,P6: 缁撴潫鏃堕棿銆佸皬鏃跺垎閽?
				const p6 = byteArr[11 * n + 5];
				const p7 = byteArr[11 * n + 6]; // P7: 鎺у埗寮€鍏?鍏抽棴锛?鎵撳紑
				const p8 = byteArr[11 * n + 7]; // P8锛孭9:宸ヤ綔鏃堕棿锛孭8浣庡叓浣嶏紝P9鏄珮鍏綅
				const p9 = byteArr[11 * n + 8];
				const p10 = byteArr[11 * n + 9]; // P10,P11:鍋滄鏃堕棿锛孭10浣庡叓浣嶏紝P11鏄珮鍏綅
				const p11 = byteArr[11 * n + 10];
	
				const model = {
					pattern: this.$t('com.pattern') + (p1 + 1).toString(),
					selected: (p7 == 1 ? true : false),
					btime: (p3.toString().length == 1 ? '0' + p3.toString() : p3.toString()) + ':' + (p4.toString()
						.length == 1 ? '0' + p4.toString() : p4.toString()),
					etime: (p5.toString().length == 1 ? '0' + p5.toString() : p5.toString()) + ':' + (p6.toString()
						.length == 1 ? '0' + p6.toString() : p6.toString()),
					wtimes: this.getIntegerValue(p9, p8),
					ptimes: this.getIntegerValue(p11, p10),
					weeks: this.binaryStrToWeeks(p2)
				}
	
				modeList.push(model);
			}
	
			console.log(modeList);
			uni.setStorageSync('workModelItem', modeList);
	
			this.modeList = modeList;
		},
		handleData() {
			let itemList = this.modeList
			console.log(itemList);
			let allBytes = [];
			for (let i = 0; i < itemList.length; i++) {
				const item = itemList[i];
		
				// Pl:妯″紡鏍囧織(鍒嗗埆浠ｈ〃浜斾釜妯″紡:0-4)
				const p1 = i;
				// P2:涓鸿妯″紡宸ヤ綔鏃0~b6琛ㄧず鍛ㄤ竴鑷冲懆鏃?
				const p2 = this.weekToByte(item.weeks);
				//P3,P4: 璧峰鏃堕棿銆佸皬鏃跺垎閽?
				const p3 = parseInt(item.btime.split(':')[0]);
				const p4 = parseInt(item.btime.split(':')[1]);
				//P5,P6: 缁撴潫鏃堕棿銆佸皬鏃跺垎閽?
				const p5 = parseInt(item.etime.split(':')[0]);
				const p6 = parseInt(item.etime.split(':')[1]);
				console.log(p3+':'+p4+':'+p5+':'+p6);
			
				
				//P7: 鎺у埗寮€鍏?鍏抽棴锛?鎵撳紑
				const p7 = (item.selected == true ? 1 : 0);
				
				//P8锛孭9:宸ヤ綔鏃堕棿锛孭8浣庡叓浣嶏紝P9鏄珮鍏綅
				const bytes = this.getLowHighBytes(parseInt(item.wtimes));
				const p8 = bytes[1];
				const p9 = bytes[0];
				//P10,P11:鍋滄鏃堕棿锛孭10浣庡叓浣嶏紝P11鏄珮鍏綅
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
			console.log('deviceId', this.deviceId);
			console.log('device data', data);
			getApp().writeData(this.deviceId,data);
			this.$store.commit('SET_MOMDELSTR',hexStr)
		},
		// 鑾峰彇鏁板€肩殑搴曢珮鍏綅
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
		// 鏄熸湡杞叓浣?
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
		// 鍗佸叚杩涘埗杞琤yte鏁扮粍
		hexToBytes(hex) {
			let bytes = [];
			for (let i = 0; i < hex.length; i += 2) {
				bytes.push(parseInt(hex.substr(i, 2), 16));
			}
			return bytes;
		},
		// 浣庨珮鍏綅杞暟鍊?
		getIntegerValue(lowByte, highByte) {
			const integerValue = (highByte << 8) | lowByte;
			return integerValue;
		},
		// 鏁板€艰浆浜岃繘鍒跺叓浣?
		decimalToBinary8(decimal) {
			let binary = (decimal >>> 0).toString(2);
			while (binary.length < 8) {
				binary = "0" + binary;
			}
			return binary;
		},
		// 浜岃繘鍒跺瓧绗︿覆杞槦鏈?
		binaryStrToWeeks(decimal) {
			const binaryStr = this.decimalToBinary8(decimal);
			console.log(binaryStr);
			const arr = binaryStr.split('');
			let weeks = [];
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] == '1') {
					switch (i) {
						case 7:
							weeks.push(this.$t('com.mon'));
							break;
						case 6:
							weeks.push(this.$t('com.tue'));
							break;
						case 5:
							weeks.push(this.$t('com.wed'));
							break;
						case 4:
							weeks.push(this.$t('com.thur'));
							break;
						case 3:
							weeks.push(this.$t('com.fri'));
							break;
						case 2:
							weeks.push(this.$t('com.sat'));
							break;
						case 1:
							weeks.push(this.$t('com.sun'));
							break;
						default:
							break;
					}
				}
	
			}
	
			return weeks.reverse();
		}
		
	}
}
</script>

<style scoped lang="scss">
	.modeLists {
		// padding: 0 20rpx 20rpx;
	
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
				width: 85%;
				padding: 20rpx;
				text-align: left;
	
				>view:not(:first-child) {
					margin-top: 20rpx;
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
		font-size: 9px;
		color: #fff;
		// background-color: #00AD8D;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
	}
	.ctList-every{
		font-size: 9px;
		color: #fff;
		background-color: #00AD8D;
		border-radius: 10rpx;
		display: inline-block;
		padding: 10rpx 20rpx;
	}
	
	.action-btn {
		// position:fixed;
		// bottom: 40rpx;
		// left: 0;
		// width: 100%;
		padding: 40rpx;
	
		.login-btn {
			height: 45px;
			background-color: #01CBA5;
			color: #ffffff;
			border-radius: 10px;
		}
	}
	.timeapm{
		margin-left: 10rpx;
	}
</style>

