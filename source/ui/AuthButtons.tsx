import { FC } from "react"
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import { StylesConfig } from "../styles-config"

type func = () => void

interface IAuthButtonsProps {
   submitFn: func
   isShowReplaceBtn: boolean
   replaceFc?: func,
   isLoading?: boolean
}

export const AuthButtons: FC<IAuthButtonsProps> = ({ submitFn, isShowReplaceBtn, replaceFc, isLoading }) => {
   return (
      <>
         <TouchableOpacity style={[styles.button, { marginTop: 40 }]} onPress={submitFn} activeOpacity={.7}>
            {isLoading && <ActivityIndicator color="white" style={{ paddingRight: 5 }} />}
            <Text style={styles.btn_text}>Submit</Text>
         </TouchableOpacity>
         {isShowReplaceBtn && (
            <>
               <Text style={{ textAlign: 'center', paddingVertical: 10 }}>or</Text>
               <TouchableOpacity style={styles.button} onPress={replaceFc} activeOpacity={.7}>
                  <Text style={styles.btn_text}>Register</Text>
               </TouchableOpacity>
            </>
         )}
      </>
   )
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: StylesConfig["lite-blue"],
      padding: 10,
      alignItems: "center",
      borderRadius: 7,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
   },
   btn_text: {
      color: "white",
      fontSize: 15,
      fontWeight: "500"
   }
})