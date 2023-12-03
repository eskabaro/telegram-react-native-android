import { FC } from "react"
import { ScreensStackParamList } from "./types"
import { createStackNavigator } from "@react-navigation/stack"
import { StylesConfig } from "../styles-config"
import { Login } from "../screens/Login"
import { Register } from "../screens/Register"

const Stack = createStackNavigator<ScreensStackParamList>()

export const AuthNavigator: FC = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerStyle: { backgroundColor: StylesConfig["dark-blue"] },
            cardStyle: { backgroundColor: 'white' },
            headerTintColor: "white"
         }}
      >
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
   )
}
