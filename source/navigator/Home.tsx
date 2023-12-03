import { FC, useContext } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Link } from "@react-navigation/native"
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ScreensDrawerParamList } from "./types"
import { HomeScreen } from "../screens/Home"
import { ChatScreen } from "../screens/Chat"
import { StylesConfig } from "../styles-config"
import { AvatarBox } from "../ui/AvatarBox"
import { Context } from "../providers/Context"

const Drawer = createDrawerNavigator<ScreensDrawerParamList>()

export const HomeNavigator: FC = () => {
   return (
      <Drawer.Navigator
         drawerContent={() => <CustomDrawerContent />}
         screenOptions={{
            headerStyle: { backgroundColor: StylesConfig["dark-blue"] },
            headerTitleStyle: { color: 'white' },
         }}
      >
         <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
               headerTintColor: 'white',
               title: "Telegram"
            }}
         />
         <Drawer.Screen
            name="Chat"
            component={ChatScreen}
         />

      </Drawer.Navigator>
   )
}

const CustomDrawerContent: FC = () => {
   const { navigate } = useNavigation<NavigationProp<ScreensDrawerParamList>>()
   const { user } = useContext(Context)

   return (
      <SafeAreaView style={styles.wrapper}>
         <View style={styles.drawer_header}>
            <AvatarBox
               width={65}
               height={65}
               avatarPath={user?.avatarPath!!}
               userName={user?.name!!}
            />

            <View style={styles.name_block}>
               <Text style={styles.nema_text}>{user?.name}</Text>
               <Text style={[styles.nema_text, { opacity: .5, fontSize: 13 }]}>@{user?.username}</Text>
            </View>
         </View>
         <View style={styles.drawer_menu}>
            <Link to={'/Chat'}>
               Contacts
            </Link>
         </View>
      </SafeAreaView >
   )
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      paddingTop: StatusBar.currentHeight || 0,
      backgroundColor: StylesConfig["dark-blue"],
   },
   drawer_header: {
      paddingHorizontal: '4%',
      paddingVertical: '4%'
   },
   name_block: {
      marginTop: 15
   },
   nema_text: {
      fontWeight: '500',
      fontSize: 15,
      color: 'white'
   },
   drawer_menu: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: '4%',
   }
})
