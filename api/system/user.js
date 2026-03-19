import upload from '@/utils/upload'
import request from '@/utils/request'
var userModule = uni.requireNativePlugin('XM-UserModule')


// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}

//修改昵称
export function updateUserNickName(para){
	/*
	nikeName
	*/
	return new Promise((resolve,reject)=>{
		userModule.updateUserNickName(para,res=>{
			console.log(res);
			return resolve(res)
		})
	})
}


//查询国家列表
export function queryNationalityList(){
	return new Promise((resolve,reject)=>{
		userModule.queryNationalityList(res=>{
			// console.log(res);
			return resolve(res)
		})
	})
}

//设置当前国家码
export function setCountryCode(para){
	return new Promise((resolve,reject)=>{
		userModule.setCountryCode(para,res=>{
			return resolve(res)
		})
	})
}

//查询语言列表
export function queryLanguageList(){
	return new Promise((resolve,reject)=>{
		console.log('语言列表');
		userModule.queryLanguageList(res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//查询用户信息
export function queryUserInfo(){
	return new Promise((resolve,reject)=>{
		userModule.queryUserInfo(res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//获取用户token
export function getToken(){
	return new Promise((resolve,reject)=>{
		userModule.getToken(res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//清除本地 token
export function clearToken(){
	return new Promise((resolve,reject)=>{
		userModule.clearToken(res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

//退出登录
export function userLogout(){
	return new Promise((resolve,reject)=>{
		userModule.userLogout(res=>{
			console.log(res);
			return resolve(res)
		})
	})
}

