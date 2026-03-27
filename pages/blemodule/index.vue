<template>
<view class="home-shell" style="padding-bottom: 130rpx;">
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
	<view class="home-hero-wrap">
		<image class="home-hero" src="../../static/banner.png" mode="widthFix"></image>
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
	.home-shell{
		min-height: 100vh;
		background:
			radial-gradient(circle at 16% 10%, rgba(72, 238, 220, 0.16), transparent 24%),
			radial-gradient(circle at 86% 12%, rgba(86, 132, 255, 0.18), transparent 22%),
			linear-gradient(180deg, #07111f 0%, #0a1730 48%, #08111f 100%);
	}
	.home-hero-wrap{
		padding: 18rpx 20rpx 16rpx;
	}
	.home-hero{
		width: 100%;
		border-radius: 34rpx;
		border: 1px solid rgba(125, 216, 255, 0.14);
		box-shadow: 0 24rpx 58rpx rgba(0, 0, 0, 0.3);
	}
	.top-nav-action{
		display: flex;
		align-items: center;
		padding: 10rpx 0 10rpx 6rpx;
	}
	.top-nav-back{
		width: 18rpx;
		opacity: 0.92;
		filter: brightness(3.2);
	}
	.top-nav-text{
		margin-left: 16rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #dce8f7;
		letter-spacing: 1rpx;
	}
	.top-nav-plus-wrap{
		width: 64rpx;
		height: 64rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		border: 2rpx solid rgba(116, 220, 255, 0.18);
		background: linear-gradient(180deg, rgba(16, 33, 58, 0.94) 0%, rgba(9, 20, 38, 0.9) 100%);
		box-shadow: 0 14rpx 32rpx rgba(0,0,0,0.28), 0 0 24rpx rgba(69, 220, 255, 0.12);
	}
	.connect-mode-tip{
		margin: 0 20rpx 26rpx;
		padding: 16rpx 22rpx;
		border-radius: 22rpx;
		background: linear-gradient(180deg, rgba(13, 28, 50, 0.88) 0%, rgba(9, 20, 38, 0.82) 100%);
		border: 1px solid rgba(112, 214, 255, 0.12);
		color: #79ebff;
		font-size: 24rpx;
		font-weight: 600;
		box-shadow: 0 14rpx 30rpx rgba(0, 0, 0, 0.18);
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
		padding-bottom: 26rpx;
		padding-top: 26rpx;
		border-radius: 30rpx;
		background: linear-gradient(180deg, rgba(15, 31, 55, 0.95) 0%, rgba(9, 19, 36, 0.92) 100%);
		border: 1px solid rgba(126, 220, 255, 0.12);
		box-shadow: 0 22rpx 48rpx rgba(0, 0, 0, 0.24);
	}
	.device-name {
		color: #f4fbff;
		font-size: 32rpx;
		/* padding-left: 40rpx; */
		font-weight: 600;
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
		height: 168rpx;
	}
	.tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		font-size: 20rpx;
		border-top: 1px solid rgba(124, 218, 255, 0.12);
		background: rgba(6, 15, 28, 0.92);
		backdrop-filter: blur(10rpx);
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
		right: 12rpx;
		top: 8rpx;
		min-width: 170rpx;
		background: linear-gradient(180deg, rgba(16, 33, 58, 0.96) 0%, rgba(9, 20, 38, 0.92) 100%);
		padding: 26rpx 24rpx;
		border-radius: 22rpx;
		font-size: 28rpx;
		z-index: 9001;
		box-sizing: border-box;
		border: 1px solid rgba(124, 218, 255, 0.16);
		box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.28);
		backdrop-filter: blur(8rpx);
	}
	.menu-item {
		min-width: 104rpx;
		white-space: nowrap;
		color: #e8f5ff;
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
		right: 26rpx;
		width: 20rpx;
		height: 20rpx;
		background: #10213a;
		transform: rotate(45deg);
	}
</style>
