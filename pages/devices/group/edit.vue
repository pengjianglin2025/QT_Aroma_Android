<template>
<view class="">

	<uni-nav-bar fixed="true" :border="false" status-bar left-icon="left"  :title="$t('group-setting')" @clickLeft="back">
	</uni-nav-bar>
	
	<view style="padding: 40rpx;font-size: 32rpx;">
		<view class="list-cell-arrow work-timing" @click="showSetNamePop">
		  <view class="menu-item-box">
		    <view>{{$t('group-name')}}</view>
			<view class="time-text">{{groupName}}</view>
		  </view>
		</view>
	</view>
	<view class="delete-dev" @click="delGroup">
		{{$t('delete-group')}}
	</view>
	<uni-popup ref="gname" type="center">
		<view class="login-form-content pv" style="width:600rpx;">
			<view>{{$t('group-name')}}</view>
			<view class="input-item flex align-center">
				<input v-model="changeName" class="input" type="text" :placeholder="$t('input-group-name')" maxlength="30"/>
			</view>
			<view>
				<view class="action-btn">
					<button @click="editGroup" class="login-btn cu-btn block lg" >{{$t('com.confirm')}}</button>
				</view>
			</view>
		</view>
	</uni-popup>
</view>
</template>

<script>
import { deleteDeviceGroup,updateDeviceGroup } from "@/api/devices.js"
export default{
	 data() {
	  return {
		msg: '我是service层原来的msg',
		groupName: '',//分组名称
		changeName:'',//修改的名称
		dgid: ''
	  };
	},
	onLoad(data) {
		this.groupName = data.name
		this.changeName = data.name
		this.dgid = data.dgid
	},
	methods: {
		//打开修改名称弹窗
		showSetNamePop(){
			this.$refs.gname.open('center')
		},
		//关闭修改名称弹窗
		hideSetNamePop(){
			this.$refs.gname.close()
		},
		//删除分组
		delGroup(){
			let that = this
			uni.showModal({
			  title: this.$t('tip'),
			  content: this.$t('confirm-delete-group'),
			  cancelText: this.$t('com.cancel'),
			  confirmText: this.$t('com.confirm'),
			  success: function(res) {
			    if (res.confirm) {
			      let para = {
			      	dgid: that.dgid
			      }
			      deleteDeviceGroup(para).then(res=>{
		
			      	uni.reLaunch({
			      		url: '/pages/index'
			      	})
			      })
			    }
			  }
			})
			
		},
		//修改分组名称
		editGroup(){
			let para = {
				name: this.changeName,
				dgid: this.dgid
			}
			updateDeviceGroup(para).then(res=>{
				this.groupName = this.changeName
				this.hideSetNamePop()
				this.$modal.msg('success')
				uni.$emit('newtitle',this.changeName)
			})
		},
		// 触发逻辑层出入renderjs数据改变
		changeMsg() {
			this.msg = "msg值改变了";
		},
		// 接收renderjs发回的数据
		receiveRenderData(val) {
			//console.log('renderjs返回的值-->', val); 
		},
		//接收renderjs发回的数据,同时触发:change:msg,调用enderjs中的emitData的方法
		serviceClick(e){
			  this.msg=e
		}
	}
}
</script>

<script module="renderScript" lang="renderjs">
    export default {
      data() {
        return {
          name: '我是renderjs数据'
        }
      },
      methods: {
		  renferMsg(event, ownerInstance) {
		  	// 调用 service层的serviceClick方法,传值
			//console.log(event,ownerInstance)
		  	ownerInstance.callMethod('serviceClick', {
		  		test: '这是点击renderjs的区域，向service层传递变量'
		  	})
		  },
        // 接收逻辑层发送的数据
        receiveMsg(newValue, oldValue, ownerVm, vm) {
          // console.log('msg变化了newValue', newValue)
          // console.log('msg变化了oldValue', oldValue)
          // console.log('msg变化了ownerVm', ownerVm)
          // console.log('msg变化了vm', vm)
        },
        // 发送数据到逻辑层
        emitData(e, ownerVm) {
          ownerVm.callMethod('receiveRenderData', this.name)
        }
      }
    };
</script>
<style lang="scss">
	.delete-dev{
		text-align: center;
		width: 630rpx;
		height: 98rpx;
		line-height: 98rpx;
		// background: linear-gradient(to right,#FF6939,#FF8158);
		// border-radius: 12rpx;
		color: #fff;
		font-size: 36rpx;
		margin: auto;
		margin-top: 40rpx;
		background-color: #01CBA5;
		color: #ffffff;
		border-radius: 10px;
	}
	.work-timing{
		position: relative;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}
	.time-text{
		position: absolute;
		top: 50%;
		right: 80rpx;
		transform: translateY(-50%);
		color: #848484;
	}
	.gr-name{
		font-size: 32rpx;
		padding: 20rpx;
		padding-top: 40rpx;
	}
	
	.login-form-content {
		margin: 0 auto;
	
		padding-left: 20px;
		padding-right: 20px;
	
	
		.icon-left {
			padding-right: 40rpx;
		}
	
		.icon-left::after {
			content: "\e7eb";
			color: grey;
		}
	
		.input-item {
			margin: 20px auto;
			margin-top: 10px;
			background-color: #f5f6f7;
			height: 45px;
			border-radius: 5px;
	
			.icon {
				font-size: 38rpx;
				margin-left: 10px;
				color: #999;
			}
	
			.input {
				width: 100%;
				font-size: 14px;
				line-height: 20px;
				text-align: left;
				padding-left: 15px;
			}
	
		}
	
		.login-btn {
			margin-top: 40px;
			height: 45px;
			background-color: #01CBA5;
			color: #ffffff;
			border-radius: 10px;
		}
	
		.login-btn2 {
			margin-top: 40px;
			height: 45px;
			background-color: #AAAAAA;
			color: #ffffff;
			border-radius: 10px;
		}
	
		.reg {
			margin-top: 30px;
			display: flex;
			justify-content: space-between;
		}
	
		.xieyi {
			color: #333;
			margin-top: 20px;
		}
	
	}
	
	.pv {
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 40rpx;
	
	}
</style>