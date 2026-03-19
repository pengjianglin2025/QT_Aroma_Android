<template>
<view>
	<qf-image-cropper :width="cutWidth" :height="cutHeight" :radius="0" @crop="handleCrop"></qf-image-cropper>
</view>
</template>

<script>
export default{
	data(){
		return{
			cutWidth: 200,
			cutHeight: 200
		}
	},
	onLoad(e) {
		console.log(e);
		if(e.cutWid){
			this.cutWidth = Number(e.cutWid)
		}
		if(e.cutHei){
			this.cutHeight = Number(e.cutHei) 
		}
	},
	methods:{
		handleCrop(e) {
			console.log(e);
			uni.$emit('cropperedImgPath', e.tempFilePath);		
			uni.navigateBack({
				delta:1
			})
			// uni.previewImage({
			// 	urls: [e.tempFilePath],
			// 	current: 0
			// });
			// uni.previewImage({
			// 	urls: [e.tempFilePath],
			// 	current: 0
			// });
		}
	}
}
</script>

<style>
</style>