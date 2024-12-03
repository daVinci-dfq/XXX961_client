import { ref } from 'vue'
import SockJS from 'sockjs-client'
import { Client, Stomp } from '@stomp/stompjs'

export class WebSocketService {
  private static instance: WebSocketService | null = null
  private stompClient: Client | null = null
  private isConnected = ref(false)
  private socketEndpoint = ref('http://localhost:6539/webSocket')

  constructor() {
    if (WebSocketService.instance) {
      return WebSocketService.instance
    }
    WebSocketService.instance = this
  }

  public connect() {
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
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate()
      this.isConnected.value = false
      console.log('WebSocket STOMP Disconnected')
    }
  }

  public sendMessage(destination: string, message: object): void {
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message)
      })
    }
  }

  public subscribe(
    destination: string,
    callback: (message: any) => void
  ): void {
    if (this.stompClient && this.isConnected) {
      this.stompClient.subscribe(destination, (frame: any) => {
        callback(JSON.parse(frame.body))
      })
    }
  }
}
