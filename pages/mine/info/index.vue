<template>
  <view class="container">
	  <view class="avatar" @click="showHeadPop">
	  	<image class="mine-headimage" :src="avatarUrl" mode=""></image>
		<image class="mine-pic" src="../../../static/images/pic.png" mode=""></image>
	  </view>
	 <view class="list-cell list-cell-arrow" @click="showSelectPop">
	   <view class="menu-item-box">
	     <view>{{$t("info.changeName")}}</view>
		 <view class="app-version">{{nickname}}</view>
	   </view>
	 </view>
	 <view class="list-cell">
	   <view class="menu-item-box">
	     <view>{{$t('phone-number')}}</view>
		 <view class="app-version">{{phoneNum}}</view>
	   </view>
	 </view>
	<uni-popup ref="modePop" type="top">
		<view class="popup-background">
			<view class="pop-title">
				<div style="padding: 30rpx 0;font-size: 40rpx;">{{$t("info.changeName")}}</div>
				<uni-icons class="confirm-btn" type="closeempty" @click="closeModePop"></uni-icons>
			</view>
			<view class="input-item flex align-center input-shadow">
			  <input v-model="nickname" type="text" class="input" :placeholder="$t('info.changeName')" maxlength="20" />
			</view>
			<view class="mrt-40 action-btn" style="width: 90%;margin: 40rpx auto;padding-bottom: 40rpx;">
			  <button class="login-btn  block lg round" style="font-size: 30rpx;" @click="confirmModel">{{$t("com.confirm")}}</button>
			</view>
		</view>
	</uni-popup>
	
	<uni-popup ref="headPop" type="top">
		<view class="popup-background">
			<view class="pop-title">
				<div style="padding: 30rpx 0;font-size: 40rpx;">{{$t("info.avatar")}}</div>
				<uni-icons class="confirm-btn" type="closeempty" @click="closeHeadPop"></uni-icons>
			</view>
			<view class="">
				<uni-grid :column="5" :showBorder="false" :square="false" style="margin: 30rpx 0;margin-left: 30rpx;">
					<uni-grid-item v-for="(item, index) in headList" :index="index" :key="index" style="width: 18%;margin-top: 20rpx;">
						<div class="flex justify-center" :style="{border: item.id===currentId? '4rpx solid #01CBA5':'',borderRadius:'8rpx',padding:'10rpx'}">
							<image style="width: 100rpx;height: 100rpx;" :src="item.url" mode="" @click="changeHeadImg(item)"></image>
						</div>
					</uni-grid-item>
				</uni-grid>
				<!-- <image v-for="item in headList" :src="item.url" mode=""></image> -->
			</view>
			<view class="mrt-40 action-btn" style="width: 90%;margin: 40rpx auto;padding-bottom: 40rpx;">
			  <button class="login-btn  block lg round" style="font-size: 30rpx;" @click="confirmHead">{{$t("com.confirm")}}</button>
			</view>
		</view>
	</uni-popup>
  </view>
</template>

<script>
  import avatarList from '@/js_sdk/avatar.js'
  import { getUserProfile,updateUserNickName } from "@/api/system/user"
  import { updateUserFile,updateUserHeadImage } from "@/api/login"

  export default {
    data() {
      return {
        user: {},
        roleGroup: "",
        postGroup: "",
		nickname: "",
		phoneNum:"",
		msgurl:null,
		currentId: 1,
		headList: avatarList,
		// headList:[{
		// 	id:1,
		// 	url: '../../../static/circle-style.png'
		// },{
		// 	id:2,
		// 	url: '../../../static/banner.png'
		// },{
		// 	id:3,
		// 	url: '../../../static/02.png'
		// },{
		// 	id:4,
		// 	url: '../../../static/banner1.png'
		// },{
		// 	id:5,
		// 	url: '../../../static/03.png'
		// },{
		// 	id:6,
		// 	url: '../../../static/04.png'
		// }],
		avatarUrl:''
      }
    },
	computed:{
		name(){
			return this.$store.state.user.name
		}
	},
    onLoad(e) {
		// console.log(this.$store.state);
		console.log(e);
		// this.nickname = this.$store.state.user.name
		this.phoneNum = e.phoneNum
      // this.getUser()
	  let _this = this
	  uni.$on('cropperedImgPath',function(res) {
	  	console.log(res)
	  	// _this.msgurl = res;
		_this.getUserFile(res)
	  });
    },
	onShow() {
		console.log(avatarList);
		this.headList = avatarList
		this.nickname = this.name
		this.avatarUrl =  uni.getStorageSync('avatarUrl')?  '../../..'+uni.getStorageSync('avatarUrl'): '../../../static/circle-style.png'
	},
    methods: {//选择模式
		showSelectPop(){
			this.$refs.modePop.open('center')
		},
		closeModePop(){
			this.$refs.modePop.close()
		},
		showHeadPop(){
			this.$refs.headPop.open('center')
		},
		closeHeadPop(){
			this.$refs.headPop.close()
		},
		//修改头像
		changeHeadImg(msg){
			console.log(msg);
			this.currentId = msg.id
		},
		confirmModel(){
			let para = {
				nikeName: this.nickname
			}
			console.log(para);
			updateUserNickName(para).then(res=>{
				console.log(res);
				this.closeModePop()
				this.$store.commit('SET_NAME',this.nickname)
			})
		},
		//切换头像
		confirmHead(){
			console.log('切换头像');
			let url = this.headList[this.currentId].url
			this.avatarUrl = url
			uni.setStorageSync('avatarUrl',url)
			this.closeHeadPop()
		},
		getUser() {
			getUserProfile().then(response => {
			  this.user = response.data
			  this.roleGroup = response.roleGroup
			  this.postGroup = response.postGroup
			})
		},
		selImg(){
			// this.$refs.headPop.open('center')
			uni.navigateTo({
				url: '/pages/mine/info/chooseImg'
			});
		},
		
		getUserFile(url){
			let para = {
				fileName: url
			}
			updateUserFile(para).then(res=>{
				console.log(res);
				// this.updateUserHeadImage()
			})
		},
		sendUserHeadImage(){
			let para = {
				headImage: null
			}
			
		}
    }
  }
</script>

<style lang="scss">
  page {
    // background-color: #ffffff;
	background-color: #F8F8F8;
  }
  .input-item {
    margin: 20px auto;
    background-color: #f5f6f7;
    height: 45px;
    border-radius: 20px;
	width: 80%;
  
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
  .avatar{
	  margin: 86rpx auto;
	  position: relative;
	  width: 200rpx;
  }
  .mine-headimage{
	  width: 200rpx;
	  height: 200rpx;
	  border-radius: 50%;
	  overflow: hidden;
	  position: relative;
  }
  .mine-pic{
	  width: 56rpx;
	  height: 56rpx;
	  position: absolute;
	  bottom: 0;
	  right: 0;
  }
  .app-version{
  	position: absolute;
  	right: 90rpx;
  	top: 50%;
  	transform: translateY(-50%);
  }
  .login-btn {
  	background-color: #01CBA5;
  	color: #ffffff;
  }
</style>
