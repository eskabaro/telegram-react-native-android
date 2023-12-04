import io, { Socket } from "socket.io-client"
import { BASE_WS_API_URL } from "@env"

export class WS {
   static socket: null | Socket = null

   static createConnection() {
      this.socket = io(BASE_WS_API_URL)

      this.socket.on('connect', () => {
         console.log('connect')
      })

      this.socket.on('disconnect', (error) => {
         console.log(error, 'disconnect')
      })
   }
}