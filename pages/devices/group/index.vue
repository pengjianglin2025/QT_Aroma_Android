<template>
<view>
	<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left"  :title="title" @clickLeft="back" right-icon="compose" @clickRight="editGroup">
	</uni-nav-bar>
	<view class="list-cell-device">
	  <view class="flex justify-between items-center menu-item-box">
	    <view style="font-size: 32rpx;">{{$t('device-list')}}</view>
		<image style="width: 44rpx;height: 44rpx;" src="../../../static/images/home/add1.png" mode="" @click="showAddpop"></image>
	  </view>
	</view>
	<view class="">
		<scroll-view class="devicelist-content" scroll-y="true" show-scrollbar>
			<view class="list-grid">
				<view v-for="(item,index) in devicelist" :key="item.dk || item.deviceKey || index" class="device-item">
					<view class="device-switch">
						<view>
							<!-- <image src="../../../static/off-light.png" mode="widthFix" style="width:88rpx;" class="img1"></image> -->
							<image v-if="item.pk == 'p11r26' || item.productKey == 'p11r26'" src="../../../static/off-light.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-if="item.pk == 'p11sq3' || item.productKey == 'p11sq3'" src="../../../static/01.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-if="item.pk == 'p11sq4' || item.productKey == 'p11sq4'" src="../../../static/02.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-if="item.pk == 'p11sq5' || item.productKey == 'p11sq5'" src="../../../static/03.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
							<image v-if="item.pk == 'p11sq6' || item.productKey == 'p11sq6'" src="../../../static/04.png" mode="aspectFit" style="width:88rpx;height: 100rpx;" class="img1"></image>
						</view>
						<!-- <view>
							<image src="../../../static/off-btn.png" mode="widthFix" style="width:96rpx;" class="img2"></image>
						</view> -->
					</view>
					<view class="device-name">
						{{item.deviceName}}
					</view>
					<view class="device-statetext">
						<uni-icons type="smallcircle-filled" :color="item.onlineStatus == 1?'#0BC173':'#CFCFCF'" size="1"></uni-icons>
						<text style="padding-left: 10rpx;"> {{item.onlineStatus == 1?$t('com.online'):$t('com.offline')}}</text>
					</view>
					<view class="unbind-device" @click="deleteDeviceInGroup(item)">
						<uni-icons type="closeempty" color="#fff" size="20"></uni-icons>
					</view>
				</view>
				
				<view class="device-item"  style="opacity: 0;">
					<view class="device-switch">
						<view>
							<image src="../../../static/off-light.png" mode="widthFix" style="width:88rpx;" class="img1">
							</image>
						</view>
						<view>
							<image src="../../../static/off-btn.png" mode="widthFix" style="width:96rpx;" class="img2">
							</image>
						</view>
					</view>
					<view class="device-name">
						
					</view>
					<view class="device-statetext">
					</view>
				</view>
				
			</view>
		</scroll-view>
	</view>
	<uni-popup ref="addpop" type="center">
		<view class="err-pop">
			<!-- <div class="text-center gr-name">可添加设备列表</div> -->
			<div class="text-center gr-name">{{$t('add-list')}}</div>
			<scroll-view style="height: 50vh;" scroll-y="true" show-scrollbar>
				<view class="flex justify-between items-center add-device-item" v-for="item in addDevicesList" :key="item.dk || item.deviceKey || item.id">
					<view style="width:69%;">
						<div class="device-name">{{item.deviceName}}</div>
						<div class="device-statetext">deviceId:{{item.deviceId}}</div>
					</view>
					<view class="" style="width:30%;">
						<view>
							<button @click="addDeviceInGroup(item)" class="login-btn sm" style="background-color: #01CBA5;">{{$t('com.add')}}</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</view>
</template>

<script>
import MoveSlider from "@/components/move-slider/index.vue"
import RenderjsColor from "@/components/renderjs-color-picker/renderjs-color-picker.vue"
import { getDeviceListByNotInDeviceGroup, getGroupDeviceList, queryDeviceGroup, addDeviceToGroup,deleteDeviceToGroup, batchControlDevice } from "@/api/devices.js"
export default{
	components:{
		MoveSlider,
		RenderjsColor
	},
	data(){
		return{
			title:'',
			curIdx:1,
			// devicelist:[{
			// 	deviceName:'设备1',
			// 	deviceStatus:'online'
			// },{
			// 	deviceName:'设备2',
			// 	deviceStatus:'online'
			// },{
			// 	deviceName:'设备2',
			// 	deviceStatus:'online'
			// },],
			devicelist:[],
			customizeTslInfo:{
				switch: true,
				work_mode: 4,
				bright_value: 1,
				temp_value: 30,
				colour_data: -254,
				scene_select: 1,
				speed: 1
			},//数据点列表
			dgid: null, //分组dgid
			groupName:null, //分组名称
			addDevicesList:[] ,//可添加的设备列表,
			deviceName:'',
			platform: uni.getStorageSync('platform')
		}
	},
	onLoad(data) {
		this.title = data.name;
		this.dgid = data.dgid
		this.groupName = data.name
		let _this = this
		uni.$on('newtitle',function(e){
			console.log(e);
			_this.title  = e
		})
		this.getGroupDevices()
	},
	onShow() {
		this.getGroupDetail()
	},
	methods:{
		//显示设备弹窗
		showAddpop(){
			this.getDeviceList()
			this.$refs.addpop.open('center')
		},
		//切换两个模式
		changeSel(idx){
			this.curIdx = idx
		},
		//添加设备到设备组
		addDeviceInGroup(dmsg){
			let para
			if(this.platform == 'android'){
				 para = {
					dgid: this.dgid,
					list:[{
						pk: dmsg.productKey,
						dk: dmsg.deviceKey
					}]
				}
			}else{
				para = {
					dgid: this.dgid,
					deviceList:[{
						pk: dmsg.productKey,
						dk: dmsg.deviceKey
					}]
				}				
			}
			addDeviceToGroup(para).then(res=>{
				console.log(res);
				this.getDeviceList()
				this.getGroupDevices()
			})
		},
		//把某个设备从该分组里删除
		deleteDeviceInGroup(dmsg){
			console.log(dmsg);
			let that = this
			uni.showModal({
			  title: this.$t('com.tip'),
			  content: this.$t('confirm-delete-device'),
			  cancelText: this.$t('com.cancel'),
			  confirmText: this.$t('com.confirm'),
			  success: function(res) {
			    if (res.confirm) {
			      let para
				  console.log(that.platform);
				  if(that.platform == 'android'){
					  para = {
						dgid: that.dgid,
						list:[{
							pk: dmsg.pk,
							dk: dmsg.dk
						}]
					  }
				  }else{
					  para = {
						dgid: that.dgid,
						deviceList:[{
							pk: dmsg.productKey,
							dk: dmsg.deviceKey
						}]
					  }
				  }
				 
			      deleteDeviceToGroup(para).then(res=>{

			      	that.getGroupDevices()
			      })
			    }
			  }
			})
			
		},
		//获取不在该分组的设备
		getDeviceList(){
			let para = {
				dgid: this.dgid,
				page: 1,
				pageSize: 100
			}
			getDeviceListByNotInDeviceGroup(para).then(res=>{
				console.log(res);
				if(this.platform == 'android'){
					this.addDevicesList = res.data.list
				}else{
					this.addDevicesList = res.data
				}
			})
		},
		//查询设备组详情
		getGroupDetail(){
			let para = {
				dgid: this.dgid
			}
			queryDeviceGroup(para).then(res=>{
				console.log(res);
				this.groupName = res.data.name
			})
		},
		//查询设备组的列表
		getGroupDevices(){
			let para = {
				dgid: this.dgid,
				// pk: 'p11r26',
				pk: '',
				page: 1,
				pageSize: 100
			}
			getGroupDeviceList(para).then(res=>{
				console.log(res);
				if(this.platform == 'android'){
					this.devicelist = res.data.list
				}else{
					this.devicelist = res.data
				}
			})
		},
		//进入编辑分组界面
		editGroup(){

			uni.navigateTo({
				url:`/pages/devices/group/edit?name=${this.groupName}&dgid=${this.dgid}`
			})
		},
		//发送指令
		sendOrder(data,mtype,mdataFormat){
	
			let list = []
			for(let i in this.devicelist){
				list.push({
					productKey: this.devicelist[i].pk,
					deviceKey: this.devicelist[i].dk,
				})
			}
			let para ={
				type: mtype||2,
				data:JSON.stringify([data]),
				deviceList: list,
				// deviceList:[{
				// 	productKey: this.devicemsg.productKey,
				// 	deviceKey: this.devicemsg.deviceKey,
				// }],
				cacheTime: 86400,
				dataFormat: mdataFormat || 2,
				isCache: 1,
				isCover: 1
			}
		
			batchControlDevice(para).then(res=>{
		
				// this.$modal.msg('成功')
				this.getBusinessAttributes()
			})
		},
		checkGroupNameInput(){
			if (this.deviceName) {
				this.canAD = true;
			} else {
				this.canAD = false;
			}
		}
	}
}
</script>

<style lang="scss">
	.selected-border{
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
	}
	.color-radio{
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
	}
	.ml-32{
		margin-left: 32rpx;
	}
	.group-btn{
		display: inline-block;
		/* padding: 24rpx 180rpx; */
		width: 630rpx;
		height: 98rpx;
		line-height: 98rpx;
		/* background-color: #FF8158; */
		background: linear-gradient(to right, #FF6939,#FF8158);
		border-radius: 12rpx;
		text-align: center;
		color: #fff;
		margin-left: 50%;
		transform: translateX(-50%);
		font-size: 36rpx;
		margin-top: 80rpx;
	}
	.group-title{
		font-size: 32rpx;
		margin-top: 60rpx;
		margin-left: 40rpx;
		color: #151515;
	}
	.progress-bg{
		width: 554rpx;
		padding: 4rpx;
	}
	.title-img{
		width: 38rpx;
		height: 38rpx;
		margin-right: 18rpx;
	}
	.title-tab{
		font-size: 36rpx;
		padding: 30rpx 64rpx;
		text-align: center;
		box-shadow: 0rpx 0rpx 10rpx rgba(0,0,0,.2);
	}
	.radio-left{
		border-top-left-radius: 12rpx;
		border-bottom-left-radius: 12rpx;
	}
	.radio-right{
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.pop-title{
		position: relative;
		text-align: center;
		border-bottom: 2rpx solid rgba(0, 0, 0, 0.2);
	}
	.confirm-btn{
		position: absolute;
		width: 80rpx;
		right: 40rpx;
		top: 50%;
		transform: translateY(-50%);
		color: #FF6939;
	}
	.selected-color{
		margin-right: 70rpx;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
	}
	.list-cell-device{
		position: relative;
		width: 100%;
		box-sizing: border-box;
		/* background-color: #fff; */
		color: #333;
		padding: 12px 14px;
	}
	.index-light-img{
		width: 44rpx;
		height: 164rpx;
	}
	.list-grid{
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 26rpx;
		padding: 0 28rpx;
	}
	.device-item{
		/* width: 332rpx; */
		position: relative;
		background-color: #fff;
		border-radius: 12rpx;
		padding-bottom: 14rpx;
		overflow: hidden;
	}
	// .device-name{
	// 	max-width: 180rpx;
	// 	height: 80rpx;
	// 	// line-height: 40rpx;
	// 	overflow: hidden;
	// 	word-break: break-all;
	// 	text-overflow: ellipsis;
	// 	// display: -webkit-box;
	// 	// -webkit-box-orient: vertical;
	// 	// -webkit-line-clamp: 2;
	// 	// background-color: red;
	// 	// color: #fff;
	// 	font-size: 32rpx;
	// 	color: #151515;
	// 	font-weight: bold;
	// 	background-color: yellow;
	// }
	.device-statetext{
		font-size: 28rpx;
		margin-top: 6rpx;
		color: #989898;
	}
	.unbind-device{
		position: absolute;
		top: 0;
		right: 0;
		background-color: #ff4343;
		border-bottom-left-radius: 12rpx;
	}
	.err-pop{
		width: 672rpx;
		padding: 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		position: relative;
		
		.add-device-item{
			// border: 2rpx solid #a8a8a8;
			// border-radius: 12rpx;
			padding: 10rpx 20rpx;
			margin-top: 40rpx;
			border-bottom: 2rpx solid #a8a8a8;;
		}
		.gr-name{
			font-size: 32rpx;
			font-weight: bold;
		}
		.add-btn{
			background-color: #FF8158;
			border-radius: 12rpx;
			padding: 15rpx 30rpx;
			color: #fff;
		}
	}
	
	.devicelist-content {
		// padding: 0 36rpx;
		padding:0 20rpx;
		// height: 53vh;
		// margin-top: 44rpx;
		// height: 962rpx;
		/* height: 894rpx; */
	}
	
	.device-item2 {
		padding: 34rpx 40rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	
	.device-item {
		display: inline-block;
		padding-bottom: 20rpx;
		border-radius: 20rpx;
		// max-width: 318rpx;
		// width: 320rpx;
		/* height: 340rpx; */
		// background-color: rgba(83, 233, 213, .2);
		background-color: #FFFFFF;
	}
	
	.device-switch {
		display: flex;
		// justify-content: space-between;
		justify-content: center;
		// justify-content: space-between;
		align-items: center;
		padding: 34rpx 22rpx;
		// padding-top: 74rpx;
	}
	
	.device-name {
		color: #151515;
		font-size: 32rpx;
		padding-left: 40rpx;
		font-weight: bold;
		// max-width: 280rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		// padding: 0 28rpx;
	}
	
	.device-statetext {
		font-size: 28rpx;
		padding-left: 40rpx;
		// padding-left: 28rpx;
		margin-top: 10rpx;
		// color: #848484;
		color: #989898;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.login-btn {
		// height: 45px;
		background-color: #01CBA5;
		color: #ffffff;
		border-radius: 10px;
		font-size: 14px;
	}
	
	.devicelist-content {
		// padding: 0 36rpx;
		padding: 0 20rpx;
		// height: 53vh;
		// margin-top: 44rpx;
		// height: 962rpx;
		/* height: 894rpx; */
	}
	
	.device-item {
		display: inline-block;
		padding-bottom: 20rpx;
		border-radius: 20rpx;
		// max-width: 318rpx;
		// width: 320rpx;
		/* height: 340rpx; */
		// background-color: rgba(83, 233, 213, .2);
		background-color: #FFFFFF;
	}
	
	// .device-item:active {
	// 	background-color: #0BC173;
	
	// 	.device-switch {
	// 		view>.img1 {
	// 			content: url(../../../static/on-light.png) !important;
	// 		}
	
	// 		view>.img2 {
	// 			content: url(../../../static/on-btn.png) !important;
	// 		}
	// 	}
	
	// 	.device-name {
	// 		color: #ffffff;
	// 	}
	
	// 	.device-statetext {
	// 		color: #ffffff;
	
	// 		.uniui-smallcircle-filled {
	// 			color: #ffffff !important;
	// 		}
	// 	}
	// }
	
	.img2{
		opacity: 0;
	}
</style>