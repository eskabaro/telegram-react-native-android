/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useContext, useEffect } from "react"
import { StatusBar } from "react-native"
import { RootProvider } from "./source/providers/Root"
import { RootNavigator } from "./source/navigator/Root"
import { Context } from "./source/providers/Context"

export default function App(): JSX.Element {
  const { headerInputShow } = useContext(Context)

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent')
    StatusBar.setBarStyle("dark-content")
    StatusBar.setTranslucent(true)
  }, [headerInputShow])

  return (
    <RootProvider>
      <RootNavigator />
    </RootProvider>
  )
}


