import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const device = {
	state: {
		deviceName: '',
		bleDeviceList: uni.getStorageSync('bleDeviceList') ? uni.getStorageSync('bleDeviceList') : [],
		deviceId: '',
		searchBleList: [],
		workModelHexStr: '007805000d3b01000a0005017f0000000001000a0078027b0200080001000a0078037f0200170000000a0078047903000f0701000a0078',
		isbleInit: false,
		businessCache: null,
		marks: null,
		isOffline: false,
		pauseTimeMin: 5,
		pauseTimeMax: 500,
		workTimeMin: 5,
		workTimeMax: 500,
		workStep: 5,
		parameterMode: 0,
		gearNum: 5,
		simpleMode: 0,
		curGear: 1,
		is24hour: uni.getStorageSync('is24hour') || 1,
		testlogger: []
	},
	mutations: {
		SET_TESTLOGGER(state, testlogger) {
			state.testlogger = testlogger
		},
		SET_IS24HOUR(state, is24hour) {
			state.is24hour = is24hour
			uni.setStorageSync('is24hour', is24hour)
		},
		SET_PAUSETIMEMIN(state, pauseTimeMin) {
			state.pauseTimeMin = pauseTimeMin
			console.log('pause min', state.pauseTimeMin)
		},
		SET_PAUSETIMEMAX(state, pauseTimeMax) {
			state.pauseTimeMax = pauseTimeMax
			console.log('pause max', pauseTimeMax)
		},
		SET_WORKTIMEMIN(state, workTimeMin) {
			console.log('work min', workTimeMin)
			state.workTimeMin = workTimeMin
		},
		SET_WORKTIMEMAX(state, workTimeMax) {
			console.log('work max', workTimeMax)
			state.workTimeMax = workTimeMax
		},
		SET_WORKSTEP(state, workStep) {
			console.log('work step', workStep)
			state.workStep = workStep
		},
		SET_PARAMETERMODE(state, parameterMode) {
			state.parameterMode = parameterMode
		},
		SET_GEARNUM(state, gearNum) {
			state.gearNum = gearNum
		},
		SET_SIMPLEMODE(state, simpleMode) {
			state.simpleMode = simpleMode
		},
		SET_CURGEAR(state, curGear) {
			state.curGear = curGear
		},
		SET_MARK(state, mark) {
			state.marks = mark
		},
		SET_BUSINESSCACHE(state, businessCache) {
			state.businessCache = businessCache
		},
		SET_BLEDEVICELIST(state, list) {
			console.log('receive new ble device', list)
			if (uni.getStorageSync('bleDeviceList')) {
				state.bleDeviceList = uni.getStorageSync('bleDeviceList')
			}
			state.bleDeviceList.push(list)
			uni.setStorageSync('bleDeviceList', state.bleDeviceList)
		},
		DELETE_BLEDEVICELIST(state, bleDevId) {
			console.log(state.bleDeviceList)
			let idx = state.bleDeviceList.findIndex(ite => {
				return ite.deviceId === bleDevId
			})
			state.bleDeviceList.splice(idx, 1)
			uni.setStorageSync('bleDeviceList', state.bleDeviceList)
		},
		SET_SEARCHBLELIST(state, searchBleList) {
			console.log('search ble list', searchBleList)
			state.searchBleList = searchBleList
		},
		SET_MOMDELSTR(state, modelStr) {
			state.workModelHexStr = modelStr
		},
		SET_DEVICEID(state, deviceId) {
			state.deviceId = deviceId
		},
		SET_ISBLEINIT(state, isbleInit) {
			state.isbleInit = isbleInit
		},
		SET_DEVICENAME(state, deviceName) {
			console.log('update device name')
			state.deviceName = deviceName
		},
		SET_OFFLINE(state, status) {
			console.log('update offline status')
			state.isOffline = status
		}
	},
	actions: {
		SetState({ commit }, status) {
			console.log('async update offline status')
			commit('SET_OFFLINE', status)
		}
	}
}

export default device
