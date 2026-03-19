<template>
	<view>
		<view class="modeLists">
			<template v-for="(item,index) in modeList">
				<view :key="index" class="modeList">
					<view class="title"  @click="handleAddModel(item,index)">{{item.pattern}}</view>
					<view style="display: flex;justify-content: space-between;">
						<view class="content"  @click="handleAddModel(item,index)">
							<view>
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
							<view>
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
							<view><text class="ct">{{$t('com.week')}}</text>
								<!-- <template v-for="(item2,index2) in item.weeks">
									<text :key="index2" class="ctList" :style="{background: item.selected==true? '#00AD8D':'#B5B5B5'}">{{item2}}</text>

								</template> -->
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
							<!-- <image :src="item.selected == true?'../../../static/on-btn.png':'../../../static/off-btn.png'" mode="widthFix" style="width:76rpx;" class="img2"></image> -->
							<switch style="transform: scale(0.8);margin-right: 40rpx;" :checked="item.selected" color="#00AD8D" @change="handleControl(item,index)"></switch>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view class="disV" v-if="isOffline">
			<view>
				<view>{{$t('notconnect-tip')}}</view>
			</view>
		</view>
		<!-- 	<view class="action-btn">
			<button @click="handleAddModel" class="login-btn cu-btn block lg">添加</button>
		</view> -->
	</view>
</template>

<script>
	import {
		queryProductTSL,
		queryBusinessAttributes,
		batchControlDevice,
		getDeviceInfo,
		queryDeviceInfo
	} from '../../../api/devices.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				devicemsg: {}, //设备信息：pk，dk
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
			workModelHexStr(newVal){
				console.log('我监听到变化了',newVal);
				this.getWorkModelList(newVal)
			}
		},
		onPullDownRefresh(e) {
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(e) {
			console.log(this.workModelHexStr);
			this.getWorkModelList(this.workModelHexStr) //记得放开注释
			// this.getWorkModelList('001F0800160001000A0005017F0D000F0001000A0078027F0000000001000A0078037F0000000001000A0078047F0000000001000A0078') //记得要注释！！
			// this.devicemsg = e;
			// this.getBusinessAttributes();
			const that = this;
			// uni.$off('updateWM');
			uni.$on('updateWM', function(data) {
				console.log('监听到事件来自 updateWM ，携带参数 msg 为：' + data.msg);
				// that.getBusinessAttributes();
				console.log(data.msg);
				that.getWorkModelList(data.msg)
			})
		},
		onShow() {},
		methods: {
			change12H(time){
				const Hours = time.split(':')[0]
				let newHour = Hours<=12? Hours: (Number(Hours)-12).toString().padStart(2,'0')
				if(newHour == 0){
					newHour = '12' //凌晨12点
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
						url: `/pages/blemodule/blepattern/maintain?itemStr=${JSON.stringify(item)}&index=${index}&deviceKey=${deviceKey}&productKey=${productKey}&deviceName=${deviceName}`
					})
				// }
			},
			//查询设备业务属性
			getBusinessAttributes() {
				console.log('查询设备业务属性...')
				let para = {
					pk: this.devicemsg.productKey,
					dk: this.devicemsg.deviceKey,
					typeList: ['2']
				}

				const that = this;
				uni.showLoading({
					title: that.$t('getting-data'),
					mask: true
				});
				setTimeout(() => {
					queryBusinessAttributes(para).then(res => {
						let datalist = JSON.parse(res.data).data.customizeTslInfo
						const hexStr = this.getWorkListValue(datalist);
						that.getWorkModelList(hexStr);
						uni.hideLoading();
					})
				}, 5000);


			},
			getWorkListValue(datalist) {
				var hexStr = '';
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'work_list') {
						hexStr = datalist[i].resourceValce;
						break;
					}
				}

				return hexStr;
			},
			getWorkModelList(hexStr) {
				let modeList = [];
				const byteArr = this.hexToBytes(hexStr);
				const groupSize = byteArr.length / 11;
				for (let n = 0; n < groupSize; n++) {
					const p1 = byteArr[11 * n]; // Pl:模式标志(分别代表五个模式:0-4)
					const p2 = byteArr[11 * n + 1]; // P2:为该模式工作日b0~b6表示周一至周日
					const p3 = byteArr[11 * n + 2]; // P3,P4: 起始时间、小时分钟
					const p4 = byteArr[11 * n + 3];
					const p5 = byteArr[11 * n + 4]; // P5,P6: 结束时间、小时分钟
					const p6 = byteArr[11 * n + 5];
					const p7 = byteArr[11 * n + 6]; // P7: 控制开关0关闭，1打开
					const p8 = byteArr[11 * n + 7]; // P8，P9:工作时间，P8低八位，P9是高八位
					const p9 = byteArr[11 * n + 8];
					const p10 = byteArr[11 * n + 9]; // P10,P11:停止时间，P10低八位，P11是高八位
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
				console.log('设备ID',this.deviceId);
				console.log('设备数据',data);
				getApp().writeData(this.deviceId,data);
				this.$store.commit('SET_MOMDELSTR',hexStr)
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
			// 十六进制转byte数组
			hexToBytes(hex) {
				let bytes = [];
				for (let i = 0; i < hex.length; i += 2) {
					bytes.push(parseInt(hex.substr(i, 2), 16));
				}
				return bytes;
			},
			// 低高八位转数值
			getIntegerValue(lowByte, highByte) {
				const integerValue = (highByte << 8) | lowByte;
				return integerValue;
			},
			// 数值转二进制八位
			decimalToBinary8(decimal) {
				let binary = (decimal >>> 0).toString(2);
				while (binary.length < 8) {
					binary = "0" + binary;
				}
				return binary;
			},
			// 二进制字符串转星期
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
			},
			getIt() {
				console.log('bad word');
			}
		}
	}
</script>

<style lang="scss">
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
				width: 85%;
				padding: 20rpx;

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