<template>
	<view class="normal-login-container">
	<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" :title="$t('login')" @clickLeft="backSelmode" />
		<view class="logo-content-img">
			<view class="logo-content">
				<view>{{$t('hello')}}，</view>
				<view>{{$t('welcome')}} Aroma Buddy</view>
			</view>
			<view class="lc2"></view>
		</view>
		<view class="login-form-content">
			<view>{{$t('area')}}</view>
			<view class="input-item flex align-center iconfont icon-left" @click="showCountryPop">
				<div class="input" :style="{color: seltctedCountry.val? '':'grey'}">
					{{seltctedCountry.val? seltctedCountry.val:$t('select-area')}}
				</div>
			</view>
			<view>{{$t('phone-email')}}</view>
			<view class="input-item flex align-center">
				<input v-model="loginForm.username" class="input" type="text" :placeholder="$t('input-phone-email')" maxlength="30"	@input="checkIput" />
			</view>
			<view>{{$t('pwd')}} </view>
			<view class="input-item flex align-center" style="position: relative;">
				<input v-model="loginForm.password" :type="pswType" class="input" :placeholder="$t('input-pwd')" maxlength="20"	@input="checkIput" />
				<uni-icons v-if="pswType=='text'" class="wifi-icon" color="#7f7f7f" style="position: absolute;right: 40rpx;" type="eye" size="20" @click="pswType='password'"></uni-icons>
				<uni-icons v-if="pswType=='password'" class="wifi-icon" color="#7f7f7f" style="position: absolute;right: 40rpx;" type="eye-slash" size="20" @click="pswType='text'"></uni-icons>
			</view>

			<view style="color:#7F7F7F;display:flex;justify-content: space-between;align-items: center;">
				<checkbox-group  @change="checkChange">
					<label >
						<checkbox style="transform: scale(0.6);" :checked="mindPwd" activeBackgroundColor="#7F7F7F" iconColor="#fff"/>{{$t('remember-pwd')}}
					</label>
				</checkbox-group>
				<!-- <view>
					<uv-checkbox-group>
						<uv-checkbox :name="$t('remember-pwd')" :label="$t('remember-pwd')" @change="checkChange" :checked="mindPwd" activeColor="#7F7F7F" labelColor="#7F7F7F"></uv-checkbox>
					</uv-checkbox-group>
				</view> -->
				<view><text @click="handleForgotPsw">{{$t('forget-pwd')}}?</text></view>
			</view>

			<view class="action-btn">
				<button @click="handleLogin" class="login-btn cu-btn block lg" v-if="canLogin">{{$t('login')}}</button>
				<button class="login-btn2 cu-btn block lg" v-else>{{$t('login')}}</button>
			</view>
			<view style="margin-top: 30rpx;color: #01CBA5;text-align: right;padding-right: 50rpx;font-size: 30rpx;">
				<span @click="navToPrivacy">{{$t('Privacy')}}</span>
			</view>
			<view style="text-align: center;color:#7F7F7F;padding:20px;">
				<text>{{$t('no-account')}}？</text><text style="color:#01CBA5;" @click="handleUserRegister">{{$t('now-register')}}</text>
			</view>
			<view class="other-login">
				or
			</view>
			<view class="flex justify-center align-center visitor" @click="visitorLogin">
				<image style="width: 40rpx;height: 40rpx;" src="/static/visitor01.png" mode=""></image>
				<view style="margin-left: 10rpx;">{{$t('visitor')}}</view>
			</view>
		<!-- 	<view style="margin-top: 82rpx;text-align: center;">
				<view style="display: inline-block;" @click="visitorLogin">
					<image class="visitor-logo" src="../static/visitor.png" mode=""></image>
					<view style="margin-top: 5px;color: #7F7F7F;">{{$t('visitor')}}</view>
				</view>
			</view> -->
		</view>
		<Mypicker v-if="showp" :list="nationalityList" @myselect="selCountry" searchKey='val' :title="$t('select-area')" ref="countryPick"></Mypicker>
	</view>
</template>

<script>
	import Mypicker from '@/components/my-picker/index.vue'
	import {
		getCodeImg,
		emailPwdLogin,
		phonePwdLogin,
		register,
		loginByAuthCode
	} from '@/api/login'
	import {
		queryNationalityList,
		queryLanguageList,
		setCountryCode
	} from '@/api/system/user.js'
	export default {
		components: {
			Mypicker
		},
		data() {
			return {
				// appName: this.$t('app-name'),
				mindPwd: false,
				canLogin: true,
				codeUrl: "",
				captchaEnabled: true,
				// 用户注册开关
				register: true,
				showp: false, //控制组件延时显示
				nationalityList: [], //国家列表
				seltctedCountry: {}, //选中的国家Object
				globalConfig: getApp().globalData.config,
				loginForm: {
					// username: "admin",
					// password: "admin123",
					// username: "13480559267",
					// password: "123456",
					username: "",
					password: "",
					internationalCode: '',
					code: "",
					uuid: ''
				},
				pswType: 'password'
			}
		},
		created() {
			this.getNationality()
		},
		onShow() {
			if (uni.getStorageSync('account')) {
				this.loginForm.username = uni.getStorageSync('account')
			}
			if (uni.getStorageSync('internationalCode')) {
				this.seltctedCountry = uni.getStorageSync('internationalCode')
				this.loginForm.internationalCode = uni.getStorageSync('internationalCode').internationalCode
			}
			if (uni.getStorageSync('password')) {
				this.loginForm.password = uni.getStorageSync('password')
			}
			console.log(uni.getStorageSync('rememberPsw'));
			if (uni.getStorageSync('rememberPsw')) {
				this.mindPwd = uni.getStorageSync('rememberPsw')
			}
		},
		methods: {
			navToPrivacy(){
				this.$tab.navigateTo('/pages/privacy')
			},
			//返回模式选择界面
			backSelmode(){
				uni.reLaunch({
					url:'/pages/selectMode'
				})
			},
			checkChange(e) {
				console.log(e.detail.value);
				//若数组里有长度则说明被选中
				const ischeck = e.detail.value.length
				if(ischeck==0){
					this.mindPwd = false
				}else{
					this.mindPwd = true
				}
				uni.setStorageSync('rememberPsw',this.mindPwd)
			},
			checkIput(e) {
				if (this.loginForm.username && this.loginForm.password) {
					this.canLogin = true;
				} else {
					this.canLogin = false;
				}
			},
			//获取国家列表
			getNationality() {
				let that = this
				queryNationalityList().then(res => {
					console.log(res);
					that.nationalityList = res.data
					// console.log(that.nationalityList);
				})
			},
			//选择国家
			selCountry(e) {
				console.log(e);
				this.seltctedCountry = e
				this.loginForm.internationalCode = e.internationalCode
				let para = {
					internationalCode: e.internationalCode
				}
				setCountryCode(para).then(res=>{
					console.log(res);
				})
			},
			//显示选择国家弹窗
			showCountryPop() {
				this.showp = true
				setTimeout(() => {
					this.$refs.countryPick.showpop()
				}, 100)
			},
			//关闭选择国家弹窗
			closeCountryPop() {
				this.showp = false
				this.$refs.countryPick.cancel()
			},
			//忘记密码
			handleForgotPsw() {
				// this.$tab.redirectTo(`/pages/forgotpassword`)
				this.$tab.navigateTo(`/pages/forgotpassword`)
			},
			// 用户注册
			handleUserRegister() {
				// this.$tab.redirectTo(`/pages/register`)
				this.$tab.navigateTo(`/pages/register`)
			},
			// 隐私协议
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 获取图形验证码
			getCode() {
				getCodeImg().then(res => {
					this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
					if (this.captchaEnabled) {
						this.codeUrl = 'data:image/gif;base64,' + res.img
						this.loginForm.uuid = res.uuid
					}
				})
			},
			// 登录方法
			async handleLogin() {
				console.log('handleLogin...')
				if (this.loginForm.username === "") {
					this.$modal.msgError(this.$t('input-account'))
				} else if (this.loginForm.password === "") {
					this.$modal.msgError(this.$t('input-pwd'))
				}
				// else if (this.loginForm.code === "" && this.captchaEnabled) {
				//         this.$modal.msgError("请输入验证码")
				//       } 
				else {
					// this.$modal.loading("登录中，请耐心等待...")
					// this.pwdLogin()
					if (this.loginForm.username.indexOf('@') > -1) {
						//邮箱密码登录
						this.emailLogin()
					} else {
						//手机号码密码登录
						this.phoneLogin()
					}
				}
			},
			//手机号码密码登录
			phoneLogin() {
				let para = {
					phone: this.loginForm.username,
					pwd: this.loginForm.password,
					internationalCode: this.loginForm.internationalCode
				}
				phonePwdLogin(para).then(res => {
					uni.setStorageSync('internationalCode', this.seltctedCountry)
					uni.setStorageSync('account', this.loginForm.username)
					console.log(this.mindPwd);
					if(this.mindPwd){
						uni.setStorageSync('password', this.loginForm.password)
					}else{
						uni.removeStorageSync('password')
					}
					this.loginSuccess()
				})
			},
			//邮箱密码登录
			emailLogin() {
				let para = {
					email: this.loginForm.username,
					pwd: this.loginForm.password,
					internationalCode: this.loginForm.internationalCode,
				}
				emailPwdLogin(para).then(res => {
					console.log(res);
					uni.setStorageSync('internationalCode', this.seltctedCountry) 
					uni.setStorageSync('account', this.loginForm.username)
					if(this.mindPwd){
						uni.setStorageSync('password', this.loginForm.password)
					}else{
						uni.removeStorageSync('password')
					}
					this.loginSuccess()
				})
			},
			// 密码登录
			async pwdLogin() {
				this.$store.dispatch('Login', this.loginForm).then(() => {
					this.$modal.closeLoading()
					this.loginSuccess()
				}).catch(() => {
					if (this.captchaEnabled) {
						this.getCode()
					}
				})
			},
			// 登录成功后，处理函数
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then(res => {
					this.$tab.reLaunch('/pages/index')
				})
			},
			visitorLogin() {
				// uni.showToast({
				// 	title: this.$t('not-open')
				// })
				if(!this.loginForm.internationalCode){
					this.$modal.msgError(this.$t('select-country-area'))
					return false
				}
				let para = {
					username: uni.getStorageSync('phoneId'),
					internationalCode: this.loginForm.internationalCode,
					password: '123456'
				}
				console.log(para);
				register(para).then(res=>{
					console.log(res);
					uni.setStorageSync('auth_code',res.data) 
					let para = {
						authCode: res.data
					}
					loginByAuthCode(para).then(res=>{
						console.log(res);
						if(res.success){
							this.loginSuccess()
						}
					})
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #ffffff;
	}

	.normal-login-container {

		.logo-content-img {
			// margin-top: 106rpx;
			// width: 690rpx;
			// height: 390rpx;
			// width:100%;
			height: 160px;
			background-image: url('../static/login-bg.png');
			position: relative;
		}

		.logo-content-img>.logo-content {
			position: absolute;
			left: 20px;
			bottom: 60px;
			color: #ffffff;
			font-size: 20px;
		}

		.lc2 {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 30px;
			background-color: #ffff;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
		}

		.login-form-content {
			margin: 0 auto;
			// width: 80%;
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

			.login-code {
				height: 38px;
				float: right;

				.login-code-img {
					height: 38px;
					position: absolute;
					margin-left: 10px;
					width: 200rpx;
				}
			}
		}
	}

	.visitor-logo {
		width: 66rpx;
		height: 66rpx;
	}
	.other-login{
		position: relative;
		text-align: center;
		color: #dfdfdf;
		
		::after{
			
		}
	}
	.other-login::before{
		content: '';
		display: inline-block;
		position: absolute;
		width: 40%;
		height: 4rpx;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #dfdfdf;
	}
	.other-login::after{
		content: '';
		display: inline-block;
		position: absolute;
		width: 40%;
		height: 2rpx;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: #dfdfdf;
	}
	.visitor{
		background-color: #01CBA5;
		// padding: 30rpx 50rpx;
		border-radius: 20rpx;
		color: #fff;
		text-align: center;
		width: 50%;
		height: 90rpx;
		line-height: 90rpx;
		margin: auto;
		margin-top: 40rpx;
	}
</style>