import { FC, useContext, useEffect, useRef } from "react"
import { TextInput, StyleSheet, View } from "react-native"
import { Context } from "../providers/Context"
import { StylesConfig } from "../styles-config"
import Icon from "react-native-vector-icons/MaterialIcons"

export const InputHeader: FC = () => {
   const { setHeaderInputShow, inputValue, setInputValue } = useContext(Context)
   const inputRef = useRef<TextInput>(null)

   const closeHeaderInput = () => {
      setHeaderInputShow("")
      setInputValue("")
   }

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus()
      }
   }, [])

   return (
      <View style={styles.wrapper}>
         <Icon name="arrow-back" size={25} color={StylesConfig.smoke} onPress={closeHeaderInput} />
         <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search"
            keyboardType="web-search"
            placeholderTextColor={StylesConfig.smoke}
            returnKeyType="search"
            value={inputValue}
            onChangeText={setInputValue}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      width: "100%", height: "100%",
      display: "flex", gap: 15,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: "3%"
   },
   input: {
      width: "100%",
      fontSize: 17,
      fontWeight: "500"
   }
})
