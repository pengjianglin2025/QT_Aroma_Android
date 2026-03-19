<template>
<view>
	<!-- <canvas :style="{width: swiperh+'px',height: swiperh+'px'}" canvas-id="rgbImg" id="rgbImg"></canvas> -->
	<!-- <view class="slider" :style="{left: xpos-15+'px',top: ypos-450+'px'}"></view> -->
	<view style="text-align: center;position: relative;">
		<!-- {{xpos}},{{ypos}} -->
		<div class="rgbBox" :style="'border-color:rgb('+rgbs+');width:'+swiperh+'px;height:'+swiperh+'px;border-radius:'+swiperh+'px'">
		<image src="../../static/rgb.png" :style="'width:'+swiperh+'px;height:'+swiperh+'px'"
			@touchstart.stop.prevent="onRgbTouchstart" @touchmove="onRgbTouchmove"
			@touchend="onRgbTouchend" id="rgbImg"></image>
		</div>
		<div class="rgbtext" v-if="showRGBValue">
			<div style="background: rgb(255,0,0);">R:{{rgbs[0].toFixed(0)}}</div>
			<div style="background: rgb(0,255,0);color:#000000;">G:{{rgbs[1].toFixed(0)}}</div>
			<div style="background: rgb(0,0,255);">B:{{rgbs[2].toFixed(0)}}</div>
		</div>
	</view>
</view>
</template>

<script>
export default{
	props: {
		//是否显示rgb数值
		showRGBValue:{
			type:Boolean,
			default: false,
			required: false
		},
		//圆盘宽高（直径）单位：px
		swiperh:{
			type: Number,
			default: 220,
			required: true
		},
		//初始rgb颜色
		defaultrgb:{
			type: Array,
			default: () => [255,255,255],
			// required: true
		},
	},
	data(){
		return{
			// swiperh:220,
			canSend: true,
			centreX: 0,
			centreY: 0,
			rgbs:[255,255,255],
			ctop:-10,
			cleft:-10,
			context: null,
			xpos:0,
			ypos:0,
		}
	},
	created() {
		this.rgbs = this.defaultrgb
		// setTimeout(()=>{
		// 	this.drawRang()
		// },100)
	},
	methods:{
	// 	drawRang(){
	// 		console.log('我被执行');
	// 		this.context = uni.createCanvasContext('rgbImg')
	// 		this.context.beginPath(); // 开一条新路
	// 		const x = this.swiperh / 2;
	// 		const y = this.swiperh / 2;
	// 		const radius = this.swiperh / 2;
	
	// 		for (let angle = 0; angle <= 360; angle += 1) {
	// 			const startAngle = ((angle - 2) * Math.PI) / 180;
	// 			const endAngle = (angle * Math.PI) / 180;
	// 			this.context.beginPath();
	// 			this.context.moveTo(x, y);
	// 			this.context.arc(x, y, radius * 2, startAngle, endAngle, false);
	// 			this.context.closePath();
	// 			var gradient = this.context.createCircularGradient(x, y, 0, x, y, radius * 2);
	// 			gradient.addColorStop(0, 'hsl(' + (360 - angle) + ', 100%, 50%)');
	// 			this.context.fillStyle = gradient;
	// 			this.context.fill();
	// 		}
	// 		// this.context.globalCompositeOperation = 'destination-out';
			
	// 		this.context.draw()
	// 	},
		//触摸开始事件
		onRgbTouchstart(e) {
			// console.log(e)
			try{
				this.vibrate()
			}catch(e){
				//TODO handle the exception
			}
			
			let touches = e.mp.changedTouches[0] || e.changedTouches[0];
			
			// console.log('onRgbTouchstart')
			// console.log(touches)
			const that = this
			const query = uni.createSelectorQuery().in(this);
			query.select('#rgbImg').boundingClientRect(data => {
				// console.log("得到布局位置信息" + JSON.stringify(data));
				// console.log("节点离页面顶部的距离为" + data.top);
		
				that.centreX = data.left + data.width / 2
				that.centreY = data.top + data.height / 2
				that.maxRadius = data.width / 2
				// console.log('中心点：')
				// console.log('centerX:' + that.centreX + ',centerY:' + that.centreY)
				let clientX = touches.clientX
				let clientY = touches.clientY
				const xSquare = Math.abs(that.centreX - clientX) ** 2
				const ySquare = Math.abs(that.centreY - clientY) ** 2
				//斜边
				const hypotenuse = Math.sqrt(xSquare + ySquare)
				if(hypotenuse > that.maxRadius){
					that.canSend = false
					return false
				}else{
					that.canSend = true
				}
				this.ctop =clientY -5
				this.cleft = clientX - 5
			}).exec();
			this.isRgbMove = false
		},
		//触摸移动
		onRgbTouchmove(e) {
			let touches = e.mp.changedTouches[0] || e.changedTouches[0];
			const that = this
			let clientX = touches.clientX
			let clientY = touches.clientY
			this.xpos = clientX
			this.ypos = clientY
			if(Math.abs(this.ctop+5-clientY)<3&&Math.abs(this.cleft+5-clientX)<3){
				return;
			}
			// if(clientX < that.centreX-that.maxRadius){//centreX是圆心点X轴坐标，that.maxRadius为圆的半径
			// 	clientX = that.centreX-that.maxRadius
			// }
			// if(clientX > that.centreX+that.maxRadius){//centreX是圆心点X轴坐标，that.maxRadius为圆的半径
			// 	clientX = that.centreX+that.maxRadius
			// }
			// if(clientY < that.centreY-that.maxRadius){//centreY是圆心点Y轴坐标，that.maxRadius为圆的半径
			// 	clientY = that.centreY-that.maxRadius
			// }
			// if(clientY > that.centreY+that.maxRadius){//centreY是圆心点Y轴坐标，that.maxRadius为圆的半径
			// 	clientY = that.centreY+that.maxRadius
			// }
			const xSquare = Math.abs(that.centreX - clientX) ** 2
			const ySquare = Math.abs(that.centreY - clientY) ** 2
			//斜边
			let hypotenuse = Math.sqrt(xSquare + ySquare)
			//console.log(hypotenuse)
			//console.log(that.maxRadius)
			let angle = this.getAngle(that.centreX, that.centreY,clientX,clientY);
		
			if(hypotenuse > that.maxRadius){
				//return false
				let x1 = that.centreX + that.maxRadius * Math.cos(angle * Math.PI / 180)
				let y1 = that.centreY + that.maxRadius * Math.sin(angle * Math.PI / 180)
				
				if (angle>0 && angle <180 ){
					y1 = y1 - (Math.abs(y1 - that.centreY))*2
				}
				else {
					y1 = y1 + (Math.abs(y1 - that.centreY))*2
				}
				this.ctop =y1 -5
				this.cleft = x1 - 5
				
				hypotenuse = that.maxRadius
			}
			else{
				this.ctop =clientY -5
				this.cleft = clientX - 5
			}
			this.rgbs=this.choiseColor(angle,hypotenuse,that.maxRadius)
			
			this.isRgbMove = true
		},
		//触摸结束事件
		onRgbTouchend(e) {
			try{
				this.vibrate()
			}catch(e){
				//TODO handle the exception
			}
		
			if (this.isRgbMove == false){
				let touches = e.mp.changedTouches[0] || e.changedTouches[0];
				const that = this
				let clientX = touches.clientX
				let clientY = touches.clientY
			
				const xSquare = Math.abs(that.centreX - clientX) ** 2
				const ySquare = Math.abs(that.centreY - clientY) ** 2
				//斜边
				const hypotenuse = Math.sqrt(xSquare + ySquare)
				if(hypotenuse > that.maxRadius){
					return false
				}else{
					let angle = this.getAngle(that.centreX, that.centreY,clientX,clientY);
					this.rgbs=this.choiseColor(angle,hypotenuse,that.maxRadius)
					this.ctop =clientY -5
					this.cleft = clientX - 5
				}
			}
		
			if(this.canSend == true){
				this.rgbChange()
			}
		},
		rgbChange(){
			// console.log(this.rgbs);
			let rgblist = []
			for(let i in this.rgbs){
				rgblist.push((this.rgbs[i]).toFixed(0))
			}
			this.$emit('getrgbColor',rgblist)
		},
		//震动
		vibrate(){
		  if(uni.getSystemInfoSync().platform == "android") {
		  	uni.vibrateShort();
		  }else{
			let UIImpactFeedbackGenerator = plus.ios.importClass('UIImpactFeedbackGenerator');
			let impact = new UIImpactFeedbackGenerator();
			impact.prepare();
			impact.init(1);
			impact.impactOccurred();
		  }
		},
		choiseColor(angle, radius,maxRadius) {
			// let maxRadius = 220; //最大半径 
			let blue; //蓝色
			let red; //
			let green;
			if (angle >= 60 && angle <= 180) {
				blue = 255;
		
				if (angle <= 120) {
					green = 0 + (maxRadius - radius) * 255 / maxRadius;
					red = 255 - (angle - 60) * 255 / 60;
					red = red + (255 - red) * (maxRadius - radius) / maxRadius;
				} else {
					red = 0 + (maxRadius - radius) * 255 / maxRadius;
					green = (angle - 120) * 255 / 60;
					green = green + (255 - green) * (maxRadius - radius) / maxRadius;
				}
			} else if (angle > 180 && angle <= 300) {
				green = 255;
		
				if (angle <= 240) {
					red = 0 + (maxRadius - radius) * 255 / maxRadius;
					blue = 255 - (angle - 180) * 255 / 60;
					blue = blue + (255 - blue) * (maxRadius - radius) / maxRadius;
				} else {
					blue = 0 + (maxRadius - radius) * 255 / maxRadius;
					red = (angle - 240) * 255 / 60;
					red = red + (255 - red) * (maxRadius - radius) / maxRadius;
				}
		
			} else {
				red = 255;
				if (angle > 300) {
					blue = 0 + (maxRadius - radius) * 255 / maxRadius;
		
					green = 255 - (angle - 300) * 255 / 60;
					green = green + (255 - green) * (maxRadius - radius) / maxRadius;
				} else {
					green = 0 + (maxRadius - radius) * 255 / maxRadius;
					blue = (angle - 0) * 255 / 60;
					blue = blue + (255 - blue) * (maxRadius - radius) / maxRadius;
				}
			}
			//return new int[]{red,green,blue};
			return [red, green, blue]
		},
		getAngle(x1, y1, x2, y2) { //x1y1为圆心，x2y2为点击点坐标，
		
			var angle = Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;
			// console.log('angle:::::::'+angle)
			if (x2 > x1 && y2 > y1) { //鼠标在第四象限
				// angle = 360 - angle;
				angle = 360 - (90-angle);
			}
		
			if (x2 > x1 && y2 < y1) { //鼠标在第一象限
				// angle = 180 - angle;
				angle = angle - 90;
			}
		
			if (x2 < x1 && y2 < y1) { //鼠标在第二象限
				// angle = -angle;
				angle = 90+(180+angle);
			}
		
			if (x2 < x1 && y2 > y1) { //鼠标在第三象限
				// angle = 180 - angle;
				angle = 180 +(90+angle);
			}
		
			if (x2 == x1 && y2 > y1) { //鼠标在y轴负方向上
				angle = 270;
			}
		
			if (x2 == x1 && y2 < y1) { //鼠标在y轴负方向上
				angle = 90;
			}
		
			if (x2 > x1 && y2 == y1) { //鼠标在x轴正方向上
				angle = 0;
			}
		
		
		
			if (x2 < x1 && y2 == y1) { //鼠标在x轴负方向
				angle = 180;
			}
			return angle;
		},
	}
}
</script>

<style>
	.rgbBox{
		border: 10upx;
		border-style: solid;
		/* border-color: red; */
		margin: auto;
	}
	.rgbtext{
		position: absolute;
		bottom: 10rpx;
		right: 2vw;
		color: #d8d7d7;
		text-align: left;
	}
	.slider{
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: red;
		z-index: 1;
	}
</style>