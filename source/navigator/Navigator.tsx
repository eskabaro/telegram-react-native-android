import { FC } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { HomeScreen } from "../screens/Home"
import { Button } from "react-native"

const Drawer = createDrawerNavigator()

export const Navigator: FC = () => {
   return (
      <Drawer.Navigator drawerContent={() => <CustomDrawerContent  />}>
         <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
   )
}

const CustomDrawerContent: FC = () => {
   return (
      <Button
         title="Go somewhere"
      />
   )
}