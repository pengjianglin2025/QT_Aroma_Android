<template>
	<view class="pickerCanvas" :dpi="dpi" :change:dpi="view.setDpi" :showHalo="showHalo"
		:change:showHalo="view.setHalo">
		<view class="canvas-box" :style="`${getCnvasSize}${showHalo ? getCanvasShadow : ''}`">
			<canvas :disable-scroll="true" :style="getCanvasStyle" class="canvas" canvas-id="pickerCanvas"
				id="pickerCanvas"></canvas>
			<view class="canvas-pointer" :style="getCanvasPointerStyle" id="move"></view>
		</view>
	</view>
</template>

<script>
	import colorBg from './color.png'
	export default {
		props: {
			//彩色圆盘的大小
			pickerWidth: {
				type: Number,
				default: 280
			},
			pointerSize: {
				type: Number,
				default: 30
			},
			// 是否显示光环
			showHalo: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				bgSrc: colorBg,
				canvasPonterPos: { //选色板的滑块
					x: 0,
					y: 0,
				},
				dpi: 0
			}
		},
		computed: {
			getCanvasStyle() {
				return `width: ${this.pickerWidth || 280}px;height: ${this.pickerWidth || 280}px`
			},
			getCanvasPointerStyle() {
				return `left: ${this.canvasPonterPos.x}px;top: ${this.canvasPonterPos.y}px;width: ${this.pointerSize}px;height: ${this.pointerSize}px;`
			},
			getCanvasShadow() {
				return `box-shadow: 0 0 20px 5px #fff;`
			},
			getCnvasSize() {
				return `width: ${(this.pickerWidth || 280) - 1}px;height: ${(this.pickerWidth || 280) - 1}px;`
			},
		},
		created() {
			this.dpi = uni.getDeviceInfo().devicePixelRatio
		},
		mounted() {
			this.drawImage()
		},

		methods: {
			// 初始化背景
			drawImage() {
				const ctx = uni.createCanvasContext('pickerCanvas', this);
				ctx.drawImage(this.bgSrc, 0, 0, this.pickerWidth, this.pickerWidth)
				ctx.draw()
			},
			emitChanging(val) {
				this.$emit('changing', val)
			},
			emitChange(val) {
				this.$emit('change', val)
			},
		}
	}
</script>

<script module="view" lang="renderjs" type="module">
	import {
		HEX_REG,
		HEXtoRGB,
		RGBtoHSV,
		RGBtoHEX,
		HSVtoRGB,
		$,
		nodeInfo,
		queryCanvas,
		scientificToArtisticSmooth,
		makeGradient,
		praseEventPos
	} from "./uils.js"

	export default {
		data() {
			return {
				moveRadius: 0,
				canvasLeft: 0,
				canvasTop: 0,
				canvasWidht: 0,
				canvasRadius: 0,
				canvasCenterX: 0,
				canvasCenterY: 0,
				x: 0,
				y: 0,
				dpi: 0,
				context: null,
				isShowHalo: false,
				color: null
			}
		},
		computed: {

		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				const canvasBox = document.querySelector('.canvas-box')
				canvasBox.addEventListener('touchstart', e => {
					console.log(e);
					this.updataStatus(...praseEventPos(e))
				}, {
					passive: false
				})
				canvasBox.addEventListener('touchmove', e => {
					// console.log(e.changedTouches[0]);
					// console.log(...praseEventPos(e));
					this.updataStatus(...praseEventPos(e))
				}, {
					passive: false
				})
				canvasBox.addEventListener('touchend', e => {
					let coordinate = e.changedTouches[0]
					this.updataStatus(coordinate.clientX, coordinate.clientY)
					this.$ownerInstance.callMethod('emitChange', this.color)
					// console.log(this.color);
				})
				// 获取移动块半径
				const move = document.querySelector('#move')
				this.moveRadius = move.offsetWidth / 2
				// // 获取 dom canvas
				const canvasInner = document.querySelector('.canvas>canvas');
				this.context = canvasInner.getContext('2d', {
					willReadFrequently: true
				})
				const canvas = document.querySelector('#pickerCanvas')
				const rect = canvas.getBoundingClientRect();
				console.log('rect',rect);
				// 画布左边距离
				this.canvasLeft = rect.left

				// // 画布顶部距离
				this.canvasTop = rect.top

				// // 画布宽度
				this.canvasWidht = rect.width
				// // 画布半径
				this.canvasRadius = rect.width / 2
				// // 画布中心 x,y坐标
				this.canvasCenterX = rect.left + rect.width / 2
				this.canvasCenterY = rect.top + rect.height / 2
				console.log(this.canvasCenterX,this.canvasCenterY);
				// 初始化默认坐标
				this.updateCoordinates(this.canvasCenterX, this.canvasCenterY)
				this.setMoveCoordinate()
			},
			setDpi(newValue, oldValue, ownerInstance, instance) {
				this.dpi = newValue
			},
			setHalo(newVal) {
				this.isShowHalo = newVal
			},
			// 更新状态
			updataStatus(clientX, clientY) {
				this.updateCoordinates(clientX, clientY)
				this.setMoveCoordinate()
				this.updateColor()
			},
			//计算当前坐标
			updateCoordinates(x, y) {
				const angle = Math.atan2(y - this.canvasCenterY, x - this.canvasCenterX);
				const r = Math.sqrt(Math.pow(x - this.canvasCenterX, 2) + Math.pow(y - this.canvasCenterY, 2));
				const vr = this.canvasRadius - 1;
				// console.log('vr==>',vr);
				// console.log('r==>',r);
				if (r > vr) {
					x = Math.cos(angle) * vr + this.canvasCenterX;
					y = Math.sin(angle) * vr + this.canvasCenterY;
				}
				// console.log(y);
				this.x = Math.floor(x - this.canvasLeft);
				this.y = Math.floor(y - this.canvasTop);
			},
			// 设置移动块位置
			setMoveCoordinate() {
				let move = document.querySelector('#move')
				move.style.left = this.x - this.moveRadius + 'px';
				move.style.top = this.y - this.moveRadius + 'px';
			},
			// 更新颜色
			updateColor() {
				// 属性中的宽高并不代表实际宽高 canvas大小会随着dpi(设备像素比)变化 绘制到浏览器后会根据当前dpi进行缩放
				const imageData = this.context.getImageData(this.x * this.dpi, this.y * this.dpi, 1, 1).data
				let hexColor = RGBtoHEX(imageData[0], imageData[1], imageData[2])
				if (this.isShowHalo) {
					const canvasBox = document.querySelector('.canvas-box')
					canvasBox.style.boxShadow = `0 0 20px 5px ${hexColor}`
				}
				this.$ownerInstance.callMethod('emitChanging', {
					rgb: {
						r: imageData[0],
						g: imageData[1],
						b: imageData[2]
					},
					hex: hexColor
				})
				move.style.background = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`
				this.color = {
					rgb: {
						r: imageData[0],
						g: imageData[1],
						b: imageData[2]
					},
					hex: hexColor
				}
			}
		}
	}
</script>



<style lang="scss" scoped>
	.pickerCanvas {
		background: transparent;

		.canvas-box {
			position: relative;
			margin: 0 auto;
			width: 280px;
			height: 280px;
			background: transparent;
			-webkit-border-radius: 50%;
			border-radius: 50%;
		}

		.canvas-pointer {
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 0;
			width: 30px;
			height: 30px;
			border: 3px solid #444;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			background: #fff;
			-webkit-box-sizing: content-box;
			box-sizing: content-box;
		}


	}
</style>