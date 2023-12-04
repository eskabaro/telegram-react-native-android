import { FC } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"

interface IHeaderTitleProps {
   isLoading: boolean
   title: string
}

export const HeaderTitle: FC<IHeaderTitleProps> = ({ isLoading, title }) => {
   return (
      <View style={styles.wrapper}>
         {isLoading && (<ActivityIndicator color={"white"} />)}
         <Text style={styles.title}>{title}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: 10
   },
   title: {
      fontSize: 20,
      color: "white",
      fontWeight: "500"
   }
})
