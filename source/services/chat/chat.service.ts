import axios from "axios"
import { JWT } from "../jwt.service"
import { BASE_API_URL } from '@env'
import { IChat } from "./types"

axios.defaults.baseURL = BASE_API_URL

class Chat {
   async getAll(): Promise<IChat[] | undefined> {
      const { data } = await axios.get<IChat[] | undefined>('/chat', {
         headers: {
            Authorization: `Bearer ${await JWT.getAccessToken()}`,
            'Content-Type': 'application/json'
         }
      })

      return data
   }

   async getChatById(id: string): Promise<IChat | undefined> {
      const { data } = await axios.get<IChat | undefined>(`/chat/${id}`, {
         headers: {
            Authorization: `Bearer ${await JWT.getAccessToken()}`,
            'Content-Type': 'application/json'
         }
      })

      return data
   }
}

export const ChatService = new Chat()
