
var configModule = typeof plus !== 'undefined' ? uni.requireNativePlugin('XM-ConfigModule') : null
import modal from '@/plugins/modal.js'

//开始配网
export function startConfigDevices(para){
	/*
	list	是	扫描到的设备列表
	ssid	是	ssid
	password	是	password
	*/
	return new Promise((resolve,reject)=>{
		configModule.startConfigDevices(para,res=>{
			console.log(res);
			if(res.success){
				return resolve(res)
			}else{
				reject(res.msg)
				modal.msg(res.msg)
			}
		})
	})
}