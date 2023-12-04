import { FC } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { IFriend } from "../services/user/types"
import { AvatarBox } from "../ui/AvatarBox"

interface IFriendItemProps extends IFriend { }

export const FriendItem: FC<IFriendItemProps> = ({ avatarPath, username, name }) => {
   return (
      <Pressable
         onPress={() => { }}
         style={styles.wrapper}
      >
         <AvatarBox
            height={45}
            width={45}
            avatarPath={avatarPath}
            userName={username}
         />

         <View style={styles.box_name}>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.name, { fontSize: 12 }]}>@{username}</Text>
         </View>
      </Pressable>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: "1.5%",
      borderBottomWidth: .5,
      borderBottomColor: "black"
   },
   box_name: {
      justifyContent: "center",
      paddingLeft: 10
   },
   name: {
      fontSize: 15,
      fontWeight: "500"
   }
})
