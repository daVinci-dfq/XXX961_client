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
      this.stompClient = Client {
        brokerURL: this.socketEndpoint.value,
        connectHeaders: {
          Authorization: `Bearer ${token}`
        }
        debug: (str: string) => {
          console.log(str)
        },
        onConnect: (frame: any) => {
          console.log("WbSocket Connected: ", frame);
          this.isConnected.value = true;
          messages.value.push({
            sender: "Server",
            content: "Websocket connected",
            type: "tip",
          });

          this.stompClient.subscribe("/topic/notice", (res: any) => {
            messages.value.push({
              sender: "Server",
              content: res.body,
            });
          });

          this.stompClient.subscribe("/user/queue/greeting", (res: any) => {
            const messageData = JSON.parse(res.body) as MessageType;
            messages.value.push({
              sender: messageData.sender,
              content: messageData.content,
            });
          });
        },
        onStompError: (frame: any) => {
          console.error("Broker reported error: " + frame.headers["message"]);
          console.error("Additional details: " + frame.body);
        },
        onDisconnect: () => {
          isConnected.value = false;
          messages.value.push({
            sender: "Server",
            content: "Websocket disconnected",
            type: "tip",
          });
        },
      }
      stompClient.activate();

    })
  }

  public disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected')
        this.isConnected = false
      })
    }
  }

  public sendMessage(destination: string, message: any): void {
    if (this.stompClient && this.isConnected) {
      this.stompClient.send(destination, {}, JSON.stringify(message))
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
