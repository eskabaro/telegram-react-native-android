/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from "react"
import { StatusBar } from "react-native"
import { RootProvider } from "./source/providers/Root"
import { RootNavigator } from "./source/navigator/Root"
import SplashScreen from "react-native-splash-screen"

export default function App(): JSX.Element {
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent')
    StatusBar.setBarStyle('light-content')
    StatusBar.setTranslucent(true)
    SplashScreen.hide()
  }, [])

  return (
    <RootProvider>
      <RootNavigator />
    </RootProvider>
  )
}


