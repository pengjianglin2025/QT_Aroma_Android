import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import device from '@/store/modules/device.js'
import ivy07 from '@/store/modules/ivy07.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
	device,
	ivy07
  },
  getters
})

export default store
