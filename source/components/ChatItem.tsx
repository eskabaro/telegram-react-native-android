import { FC, useEffect } from "react"
import { Text } from "react-native"
import { WS } from "../services/ws/ws.service"
import { IChat } from "../services/chat/types"

interface IChatItemProps extends IChat { }

export const ChatItem: FC<IChatItemProps> = ({ id }) => {
   useEffect(() => {
      WS.createConnection()
   }, [])

   return (
      <Text>{id}</Text>
   )
}