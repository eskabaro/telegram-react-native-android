import AsyncStorage from "@react-native-async-storage/async-storage"

class JWTService {
   async setAccessToket(token: string): Promise<void> {
      await AsyncStorage.setItem('access-token', token)
   }

   async setRefreshToken(token: string): Promise<void> {
      await AsyncStorage.setItem('refresh-token', token)
   }

   async getAccessToken(): Promise<null | string> {
      return await AsyncStorage.getItem('access-token')
   }
}

export const JWT = new JWTService()