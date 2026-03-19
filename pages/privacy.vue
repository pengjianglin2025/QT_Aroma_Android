<template>
<view>
	<web-view style="margin-top: 40rpx;" src="https://apps.all-iot.cn/zhengshuCN.html"></web-view>
</view>
</template>

<script>
export default{
	data(){
		return{
			title: this.$t('Privacy')
		}
	},
	onLoad() {
		let _this = this
		setTimeout(()=>{
			uni.setNavigationBarTitle({
			  title: _this.$t('Privacy') // 设置为你需要的标题
			});
		},500)
	}
}
</script>

<style>
</style>