import store from '@/store/index.js'
import messages from '../locale/index'

let localelang = uni.getLocale()
let newlan = messages[localelang]

// 初始化蓝牙设备
export function openBluetoothAdapter() {
	uni.openBluetoothAdapter({
		success: e => {
			console.log('初始化蓝牙成功:' + e.errMsg)
			console.log(JSON.stringify(e))
			getBluetoothAdapterState();
		},
		fail: e => {
			console.log(e)
			console.log(localelang)
			console.log('初始化蓝牙失败，错误码：' + (e.errCode || e.errMsg))
			if(e.errCode == '10001'){
				uni.showModal({
				    title: newlan.tipstitle,
				    content: newlan.bleconnetText,
				    // content: 'BBQ Dance想要开启蓝牙',
					// showCancel: false,
					cancelText: newlan.allow,
					confirmText: newlan.reject,
				    success: function (res) {
				        if (res.confirm) {
							// console.log('用户点击拒绝');
							// #ifdef APP-PLUS  
							plus.runtime.quit();  
							// #endif
				        } else if (res.cancel) {
				            // console.log('用户点击允许');
				            if(plus.os.name == 'iOS'){
				            	plus.runtime.openURL("app-settings:")
				            	// plus.runtime.openURL("app-Prefs:root=WIFI")
				            }else{
				            	var main = plus.android.runtimeMainActivity(); //获取activity  
				            	var Intent = plus.android.importClass('android.content.Intent');  
				            	var Settings = plus.android.importClass('android.provider.Settings');  
				            	var intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);//可设置表中所有Action字段  
				            	main.startActivity(intent);
				            }
				        }
				    }
				});
			}
		}
	});
}

/**
 * 获取本机蓝牙适配器状态
 */
function getBluetoothAdapterState() {
	uni.getBluetoothAdapterState({
		success: res => {
			//discovering:是否正在搜索设备,available:蓝牙适配器是否可用
			// console.log(res);
			if(res.available){
			 	startBluetoothDevicesDiscovery()
			}
		},
		fail: e => {
			console.log('获取本机蓝牙适配器状态失败，错误码：' + e.errCode);
			if (e.errCode !== 0) {
				// initTypes(e.errCode);
			}
		}
	});
}

/**
 * 开始搜索蓝牙设备
 */
function startBluetoothDevicesDiscovery() {
	uni.startBluetoothDevicesDiscovery({
		success: e => {
			console.log('开始搜索蓝牙设备:' + e.errMsg);
			onBluetoothDeviceFound();
		},
		fail: e => {
			console.log('搜索蓝牙设备失败，错误码：' + e.errCode);
			if (e.errCode !== 0) {
				// initTypes(e.errCode);
			}
		}
	});
}

/**
 * 停止搜索蓝牙设备
 */
export function stopBluetoothDevicesDiscovery() {
	uni.stopBluetoothDevicesDiscovery({
		success: e => {
			console.log('停止搜索蓝牙设备:' + e.errMsg);
		},
		fail: e => {
			console.log('停止搜索蓝牙设备失败，错误码：' + e.errCode);
			if (e.errCode !== 0) {
				// initTypes(e.errCode);
			}
		}
	});
}

/**
 * 发现外围设备
 */
function onBluetoothDeviceFound() {
	// store.state.bleList = []
	uni.onBluetoothDeviceFound(devices => {
		console.log(devices)
		// console.log('开始监听寻找到新设备的事件');
		// console.log(devices.devices[0].name) 
		if(devices.devices[0].name.indexOf('BT-ivy')>-1){//产品名：BT-ivy84D8
			getBluetoothDevices()
		}
	});
}

/**
 * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
 */
function getBluetoothDevices() {
	uni.getBluetoothDevices({
		success: res => {
			console.log('=======================获取蓝牙设备成功:================================' + res.errMsg);
			console.log(res)
			let GATTBleList = res.devices.filter(item=>{
				// console.log(item.name)
				if(item.name.indexOf('BT-ivy')>-1){
					 // item.advertisData = ab2hex(item.advertisData)
					 return item
				}
			})
			if(store.state.device.bleDeviceList.length>0){
				for(let i in GATTBleList){
					for(let k in store.state.device.bleDeviceList){
						if(JSON.stringify(GATTBleList[i].deviceId) === JSON.stringify(store.state.device.bleDeviceList[k].deviceId)){
							GATTBleList.splice(i,1)
						}
					}
				}
			}
			console.log(GATTBleList)
			console.log(store.state.device.bleDeviceList)
			if(GATTBleList){
				store.commit('SET_SEARCHBLELIST',GATTBleList)
				// if(!uni.getStorageSync('device.bleDeviceList')&&uni.getStorageSync('reLaunchFlag')==1){
				// 	uni.reLaunch({
				// 		url:'/pages/deviceList/deviceList'
				// 	})
				// }
			}else{
				// store.state.bleList = []
			}
		},
		fail: e => {
			console.log('获取蓝牙设备错误，错误码：' + e.errCode);
			if (e.errCode !== 0) {
				// initTypes(e.errCode);
			}
		}
	})
}