import { FC, useContext, useEffect, useRef } from "react"
import { TextInput, StyleSheet, View } from "react-native"
import { Context } from "../providers/Context"
import { StylesConfig } from "../styles-config"
import Icon from "react-native-vector-icons/MaterialIcons"

export const InputHeader: FC = () => {
   const { setHeaderInputShow } = useContext(Context)
   const inputRef = useRef<TextInput>(null)

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus()
      }
   }, [])

   return (
      <View style={styles.wrapper}>
         <Icon name="arrow-back" size={25} color={StylesConfig.smoke} onPress={() => setHeaderInputShow(false)} />
         <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search"
            keyboardType="web-search"
            placeholderTextColor={StylesConfig.smoke}
            returnKeyType="search"
            
         />
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      width: "100%", height: "100%",
      display: "flex", gap: 5,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: "3%"
   },
   input: {
      fontSize: 17,
      fontWeight: "500"
   }
})
