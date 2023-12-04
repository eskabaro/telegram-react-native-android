import { FC, useContext } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { IChat } from "../services/chat/types"
import { ScreensDrawerParamList } from "../navigator/types"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AvatarBox } from "../ui/AvatarBox"
import { Context } from "../providers/Context"

interface IChatItemProps extends IChat { }

export const ChatItem: FC<IChatItemProps> = (props) => {
   const { navigate } = useNavigation<NavigationProp<ScreensDrawerParamList>>()
   const { user } = useContext(Context)
   const { id, chatUsers } = props

   return (
      <Pressable
         onPress={() => navigate("Chat", { ...props })}
         style={styles.wrapper}
      >
         <AvatarBox
            height={65}
            width={65}
            avatarPath={user?.avatarPath!!}
            userName={user?.username!!}
         />
      </Pressable>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "black",
      paddingHorizontal: "3%",
      paddingVertical: "1.5%"
   }
})
