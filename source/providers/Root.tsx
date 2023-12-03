import { FC, PropsWithChildren } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ContextProvider } from "./Context"

const queryClient = new QueryClient()

export const RootProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   return (
      <QueryClientProvider client={queryClient}>
         <ContextProvider>
            <NavigationContainer>
               {children}
            </NavigationContainer>
         </ContextProvider>
      </QueryClientProvider>
   )
}