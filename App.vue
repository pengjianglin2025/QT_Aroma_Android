<script>
  import config from './config'
  import store from '@/store'
  // import { getToken } from '@/utils/auth'
  import { getToken, setCountryCode } from '@/api/system/user.js'
  import { isLogin } from '@/api/login.js'
  import { mapGetters } from 'vuex'
  
  export default {
    globalData: {
      config: null,
      bleWriteLoadingTimer: null,
      bleWritePending: false
    },
    onLaunch: function() {
		if (typeof plus !== 'undefined' && plus.screen) {
			plus.screen.lockOrientation('portrait-primary'); // 闁诲孩顔栭崰鏍箹椤愶箑鏄ユ俊銈呭暟閸楁岸鏌″畵顔兼噺缂?
		}
      this.initApp()
	  uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('platform',res.platform)
			if(!uni.getStorageSync('phoneId')){
				//濠电儑绲藉ú锔炬崲閸岀偞鍋ら柕濞炬櫅缁犮儵鎮楅敐搴′簼缂併劍宀搁幃瑙勬媴閻熸澘濮㈠銈忓閹妿闂備焦瀵х粙鎴濐熆閸炲常app闂備胶鍘ч〃搴㈢濠婂嫭鍙忛柍鍝勬噺閸嬨劑鏌ｉ弮鍌ょ劸闁诲繐娲弻?
				uni.setStorageSync('phoneId',res.deviceId)
			}
		}
	  })
    },
	computed:{
		...mapGetters(['testlogger'])
	},
    methods: {
      // 闂備礁鎲＄敮妤冩崲閸岀儑缍栭柟鐗堟緲缁€宀勬煛瀹擃喖鎳庨悾銊╂⒑?
      initApp() {
        // 闂備礁鎲＄敮妤冩崲閸岀儑缍栭柟鐗堟緲缁€宀勬煛瀹擃喖鎳庨悾銊╂⒑濞茬粯濞囬柛鏃€鍨垮畷銏ゅΧ閸モ晝锛?
        this.initConfig()
        // 婵犵妲呴崑鈧柛瀣崌閺岋紕浠︾拠鎻掑Б闂佽桨闄嶉崐婵嬬嵁鐎ｎ偒妲归幖娣焺娴狀噣鎮峰鍛暭婵炲弶绮嶉幈銊╁箹娴ｅ摜鐣?
		this.checkmode()
		 // this.checkLogin()
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
	  //闂佽崵濮崇粈浣规櫠娴犲鍋柛鈩冪☉閻愬﹪鏌﹀Ο渚▓闁哥啿鍋撻梻?
	  setCountry(code) {
	  	let para = {
	  		internationalCode: code
	  	}
	  	setCountryCode(para).then(res=>{
  	  		console.log('setCountryCode success', code);
	  	})
	  },
	  //闂備礁鎼粔鐑斤綖婢跺﹦鏆ゅù锝堝€介悢鐓庣伋鐎规洖娲ㄩ、鍛存煟閻樺弶鎯堥柣銈呮搐闇?
	  checkmode(){
		  if (typeof plus === 'undefined') {
			  return
		  }
		  let lastMode = uni.getStorageSync('lastmode')||null
		  let bleDeviceList = uni.getStorageSync('bleDeviceList') || []
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
	  //闂備礁鎼€氱兘宕规导鏉戠畾濞撴埃鍋撻柟顖氬€婚幏鐘绘嚑椤掑倐?
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
	  //闂備礁鎲￠崝鏍偡閵夆晛鐭楅柛鈩冪☉绾?
	  writeData(deviceId,data,ischeck,word,silent){
		  if(!silent){
			  this.startBleWriteLoading()
		  }
	  //data:16闂佸搫顦弲婊呯矙閹达箑鏄ユ俊銈呭暊閸嬫挸鈽夊▎妯荤暭濡炪倖鍨抽悞锔剧矙婢跺本瀚氱憸蹇曠矆?ischeck:闂備礁鎼€氱兘宕规导鏉戠畾濞达絽婀遍埢鏃堟煟閹寸儐鐒介柛娆屽亾闂佽崵濮村ú銏ゅ垂閾忓厜鍋撻崹顐ゎ暡缂?
	  	let _this = this
	  	/*  闂備礁鎼粔鍫曞储瑜忓Σ鎰板焺閸愵亖鏋?闂佹眹鍩勯崹搴ㄥ礃閿旇法鐭?2byte) 0x55aa + 
	  		闂備胶绮〃鍛存偋婵犲偊鑰?1byte) 0x00 + 
	  		闂備礁鎲＄粙鎺楀垂濠靛绠柕鍫濇礌閸?1byte) 0x06 +
	  		闂備浇妗ㄩ懗鑸垫櫠濡も偓閻ｅ灚绗熼埀顒€顫忚ぐ鎺戝瀭妞ゆ梻鈷堥崬?2byte) 0x0000 +
	  		闂備浇妗ㄩ懗鑸垫櫠濡も偓閻?n +
	  		闂備礁鎼粙鍕崲濠靛鍋樻繛鍡樻尭濡?1byte) 濠电偛顕慨瀛橆殽閹间礁绠慨姗嗗幖缁剁偤鏌℃径瀣仼缁炬崘顕ч埞鎴︻敊绾板崬鍔€缂備浇椴哥换鍫ョ嵁閹邦厼绶炲┑鐘插閹插姊洪悡搴㈡儓闁稿﹤缍婇幆鍥ㄥ閺夋垶銇濋悗鍏夊亾閻庯綆鍓涢ˇ顕€鎮楅悽闈涱暭妞ゃ劌鎳樺畷鐢割敇閵忊€冲壄闂佸憡娲﹂崢鎯р枖閵忋倖鐓涢悗锝庡亞閻﹥銇?256 婵犳鍠氶幊鎾诲磹妞嬪海绀?
	  	*/
	     /*
	  	闂備浇妗ㄩ懗鑸垫櫠濡も偓閻ｅ灚绗熼埀顒勫蓟閸儱惟闁靛鍎抽埀?
	  		tslid(1/2byte) 闂備胶绮妵娑㈠疾濠婂棗鏆為梻?闂備礁鎲″濠氬窗閺囥垹绀?ID,濠电姰鍨归悥銏ゅ椽娴ｉ纾藉┑鐐殿棎閸嬫劖鎱ㄩ崜褎顐?闂備礁鎲￠〃鍫熸叏閻戣棄鏋侀柕鍫濐槹閸庡秹鏌涢弴銊ヤ簽闁圭晫鍠栭弻銈夊传閸曨偀鍋撹ぐ鎺戞辈闁绘梻鍘ч惌妤併亜閺嶃劎鐭嬮柡鍡欏█閺岋紕浠︾拠鎻掑Г濡炪倖娲橀〃鍡欑矉瀹ュ牜妲婚梺閫涘尃閸曨厸鏀抽梺鏂ユ櫅閸熲晝妲愰弽顓熺厽?tslid闂佽瀛╃粙鎺椼€冮崱娑辨晩鐎光偓閳ь剙鈽夐悽鍓叉晩闁兼祴鏅滃В搴ㄦ⒑?
	  		type(1byte)闂?
	  			type 	闂備浇妗ㄩ懗鑸垫櫠濡も偓閻ｅ灚鎷呴搹鐟版殫闁荤姴娲╃亸娆撳焵?   闂佽瀛╃粙鎺椼€冩径瀣╃箚妞ゆ挶鍨归弸? 闂佽崵濮村ú銈夋偤閵娿儙?
	  			0x00 	Raw 		N 闂佽娴烽弫鎼佸箠閹炬儼濮?	RAW 闂備胶绮妵娑㈠疾濠婂棗鏆為梻浣规偠閸斿矂顢栭幋鐘愁潟婵犻潧顑嗛崑銊╂煏婵炲灝鈧鎳濋幆褉妲堥柟鍓ь劜閺€璇测攽?濠电偞鍨堕幐鎼侇敄閸涜埇浜归柛灞剧矌濡垱銇勯弽銊ф噮闁谎冪焸瀵爼鍩￠崒婧炬闂佺硶鏅滈〃濠傤嚕椤愶附鍋嬮柛顐ｇ箘閵?
	  			0x01 	Bool 		1 闂佽娴烽弫鎼佸箠閹炬儼濮?	Bool 闂備胶绮妵娑㈠疾濠婂棗鏆為梻浣规偠閸斿矂顢栭幋鐘愁潟婵犻潧顑嗛崵鎴︽煕閹扳晛濡界紒缁㈠灦閺?x00/0x0
	  			0x02 	Value 		4 闂佽娴烽弫鎼佸箠閹炬儼濮?	Int 闂備胶鎳撻悺銊╂偋閻愬搫鐒垫い鎺嗗亾闁瑰啿绻橀幃姗€宕堕妸褉鏋?闂備胶绮妵娑㈠疾濠婂棗鏆為梻浣规偠閸斿矂顢栭幋鐘愁潟婵犻潧顑嗛悡鍌炴煕閵夈垺娅嗛柡鍡楃箰椤潡宕奸崱妤佸濞寸厧鍊块幃?
	  			0x03 	String 		N 闂佽娴烽弫鎼佸箠閹炬儼濮?	TEXT
	  			0x05 	FAULT 		1/2/4 	濠电偞娼欓崥瀣嚌妤ｅ啯鍎嶉柕蹇嬪€曢弸渚€鏌ｅΔ鈧悧鍡欑矈閿曞倹鐓熼柕濞垮劚椤忣亪鏌ｉ敂鐟板⒉缂佸顦甸崺鈧?Bit 濠电偠鎻徊鍓у垝閸垺瀚?bool 闂備焦鎮堕崝宀勵敄閸曨厾绠旈柛宀€鍋涚粻顕€鏌曟径妯虹仯缂佲偓婢跺ň鏀介柍銉ュ暱閳ь剟顥撶划顓㈠磼閻愯尙顔呴梺闈涱槴閺呮粌袙閹版澘绠归弶鍫濆⒔閻ｉ亶鏌曢崶褎澶勭紒?1闂佽瀛╃粙鎺椼€冩径瀣╃箚妞ゆ挶鍨圭猾宥夋偣娴ｅ憡璐＄紒鈧径濠庣唵闁割偄妫楅幏瀣閸岀偞鍋犳繛鎴炵墪婵″潡鏌?
	  			0x11 	Double 		8 Byte 	濠电姰鍨归悥銏ゅ椽娴ｉ纾介梻浣瑰缁嬫垿鎳熼鐑嗘晪妞ゆ棁濮ら崕?Double/Float 缂傚倷绶￠崑澶婄暦閸偅娅犻柛顭戝暎閻旂厧鐏崇€规洖娲犻崑鎾绘倻閼恒儲娅栭悗鍏夊亾闁逞屽墴瀵偊濡堕崱娆樻锤闁圭厧鐡ㄧ换鍕倷婵犲洦鈷戞い鎰剁到缁楁帡鏌ｉ…鎴濆⒋鐎殿噮鍋嗛弫顕€顢欓崜褜妲盕loat缂傚倷绶￠崑澶婄暦閸偅娅犻柛顭戝暎閻旂厧鐏崇€规洖娲犻崑鎾绘倻閼恒儺姊块梺閫炲苯澧伴柟鑼閹峰懐绮欑捄銊х暢闂佸搫顦遍崕鎰板礂濞戞碍瀚?Double 闂備礁鎼粔鍫曞储瑜忓Σ鎰版晸閻樿櫕娅栨繝銏ｅ煐缁嬫挾绮堟径鎰拺妞ゆ帒瀚☉褔鏌熼姘捐含鐎殿喕绮欓幃鈩冩償閿濆浂鏀ㄥ┑?C 闂佽崵濮村ù鍌炲矗閳ь剟鏌嶇拠鑼ⅵ闁哄苯妫濆Λ鍐ㄢ槈濞嗗繐澹忛梻?IEEE 754 闂備礁鎼粔鏉懨洪妶澶婇棷妞ゆ牗绋撻埢鏃堟煃瑜滈崜鐔煎箠?
	  			0x12 	Struct 		L Byte 	闂佽娴烽弫鎼佸箠閹炬儼濮抽柤纰卞墰绾惧ジ鏌熼幆褜鍤熼柍褜鍓﹂崹閬嶅箯?闂備浇妗ㄩ悞锔界珶閸℃瑥鍨濈€广儱娲ㄧ亸鐢告偣閸ヮ亜鐨洪柍褜鍓涢崗姗€骞冭閸╋繝宕戞０浣虹獢鐎规洖婀遍埀顒婄到婢у海绮堟径鎰仯闁搞儯鍎遍崝銈夋偠濮樼厧浜伴柟顔ㄥ洤鐓涢柛瀣暒缁舵艾鐣烽崷顓涘亾閿濆倹娅堢紒鈧€ｎ亶鐔嗛柤绋跨仛閻ㄦ垶銇勯锝呮诞闁诡啫鍥х厸闁稿顣︾欢姘暦閸︻厸鍋撻敐搴″闁伙綀浜槐鎾存媴缁嬫浠奸梺璇″枛闁帮絾淇婄€涙鐟?濠电偞鍨堕幑浣糕枍閿濆洤鍨濋柕濞炬櫅閸戠娀鏌涢弴銊ょ敖缂佸銈搁弻鐔哄枈濡桨澹曢梻浣告惈閻楀棝藝娴兼潙鍨傛慨妯挎硾瀹告繃淇婇姘础閻犳劏鏅犻獮鏍级閹寸姷顔夐柣銏╁灡閹瑰洤鐣峰顑╂棃鍩€椤掑嫬绠栨俊銈呮噹缁犮儵鏌嶈閸撶喎鐣烽敓鐘冲亹闁割煈鍋呭▓銏ゆ⒑濮瑰洤濡奸悗姘煎墴閹缚顦归柟宕囧仱瀹曟帡鎮欑€涙妲梺纭呭閹活亞鎷归悢鐓庣劦?
	  		len(2byte) 闂佽娴烽弫鎼佸箠閹炬儼濮抽柣顒傛lue闂佽瀛╃粙鎺椼€冩径瀣╃箚妞ゆ挶鍨归弸?
	  		value(1/2/4/N/L)  闂?6 闂佸搫顦弲婊呯矙閹达箑鏄ユ俊銈呭暞閸嬫﹢鏌曟繛褌妞掔划鐢告⒑閹稿海鈽夐柤娲诲灦婵＄敻宕堕妸褜娲?1 闂佽瀛╃粙鎺椼€冩径瀣╃箚妞ゆ挶鍨洪悡鍌炴煕閵夈垺娅嗛柡鍡楃箰椤潡宕奸崱妤佸濞寸厧鍊搁湁闁兼祴鏅涢瀷缂?
	     */
		let comword = word||'06'//闂備礁鎲＄粙鎺楀垂濠靛绠柕鍫濇礌閸嬫挸鈽夊▎妯活吅缂備浇椴哥换鍐€旈埀顒佷繆椤栨侗鍎ラ柛?6
	  	let head = '55AA00'+comword
	  	let len = (data.length/2).toString(16)
	  	//闂佽崵鍋炵粙蹇涘磿閻㈢數绀?byte闂傚倸鍊甸崑鎾绘煕椤垵鏋涙い?
	  	len = len.length<2? '000'+len:len.length<3? '00'+len:len.length<4? '0'+len:len 
	  	// 闂備礁鎼粙鍕崲濠靛鍋樻繛鍡樻尭濡?
	  	let check = _this.checkByte(head+len+data)
	  	let buffer
	  	if(ischeck){
	  		buffer = _this.hexStr2Arrbuff('55AA0008000007')
			//濠电偞鍨堕幐鎼侇敄婢跺鐒介柣妤€鐗忛々鐑芥煥濠靛棙宸濋柛銊﹀▕閺岋繝宕熼棃娑氫哗濠殿喖婀遍崰搴敊韫囨稑唯闁冲搫鍊风划顖炴煟閻斿憡纾婚柣鎺炲缁﹦鈧潧鎲＄€氭岸鏌￠崶鈺佇ｉ柣锝変憾閺屾稑鈻庨幇顒備紝闂侀€炲苯鍘搁柣鎺炵畱铻為柍鍝勫閻も偓濠德板€曢鍥╃矆婢跺ň妲堥柟鎯х－鏁堝┑鐐存尭婢у酣骞夐悧鍫熷闁绘垶顭囬崙浠嬫⒑鐟欏嫪鑸柛搴㈢叀瀵偊鎮欓悜妯煎帓?
			// loggerList.push('send===========>55AA0008000007')
			// this.$store.commit('SET_TESTLOGGER',loggerList)
	  	}else{
      console.log('send hex data...', head + len + data + check);
	  		buffer = _this.hexStr2Arrbuff(head+len+data+check)
			//濠电偞鍨堕幐鎼侇敄婢跺鐒介柣妤€鐗忛々鐑芥煥濠靛棙宸濋柛銊﹀▕閺岋繝宕熼棃娑氫哗濠殿喖婀遍崰搴敊韫囨稑唯闁冲搫鍊风划顖炴煟閻斿憡纾婚柣鎺炲缁﹦鈧潧鎲＄€氭岸鏌￠崶鈺佇ｉ柣锝変憾閺屾稑鈻庨幇顒備紝闂侀€炲苯鍘搁柣鎺炵畱铻為柍鍝勫閻も偓濠德板€曢鍥╃矆婢跺ň妲堥柟鎯х－鏁堝┑鐐存尭婢у酣骞夐悧鍫熷闁绘垶顭囬崙浠嬫⒑鐟欏嫪鑸柛搴㈢叀瀵偊鎮欓悜妯煎帓?
			// loggerList.push('send===========>'+head+len+data+check)
			// this.$store.commit('SET_TESTLOGGER',loggerList)
	  	}
	  	uni.writeBLECharacteristicValue({
	  	  // 闂佸搫顦弲婊堟偡閳哄懎闂柣鎴ｅГ閸?deviceId 闂傚倸鍊稿ú鐘诲磻閹剧粯鍋￠柡鍥ㄦ皑椤︼附绻濋埀?getBluetoothDevices 闂?onBluetoothDeviceFound 闂備浇顫夋禍浠嬪磿鏉堫偁浜规繛鎴炵懅閳绘梹銇勯幘顖楀亾瀹曞浂鍞甸梻?
	  	  deviceId,
	  	  // 闂佸搫顦弲婊堟偡閳哄懎闂柣鎴ｅГ閸?serviceId 闂傚倸鍊稿ú鐘诲磻閹剧粯鍋￠柡鍥ㄦ皑椤︼附绻濋埀?getBLEDeviceServices 闂備浇顫夋禍浠嬪磿鏉堫偁浜规繛鎴炵懅閳绘梹銇勯幘顖楀亾瀹曞浂鍞甸梻?
	  	  serviceId:'0000FFF0-0000-1000-8000-00805F9B34FB',
	  	  // 闂佸搫顦弲婊堟偡閳哄懎闂柣鎴ｅГ閸?characteristicId 闂傚倸鍊稿ú鐘诲磻閹剧粯鍋￠柡鍥ㄦ皑椤︼附绻濋埀?getBLEDeviceCharacteristics 闂備浇顫夋禍浠嬪磿鏉堫偁浜规繛鎴炵懅閳绘梹銇勯幘顖楀亾瀹曞浂鍞甸梻?
	  	  characteristicId:'0000FFF2-0000-1000-8000-00805F9B34FB',
	  	  // 闂佸搫顦弲婊堟偡閳哄懎闂柣鎴ｅГ閸庡秹鏌涢幘闄堚暔ue闂備礁鎼€氼噣寮搁崬鏅俛yBuffer缂傚倷绶￠崑澶愵敋瑜旈幃?
	  	  value: buffer,
	  	  success(res) {
	  	    console.log('writeBLECharacteristicValue success', res.errMsg)
	  	  }
	  	})
	  },
	  //闂備胶绮…鍫ュ春閺嶎厼鐒垫い鎴ｆ硶閸斿秹鏌￠崱娆忔灈妤犵偞鍨块、娆撴偂鎼达綆妲归梻?
  startBleWriteLoading(){
    this.resolveBleWriteLoading()
    this.globalData.bleWritePending = true
    uni.showLoading({
      mask:true,
      title:''
    })
    this.globalData.bleWriteLoadingTimer = setTimeout(()=>{
      if(this.globalData.bleWritePending){
        this.globalData.bleWritePending = false
        uni.hideLoading()
        uni.showToast({
          title:'\u64cd\u4f5c\u8d85\u65f6',
          icon:'none'
        })
      }
    },5000)
  },
  resolveBleWriteLoading(){
    if(this.globalData.bleWriteLoadingTimer){
      clearTimeout(this.globalData.bleWriteLoadingTimer)
      this.globalData.bleWriteLoadingTimer = null
    }
    if(this.globalData.bleWritePending){
      this.globalData.bleWritePending = false
      uni.hideLoading()
    }
  },
	  dataHexStr(dpid,type,value){
	  	// 闂備礁鎲￠悷銉╁磹瑜版帒姹查柣鏃傚帶閻鏌涚仦鍓у闁稿鎹囧畷妯款槾闁荤喐鍔欏濠氬醇濞戞浼勫┑?闂備浇妗ㄩ懗鑸垫櫠濡も偓閻ｅ灚绗熼埀顒勫蓟閸儱惟闁靛鍎抽埀?
	  	let len = (value.length/2).toString(16)
	  	//闂佽崵鍋炵粙蹇涘磿閻㈢數绀?byte闂傚倸鍊甸崑鎾绘煕椤垵鏋涙い?
	  	len = len.length<2? '000'+len:len.length<3? '00'+len:len.length<4? '0'+len:len 
	  	let instruct = dpid + type + len + value
	  	return instruct
	  },
	  //闂備礁鎼粙鍕崲濠靛鍋樻繛鍡樻尭閺嬩線鏌ｅΔ鈧悧鍡欑矈?
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
	  //16闂佸搫顦弲婊呯矙閹达箑鏄ユ俊銈呭暊閸嬫挸鈽夊▎妯荤暭濡炪倖鍨抽悞锔剧矙婢舵劖鍤戦柤鍝ユ暩閵堢敚yte闂備浇妗ㄩ悞锔界珶閸℃瑥鍨?
	  str2byte(data){
	  	let byteNum = data.length/2
	  	let newArr = []
	  	for(let i=0;i<byteNum;i++){
	  		newArr.push(data.substring(i*2,i*2+2))
	  	}
	  	return newArr
	  },
	  //16闂佸搫顦弲婊呯矙閹达箑鏄ユ俊銈勭劍婵粍銇勯幒宥囶槮閹兼潙锕ら埥澶愬箻鐟欏嫨鈧啰绱掗妸銏℃珕婵炶壈顕ч埥澶娢熼搹鐟板箑闂備浇妗ㄩ悞锔界珶閸℃瑥鍨?
	  hexStr2Arrbuff(buffer){
	  	 let typedArray = new Uint8Array(buffer.match(/[\da-f]{2}/gi).map(function (h) {
	  	   return parseInt(h, 16)
	  	 }))
	  	 let bufferarr = typedArray.buffer
	  	 console.log(bufferarr)
	  	 return bufferarr
	  },
	  //濠电偛鐡ㄧ划宀勬儗娴ｇ儤宕叉慨妞诲亾鐎规洘宀搁幊婊堝垂椤愶綆鍟€缂傚倸鍊风粈浣衡偓姘煎灠闇夐柛鈩冪☉缁犲弶銇勯顐㈠绩缂佲偓?6闂佸搫顦弲婊呯矙閹达箑鏄?
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
