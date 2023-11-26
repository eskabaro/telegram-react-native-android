/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RootProvider } from './source/providers/RootProvider'
import { Navigator } from './source/navigator/Navigator'
import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

export default function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <RootProvider>
      <Navigator />
    </RootProvider>
  )
}


