import { FC } from "react"
import { Text } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { ChatService } from "../services/chat/chat.service"
import { ChatItem } from "../components/ChatItem"


export const HomeScreen: FC = () => {
   const { data } = useQuery({
      queryKey: ["get-user-chats"],
      queryFn: () => ChatService.getAll()
   })

   return (
      <Text>
         {data?.length && data.map(e => (
            <ChatItem key={e.id} {...e} />
         ))}
      </Text>
   )
}