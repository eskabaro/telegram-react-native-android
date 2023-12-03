import axios from "axios"
import { JWT } from "../jwt.service"
import { BASE_API_URL } from '@env'
import { ILoginFormData, IRegisterFormData, IUserData } from "./types"

axios.defaults.baseURL = BASE_API_URL

class Auth {
   async register(body: IRegisterFormData) {
      const { data } = await axios.post('auth/register', body, {
         headers: { 'Content-Type': 'application/json' }
      })

      if (data) {
         this.setTockens(data.accessToken, data.refreshToken)

         return data.user
      }

      return data
   }

   async login(body: ILoginFormData) {
      const { data } = await axios.post<IUserData>('auth/login', body, {
         headers: { 'Content-Type': 'application/json' }
      })

      if (data) {
         this.setTockens(data.accessToken, data.refreshToken)

         return data.user
      }

      return undefined
   }

   private async setTockens(accessToken: string, refreshToken: string) {
      await Promise.all([
         JWT.setAccessToket(accessToken),
         JWT.setRefreshToken(refreshToken)
      ])
   }
}

export const AuthService = new Auth()
