<template>
  <div class="f_c float_l">
    <div class="m_10 float_l">
      <el-input
        class="input_common"
        v-model="websocketPath"
        placeholder="后端websocket地址:http://ip:port/context/websocket-point"
      ></el-input>
      <el-input
        class="input_common"
        v-model="userId"
        placeholder="请输入用户名"
      ></el-input>
      <el-button v-if="!connected" @click="connectWebsocket">连接</el-button>
      <el-button v-else @click="disConnectWebsocket">断开</el-button>
    </div>
    <el-divider />
    <div class="f_c" v-if="connected">
      <div>
        <el-input
          class="input_common"
          v-model="messageUrl"
          placeholder="请输入消息地址:/sendMessage"
        ></el-input>
        <el-button @click="sendMessage" v-if="connected">发送</el-button>
      </div>
      <el-input
        class="input_common mt_10"
        v-model="message"
        type="textarea"
        :rows="2"
        placeholder="请输入需要发送的消息"
      ></el-input>
    </div>
    <el-divider />
    <div class="f_c m_10 float_l" v-if="connected">
      <div class="float_l">
        <el-input
          class="input_common"
          v-model="subscribePath"
          placeholder="请输入监听地址:/subscribe/id"
        ></el-input>
        <el-button @click="subscribeTopic" v-if="!subscribed">广播订阅</el-button>
        <el-button @click="unSubscribeTopic" v-else>取消订阅</el-button>
      </div>
      <div class="m_10 f_c">
        <span class="float_l">收到消息</span>
        <span style="border: aqua; width: 500px; height: 100px">{{ receiveMessage }}</span>
      </div>
    </div>
    <div class="f_c m_10 float_l" v-if="connected">
      <div class="float_l">
        <el-input
          class="input_common"
          v-model="userSubscribePath"
          placeholder="请输入监听地址:/subscribe/id"
        ></el-input>
        <el-button @click="subscribeUserTopic" v-if="!userSubscribed"
          >用户订阅</el-button
        >
        <el-button @click="unUserSubscribeTopic" v-else>取消订阅</el-button>
      </div>
      <div class="m_10 f_c">
        <span class="float_l">收到消息</span>
        <span style="border: aqua; width: 500px; height: 100px">{{
          receiveUserMessage
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Client, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const websocketPath = ref<string>('')
const userId = ref<string>('')
const messageUrl = ref<string>('')
const message = ref<string>('')
const subscribePath = ref<string>('')
const userSubscribePath = ref<string>('')
const receiveMessage = ref<string>('')
const receiveUserMessage = ref<string>('')
const connected = ref<boolean>(false)
const subscribed = ref<boolean>(false)
const userSubscribed = ref<boolean>(false)
const stompClient = ref<Client | null>(null)
const pushSubscriptionPromise = ref<any | null>(null)
const pushUserSubscriptionPromise = ref<any | null>(null)

const connectWebsocket = () => {
  if (!websocketPath.value) {
    // Error handling
    return
  }
  if (!userId.value) {
    // Error handling
    return
  }
  const socket = new SockJS(`ws://${websocketPath.value}`)
  stompClient.value = Stomp.over(socket)
  const headers = { 'userId': userId.value }
  stompClient.value.connect(
    headers,
    (frame) => {
    connected.value = true
    },
    (error) => {
      // Error handling
    }
  )
}

const sendMessage = () => {
  if (!message.value || !messageUrl.value) {
    // Error handling
    return
  }
  const msg = { message: message.value }
  stompClient.value?.send(messageUrl.value, {}, JSON.stringify(msg))
}

const subscribeTopic = () => {
  if (!subscribePath.value) {
    // Error handling
    return
  }
  subscribed.value = true
  pushSubscriptionPromise.value = stompClient.value?.subscribe(subscribePath.value, (message) => {
      receiveMessage.value += `收到订阅的消息：${JSON.stringify(JSON.parse(message.body))}\n`
    }
  )
}

const subscribeUserTopic = () => {
  if (!userSubscribePath.value) {
    // Error handling
    return
  }
  userSubscribed.value = true
  pushUserSubscriptionPromise.value = stompClient.value?.subscribe(userSubscribePath.value, (message) => {
      receiveUserMessage.value += `收到用户订阅的消息：${JSON.stringify(JSON.parse(message.body))}\n`
      // ACK confirmation
      stompClient.value?.ack(message)
    }
  )
}

const unSubscribeTopic = () => {
  pushSubscriptionPromise.value?.unsubscribe()
  subscribed.value = false
  receiveMessage.value = ''
};

const unUserSubscribeTopic = () => {
  pushUserSubscriptionPromise.value?.unsubscribe()
  userSubscribed.value = false
  receiveUserMessage.value = ''
};

const disConnectWebsocket = () => {
  if (stompClient.value) {
    stompClient.value.disconnect()
    stompClient.value = null
    connected.value = false
    subscribed.value = false
    userSubscribed.value = false
    receiveMessage.value = ''
    receiveUserMessage.value = ''
  }
};

onMounted(() => {
  // Any setup code that needs to run after the component is mounted
});

onBeforeUnmount(() => {
  disConnectWebsocket()
})
</script>

<style scoped>
/* Add your styles here */
</style>
