<template>
	<view>
		<!-- <uni-nav-bar fixed="true" :border="false" status-bar left-icon="left" :title="title" @clickLeft="back"> -->
		<uni-nav-bar fixed="true" :border="false" status-bar :title="title">
			<template v-slot:left>
				<view class="top-nav-action" @click="back">
					<image class="top-nav-back" src="/static/back.png" mode="widthFix"></image>
					<text class="top-nav-text">{{$t("com.cancel")}}</text>
				</view>
			</template>
			<template v-slot:right>
				<view class="top-nav-save-action" @click="setData(item)">
					<text class="top-nav-save">{{$t("save")}}</text>
				</view>
			</template>
		</uni-nav-bar>
		<view class="modeLists">
			<view class="modeList">
                <view class="title">&#27169;&#24335;&#36873;&#25321;</view>
				<view class="content flex radio-btn-group">
                    <div class="radio-btn" :style="{backgroundColor: modeFlag==0? '#00bd54':'#F0F0F0',color: modeFlag==0? '#fff':'#000'}" @click="changeMode(0)">{{$t("simple-mode")}}</div>
                    <div class="radio-btn" :style="{marginLeft: '30rpx',backgroundColor: modeFlag==1? '#00bd54':'#F0F0F0',color: modeFlag==1? '#fff':'#000'}" @click="changeMode(1)">{{$t("professional-mode")}}</div>
				</view>
			</view>
			<view v-if="modeFlag==1">
				<MajorMode></MajorMode>
			</view>
			<view v-if="modeFlag==0">
			<!-- 缂傚倸鍊搁崐鐑芥嚄閼稿灚鍙忔い鎾卞灩绾惧鏌熼崜褏甯涢柣鎾寸洴閺屾盯寮撮妸銉ヮ潽闁诲繐绻嬮崡鎶藉箠濮樿泛鐓涢柛鎰剁到娴滅偓绻涢崼婵堜虎闁哄绋撶槐鎺旂磼濡櫣鐟ㄩ梺宕囩帛閹瑰洭鐛€ｎ喗鏅濋柍褜鍓涢悮鎯ь吋婢跺鍘卞銈嗗姧缁插墽绮堥崘顔界叆婵炴垶鑹鹃弸娑㈡煙椤旀娼愰柟宄版噽缁瑦鎯旈幘鏉戠槺闂?-->
			<view class="modeList">
				<view class="title time-title">
                    <view>{{$t("timer-settings")}}</view>
					<!-- <view style="font-weight: normal;color: #a3a3a3;font-size: 26rpx;">闂傚倸鍊风粈渚€骞夐敓鐘茬闁圭虎鍠栭悿鐐箾閸℃ê鐏╃紒鈧繝鍥ㄧ厵閺夊牆澧介悾杈╃磼椤愩垻效闁哄本鐩、鏇㈡晲閸℃瑯妲伴梻浣瑰缁嬫捇宕伴弽顓炶摕?5:11</view> -->
				</view>
				<view class="flex" style="position: relative;">
					<div class="middleline" style="left: 47%;"></div>
					<view class="content" style="padding: 0;">
						<view>
							<view>
                                &#23567;&#26102;
							</view>
						</view>
						<view style="width: 45vw;">
							<picker-view :indicator-style="indicatorStyle" :value="hvalue" @change="setTiming($event,1)" class="picker-view">
								<picker-view-column>
									<view class="item" v-for="(item,index) in hList" :key="index">{{item.toString().padStart(2,'0')}}</view>
								</picker-view-column>
							</picker-view>
						</view>
					</view>
					<view class="content" style="padding: 0;">
						<view>
							<view>
                                &#20998;&#38047;
							</view>
						</view>
						<view style="width: 45vw;">
							<picker-view :indicator-style="indicatorStyle" :value="mvalue" @change="setTiming($event,2)" class="picker-view">
								<picker-view-column>
									<view class="item" v-for="(item,index) in minuteOptions" :key="index">{{item.toString().padStart(2,'0')}}</view>
								</picker-view-column>
							</picker-view>
						</view>
					</view>
				</view>
			</view>
			<view class="modeList">
                <view class="title">&#26723;&#20301;&#35774;&#32622;</view>
				<view class="content flex radio-btn-group">
					<div class="radio-btn" v-for="(item,idx) in gearList" :style="{marginLeft: idx%5==0? '0':'30rpx',marginTop: idx>4? '20rpx':'0',backgroundColor: idx==gearIdx? '#00bd54':'#F0F0F0',color: idx==gearIdx? '#fff':'#000'}" @click="changeGear(idx)">{{item}}</div>
				</view>
			</view>
			</view>
			<Hmpicker ref="picker" actionPosition="top" :is24system="is24hour" @confirm="confirm" v-model="currTime"></Hmpicker>
		</view>
	</view>
</template>

<script>
	import Mypicker from '@/components/my-picker/index.vue'
	import Hmpicker from '@/components/hm-picker/index.vue'
	import Insidepicker from '@/components/inside-picker/index.vue'
	import { mapGetters } from 'vuex'
	import MajorMode from './comp/majorMode.vue'
	export default {
		components: {
			Mypicker,
			Hmpicker,
			Insidepicker,
			MajorMode
		},
		data() {
			return {
				title: '',
				item: {},
				selTimeIndex: '',
				currTime: '',
				selIndex: 0,
				devicemsg: {}, //闂傚倷娴囧畷鍨叏閹惰姤鍊块柨鏇炲€哥壕鍧楁煙鐠哄搫顥為柛銉墻閺佸棗霉閿濆牄鈧偓闁衡偓閹惰姤鈷戦柡鍌樺劜濞呭懘鏌涢悢鍙夋珖婵″弶鍔欏浠嬵敇閻斿搫寮虫繝鐢靛仦閸ㄥ爼鎮烽鐐茬闁瑰墎鍋ゅ缁樻媴閻熼偊鍤嬬紓浣割儐閸ㄥ潡骞冩ィ鍐╁剺?
				isChanged:false,
				modeFlag: 1,//0闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑樺焾濞尖晠鏌曟繛鐐珕闁稿鏅滅换婵嬫濞戝崬鍓扮紒缁㈠幐閸嬫捇姊绘担鍛婃儓婵炲眰鍔戝畷顒勬嚍閵夛箑顎撻梺鍛婃尰瑜板啫鈻撻妸鈺傤棅妞ゆ劑鍨洪崒銊╂煕鎼淬垹鈻曢柣?闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑橆殕閸庢銇勯弬鍨挃缂佺姵妫冮弻鐔煎箚瑜滈崵鐔兼煃缂佹ɑ鈷愰柟渚垮妼椤粓宕卞Δ鈧濠电偠鎻徊鑺ョ珶婵犲洤鍚?
				indicatorStyle: `height: 50px;`,
                hList:[0,1,2,3,4,5,6],
                mList:[0,10,20,30,40,50],
                gearList: [1,2,3,4,5],
                gearIdx: 1,
                hvalue: [0],
                mvalue: [1],
                curTime: 90,
            }
        },
        computed: {
            ...mapGetters(['deviceId','isOffline','parameterMode','gearNum','simpleMode','curGear']),
            is24hour(){
                let flag 
                 if(this.$store.state.device.is24hour==1){
                     flag = true
                 }else{
                     flag = false
                 }
                return flag
            },
            minuteOptions(){
                const hourIndex = Array.isArray(this.hvalue) ? this.hvalue[0] : this.hvalue
                const hour = this.hList[hourIndex]
                return hour === 0 ? this.mList.filter(item => item !== 0) : this.mList
            }
        },
        onLoad(e) {
			// this.item = JSON.parse(e.itemStr);
			// console.log(this.item);
			// this.title = this.item.pattern;
			this.modeFlag = this.parameterMode
			this.selIndex = e.index;
			this.curTime = this.simpleMode
            console.log('simple mode current time', this.curTime);
			this.gearIdx = 1*this.curGear-1
			// if(this.modeFlag==0) this.initTime()
			this.initTime()
			if(this.gearNum){
				let gList = []
				for(let i=1; i<=this.gearNum; i++){
					gList.push(i)
				}
				this.gearList = gList
			}
		},
		onShow() {
			this.$store.commit('SET_OFFLINE',false)
			console.log(this.is24hour);
		},
		methods: {
			normalizeSimpleTime(time){
				let normalized = Number(time) || 0
				const maxTime = this.hList[this.hList.length - 1] * 60 + this.mList[this.mList.length - 1]
				if(normalized <= 0){
					normalized = 10
				}
				normalized = Math.ceil(normalized / 10) * 10
				if(normalized > maxTime){
					normalized = maxTime
				}
				if(normalized < 10){
					normalized = 10
				}
				return normalized
			},
			//闂傚倸鍊风粈渚€骞夐敍鍕殰婵°倕鍟畷鏌ユ煕瀹€鈧崕鎴犵礊閺嶎厽鐓欓柣妤€鐗婄欢鑼磼閳ь剙鐣濋崟顒傚幐閻庤鎼╅崰鏍箠韫囨挃鎺撴償閵婏腹鎷洪梺鍛婄箓鐎氼剟寮抽姀掳浜滈柡鍐ｅ亾闁告梹顨呭嵄闁归偊鍏橀弸搴ㄦ煙鐎电小缂佹顦靛娲焻閻愯尪瀚板褍顕埀顒侇問閸犳洟宕￠幎鐣屽祦婵せ鍋撻柟宕囧█婵℃悂濡堕崶鑸敌滄俊鐐€栧ú鈺冪礊閳ь剛绱掗悩宕囨创濠碉紕鏌夐ˇ瀛樸亜?
			initTime(){
				this.curTime = this.normalizeSimpleTime(this.curTime)
				const h = Math.floor(this.curTime/60)
				const m = this.curTime%60
				const hIdx = this.hList.findIndex(ite=>ite===h)
				this.hvalue = [hIdx]
				const minuteList = h === 0 ? this.mList.filter(item => item !== 0) : this.mList
				const mIdx = minuteList.findIndex(ite=>ite===m)
				this.mvalue = [mIdx]
			},
			//闂傚倷娴囧畷鍨叏瀹曞洨鐭嗗ù锝堫潐濞呯姴霉閻樺樊鍎愰柛瀣典邯閺屾盯鍩勯崘顏呭枦闂佺顑嗛幐楣冨箟閹绢喖绀嬫い鎾楀嫭顔愬┑鐘殿暜缁辨洟宕戝☉銏犵９闁秆勵殔閺嬩胶鈧箍鍎卞ú锝呪柦椤忓牊鐓熼柟浼存涧婢х粯淇婂顔肩仸婵﹥妞藉畷銊︾節閸曨厾鍘愰梻浣稿悑濡炲潡宕圭捄铏规殾?
			setTiming(e,idx){
				const { value } = e.detail
				// console.log(e);
				// console.log(value);
				if(idx == 1){
					// 闂?
					this.hvalue = value
				}else if(idx == 2){
					// 闂?
					this.mvalue = value
				}
				const hIndex = Array.isArray(this.hvalue) ? this.hvalue[0] : this.hvalue
				const mIndex = Array.isArray(this.mvalue) ? this.mvalue[0] : this.mvalue
				const h = this.hList[hIndex]
				let m = this.minuteOptions[mIndex]
				if(h === 0 && m === 0){
					m = 10
					this.mvalue = [this.mList.findIndex(ite=>ite===10)]
				}
				const time = h*60+m*1
				this.curTime = time
				console.log(this.hvalue);
				console.log(this.mvalue);
				console.log(time);
			},
			//闂傚倸鍊风粈渚€骞夐敍鍕殰闁圭儤鍤氬ú顏呮櫇闁逞屽墴閹箖鎮滈挊澶岊唽闂佺懓绠嶉崝搴ㄥ窗閺嶎厼鍨傞柟顖嗗懏娈鹃梺鎼炲劗閺呪晠寮?
			changeMode(num){
				console.log(num);
				this.modeFlag = num
				this.$store.commit('SET_PARAMETERMODE',num)
			},
			//缂傚倸鍊搁崐鐑芥嚄閼稿灚鍙忔い鎾卞灩绾惧鏌熼崜褏甯涢柣鎾寸洴閺屾盯寮撮妸銉ヮ潽闁诲繐绻嬮崡鎶藉箠濮樿泛鐓涢柛鎰剁到娴滅偓绻涢崼婵堜虎闁哄绋撶槐鎺旂磼濡搫顫掗悗瑙勬礈椤㈠﹦绮诲☉妯锋婵☆垳鈷堥崬褰掓⒒娓氣偓濞佳呮崲閸℃稑鐒垫い鎺嗗亾缁剧虎鍘奸埢鎾舵喆閸曨厾顔?
			changeGear(num){
				console.log(num);
				// this.gearIdx = this.gearList[num]
				this.gearIdx = num
			},
			confirm(e,selTimeIndex) {
				const { value } = e
				// console.log(value);
				switch (selTimeIndex) {
					case 1:
						this.item.btime = value;
						break;
					case 2:
						this.item.etime = value;
						break;
					default:
						break;
				}
				// console.log(this.item);
				// this.setData(this.item);
			},
			setData(item) {
				const modeHex = Number(this.modeFlag).toString(16).padStart(2,'0')
				this.$store.commit('SET_PARAMETERMODE',this.modeFlag)
				const modedata = getApp().dataHexStr('19','01',modeHex)
				console.log(modedata);
				getApp().writeData(this.deviceId,modedata);
				if(this.modeFlag == 0){
					setTimeout(()=>{
						console.log(this.curTime);
						const timeHex = Number(this.curTime).toString(16).padStart(4,'0')
						this.$store.commit('SET_SIMPLEMODE',this.curTime)
						console.log(timeHex);
						console.log(this.gearList);
						console.log(this.gearIdx);
						const gear = Number(this.gearList[this.gearIdx]).toString(16).padStart(2,'0')
						this.$store.commit('SET_CURGEAR',this.gearList[this.gearIdx])
						console.log(gear);
						const sendHex = timeHex+gear
						console.log(sendHex);
						let data = getApp().dataHexStr('1B','00',sendHex)
						getApp().writeData(this.deviceId,data);
					},500)
				}
				setTimeout(()=>{
					uni.navigateBack()
				},1500)
			},
			//闂傚倸鍊风粈渚€骞栭銈囩煓闁告洦鍘藉畷鍙夌節闂堟侗鍎愰柛瀣戠换娑㈠幢濡や胶顩伴梺鎼炲€栧ú鐔煎蓟瀹ュ牜妾ㄩ梺鍛婃尰瀹€鎼佺嵁閸儱惟鐟滃宕戦幘缁樻櫜閹肩补鈧剚娼炬繝鐢靛仜椤︻參宕规禒瀣摕闁斥晛鍟欢鐐烘倶閻愯泛袚闁诲孩鍎抽埞鎴︽晬閸曨偂绮堕梺绋匡工閻忔繈锝?
			timeCheck(){
				let flag = false
				console.log(this.item.btime);
				console.log(this.item.etime);
				const [bH,bM] = this.item.btime.split(':')
				const [eH,eM] = this.item.etime.split(':')
				console.log(parseInt(bH));
				console.log(parseInt(bM));
				console.log(parseInt(eH));
				console.log(parseInt(eM));
				if(parseInt(eH)>parseInt(bH)){
					flag = true
					// console.log('婵犵數濮烽弫鍛婃叏閹绢喖鐓熼柕澶嗘櫅鍥撮梺鍛婁緱閸樹粙鎮橀崱娑欌拻濞达絽鎲￠幆鍫熴亜閿旇浜伴柛鈹惧亾濡炪倖宸婚崑鎾垛偓娈垮枛閻栧ジ銆?');
				}else if(parseInt(eH)==parseInt(bH)){
					if(parseInt(eM)>=parseInt(bM)){
						// console.log('婵犵數濮烽弫鍛婃叏閹绢喖鐓熼柕澶嗘櫅鍥撮梺鍛婁緱閸樹粙鎮橀崱娑欌拻濞达絽鎲￠幆鍫熴亜閿旇浜伴柛鈹惧亾濡炪倖宸婚崑鎾垛偓娈垮枛閻栧ジ銆?');
						flag = true
					}
				}
				return flag
			},
			handleData() {
				let itemList = uni.getStorageSync('workModelItem');
				let allBytes = [];
				for (let i = 0; i < itemList.length; i++) {
					const item = itemList[i];

					// Pl:婵犵數濮烽。钘壩ｉ崨鏉戝瀭妞ゅ繐鐗嗛悞鍨亜閹哄棗浜剧紒鍓ц檸閸樻儳鈽夐悽绋跨劦妞ゆ帒瀚埛鎴︽煕濠靛棗顏€涙繂鈹戦悙鑼勾闁稿﹥顨婇獮?闂傚倸鍊风粈渚€骞夐敍鍕殰闁圭儤鍤﹀☉妯滄棃宕ㄩ鐔感氶梻浣虹《閸撴繈鈥﹂崶顑锯偓鍛存倻閼恒儳鍙嗗┑鐘绘涧濡稒鏅堕幋锔界厓鐟滄粓宕滃▎鎾崇柈妞ゆ牗绮庨惌澶屸偓骞垮劚椤︻垰螞濡綍鏃堟晲閸涱厽娈┑鐐茬墛缁诲倿鍩為幋锕€鐓￠柛鈩冾殘娴犳岸姊洪柅鐐茶嫰婢ь喚鐥紒銏犲箻婵炴垹鏁婚崺鈧?0-4)
					const p1 = i;
					// P2:濠电姷鏁搁崑鐐哄垂閸洖绠查柛銉㈡櫇绾捐姤鎱ㄥ鈧·鍌炲极鐎ｎ偅鍙忔慨妤€妫楅崝锕傛煟閺冨倸甯堕柣蹇撶－閳ь剝顫夊ú鏍洪妸鈹库偓渚€宕ㄧ€涙ê鈧敻鎮峰▎蹇擃仾闁稿濞€閺屾稒鎯旈姀鐙€妫嗙紓浣戒含閸嬨倕顕ｉ鈧畷鐓庘攽閸垺缍佸┑?~b6闂傚倷娴囧畷鐢稿磻閻愮數鐭欓煫鍥ㄧ☉缁€澶愬箹濞ｎ剙濡煎鍛攽椤旂瓔鐒炬繛澶嬬☉椤斿繐鈹戠€ｎ偆鍘繝鐢靛仜閻忔繈鍩€椤掍緡娈滄い銏℃閺屽棗顓奸崱娆忓箻闁诲海鎳撶€氼厼顭垮鈧鎶芥焼瀹ュ棛鍘甸梺鍛婂姇瀵爼藟閵忊懇鍋?
					const p2 = this.weekToByte(item.weeks);
					//P3,P4: 闂傚倷娴囧畷鍨叏瀹ュ绀冮柕濞も偓閳轰緡娓婚柕鍫濋娴滄繈鏌涢弮鈧悷銉╊敋閿濆鏁嬮柍褜鍓欓悾閿嬬附缁嬪灝宓嗛梺缁樻礀閸婂宕ヨぐ鎺撯拻濞撴埃鍋撴繛浣冲吘娑㈠籍閸屾粎鐒兼繛鎾村焹閸嬫捇鏌熼姘殻妞ゃ垺顨婂畷鐔碱敃閵堝洦缍侀梻浣藉吹婵挳骞栭锕€绠规い鎰堕檮閸婇潧鈹戦悩宕囶暡闁?
					const p3 = parseInt(item.btime.split(':')[0]);
					const p4 = parseInt(item.btime.split(':')[1]);
					//P5,P6: 缂傚倸鍊搁崐鎼佸磹閻戣姤鍊块柨鏇炲€哥粻浼存偣閸パ勨枙闁绘帟濮ら妵鍕箛閸撲胶鏆犵紓渚囧亜缁夊綊寮诲☉銏╂晝闁挎繂妫涢ˇ銊╂⒑閹稿海銆掗柛鐘崇墵瀵寮撮姀鐘茶€块梺鍝勬川婵厼危椤曗偓濮婂搫煤閼姐倕甯ラ梺鍛婃尵閸犲酣顢氶敐澶樻晩闁绘劦鍓欑壕顖炴⒑閸涘﹦绠撻悗姘煎櫍閸┾偓妞ゆ巻鍋撴い顓炲槻椤?
					const p5 = parseInt(item.etime.split(':')[0]);
					const p6 = parseInt(item.etime.split(':')[1]);
					console.log(p3+':'+p4+':'+p5+':'+p6);
				
					
					//P7: 闂傚倸鍊烽懗鍫曘€佹繝鍥ㄥ剹闁搞儺鍓欑粈鍐煏婵炑冨暙缁犳垿姊虹拠鎻掝劉妞ゆ梹鐗犲畷浼村箳濡も偓绾惧鏌熼崜褏甯涢柣?闂傚倸鍊烽懗鍫曗€﹂崼銏″床闁瑰鍋熺粻鎯р攽閻樿弓杩规繛鎴欏灩缁犵粯銇勯弮鍥撴繛?闂傚倸鍊烽懗鍫曞箠閹剧粯鍊舵慨妯挎硾缁犱即鏌涘┑鍕姕妞?
					const p7 = (item.selected == true ? 1 : 0);
		
					//P8闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟杈惧瘜閺?:闂備浇顕у锕傦綖婢舵劕绠栭柛顐ｆ礀绾惧潡鏌熷▓鍨灓缂佲偓婵犲洦鐓涢柛鎰╁妿婢ф洜绱掗銏⑿ч柡灞剧洴椤㈡洟鏁愰崱娆樻О闂備焦瀵х粙鎾诲窗閺嶎厼钃熼柕濞垮劗濡插牊鎱ㄥΔ鈧Λ妤佷繆?濠电姷鏁搁崑鐘诲箵椤忓棗绶ら柤鎭掑労濞堜粙鏌熼梻瀵割槮闁活厽顨婇弻鐔煎箚瑜忛幗鐘测攽椤栨凹鍤熼柍褜鍓欑粻宥夊磿鏉堚晜宕查柟鐑樻⒒閻棗鈹?闂傚倸鍊风粈渚€骞栭銈傚亾濮樺崬鍘寸€规洖缍婂畷濂稿即閻旇渹鎴锋俊鐐€栧ú宥夊磻閹惧灈鍋撶憴鍕妞ゃ劌锕妴渚€寮撮姀鈩冩珫闂佸憡娲﹂崢?
					const bytes = this.getLowHighBytes(parseInt(item.wtimes));
					const p8 = bytes[1];
					const p9 = bytes[0];
					//P10,P11:闂傚倸鍊烽懗鍫曗€﹂崼銉晞闁糕剝鐟ラ崹婵堚偓骞垮劚椤︿粙寮崱妯肩闁瑰瓨鐟ラ悘鈺冪磼椤愩垻效闁哄本鐩、鏇㈡晲閸℃瑯妲伴梻浣瑰缁嬫捇宕伴弽顓炶摕闁靛鍎Σ鍫熸叏濡も偓濡淇?0濠电姷鏁搁崑鐘诲箵椤忓棗绶ら柤鎭掑労濞堜粙鏌熼梻瀵割槮闁活厽顨婇弻鐔煎箚瑜忛幗鐘测攽椤栨凹鍤熼柍褜鍓欑粻宥夊磿鏉堚晜宕查柟鐑樻⒒閻棗鈹?1闂傚倸鍊风粈渚€骞栭銈傚亾濮樺崬鍘寸€规洖缍婂畷濂稿即閻旇渹鎴锋俊鐐€栧ú宥夊磻閹惧灈鍋撶憴鍕妞ゃ劌锕妴渚€寮撮姀鈩冩珫闂佸憡娲﹂崢?
					const bytes2 = this.getLowHighBytes(parseInt(item.ptimes));
					const p10 = bytes2[1];
					const p11 = bytes2[0];

					allBytes.push(p1);
					allBytes.push(p2);
					allBytes.push(p3);
					allBytes.push(p4);
					allBytes.push(p5);
					allBytes.push(p6);
					allBytes.push(p7);
					allBytes.push(p8);
					allBytes.push(p9);
					allBytes.push(p10);
					allBytes.push(p11);

				}

				var hexStr = allBytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
				console.log(hexStr);
				let data = getApp().dataHexStr('12','00',hexStr)
				getApp().writeData(this.deviceId,data);
				this.$store.commit('SET_MOMDELSTR',hexStr)
				uni.$emit('updateWM', {
					// msg: '闂傚倸鍊风粈渚€骞栭鈷氭椽濡舵径瀣槐闂侀潧艌閺呮盯鎷戦悢灏佹斀闁绘ɑ褰冩禍鐐烘煕閻旈攱鍤囬柡灞炬礃瀵板嫰宕煎┑鍐ㄤ壕婵°倕鍟伴惌娆忊攽閻樻彃鏆曠紒璇叉閵囧嫰寮介妸锝勭捕闂佺顑嗛幐鎼佹偩閻戣棄鐐婇柍鍝勶攻閺?..'
					msg: hexStr
				})
				uni.navigateBack()
			},
			// 闂傚倸鍊风粈渚€骞栭銈傚亾濮樼厧娅嶇€规洑鍗抽獮鍥敆婵犲應鍋撻崸妤佺厓闁宠桨绀侀弳鐐测攽椤旂晫鐭嬮柕鍥у楠炴帡宕卞鎯ь棜闂傚倷绀侀幉锟犳偡閿曞倸绠板┑鐘宠壘缁?
			weekToByte(weeks) {
				const mon = this.$t('com.mon');
				const tue = this.$t('com.tue');
				const wed = this.$t('com.wed');
				const thur = this.$t('com.thur');
				const fri = this.$t('com.fri');
				const sat = this.$t('com.sat');
				const sun = this.$t('com.sun');
				let bits = ['0', '0', '0', '0', '0', '0', '0', '0'];
				for (var i = 0; i < weeks.length; i++) {
					switch (weeks[i]) {
						case mon:
							bits[7] = '1';
							break;
						case tue:
							bits[6] = '1';
							break;
						case wed:
							bits[5] = '1';
							break;
						case thur:
							bits[4] = '1';
							break;
						case fri:
							bits[3] = '1';
							break;
						case sat:
							bits[2] = '1';
							break;
						case sun:
							bits[1] = '1';
							break;
						default:
							break;
					}
				}

				const bitstr = bits.join('');

				return parseInt(bitstr, 2);
			},
			// 闂傚倸鍊风粈渚€宕ョ€ｎ喖纾块柟鎯版鎼村﹪鏌ら懝鎵牚濞存粌缍婇弻娑㈠Ψ椤旂厧顫╅梺鍝勵儎缁舵岸寮婚埄鍐ㄧ窞濠电姴瀚惃鎴︽⒑缁嬫鍎愰柟鐟版喘楠炲﹪寮介鐐靛幐闂佺鏈划宥呪枔閹间焦鈷戦柛锔诲幖鐢爼鏌ｆ幊閸斿瞼鍙呴梺缁樻煥閸氬宕戦悢鎼炰簻闁哄洦顨呮禍楣冩倵鐟欏嫭绀冩い銊ワ躬閵嗕線寮撮姀鈩冩珫闂佸憡娲﹂崢?
			getLowHighBytes(integerValue) {
				var lowByte = integerValue & 0xFF;
				var highByte = (integerValue >> 8) & 0xFF;
				var sumOfBytes = lowByte + (highByte << 8);

				if (sumOfBytes === integerValue) {
					return [lowByte, highByte];
				} else {
					return null;
				}
			}
		}
	}
</script>

<style lang="scss">
	.uni-nav-bar-text {
		font-size: 20px;
	}

	.modeLists {
		padding: 0 20rpx 20rpx;

		.modeList {
			background-color: #ffffff;
			border-radius: 10rpx;
			margin-top: 20rpx;

			.title {
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;
				font-weight: bold;
				font-size: 16px;
			}

			.content {
				padding: 20rpx;

				>view {
					display: flex;
					// justify-content: space-between;
					justify-content: center;
					padding-bottom: 16rpx;
					padding-top: 16rpx;
				}

				>view:active {
					background-color: #f8f8f8;
				}

				.ct {
					color: #000;
					padding-right: 20rpx;
				}
			}
		}
	}


	.gray {
		color: #B5B5B5;
	}

	.green {
		color: #00AD8D;
	}

	.pdl10 {
		padding-left: 10rpx;
	}

	.pdr10 {
		padding-right: 10rpx;
	}

	.ctList {
		font-size: 14px;
		color: #fff;
		// background-color: #00AD8D;
		background-color: #F0F0F0;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
	}
	.timeapm{
		margin-left: 20rpx;
	}
	.picker-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		position: relative;
	}
	.picker-view {
		// width: 750rpx;
		width: 300rpx;
		// height: 200rpx;
		height: 15vh;
		margin-top: 20rpx;
		
		.item {
			line-height: 100rpx;
			text-align: center;
		}
	}
	.middleline{
		width: 2rpx;
		height: 70%;
		background-color: #eee;
		position: absolute;
		left: 46%;
		top: 50%;
		transform: translateY(-50%);
	}
	.pad16{
		padding: 16rpx 0;
	}
	
	.radio-btn-group{
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		flex-wrap: wrap;
		// :not(:first-child){
		// 	margin-left: 30rpx;
		// }
		
		.radio-btn{
			padding: 20rpx 40rpx;
			background-color: #F0F0F0;
			color: #fff;
			border-radius: 18rpx;
			font-size: 28rpx;
			// margin-left: 30rpx;
		}
	}
	.top-nav-action {
		display: flex;
		align-items: center;
		padding: 10rpx 8rpx;
	}
	.top-nav-back {
		width: 26rpx;
		height: 26rpx;
	}
	.top-nav-text {
		font-size: 28rpx;
		color: #435266;
		font-weight: 500;
		margin-left: 14rpx;
	}
	.top-nav-save-action {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 8rpx;
		min-width: 96rpx;
	}
	.top-nav-save {
		font-size: 28rpx;
		color: #00ad8d;
		font-weight: 600;
	}
</style>
