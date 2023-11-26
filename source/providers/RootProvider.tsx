import { FC, PropsWithChildren } from "react"
import { NavigationContainer } from "@react-navigation/native"

export const RootProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   return (
      <NavigationContainer>
         {children}
      </NavigationContainer>
   )
}