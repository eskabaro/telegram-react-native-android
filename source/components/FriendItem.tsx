import { Dispatch, FC, SetStateAction } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { IFriend } from "../services/user/types"
import { AvatarBox } from "../ui/AvatarBox"
import Icon from "react-native-vector-icons/MaterialIcons"
import { StylesConfig } from "../styles-config"

interface IFriendItemProps extends IFriend {
   type?: "add" | "default",
   setCheckBoxValue?: Dispatch<SetStateAction<string>>,
   checkBoxValue?: string
}

export const FriendItem: FC<IFriendItemProps> = ({ avatarPath, username, name, id, type, setCheckBoxValue, checkBoxValue }) => {

   return (
      <Pressable
         onPress={() => { }}
         style={styles.wrapper}
      >
         <View style={{ flexDirection: "row" }}>
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
         </View>
         {type === "add" && (
            <Pressable>
               <Icon
                  onPress={() => setCheckBoxValue?.(id)}
                  size={25}
                  color={StylesConfig.smoke}
                  name={checkBoxValue === id ? "radio-button-checked" : "radio-button-unchecked"}
               />
            </Pressable>
         )}
      </Pressable>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: "1.5%",
      borderBottomWidth: .5,
      borderBottomColor: "black",
      alignItems: "center",
      justifyContent: "space-between"
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
