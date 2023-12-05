import { FC, useContext, useEffect, useState } from "react"
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UserService } from "../services/user/user.service"
import { FriendItem } from "../components/FriendItem"
import { Context } from "../providers/Context"
import { StylesConfig } from "../styles-config"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export const FriendsScreen: FC = () => {
   const { headerInputShow, inputValue, setHeaderInputShow } = useContext(Context)
   const [addFriendId, setFriendId] = useState<string>("")
   const translateY = useSharedValue(95)

   const { data, isLoading, refetch } = useQuery({
      queryKey: ["get-friends"],
      queryFn: UserService.getFriends
   })

   const { data: dataSearch } = useQuery({
      queryKey: ["get-users-by-username", inputValue],
      queryFn: () => UserService.getUsersByUserName(inputValue),
      enabled: !!inputValue
   })

   const { mutateAsync, isPending } = useMutation({
      mutationKey: ['add-new-friend'],
      mutationFn: UserService.addNewFriend,
      onSuccess: () => {
         refetch()
         setHeaderInputShow("")
      },
      onError: () => {
         Alert.alert('Error', 'Failed to add user to friends list', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK' },
         ])
      }
   })

   const handleAddNewFriend = async () => {
      if (addFriendId) await mutateAsync(addFriendId)
   }

   const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: withTiming(translateY.value, { duration: 200 }) }],
   }))

   useEffect(() => {
      if (!!addFriendId) {
         translateY.value = withTiming(0, {
            duration: 200
         })
      } else {
         translateY.value = withTiming(95, {
            duration: 200
         })
      }
   }, [addFriendId])

   useEffect(() => {
      if (!inputValue) {
         translateY.value = withTiming(95, {
            duration: 200
         })
         setFriendId("")
      }
   }, [inputValue])

   if (headerInputShow === "add") {
      return (
         <>
            <ScrollView style={styles.wrapper}>
               {dataSearch?.length && dataSearch.map(e => (
                  <FriendItem
                     {...e}
                     key={e.id}
                     type="add"
                     checkBoxValue={addFriendId}
                     setCheckBoxValue={setFriendId}
                  />
               ))}
            </ScrollView>
            <Animated.View style={[styles.footer_modal, animatedStyles]}>
               <TouchableOpacity activeOpacity={0.7} style={styles.footer_modal_btn} onPress={handleAddNewFriend}>
                  {isPending && (<ActivityIndicator color={'#fff'} style={{ marginRight: 10 }} />)}
                  <Text style={styles.footer_modal_btn_text}>Add New Friend</Text>
               </TouchableOpacity>
            </Animated.View>
         </>
      )
   } else {
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
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      paddingHorizontal: "3%"
   },
   footer_modal: {
      width: '100%', height: 95,
      backgroundColor: "white",
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 7,
      borderTopWidth: 1,
      borderTopColor: StylesConfig.smoke,
      paddingHorizontal: "3%"
   },
   footer_modal_btn: {
      backgroundColor: StylesConfig["lite-blue"],
      padding: 15,
      width: '100%',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   footer_modal_btn_text: {
      color: '#fff',
      fontSize: 17,
      fontWeight: '500',
      textAlign: 'center'
   }
})
