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
			<!-- 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌ょ粙璺ㄤ粵闁告瑥绻戦妵鍕箻閸楃偟浠肩紒鐐劤椤兘寮婚悢鐓庣鐟滃繒鏁☉銏＄厽闁规儳顕ú鎾煛鐏炲墽娲寸€殿喗鎸虫俊鎼佸Ψ閵夘喗娴囬梻浣筋嚙缁绘劗鎹㈢€ｎ喖纭€闁规儼妫勭粻鐘虫叏濡寧纭鹃柣鎾寸洴閺屾盯骞囬崜浣稿煂婵炲瓨绮庨崑鎾舵崲濞戙垹閱囨繝闈涚墔閾忓酣姊洪崫鍕靛剱缂佸鎸惧Σ鎰板箳閺冨倻锛滃┑鈽嗗灥濞咃綁鎮烽妸鈺傗拺鐎规洖娲ㄧ敮娑㈡煙閻熺増鍠橀柣娑卞枤閳ь剨缍嗛崰妤呭疾濠靛鐓冪憸婊堝礈濞戙垺鍋栭柟顖嗗苯鎮戞繝銏ｆ硾椤戝洭宕㈤崡鐑嗘富闁靛牆妫楁慨褏绱掗幓鎺戔挃缂侇喖鐗撳畷姗€顢欓悾灞藉汲婵犵數鍋為崹鍫曟嚌妤ｅ啫鍑犳繛鎴欏灪閻撴瑦銇勯弮鈧娆忣焽閹扮増鐓欑€瑰嫮澧楅崳鐣岀磼椤旂晫鎳勯柟顖涙楠炴﹢寮堕幋鐘承ㄩ梻?-->
			<view class="modeList">
				<view class="title time-title">
                    <view>{{$t("timer-settings")}}</view>
					<!-- <view style="font-weight: normal;color: #a3a3a3;font-size: 26rpx;">闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閼碱剦鍞堕梻浣告贡閾忓酣宕伴弽顓熷仾闁绘劦鍓涚粻楣冩煕閳╁厾顏堟倶閳哄啰纾奸柍褜鍓氱换婵嬪炊閵娧冨箥闂佸搫顦悧鍡樻櫠娴犲鍋╅弶鍫氭櫇绾惧吋銇勯幇鈺佺伄閺佸牓姊洪崫鍕拱闁烩晩鍨堕妴渚€寮撮姀鈩冩珳闂佺硶鍓濋悷顖毼ｆ导瀛樷拻濞达絿鎳撻婊呯磼鐎ｎ偅宕岀€规洑鍗冲浠嬵敇閻愯埖鎲?5:11</view> -->
				</view>
				<view class="flex" :style="{position: 'relative', opacity: timingOff ? 0.45 : 1}">
					<view style="position:absolute;right:20rpx;top:-72rpx;display:flex;align-items:center;z-index:2;">
                        <text style="font-weight: normal;color: #666;font-size: 26rpx;margin-right: 16rpx;">{{$t("timer-off")}}</text>
						<switch :checked="timingOff" color="#00bd54" @change="toggleTimingOff" />
					</view>
					<div class="middleline" style="left: 47%;"></div>
					<view class="content" style="padding: 0;">
						<view>
							<view>
                                &#23567;&#26102;
							</view>
						</view>
						<view style="width: 45vw;">
							<picker-view :disabled="timingOff" :indicator-style="indicatorStyle" :value="hvalue" @change="setTiming($event,1)" class="picker-view">
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
							<picker-view :disabled="timingOff" :indicator-style="indicatorStyle" :value="mvalue" @change="setTiming($event,2)" class="picker-view">
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
				devicemsg: {}, //闂傚倸鍊搁崐宄懊归崶褏鏆﹂柛顭戝亝閸欏繘鏌熼幆鏉啃撻柛濠傛健閺屻劑寮撮悙娴嬪亾閸濄儱顥氶柛褎顨嗛悡娆撴偣閸濆嫭鎯堟い銉у仱閺屾盯濡烽鐓庘拻闂佽桨绀佸Λ妤呮箒闂佹寧绻傞悧鍕焵椤戣棄浜鹃梻浣姐€€閸嬫捇鏌熼幆鏉啃撻柍閿嬪灴閺岋繝宕掑Ο鍝勫濠电偛鎳庨幊姗€寮诲☉銏″亜闁告瑥顦伴悵鏍р攽閳ュ啿绾ч柛鏃€鐟ラ锝嗙鐎ｅ灚鏅ｉ梺缁樻煥閹碱偄顕ｉ搹顐ょ瘈闁汇垽娼ф禒锕傛煕閵娿儳鍩ｉ柟顔惧厴椤㈡盯鎮欓懠顒夋Х闂備胶鎳撴晶搴ㄥ磻閵堝拋娼栫紓浣股戞刊鎾煟閻旂厧浜伴柛銈咁儑缁辨挻鎷呴崜鎻掑壉闂佹悶鍔屽锟犵嵁閸愨斂鍋呴柛鎰ㄦ櫅閸?
				isChanged:false,
				modeFlag: 1,//0闂傚倸鍊搁崐鎼佸磹閻戣姤鍊块柨鏃堟暜閸嬫挾绮☉妯诲櫧闁活厽鐟╅弻鐔兼倻濡櫣鍔稿┑鐐茬毞閺呯娀寮婚弴鐔虹闁绘劦鍓氶悵鏇㈡⒑缁嬫鍎岄柡鍛矌閹广垹鈹戠€ｎ偒妫冨┑鐐村灥瀹曨剟宕滈幍顔剧＜缂備降鍨归獮鎰版煕鐎ｎ偅宕屾慨濠勭帛閹峰懘宕ㄦ繝鍐ㄥ壍婵犵數鍋涢惇浼村礉閹存繄鏆︽い鎺戝閸ゅ秹鏌曟径娑氱暠妞ゅ孩鎹囧娲川婵犲啫闉嶉悷婊勬緲閸燁偊鍩㈤幘璇参╅柍鍝勫亞濡懎顪冮妶鍡楀闁搞劍妞藉畷鎺楀Ω閳哄倻鍘遍柟鍏肩暘閸ㄥ綊鍩㈤弴銏＄厽?闂傚倸鍊搁崐鎼佸磹閻戣姤鍊块柨鏃堟暜閸嬫挾绮☉妯诲櫧闁活厽鐟╅弻鐔兼倻濮楀棙鐣烽梺绋垮椤ㄥ棝濡甸崟顖氭闁割煈鍠掗幐鍐磽娴ｅ搫校婵☆偄鍟村濠氭偄閻撳海鐣鹃悷婊勭矒瀹曠敻鎮㈤崗鑲╁帗缂傚倷鐒﹁摫闁抽攱鍔欓弻鐔哥瑹閸喖顬堝銈庡亝缁挸鐣烽崡鐐嶆棃鍩€椤掍緡娈┑鐘垫暩閸嬬娀骞撻鍡楃筏闁兼亽鍎抽悵璺衡攽閻樺弶鎼愰柛?
				indicatorStyle: `height: 50px;`,
                hList:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                mList:[0,10,20,30,40,50,59],
                gearList: [1,2,3,4,5],
                gearIdx: 1,
                hvalue: [0],
                mvalue: [1],
                curTime: 90,
                timingOff: false,
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
        watch:{
			simpleMode(val){
				this.curTime = val
				this.timingOff = Number(val) >= 1440
				if(this.modeFlag == 0){
					this.initTime()
				}
			},
			curGear(val){
				const idx = this.gearList.findIndex(item=>item === val)
				if(idx > -1){
					this.gearIdx = idx
				}
			},
			gearNum(val){
				if(val){
					let gList = []
					for(let i=1; i<=val; i++){
						gList.push(i)
					}
					this.gearList = gList
					const idx = this.gearList.findIndex(item=>item === this.curGear)
					if(idx > -1){
						this.gearIdx = idx
					}
				}
			}
		},
		onLoad(e) {
			this.$store.commit('SET_OFFLINE',false)
			console.log(e);
			// this.devicemsg = e;
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
				if(normalized >= 1440){
					return 1440
				}
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
            // initialize simple-mode time picker
            initTime(){
				this.curTime = this.normalizeSimpleTime(this.curTime)
				if(this.curTime >= 1440){
					this.timingOff = true
					this.hvalue = [this.hList.length - 1]
					this.mvalue = [this.mList.length - 1]
					return
				}
				this.timingOff = false
				const h = Math.floor(this.curTime/60)
				const m = this.curTime%60
				const hIdx = this.hList.findIndex(ite=>ite===h)
				this.hvalue = [hIdx]
				const minuteList = h === 0 ? this.mList.filter(item => item !== 0) : this.mList
				const mIdx = minuteList.findIndex(ite=>ite===m)
				this.mvalue = [mIdx]
			},
            // simple-mode picker change
            setTiming(e,idx){
				if(this.timingOff){
					return
				}
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
			toggleTimingOff(e){
				this.timingOff = !!e.detail.value
				if(this.timingOff){
					this.curTime = 1440
					this.hvalue = [this.hList.length - 1]
					this.mvalue = [this.mList.length - 1]
				}else{
					this.curTime = 10
					this.hvalue = [0]
					this.mvalue = [0]
				}
			},
			//闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤掍焦顔囬梻浣告贡閸庛倝宕靛顑炴椽顢旈崨顔界彇闂備線鈧偛鑻晶鎾煙椤曗偓缁犳牠骞冨鍫熷癄濠㈣泛鐭堥崬浠嬫⒒娴ｇ儤鍤€缂佺姴绉瑰畷婵囨償閵娿儳鐛ラ梺鍝勭▉閸樺ジ宕归崒鐐寸厵妞ゆ牕妫楅幊蹇撯枔妤ｅ啯鈷戦柟鑲╁仜閸旀鏌￠崨顏呮珚鐎?
			changeMode(num){
				console.log(num);
				this.modeFlag = num
				this.$store.commit('SET_PARAMETERMODE',num)
			},
			//缂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌ょ粙璺ㄤ粵闁告瑥绻戦妵鍕箻閸楃偟浠肩紒鐐劤椤兘寮婚悢鐓庣鐟滃繒鏁☉銏＄厽闁规儳顕ú鎾煛鐏炲墽娲寸€殿喗鎸虫俊鎼佸Ψ閵夘喗娴囬梻浣筋嚙缁绘劗鎹㈢€ｎ喖纭€闁规儼妫勭粻鐘虫叏濡寧纭鹃柣鎾寸洴閺屾盯骞囬崜浣稿煂婵炲瓨绮庨崑鎾舵崲濞戙垹閱囨繝闈涚墔閾忓酣姊洪崫鍕靛剱缂佸鎸惧Σ鎰板箳閺冨倻锛滃┑鈽嗗灠閹碱偊锝為幒妤佸€甸悷娆忓缁€鍫熴亜閵忕媴鍔熺紒顔款嚙閳藉螣闁垮娼旀繝纰樻閸ㄦ娊鍩涢崼銉ヨ埞鐟滅増甯楅埛鎺戙€掑锝呬壕濠电偘鍖犻崨顔煎簥闂佺硶鍓濈粙鎴︽倿閸偁浜滈柟鍝勬娴滃墽绱掗崜褑妾搁柛妯恒偢閸┿垽骞橀懜闈涙瀭闂佸憡娲﹂崢楣冾敊?
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
			//闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘梻浣告啞濞诧箓宕㈤挊澶屾殾闁告瑥顦辩弧鈧梻鍌氱墛娓氭宕曢幇鐗堢厱閻庯綆鍊栭幋鐘冲床婵炴垯鍨归獮銏′繆閵堝嫯鍏屾い鈺€鍗冲娲箹閻愭祴鍋撻弽顬℃椽鎮㈤悡搴ゆ憰閻庡箍鍎遍悧婊冾瀶閵娾晜鈷戦柛娑橈攻鐏忔壆鈧厜鍋撻柟闂磋兌瀹撲線鏌涢鐘插姎閹喖鎮峰鍐炬█鐎规洘鍨块獮妯肩磼濡粯鐝抽梺纭呭亹鐞涖儵鍩€椤掍礁澧繛鑲╁亾缁绘繈鎮介棃娑楃捕濡炪倧瀵岄崣鍐ㄧ暦鐟欏嫮顩烽悗锝庝海閹芥洟姊洪弬銉︽珔闁哥噥鍋嗗▎銏ゆ倷閻戞ê鈧爼鏌ｉ幇顖涚【鐞氭岸姊虹拠鎻掝劉闁稿孩濞婇崺鐐哄箣閿旇姤娅栭梺鍛婃处閸嬪倻鍒掗崼鏇熲拺缂佸灏呭銉╂煟韫囨梻绠為柨?
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
					// console.log('婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柛娑橈攻閸欏繘鏌熺紒銏犳灈闁绘挾鍠栭弻鏇熷緞閸℃ɑ鐝旈柛銉︽尦濮婃椽宕ㄦ繝浣虹箒闂佸憡眉缁瑩骞冨鈧畷鍗炩槈濞嗗本瀚藉┑鐐舵彧缁蹭粙骞夐敓鐘茬畾闁割偆鍠嗘禍婊堟煥閺冨浂鍤欏ù婊€鍗抽弻娑㈠煘閹傚濠碉紕鍋戦崐鏍ь啅婵犳艾纾婚柟鎯х亪閸嬫挸鈻撻崹顔界亪闂佺粯鐗曢妶鎼佸Υ?');
				}else if(parseInt(eH)==parseInt(bH)){
					if(parseInt(eM)>=parseInt(bM)){
						// console.log('婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柛娑橈攻閸欏繘鏌熺紒銏犳灈闁绘挾鍠栭弻鏇熷緞閸℃ɑ鐝旈柛銉︽尦濮婃椽宕ㄦ繝浣虹箒闂佸憡眉缁瑩骞冨鈧畷鍗炩槈濞嗗本瀚藉┑鐐舵彧缁蹭粙骞夐敓鐘茬畾闁割偆鍠嗘禍婊堟煥閺冨浂鍤欏ù婊€鍗抽弻娑㈠煘閹傚濠碉紕鍋戦崐鏍ь啅婵犳艾纾婚柟鎯х亪閸嬫挸鈻撻崹顔界亪闂佺粯鐗曢妶鎼佸Υ?');
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

					// Pl:婵犵數濮烽弫鍛婃叏閻戝鈧倿鎸婃竟鈺嬬秮瀹曘劑寮堕幋婵堚偓顓烆渻閵堝懐绠伴柣妤€妫濋幃鐐哄垂椤愮姳绨婚梺鐟版惈濡绂嶉崜褏纾奸柛鎾楀棙顎楅梺鍛娚戦崕鎶藉煡婢舵劖鍋ㄧ紒瀣硶閸旓箑顪冮妶鍡楃瑨閻庢凹鍙冮崺娑㈠箣閿旂晫鍘卞┑鐘绘涧濡顢旈銈傚亾濞戞瑧绠撻柍瑙勫灴閹瑩鎳犻浣稿瑎闂備胶顭堥敃銉┿€冩繝鍥╁祦?闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤掍焦顔囬梻浣告贡閸庛倝宕甸敃鈧埥澶娢熷鍕棃鐎规洏鍔戦、姗€鎮㈤幇鐔稿哺濮婄粯鎷呴搹骞库偓濠囨煕閹惧绠為柍銉畵瀹曞爼顢栭柨顖氫壕闁告稑鐡ㄩ崐濠氭煠閹帒鍔ら柛娆忔閳规垿鎮╃紒妯婚敪濠碘槅鍋呯粙鎺楀疾閸洖绠ｉ柨鏃傛櫕閸樻捇鎮峰鍕煉鐎规洘绮岄埢搴ㄥ箻瀹曞洦鐒炬俊鐐€栭悧妤冨垝鎼淬劍鍎楀璺哄閸嬫捇鐛崹顔煎濡炪倧瀵岄崹鎷岀亱濠碘槅鍨紞宥夊籍閸喐娅滈梺鍛婁緱閸樿棄鈻撻鐐╂斀闁绘劘灏欐晶娑氱磼鐠囨彃鈧潡宕洪悙鍝勭闁挎洍鍋撻柣鎿勭節閺屾盯鍩勯崘鐐暭婵炲濮靛畝绋款潖濞差亝鐒婚柣鎰蔼鐎氭澘顭胯閸犳岸鎯€椤忓棛纾奸柕蹇曞Т缁犺鈹戦悙鏉戠仼闁轰礁顭峰畷娲焵?0-4)
					const p1 = i;
					// P2:濠电姷鏁告慨鐑藉极閹间礁纾婚柣鎰惈閸ㄥ倿鏌涢锝嗙缂佺姵鐓￠弻娑㈠Ψ閵忊剝鐝栫紒鐐礃婵倝骞堥妸銉建闁逞屽墴璺柛宀€鍋涢弸渚€鎮楅敐搴′簼闁告瑥绻戦幈銊ノ旈埀顒€螞濡ゅ懎绀夐柨鏇炲€归悡鐔兼煛閸愩劌鈧摜鏁崼鏇熺厽闊洦鎸鹃敍宥夋煃瑜滈崜婵嬶綖婢跺⊕娲冀椤剝妞芥俊鎼佸煘鎼存挸浜惧〒姘ｅ亾鐎规洏鍔庨埀顒佺⊕閿氶柍褜鍓涢弫濠氬箖瀹勬壋鏋庨煫鍥ㄦ惄娴犻箖姊虹粙娆惧剳濠电偐鍋撻梺鍝勬湰缁嬫帡骞嗛弮鍫濐潊闁绘瑢鍋撴俊顐㈡缁辨挻鎷呴幋鎺戞儓闂佺顑冮崐鏇㈩敋閿濆鏁嬮柍褜鍓欓悾鐑芥偂鎼存ɑ鏂€闂佸壊鍋侀崹铏圭礊娴ｇ硶鏀?~b6闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾绾惧鏌ｉ幇顔芥毄闁活厽鐟╅悡顐﹀炊閵娧€妲堢紓浣插亾濠㈣埖鍔曠粻瑙勭箾閿濆骸澧┑锛勫帶椤╁ジ宕ㄩ娑欐杸濡炪倖姊婚悺鏃堟倿閻愵剛绠惧璺侯儑閳藉銇勯弬璺ㄧ闁宠鍨归埀顒婄秵閸嬪棝宕㈤鍛瘈闁汇垽娼ф禒婊堟煟韫囨梻绠為柛鈹惧亾濡炪倖甯婄欢鈥斥枔濠婂嫨浜滈柕蹇婂墲椤ュ牓鏌＄仦鑺ヮ棞妞ゆ挸銈稿畷鍗炩枎韫囨挾顔掗梻浣筋嚙濞寸兘骞婇幘鍨涘亾濮樼厧骞栨い顓炵仢椤粓鍩€椤掆偓椤曪綁骞庨懞銉у姸閻庡箍鍎卞Λ娑㈠储閻㈠憡鈷戦柛娑橈工婵洨鈧鍠栭悥鑹版＂闂侀潧绻嗛幊鍥磻?
					const p2 = this.weekToByte(item.weeks);
					//P3,P4: 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柛顭戝亝閸欏繒鈧箍鍎遍ˇ顖滅矆閸愵喗鐓忓┑鐐€愰崑鎾绘煃鏉炴壆璐版繛鎾愁煼閺屾洟宕煎┑瀣碘偓妤€霉濠婂嫮绠為柡灞剧洴瀵噣鍩€椤掑嫭鍋￠柕澶嗘櫓閺佸鏌ㄥ┑鍡╂▓闁轰礁顑夐弻宥堫檨闁告挻鐟╅幃楣冩煥鐎ｎ剟妾紓浣割儏閻忔繂鐣甸崱娑欌拺缂備焦蓱缁€鈧梺绋匡工椤嘲鐣烽妷銊ｄ汗闁圭儤鎸撮幏缁樼箾閹炬潙鐒归柛瀣尰缁绘稒鎷呴崘鎻掓偐婵炴垯鍨圭猾宥夋煕鐏炲墽鐭岄柣鎺戝悑缁绘盯骞橀弶鎴犲姲闂佺顑嗛幑鍥蓟閻旂⒈鏁嶆慨姗嗗墯濞堣顪冮妶鍐ㄧ仾妞ゃ劌锕ら悾鐑芥偄绾拌鲸鏅濋梺闈涚墕濞诧妇绱炴笟鈧缁樻媴閽樺鎯炴繝娈垮枟閹告娊鐛弽顓ф晝闁挎洍鍋撶紒鐘侯潐閵囧嫰骞囬崼鏇燁€嶉梺绋匡躬濞佳囧煘閹达附鍋愮€规洖娴傞弳锟犳⒑?
					const p3 = parseInt(item.btime.split(':')[0]);
					const p4 = parseInt(item.btime.split(':')[1]);
					//P5,P6: 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌ｉ幋锝呅撻柛濠傛健閺屻劑寮撮悙娴嬪亾閸濄儳涓嶅ù鐓庣摠閸嬶綁鏌涢妷鎴濆閺嬫瑩姊虹紒妯虹濠殿喓鍊濇俊鐢稿礋椤栨氨鐤€闂佸憡鎸烽懗鍫曞汲閻樼數纾藉〒姘搐娴滄粎绱掓径濠勭Ш鐎殿喛顕ч埥澶愬閳哄倹娅囬梻浣瑰缁诲倸螞濞戔懞鍥Ω閳哄倵鎷洪梺鍦焾濞寸兘濡撮幒妤佺厱闁绘ê纾晶鐢碘偓娈垮枛椤嘲顕ｉ幘顔碱潊闁绘灏埀顒€娼″娲传閸曨剙绐涙繝娈垮灱閸樼厧宓勫銈嗘磵閸嬫挻鎱ㄦ繝鍌涙儓閻撱倝鏌ゆ慨鎰偓鏇犳暜閵夆晜鈷戦柛娑橈攻鐏忕敻鏌涢悩鏌ュ弰妞ゃ垺宀搁弫鎰緞濡粯娅撻梻浣虹帛閸旓箓宕滃▎鎴濐棜妞ゆ牜鍋為埛鎴︽煕濞戞﹫鍔熺紒鐘虫崌閹顫濋悡搴㈢彎闂佺硶鏂侀崑鎾愁渻閵堝棗鍧婇柛瀣尰閵囧嫰顢橀悙鍙壭╁?
					const p5 = parseInt(item.etime.split(':')[0]);
					const p6 = parseInt(item.etime.split(':')[1]);
					console.log(p3+':'+p4+':'+p5+':'+p6);
				
					
					//P7: 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ磸閳ь兛鐒︾换婵嬪炊閵娿儱澹掗梻浣规偠閸庢椽宕滃▎鎴犵焼闁告劦鍠楅悡蹇撯攽閻愭垵鍟弳娆戠磼閻樺啿鐏存慨濠呮閹风娀骞撻幒婵嗗Ψ婵＄偑鍊栧褰掓偋閻樿尙鏆﹀ù鍏兼綑缁犺櫕淇婇妶鍌氫壕缂佺偓鍎抽…鐑藉蓟閻旂厧绀堢憸蹇曟暜濞戙垺鐓?闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ磵閳ь剨绠撳畷濂稿閳ュ啿绨ラ梻浣烘嚀椤曨參宕戦悢铏逛笉闁诡垎鈧弨浠嬫煟濡灝绱﹂弶鈺勵潐缁绘盯骞嬪▎蹇曚患缂備胶濮风划顖炲Φ閸曨垰绫嶉柛銉仢閹惧绠?闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀缁犵娀鏌熼崜褏甯涢柛濠呭煐閹便劌螣閹稿海銆愮紓浣哄С閸楁娊寮诲☉妯锋斀闁告洦鍋勬慨鏇烆渻?
					const p7 = (item.selected == true ? 1 : 0);
		
					//P8闂傚倸鍊搁崐鎼佸磹閻戣姤鍊块柨鏃堟暜閸嬫挾绮☉妯诲櫧闁活厽鐟╅弻鐔告綇閹呮В闂?:闂傚倸鍊峰ù鍥敋瑜嶉～婵嬫晝閸岋妇绋忔繝銏ｅ煐閸旀洜绮婚弽顓熺厱妞ゆ劧绲剧粈鈧紒鐐劤濞硷繝寮婚悢灏佹灁闁割煈鍠楅悘鎾剁磽娴ｆ彃浜炬繝鐢靛Т濞诧箓鎮″☉銏＄厱闁规壋鏅涙俊鍨熆瑜庡ú婊呮閹烘鏁冮柕蹇婃嚕瑜旈弻锛勪沪閸撗勫垱濡炪們鍨哄ú鐔煎极閹版澘骞㈡繛鍡樕戣ⅷ闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鎹愵嚙缁愭鏌″搴″箹闁藉啰鍠栭弻鏇熺箾閸喖濮夊┑鈩冨絻閻楀﹪骞堥妸銉庢棃鍩€椤掆偓铻炴俊銈勬缁?濠电姷鏁告慨鐑藉极閹间礁纾婚柣妯款嚙缁犲灚銇勮箛鎾搭棞缂佽翰鍊濋弻銈夊箒閹烘垵濮跺┑鐐茬墔缁瑩寮婚悢鍏尖拻閻庨潧澹婂Σ顕€姊哄ú璇插箺妞ゃ劌锕濠氭偄閻撳海鐣鹃悷婊冪箻楠炴鎮╁ù瀣杸濡炪倖鐗楅崙褰掑吹閻斿吋鐓冪憸婊堝礈濞嗘垹涓嶇€广儱顦壕鍧楀级閸碍娅嗙€规洘鐓￠弻鐔兼倻濡儵鎷婚梺娲诲幖濡鍩?闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸屾矮澹曞┑顔矫畷顒勫储鐎电硶鍋撶憴鍕缂傚秴锕ら悾閿嬬附缁嬪灝宓嗛梺缁樻濞撳綊骞嬮柨瀣╃箚闁绘劦浜滈埀顒佺墪鐓ょ€广儱顦壕濠氭煙閹呬邯闁稿鎸鹃幉鎾礋椤掑偆妲版俊鐐€戦崝宀勬晝椤忓牆违濞撴埃鍋撶€殿喗鎸虫慨鈧柍鈺佸暞閻濐偊姊绘担鍛婂暈婵炶绠撳畷?
					const bytes = this.getLowHighBytes(parseInt(item.wtimes));
					const p8 = bytes[1];
					const p9 = bytes[0];
					//P10,P11:闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ磵閳ь剨绠撳畷濂稿Ψ椤旇姤娅堥梻浣虹《閸撴繈鎮烽妷鈺佸瀭婵犻潧鐗冮崑鎾荤嵁閸喖濮庡銈忕細缁瑥顕ｉ锕€骞㈡俊顖濆亹椤旀洟姊洪悷鎵憼闁荤喆鍎甸幃姗€鍩￠崘顏嗭紲濡炪倖鍔戦崹缁樻櫏闂備礁鎼張顒勬儎椤栫偑鈧線寮撮姀鈩冩珳闂佺硶鍓濋悷顖毼ｆ导瀛樷拻濞达絿鎳撻婊呯磼鐎ｎ偅宕岀€规洑鍗冲浠嬵敇閻愯埖鎲伴梻渚€娼ч…鍫ュ磿椤斿槈锝夊醇閻旂寮垮┑掳鍊愰崑鎾翠繆椤愶綆娈曞ǎ?0濠电姷鏁告慨鐑藉极閹间礁纾婚柣妯款嚙缁犲灚銇勮箛鎾搭棞缂佽翰鍊濋弻銈夊箒閹烘垵濮跺┑鐐茬墔缁瑩寮婚悢鍏尖拻閻庨潧澹婂Σ顕€姊哄ú璇插箺妞ゃ劌锕濠氭偄閻撳海鐣鹃悷婊冪箻楠炴鎮╁ù瀣杸濡炪倖鐗楅崙褰掑吹閻斿吋鐓冪憸婊堝礈濞嗘垹涓嶇€广儱顦壕鍧楀级閸碍娅嗙€规洘鐓￠弻鐔兼倻濡儵鎷婚梺娲诲幖濡鍩?1闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸屾矮澹曞┑顔矫畷顒勫储鐎电硶鍋撶憴鍕缂傚秴锕ら悾閿嬬附缁嬪灝宓嗛梺缁樻濞撳綊骞嬮柨瀣╃箚闁绘劦浜滈埀顒佺墪鐓ょ€广儱顦壕濠氭煙閹呬邯闁稿鎸鹃幉鎾礋椤掑偆妲版俊鐐€戦崝宀勬晝椤忓牆违濞撴埃鍋撶€殿喗鎸虫慨鈧柍鈺佸暞閻濐偊姊绘担鍛婂暈婵炶绠撳畷?
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
					// msg: '闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠煕濮橆厽銇濆┑陇鍩栧鍕偓锝庝簷濡叉劙姊绘笟鈧褑澧濋梺鍝勬噺閻╊垶骞忛幋锔藉亜閻忓繋鐒﹂弬鈧梻浣虹帛钃辩憸鏉垮暞缁傚秹鎮欓悜妯煎幈闂佺粯妫冮弨閬嶅吹閸ヮ剚鐓涢悘鐐靛亾缁€鍐偓鍨緲鐎氭澘鐣烽悡搴樻斀闁告劑鍔嬫竟鏇炩攽鎺抽崐鏇㈠疮娴煎瓨鍎楁繛鍡楃箚閺€浠嬫煟濡绲婚柡鍡樻礈缁辨帞鎷犻崣澶樻！闂侀潧娲ょ€氭澘顕ｆ禒瀣╅柨婵嗗閹规洟姊绘担渚劸妞ゆ垵妫濋獮鎰板箹娴ｇ懓浠奸梺缁樺灱濡嫰鎮欐繝鍥ㄧ厓闁告繂瀚搁弨濠氭煛?..'
					msg: hexStr
				})
				uni.navigateBack()
			},
			// 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸屾矮澹曞┑顔筋焽閸樠冣枍瀹ュ洠鍋撶憴鍕；闁告濞婇悰顕€宕堕澶嬫櫌婵犵數濮撮幊澶愬磻閹捐閿ゆ俊銈勮兌閸樻捇姊虹€圭姵銆冪紒鈧笟鈧鎶芥倷濞村鏂€濡炪倖姊婚弲顐︽儗鐎ｎ喗鐓忛柛銉戝喚浼冨Δ鐘靛仦鐢€崇暦閸楃儐娓婚柟顖嗗本顥￠梻鍌氬€搁崐椋庣矆娓氣偓楠炲鏁撻悩鍐蹭画闂佹寧娲栭崐鍝ョ不閺夊簱鏀介柣妯虹枃婢规绱?
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
			// 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閸犳牜澹曢崸妤佺厵闁诡垳澧楅ˉ澶愬箹閺夋埊韬柡灞诲€濋幊婵嬪箥椤旇偐澧┑鐐茬摠缁瞼绱炴繝鍥ц摕婵炴垯鍨瑰敮濡炪倖姊婚崢褔锝為埡鍛拺闁告繂瀚烽崕搴ｇ磼閼搁潧鍝虹€殿喖顭烽崺鍕礃閵娧呯嵁濠电姷鏁告慨瀵糕偓姘煎弮閹啴骞嬮敂瑙ｆ嫼缂備礁顑嗛娆撳磿閹扮増鐓欓柣鐔哄閸犳ɑ顨ラ悙璇ц含鐎殿喕绮欓、姗€鎮欓棃娑樼闂傚倷鑳堕…鍫ュ嫉椤掑倸鍨濈€广儱鎳夐弸鏃堟煙闂傚鍔嶉柍閿嬪灴閺屾盯鏁傜拠鎻掔闁汇埄鍨伴悥濂稿蓟閿濆棗绠犻梺鍛婃煥閻ジ宕ｉ崨瀛樷拺缂備焦蓱閻撱儵鏌涘顒夊剶鐎规洘鍨块幃銏ゅ箹閻愭壆鐩庨梻浣告惈濞诧箓銆冮崨顔绢洸濡わ絽鍟崐鐢告偡濞嗗繐顏紒鈧崘鈹夸簻闁靛鍎婚煬顒勬煏閸℃洜绐旂€殿喗鎸虫慨鈧柍鈺佸暞閻濐偊姊绘担鍛婂暈婵炶绠撳畷?
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
