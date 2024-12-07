<template>
  <div class="test">
    <h2>WebSocket Service Test</h2>
    <el-button @click="connect" :disabled="isConnected">Connect</el-button>
    <el-button @click="disconnect" :disabled="!isConnected"
      >Disconnect</el-button
    >
    <el-button @click="sendMessage" :disabled="!isConnected"
      >Send Message</el-button
    >

    <el-input
      v-model="messageToSend"
      placeholder="Type a message to send"
    ></el-input>
    <el-alert
      v-if="isConnected"
      title="Connected to WebSocket"
      type="success"
    ></el-alert>
    <el-alert v-else title="Not connected" type="info"></el-alert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WebSocketService } from '@/service/WebSocketService'
import { ElButton, ElInput, ElAlert } from 'element-plus'

const webSocketService = new WebSocketService()
const isConnected = ref(webSocketService.isConnected)
const messageToSend = ref('')

// 连接 WebSocket
const connect = () => {
  console.log('Connecting to WebSocket...')
  webSocketService
    .connect()
    .then(() => {
      console.log('WebSocket connected!')
      isConnected.value = true
    })
    .catch((error) => {
      console.error('Error connecting to WebSocket:', error)
    })
}

// 断开 WebSocket 连接
const disconnect = () => {
  webSocketService.disconnect()
  isConnected.value = false
  console.log('WebSocket disconnected!')
}

// 发送消息
const sendMessage = () => {
  if (messageToSend.value.trim()) {
    webSocketService.sendMessage('/queue/test', {
      message: messageToSend.value
    })
    console.log('Message sent:', messageToSend.value)
    messageToSend.value = '' // 清空输入框
  }
}

// 监听消息
webSocketService.subscribe('/queue/test', (message) => {
  console.log('Received message:', message)
  alert(`Received message: ${message.message}`) // 显示接收到的消息
})
</script>

<style scoped>
</style>
