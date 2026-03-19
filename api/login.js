import request from '@/utils/request'
import modal from '@/plugins/modal.js'
var userModule = uni.requireNativePlugin('XM-UserModule')
var platform
uni.getSystemInfo({
	success: function (res) {
		console.log(res);
		uni.setStorageSync('platform',res.platform)
		platform = res.platform 
	}
})
// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    'url': '/login',
    headers: {
      isToken: false
    },
    'method': 'post',
    'data': data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/app/register',
    headers: {
      isToken: false 
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    'url': '/getInfo',
    'method': 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    'url': '/logout',
    'method': 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    'url': '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

//检查用户是否登录
export function isLogin(){
	return new Promise((resolve,reject)=>{
		// userModule.checkUserLoginState(res=>{
		userModule.isLogin(res=>{
			if(res.success){
				return resolve(res)
			}else{
				return reject(res)
			}
		})
	})
}

//邮箱密码登录
export function emailPwdLogin(para){
	/*
	email	是	邮箱
	pwd	是	密码
	*/
	return new Promise((resolve,reject)=>{
		userModule.emailPwdLogin(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				// modal.msg(res.data)
				if(platform == 'android'){
					modal.msg(res.data)
				}else{
					modal.msg(res.data.userInfo.NSLocalizedDescription)
				}
			}
		})
	})
}

//手机号密码登录
export function phonePwdLogin(para){
	/*
	phone	是	手机号
	pwd	是	密码
	internationalCode	否	默认不传或""
	*/
	return new Promise((resolve,reject)=>{
		userModule.phonePwdLogin(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				console.log(platform);
				if(platform == 'android'){
					modal.msg(res.data)
				}else{
					modal.msg(res.data.userInfo.NSLocalizedDescription)
				}
			}
		})
	})
}

//退出登录
export function userLogout(para){
	return new Promise((resolve,reject)=>{
		userModule.userLogout(para,res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//删除账号
export function deleteUser(para){
	/*
	type	是	1-- 立即删除 2-- 7天后删除，默认为 7 天后删除
	*/
	return new Promise((resolve,reject)=>{
		userModule.deleteUser(para,res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//发送短信验证码
export function sendPhoneSmsCode(para){
	/*
	phone	是	手机号码
	internationalCode	否	国际代码，默认为国内,传"86"
	type	是	1: 注册验证码, 2: 密码重置验证码, 3: 登录验证码代码 , 4:注销账号
	ssid	否	短信签名,传入用自己的,不传默认""
	stid	否	短信模板，传入用自己的,不传默认""
	*/
	return new Promise((resolve,reject)=>{
		userModule.sendPhoneSmsCode(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.msg)
			}
		})
	})
}

//校验短信验证码
export function validateSmsCode(para){
	/*
	phone	是	手机号
	smsCode	是	验证码
	internationalCode	否	默认不传或""
	isDisabled	是	验证码验证后是否失效，1：失效 2：不失效，默认传1
	*/
	return new Promise((resolve,reject)=>{
		userModule.validateSmsCode(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.msg)
			}
		})
	})
}

//authCode登录
export function loginByAuthCode(para){
	/*
	authCode 授权code
	*/
	return new Promise((resolve,reject)=>{
		userModule.loginByAuthCode(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//手机号码注册
export function phonePwdRegister(para){
	/*
	phone	是	手机号码
	pwd	是	密码
	smsCode	是	短信验证码
	internationalCode	否	默认不传或""
	lang	否	默认不传或""
	nationality	否	默认不传或""
	timezone	否	默认不传或""
	*/
	return new Promise((resolve,reject)=>{
		userModule.phonePwdRegister(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				// modal.msg(res.msg)
				if(platform == 'android'){
					let data = JSON.parse(res.data)
					modal.msg(data.msg)
					reject(data.msg)
				}else{
					modal.msg(res.data.userInfo.NSLocalizedDescription)
					reject(res.data.userInfo.NSLocalizedDescription)
				}
				
			}
		})
	})
}

//发送邮件验证码
export function sendEmailCode(para){
	/*
	eaid	否	邮件账号
	email	是	邮箱
	etid	否	邮件模板 不传的时候传type
	type	否	etid不传，传type 1: 注册, 2: 密码重置, 3: 注销账号模板
	*/
	return new Promise((resolve,reject)=>{
		userModule.sendEmailCode(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.msg)
			}
		})
	})
}

//校验邮箱验证码
export function validateEmailCode(para){
	/*
	email	是	邮箱
	code	是	验证码
	isDisabled	是	验证码验证后是否失效，1：失效 2：不失效，默认 1 (备注:该接口只是验证注销用户时候发送的邮箱验证码)
	*/
	return new Promise((resolve,reject)=>{
		userModule.validateEmailCode(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.msg)
			}
		})
	})
}

//邮箱注册
export function emailPwdRegister(para){
	/*
	code	是	邮箱验证码
	email	是	邮箱
	pwd	是	密码
	lang	是	语言 默认传0
	nationality	是	国家 默认传0
	timezone	是	时区 默认传0
	*/
	return new Promise((resolve,reject)=>{
		userModule.emailPwdRegister(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				// modal.msg(res.msg)
				if(platform == 'android'){
					let data = JSON.parse(res.data)
					modal.msg(data.msg)
					reject(data.msg)
				}else{
					modal.msg(res.data.userInfo.NSLocalizedDescription)
					reject(res.data.userInfo.NSLocalizedDescription)
				}
			}
		})
	})
}

//手机号码重置密码
export function userPwdResetByPhone(para){
	/*
	phone	是	手机号码
	code	是	验证码
	pwd	是	密码
	internationalCode	否	默认不传或""
	*/
	return new Promise((resolve,reject)=>{
		userModule.userPwdResetByPhone(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				// modal.msg(res.msg)
				if(platform == 'android'){
				let data = JSON.parse(res.data)
					modal.msg(data.msg)
					reject(data.msg)
				}else{
					modal.msg(res.data.userInfo.NSLocalizedDescription)
					reject(res.data.userInfo.NSLocalizedDescription)
				}
			}
		})
	})
}

//邮箱重置密码
export function userPwdResetByEmail(para){
	/*
	email	是	邮箱
	code	是	邮箱验证码
	pwd	是	密码
	internationalCode	否	默认不传或""
	*/
	return new Promise((resolve,reject)=>{
		userModule.userPwdResetByEmail(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				// modal.msg(res.msg)
				if(platform == 'android'){
					let data = JSON.parse(res.data)
					modal.msg(data.msg)
					reject(data.msg)
				}else{
					modal.msg(res.data.userInfo.NSLocalizedDescription)
					reject(res.data.userInfo.NSLocalizedDescription)
				}
			}
		})
	})
}

//上传用户头像
export function updateUserFile(para){
	console.log(para);
	return new Promise((resolve,reject)=>{
		userModule.updateUserFile(para,res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//修改用户头像
export function updateUserHeadImage(para){
	return new Promise((resolve,reject)=>{
		userModule.updateUserHeadImage(para,res=>{
			console.log(res);
			return resolve(res)
		})
	})
}