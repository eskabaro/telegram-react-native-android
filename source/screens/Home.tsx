import { FC, useContext, useEffect } from "react"
import { ScrollView, Text, View } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { ChatService } from "../services/chat/chat.service"
import { ChatItem } from "../components/ChatItem"
import { WS } from "../services/ws/ws.service"
import { Context } from "../providers/Context"


export const HomeScreen: FC = () => {
   const { setIsHomeLoad } = useContext(Context)

   const { data, isLoading } = useQuery({
      queryKey: ["get-user-chats"],
      queryFn: () => ChatService.getAll()
   })

   useEffect(() => {
      WS.createConnection()
   }, [])

   useEffect(() => {
      setIsHomeLoad(isLoading)
   }, [isLoading])

   return data?.length ? (
      <ScrollView style={{ flex: 1 }}>
         {data.map(e => (
            <ChatItem key={e.id} {...e} />
         ))}
      </ScrollView>
   ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>You don't have any chats yet</Text>
      </View>
   )
}