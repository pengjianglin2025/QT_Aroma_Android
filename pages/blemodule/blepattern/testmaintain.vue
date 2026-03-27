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
				<MajorMode maintainPage="testmaintain"></MajorMode>
			</view>
			<view v-if="modeFlag==0">
			<!-- 缂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柤绋跨仛閸欏繑銇勯幘鍗炵仼缁炬儳顭烽弻鐔煎礈瑜忕敮娑㈡煟閹惧娲撮柡灞剧洴瀵挳濡搁妷銉浇闂佽绻愮换瀣础閹惰棄绠犳慨妯挎硾閻撴盯鏌涢幇鍓佸埌濞存粎鍋撶换娑㈠醇濠靛牅铏庨梺鍝勵儐缁嬫挾妲愰幒鏃傜＜婵☆垵娅ｉ悷銊╂⒑瀹曞洨甯涢柟鐟版喘閻涱喚鈧綆鍠楅弲婵嬫煃瑜滈崜娑㈡偖閹屽悑濠㈣泛顑囬崢鍗烆渻閵堝棗濮х紒鎻掑⒔缁牓宕橀鐣屽弳濠电偞鍨堕懝楣冨几濞戙垺鐓欐い鏃€顑欏鎰版煙瀹勭増鍣界紒顔界懄閹棃骞橀弶鎴犳Ш闂?-->
			<view class="modeList">
				<view class="title time-title">
                    <view>{{$t("timer-settings")}}</view>
					<!-- <view style="font-weight: normal;color: #a3a3a3;font-size: 26rpx;">闂傚倸鍊搁崐椋庣矆娓氣偓楠炲鏁撻悩鑼唶闂佸湱铏庨崰鏍偪閻愵剛绠鹃柛鈩兠悘鈺冪磼閳ь剚绻濋崶銊у幍闁哄鐗嗘晶浠嬫偩鏉堚晝纾兼い鎰╁灮鏁堥梺鍝勬湰閻╊垶銆侀弴銏℃櫜闁糕剝鐟Σ浼存⒒娴ｇ懓顕滅紒瀣崌瀹曚即寮介鐐舵憰?5:11</view> -->
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
				devicemsg: {}, //闂傚倸鍊峰ù鍥х暦閸偅鍙忛柟鎯板Г閸婂潡鏌ㄩ弴鐐测偓鍝ュ閸ф鐓欓悹鍝勬惈椤ョ偤鏌涢妷顔煎⒒闁轰礁妫楅湁闁挎繂鐗勯埀顑藉亾闂佽　鍋撻柟鎯板Г閳锋垿鏌￠崒妯哄姕婵炲懎鎳橀弻娑㈡偄閸欏鐝栧┑鈥冲级閸旀瑥顕ｆ禒瀣垫晣闁绘柨鎼铏節閻㈤潧浠﹂柛銊ョ埣閹兘顢涢悙鑼槷闂佺懓澧庨崑銈咁潖缂佹ɑ濯撮柣鐔煎亰閸ゅ绱撴担鍓插剱闁搞劌娼￠獮鍐┿偅閸愨晛鍓?
				isChanged:false,
				modeFlag: 1,//0闂傚倸鍊搁崐鐑芥倿閿旈敮鍋撶粭娑樻噽閻瑩鏌熼悜妯虹劸婵炲皷鏅犻弻鏇熺箾閻愵剚鐝曢梺绋款儌閺呮粎鎹㈠┑瀣棃婵炴垵宕崜鎵磼缂併垹骞愰柛瀣崌濮婄粯鎷呴崨濠冨創濠电偛鐪伴崝鎴濈暦椤掑嫭鍤嶉柕澶涚畱椤庢捇姊洪崨濠冨鞍鐟滄澘鍟埢鎾诲Ω閳哄偆妫呭銈嗗姂閸ㄦ椽宕掗妸鈺傜厱閹兼番鍨归埢鏇㈡煟?闂傚倸鍊搁崐鐑芥倿閿旈敮鍋撶粭娑樻噽閻瑩鏌熼悜姗嗘畷闁稿孩顨嗛妵鍕棘閸喒鎸冪紓浣哄У濡啴寮婚悢鐓庣畾鐟滄粓宕甸悢鍏肩厓缂備焦蓱閳锋劙鏌熸笟鍨妞ゎ偅绮撳畷鍗炍旈埀顒侇殭婵犵數鍋犻幓顏嗗緤閼恒儳鐝跺┑鐘叉搐閸?
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
			this.$store.commit('SET_OFFLINE',false)
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
			//闂傚倸鍊搁崐椋庣矆娓氣偓楠炲鏁嶉崟顒佹濠德板€曢崯顖氱暦閺屻儲鐓曠€光偓閳ь剟宕曢幋鐘电闁哄稁鍘介悡娆撴煟濡も偓閻楀﹦娆㈤懠顒傜＜闁逞屽墮閻ｆ繈宕熼鍌氬箰闁诲氦顫夐幖鈺呭窗閺嶎厼绠犻煫鍥ㄦ寖閹烘挻鍎熼柕濠忚吂閹锋椽姊洪崨濠勭畵閻庢凹鍓熷鎶藉鎺虫禍婊堟煛閸愶絽浜鹃梺鍛婃⒐椤ㄥ懎宓勯梺褰掑亰閸忔﹢寮告惔銊︾厵閻庣數顭堝皬缂備焦顨呴ˇ闈涱潖濞差亝鐒婚柣鎰蔼鐎氭澘顭胯椤曨參鍩€椤掍緡鍟忛柛鐘虫礋瀹曪繝骞庨悾灞界ウ濠殿喗銇涢崑鎾绘煙瀹曞洤鈻堝┑鈩冩倐婵″爼宕堕懜鏁屾粍淇婇悙顏勨偓鏍洪埡鍐闁逞屽墰缁辨帡鎮╁畷鍥ㄥ垱婵犵绱曢弻澶愃囩€涙ǜ浜?
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
			//闂傚倸鍊峰ù鍥х暦閸偅鍙忕€规洖娲ㄩ惌鍡椕归敐鍫綈婵炲懐濮撮湁闁绘ê妯婇崕鎰版煕鐎ｅ吀閭柡灞剧洴閸╁嫰宕橀鍛灕闂備胶顭堥鍡涘箰妤ｅ啫绠熼柟缁㈠枛缁€瀣亜閹炬瀚鎰攽閻樻鏆滅紒杈ㄦ礋瀹曟垵鈽夐姀鐘碉紮闂佺鍕垫當闁哄鑳堕埀顒€绠嶉崕鍗灻洪敐鍛煢妞ゅ繐鐗婇悡鐔兼煙娴煎瓨娑у褏绮穱濠傤啅椤旇偐浠稿┑顔硷攻濡炶棄鐣烽妸锔剧瘈闁告洦鍘鹃崢鎰版⒒娴ｇ鎮戞俊鐐叉健瀹曞湱鎹勯搹瑙勬?
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
			//闂傚倸鍊搁崐椋庣矆娓氣偓楠炲鏁嶉崟顒佹闂佸湱鍎ら崵姘洪鍛珖闂侀€炲苯澧撮柟顕€绠栭幃婊堟寠婢跺矈鍞介梻浣烘嚀缁犲秹宕濇惔銊ョ獥闁哄稁鍘奸崹鍌炴煙椤栧棗鎳忓▓楣冩⒑閹肩偛鍔楅柡鍛櫊瀵?
			changeMode(num){
				console.log(num);
				this.modeFlag = num
				this.$store.commit('SET_PARAMETERMODE',num)
			},
			//缂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柤绋跨仛閸欏繑銇勯幘鍗炵仼缁炬儳顭烽弻鐔煎礈瑜忕敮娑㈡煟閹惧娲撮柡灞剧洴瀵挳濡搁妷銉浇闂佽绻愮换瀣础閹惰棄绠犳慨妯挎硾閻撴盯鏌涢幇鍓佸埌濞存粎鍋撶换娑㈠醇濠靛牅铏庨梺鍝勵儐缁嬫挾妲愰幒鏃傜＜婵☆垰鎼～鎺楁倵鐟欏嫭绀堟い銏狅功缁鈽夊Ο閿嬵潔濠碘槅鍨抽埛鍫ュ船瑜版帗鈷掑〒姘ｅ亾婵炰匠鍛床闁糕剝绋戦悞鍨亜閹哄棗浜剧紒鍓ц檸閸樺ジ鍩㈤幘鑸靛枂闁告洦鍘鹃?
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
			//闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曢妶鍥╃厯闂佸憡娲﹂崢钘夌暦閸欏绡€闂傚牊渚楅崕鎰版煕鐎ｎ倖鎴犳崲濞戙垹骞㈡俊銈勮兌椤╀即姊洪幖鐐测偓鏍洪悢鐓庤摕鐎广儱鐗滃銊╂⒑閸涘﹥灏扮€光偓閹间胶宓侀柛顐犲劚鎯熼悷婊冾樀瀹曟垿骞樼紒妯绘珳闁硅偐琛ラ埀顒佸墯濞肩偓绻濋悽闈涗粶妞わ富鍙冨畷瑙勭鐎ｎ亣鎽曢梺鏂ユ櫅閸燁偆娆㈤悙鐑樺€堕柣鎰硾琚氶梺璇插閸庢娊鍩為幋锔芥櫖闁告洦鍋傜划鍫曟⒑缁嬪尅宸ラ柣蹇旂箞閿?
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
					// console.log('濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柟缁㈠枛閻撶喖鏌曟径鍡樻珔閸ユ挳姊洪崨濠佺繁闁告ü绮欓幃姗€宕卞☉娆屾嫽婵炶揪绲介幉锟犲箚閸喆浜滈柨鏃囶嚙娴滀即鏌涢埞鎯т壕婵＄偑鍊栧濠氬磻閹惧灈鍋撳▓鍨灈闁绘牕銈搁妴?');
				}else if(parseInt(eH)==parseInt(bH)){
					if(parseInt(eM)>=parseInt(bM)){
						// console.log('濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柟缁㈠枛閻撶喖鏌曟径鍡樻珔閸ユ挳姊洪崨濠佺繁闁告ü绮欓幃姗€宕卞☉娆屾嫽婵炶揪绲介幉锟犲箚閸喆浜滈柨鏃囶嚙娴滀即鏌涢埞鎯т壕婵＄偑鍊栧濠氬磻閹惧灈鍋撳▓鍨灈闁绘牕銈搁妴?');
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

					// Pl:濠电姷鏁告慨鐑姐€傞挊澹╋綁宕ㄩ弶鎴濈€銈呯箰閻楀棝鎮為崹顐犱簻闁瑰搫妫楁禍鍓х磼閸撗嗘闁告ɑ鍎抽埥澶愭偨缁嬭法鍔﹀銈嗗笒鐎氼參鍩涢幋锔界厱婵犻潧妫楅顐も偓娑欑箓閳规垿鎮欓懠顒佸嬀闂佺锕ラ〃濠囩嵁?闂傚倸鍊搁崐椋庣矆娓氣偓楠炲鏁嶉崟顒佹闂佸湱鍎ら崵锕€鈽夊Ο婊勬瀹曘劑顢橀悢鎰熸岸姊绘担铏广€婇柛鎾寸箞閳ワ箓宕堕閿亾閸涘瓨鍊婚柤鎭掑劤閸欏棗鈹戦悩缁樻锭婵☆偅绋掗弲鍫曞箣閿旂晫鍘撻悷婊勭矒瀹曟粌鈻庨幘宕囨焾濡炪倖鐗楃划搴ㄦ儗婢跺备鍋撻獮鍨姎妞わ富鍨拌灋婵☆垯缍嶉弮鍫熸櫜闁告侗鍘藉▓顓炩攽閻愯尙澧涚紒璇插€块崺鐐哄箣閿曗偓閻擄繝鏌涢埄鍐炬畼濞寸姵宀稿娲焻閻愯尪瀚板褜鍠氶惀顏嗙磼閵忕姴绠诲┑鐐村灩閺佸宕洪埀?0-4)
					const p1 = i;
					// P2:婵犵數濮烽弫鎼佸磻閻愬搫鍨傞柛顐ｆ礀缁犳煡鏌涢妷銏℃珖缁炬崘濮ら幈銊ヮ潨閳ь剟路閸岀偛鏋侀悗锝庡亝閸欏繑鎱ㄥΔ鈧Λ妤呭礉閿曞倹鐓熼柡鍐ㄥ€哥敮鍫曟煟韫囨挾锛嶉柍褜鍓濋～澶娒洪弽顬℃椽濡搁埞搴撳亾娓氣偓瀹曘劎鈧稒锚閳ь剛鏁婚幃宄扳枎韫囨搩浠鹃梺绋款儑婵炩偓闁哄本绋掗幆鏃堝閻欌偓濡棛绱撴担鎴掑惈闁稿鍊曢锝夘敋閳ь剙鐣烽悡搴樻斀闁割偁鍨虹紞浣糕攽?~b6闂傚倸鍊峰ù鍥х暦閻㈢纾婚柣鎰暩閻瑩鐓崶銊р槈缂佲偓婢舵劕绠规繛锝庡墮婵＄厧顩奸崨顓涙斀妞ゆ梻鐡旈悞鐐箾婢跺鈽夋い鏂跨箰閳规垹鈧綆鍋嗛崢顏呯節閻㈤潧浠滈柣蹇旂箞閸┾偓妞ゆ帊绶″▓婊勩亜閵忊剝顥堥柡灞芥椤撳ジ宕卞▎蹇撶闂佽娴烽幊鎾垛偓姘煎幖椤灝顫滈埀顒€顕ｉ幎鑺ョ劶鐎广儱妫涢崢鐢告⒑閸涘﹤濮囩€殿喖鐖艰棢闁靛繆鎳囬崑?
					const p2 = this.weekToByte(item.weeks);
					//P3,P4: 闂傚倸鍊峰ù鍥х暦閸偅鍙忕€广儱顦粈鍐煏婵炪倐鍋撻柍杞扮贰濞撳鏌曢崼婵嬵€楀ù婊勭箞閺屾盯寮埀顒勬偡閵夆晩鏁嬮柨婵嗩樈閺佸鏌嶈閸撴瑩鎮鹃柨瀣檮缂佸鐏濆畵鍡涙⒑缂佹ɑ绀€闁稿﹤顭峰畷銉ㄣ亹閹烘挴鎷绘繛鎾村焹閸嬫挻绻涙担鍐插悩濞戙垹绫嶉柛灞剧矌閻掑吋绻涢幘鏉戠劰闁稿鎹囬弻鐔碱敍濮橆剚娈诲銈冨灪椤ㄥ﹤鐣烽悢纰辨晝闁靛牆娲︾紞渚€姊绘担钘夊惞濠殿喗鎸抽獮鏍敃閿曗偓缁犺銇勯幇鍫曟闁稿﹪娼ч埞鎴︽偐瀹曞浂鏆￠梺?
					const p3 = parseInt(item.btime.split(':')[0]);
					const p4 = parseInt(item.btime.split(':')[1]);
					//P5,P6: 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸婂潡鏌ㄩ弴鐐测偓鍝ョ不娴煎瓨鍋ｉ柛銉戝嫧鏋欓梺缁樺笩婵倝濡甸崟顖氱疀闁告挷鑳堕弳鐘电磽娓氬洤浜滅紒澶婄秺瀵鈽夐姀鈺傛櫇闂佹寧绻傚Λ娑⑺囬妸鈺傗拺闁圭娴烽妴鎺楁煕閻樺磭澧电€殿喖顭峰鎾閻樿尪鈧潡姊洪崫鍕窛濠殿垼鍘煎嵄妞ゆ洍鍋撴慨濠傛惈鐓ら柤濮愬€曠敮銉╂⒑閸涘﹥灏甸柛鐘查叄椤㈡岸鏁愭径妯绘櫓闂佺粯鍔﹂崜娆戝椤栫偞鈷戦柛娑橈功缁犳捇鎮楀鐓庢珝闁糕斁鍋撳銈嗗坊閸嬫挻銇勯鐐叉Щ妞?
					const p5 = parseInt(item.etime.split(':')[0]);
					const p6 = parseInt(item.etime.split(':')[1]);
					console.log(p3+':'+p4+':'+p5+':'+p6);
				
					
					//P7: 闂傚倸鍊搁崐鐑芥嚄閸洏鈧焦绻濋崶銊ュ壒闂佹悶鍎洪崜娆戠矆閸愵喗鐓忓┑鐐戝啫鏆欑紒鐘冲灴濮婅櫣鎷犻幓鎺濆妷濡炪倖姊归悧鐘茬暦娴兼潙绠虫俊銈傚亾缁炬儳顭烽弻鐔煎礈瑜忕敮娑㈡煟?闂傚倸鍊搁崐鐑芥嚄閸洍鈧箓宕奸姀鈥冲簥闂佺懓顕崑鐔虹不閹€鏀介柣妯垮紦鏉╄绻涢幋娆忕仼缂佺姷绮妵鍕籍閸ヮ灝鎾寸箾?闂傚倸鍊搁崐鐑芥嚄閸洖绠犻柟鍓х帛閸婅埖鎱ㄥΟ鎸庣【缂佺姳鍗抽弻娑樷攽閸曨偄濮曞?
					const p7 = (item.selected == true ? 1 : 0);
		
					//P8闂傚倸鍊搁崐鐑芥倿閿旈敮鍋撶粭娑樻噽閻瑩鏌熸潏鎯х槣闁?:闂傚倷娴囬褍顫濋敃鍌︾稏濠㈣埖鍔曠粻鏍煕椤愶絾绀€缁炬儳娼￠弻鐔封枔閸喗鐏撶紓浣插亾濠电姴娲﹂悡娑㈡煕閹扳晛濡垮褎娲滅槐鎺楊敃閵忊懣褔鏌＄仦鍓ф创妞ゃ垺娲熼弫鎰板幢濞嗘ɑ袨闂傚倷鐒︾€笛呯矙閹捐绐楅柡宥庡幖閽冪喖鏌曟繛鍨姉婵℃彃鐗婇幈銊ノ旈埀顒€螞濡や椒绻?婵犵數濮烽弫鎼佸磻閻樿绠垫い蹇撴缁躲倝鏌ら幁鎺戝姶婵炲牅绮欓弻鐔兼⒒鐎靛壊妲梺娲诲幗椤ㄥ﹪寮婚悢鐓庣畾鐟滃繘骞楅悩娴嬫斀妞ゆ牗鍑归崵鐔兼煃瑜滈崜娆戠不瀹ュ纾块弶鍫氭櫆瀹曟煡鏌熼悜妯烩拻闁活厼妫楅埞?闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曢妶鍌氫壕婵ê宕崢瀵糕偓瑙勬礀缂嶅﹤鐣锋總绋垮嵆闁绘棁娓归幋閿嬩繆閻愵亜鈧牕煤瀹ュ纾婚柟鎯х亪閸嬫挾鎲撮崟顒傤槰濡炪們鍔岄敃顏堝Υ娓氣偓瀵挳濮€閳╁啯鐝梻浣告啞濞诧箓宕?
					const bytes = this.getLowHighBytes(parseInt(item.wtimes));
					const p8 = bytes[1];
					const p9 = bytes[0];
					//P10,P11:闂傚倸鍊搁崐鐑芥嚄閸洍鈧箓宕奸妷顔芥櫈闂佺硶鍓濋悷銉╁垂濠靛牃鍋撻獮鍨姎妞わ缚绮欏顐﹀幢濡偐顔曢梺鐟扮摠閻熴儵鎮橀埡鍐＜妞ゆ劑鍨绘晥闂佸搫鏈惄顖炪€侀弴銏℃櫜闁糕剝鐟Σ浼存⒒娴ｇ懓顕滅紒瀣崌瀹曚即寮介鐐舵憰闂侀潧顭堥崕顔嘉ｉ崼鐔稿弿婵°倐鍋撴俊顐ｎ殕娣?0婵犵數濮烽弫鎼佸磻閻樿绠垫い蹇撴缁躲倝鏌ら幁鎺戝姶婵炲牅绮欓弻鐔兼⒒鐎靛壊妲梺娲诲幗椤ㄥ﹪寮婚悢鐓庣畾鐟滃繘骞楅悩娴嬫斀妞ゆ牗鍑归崵鐔兼煃瑜滈崜娆戠不瀹ュ纾块弶鍫氭櫆瀹曟煡鏌熼悜妯烩拻闁活厼妫楅埞?1闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曢妶鍌氫壕婵ê宕崢瀵糕偓瑙勬礀缂嶅﹤鐣锋總绋垮嵆闁绘棁娓归幋閿嬩繆閻愵亜鈧牕煤瀹ュ纾婚柟鎯х亪閸嬫挾鎲撮崟顒傤槰濡炪們鍔岄敃顏堝Υ娓氣偓瀵挳濮€閳╁啯鐝梻浣告啞濞诧箓宕?
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
					// msg: '闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曢埛姘そ婵¤埖寰勭€ｎ亙妲愰梻渚€娼ц墝闁哄懏鐩幏鎴︽偄鐏忎焦鏂€闂佺粯蓱瑜板啯绂嶉悙鐑樼厱闁绘棃鏀遍崵鍥煛鐏炵偓绀冪€垫澘瀚板畷鐓庘攽閸愩劋澹曞┑掳鍊曢崯浼存儗濞嗗繆鏀介柣妯诲絻閺嗘洜绱掔拠鍙夘棡闁靛洤瀚板浠嬪Ω閿濆嫮鎹曢梻浣侯焾椤戝棝骞愰幖浣瑰仼闁绘垼妫勯悙濠囨煃閸濆嫸鏀婚柡?..'
					msg: hexStr
				})
				uni.navigateBack()
			},
			// 闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曢妶鍌氫壕婵鍘у▍宥団偓瑙勬磻閸楁娊鐛崶顒夋晢濠电姴鎳夐崑鎾诲锤濡や胶鍘撻梺瀹犳〃缁€渚€寮抽悙娴嬫斀妞ゆ梻鏅惌瀣煏閸パ冾伃妤犵偞甯″畷鍗烆渻閹屾闂傚倸鍊风粈渚€骞夐敓鐘冲仭闁挎洖鍊哥粻鏉库攽閻樺疇澹樼紒?
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
			// 闂傚倸鍊搁崐椋庣矆娓氣偓瀹曘儳鈧綆鍠栫壕鍧楁煙閹増顥夐幖鏉戯躬閺屻倝鎳濋幍顔肩墯婵炲瓨绮岀紞濠囧蓟濞戙垹唯妞ゆ梻鍘ч～鈺呮⒑閸濆嫷鍎庣紒鑸靛哺瀵鍩勯崘銊х獮婵犵數濮寸€氼參鎯冮幋锔解拺缂佸顑欓崕鎰版煙閻熺増鍠樻鐐诧躬瀵粙顢橀悙闈涘箰闂備胶顭堥張顒傚垝瀹ュ應鏋旈柟闂寸劍閳锋垿鏌涢敂璇插箹閻㈩垰鐖奸弻锝嗗箠闁告柨鐬奸崣鍛存⒑缂佹ɑ鐓ラ柛姘儔瀹曟垿鎮㈤幖鐐扮盎闂佸搫娲﹂〃鍛妤ｅ啯鍊甸悷娆忓缁€鍐┿亜閵娿儻韬柕鍡曠窔瀵挳濮€閳╁啯鐝梻浣告啞濞诧箓宕?
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



