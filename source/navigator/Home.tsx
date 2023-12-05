import { FC, useContext } from "react"
import { Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Context } from "../providers/Context"
import { HomeScreen } from "../screens/Home"
import { ChatScreen } from "../screens/Chat"
import { FriendsScreen } from "../screens/Friends"
import { HeaderTitle } from "../ui/HeaderTitle"
import { InputHeader } from "../ui/InputHeader"
import { AvatarBox } from "../ui/AvatarBox"
import { StylesConfig } from "../styles-config"
import { ScreensDrawerParamList } from "./types"
import Icon from "react-native-vector-icons/MaterialIcons"

const Drawer = createDrawerNavigator<ScreensDrawerParamList>()

export const HomeNavigator: FC = () => {
   const { isHomeLoad, headerInputShow, setHeaderInputShow } = useContext(Context)

   return (
      <Drawer.Navigator
         drawerContent={() => <CustomDrawerContent />}
         screenOptions={{
            headerStyle: { backgroundColor: headerInputShow ? "white" : StylesConfig["dark-blue"] },
            headerTitleStyle: { color: 'white' },
            headerTintColor: "white",
            headerRightContainerStyle: {
               paddingRight: "5%",
               width: "100%", height: "100%",
               position: headerInputShow ? "absolute" : "relative"
            },
            headerLeftContainerStyle: { paddingLeft: "5%" }
         }}
      >
         <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
               headerLeft: () => <Icon name="menu" size={25} color="white" onPress={() => navigation.openDrawer()} />,
               headerTitle: () => <HeaderTitle isLoading={isHomeLoad} title="Telegram" />,
               headerRight: () => headerInputShow ? <InputHeader /> : <Icon name="search" size={25} color="white" onPress={() => setHeaderInputShow(true)} />
            })}
         />
         <Drawer.Screen
            name="Chat"
            component={ChatScreen}
         />
         <Drawer.Screen
            name="Friends"
            component={FriendsScreen}
            options={({ navigation }) => ({
               headerLeft: () => <Icon name="arrow-back" size={25} color="white" onPress={() => navigation.goBack()} />,
               headerRight: () => headerInputShow ? <InputHeader /> : (
                  <View style={styles.icons_box}>
                     <Icon name="search" size={25} color="white" onPress={() => setHeaderInputShow(true)} />
                     <Icon name="add" size={25} color="white" />
                  </View>
               ),
            })}
         />
      </Drawer.Navigator>
   )
}

const CustomDrawerContent: FC = () => {
   const { navigate, getState } = useNavigation<NavigationProp<ScreensDrawerParamList>>()
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
            {getState()?.routeNames.map(name => {
               if (name !== "Chat" && name !== "Home") return (
                  <Pressable key={name} onPress={() => navigate(name)}>
                     <Text>{name}</Text>
                  </Pressable>
               )
            })}
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      paddingTop: StatusBar.currentHeight || 0,
      backgroundColor: StylesConfig["dark-blue"],
   },
   drawer_header: {
      padding: "4%"
   },
   name_block: {
      marginTop: 15
   },
   nema_text: {
      fontWeight: "500",
      fontSize: 15,
      color: "white"
   },
   drawer_menu: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: "4%",
   },
   icons_box: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5
   }
})
