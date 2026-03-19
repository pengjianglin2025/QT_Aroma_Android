<template>
	<view class="content">
		<!-- <view style="text-align: left;width:100%;">
			<p>新数组: <text id="arrspana"></text></p>
		</view>
		<view>
			<view style="margin-bottom:20px;">
				<p>心跳: <text id="spana">0</text></p>
				<p>最高跳动值: <text id="maxspana">0</text></span></p>
			</view>
			<view style="display: flex;justify-content: space-between;flex-wrap: wrap;flex-direction: row;">
				<button @click="navtor.startListening">开始录音🎙️</button>
				<view style="width:20px;"></view>
				<button @click="navtor.stopListening">停止</button>
			</view>

			<view style="margin-top:20px;padding-bottom:20px;">
				<view style="display: flex;justify-content: space-between;flex-wrap: wrap;flex-direction: row;">
					<button @click="navtor.startAudio">播放音乐▶️</button>
					<view style="width:20px;"></view>
					<button @click="navtor.stopAudio">停止</button>
				</view>
			</view>
 
		</view> -->

	</view>
</template>


<script>
	import permision from "@/js_sdk/wa-permission/permission.js"

	export default {
		onReady: function(e) {
			this.requestAndroidPermission('android.permission.RECORD_AUDIO');
		},
		methods: {
			async requestAndroidPermission(permisionID) {
				var result = await permision.requestAndroidPermission(permisionID)
				var strStatus
				if (result == 1) {
					strStatus = "已获得授权"
				} else {
					strStatus = "请手动开启【录音】权限"+result
					uni.showModal({
						content: strStatus,
						showCancel: false
					});
				}

			},
		}
	}
</script>
<script module="navtor" lang="renderjs">
	let _stream;
	let _audioCtx;
	let _source;
	let _analyser;
	let _bufferLength;
	let _isStop;
	let _dataArray = [];
	let _positives = [];
	let _negatives = [];
	let _maxVolume = 0;
	let _listenVolume = 0;


	export default {
		mounted() {
			console.log('renderjs mounted...');

			let canvas = document.createElement('canvas');
			canvas.id = 'canv';
			canvas.style.width = "100%"
			// canvas.width='500';
			// canvas.height = '300';
			// canvas.style = 'border:1px solid red;'
			let content = document.getElementsByClassName('content');
			content[0].appendChild(canvas);

		},
		data() {
			return {
				maxVolume: 10,
				listenVolume: 0
			}
		},
		methods: {
			// 开始录音
			async startListening() {
				try {
					console.log('startListening...');
					_stream = await navigator.mediaDevices.getUserMedia({
						audio: true
					});

					_audioCtx = new(window.AudioContext || window.webkitAudioContext)();
					_source = _audioCtx.createMediaStreamSource(_stream);
					_analyser = _audioCtx.createAnalyser();

					_source.connect(_analyser);
					_analyser.connect(_audioCtx.destination);

					//_analyser.fftSize = 2048;
					_analyser.fftSize = 32;
					_bufferLength = _analyser.frequencyBinCount; // 可视化的数据值的数量

					_isStop = false;
					_maxVolume = 0;
					_listenVolume = 0;
					this.collectFrequencyData();

				} catch (error) {
					console.error(error);
				}
			},
			// 停止录音
			stopListening() {
				const mediaStreamTrack = _source.mediaStream.getAudioTracks()[0];
				mediaStreamTrack.stop();
				_isStop = true;
				_maxVolume = 0;
				setTimeout(function() {
					// document.getElementById("maxspana").innerText = 0;
					// document.getElementById("spana").innerText = 0;
				}, 50);
			},
			// scheme本地文件
			startAudio() {
				// let audioFile = '/static/bang.mp3';
				let audioFile = '/static/christmas.mp3';
				plus.io.resolveLocalFileSystemURL(audioFile, (entry) => {
					entry.file((file) => {
						//let reader = new FileReader();
						const reader = new plus.io.FileReader();
						//reader.readAsArrayBuffer(file);
						reader.readAsDataURL(file);
						reader.onload = function() {
							console.log('reader.onload.....................................')
						}
						reader.onloadend = (event) => {
							console.log('reader.onloadend.....................................*******')
							const fileContent = event.target.result;
							let base64 = fileContent.split(',')[1];
							const arrayBuffer = this.base64ToArrayBuffer(base64);
							this.play(arrayBuffer);
						};
						reader.onerror = (error) => {
							console.error(error);
						};
					});
				});
			},
			async play(arrayBuffer) {
				_audioCtx = new(window.AudioContext || window.webkitAudioContext)();
				const audioBuffer = await _audioCtx.decodeAudioData(arrayBuffer);

				_source = _audioCtx.createBufferSource();
				_source.buffer = audioBuffer;
				_analyser = _audioCtx.createAnalyser();
				_source.connect(_analyser);
				_analyser.connect(_audioCtx.destination);
				_source.start(0);

				_analyser.fftSize = 32;
				_bufferLength = _analyser.frequencyBinCount; // 可视化的数据值的数量

				_isStop = false;
				_maxVolume = 0;
				_listenVolume = 0;
				this.collectFrequencyData();


			},
			// 停止播放
			stopAudio() {
				_source.stop();
				_isStop = true;
				_maxVolume = 0;
				setTimeout(function() {
					// document.getElementById("maxspana").innerText = 0;
					// document.getElementById("spana").innerText = 0;
				}, 50);
			},

			//收集频率数据
			collectFrequencyData() {
				
				if (!_isStop) {
					requestAnimationFrame(this.collectFrequencyData);
				}

				var dataArray = new Uint8Array(_bufferLength);

				_analyser.getByteFrequencyData(dataArray);
				_dataArray = dataArray;

				const currentMaxVolume = Math.max(...dataArray);
				_listenVolume= currentMaxVolume;
				// console.log('currentMaxVolume:'+currentMaxVolume + ',_maxVolume:'+_maxVolume)
				if (currentMaxVolume > _maxVolume) {
					_maxVolume = currentMaxVolume;
					// document.getElementById("maxspana").innerText = _maxVolume;
				}
				// document.getElementById("spana").innerText = _listenVolume;

				// console.log('拷贝频域数据......................')
				// console.log(dataArray)

				// 分为等份
				const total = 6;

				// 每等份需要分配位数
				const per = parseInt(_bufferLength / total);

				_positives = [];
				_negatives = [];

				//每两位组成一个数组
				for (let i = 0; i < total; i++) {

					let temp = dataArray.slice(i * per, (i + 1) * per);
					_positives.push(temp);

					_negatives.push(this.accumValue(temp));


				}
				// console.log(_negatives);
				let evepara={
					list: _negatives,
					maxVal: currentMaxVolume
				}
				this.$emit('getList',evepara)
				// document.getElementById("arrspana").innerText = JSON.stringify(_negatives);
				
				// console.log(_positives);
				// console.log(_negatives);
				this.drawWaver();

			},
			drawWaver() {


				// 创建canvas上下文
				let canvas = document.querySelector('#canv');
				if (canvas.getContext) {
					var WIDTH = canvas.width;
					var HEIGHT = canvas.height;

					// console.log('WIDTH:' + WIDTH);
					// console.log('HEIGHT:' + HEIGHT);

					const canvasCtx = canvas.getContext("2d");
					// canvasCtx.fillStyle = "rgb(173, 216, 230)";
					canvasCtx.fillStyle = "#F8F8F8";
					canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

					// let barWidth = (WIDTH / _bufferLength) * 0.8;
					let barWidth = (WIDTH / _bufferLength) * 0.9;
					// console.log('barWidth:' + barWidth)
				
					let barHeight;
					let x = 0;

					for (let i = 0; i < _bufferLength; i++) {
						barHeight = _dataArray[i];

						canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
						canvasCtx.fillRect(
							x,
							HEIGHT - barHeight / 2,
							barWidth,
							barHeight / 2
						);

						x += barWidth + 1;
					}

					canvasCtx.lineTo(canvas.width, canvas.height / 2);
					canvasCtx.stroke();
				}
			},
			accumValue(arr) {
				let finalValue = 0;
				for (let i = 0; i < arr.length; i++) {
					finalValue += arr[i];
				}

				return finalValue;
			},
			base64ToArrayBuffer(base64) {
				var binary_string = window.atob(base64);
				var len = binary_string.length;
				var bytes = new Uint8Array(len);
				for (var i = 0; i < len; i++) {
					bytes[i] = binary_string.charCodeAt(i);
				}
				return bytes.buffer;
			},
			arrayBufferToBase64(buffer) {
				var binary = '';
				var bytes = new Uint8Array(buffer);
				var len = bytes.byteLength;
				for (var i = 0; i < len; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				return window.btoa(binary);
			}
		}
	}
</script>
<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px 10px;
	}

	.content>view {
		margin-top: 30px;
	}
</style>