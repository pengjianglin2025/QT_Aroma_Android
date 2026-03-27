<template>
	<view class="normal-login-container">
	<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" :title="$t('login')" @clickLeft="backSelmode" />
		<view class="logo-content-img">
			<view class="logo-content">
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

			<view class="login-option-row" style="color:#7F7F7F;display:flex;justify-content: space-between;align-items: center;">
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

			<view class="login-bottom-block">
				<view class="action-row">
					<view class="action-btn action-btn-main">
						<button @click="handleLogin" class="login-btn cu-btn block lg" v-if="canLogin">{{$t('login')}}</button>
						<button class="login-btn2 cu-btn block lg" v-else>{{$t('login')}}</button>
					</view>
					<view class="visitor visitor-inline flex justify-center align-center" @click="visitorLogin">
						<image style="width: 34rpx;height: 34rpx;" src="/static/visitor01.png" mode=""></image>
						<view style="margin-left: 10rpx;">{{$t('visitor')}}</view>
					</view>
				</view>
				<view class="login-secondary-link" style="margin-top: 30rpx;color: #01CBA5;text-align: right;padding-right: 50rpx;font-size: 30rpx;">
					<span @click="navToPrivacy">{{$t('Privacy')}}</span>
				</view>
				<view class="login-register-row" style="text-align: center;color:#7F7F7F;padding:20px;">
					<text>{{$t('no-account')}}</text><text style="color:#7ae7ff;" @click="handleUserRegister">{{$t('now-register')}}</text>
				</view>
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
	import { fallbackNationalityList, normalizeNationalityList } from '@/utils/nationality.js'
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
				// 鐢ㄦ埛娉ㄥ唽寮€鍏?
				register: true,
				showp: false, //鎺у埗缁勪欢寤舵椂鏄剧ず
				nationalityList: [], //鍥藉鍒楄〃
				seltctedCountry: {}, //閫変腑鐨勫浗瀹禣bject
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
			//杩斿洖妯″紡閫夋嫨鐣岄潰
			backSelmode(){
				uni.reLaunch({
					url:'/pages/selectMode'
				})
			},
			checkChange(e) {
				console.log(e.detail.value);
				//鑻ユ暟缁勯噷鏈夐暱搴﹀垯璇存槑琚€変腑
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
			//鑾峰彇鍥藉鍒楄〃
			getNationality() {
				let that = this
				queryNationalityList().then(res => {
					console.log(res);
					const list = normalizeNationalityList(res)
					that.nationalityList = list.length ? list : fallbackNationalityList
					if(!that.loginForm.internationalCode && that.nationalityList.length){
						that.seltctedCountry = that.nationalityList[0]
						that.loginForm.internationalCode = that.nationalityList[0].internationalCode
					}
				}).catch(() => {
					that.nationalityList = fallbackNationalityList
					if(!that.loginForm.internationalCode && that.nationalityList.length){
						that.seltctedCountry = that.nationalityList[0]
						that.loginForm.internationalCode = that.nationalityList[0].internationalCode
					}
				})
			},
			//閫夋嫨鍥藉
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
			//鏄剧ず閫夋嫨鍥藉寮圭獥
			showCountryPop() {
				this.showp = true
				setTimeout(() => {
					this.$refs.countryPick.showpop()
				}, 100)
			},
			//鍏抽棴閫夋嫨鍥藉寮圭獥
			closeCountryPop() {
				this.showp = false
				this.$refs.countryPick.cancel()
			},
			//蹇樿瀵嗙爜
			handleForgotPsw() {
				// this.$tab.redirectTo(`/pages/forgotpassword`)
				this.$tab.navigateTo(`/pages/forgotpassword`)
			},
			// 鐢ㄦ埛娉ㄥ唽
			handleUserRegister() {
				// this.$tab.redirectTo(`/pages/register`)
				this.$tab.navigateTo(`/pages/register`)
			},
			// 闅愮鍗忚
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 鐢ㄦ埛鍗忚
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 鑾峰彇鍥惧舰楠岃瘉鐮?
			getCode() {
				getCodeImg().then(res => {
					this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
					if (this.captchaEnabled) {
						this.codeUrl = 'data:image/gif;base64,' + res.img
						this.loginForm.uuid = res.uuid
					}
				})
			},
			// 鐧诲綍鏂规硶
			async handleLogin() {
				console.log('handleLogin...')
				if (this.loginForm.username === "") {
					this.$modal.msgError(this.$t('input-account'))
				} else if (this.loginForm.password === "") {
					this.$modal.msgError(this.$t('input-pwd'))
				}
				// else if (this.loginForm.code === "" && this.captchaEnabled) {
				//         this.$modal.msgError("璇疯緭鍏ラ獙璇佺爜")
				//       } 
				else {
					// this.$modal.loading("鐧诲綍涓紝璇疯€愬績绛夊緟...")
					// this.pwdLogin()
					if (this.loginForm.username.indexOf('@') > -1) {
						//閭瀵嗙爜鐧诲綍
						this.emailLogin()
					} else {
						//鎵嬫満鍙风爜瀵嗙爜鐧诲綍
						this.phoneLogin()
					}
				}
			},
			//鎵嬫満鍙风爜瀵嗙爜鐧诲綍
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
			//閭瀵嗙爜鐧诲綍
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
			// 瀵嗙爜鐧诲綍
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
			// 鐧诲綍鎴愬姛鍚庯紝澶勭悊鍑芥暟
			loginSuccess(result) {
				// 璁剧疆鐢ㄦ埛淇℃伅
				this.$store.dispatch('GetInfo').then(res => {
					this.$tab.reLaunch('/pages/index')
				})
			},
			visitorLogin() {
				if(!this.loginForm.internationalCode && this.nationalityList.length){
					this.seltctedCountry = this.nationalityList[0]
					this.loginForm.internationalCode = this.nationalityList[0].internationalCode
				}
				const phoneId = uni.getStorageSync('phoneId')
				if(!phoneId){
					this.$modal.msgError('phoneId缂哄け')
					return false
				}
				if(!this.loginForm.internationalCode){
					this.$modal.msgError(this.$t('select-country-area'))
					return false
				}
				let para = {
					username: phoneId,
					internationalCode: this.loginForm.internationalCode,
					password: '123456'
				}
				console.log(para);
				uni.showLoading({
					mask:true,
					title:''
				})
				register(para).then(res=>{
					console.log(res);
					uni.setStorageSync('auth_code',res.data) 
					let para = {
						authCode: res.data
					}
					loginByAuthCode(para).then(res=>{
						console.log(res);
						if(res.success){
							uni.hideLoading()
							this.loginSuccess()
						}
					}).catch((err)=>{
						console.log(err)
						uni.hideLoading()
						const message = (err && err.msg) || (err && err.data) || (typeof err === 'string' ? err : '')
						this.$modal.msgError(message ? `娓稿鐧诲綍澶辫触锛?{message}` : '娓稿鐧诲綍澶辫触锛氭巿鏉冪爜鐧诲綍澶辫触')
					})
				}).catch((err)=>{
					console.log(err)
					uni.hideLoading()
					const message = (err && err.msg) || (err && err.data) || (typeof err === 'string' ? err : '')
					this.$modal.msgError(message ? ('游客登录失败：' + message) : '游客登录失败：注册失败')
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #07111f;
	}

	.normal-login-container {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background:
			radial-gradient(circle at 16% 14%, rgba(64, 233, 214, 0.18), transparent 26%),
			radial-gradient(circle at 84% 18%, rgba(87, 134, 255, 0.2), transparent 22%),
			linear-gradient(180deg, #07111f 0%, #0a1730 48%, #08111f 100%);

		.logo-content-img {
			flex-shrink: 0;
			height: 250rpx;
			margin: 94rpx 24rpx 0;
			border-radius: 34rpx;
			background:
				linear-gradient(180deg, rgba(13, 29, 56, 0.82) 0%, rgba(10, 23, 43, 0.65) 100%),
				url('../static/login-bg.png');
			background-size: cover;
			background-position: center;
			position: relative;
			overflow: hidden;
			border: 1px solid rgba(124, 219, 255, 0.12);
			box-shadow: 0 28rpx 70rpx rgba(0, 0, 0, 0.28);
		}

		.logo-content-img>.logo-content {
			position: absolute;
			left: 36rpx;
			right: 36rpx;
			bottom: 44rpx;
			color: #ffffff;
			font-size: 38rpx;
			line-height: 1.22;
			font-weight: 700;
			text-shadow: 0 10rpx 30rpx rgba(0,0,0,0.2);
		}

		.lc2 {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 34rpx;
			background: linear-gradient(180deg, rgba(8,17,31,0) 0%, rgba(8,17,31,0.85) 100%);
		}

		.login-form-content {
			margin: 0 auto;
			margin-top: 10rpx;
			padding-left: 24rpx;
			padding-right: 24rpx;
			padding-bottom: 14rpx;
			color: #dce9f9;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;


			.icon-left {
				padding-right: 40rpx;
			}

			.icon-left::after {
				content: "\e7eb";
				color: grey;
			}

			.input-item {
				margin: 10rpx auto 14rpx;
				background: linear-gradient(180deg, rgba(13, 28, 50, 0.88) 0%, rgba(9, 20, 38, 0.82) 100%);
				height: 78rpx;
				border-radius: 22rpx;
				border: 1px solid rgba(125, 214, 255, 0.12);
				box-shadow: 0 14rpx 28rpx rgba(0, 0, 0, 0.18);

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #93a8c0;
				}

				.input {
					width: 100%;
					font-size: 28rpx;
					line-height: 40rpx;
					text-align: left;
					padding-left: 15px;
					color: #f4fbff;
				}

			}

			.login-btn {
				margin-top: 0;
				width: 100%;
				height: 78rpx;
				background: linear-gradient(135deg, #3df0d7 0%, #2f86ff 100%);
				color: #ffffff;
				border-radius: 24rpx;
				box-shadow: 0 18rpx 34rpx rgba(55, 184, 255, 0.26);
			}

			.login-btn2 {
				margin-top: 0;
				width: 100%;
				height: 78rpx;
				background: rgba(105, 121, 142, 0.4);
				color: rgba(255,255,255,0.65);
				border-radius: 24rpx;
			}

			.login-option-row{
				width: 100%;
				padding: 4rpx 0 0;
			}

			.action-row{
				display: flex;
				align-items: center;
				gap: 18rpx;
				margin-top: 0;
				width: 100%;
			}

			.action-btn-main{
				flex: 1;
			}

			.login-bottom-block{
				width: 100%;
				margin-top: 16rpx;
				padding: 0;
				display: flex;
				flex-direction: column;
				align-items: stretch;
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
	.visitor{
		background: linear-gradient(135deg, rgba(55, 240, 212, 0.24), rgba(38, 123, 255, 0.28));
		border: 1px solid rgba(123, 221, 255, 0.2);
		border-radius: 24rpx;
		color: #fff;
		text-align: center;
		width: 50%;
		height: 74rpx;
		line-height: 74rpx;
		margin: auto;
		margin-top: 16rpx;
		box-shadow: 0 16rpx 30rpx rgba(0,0,0,0.16);
	}
	.visitor-inline{
		flex: 1;
		margin: 0;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 24rpx;
		background: rgba(19, 41, 72, 0.88);
		border: 1px solid rgba(123, 221, 255, 0.16);
		box-shadow: 0 14rpx 28rpx rgba(0,0,0,0.14);
		font-size: 26rpx;
	}
	.login-secondary-link{
		width: 100%;
		text-align: center !important;
		padding-right: 0 !important;
		font-size: 28rpx !important;
		margin-top: 18rpx !important;
	}
	.login-register-row{
		width: 100%;
		text-align: center !important;
		padding: 14rpx 0 0 !important;
		color: #8aa3bf !important;
		font-size: 28rpx;
	}
</style>
