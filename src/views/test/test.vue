<template>
  <div>
    <h2>WebSocket Service Test</h2>
    <el-button @click="connect">Connect</el-button>
    <!-- <el-button @click="disconnect" :disabled="!isConnected"
      >Disconnect</el-button
    > -->
    <!-- <el-button @click="sendMessage" :disabled="!isConnected"
      >Send Message</el-button
    > -->

    <el-input
      v-model="messageToSend"
      placeholder="Type a message to send"
    ></el-input>
    <!-- <el-alert
      v-if="isConnected"
      title="Connected to WebSocket"
      type="success"
    ></el-alert> -->
    <!-- <el-alert v-else title="Not connected" type="info"></el-alert> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WebSocketService } from '@/service/WebSocketService' // 确保路径正确
import { ElButton, ElInput, ElAlert } from 'element-plus'

const wsService = new WebSocketService()
// const isConnected = ref(wsService.isConnected)
const messageToSend = ref('')

// 连接 WebSocket
const connect = () => {
  wsService
    .connect()
    .then(() => {
      console.log('Connected to WebSocket')
      // isConnected.value = true
    })
    .catch((error) => {
      console.error('Error connecting to WebSocket:', error)
    })
}

// 断开 WebSocket 连接
const disconnect = () => {
  wsService.disconnect()
  // isConnected.value = false
}

// 发送消息
const sendMessage = () => {
  if (messageToSend.value.trim()) {
    wsService.sendMessage('/queue/test', { message: messageToSend.value })
    console.log('Message sent:', messageToSend.value)
    messageToSend.value = '' // 清空输入框
  }
}

// 监听消息
wsService.subscribe('/queue/test', (message) => {
  console.log('Received message:', message)
  alert(`Received message: ${message.message}`) // 显示接收到的消息
})
</script>

<style scoped>
/* 你可以在这里添加一些自定义样式 */
</style>
