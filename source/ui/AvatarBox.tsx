import { FC } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

interface IAvatarBoxProps {
   avatarPath: string
   userName: string
   width: number
   height: number
}

export const AvatarBox: FC<IAvatarBoxProps> = ({ avatarPath, userName, height, width }) => {
   return (
      <View style={[styles.image_box, { width, height }]}>
         {avatarPath ? (
            <Image style={styles.image_box_image} source={{ uri: avatarPath }} />
         ) : (
            <View style={styles.false_image} />
         )}
         <Text style={styles.image_box_text}>{userName.charAt(0).toUpperCase()}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   image_box: {
      position: 'relative',
      borderRadius: 100,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },
   image_box_image: {
      position: 'absolute',
      width: '100%', height: '100%'
   },
   image_box_text: {
      fontWeight: '700',
      fontSize: 20,
   },
   false_image: {
      position: 'absolute',
      width: '100%', height: '100%',
      backgroundColor: 'green'
   },
})
