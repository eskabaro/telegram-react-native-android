import { FC } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user/user.service"
import { FriendItem } from "../components/FriendItem"

export const FriendsScreen: FC = () => {
   const { data, isLoading } = useQuery({
      queryKey: ["get-chats"],
      queryFn: UserService.getFriends
   })

   return data?.length ? (
      <ScrollView style={styles.wrapper}>
         {data.map(e => (
            <FriendItem key={e.id} {...e} />
         ))}
      </ScrollView>
   ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>You don't have any friends yet</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      paddingHorizontal: "3%"
   }
})
