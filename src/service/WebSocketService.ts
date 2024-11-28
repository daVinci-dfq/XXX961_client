// 引入SockJS和Stomp
import SockJS from 'sockjs-client'
import { Client, Stomp } from '@stomp/stompjs'

export default {
  data() {
    return {
      stompClient: null as Stomp.Client | null,
      connected: false
    }
  },
  methods: {
    connect() {
      const socket = new SockJS('YOUR_WEBSOCKET_ENDPOINT')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        (frame: string) => {
          console.log('Connected: ' + frame)
          this.connected = true;
          this.onConnected();
        },
        (error: any) => {
          console.error('STOMP error:', error);
        })
    },
    onConnected() {
      // 订阅消息或执行其他操作
      this.stompClient!.subscribe('/topic/messages', message => {
        console.log('Received message: ' + message.body);
      })
    },
    disconnect() {
      if (this.stompClient !== null && this.stompClient.connected) {
        this.stompClient.disconnect(() => {
          console.log('Disconnected')
          this.connected = false
        })
      }
    }
  },
  mounted() {
    this.connect()
  },
  beforeDestroy() {
    this.disconnect()
  }
}
