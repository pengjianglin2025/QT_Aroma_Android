import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const device = {
	state:{
		// colorList: storage.get(colorList)
		deviceName:'',//当前进入界面的设备名称
		bleDeviceList:uni.getStorageSync('bleDeviceList')? uni.getStorageSync('bleDeviceList'):[],//本地蓝牙设备列表
		deviceId: '',//当前连接蓝牙的设备id
		searchBleList:[], //搜索到的设备列表
		// workModelHexStr:'',//工作模式16进制 007805000d3b01000a0005017f0000000001000a0078027b0200080001000a0078037f0200170000000a0078047903000f0701000a0078
		workModelHexStr:'007805000d3b01000a0005017f0000000001000a0078027b0200080001000a0078037f0200170000000a0078047903000f0701000a0078',//工作模式16进制 
		isbleInit: false,//蓝牙模块是否初始化，即有无进入过蓝牙搜索页面，进入过的话在蓝牙主页就不需要初始化。(若不加入这个判断，直接进入蓝牙主页的时候蓝牙没有初始化会连接失败，进入过搜索页面代表已经初始化过了)
		businessCache: null,//当前设备属性列表缓存，在发送指令的时候缓存一下，配合 标识符 判断修改的是哪个指令，根据时间戳判断是否发生改变，若改变则不提示，否则提示 操作超时
		marks: null,//标识符
		isOffline: false,//设备是否处于离线状态
		pauseTimeMin: 5, //暂停时间最小值
		pauseTimeMax: 500, //暂停时间最大值
		workTimeMin: 5, //工作时间最小值
		workTimeMax: 500, //工作时间最大值
		workStep: 5, //步长
		is24hour: uni.getStorageSync('is24hour')|| 1, //时间是否为24小时制。1-24小时 2-12小时
		testlogger:[] //给彭工提供的测试日志数组
	},
	mutations:{
		SET_TESTLOGGER(state,testlogger){
			state.testlogger = testlogger
		},
		SET_IS24HOUR(state,is24hour){
			state.is24hour = is24hour
			uni.setStorageSync('is24hour',is24hour)
		},
		//设置暂停时间最小值
		SET_PAUSETIMEMIN(state,pauseTimeMin){
			state.pauseTimeMin = pauseTimeMin
			console.log('暂停最小值',state.pauseTimeMin);
		},
		//设置暂停时间最大值
		SET_PAUSETIMEMAX(state,pauseTimeMax){
			state.pauseTimeMax = pauseTimeMax
			console.log('暂停最大值',pauseTimeMax);
		},
		//设置工作时间最小值
		SET_WORKTIMEMIN(state,workTimeMin){
			console.log('工作最小值',workTimeMin);
			state.workTimeMin = workTimeMin
		},
		//设置工作时间最大值
		SET_WORKTIMEMAX(state,workTimeMax){
			console.log('工作最大值',workTimeMax);
			state.workTimeMax = workTimeMax
		},
		SET_WORKSTEP(state,workStep){
			console.log('步长',workStep);
			state.workStep = workStep
		},
		SET_MARK(state,mark){
			state.marks = mark
		},
		SET_BUSINESSCACHE(state,businessCache){
			state.businessCache = businessCache
		},
		SET_BLEDEVICELIST(state,list){
			console.log('接收到新的list......',list);
			if(uni.getStorageSync('bleDeviceList')){
				state.bleDeviceList = uni.getStorageSync('bleDeviceList')
			}
			state.bleDeviceList.push(list) 
			uni.setStorageSync('bleDeviceList',state.bleDeviceList)
			// storage.set('bleDeviceList',state.bleDeviceList)
			// state.bleDeviceList = list
			// storage.set('bleDeviceList',list)
		},
		//移除蓝牙设备
		DELETE_BLEDEVICELIST(state,bleDevId){
			console.log(state.bleDeviceList);
			let idx = state.bleDeviceList.findIndex(ite=>{
				return ite.deviceId === bleDevId
			})
			state.bleDeviceList.splice(idx,1)
			uni.setStorageSync('bleDeviceList',state.bleDeviceList)
			// console.log(idx);
			// console.log(bleDevId);
		},
		SET_SEARCHBLELIST(state,searchBleList){
			console.log('搜索到的蓝牙设备列表......',searchBleList);
			state.searchBleList = searchBleList
		},
		SET_MOMDELSTR(state,modelStr){
			state.workModelHexStr = modelStr
		},
		SET_DEVICEID(state,deviceId){
			state.deviceId = deviceId
		},
		SET_ISBLEINIT(state,isbleInit){
			state.isbleInit = isbleInit
		},
		SET_DEVICENAME(state,deviceName){
			console.log('我修改了名称');
			state.deviceName = deviceName
		},
		SET_OFFLINE(state,status){
			console.log('修改状态被执行');
			state.isOffline = status
		}
	},
	actions:{
		SetState({ commit }, status) {
			console.log('异步修改状态');
		    commit('SET_OFFLINE', status)
		}
	}
}

export default device