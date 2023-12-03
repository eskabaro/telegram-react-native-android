import axios from "axios"
import { JWT } from "../jwt.service"
import { IUser } from "../auth/types"
import { BASE_API_URL } from '@env'

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
}

export const UserService = new User()