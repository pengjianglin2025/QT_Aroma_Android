import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const ivy06 = {
	state:{
		parameterMode: 0, //参数运行模式 0：简单模式；1：专业模式
		gearNum: 5, //简单模式下香氛浓度模式个数  数值为几代表有几个香氛浓度模式 范围1-15
		curGear: 3, //当前香薰浓度
		simpleMode: 0 //简单模式下参数  P1，P2:定时时间: P1高八位，P2低八位；P3:香氛浓度模式（数值为几代表运行第几种香氛浓度）
	},
	mutations:{
		SET_PARAMETERMODE(state,parameterMode){
			state.parameterMode = parameterMode
		},
		SET_CURGEAR(state,curGear){
			state.curGear = curGear
		},
		SET_GEARNUM(state,gearNum){
			state.gearNum = gearNum
		},
		SET_SIMPLEMODE(state,simpleMode){
			state.simpleMode = simpleMode
		}
	},
	actions:{
		
	}
}

export default ivy06