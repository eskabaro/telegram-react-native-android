import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { TextInput, StyleSheet, ReturnKeyTypeOptions } from "react-native"
import { Noop } from "react-hook-form"
import { StylesConfig } from "../styles-config"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface IInputProps {
   placeholder: string
   value: string
   onBlur: Noop
   onChange: Dispatch<SetStateAction<string>>
   isError?: boolean,
   returnKeyType?: ReturnKeyTypeOptions,
   marginTop?: number
}

export const Input: FC<IInputProps> = ({
   value, onChange, onBlur, placeholder, isError, returnKeyType, marginTop
}) => {
   const [isInputFocus, setIsInputFocus] = useState<boolean>(false)
   const top = useSharedValue(17)
   const fontSize = useSharedValue(16)
   const borderColor = useSharedValue(StylesConfig.smoke)
   const placeholderColor = useSharedValue(StylesConfig.smoke)

   const animatedStylePlacehold = useAnimatedStyle(() => ({
      top: top.value,
      fontSize: fontSize.value,
      color: placeholderColor.value
   }))

   const animatedStyleInput = useAnimatedStyle(() => ({
      borderColor: borderColor.value
   }))

   useEffect(() => {
      top.value = withTiming(isInputFocus ? -12 : 17, { duration: 200 })
      fontSize.value = withTiming(isInputFocus ? 15 : 16, { duration: 200 })

      if (isError) {
         borderColor.value = StylesConfig.red
         placeholderColor.value = StylesConfig.red
      } else {
         borderColor.value = StylesConfig.smoke
         placeholderColor.value = StylesConfig.smoke
      } if (isInputFocus) {
         borderColor.value = StylesConfig["lite-blue"]
         placeholderColor.value = StylesConfig["lite-blue"]
      }

      if (value) setIsInputFocus(true)
   }, [isInputFocus, isError, value])


   return (
      <Animated.View style={[styles.input_box, animatedStyleInput, { marginTop }]}>
         <TextInput
            style={styles.input}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => {
               setIsInputFocus(false)
               onBlur()
            }}
            onChangeText={onChange}
            returnKeyType={returnKeyType}
            value={value}
         />
         <Animated.Text style={[styles.placeholder, animatedStylePlacehold]}>
            {placeholder}
         </Animated.Text>
      </Animated.View>
   )
}

const styles = StyleSheet.create({
   input_box: {
      position: "relative",
      borderRadius: 10,
      borderWidth: 1.5,
      height: 60,
      justifyContent: 'center'
   },
   input: {
      fontSize: 17
   },
   placeholder: {
      position: 'absolute',
      top: 17, height: 23, left: 10,
      backgroundColor: 'white',
      fontWeight: '400',
      fontSize: 17,
      paddingHorizontal: 5,
      color: 'black',
      zIndex: -1
   }
})
