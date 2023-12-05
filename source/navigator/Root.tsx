import { FC, useContext, useEffect } from "react"
import { Context } from "../providers/Context"
import { HomeNavigator } from "./Home"
import { AuthNavigator } from "./Auth"
import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user/user.service"
import SplashScreen from "react-native-splash-screen"

export const RootNavigator: FC = () => {
   const { user, setUser } = useContext(Context)

   const { data, isLoading } = useQuery({
      queryKey: ["get-profile"],
      queryFn: UserService.getProfile
   })

   useEffect(() => {
      if (!isLoading && data) {
         setUser(data)
         SplashScreen.hide()
      }
   }, [data])

   return user ? (
      <HomeNavigator />
   ) : (
      <AuthNavigator />
   )
}