<template>
	<view class="mine-container" :style="{height: `${windowHeight}px`}">
		<!--顶部个人信息栏-->
		<view class="header-section">
			<view class="flex padding justify-between">
				<view class="flex align-center">
					<view v-if="!avatar" class="cu-avatar xl round bg-white">
						<view class="iconfont icon-people text-gray icon"></view>
					</view>
					<!-- <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix"></image> -->
					<!-- <view v-if="!name" @click="handleToLogin" class="login-tip">
						点击登录
					</view> -->
					<!-- <view v-if="name" @click="handleToInfo" class="user-info">
						<view class="u_title">
							{{ name }}
						</view>
						<view class="u_title" style="font-size: 32rpx;">
							{{phone}}
						</view>
					</view> -->
				</view>
				<!-- <view @click="handleToInfo"></view> -->
			</view>
		</view>
		<view class="lc2"></view>
		<view class="list-con" style="">
			<view class="list-nav" @click="hanleSelectLanguage">
				<view class="flex">
					<image class="mine-icon" src="../../static/images/lang.png" mode=""></image>
					<view>{{$t('mine.language-settings')}}</view>
				</view>
				<view>
					<uni-icons type="right" size="20" color="#989898"></uni-icons>
				</view>
			</view>
			<view class="list-nav" @click="handleAbout">
				<view class="flex">
					<image class="mine-icon" src="../../static/images/about.png" mode=""></image>
					<view>{{$t('mine.about-us')}}</view>
				</view>
				<view>
					<uni-icons type="right" size="20" color="#989898"></uni-icons>
				</view>
			</view>
			<view class="list-nav" @click="handleVersion">
				<view class="flex">
					<image class="mine-icon" src="../../static/images/version.png" mode=""></image>
					<view>{{$t('mine.version')}}</view>
				</view>
				<view style="display: flex;align-items: center;">
					V{{version}}.{{appVersionCode}}
					<uni-icons type="right" size="20" color="#989898"></uni-icons>
				</view>
			</view> 
			<view class="list-nav" @click="hanleSelectHour">
				<view class="flex">
					<image class="mine-icon" src="../../static/images/clock.png" mode=""></image>
					<view>{{$t('timeshow')}}</view>
				</view>
				<view style="display: flex;align-items: center;">
					{{is24hour==1? '24H':'12H'}}
					<uni-icons type="right" size="20" color="#989898"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="timepopup" type="dialog" >
			<view class="locale-list" style="width:200px;backgroundColor:#FFFFFF;border-radius: 20rpx;">
				<view style="text-align: center;font-weight: bold;padding: 20upx;">{{$t('timeshow')}}</view>
			   <uni-list>
				   <template>
					   <uni-list-item title="24H" :clickable="true" @click="changeTimemap(1)"/>
					   <uni-list-item title="12H" :clickable="true" @click="changeTimemap(2)"/>
				   </template>
			   </uni-list>
			 </view>
		</uni-popup>
		<uni-popup ref="popup" type="dialog" >
			 <view class="locale-list" style="width:200px;backgroundColor:#FFFFFF;border-radius: 20rpx;">
				<view style="text-align: center;font-weight: bold;padding: 20upx;">{{$t('mine.select-language')}}</view>
			   <uni-list>
				   <template v-for="(item, index) in locales">
					   <uni-list-item :title="item.text" :clickable="true" @click="onLocaleChange(item)"/>
				   </template>
			   </uni-list>
			 </view>
		</uni-popup>
		<view class="tabbar">
			<uni-grid :column="2" :showBorder="false"  :square="false">
				<uni-grid-item style="height: 100rpx;">
					<view class="grid-item-box" style="background-color: #fff;" @click="navToMine()">
						<image class="tabbar-img" src="../../static/images/tabbar/index.png" mode=""></image>
						<text class="text">{{$t('index.home')}}</text>
					</view>
				</uni-grid-item>
				<uni-grid-item style="height: 100rpx;">
					<view class="grid-item-box" style="background-color: #fff;">
						<image class="tabbar-img" src="../../static/images/tabbar/mysel.png" mode=""></image>
						<text class="text" style="color: #00CB74;">{{$t('index.setting')}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		queryUserInfo
	} from "../../api/system/user.js"
	export default {
		data() {
			return {
				name: 'Mammy',
				// name: this.$store.state.user.name,
				// version: getApp().globalData.config.appInfo.version,
				version: '',
				appVersionCode: null,
				phone: '18088880000'
			}
		},
		computed: {
			locales() {
			  return [  {
			      text: this.$t('locale.en'),
			      code: 'en'
			    },
			    {
			      text: this.$t('locale.zh-hans'),
			      code: 'zh-Hans'
			    },
				{
				  text: this.$t('locale.ar'),
				  code: 'ar'
				},
				{
				  text: this.$t('locale.es'),
				  code: 'es'
				},
				{
				  text: this.$t('locale.fr'),
				  code: 'fr'
				},
				{
				  text: this.$t('locale.de'),
				  code: 'de'
				},
				{
				  text: this.$t('locale.ru'),
				  code: 'ru'
				},
			    // {
			    //   text: this.$t('locale.zh-hant'),
			    //   code: 'zh-Hant'
			    // }
			  ]
			},
			avatar() {
				// return this.$store.state.user.avatar
				return '../../static/images/profile.jpg'
			},
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight - 50
			},
			is24hour(){
				return this.$store.state.device.is24hour
			}
		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res.appVersion)
					that.version = res.appVersion
					that.appVersionCode = res.appVersionCode
				}
			});
		},
		methods: {
			hanleSelectHour(){
				this.$refs.timepopup.open('center')
			},
			changeTimemap(e){
				this.$store.commit('SET_IS24HOUR',e)
				this.$refs.timepopup.close()
			},
			//跳转到'主界面'
			navToMine(){
				this.$tab.reLaunch('/pages/blemodule/index')
			},
			handleToInfo() {
				// this.$tab.navigateTo('/pages/mine/info/index')
				// uni.navigateTo({
				// 	url: '/pages/mine/info/index?phoneNum=' + this.phone,
				// })
			},
			handleToEditInfo() {
				this.$tab.navigateTo('/pages/mine/info/edit')
			},
			handleToSetting() {
				this.$tab.navigateTo('/pages/mine/setting/index')
			},
			handleToLogin() {
				this.$tab.reLaunch('/pages/login')
			},
			handleToAvatar() {
				//this.$tab.navigateTo('/pages/mine/avatar/index')
			},
			hanleSelectLanguage() {
				this.$refs.popup.open()
			},
			handleVersion(){
				this.$modal.showToast(this.$t('cur-version') + ':V'+this.version)
			},
			handleHelp() {
				this.$tab.navigateTo('/pages/mine/help/index')
			},
			handleAbout() {
				this.$tab.navigateTo('/pages/mine/about/index')
			},
			onLocaleChange(e) {
			  uni.setLocale(e.code);
			  this.$i18n.locale = e.code;
			  this.$refs.popup.close()
			},
			handleLogout() {
				const that = this;
				uni.showModal({
				  title: this.$t('sytem-tip'),
				  content: this.$t('confirm-logout'),
				  cancelText: this.$t('com.cancel'),
				  confirmText: this.$t('com.confirm'),
				  success: function(res) {
				    if (res.confirm) {
				      that.$store.dispatch('LogOut').then(() => {
				      	// that.$tab.reLaunch('/pages/login')
				      	that.$tab.reLaunch('/pages/selectMode')
				      })
				    }
				  }
				})
				
				// this.$modal.confirm('确定注销并退出系统吗？').then(() => {
				// 	this.$store.dispatch('LogOut').then(() => {
				// 		this.$tab.reLaunch('/pages/login')
				// 	})
				// })
			},
		}
	}
</script>

<style lang="scss">
	page {
		// background-color: #f5f6f7;
		background-color: #fff;
	}

	.menu-item-box {
		position: relative;
	}

	.mine-icon {
		width: 44rpx;
		height: 44rpx;
		margin-left: 10rpx;
		margin-right: 36rpx;
	}

	.title-cell {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		color: #333;
		// padding: 13px 15px;
		padding-top: 62rpx;
		padding-left: 40rpx;
		padding-bottom: 20rpx;
		font-size: 36rpx;
	}

	.edit-btn {
		display: inline-block;
		padding: 16rpx 30rpx;
		background-color: #FEE349;
		color: #FF6939;
		border-radius: 34rpx;
	}

	.mine-container {
		width: 100%;
		height: 100%;


		.header-section {
			padding: 15px 15px 45px 15px;
			// background-color: #3c96f3;
			padding-top: 128rpx;
			padding-bottom: 150rpx;
			// background-color: #FF6939;
			// background: url('../../static/images/minebg.png')50% 50%/2000rpx no-repeat;
			color: white;
			background-image: url('../../static/minebg.png');
			background-repeat: no-repeat;
			background-size: cover;

			.login-tip {
				font-size: 18px;
				margin-left: 10px;
			}

			.cu-avatar {
				border: 2px solid #eaeaea;

				.icon {
					font-size: 40px;
				}
			}

			.user-info {
				margin-left: 15px;

				.u_title {
					font-size: 40rpx;
					line-height: 30px;
				}
			}
		}

		.lc2 {
			// position: absolute;
			// left: 0;
			// bottom: 0;
			width: 100%;
			height: 30px;
			background-color: #ffffff;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			margin-top: -30px;
		}

		.list-con {
			padding-left: 20rpx;
			padding-right: 20rpx;
		}

		.list-nav {
			display: flex;
			justify-content: space-between;
			box-shadow: 2rpx 2rpx 10rpx #eeeeee;
			margin-bottom: 40rpx;
			padding: 26rpx 30rpx;
		}

		.content-section {
			position: relative;
			width: 100%;
			margin: 0;
			// top: -50px;
			border-radius: 40rpx 40rpx 0 0;
			overflow: hidden;
			padding-left: 20rpx;
			padding-right: 20rpx;


			.mine-actions {
				margin: 15px 15px;
				padding: 20px 0px;
				border-radius: 8px;
				background-color: white;

				.action-item {
					.icon {
						font-size: 28px;
					}

					.text {
						display: block;
						font-size: 13px;
						margin: 8px 0px;
					}
				}
			}
		}
	}

	.list-cell {
		box-shadow: 2rpx 2rpx 10rpx #eeeeee;
		margin-top: 40rpx;
	}


	.app-version {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.action-btn{
		padding:0 30rpx;
	}
	.login-btn {
		margin-top: 40px;
		height: 45px;
		background-color: red;
		color: #ffffff;
		border-radius: 10px;
	}
	.tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		font-size: 20rpx;
		border-top: 2rpx solid #d9d9d9;
	}
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.tabbar-img{
		width: 48rpx;
		height: 48rpx;
	}
</style>