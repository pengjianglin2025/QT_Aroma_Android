
var deviceModule = uni.requireNativePlugin('XM-QuectelDeviceModule')
var configModule = uni.requireNativePlugin('XM-ConfigModule')
import modal from '@/plugins/modal.js'

var platform
uni.getSystemInfo({
	success: function (res) {
		uni.setStorageSync('platform',res.platform)
		platform = res.platform 
	}
})

//使用SN绑定设备
export function bindDeviceSn(para){
	/*
	pk	是	设备pk
	sn	是	设备sn
	deviceName	否	默认不传或""
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.bindDeviceSn(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//使用SN绑定设备
export function unBindDevice(para){
	/*
	pk	是	设备productKey
	dk	是	设备DeviceKey
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.unBindDevice(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//查询用户设备列表
export function queryUserDeviceList(para){
	/*
	page	是	分页查询当前页
	pageSize	是	每页多少条
	deviceName	否	设备名称
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.queryUserDeviceList(para,res=>{
			// console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//查询设备组列表
export function queryDeviceGroupList(para){
	/*
	page	是	页码
	pageSize	是	每页条数size
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.queryDeviceGroupList(para,res=>{
			// console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//查询设备组中的设备列表
export function getGroupDeviceList(para){
	/*
	dgid	是	设备组的dgid
	pk	是	pk
	page	是	数据页码,哪一页
	pageSize	是	每页多少条size
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.getGroupDeviceList(para,res=>{
			// console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//添加设备组
export function addDeviceGroup(para){
	/*
	name	是	设备group 的名字
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.addDeviceGroup(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//修改设备组
export function updateDeviceGroup(para){
	/*
	name	是	设备group 的名字
	dgid	是	设备组的dgid
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.updateDeviceGroup(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//删除设备组
export function deleteDeviceGroup(para){
	/*
	dgid	是	设备组ID
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.deleteDeviceGroup(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//查询不在设备组内的设备列表
export function getDeviceListByNotInDeviceGroup(para){
	/*
	dgid	是	设备组ID
	page	是	当前页，默认为第 1 页
	pageSize	是	页大小，默认为 10 条
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.getDeviceListByNotInDeviceGroup(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//添加设备到设备组中
export function addDeviceToGroup(para){
	/*
	dgid	是	设备组的dgid
	list	是	要添加的设备信息列表
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.addDeviceToGroup(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//移除设备组中的设备
export function deleteDeviceToGroup(para){
	/*
	dgid	是	设备组ID
	list	是	要移除的设备的信息集合列表
	*/
    console.log(para);
	return new Promise((resolve,reject)=>{
		deviceModule.deleteDeviceToGroup(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//查询设备组详情
export function queryDeviceGroup(para){
	/*
	dgid	是	设备组的dgid
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.queryDeviceGroup(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}
 
//查询设备信息
export function queryDeviceInfo(para){
	/*
	pk	是	Product Key，配合 dk，和分享码二选一
	dk	是	Device Key，配合 pk，和分享码二选一
	shareCode	否	分享码，和 pk、dk 二选一，被分享人使用分享码查询设备信息
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.queryDeviceInfo(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//修改设备信息 deviceName
export function changeDeviceInfo(para){
	/*
	deviceName	是	设备名称
	dk	是	device key
	pk	是	product key
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.changeDeviceInfo(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.msg)
			}
		})
	})
}

//查询物模型 TSL
export function queryProductTSL(para){
	/*
	pk	是	productKey
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.queryProductTSL(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//查询设备业务属性
export function queryBusinessAttributes(para){
	/*
	codeList	否	要查询的属性标识符; 和查询类型配合使用，如果传null 查询所有属性，同时typeList也传null
	pk	是	pk
	dk	是	dk
	gatewayPk	否	网关设备pk 没有传空字符串""
	gatewayDk	否	网关设备dk 没有传空字符串""
	typeList	否	查询类型 1 查询设备基础属性 2 查询物模型属性 3 查询定位信息
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.queryBusinessAttributes(para,res=>{
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//监听设备
export function startChannel(para){
	/*
	pk	是	pk
	dk	是	dk
	list:
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.startChannel(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//取消监听设备
export function closeChannel(para){
	/*
	pk	是	pk
	dk	是	dk
	*/
	return new Promise((resolve,reject)=>{
		deviceModule.closeChannel(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

export function deviceWriteDps(para){
	/*
	pk	是	pk
	dk	是	dk
	sendMode: 0-自动 1-wifi 3-蓝牙 
	list:[{
		dataType: "1", 	1-BOOL布尔型 2-INT整数型 3-FLOAT浮点数型 4-DOUBLE 5-ENUM 6-TEXT 7-DATE 8-STRUCT 9-ARRAY
		code: 0,
		id: 1,
		value: JSON.parse(params.switch.switch) 
	}]
	注意：如果为数组形则最外层的格式dataType为9，value内的数组格式为数组内的数据格式。如[1,2,3,4],则value内的dataType为2
	*/
   console.log(para);
	return new Promise((resolve,reject)=>{
		deviceModule.deviceWriteDps(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				modal.msg(res.data)
			}
		})
	})
}

//批量控制设备
export function batchControlDevice(para){
	/*
	type	是	1：透传 2：属性 3：服务
	data	是	属性bool int float double enum date text" [{"key":"value"}]" 属性array "[{"key":[{"id":"value1"},{"id":"value2"}]}]"（id为0） 属性struct "[{"key":[{"key1":"value1"},{"key2":"value2"}]}]" 属性array含有struct "[{"key":[{"id":[{"key1":"value1"}]},{"id":[{"key2":"value2"}]}]}]"（id为0）
	| | dataFormat |是|数据类型 1：Hex 2：Text （当 type 为透传时，需要指定 dataFormat） 默认传2 | | isCache |是| 是否启用缓存 1：启用 2：不启用 http下发要启用, 默认传1 | | isCover |是| 是否覆盖之前发送的相同的命令 1：覆盖 2：不覆盖，默认不覆盖，启用缓存时此参数有效 默认传 2 不覆盖 | | cacheTime |是| 缓存时间，单位为秒，缓存时间范围 1-7776000 秒，启用缓存时必须设置缓存时间 | | deviceList |是| 要控制的设备的列表list |
	*/
   // console.log(para);
	return new Promise((resolve,reject)=>{
		deviceModule.batchControlDevice(para,res=>{
			// console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				reject(res.msg)
				modal.msg(res.msg)
			}
		})
	})
}