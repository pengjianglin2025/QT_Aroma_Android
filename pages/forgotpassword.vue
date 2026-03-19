<template>
	<view class="normal-login-container">
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
			<view>{{$t('phone-email')}} </view>
			<view class="input-item flex align-center">
				<input v-model="registerForm.account" class="input" type="text" :placeholder="$t('input-phone-email')" maxlength="30"
					@input="checkIput" />
			</view>
			<view>{{$t('pwd')}} </view>
			<view class="input-item flex align-center">
				<input v-model="registerForm.password" type="password" class="input" :placeholder="$t('input-pwd')"
					maxlength="20" @input="checkIput" />
			</view>
			<view>{{$t('confirm-pwd')}} </view>
			<view class="input-item flex align-center">
				<input v-model="registerForm.confirmPassword" type="password" class="input" :placeholder="$t('input-confirm-pwd')"
					maxlength="20" @input="checkIput" />
			</view>

			<view>{{$t('verification-code')}} </view>
			<view style="display: flex;justify-content: space-between;">
				<view class="input-item flex align-center" style="margin-left: 0px;">
					<input v-model="registerForm.code" type="number" class="input" maxlength="6" :placeholder="$t('input-verification-code')" />
				</view>
				<view class="login-code">
					<div class="login-code-img" v-if="timeNum==60" @click="getCode">{{sendText}}</div>
					<div class="login-code-img" v-else>{{sendText}}</div>
				</view>

			</view>


			<view class="action-btn">
				<button @click="handleReset" class="login-btn cu-btn block lg" v-if="canReset" :loading="canClick" :disabled="canClick">{{$t('reset-pwd')}}</button>
				<button class="login-btn2 cu-btn block lg" v-else>{{$t('reset-pwd')}}</button>
			</view>
		</view>
		<Mypicker v-if="showp" :list="nationalityList" @myselect="selCountry" searchKey='val' :title="$t('select-area')"
			ref="countryPick"></Mypicker>
	</view>
</template>

<script>
	import {
		queryNationalityList,
		setCountryCode
	} from '@/api/system/user.js'
	import {
		sendPhoneSmsCode,
		sendEmailCode,
		userPwdResetByPhone,
		userPwdResetByEmail
	} from '@/api/login.js'
	import Mypicker from '@/components/my-picker/index.vue'
	export default {
		components: {
			Mypicker
		},
		data() {
			return {
				canClick: false,
				appName: this.$t('app-name'),
				canReset: false,
				showp: false,
				seltctedCountry: {}, //选中的国家Object
				nationalityList: [], //国家列表
				captchaEnabled: true,
				sendText:  this.$t('send'),
				timeNum: 60, //倒计时,单位(s)
				downTimer: null, //倒计时定时器
				registerForm: {
					// account: "735855874@qq.com",
					// password: "123456",
					account: "",
					password: "",
					confirmPassword: "",
					code: "",
					internationalCode: "86",
					uuid: ''
				}
			}
		},
		created() {
			this.getNationality()
		},
		methods: {
			checkIput(e) {
				if (this.registerForm.account && this.registerForm.password && this.registerForm.confirmPassword) {
					this.canReset = true;
				} else {
					this.canReset = false;
				}
			},
			//获取国家列表
			getNationality() {
				let that = this
				queryNationalityList().then(res => {
					console.log(res);
					that.nationalityList = res.data
					console.log(that.nationalityList);
				})
			},
			//选择国家
			selCountry(e) {
				console.log(e);
				this.seltctedCountry = e
				this.registerForm.internationalCode = e.internationalCode
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
			//获取验证码
			getCode() {
				if (this.registerForm.account === "") {
					this.$modal.msg(this.$t('input-account'))
					return false
				}
				if (this.registerForm.internationalCode === "") {
					this.$modal.msg(this.$t('select-country-area'))
					return false
				}
				if (this.registerForm.account.indexOf('@') > -1) {
					// 邮箱验证码
					this.getEmailCode()
				} else {
					//手机验证码
					this.getphoneCode()
				}
				this.downTimer = setInterval(() => {
					if (this.timeNum > 0) {
						this.sendText = this.timeNum--
						// console.log(this.sendText);
					} else {
						this.timeNum = 60
						this.sendText = this.$t('send')
						clearInterval(this.downTimer)
					}
				}, 1000)
			},
			//获取邮箱注册验证码
			getEmailCode() {
				let para
				// if(uni.getLocale().indexOf('zh')>-1){
				if(this.registerForm.internationalCode=='86'||this.registerForm.internationalCode=='852'||this.registerForm.internationalCode=='853'||this.registerForm.internationalCode=='886'){
					para = {
						eaid: 'C2',
						email: this.registerForm.account,
						internationalCode: this.registerForm.internationalCode,
						type: 2,
						etid: 'C2'
					}
				}else if(this.registerForm.internationalCode=='1'){
					para = {
						eaid: 'U1',
						email: this.registerForm.account,
						internationalCode: this.registerForm.internationalCode,
						type: 1,
						etid: 'U1'
					}
				}else{
					para = {
						eaid: 'E2',
						email: this.registerForm.account,
						internationalCode: this.registerForm.internationalCode,
						type: 2,
						etid: 'E2'
					}
				}
				sendEmailCode(para).then(res => {
					this.$modal.msg(this.$t('success'))
				})
			},
			//获取手机号码注册验证码
			getphoneCode() {
				let para = {
					phone: this.registerForm.account,
					internationalCode: this.registerForm.internationalCode,
					type: 2
				}
				sendPhoneSmsCode(para).then(res => {
					this.$modal.msg(this.$t('success'))
				})
			},
			//邮箱重置密码
			emailReset() {
				let para = {
					email: this.registerForm.account,
					code: this.registerForm.code,
					pwd: this.registerForm.password,
					internationalCode: this.registerForm.internationalCode,
				}
				userPwdResetByEmail(para).then(res => {
					// let data = res.data
					// if (data.code == 200) {
					if (res.success) {
						this.$modal.msg(this.$t('reset-success'))
						this.canClick = false
						this.handleUserLogin()
					} else {
						this.$modal.msg(data.msg)
					}
				}).catch(err=>{
					this.canClick = false
				})
			},
			//手机号码重置密码
			phoneReset() {
				let para = {
					phone: this.registerForm.account,
					code: this.registerForm.code,
					pwd: this.registerForm.password,
					internationalCode: this.registerForm.internationalCode,
				}
				userPwdResetByPhone(para).then(res => {
					// let data = res.data
					// if (data.code == 200) {
					if (res.success) {
						this.$modal.msg(this.$t('reset-success'))
						this.canClick = false
						this.handleUserLogin()
					} else {
						this.$modal.msg(data.msg)
					}
				}).catch(err=>{
					this.canClick = false
				})
			},
			// 用户登录
			handleUserLogin() {
				this.$tab.redirectTo(`/pages/login`)
			},
			// 注册方法
			async handleReset() {
				if (this.registerForm.account === "") {
					this.$modal.msgError(this.$t('input-account'))
				} else if (this.registerForm.password === "") {
					this.$modal.msgError(this.$t('input-pwd'))
				} else if (this.registerForm.confirmPassword === "") {
					this.$modal.msgError(this.$t('input-confirm-pwd'))
				} else if (this.registerForm.password !== this.registerForm.confirmPassword) {
					this.$modal.msgError(this.$t('two-pwd-not-same'))
				} else if (this.registerForm.code === "" && this.captchaEnabled) {
					this.$modal.msgError(this.$t('input-verification-code'))
				} else {
					this.canClick = true
					if (this.registerForm.account.indexOf('@') > -1) {
						// 邮箱重置密码
						this.emailReset()
					} else {
						//手机号码重置密码
						this.phoneReset()
					}
				}
			}
		}
	}
</script>

<style lang="scss">
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
				// float: right;

				.login-code-img {
					// height: 76rpx;
					// position: absolute;
					// margin-left: 20rpx;
					width: 180rpx;
					line-height: 76rpx;
					text-align: center;
					color: #fff;
					background-color: #FF8158;
					border-radius: 40rpx;
					margin-top: 15px;

				}
			}
		}
	}
</style>