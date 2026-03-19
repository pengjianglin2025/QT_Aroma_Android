<template>
	<view>
		<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" right-icon="gear" :title="deviceName" @clickLeft="back" @clickRight="navitoSet" />
		<view v-if="warring" class="no-oil">
			<!-- 缺油 -->{{$t('com.starvation')}}
		</view>
		<view class="ttip" v-if="funEntity.oilState != 0">
			<text>{{$t('estimated-use-time')}}: {{oilEntity.useDay}} {{$t('com.day')}} </text>
			<!-- <text> | 工作:{{entity.workSec}}s</text>
			<text> | 暂停:{{entity.pauseSec}} ></text> -->
		</view>
		<view class="ttip2" v-if="funEntity.oilState != 0">
			<text>{{$t('last-boot-time')}}:{{entity.lastOpenTime}}</text>
		</view>
		<view class="timg">
			<image src="../../../static/circle-style.png" mode="heightFix" style="height:340rpx;"></image>
			<view class="tcon"><text style="font-size: 40px;">{{oilEntity.remain}}</text>
				<text style="padding-top: 30rpx;">ML</text>
			</view>
		</view>
		<view class="oilV">
			<view>
				<uni-row>
					<uni-col :span="6">
						<view class="oilItem" @click="openOCPopup()">
							<view>{{$t('oil-capacity')}}</view>
							<view class="o2"><text class="oilTxt">{{oilEntity.capacity}}</text>ML</view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem" @click="openCAPPopup()">
							<view>{{$t('surplus-capacity')}}</view>
							<view class="o2"><text class="oilTxt">{{oilEntity.remain}}</text>ML</view>
							<view class="lineV"></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem"  @click="openConsumePopup()">
							<view>{{$t('com.qtrip')}}</view>
							<view class="o2"><text class="oilTxt">{{(oilEntity.realityConsumption/10).toFixed(1)}}</text>ML/H</view>
							<view class="lineV"></view>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="oilItem">
							<view>{{$t('com.signal')}}</view>
							<view>
								<!-- <image :src="deviceModel.onlineStatus == 1?'../../../static/signa3.png':'../../../static/signa4.png'"	mode="aspectFit" style="width: 40rpx;height:40rpx;"></image> -->
								<image v-if="devicemsg.signalStrength>-60" src="@/static/signa3.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
								<image v-else-if="devicemsg.signalStrength<-60 && devicemsg.signalStrength>-85" src="@/static/signa2.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
								<image v-else-if="devicemsg.signalStrength<-85" src="@/static/signa1.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
								<image v-else src="@/static/signa4.png" mode="aspectFit" style="width: 40rpx;height:40rpx;"></image>
							</view>
							<view class="lineV"></view>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
		<view class="tmV">
			<view>
				<view style="width:calc(50% - 10rpx);float: left;" @click="toWorkModel()">
					<view>
						<view>{{typeEntity.workModel}}</view>
						<view>{{$t('work-pattern')}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<image src="../../../static/time.png" mode="heightFix" style="height:50rpx;"></image>
					</view>
				</view>

				<view style="width:calc(50% - 10rpx);float: right;" @click="openOTPopup()">
					<view>
						<view>{{$t('oil-type')}}</view>
						<view>{{typeEntity.oilType}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<image src="../../../static/oil.png" mode="heightFix" style="height:50rpx;"></image>
					</view>
				</view>
			</view>
			<view style="clear: both;"></view>
		</view>
		<view class="conV">
			<uni-row>
				<uni-col :span="8" v-if="funEntity.fanValue != 0">
					<view class="funList">
						<view :style="selEntity.fanSelected == true?'background-color:#0BC173':''"
							@click="handleSelectedIndex(1)">
							<view>
								<view>
									<image
										:src="selEntity.fanSelected == true?'../../../static/fan1.png':'../../../static/fan.png'"
										mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text
										:style="selEntity.fanSelected == true?'color:#ffffff':''">{{$t('com.fan')}}</text>
								</view>
							</view>
						</view>
					</view>
				</uni-col>
				<uni-col :span="8" v-if="funEntity.lampValue != 0">
					<view class="funList">
						<view :style="selEntity.lampSelected == true?'background-color:#0BC173':''"
							@click="handleSelectedIndex(2)">
							<view>
								<view>
									<image
										:src="selEntity.lampSelected == true?'../../../static/lamp1.png':'../../../static/lamp.png'"
										mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text
										:style="selEntity.lampSelected == true?'color:#ffffff':''">{{$t('com.light')}}</text>
								</view>
							</view>
						</view>
					</view>

				</uni-col>
				<uni-col :span="8" v-if="funEntity.lockValue != 0">
					<view class="funList">
						<view :style="selEntity.lockSelected == true?'background-color:#0BC173':''"
							@click="handleSelectedIndex(3)">
							<view>
								<view>
									<image
										:src="selEntity.lockSelected == true?'../../../static/lock1.png':'../../../static/lock.png'"
										mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text
										:style="selEntity.lockSelected == true?'color:#ffffff':''">{{$t('com.lock')}}</text>
								</view>
							</view>
						</view>
					</view>

				</uni-col>
				<uni-col :span="8" v-if="funEntity.tvValue != 0">
					<view class="funList">
						<view :style="selEntity.tvSelected == true?'background-color:#0BC173':''"
							@click="handleSelectedIndex(4)">
							<view>
								<view>
									<image :src="selEntity.tvSelected == true?'../../../static/television1.png':'../../../static/television.png'" mode="heightFix" style="height:60rpx;"></image>
								</view>
								<view class="descV">
									<text :style="selEntity.tvSelected == true?'color:#ffffff':''">{{$t('com.bsg')}}</text>
								</view>
							</view>
						</view>
					</view>

				</uni-col>
			</uni-row>
		</view>
		<view style="text-align: center;margin-top: 80rpx;">
			<image :src="switchSelected == true? '../../../static/switch.png':'../../../static/switch1.png'" mode="heightFix" style="height:120rpx;" @click="handleControl"></image>
		</view>

		<uni-popup ref="capPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('surplus-capacity')}}</view>
				<view class="input-item flex align-center">
					<input v-model="capTypeValue" class="input" type="number" maxlength="30" @input="validateNumber"/>
				</view>
				<view>
					<view class="action-btn">
						<button @click="handlecapType" class="login-btn cu-btn block lg">{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="otPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('oil-type')}}</view>
				<view class="input-item flex align-center">
					<input v-model="oilTypeValue" class="input" type="text" :placeholder="$t('input-oil-type')"
						maxlength="30" @input="checkOilTypeInput" />
				</view>
				<view>
					<view class="action-btn">
						<button @click="handleOilType" class="login-btn cu-btn block lg"
							v-if="canOt">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="ocPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('oil-capacity')}}</view>
				<view class="input-item flex align-center">
					<input v-model="oilCapacityValue" class="input" type="text" :placeholder="$t('input-oil-capacity')" maxlength="30"
						@input="checkOilCapacityInput" />
				</view>
				<view>
					<view class="action-btn">
						<button @click="handleOilCapacity" class="login-btn cu-btn block lg" v-if="canOc">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="consumePopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('com.qtrip')}}</view>
				<view class="flex align-center justify-center">
					<div class="self-symbol" style="margin-right: 30rpx;" @click="preCons">
						<image src="../../../static/images/pre.png" mode="widthFix"></image>
					</div>
					<view class="cons-value">{{(trueConsumption/10).toFixed(1)}}</view>
					<div class="self-symbol" style="margin-left: 30rpx;position: relative;">
						<image src="../../../static/images/add.png" mode="widthFix" @click="addCons"></image>
						<image style="position: absolute;width: 54rpx;right: -88rpx;top: 50%;transform: translateY(-50%);" src="../../../static/images/refresh.png" mode="widthFix" @click="refreshCons"></image>
					</div>
				</view>
				<view>
					<view class="action-btn">
						<button @click="handleConsume" class="login-btn cu-btn block lg">{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="wmPopup" type="center">
			<view class="login-form-content pv" style="width:600rpx;">
				<view>{{$t('work-pattern')}}</view>
				<view class="wmlists">
					<template v-for="(item,index) in wmList">
						<view :class="'wmlist ' + (item.selected == true?'selwmList':'')" :key="index"
							@click="selectWorkModel(index)">
							<view>{{item.pattern}}</view>
						</view>
					</template>
				</view>

				<view>
					<view class="action-btn">
						<button @click="handleWorkModel" class="login-btn cu-btn block lg" v-if="canWm">{{$t('com.confirm')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('com.confirm')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="disV" v-if="isOffline">
			<view>
				<view>{{$t('offline-tip')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryProductTSL,
		queryBusinessAttributes,
		batchControlDevice,
		getDeviceInfo,
		queryDeviceInfo,
		closeChannel,
		deviceWriteDps
	} from '../../../api/devices.js'
	import { mapGetters } from 'vuex'
	var deviceModule = uni.requireNativePlugin('XM-QuectelDeviceModule')
	export default {
		data() {
			return {
				entity: {
					useDay: 0,
					workSec: 0,
					pauseSec: 0,
					lastOpenTime: ''
				},
				oilEntity: {
					useDay: 0,
					capacity: 0,
					remain: 0,
					consumption: 0,
					realityConsumption: 0
				},
				trueConsumption: 0,//修改的数值
				typeEntity: {
					workModel: this.$t('com.pattern'),
					oilType: this.$t('oil-type'),
				},
				selEntity: {
					fanSelected: false,
					lampSelected: false,
					lockSelected: false,
					tvSelected: false
				},
				capTypeValue:'',
				oilTypeValue: '',
				oilCapacityValue: '',
				canOt: false,
				canOc: false,
				canWm: true,
				wmList: [],
				selectedIndex: -1,
				devicemsg: {}, //设备信息：pk，dk
				title: this.$t('aramis-control'),
				switchSelected: false,
				deviceModel: {},
				isOffline: false,
				funEntity: {
					oilState: -1,
					lampValue: -1,
					tvValue: -1,
					fanValue: -1,
					lockValue: -1
				},
				timer:null,
				warring: false,//精油报警
				oilConditionHex:'',//油状态16进制
				platform: uni.getStorageSync('platform') //平台
			}
		},
		onLoad(e) {
			this.devicemsg = e;
			console.log(this.devicemsg);
			this.title = this.devicemsg.deviceName;
			if (this.devicemsg.onlineStatus != 1) {
				this.isOffline = true;
			}

			this.getBusinessAttributes();
			this.getDeviceDetail();
			// this.addListener()
		},
		onUnload() {
			// this.removeListener()
			clearInterval(this.timer)
		},
		onHide() {
			clearInterval(this.timer)
		},
		onShow() {
			console.log('deviceName...',this.deviceName);
			console.log(uni.getStorageSync('localOilTypeList'));
			this.timer = setInterval(()=>{
				this.getBusinessAttributes();
			},3000)
		},
		computed:{
			...mapGetters(['deviceName'])
		},
		methods: {
			navitoSet(){
				uni.navigateTo({
					url: `/pages/devices/setting/index?pk=${this.devicemsg.productKey}&dk=${this.devicemsg.deviceKey}`
				})
			},
			validateNumber(e){
				console.log(e);
				// this.capTypeValue= input.value.replace(/[^\d]/g, ""); 
				let  value  = e.detail.value
				console.log(value);
				this.capTypeValue= value.replace(/[^\d]/g, "");
				this.$forceUpdate()
			},
			addListener(){
				let deviceItem = uni.getStorageSync('currentDevice')
				let para = {
					list:[{
						pk: deviceItem.productKey,
						dk: deviceItem.deviceKey, 
						capabilitiesBitmask: deviceItem.capabilitiesBitmask,
						onlineStatus: 1,
						bindingkey: deviceItem.authKey
					}]
					// list:[deviceItem]
				}
				console.log(para);
				console.log(deviceModule);
				deviceModule.startChannel(para,res=>{ 
					console.log('监听成功',res);
					// if(res.success){
					// 	return resolve(res)
					// }
				})
			},
			removeListener(){
				let para = {
					pk: this.devicemsg.productKey,
					dk: this.devicemsg.deviceKey,
				}
				console.log(para);
				console.log('调用解除监听函数.....');
				closeChannel(para).then(res=>{
					console.log('解除监听成功',res);
				})
			},
			handleSelectedIndex(index) {
				let type = '';
				switch (index) {
					case 1:
						this.selEntity.fanSelected = !this.selEntity.fanSelected;
						type = 'fan';
						break;
					case 2:
						this.selEntity.lampSelected = !this.selEntity.lampSelected;
						type = 'lamp';
						break;
					case 3:
						this.selEntity.lockSelected = !this.selEntity.lockSelected;
						type = 'lock';
						break;
					case 4:
						this.selEntity.tvSelected = !this.selEntity.tvSelected;
						type = 'up_down';
						break;
				}

				this.sendOrder(type);
			},
			handleControl() {
				let type = 'switch';
				this.switchSelected = !this.switchSelected;
				this.sendOrder(type);
			},
			checkOilTypeInput(e) {
				if (this.oilTypeValue) {
					this.canOt = true;
				} else {
					this.canOt = false;
				}
			},
			openOTPopup() {
				this.$refs.otPopup.open();
				this.oilTypeValue = this.typeEntity.oilType;
				this.checkOilTypeInput();
			},
			handleOilType() {
				this.$refs.otPopup.close();
				this.typeEntity.oilType = this.oilTypeValue;
				console.log(this.deviceModel.deviceKey); 
				this.saveOilType()
				// let type = 'jy_type';
				// this.sendOrder(type);
			},
			//保存精油类型的名称到本地
			saveOilType(){
				let oilObj = {
					deviceKey: this.deviceModel.deviceKey,
					name: this.typeEntity.oilType
				}
				if(!uni.getStorageSync('localOilTypeList')){
					let arr = []
					arr.push(oilObj)
					uni.setStorageSync('localOilTypeList',arr)
				}else{
					let localArr = uni.getStorageSync('localOilTypeList')
					let hasOil = localArr.findIndex(ite=>ite.deviceKey === oilObj.deviceKey)
					if(hasOil>-1){ //判断本地数组里有无这个设备的记录，有则直接修改名称，无则push进数组
						localArr[hasOil].name = oilObj.name
					}else{
						localArr.push(oilObj)
					}
					uni.setStorageSync('localOilTypeList',localArr)
				}
			},
			handlecapType() {
				if(Number(this.capTypeValue) > Number(this.oilEntity.capacity)){
					this.$modal.msgError(this.$t('exceed')+this.$t('oil-capacity'))
					return false
				}
				this.$refs.capPopup.close();
				this.oilEntity.remain = this.capTypeValue;
				let capvalHex = Number(this.oilEntity.remain).toString(16)
				capvalHex = capvalHex.length==1? '000'+capvalHex: capvalHex.length==2? '00'+capvalHex: capvalHex.length==3? '0'+capvalHex: capvalHex
				let start = this.oilConditionHex.substring(0, 4)
				let end = this.oilConditionHex.substring(8, 16)
				this.oilConditionHex = start + capvalHex + end
				// console.log(capvalHex);
				// console.log(this.oilConditionHex);
				let type = 'jy_status';
				this.sendOrder(type);
			},
			checkOilCapacityInput(e) {
				if (this.oilCapacityValue) {
					this.canOc = true;
				} else {
					this.canOc = false;
				}
			},
			openCAPPopup(){
				this.$refs.capPopup.open();
				this.capTypeValue = this.oilEntity.remain
				this.checkOilCapacityInput();
			},
			openOCPopup() {
				// this.$refs.ocPopup.open();
				// this.oilCapacityValue = this.oilEntity.capacity;
				// this.checkOilCapacityInput();
				console.log('openOCPopup')
			},
			openConsumePopup(){
				this.$refs.consumePopup.open();
				this.trueConsumption = this.oilEntity.realityConsumption
			},
			handleConsume(){
				this.$refs.consumePopup.close();
				let conHex = Number(this.trueConsumption).toString(16)
				conHex = conHex.length==1? '0'+conHex:conHex
				let start = this.oilConditionHex.substring(0, 14)
				this.oilConditionHex = start + conHex
				console.log(conHex);
				console.log(this.oilConditionHex);
				let data = getApp().dataHexStr('14','01',this.oilConditionHex)
				console.log(data);
				let type = 'jy_status';
				this.sendOrder(type);
			},
			//减少精油油耗
			preCons(){
				let minConsumption = (this.oilEntity.consumption*0.7).toFixed(0)
				console.log(this.oilEntity.consumption);
				console.log(minConsumption);
				if(this.trueConsumption<=minConsumption){
					return false
				}else{
					this.trueConsumption -= 1
				}
			},
			//增加精油油耗
			addCons(){
				let maxConsumption = (this.oilEntity.consumption*1.3).toFixed(0)
				console.log(maxConsumption);
				if(this.trueConsumption>=maxConsumption){
					return false
				}else{
					this.trueConsumption += 1
				}
			},
			refreshCons(){
				this.trueConsumption = this.oilEntity.consumption
			},
			handleOilCapacity() {
				this.$refs.ocPopup.close();
				this.oilEntity.capacity = this.oilCapacityValue;
			},
			openWMPopup() {
				this.$refs.wmPopup.open();
				for (let i = 0; i < this.wmList.length; i++) {
					this.wmList[i].selected = false;
					if (this.wmList[i].pattern == this.typeEntity.workModel) {
						this.wmList[i].selected = true;
						this.selectedIndex = i;
						this.$forceUpdate();
					}
				}
			},
			handleWorkModel() {
				this.$refs.wmPopup.close();
				this.typeEntity.workModel = this.wmList[this.selectedIndex].pattern;
			},
			selectWorkModel(index) {
				const oldSelectedItem = this.wmList[this.selectedIndex];
				if (oldSelectedItem) {
					oldSelectedItem.selected = false;
				}

				this.wmList[index].selected = true;
				this.selectedIndex = index;

				this.$forceUpdate();
			},
			toWorkModel() {
				let {
					deviceKey,
					productKey,
					// deviceName
				} = this.devicemsg;

				uni.navigateTo({
					url: `/pages/work/pattern/index?deviceKey=${deviceKey}&productKey=${productKey}&deviceName=${this.deviceName}`
				})
			},
			//获取设备详情
			getDeviceDetail() {
				let para = {
					pk: this.devicemsg.productKey,
					dk: this.devicemsg.deviceKey,
				}
				queryDeviceInfo(para).then(res => {
					console.log('获取设备详情......',res);
					const data = res.data
					this.deviceModel = data;
					this.entity.lastOpenTime = this.deviceModel.lastConnTime;
					console.log(this.deviceModel)
				})
			},
			//查询设备业务属性
			getBusinessAttributes() {
				let para = {
					pk: this.devicemsg.productKey,
					dk: this.devicemsg.deviceKey,
					typeList: '2'
					// typeList: ['2']
				}

				queryBusinessAttributes(para).then(res => {
					console.log(res);
					let datalist = res.data.customizeTslInfo
					console.log('查询设备业务属性......');
					console.log(datalist)
					
					this.getOilStatusEntity(datalist);
					this.getOilTypeValue(datalist);
					this.getEntity(datalist);
					this.getFunData(datalist);
					this.getWarring(datalist) 
					this.getWorkData(datalist)
				})
			},
			//报警类型
			getWarring(datalist){
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'warring') {
						if(this.platform == 'android'){
							this.warring = JSON.parse(datalist[i].resourceValce);
						}else{
							this.warring = JSON.parse(datalist[i].resourceValue);
						}
						break;
					}
				}
			},
			// 油状态值（十六进制字符串）
			getOilStatusValue(datalist) {
				let hexStr = '';
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'jy_status') {
						if(this.platform == 'android'){
							hexStr = datalist[i].resourceValce;
						}else{
							hexStr = datalist[i].resourceValue;
						}
						console.log(datalist[i]);
						break;
					}
				}

				return hexStr;
			},
			getEntity(datalist) {
				console.log(datalist);
				if(this.platform == 'android'){
					for (let i = 0; i < datalist.length; i++) {
						if (datalist[i].resourceCode == 'fan_switch') {
							this.selEntity.fanSelected = datalist[i].resourceValce == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'light_switch') {
							this.selEntity.lampSelected = datalist[i].resourceValce == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'lock') {
							this.selEntity.lockSelected = datalist[i].resourceValce == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'up_down') {
							this.selEntity.tvSelected = datalist[i].resourceValce == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'switch') {
							this.switchSelected = datalist[i].resourceValce == 'true' ? true : false;
						}
						
					}
				}else{
					for (let i = 0; i < datalist.length; i++) {
						if (datalist[i].resourceCode == 'fan_switch') {
							this.selEntity.fanSelected = datalist[i].resourceValue == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'light_switch') {
							this.selEntity.lampSelected = datalist[i].resourceValue == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'lock') {
							this.selEntity.lockSelected = datalist[i].resourceValue == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'up_down') {
							this.selEntity.tvSelected = datalist[i].resourceValue == 'true' ? true : false;
						}
						if (datalist[i].resourceCode == 'switch') {
							this.switchSelected = datalist[i].resourceValue == 'true' ? true : false;
						}
						
					}
				}
			},
			// 精油状态：容量、剩余容量、油耗
			getOilStatusEntity(datalist) {
				const hexStr = this.getOilStatusValue(datalist);
				console.log(hexStr);
				this.oilConditionHex = hexStr
				const byteArr = this.hexToBytes(hexStr);
				const p1 = byteArr[0];
				const p2 = byteArr[1];
				const p3 = byteArr[2];
				const p4 = byteArr[3];
				const p5 = byteArr[4];
				const p6 = byteArr[5];
				const p7 = byteArr[6];
				const p8 = byteArr[7];
				console.log(p5);
				this.oilEntity = {
					capacity: this.getIntegerValue(p2, p1),
					remain: this.getIntegerValue(p4, p3),
					// consumption: (p5 ?? 0 / 10).toFixed(1),
					consumption: p5? p5 : 0,
					useDay: this.getIntegerValue(p7, p6),
					realityConsumption:  p8? p8 : 0, //真实油耗
				};
				console.log('精油容量信息',this.oilEntity);
				this.getCanUsedDays();
			},
			// 精油类型
			getOilTypeValue(datalist) {
				if(uni.getStorageSync('localOilTypeList')){
					let localArr = uni.getStorageSync('localOilTypeList')
					let hasOil = localArr.findIndex(ite=>ite.deviceKey === this.devicemsg.deviceKey)
					if(hasOil>-1){ //判断本地数组里有无这个设备的记录，有则直接修改名称，无则push进数组
						this.typeEntity.oilType = localArr[hasOil].name
					}
				}
				// for (let i = 0; i < datalist.length; i++) {
				// 	if (datalist[i].resourceCode == 'jy_type') {
				// 		if(this.platform == 'android'){
				// 			this.typeEntity.oilType = datalist[i].resourceValce;
				// 		}else{
				// 			this.typeEntity.oilType = datalist[i].resourceValue;
				// 		}
				// 		break;
				// 	}
				// }
			},
			//功能定义
			getFunDataValue(datalist) {
				var hexStr = '';
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'fun_data') {
						if(this.platform == 'android'){
							hexStr = datalist[i].resourceValce;
						}else{
							hexStr = datalist[i].resourceValue;
						}
						break;
					}
				}

				return hexStr;
			},
			getFunData(datalist) {
				const hexStr = this.getFunDataValue(datalist);
				if (hexStr == '') {
					console.log('no fun data...')
					return
				};
				const byteArr = this.hexToBytes(hexStr);
				const p1 = byteArr[0]; // -精油检测方式：0无，1-计算型，2-探测型
				const p2 = byteArr[1]; // -方式：0无电机，1有电机。无不显示图标
				const p3 = byteArr[2]; // -氛围灯：0无，1日光灯，2彩灯，3炫彩灯，无不显示图标
				const p4 = byteArr[3]; // -电量显示：0无，1有，无不显示图标
				const p5 = byteArr[4]; // -人休感应：0无，1有，无不显示图标
				const p6 = byteArr[5]; // -风扇：0无，1有，无不显示图标
				const p7 = byteArr[6]; // -按键锁：0无，1有，无不显示图标

				this.funEntity = {
					oilState: parseInt(p1),
					lampValue: parseInt(p3),
					tvValue: parseInt(p2),
					fanValue: parseInt(p6),
					lockValue: parseInt(p7),
				}

				console.log('this.funEntity...')
				console.log(this.funEntity)
			},
			// 工作、暂停、步长时间范围
			getWorkDataValue(datalist) {
				var hexStr = '';
				for (let i = 0; i < datalist.length; i++) {
					if (datalist[i].resourceCode == 'time_scope') {
						if(this.platform == 'android'){
							hexStr = datalist[i].resourceValce;
						}else{
							hexStr = datalist[i].resourceValue;
						}
						break;
					}
				}
				return hexStr;
			},
			
			getWorkData(workdata){
				let hexStr = this.getWorkDataValue(workdata);
				if (hexStr == '') {
					hexStr = '000501f4000501f405'
					// console.log('no work data...')
					// return
				};
				
				const p1 = hexStr.substr(0,4) //暂停时间最小值
				const p2 = hexStr.substr(4,4) //暂停时间最大值
				const p3 = hexStr.substr(8,4) //工作时间最小值
				const p4 = hexStr.substr(12,4) //工作时间最大值
				const p5 = hexStr.substr(16,2) //步进值
				console.log('暂停最小值',p1);
				console.log('暂停最大值',p2);
				console.log('工作最小值',p3);
				console.log('工作最大值',p4);
				console.log('步长',p5);
				this.$store.commit('SET_PAUSETIMEMIN',parseInt(p1,16))
				this.$store.commit('SET_PAUSETIMEMAX',parseInt(p2,16))
				this.$store.commit('SET_WORKTIMEMIN',parseInt(p3,16))
				this.$store.commit('SET_WORKTIMEMAX',parseInt(p4,16))
				this.$store.commit('SET_WORKSTEP',parseInt(p5,16))
			},
			//下发指令
			sendOrder111(type) {
				let datas = {};
				// uni.showLoading({
				// 	mask: true
				// })
				switch (type) {
					case 'fan': //风扇开关
						datas = {
							id: 4,
							code: 'fan_switch',
							dataType: 'BOOL',
							value: this.selEntity.fanSelected,
						}
						break;
					case 'lamp': // 氛围灯
						datas = {
							id: 9,
							code: 'light_switch',
							dataType: 'BOOL',
							value: this.selEntity.lampSelected
						}
						break;
					case 'lock': // 锁屏开关
						datas = {
							id: 5,
							code: 'lock',
							dataType: 'BOOL',
							value: this.selEntity.lockSelected
						}
						break;
					case 'up_down': // 点击开关
						datas = {
							// up_down: (this.selEntity.tvSelected == true ? 0 : 1)
							id: 15,
							code: 'up_down',
							dataType: 'BOOL',
							value: this.selEntity.tvSelected
						}
						break;
					case 'switch': // 设备开关
						datas = {
							id: 1,
							code: 'switch',
							dataType: 'BOOL',
							value: this.switchSelected
						}
						break;
					case 'jy_type':
						datas = {
							id: 21,
							code: 'jy_type',
							dataType: 'TEXT',
							value: this.oilTypeValue
						}
						break;
					case 'jy_status':
						datas = {
							id: 20,
							code: 'jy_status',
							dataType: 'RAW',
							value: this.oilConditionHex
						}
						break;
				}
			
				let para = { 
					type: 2,
					list: [datas],
					pk: this.devicemsg.productKey,
					dk: this.devicemsg.deviceKey,
				}
				console.log('发送参数=====',para);
				let that = this
				deviceWriteDps(para).then(res => {
					console.log('发送指令结果：');
					console.log(res)
					clearInterval(that.timer)
					that.timer = setInterval(()=>{
						uni.hideLoading()
						that.getBusinessAttributes();
					},3000)
				})
			},
			dataTypeChange(type){
				// datatype转换函数，类型转换为对应Number
				switch (type){
					case 'RAW':
						return 0
						break;
					case 'BOOL':
						return 1
						break;
					case 'INT':
						return 2
						break;
					case 'FLOAT':
						return 3
						break;
					case 'DOUBLE':
						return 4
						break;
					case 'ENUM':
						return 5
						break;
					case 'TEXT':
						return 6
						break;
					case 'DATE':
						return 7
						break;
					case 'STRUCT':
						return 8
						break;
					case 'ARRAY':
						return 9
						break;
				}
			},
			//下发指令
			sendOrder(type) {
				let datas = {};
				uni.showLoading({
					mask: true
				})
				switch (type) {
					case 'fan': //风扇开关
						datas = {
							fan_switch: this.selEntity.fanSelected
						}
						break;
					case 'lamp': // 氛围灯
						datas = {
							light_switch: this.selEntity.lampSelected
						}
						break;
					case 'lock': // 锁屏开关
						datas = {
							lock: this.selEntity.lockSelected
						}
						break;
					case 'up_down': // 点击开关
						datas = {
							// up_down: (this.selEntity.tvSelected == true ? 0 : 1)
							up_down: this.selEntity.tvSelected
						}
						break;
					case 'switch': // 设备开关
						datas = {
							switch: this.switchSelected
						}
						break;
					case 'jy_type':
						datas = {
							jy_type: this.oilTypeValue
						}
						break;
					case 'jy_status':
						datas = {
							jy_status: this.oilConditionHex
						}
						break;
				}


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
				let that = this
				batchControlDevice(para).then(res => {
					console.log('发送指令结果：');
					console.log(res)
					clearInterval(that.timer)
					that.timer = setInterval(()=>{
						uni.hideLoading()
						that.getBusinessAttributes();
					},3000)
				})
			},
			// 获取低八位、高八位的整数值
			getIntegerValue(lowByte, highByte) {
				var integerValue = (highByte << 8) | lowByte;
				return integerValue;
			},
			// 十六进制转byte数组
			hexToBytes(hex) {
				let bytes = [];
				for (let i = 0; i < hex.length; i += 2) {
					bytes.push(parseInt(hex.substr(i, 2), 16));
				}
				return bytes;
			},
			// 可使用天数
			getCanUsedDays() {
				const consumption = this.oilEntity.realityConsumption;
				const hours = this.oilEntity.realityConsumption * this.oilEntity.remain;
				const days = hours / 24;
				let day = parseInt(days);
				if (days % 1 !== 0) {
					day += 1;
				}

				this.entity.useDay = day;
			}
		}
	}
</script>

<style lang="scss">
	.ttip {
		color: #000000;
		height: 40px;
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

	}

	.ttip2 {
		color: #B5B5B5;
		font-size: 12px;
		text-align: center;

	}

	.timg {
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		position: relative;
	}

	.tcon {
		position: absolute;
		height: 340rpx;
		display: flex;
		align-items: center;
		color: #ffffff;
		font-size: 16px;
	}

	.oilV {
		padding: 0 20rpx;
		font-size: 14px;
	}

	.oilV>view {
		background-color: #ffffff;
		border-radius: 10rpx;
	}

	.oilItem {
		padding: 20rpx 0;
		text-align: center;
		position: relative;
	}

	.oilItem>view {
		padding: 6rpx 0;
	}

	.oilItem .o2 {
		font-size: 9px;
	}

	.oilItem .oilTxt {
		font-weight: bold;
		font-size: 16px;
	}

	.lineV {
		position: absolute;
		height: 50rpx;
		border: 1rpx solid #EFEFEF;
		top: 45rpx;
	}

	.tmV {
		padding: 0 20rpx;
		margin-top: 20rpx;
	}

	.tmV>view>view {
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
	}

	.tmV>view>view>view>view:first-child {
		font-size: 16px;
		font-weight: bold;
	}

	.tmV>view>view>view>view:last-child {
		color: #B5B5B5;
		font-size: 12px;
		margin-top: 20rpx;
	}

	.conV {

		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 10rpx;
		font-size: 14px;
	}


	.conV .descV {
		margin-top: 10rpx;
	}

	.funList {
		padding: 10rpx;
		text-align: center;
	}

	.funList>view {
		background-color: #ffffff;
		border-radius: 10rpx;
		text-align: center;
		padding: 20rpx 0;
	}

	.login-form-content {
		margin: 0 auto;

		padding-left: 20px;
		padding-right: 20px;


		.icon-left {
			padding-right: 40rpx;
		}

		.icon-left::after {
			content: "\e7eb";
			color: grey;
		}

		.input-item {
			margin: 20px auto;
			margin-top: 10px;
			background-color: #f5f6f7;
			height: 45px;
			border-radius: 5px;

			.icon {
				font-size: 38rpx;
				margin-left: 10px;
				color: #999;
			}

			.input {
				width: 100%;
				font-size: 14px;
				line-height: 20px;
				text-align: left;
				padding-left: 15px;
			}

		}

		.login-btn {
			margin-top: 40px;
			height: 45px;
			background-color: #01CBA5;
			color: #ffffff;
			border-radius: 10px;
		}

		.login-btn2 {
			margin-top: 40px;
			height: 45px;
			background-color: #AAAAAA;
			color: #ffffff;
			border-radius: 10px;
		}

		.reg {
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
		}

		.xieyi {
			color: #333;
			margin-top: 20px;
		}

	}

	.pv {
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 40rpx;

	}

	.pv>view:first-child {
		font-size: 16px;
		padding-bottom: 20rpx;
		font-weight: bold;
	}

	.wmlists {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-height: 420rpx;
		overflow: auto;
	}

	.wmlist {
		background-color: #f5f6f7;
		padding: 40rpx;
		margin: 10rpx;
		border-radius: 26rpx;
		border: 1px solid #ffffff;
	}

	.selwmList {
		background-image: url('../../../static/check.png');
		background-position: right bottom;
		background-repeat: no-repeat;
		border: 1px solid #00AD8D;
	}

	.disV {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #ffffff;
		opacity: 0.6;

		>view {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			margin: auto;
			height: 280rpx;
			width: 80%;
			text-align: center;

			>view {
				background-color: #000000;
				color: #ffffff;
				opacity: 0.8;
				border-radius: 20rpx;
				padding: 40rpx;
			}
		}
	}
	.no-oil{
		// background-color: #f7c477; 
		// background-color: #d20030;
		background-color: #ff0000;
		color: #fff;
		padding: 10rpx 0;
		padding-left: 60rpx;
	}
	.self-symbol{
		width: 58rpx;
	}
</style>