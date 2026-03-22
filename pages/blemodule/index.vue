<template>
<view style="padding-bottom: 130rpx;">
	<uni-nav-bar fixed="true" status-bar left-width="0rpx" :border="false">
		<template v-slot="">
			<view class="top-nav-action" @click="navtoSelMode">
				<image class="top-nav-back" src="/static/back.png" mode="widthFix"></image>
				<text class="top-nav-text">{{$t("back")}}</text>
			</view>
			<!-- <view style="display: flex;;width:100%;font-size: 30rpx;">
				<view style="display: flex;align-items: center;padding:0 10rpx;">
					<view>
						<text class="selStyle">{{$t('index.all-device')}}</text>
						<view style="position: relative;">
							<view style="position: absolute;width:100%;">
								<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</template>
		<template v-slot:right>
			<!-- <view style="display: flex;align-items: center;margin-right: 40rpx;" @click="navtoWifi">
				<image class="add-device-btn" src="../../static/tab2.png" mode=""></image>
			</view> -->
			<!-- <view style="display: flex;align-items: center;" @click="navtoSeach"> -->
			<view class="top-nav-plus-wrap" @click="toggleMenu">
				<image class="add-device-btn" src="../../static/825.png" mode=""></image>
			</view>
		</template>
	</uni-nav-bar>
	<view v-if="isShow" class="menu-mask" @click="closeMenu"></view>
	<view style="position:fixed;width:100%;z-index: 2001;">
		<view style="position: relative;">
			<view class="setting-menu" v-if="isShow">
				<view class="flex items-center menu-item" @click="navtoSeach">
					<image style="width: 26rpx;height: 28rpx;" src="/static/images/home/search.png" mode="">
					</image>
					<text class="menu-text" style="padding-left: 5rpx;">{{$t('index.search')}}</text>
				</view>
				<view class="flex items-center menu-item" style="margin-top: 40rpx;" @click="navtoWifi">
					<image style="width: 30rpx;height: 30rpx;" src="/static/WIFI.png" mode=""></image>
					<text class="menu-text" style="padding-left: 10rpx;">{{$t('btn-wifi')}}</text>
				</view>
			</view>
		</view>
	</view>
	<view style="padding:20rpx;">
		<image src="../../static/banner.png" mode="widthFix" style="width:100%"></image>
	</view>
<view class="connect-mode-tip">{{localeText('connect-mode-ble','\u5f53\u524d\u8fde\u63a5\uff1a\u84dd\u7259')}}</view>
	<view style="display: flex;;width:100%;font-size: 30rpx;padding: 0 40rpx;padding-bottom: 40rpx;">
		<view style="display: flex;align-items: center;padding:0 10rpx;">
			<view>
				<text class="selStyle">{{$t('index.all-device')}}</text>
				<view style="position: relative;">
					<view style="position: absolute;width:100%;">
						<view style="width:50rpx;margin:6rpx auto;height:10rpx;border-radius: 10rpx;background-color:#00AD8D;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 闂佽崵濮抽悞锕傚磿閹跺壙鍥敆閸曨偆顦┑掳鍊曠€氥劑鍩€?-->
	<view style="width: 100%;">
		<scroll-view style="padding: 0 20rpx;" scroll-y="true" show-scrollbar>
			<view class="list-grid">
				<view v-for="(item,index) in bleDeviceList" :key="item.deviceId || item.mac || index" class="device-item" @click="onSelectedDevice(item)">
					<view class="device-switch">
						<image v-if="item.localName.indexOf('ivy00')>-1" src="../../static/off-light.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy01')>-1" src="../../static/01.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy02')>-1" src="../../static/02.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy03')>-1" src="../../static/03.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy04')>-1" src="../../static/04.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else-if="item.localName.indexOf('ivy05')>-1" src="../../static/05.png" mode="heightFix" style="width:88rpx;height: 100rpx;" class="img1"></image>
						<image v-else src="../../static/off-light.png" mode="heightFix" style="width:88rpx;height: 100rpx;"></image>
					</view>
					<view class="device-name">
						{{item.deviceName}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	<view class="tabbar">
		<uni-grid :column="2" :showBorder="false" :square="false">
			<uni-grid-item style="height: 100rpx;">
				<view class="grid-item-box" style="background-color: #fff;">
					<image class="tabbar-img" src="../../static/images/tabbar/indexsel.png" mode=""></image>
					<text class="text" style="color: #00CB74;">{{$t('index.home')}}</text>
				</view>
			</uni-grid-item>
			<uni-grid-item style="height: 100rpx;">
				<view class="grid-item-box" style="background-color: #fff;" @click="navToMine()">
					<image class="tabbar-img" src="../../static/images/tabbar/my.png" mode=""></image>
					<text class="text">{{$t('index.setting')}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { isLogin } from '@/api/login.js'
  import { queryUserInfo } from '@/api/system/user.js'
export default{
	data(){
		return{
			// bleDeviceList:[{deviceName:'闂佽崵濮抽悞锕傚磿閹跺壙?}]
			bleList: [],
			bleDeviceList: [],
			isShow: false
		}
	},
	computed:{
		// ...mapGetters(['bleDeviceList','isbleInit'])
		...mapGetters(['isbleInit'])
	},
	onLoad() {
		// console.log(this.bleDeviceList);
		// if(!this.isbleInit){ //濠电姷顣介埀顒€鍟块埀顒€缍婇幃妯诲緞閹邦厼鐝斿┑鐘绘涧閻楀棝锝為埡鍛骇闁冲搫浼掗幋锔藉剦闁告稒娼欑€氬顭跨捄鐚村伐闁诲繈鍎遍埞鎴︻敊绾板崬鍓伴柣搴＄仛閻撯€崇暦濮橆兘鏋庨煫鍥ㄦ尵娴犲瓨绻濆▓鍨灈妞ゆ垵鎳愰埀顒€鐏氶悡锟犲箯閹存績鏀介柛顐ｇ箥濞?
		// 	uni.openBluetoothAdapter({
		// 	  success(res) {
		// 	    console.log(res)
		// 	  }
		// 	})
		// }
	},
	onShow() {
		this.closeMenu()
		this.resetTime()
		if(uni.getStorageSync('bleDeviceList')){
			this.bleDeviceList = uni.getStorageSync('bleDeviceList')
		}
		console.log(this.bleDeviceList);
	},
	onHide() {
		this.closeMenu()
	},
	methods:{
		toggleMenu(){
			this.isShow = !this.isShow
		},
		closeMenu(){
			this.isShow = false
		},
		localeText(key, fallback){
			const text = this.$t(key)
			return text === key ? fallback : text
		},
		//闂佽崵濮撮幖顐︽偪閸ヮ灐褰掑幢濞戞顦?闂佽崵濮崇粈浣规櫠娴犲鍋柛鈩冪⊕閸嬧晝鈧厜鍋撻柛鏇ㄥ墯閵?
		navToMine(){
			this.$tab.reLaunch('/pages/blemodule/setting')
		},
		//闂佽崵濮撮幖顐︽偪閸ヮ灐褰掑幢濞戞顦梺鐟板槻閺堫剟骞夐锔界厽婵°倓鑳堕幊鍕煙椤旇偐锛嶆俊鍙夊姍婵偓闁靛繆鍓濋悵顏堟⒒?
		navtoSeach() {
			this.closeMenu()
			this.$tab.navigateTo('/pages/blemodule/searchble/index')
		},
		onSelectedDevice(ite){
			this.$store.commit('SET_DEVICEID',ite.deviceId)
			this.$store.commit('SET_DEVICENAME',ite.deviceName) 
			uni.openBluetoothAdapter({
				success() {},
				fail() {}
			})
			// uni.navigateTo({
			// 	url: `/pages/blemodule/bledeviceDetail/testindex?deviceId=${ite.deviceId}&deviceName=${ite.deviceName}`
			// })
			if(ite.deviceName.indexOf("ivy07")>-1){
			// if(ite.deviceName.indexOf("ivy03")>-1){
				console.log('闂佸搫顦弲婊呯矙閹达箑鐭楅柛鈩冪⊕閸嬪鎮峰▎蹇擃伀闁哄棙娲熼弻锝夋晲閸涱垳鍔┑鐐烘？閸楁娊鐛箛鏃€娅犻悗闈涙縺~~~~~~~~~~');
				uni.navigateTo({
					url: `/pages/blemodule/bledeviceDetail/ivy07index?deviceId=${ite.deviceId}&deviceName=${ite.deviceName}`
				})
			}else{
				uni.navigateTo({
					url: `/pages/blemodule/bledeviceDetail/index?deviceId=${ite.deviceId}&deviceName=${ite.deviceName}`
				})
			}
		},
		// 闂傚倷鐒﹁ぐ鍐矓閸洘鍋柛鈩冾殢閸熷懘鏌曟径鍫濃偓妤冪矙?闂備礁鎼Λ妤呭磹閸涘﹦顩烽柣妯款嚙缁秹鏌涢锝嗙闁挎稓鍠栭弻鏇㈠幢閺囩姴濡藉銈嗗笧閸嬨倕顫?
		resetTime(){
			this.$store.commit('SET_PAUSETIMEMIN',5)
			this.$store.commit('SET_PAUSETIMEMAX',500)
			this.$store.commit('SET_WORKTIMEMIN',5)
			this.$store.commit('SET_WORKTIMEMAX',500)
			this.$store.commit('SET_WORKSTEP',5)
		},
		navtoBle(){
			this.closeMenu();
		},
		navtoWifi(){
			this.closeMenu();
			uni.setStorageSync('lastmode','wifi')
			this.$tab.reLaunch('/pages/index')
		},
		navtoSelMode(){
			let _this = this
			uni.showModal({
				title: _this.$t('tipstitle'),
				content: _this.$t('navtoSelectMode'),
				success: function (res) {
					if (res.confirm) {
						_this.$tab.reLaunch('/pages/selectMode')
						// isLogin().then(res=>{
						// 	console.log(res);
						// 	uni.setStorageSync('lastmode','wifi')
						// 	if(res.data){
						// 		_this.$tab.reLaunch('/pages/index')
						// 	}else{
						// 		_this.$tab.reLaunch('/pages/login') 
						// 	}
						//   }).catch(err=>{
						// 	console.log(err);
						// 	_this.$tab.reLaunch('/pages/login') 
						// })
					} else if (res.cancel) {
						console.log('cancel select mode');
					}
				}
			});
			
		}
	}
}
</script>
 
<style>
	.menu-mask{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 2000;
		background: transparent;
	}
	.top-nav-action{
		display: flex;
		align-items: center;
		padding: 10rpx 0 10rpx 6rpx;
	}
	.top-nav-back{
		width: 18rpx;
		opacity: 0.86;
	}
	.top-nav-text{
		margin-left: 16rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #45525f;
		letter-spacing: 1rpx;
	}
	.top-nav-plus-wrap{
		width: 64rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		border: 2rpx solid rgba(0, 173, 141, 0.16);
		background: rgba(255,255,255,0.98);
		box-shadow: 0 10rpx 26rpx rgba(0, 173, 141, 0.14), 0 4rpx 12rpx rgba(0,0,0,0.08);
	}
	.connect-mode-tip{
		margin: 0 20rpx 24rpx;
		padding: 14rpx 22rpx;
		border-radius: 18rpx;
		background: #eefaf5;
		color: #00ad8d;
		font-size: 24rpx;
		font-weight: 600;
	}
	.add-device-btn {
		width: 26rpx;
		height: 26rpx;
	}
	.list-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 34rpx;
	}
	.device-item {
		display: inline-block;
		/* max-width: 340rpx; */
		width: 340rpx;
		/* max-width: 318rpx; */
		padding-bottom: 20rpx;
		padding-top: 20rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}
	.device-name {
		color: #151515;
		font-size: 32rpx;
		/* padding-left: 40rpx; */
		font-weight: bold;
		/* width: 280rpx; */
		overflow: hidden;
		text-overflow: ellipsis;
		height: 42rpx;
		text-align: center;
	}
	.device-switch{
		/* padding-left: 40rpx; */
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 160rpx;
	}
	.tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		font-size: 20rpx;
		border-top: 2rpx solid #d9d9d9;
	}
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.tabbar-img{
		width: 48rpx;
		height: 48rpx;
	}
	.setting-menu {
		position: absolute;
		right: 30rpx;
		top: 20rpx;
		min-width: 188rpx;
		background: #fff;
		padding: 40rpx 32rpx;
		border-radius: 14rpx;
		font-size: 30rpx;
		z-index: 9001;
		box-sizing: border-box;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
	}
	.menu-item {
		min-width: 120rpx;
		white-space: nowrap;
	}
	.menu-text {
		white-space: nowrap;
		word-break: keep-all;
	}
	
	.setting-menu::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: -10rpx;
		right: 20rpx;
		width: 20rpx;
		height: 20rpx;
		background: #fff;
		transform: rotate(45deg);
	}
</style>
