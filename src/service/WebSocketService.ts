import { ref } from 'vue'
// import { Socket } from 'socket-client' // 这是个隐蔽的错误！经过一顿忙活，发现这样不行，应该采用下面的方式，目前原理不清。
import SockJS from 'sockjs-client/dist/sockjs.min.js' // 这个报错请不要理会，别问，问就是他有他自己的节奏。
import { Client, Stomp } from '@stomp/stompjs'

/**
 * @author: daVinci
 * @description: 单例模式的WebSocketService类，用于管理WebSocket STOMP连接和消息发送和接收。
 */

export class WebSocketService {
  private static instance: WebSocketService | null = null
  private stompClient: Client | null = null
  public isConnected = ref(false)
  private socketEndpoint = ref('http://localhost:6539/webSocket')

  /**
   * WebSocketService类的构造函数，用于创建WebSocketService实例。如果已经存在实例，则返回该实例。
   * @returns 单例模式的WebSocketService实例。
   */
  constructor() {
    if (WebSocketService.instance) {
      return WebSocketService.instance
    }
    WebSocketService.instance = this
  }

  public connect() {
    console.log('Connecting to WebSocket STOMP...')
    return new Promise<void>((resolve, reject) => {
      this.stompClient = Stomp.over(() => {
        return new SockJS(this.socketEndpoint.value)
      })
      this.stompClient.brokerURL = this.socketEndpoint.value
      this.stompClient.onConnect = (frame) => {
        console.log('WebSocket STOMP Connected: ', frame)
        this.isConnected.value = true
        resolve()
      }
      this.stompClient.onWebSocketError = (error) => {
        console.log('WebSocket Error: ', error)
        reject(error)
      }
      this.stompClient.onStompError = (error) => {
        console.log('STOMP Error: ', error)
        reject(error)
      }
      this.stompClient.activate()
    })
  }

  public disconnect(): void {
    console.log('Disconnecting from WebSocket STOMP...')
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate()
      this.isConnected.value = false
      console.log('WebSocket STOMP Disconnected')
    }
  }

  public sendMessage(destination: string, message: object): void {
    console.log('Sending message to ', destination)
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message)
      })
    }
    console.log('Message sented!')
  }

  public subscribe(
    destination: string,
    callback: (message: any) => void
  ): void {
    console.log('Subscribing to ', destination)
    if (this.stompClient && this.isConnected) {
      this.stompClient.subscribe(destination, (frame: any) => {
        callback(JSON.parse(frame.body))
      })
    }
  }
}
