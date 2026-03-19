<script>
  import config from './config'
  import store from '@/store'
  // import { getToken } from '@/utils/auth'
  import { getToken, setCountryCode } from '@/api/system/user.js'
  import { isLogin } from '@/api/login.js'
  import { mapGetters } from 'vuex'
  
  export default {
    onLaunch: function() {
		plus.screen.lockOrientation('portrait-primary'); // 强制竖屏
      this.initApp()
	  uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('platform',res.platform)
			if(!uni.getStorageSync('phoneId')){
				//保存手机设备id（uniapp自动生成）
				uni.setStorageSync('phoneId',res.deviceId)
			}
		}
	  })
    },
	computed:{
		...mapGetters(['testlogger'])
	},
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
		this.checkmode()
		 // this.checkLogin()
		 console.log(uni.getStorageSync('internationalCode').internationalCode);
		 if(uni.getStorageSync('internationalCode')){
			 let countryCode = uni.getStorageSync('internationalCode').internationalCode
			 this.setCountry(countryCode)
		 }
        //#ifdef H5
        
        //#endif
      },
      initConfig() {
        this.globalData.config = config
      },
	  //设置国家码
	  setCountry(code) {
	  	let para = {
	  		internationalCode: code
	  	}
	  	setCountryCode(para).then(res=>{
	  		console.log('设置国家码成功，当前国家码为：',code);
	  	})
	  },
	  //根据模式跳转
	  checkmode(){
		  let lastMode = uni.getStorageSync('lastmode')||null
		  let bleDeviceList = uni.getStorageSync('bleDeviceList')
		  if(lastMode&&lastMode=='wifi'){
			  this.checkLogin()
		  }else if(lastMode&&lastMode=='ble'){
			  if(bleDeviceList.length>0){
			  	this.$tab.reLaunch('/pages/blemodule/index')
			  }else{
			  	this.$tab.reLaunch('/pages/blemodule/searchble/login') 
			  }
		  }
	  },
	  //是否登录
      checkLogin() {
		isLogin().then(res=>{
			console.log(res);
			if(res.data || res.success){
				this.$tab.reLaunch('/pages/index')
			}else{
				// this.$tab.reLaunch('/pages/login') 
				this.$tab.navigateTo('/pages/login') 
			}
		  }).catch(err=>{
			console.log(err);
			this.$tab.reLaunch('/pages/login') 
			// this.$tab.reLaunch('/pages/index')
		})
        // if (!getToken()) {
        //   this.$tab.reLaunch('/pages/login') 
        // }
      },
	  //写入值
	  writeData(deviceId,data,ischeck,word){
		  uni.showLoading({
		  	mask:true,
			title:''
		  })
		  // let loggerList = this.testlogger
		  setTimeout(()=>{
			  uni.hideLoading()
		  },1000)
	  	//data:16进制字符串， ischeck:是否为查询指令
	  	let _this = this
	  	/*  格式为 帧头(2byte) 0x55aa + 
	  		版本(1byte) 0x00 + 
	  		命令字(1byte) 0x06 +
	  		数据长度(2byte) 0x0000 +
	  		数据 n +
	  		校验和(1byte) 从帧头开始，按字节求和，得出的结果对 256 求余
	  	*/
	     /*
	  	数据部分
	  		tslid(1/2byte) 物模型 功能 ID,大端传输.占用的字节数可由查询产品信息的 tslid字段确定。
	  		type(1byte)：
	  			type 	数据类型    字节数  说明
	  			0x00 	Raw 		N 对应 	RAW 物模型，用于上报/下发纯二进制数据
	  			0x01 	Bool 		1 对应 	Bool 物模型，范围：0x00/0x0
	  			0x02 	Value 		4 对应 	Int 或者枚举 物模型，采用大端表
	  			0x03 	String 		N 对应 	TEXT
	  			0x05 	FAULT 		1/2/4 	会将数据的每一 Bit 作为 bool 型上报，如上报长度大于 1字节时，大端表示
	  			0x11 	Double 		8 Byte 	大端，对应 Double/Float 类物模型，用于传递小数（Float类物模型需要强转为 Double 格式），遵循格式与 C 语言遵循的 IEEE 754 标准一致
	  			0x12 	Struct 		L Byte 	对应结构体/数组类型物模型，该类物模型为多种物模型的组合。L 为结构体所有成员依序排列后所占用的字节长度。
	  		len(2byte) 对应value字节数
	  		value(1/2/4/N/L)  用16 进制表示，大于 1 字节采用大端传输
	     */
		let comword = word||'06'//命令字，默认06
	  	let head = '55AA00'+comword
	  	let len = (data.length/2).toString(16)
	  	//补齐2byte长度
	  	len = len.length<2? '000'+len:len.length<3? '00'+len:len.length<4? '0'+len:len 
	  	// 校验和
	  	let check = _this.checkByte(head+len+data)
	  	let buffer
	  	if(ischeck){
	  		buffer = _this.hexStr2Arrbuff('55AA0008000007')
			//下面代码是彭工需要测试的发送日志，不需要直接注释
			// loggerList.push('send===========>55AA0008000007')
			// this.$store.commit('SET_TESTLOGGER',loggerList)
	  	}else{
	  		console.log('发送的16进制数据...',head+len+data+check);
	  		buffer = _this.hexStr2Arrbuff(head+len+data+check)
			//下面代码是彭工需要测试的发送日志，不需要直接注释
			// loggerList.push('send===========>'+head+len+data+check)
			// this.$store.commit('SET_TESTLOGGER',loggerList)
	  	}
	  	uni.writeBLECharacteristicValue({
	  	  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
	  	  deviceId,
	  	  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
	  	  serviceId:'0000FFF0-0000-1000-8000-00805F9B34FB',
	  	  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
	  	  characteristicId:'0000FFF2-0000-1000-8000-00805F9B34FB',
	  	  // 这里的value是ArrayBuffer类型
	  	  value: buffer,
	  	  success(res) {
	  	    console.log('writeBLECharacteristicValue success', res.errMsg)
	  	  }
	  	})
	  },
	  //状态数据单元
	  dataHexStr(dpid,type,value){
	  	// 参数参考上面的 数据部分
	  	let len = (value.length/2).toString(16)
	  	//补齐2byte长度
	  	len = len.length<2? '000'+len:len.length<3? '00'+len:len.length<4? '0'+len:len 
	  	let instruct = dpid + type + len + value
	  	return instruct
	  },
	  //校验数据
	  checkByte(str){
	  	let byteList = this.str2byte(str)
	  	let sumNum=0
	  	for(let i in byteList){
	  		byteList[i] = parseInt(byteList[i],16)
	  	}
	  	for(let i in byteList){
	  		sumNum+=byteList[i]
	  	}
	  	let num = (sumNum%256).toString(16)
	  	num = num.length<2? '0'+ num:num
	  	return num
	  },
	  //16进制字符串转byte数组
	  str2byte(data){
	  	let byteNum = data.length/2
	  	let newArr = []
	  	for(let i=0;i<byteNum;i++){
	  		newArr.push(data.substring(i*2,i*2+2))
	  	}
	  	return newArr
	  },
	  //16进制转换为二进制数组
	  hexStr2Arrbuff(buffer){
	  	 let typedArray = new Uint8Array(buffer.match(/[\da-f]{2}/gi).map(function (h) {
	  	   return parseInt(h, 16)
	  	 }))
	  	 let bufferarr = typedArray.buffer
	  	 console.log(bufferarr)
	  	 return bufferarr
	  },
	  //二进制数组转换为16进制
	  ab2hex(buffer){
	    const hexArr = Array.prototype.map.call(new Uint8Array(buffer),
	     function(bit){
	  	 return ('00' + bit.toString(16)).slice(-2) 
	    }) 
	     return hexArr.join('') 
	  },
    }
  }
</script>

<style lang="scss">
  @import '@/static/scss/index.scss'
</style>
