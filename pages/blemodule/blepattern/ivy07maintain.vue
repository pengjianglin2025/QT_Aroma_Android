<template>
	<view class="maintain-shell">
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
				<MajorMode maintainPage="ivy07maintain"></MajorMode>
			</view>
			<view v-if="modeFlag==0">
			<!-- 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌ｉ幋锝呅撻柛銈呭閺屻倗绮欑捄銊ょ驳闂佸憡鐟ョ换鎴﹀Φ閸曨垰绠婚柛妤冨仧娴犺偐绱掗悙顒€鍔ゆい顓犲厴瀵鎮㈤悡搴ｎ槶閻熸粌绻掗弫顔尖槈閵忥紕鍘介梺瑙勫劤椤曨厼煤閹绢喗鐓涢悘鐐插⒔濞插鈧鍠楅幐铏繆閹间礁唯闁靛鍠楀ù鍥⒒娴ｇ瓔鍤欑紒缁樺姉閹广垻鈧綆鍠栫涵鈧梺瑙勫劶濡嫮绮婚悩铏弿婵☆垱瀵х涵楣冩煟閹惧娲撮柡灞剧洴楠炲洭宕滄担绋跨厒濠电偛鐡ㄧ划搴ㄥ磻閹捐埖宕叉繛鎴欏灩闁卞洦绻濋棃娑氬闁惧繐閰ｅ娲传閸曢潧鍓辩紓浣割儐閹告儳危閹版澘绠抽柡鍐ㄥ€婚敍婊冣攽閳藉棗鐏ユ繛鍜冪秮閹兘濡搁埡鍌楁嫼閻庤娲栧ú銊ф暜濞戙垺鐓欓柣鐔哄閸犳﹢鏌ｅ☉鍗炴灓闁逞屽墾缂嶅棝宕板Δ鍛柧婵犻潧顑嗛悡鍐喐濠婂牆绀堟繛鎴欏灪閸嬫牠鏌熼鍡楄嫰閹垶绻濋姀锝嗙【妞ゆ垵娲畷銏ゅ础閻戝棙瀵岄梺闈涚墕濡鎱ㄨ缁辨帡骞撻幒鎴旀寖缂備緡鍠栭悧鎾崇暦濮椻偓椤㈡瑩鎮剧仦钘夋辈濠电姷鏁搁崑鐐哄垂閸洘鍤屽Δ锝呭暙閸戠姵绻涢幋娆忕仾闁绘挻鐟﹂妵鍕籍閳ь剟顢栧▎蹇ｇ劷闁规壆澧楅悡娆戔偓鐟板婢ф宕抽悾宀€纾兼い鏃傛櫕閹冲嫰鏌熼娑欘棃妤犵偞锕㈠鍫曞箣閻樻壙銊╂⒒?-->
			<view class="modeList">
				<view class="title time-title">
                    <view>{{$t("timer-settings")}}</view>
					<!-- <view style="font-weight: normal;color: #a3a3a3;font-size: 26rpx;">闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋涢ˇ鐢稿极閹剧粯鍋愰柤纰卞墻閸炲爼姊绘担鍛婅础闁惧繐閰ｅ畷浼村冀椤撶喎浠鹃梺缁樺姦閸撴稓绮绘ィ鍐╃厱闁斥晛鍘鹃鍫熷€堕柍鍝勫暟绾惧ジ鏌嶈閸撴氨鎹㈠┑瀣倞闁靛ě鍐ㄧ闂備礁鎼ˇ顖炴偋閸℃ɑ娅犲ù鐘差儐閸嬧晠寮堕崼姘珖缁炬儳鍚嬮妵鍕箛閳轰胶浼勯柡浣哥墦濮婃椽宕崟顒佹嫳闂佺儵鏅╅崹鍫曞Υ娓氣偓瀵挳濮€閳╁啯鐝抽梻浣虹《閸撴繈鎮烽姣硷絾瀵肩€涙ǚ鎷绘繛杈剧悼閹虫捇顢氬鍛＜閻庯綆鍋呭畷宀€鈧娲戦崡鍐差嚕娴犲鏁囬柣鎰煐閹?5:11</view> -->
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
				devicemsg: {}, //闂傚倸鍊搁崐鎼佸磹瀹勬噴褰掑炊瑜忛弳锕傛煕椤垵浜濋柛娆忕箻閺岀喖骞嗛弶鍟冩捇鏌涙繝鍌涘仴闁哄被鍔戝鎾倷濞村浜鹃柛婵勫劚椤ユ岸鏌涜椤ㄥ棝鎮″▎鎾村仯闁告繂瀚幆鍫熴亜閵壯冧槐闁哄本鐩俊鐑筋敊閻撳簶鎷婚梻浣芥〃缁€浣肝涘Δ鍛畳闂備焦瀵х换鍌炴偋閸曨垰鐒垫い鎴ｆ娴滈箖姊绘担濮愨偓鈧柛瀣崌閺岀喖骞嗛弶鍟冩捇鏌嶉柨瀣伌闁哄矉绻濆畷鎺懳熼崫鍕潥婵犵數鍋涢幊搴ㄥ箠濮椻偓瀵鈽夐姀鈥充簻闂佸憡鐟ラˇ浼存偟閺嵮€鏀介柍銉ュ暱缁狙囨煕閺冣偓閻熴儵顢氶敐鍡欘浄閻庯絽鐏氶弲锝夋⒑缂佹ɑ鐓ラ柟纰卞亜椤曪綁鎼归銈囩槇闂佹眹鍨藉褎绂掗敃鍌涚厱闁靛鍎抽崺锝夋煙椤旀儳鍘存い銏＄洴閹瑩鎳犻澶嬓ラ梻鍌欒兌閹虫挻鏅舵惔銊ョ；闁靛牆鎷嬪鏍磽娴ｈ偂鎴炲垔閹绢喗鐓熼柣鏃傚帶娴滀即鏌涢妶鍜佸剳缂佽鲸鎸婚幏鍛村礈閹绘帒澹夐梻浣规偠閸斿苯顭囬敓鐘靛祦闁告劏鏂傞崑鍛存煕閹般劍娅呴柛?
				isChanged:false,
				modeFlag: 1,//0闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸婂潡鏌ㄩ弮鍫熸殰闁稿鎸剧划顓炩槈濡娅ч梺娲诲幗閻熲晠寮婚悢鍏煎€绘俊顖濇閸旂鈹戦悙鑼癁闁哄懐濞€瀵寮撮悢铏诡啎闂佺粯鍔﹂崜姘舵偟閺囥垺鈷戠紒瀣儥閸庡矂鏌￠崨顔剧煂闁瑰箍鍨归埞鎴犫偓锝庡亽濡啫鈹戦悙鏉戠仴鐎规洦鍓熷畷婊堝箥椤斿墽锛滅紓鍌欓檷閸ㄥ綊鐛幇鐗堢厱閻庯綆鍋呭畷灞炬叏婵犲嫮甯涢柟宄版嚇瀹曘劍绻濋崘銊ュ濠电姷鏁搁崑娑㈡儑娴兼潙绀夐柟瀛樼箘閺嗭附銇勯幒鎴濐仾闁搞倕绉归弻鏇熷緞濞戞氨鏆犲銈呭閹瑰洤顫忓ú顏勫窛濠电姴鍟棄宥夋偡濠婂嫭绶查柛鐕佸亰閸┿垽骞樼拠鍙傗晠鏌嶉崫鍕簽婵☆偄鎳庨—鍐Χ閸℃顫囬梺鎼炲妽濡炶棄鐣烽幒妤€惟闁冲搫鍊婚崢閬嶆煙閸忚偐鏆橀柛銊ョ秺閸┿垽寮撮姀锛勫幗?闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸婂潡鏌ㄩ弮鍫熸殰闁稿鎸剧划顓炩槈濡娅ч梺娲诲幗閻熲晠寮婚悢鍏煎€绘慨妤€妫欓悾鐑芥⒑缁嬪灝顒㈡い銊ユ婵＄敻宕熼姘棟闂佸壊鐓堥崰鎺楀箰閸愵亞纾藉ù锝呮惈鏍″┑鈽嗗亜閸熸潙顕ｆ繝姘亜闁绘挸娴烽悾楣冩偡濠婂嫮鐭掔€规洜鏁婚幃銏ゅ礂閼测晛甯楃紓鍌氬€烽悞锕佹懌闂佹娊鏀遍崝娆撳蓟閻斿摜鐟归柛顭戝枛椤牆顪冮妶搴′簼缂侇喗鎸搁悾鐑藉础閻愬秵妫冮崺鈧い鎺嶇贰濞堫厼鈹戦悩鍨毄闁稿濞€楠炴捇顢旈崱妤冪瓘闂佸吋浜介崕鎶芥偟鐠鸿　鏀介柣妯哄级閹兼劙鏌?
				indicatorStyle: `height: 50px;`,
                hList:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                mList:[0,10,20,30,40,50,59],
                gearList: [1,2,3,4,5],
                gearIdx: 1,
                hvalue: [0],
                mvalue: [1],
                curTime: 90,
                timingOff: false,
                refreshQueryTimer: null,
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
			this.modeFlag = this.parameterMode
			this.selIndex = e.index;
			this.curTime = this.simpleMode
            console.log('simple mode current time', this.curTime);
			this.gearIdx = 1*this.curGear-1
			this.initTime()
			if(this.gearNum){
				let gList = []
				for(let i=1; i<=this.gearNum; i++){
					gList.push(i)
				}
				this.gearList = gList
			}
			this.refreshFromDevice()
		},
		onShow() {
			this.$store.commit('SET_OFFLINE',false)
			console.log(this.is24hour);
			this.refreshFromDevice()
		},
		methods: {
			refreshFromDevice(){
				if(this.refreshQueryTimer){
					clearTimeout(this.refreshQueryTimer)
				}
				if(!this.deviceId || this.isOffline){
					return
				}
				this.refreshQueryTimer = setTimeout(() => {
					if(!this.deviceId || this.isOffline){
						return
					}
					const queryData = getApp().dataHexStr('00','', '')
					getApp().writeData(this.deviceId, queryData, true, '', true)
				}, 350)
			},
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
			//闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋涢ˇ鐢稿极瀹ュ绀嬫い鎺嶇劍椤斿洭姊绘担鍛婅础闁稿簺鍊濆畷闈涱潩椤戠偞妞介、鏃堝川椤旂晫褰囬梻鍌欑窔閳ь剛鍋涢懟顖涙櫠閹绢喗鐓欐い鏇楀亾缂佺姵鐗犻獮鍐煥閸喎鐧勬繝銏ｆ硾閻牓宕禒瀣拻濞达絿鍎ら崵鈧紓浣哄Т缁夌懓鐣峰┑鍥ㄥ劅闁靛鍎抽悰銉╂⒑閸濆嫮鈻夐柛妯恒偢瀹曞綊宕掗悙瀵稿幍濡炪倖鐗曞Λ妤呭箠韫囨挴鏋斿Δ锝呭暞閳锋垿鏌熼懖鈺佷粶闁告梹顨婇弻锟犲川椤忓懏鐝氶悗?
			changeMode(num){
				console.log(num);
				this.modeFlag = num
				this.$store.commit('SET_PARAMETERMODE',num)
			},
			//缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌ｉ幋锝呅撻柛銈呭閺屻倗绮欑捄銊ょ驳闂佸憡鐟ョ换鎴﹀Φ閸曨垰绠婚柛妤冨仧娴犺偐绱掗悙顒€鍔ゆい顓犲厴瀵鎮㈤悡搴ｎ槶閻熸粌绻掗弫顔尖槈閵忥紕鍘介梺瑙勫劤椤曨厼煤閹绢喗鐓涢悘鐐插⒔濞插鈧鍠楅幐铏繆閹间礁唯闁靛鍠楀ù鍥⒒娴ｇ瓔鍤欑紒缁樺姉閹广垻鈧綆鍠栫涵鈧梺瑙勫劶濡嫮绮婚悩铏弿婵☆垱瀵х涵楣冩煟閹惧娲撮柡灞剧洴楠炲洭宕滄担绋跨厒濠电偛鐡ㄧ划搴ㄥ磻閹捐埖宕叉繛鎴欏灩闁卞洦绻濋棃娑氬闁惧繐閰ｅ娲传閸曢潧鍓辩紓浣割儐閹告儳危閹版澘绠抽柡鍐ㄥ€婚敍婊冣攽閳藉棗鐏犻柟纰卞亰閿濈偤骞掑Δ浣糕偓鐢告偡濞嗗繐顏紒鈧崼鐔翠簻闁靛繒濯撮崝鐔虹磼椤旀鍤欓柍钘夘槸铻ｉ梺鍨儛濞兼梹绻濈喊妯活潑闁搞劍濞婇崺娑㈠醇閵夈儴鍩為悷婊呭鐢鍩涢幒鎴欌偓鎺戭潩閿濆懍澹曟繝鐢靛仒閸栫娀宕ㄩ鐓庣哎闂備胶纭堕崜婵堢矙閹达附鍊块柛顭戝亖娴滄粓鏌熼崫鍕棞濞存粌澧界槐鎺楀礈瑜戝鎼佹煕濡亽鍋㈤柛鈹垮灲楠炴﹢鎳滈棃娑欑€梻浣告啞濞诧箓宕㈡ィ鍐炬晩?
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
			//闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋為悧鐘汇€侀弴銏犖ч柛銉㈡櫇閸橆垶姊绘担鍛婂暈婵炶绠撳畷銏ゆ寠婢跺本娈鹃梺鍛婄懃椤﹁京寮ч埀顒勬⒒閸屾氨澧涘〒姘殜瀹曟洟骞囬悧鍫㈠幈闁诲函缍嗛崐鏍箣閻樺啿搴婂┑鐐村灟閸ㄥ綊鐛姀鈥茬箚闁靛牆瀚崗灞俱亜閳衡偓閸楀啿顫忓ú顏勭闁绘劖绁撮崑鎾诲冀椤剝妞介幃銏ゆ偂鎼淬倖鎲伴柣搴＄畭閸庨亶鎮у鍐剧€堕柕濞炬櫆閳锋垿鏌涘☉姗堟敾閻忓繑澹嗛埀顒€鍘滈崑鎾绘煙闂傜鍏岀€规挷绶氶弻娑㈩敃閻樻彃濮庨柟顖滃枛閹嘲顭ㄩ崘鐐枅閻庤娲橀崹鍧楃嵁濡偐纾兼俊顖滅帛閻濇娊姊虹涵鍛汗閻炴稏鍎甸崺鈧い鎺嶇婢ь垱绻涢懖鈺佷壕缂佺粯绻堥幃浠嬫濞戞鎹曟俊鐐€х€靛矂宕ｉ崘銊ф殾閻熸瑥瀚々鐑芥倵閿濆簼娴烽柟鑺ユ礋濮婃椽寮妷锔界彅闂佸摜鍣ラ崑鍡椻枎閵忋倖鍊烽柣鎴灻埀顒€鐖奸弻锝夊箛椤栨稓銆愰悶姘哺濮婅櫣鎷犻幓鎺濆妷闂佺瀛╂繛濠囧春閻愬搫绠ｉ柨鏃囧Г濞呮牠姊洪崨濠冨闁稿鍊婚崚鎺楀醇閺囩啿鎷虹紓浣割儏鐏忓懎顔忛妷鈺傜厽闊洦姊荤粻鐐烘煥?
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
					// console.log('濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柣鎴ｆ閺嬩線鏌涘☉姗堟敾闁告瑥绻橀弻鐔虹磼閵忕姵鐏堥梺缁樻尵閸犳牠寮婚弴鐔风窞闁糕剝蓱閻濇棃鏌涢妷锔藉唉婵﹥妞藉畷銊︾節娴ｈ櫣绠掗梻浣告啞鐪夌紒顔界懇楠炲啫顫滈埀顒€鐣烽崡鐐╂婵炲棗鏈€氳棄鈹戦悙鑸靛涧缂佽弓绮欓獮澶愭晸閻樿尙鐣鹃梺鍓插亞閸犲棙绂嶅鍫熺叆闁哄啫娴傞崵娆徝瑰鈧崡鎶藉蓟濞戙垹鐓橀柟顖嗗倸顥氭繝纰夌磿閸嬫垿宕愰弽褜鍟呭┑鐘宠壘绾惧鏌熼幆褏浜柛瀣尭閳绘捇宕归鐣屼邯闂備胶绮悧鏇㈠Χ閹间礁违?');
				}else if(parseInt(eH)==parseInt(bH)){
					if(parseInt(eM)>=parseInt(bM)){
						// console.log('濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柣鎴ｆ閺嬩線鏌涘☉姗堟敾闁告瑥绻橀弻鐔虹磼閵忕姵鐏堥梺缁樻尵閸犳牠寮婚弴鐔风窞闁糕剝蓱閻濇棃鏌涢妷锔藉唉婵﹥妞藉畷銊︾節娴ｈ櫣绠掗梻浣告啞鐪夌紒顔界懇楠炲啫顫滈埀顒€鐣烽崡鐐╂婵炲棗鏈€氳棄鈹戦悙鑸靛涧缂佽弓绮欓獮澶愭晸閻樿尙鐣鹃梺鍓插亞閸犲棙绂嶅鍫熺叆闁哄啫娴傞崵娆徝瑰鈧崡鎶藉蓟濞戙垹鐓橀柟顖嗗倸顥氭繝纰夌磿閸嬫垿宕愰弽褜鍟呭┑鐘宠壘绾惧鏌熼幆褏浜柛瀣尭閳绘捇宕归鐣屼邯闂備胶绮悧鏇㈠Χ閹间礁违?');
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

					// Pl:濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柣鎴濐潟閳ь剙鍊块幐濠冪珶閳哄绉€规洏鍔戝鍫曞箣濠靛牃鍋撻鐑嗘富闁靛牆鎳愮粻浼存煟濡も偓濡繈骞冮悙鍝勫瀭妞ゆ劗濮崇花濠氭⒑閻熺増鎯堟俊顐ｎ殕缁傚秹宕滆绾惧ジ鏌涢幘妤€妫欓妤呮⒑閸涘鎴﹀磿閹惰棄鐓″鑸靛姈閸嬨劎绱掔€ｎ厽纭堕柛鏃撶畱椤啴濡堕崱妤冪懆闁诲孩鍑归崣鍐春濞戙垹绠ｉ柨鏃傛櫕閸樺崬鈹戦悩缁樻锭婵☆偅顨婇、鏃堫敃閵堝倸浜炬繛鎴炵懅缁犳捇鏌嶇憴鍕伌闁诡喗鐟╅幊鐘活敆娴ｇ鐟庨梻鍌欒兌椤牓鏁冮妷鈹库偓鍐╃節閸モ晛绁?闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋涢ˇ鐢稿极瀹ュ绀嬫い鎺嶇劍椤斿洭姊绘担鍛婅础闁稿簺鍊濆畷鐢告晝閳ь剟鍩ユ径濞㈢喎顭ㄩ崟顒夋閻庤娲忛崝鎴︺€佸鈧幃銏ゅ箛閻旂鍝烘慨濠勭帛閹峰懘鎼归獮搴撳亾婵犲洦鐓曢柟鎯ь嚟缁犵偤鏌嶉妷顖滅暤鐎规洖鐖奸、鏍煥椤栨矮澹曢梺鍛婄☉閻°劑宕愭繝姘厾闁诡厽甯掗崝銈夋煕濞嗗繑顥滈柍瑙勫灴閹晝绱掑Ο濠氭暘婵犵妲呴崑鍛矙閹烘鐤鹃柛顐ｆ礀缁狅綁鏌ㄩ弮鍌涙珪闁告ɑ鎹囬幃宄邦煥閸曨厾鐓夐悗瑙勬礃缁矂鍩㈡惔銊ョ鐎规洖娲﹂悞鐐繆閻愵亜鈧牠鎮уΔ鍐ㄥ灊閹兼番鍔嶉崕妤€顭跨捄鍝勵槵闁稿鎹囬悰顕€宕归鐓庮潛婵＄偑鍊х€靛矂宕归幏宀€浜辨繝纰樻閸垳绱炲澶婄睄闁割偆鍠愬▍婊堟⒑閸涘﹣绶遍柛妯挎閳绘捇顢橀悙鈺傛杸闂佺粯鍔樼亸娆愭櫠濞戞氨纾奸悹鍥ㄥ絻閳ь剙娼″畷娲倷閸濆嫮顓洪梺鎸庢磵閸嬫捇鏌ｉ幙鍕瘈闁哄本鐩崺鍕礃閻愵剛鏆┑鐐差嚟婵潧鐣濈粙娆炬綎婵炲樊浜濋悞濠氭煟閹邦垰钄奸悗姘緲椤儻顧侀柛鐘冲哺閹偓妞ゅ繐妫涚壕濂告煏韫囨洖孝缂佺姾顕ч埞鎴︽倷閺夋垹浠奸梺杞扮椤嘲鐣峰ú顏勭劦?0-4)
					const p1 = i;
					// P2:婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｉ幇顒佹儓闁搞劌鍊块弻娑㈩敃閿濆棛顦ョ紓浣哄У閻擄繝寮诲☉銏犖ㄩ柕蹇婂墲閻濇牜绱掗悙顒€绀冨┑顔哄€濋獮鍫ュΩ閵夘喗寤洪梺閫炲苯澧寸捄顖炴煕瀹€鈧崑娑㈠几娓氣偓閹鏁愭惔鈥茬凹闂佸憡鐟ョ换鎴﹀箞閵娿儙鏃堝焵椤掆偓铻炴俊銈呮噹缁€澶愭煥閺囩偛鈧綊鎮￠悢鍏肩厸闁告劑鍔岄埀顒€鎽滈弫顕€宕奸弴鐔哄幗闂婎偄娲﹂幐楣冩晬瀹ュ鐓冪憸婊堝礈濠靛缍栧璺衡姇濞差亜鍐€妞ゎ兘鍓濆鑺ヤ繆閹间礁鐓橀幖瀛樻尭娴滄儳銆掑锝呬壕閻庤娲忛崝搴ㄥ焵椤掍胶鈯曢柨姘舵煃瑜滈崜娑㈠极婵犳艾绠栫€瑰嫭澹嬮弸搴ㄧ叓閸ャ劍鎯勫ù鐘荤畺濮婅櫣绮欏▎鎯у壋婵犵數鍋愰崑鎾绘⒑閸濆嫭婀扮紒瀣浮楠炲棝寮崼婵愭綂闂佺粯鐟㈤崑鎾翠繆椤愩垺顥犵紒杈ㄦ尰閹峰懘骞嬮幒鎴炲創闂備胶顭堥鍐磹閺囥埄鏁嬮柨婵嗩樈閺佸鏌嶈閸撴瑩鎮鹃悜鑺ュ亗閹煎瓨蓱閺傗偓闂備礁澹婇崑渚€宕归搹鍦濞达絿纭堕弨?~b6闂傚倸鍊搁崐鎼佸磹瀹勬噴褰掑炊瑜忛弳锕傛煟閵忋埄鐒剧痪鎯ь煼閺岋綁骞囬鑺ユ瘎闂佹椿鍘介悷鈺呮偂椤愶箑鐐婇柕濞р偓濡插牏绱撴担鎻掍壕婵犮垼鍩栭崝鏇犵不鐟欏嫮绠鹃柨婵嗛婢ь喖鈹戦敍鍕付妞も晛銈稿畷銊╊敇濞戞瑦鏉告俊鐐€栧濠氭偤閺冨牊鍊块柣鎰靛墰缁犳儳顭跨捄渚剳闁宠棄顦伴妵鍕棘鐠恒劎顔囬梺瀹狀潐閸ㄥ綊鍩€椤掑﹦绉甸柛瀣瀹曘垽顢旈崨顖滅槇闂佹眹鍨藉褎绂掑鍫熺厽闊洦姊荤粻鐐烘煕閳规儳浜炬俊鐐€栫敮濠勬閳ユ枼鏋旀繝濠傚娴滄粓鏌曡箛濠傚⒉妞ゃ儱鐗撻弻锛勪沪閼恒儺妫炲銈嗘尭閵堢鐣烽崡鐐╂瀻闊洦鎸鹃鎺楁⒒娴ｇ瓔鍤欐繛瀵稿厴楠炲﹪骞橀崹娑樹壕婵鍘ч獮鏍ㄣ亜椤撶偟浠㈡い顐ｇ矒閸┾偓妞ゆ巻鍋撴い鏇秮楠炲酣鎳為妷褍濮搁柣搴＄畭閸庡崬螞濞戙垹鍌ㄩ柣銏犳啞閳锋垿鏌涘☉姗堝伐濠殿喖娲ㄩ埀顒侇問閸犳牠鎮ラ懝鐗堬紓闂備線娼х换鍡涘箠閸ヮ剙纾?
					const p2 = this.weekToByte(item.weeks);
					//P3,P4: 闂傚倸鍊搁崐鎼佸磹瀹勬噴褰掑炊瑜忛弳锕傛煕椤垵浜濋柛娆忕箳閳ь剙绠嶉崕閬嵥囬婊呯焼闁告劦鍠楅悡蹇撯攽閻愵亜鈧劙宕戦幘缁樼厓閺夌偞澹嗙拹鐗堢箾閹炬剚鐓奸柡灞炬礋瀹曠厧鈹戠€ｇ鍋撳Δ鈧湁婵犲﹤瀚粻鐐烘煛鐏炲墽娲寸€殿噮鍣ｉ崺鈧い鎺戝閸嬶繝鏌曟径鍡樻珦闁轰礁顑夐弻銊モ攽閸♀晜鈻撻梺杞扮椤戝寮诲鍫闂佸憡鎸婚悷鈺呭箖妤ｅ啯鐓ラ悗锝庡墴濡绢喚绱撴担鍓插剰闁诲繑绻傞悾鐢稿幢濞戞瑢鎷虹紓鍌欑劍钃辩紒鈧埀顒勬⒑缁嬪尅宸ユい顓炲槻閻ｇ兘濡烽妸锝勬睏闂佸湱鍎ら幐鎾箯缂佹绠鹃柟鐐綑閻掑綊鏌涚€ｎ偅灏扮紒缁樼⊕閹峰懘宕橀幓鎺撳亹濠电偞鍨崹鍦尵瀹ュ鐓曢悘鐐插⒔閻矂鏌ｉ幒鎴濇倯缂佺粯鐩獮姗€寮堕幋鐘插Р闂備胶顭堥鍡涘箲閸ヮ剙钃熼柣鏃傗拡閺佸秵鎱ㄥ鍡楀婵炲牐顕ч—鍐Χ閸愩劎浠惧銈冨妼閿曘倝鎮鹃悜鑺ュ亜缁炬媽椴搁弲婵嬫⒑闂堟稓澧曟繛璇у缁辩偞绗熼埀顒€顫忕紒妯诲闁芥ê顦幆鐐寸節濞堝灝鏋熼柟鍛婂▕閻涱噣寮介褎鏅濋梺鎸庢磵閸嬫挾绱掗悩渚綈闁靛洤瀚伴獮鍥醇閺囩噥鈧秹姊虹粙鍖¤含婵炰匠鍥х厴闁硅揪闄勯崑鎰偓瑙勬礀濞村倿寮抽敓鐘斥拺?
					const p3 = parseInt(item.btime.split(':')[0]);
					const p4 = parseInt(item.btime.split(':')[1]);
					//P5,P6: 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻锝夊箣閿濆憛鎾绘煕婵犲倹鍋ラ柡灞诲姂瀵挳鎮欏ù瀣壕闁告縿鍎虫稉宥吤归悡搴ｆ憼闁稿缍侀弻娑㈠Ψ閹存繂顏ら柡瀣懇濮婅櫣绱掑Ο铏诡儎婵犳鍠撻崐婵囦繆閻㈢绀嬫い鏍ㄦ皑閻も偓闂備礁鎲￠幐鐑芥嚄閸洖姹查柣妯兼暩绾捐棄銆掑顒佹悙濞存粍绮庣槐鎺撳緞婵犲嫮楔閻庢鍠涢褔鍩ユ径鎰潊闁冲搫鍊瑰▍鍥⒒娴ｇ懓顕滅紒璇插€歌灋婵炴垟鎳為崶顒€惟闁冲搫鍊甸幏娲⒑閸︻収鐒炬繛瀵稿厴婵℃挳骞掑Δ浣哄幈闂佺粯锚绾绢厽鏅堕悽纰樺亾濞堝灝鏋涙い顓炲槻椤曪綁骞橀纰辨綂闂佺粯顭堢亸顏堝焵椤掆偓濞尖€愁潖濞差亜浼犻柛鏇ㄥ墮缁愭稒绻濆▓鍨伇闁告鍘у畵鍕渻閵堝棙纾甸柛瀣尰閹便劍绻濋崒娑欏創闁绘挶鍊濋弻銈嗘叏閹邦兘鍋撻弴鐘虫殰闁靛鏅滈埛鎴︽煕濞戞﹫鏀婚悘蹇曟暬閺屾盯鎮╅弻銉ュ及濡炪們鍨哄畝鎼佸极閹邦厼绶炴俊顖滅帛濞呮捇姊绘担铏瑰笡闁告棑绠撳畷婊冣枎閹存繍妫滃銈嗙墱閸嬬偤鍩涢幋锔界厱婵炴垶锕崝鐔虹磼閻樿櫕宕岄柟顔筋殔椤繈鎮℃惔銏㈠綆闂備胶纭堕弬渚€宕戦幘鎰佹富闁靛牆妫楅崸濠囨煕鐎ｎ偅灏伴柕鍥у椤㈡﹢鎮欓崣澹晛顪?
					const p5 = parseInt(item.etime.split(':')[0]);
					const p6 = parseInt(item.etime.split(':')[1]);
					console.log(p3+':'+p4+':'+p5+':'+p6);
				
					
					//P7: 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌涢锝嗙８闁逞屽厸閻掞妇鎹㈠┑瀣倞闁靛鍎辨竟鎺楁⒒娴ｈ鍋犻柛搴㈡そ瀹曟粌鈻庨幋鐘电劶闂佸憡鍔﹂崰妤呮偂韫囨挴鏀介柣鎰灥閸燁偊寮冲▎鎴犵＜闁绘ê鍟块悘瀛樻叏婵犲懏顏犻柟椋庡█楠炴捇骞掑┑鍡椢ㄥ┑锛勫亼閸婃牕顫忚ぐ鎺撳亱闁绘灏欓弳锕€霉閸忓吋缍戠紒鐘烘珪娣囧﹪濡堕崒姘缂備胶鍋撻崕鎶解€﹂悜钘夎摕闁绘梻鍘х粈鍫㈡喐韫囨洘鏆滄繛鎴欏灪閻?闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌涢锝嗙５闁逞屽墾缁犳挸鐣锋總绋款潊闁炽儱鍟跨花銉╂⒒娴ｇ儤鍤€妞ゆ洦鍙冨畷鎴︽偄閾忛€涚瑝闂佽鍨庨埀顒勫绩娴犲鐓熸俊顖氱仢缁憋箓寮堕埡鍕垫綈缂佺粯鐩獮瀣枎韫囨洑鎮ｇ紓鍌欒兌婵鍒掗鐐参﹂柛鏇ㄥ灠缁秹鏌涢妷顔句虎闁规儳顕粻?闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌涢锝嗙缂佺姷濞€閺岀喖宕滆鐢盯鏌涙繝鍛厫闁逛究鍔岃灒闁圭娴烽妴鎰磽娴ｅ搫小闁告濞婂璇测槈濡攱鏂€闂佸憡娲﹂崑鍕叏閺囩儐娓?
					const p7 = (item.selected == true ? 1 : 0);
		
					//P8闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸婂潡鏌ㄩ弮鍫熸殰闁稿鎸剧划顓炩槈濡娅ч梺娲诲幗閻熲晠寮婚悢鍛婄秶闁诡垎鍛掗梻?:闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃秹锝炲┑瀣櫇闁稿矉濡囩粙蹇旂節閵忥絽鐓愰柛鏃€娲滅划濠氬冀椤撶喓鍘卞銈嗗姧缁插墽绮堥埀顒傜磼閻愵剙鍔ゆ繛纭风節瀵鎮㈢亸浣圭亖闂佸壊鐓堥崰妤呮倶閹惧墎纾藉ù锝嗗絻娴滅偓绻濋悽闈浶㈡繛璇х畵閹€斥槈閵忥紕鍘遍梺瑙勫閺呮稒淇婇崹顕呯唵鐟滃骸煤濠婂懏顫曢柟鐑橆殢閺佸啴鏌曡箛濠冨殨鐟滄棃寮婚敍鍕勃闁告挆鍕灡婵＄偑鍊戦崹鍝劽洪悢鐓庢瀬闁圭増婢橀獮銏＄箾閸℃〞鎴ｂ叿闂傚倸鍊搁崐鐑芥倿閿旈敮鍋撶粭娑樻噽閻瑩鏌熼幑鎰靛殭缂佹劖顨婇弻鈥愁吋鎼粹€崇闂佽棄鍟伴崰鏍蓟閺囩喓绠鹃柛顭戝枛婵鈹戦埄鍐ㄧ祷闁绘锕獮鍫ュΩ閵夊孩妫冮崺鈧い鎺嗗亾閾荤偞淇婇妶鍕樂缂?婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｅΟ娆惧殭缂佺姴鐏氶妵鍕疀閹炬惌妫炵紓浣界堪閸婃繈寮婚妶澶婄畳闁圭儤鍨垫慨璺衡攽閻愯尙澧旂紒顔界懇瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鈧鍝劽虹拠鎻掔濡炪們鍔岄敃顏勵嚕婵犳碍鍋勯柣鎾虫捣閻ｉ箖鎮峰鍐妤犵偞顨婇幃鈺伱圭€ｎ偅鏉告俊鐐€栭悧妤呭礄瑜版帒鍚归柣鏂垮悑閻撳啰鎲稿鍫濈婵炲棙鍨规稉宥団偓骞垮劚椤︻垳澹曢崸妤€绾ч柛顐ｇ濞呭棛鈧娲橀悡锟犲蓟閻斿吋鍊绘俊顖滃劦閹峰姊哄ú璇插箹婵☆偅顨婇崺?闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋為悧鐘汇€侀弴銏犖ч柛灞剧煯婢规洖鈹戦鐭亜鐣烽鍕偍閻庣數纭堕崑鎾舵喆閸曨剛顦ョ紓鍌氱Т閿曘倝鎮鹃柨瀣檮缂佸鐏濆畵鍡涙⒑缂佹ɑ顥嗘繛鎾崇秺楠炲鏌ㄧ€ｂ晝绠氶梺缁樺姦娴滄粓鍩€椤掍胶澧悡銈団偓骞垮劚椤︻垳澹曟繝姘厵闁诡垎鍛偗闂佺顑嗛幐楣冨箟閹绢喖绀嬫い鎺戝亞濡茬増淇婇悙顏勨偓鎴﹀礉瀹€鍕櫇妞ゅ繐鐗嗚繚婵炴挻鍩冮崑鎾垛偓娈垮枟閹歌櫕鎱ㄩ埀顒勬煃閳轰礁鏆為柣婵愬亰濮婄粯鎷呴崨濠傛殘濠电偠顕滅粻鎾崇暦?
					const bytes = this.getLowHighBytes(parseInt(item.wtimes));
					const p8 = bytes[1];
					const p9 = bytes[0];
					//P10,P11:闂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌涢锝嗙５闁逞屽墾缁犳挸鐣锋總绋课ㄦい鏃囧Г濞呭牓姊绘担铏广€婇柛鎾寸箞閹兘濡烽埡浣哥€┑鐘绘涧閻楀啴宕戦幘鑽ゅ祦闁割煈鍠栨慨搴☆渻閵堝繒绱扮紒顔界懃椤曪綁顢曢敃鈧獮銏′繆椤栨繂浜规い鏃€娲熷娲偡閹殿喗鎲奸梺鑽ゅ枂閸庣敻骞冨鈧崺锟犲礃椤忓棴绱叉俊鐐€栭崝鎴﹀垂缂佹ɑ娅忛梻鍌欑閹碱偊寮甸鍕剮妞ゆ牜鍋戦埀顑跨窔瀵挳濮€閳╁啯鐝抽梻浣虹《閸撴繈鎮烽姣硷絾瀵肩€涙ǚ鎷绘繛杈剧悼閹虫捇顢氬鍛＜閻庯綆鍋呭畷宀€鈧娲戦崡鍐差嚕娴犲鏁囬柣鎰煐閹蹭即姊绘笟鈧褔鈥﹂崼銉ョ？妞ゆ柨妲堥敐澶婇唶闁绘梻顭堝鍨攽鎺抽崐鎰板磻閹剧繝绻嗘い鎰剁秵濞堟洖菐?0婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｅΟ娆惧殭缂佺姴鐏氶妵鍕疀閹炬惌妫炵紓浣界堪閸婃繈寮婚妶澶婄畳闁圭儤鍨垫慨璺衡攽閻愯尙澧旂紒顔界懇瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鈧鍝劽虹拠鎻掔濡炪們鍔岄敃顏勵嚕婵犳碍鍋勯柣鎾虫捣閻ｉ箖鎮峰鍐妤犵偞顨婇幃鈺伱圭€ｎ偅鏉告俊鐐€栭悧妤呭礄瑜版帒鍚归柣鏂垮悑閻撳啰鎲稿鍫濈婵炲棙鍨规稉宥団偓骞垮劚椤︻垳澹曢崸妤€绾ч柛顐ｇ濞呭棛鈧娲橀悡锟犲蓟閻斿吋鍊绘俊顖滃劦閹峰姊哄ú璇插箹婵☆偅顨婇崺?1闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋為悧鐘汇€侀弴銏犖ч柛灞剧煯婢规洖鈹戦鐭亜鐣烽鍕偍閻庣數纭堕崑鎾舵喆閸曨剛顦ョ紓鍌氱Т閿曘倝鎮鹃柨瀣檮缂佸鐏濆畵鍡涙⒑缂佹ɑ顥嗘繛鎾崇秺楠炲鏌ㄧ€ｂ晝绠氶梺缁樺姦娴滄粓鍩€椤掍胶澧悡銈団偓骞垮劚椤︻垳澹曟繝姘厵闁诡垎鍛偗闂佺顑嗛幐楣冨箟閹绢喖绀嬫い鎺戝亞濡茬増淇婇悙顏勨偓鎴﹀礉瀹€鍕櫇妞ゅ繐鐗嗚繚婵炴挻鍩冮崑鎾垛偓娈垮枟閹歌櫕鎱ㄩ埀顒勬煃閳轰礁鏆為柣婵愬亰濮婄粯鎷呴崨濠傛殘濠电偠顕滅粻鎾崇暦?
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
					// msg: '闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋為悧鐘汇€侀弴銏犵厱婵﹩鍘介妵婵嗏攽闄囬崺鏍ь嚗閸曨厸鍋撻敐搴濈胺婵″弶鍔欏缁樼瑹閳ь剙顭囪婢ф繈姊洪崫鍕櫤闁烩晩鍨堕獮蹇涘箣閿旇棄浜滈柣蹇撶箣閻掞箓寮埀顒勬⒒娴ｈ櫣甯涢拑杈╂喐閺夊灝鏆炵紒鍌氱Ч閹瑩鎮滃Ο鐓庡箞闂備胶绮Λ鍐绩闁秴鍚归柛銉墯閻撴盯鎮橀悙闈涗壕缂佲偓閸愵亖鍋撻崹顐ｇ凡閻庢碍婢橀悾鐑芥偂鎼存ɑ鏂€闂佸憡鍔戦崝瀣珶閺囩偐鏀介幒鎶藉磹閺囥垹鐤ù鐓庣摠閸庢绻涢崱妤冪畾闁衡偓娴犲鐓熸俊顖濐嚙缁插鏌￠崱妯荤缂佽鲸甯為幏鐘诲矗婢舵ɑ锛侀梻渚€娼уú銈団偓姘緲椤曪絾绂掔€ｎ€晠鏌ㄥ┑鍡楊伀闁硅娲熷缁樻媴娓氼垳鍔稿銈嗗灥濡繈鐛幇鏉跨濞达絿鎳撴禒濂告⒑缂佹ê鐏辨俊顐㈠閹瑦绻濋崶銊у帗闂佸憡绻傜€氭悂寮ㄦ繝姘厸?..'
					msg: hexStr
				})
				uni.navigateBack()
			},
			// 闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕濡ょ姷鍋為悧鐘汇€侀弴銏犖ч柛灞剧煯婢规洖鈹戦绛嬬劷闁告鍐ｆ瀺鐎广儱娲犻崑鎾舵喆閸曨剛锛涢梺鍛婎殕婵炲﹪鎮伴鈧畷鍫曨敆婢跺娅屽┑鐘垫暩婵挳骞婃径鎰；闁规崘顕ч柨銈嗕繆閵堝嫯鍏岄柛妯绘崌濮婅櫣鈧湱濮甸妴鍐磼閳ь剚绗熼埀顒€顕ｉ幎鑺ュ€锋繛鏉戭儐閺傗偓婵＄偑鍊栧濠氬疾椤愶附鍎楅悗锝庡枟閻撳繘鏌涢妷鎴濆枤娴煎啫螖閻橀潧浠﹂悽顖椻偓宕囨殾闁告鍎愬〒濠氭煙椤栧棗鏈ˉ锟犳⒒閸屾艾鈧悂宕愭搴ｇ焼濞撴埃鍋撴鐐差樀閺佹捇鎮╅崘韫敾闂備焦瀵уú鏍磹閸濄儳涓嶉柡澶婄氨閺€浠嬫煟濡櫣鏋冨瑙勵焽缁?
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
			// 闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕閻庤娲忛崕鎶藉焵椤掑﹦绉甸柛鐘崇墱婢规洟宕稿Δ浣哄幍闂佽鍨虫晶妤吽夋径鎰闁哄鍩婇煬顒勬煛鐏炶鈧繈骞婂┑瀣妞ゆ棁鍋愭晶顖氣攽閻愯尙鎽犵紒顔肩灱缁辩偞绻濋崶褑鎽曞┑鐐村灟閸ㄧ懓鏁俊鐐€栧濠氬储瑜旈敐鐐哄煛閸涱喒鎷洪梺鍛婄箓鐎氱兘宕曟惔锝囩＜闁兼悂娼ч崫铏光偓娈垮枛椤兘宕洪崟顖氱闁靛ě鍛祦婵犵數濮烽弫鍛婃叏鐎电硶鍋撳鐓庡籍闁诡垰鍟撮獮瀣晜鐟欙絾瀚肩紓鍌欑椤戝棝顢栧▎鎾崇？闁规壆澧楅悡娆撴煟閻斿搫顣奸柛鐘成戦〃銉╂倷鐠囇嗗惈閻庢鍠曠划娆撱€佸鈧幃娆撴濞戞顔囬梻鍌氬€烽懗鍫曗€﹂崼銉ュ珘妞ゆ帒鍊搁崹婵堚偓骞垮劚閹冲寮搁弮鍫熺厵闂傚倸顕崝宥夋煃闁垮鐏撮柡灞剧洴閺佸倻鎷犻幓鎺旑啇闂佹眹鍩勯崹浼存偉婵傜钃熼柨婵嗘缁犵娀姊洪崨濠冪叆闁活剙銈稿畷锝夊川鐎涙ǚ鎷虹紓鍌欑劍钃遍柣鎾卞劦閺屾稑顫濋澶婂壎閻庤娲橀崹鍧楀箖閵忋倕绠归柣鎰閻╁酣姊绘担鍛婃儓婵炶绠撻妴鍐川椤旂虎娲告俊銈忕到閸燁垶宕愰悽鍛婂仭婵炲棗绻愰顏嗙磼閳ь剟宕橀埞澶哥盎闂侀潧顭堥崕濠氱叕椤掑嫭鐓忛柛鈩冩礈缁愭梻鈧鍠楅幐铏叏閳ь剟鏌嶉埡浣告殲闁绘繍鍋婂缁樻媴閸涘﹤鏆堝┑鐐额嚋缁犳挸鐣?
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

	page {
		background: linear-gradient(180deg, #07111f 0%, #0a1730 48%, #08111f 100%);
	}

	.maintain-shell {
		min-height: 100vh;
		background:
			radial-gradient(circle at 14% 10%, rgba(61, 240, 215, 0.14), transparent 24%),
			radial-gradient(circle at 84% 14%, rgba(47, 134, 255, 0.16), transparent 20%),
			linear-gradient(180deg, #07111f 0%, #0a1730 48%, #08111f 100%);
	}

	.modeLists {
		padding: 0 20rpx 34rpx;

		.modeList {
			background: linear-gradient(180deg, rgba(13, 28, 50, 0.92) 0%, rgba(9, 20, 38, 0.86) 100%);
			border: 1rpx solid rgba(125, 214, 255, 0.12);
			box-shadow: 0 24rpx 56rpx rgba(0, 0, 0, 0.24);
			backdrop-filter: blur(16rpx);
			border-radius: 28rpx;
			margin-top: 20rpx;

			.title {
				padding: 24rpx 26rpx;
				border-bottom: 1rpx solid rgba(121, 173, 221, 0.12);
				font-weight: 600;
				font-size: 16px;
				color: #f3fbff;
				letter-spacing: 1rpx;
			}

			.content {
				padding: 22rpx 24rpx;

				>view {
					display: flex;
					// justify-content: space-between;
					justify-content: center;
					padding-bottom: 16rpx;
					padding-top: 16rpx;
				}

				>view:active {
					background-color: rgba(255,255,255,0.03);
				}

				.ct {
					color: #d7e7fb;
					padding-right: 20rpx;
				}
			}
		}
	}


	.gray {
		color: #7f96b5;
	}

	.green {
		color: #3df0d7;
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
		border-radius: 24rpx;
		background: rgba(8, 19, 37, 0.78);
		border: 1rpx solid rgba(125, 214, 255, 0.12);
		
		.item {
			line-height: 100rpx;
			text-align: center;
			color: #f3fbff;
			font-size: 34rpx;
			font-weight: 600;
		}
	}
	.middleline{
		width: 2rpx;
		height: 70%;
		background-color: rgba(121, 173, 221, 0.14);
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
			background: rgba(18, 39, 68, 0.9);
			border: 1rpx solid rgba(125, 214, 255, 0.12);
			color: #dce9f9;
			border-radius: 22rpx;
			font-size: 28rpx;
			box-shadow: 0 14rpx 28rpx rgba(0,0,0,0.16);
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
		opacity: 0.92;
	}
	.top-nav-text {
		font-size: 28rpx;
		color: #dce9f9;
		font-weight: 500;
		margin-left: 14rpx;
	}
	.top-nav-save-action {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12rpx 18rpx;
		min-width: 108rpx;
		border-radius: 999rpx;
		background: linear-gradient(135deg, rgba(61, 240, 215, 0.18), rgba(47, 134, 255, 0.18));
		border: 1rpx solid rgba(123, 221, 255, 0.18);
	}
	.top-nav-save {
		font-size: 28rpx;
		color: #7ae7ff;
		font-weight: 600;
	}
	.time-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>



