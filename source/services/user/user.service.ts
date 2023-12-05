import axios from "axios"
import { JWT } from "../jwt.service"
import { IUser } from "../auth/types"
import { BASE_API_URL } from '@env'
import { IFriend } from "./types"

axios.defaults.baseURL = BASE_API_URL

class User {
   async getProfile(): Promise<IUser | undefined> {
      const { data } = await axios.get('user/profile', {
         headers: {
            Authorization: `Bearer ${await JWT.getAccessToken()}`
         }
      })

      return data
   }

   async getFriends(): Promise<IFriend[] | undefined> {
      const { data } = await axios.get<IFriend[] | undefined>('user/get-friends', {
         headers: {
            Authorization: `Bearer ${await JWT.getAccessToken()}`
         }
      })

      return data
   }

   async getUsersByUserName(username: string): Promise<IFriend[] | undefined> {
      const { data } = await axios.get<IFriend[] | undefined>(`user/${username}`, {
         headers: {
            Authorization: `Bearer ${await JWT.getAccessToken()}`
         }
      })

      return data
   }

   async addNewFriend(id: string): Promise<void> {
      await axios.post(`user/add-friend/${id}`, null, {
         headers: {
            Authorization: `Bearer ${await JWT.getAccessToken()}`
         }
      })
   }
}

export const UserService = new User()