import { FC, useContext } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../ui/Input"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ScreensStackParamList } from "../navigator/types"
import { AuthButtons } from "../ui/AuthButtons"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../services/auth/auth.service"
import { Context } from "../providers/Context"

interface IFormData {
   username: string
   password: string
}

export const Login: FC = () => {
   const { navigate } = useNavigation<NavigationProp<ScreensStackParamList>>()
   const { setUser } = useContext(Context)
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormData>({
      mode: "onBlur",
      defaultValues: {
         username: "",
         password: "",
      },
   })

   const { isPending, mutateAsync } = useMutation({
      mutationKey: ["login"],
      mutationFn: (data: IFormData) => AuthService.login(data),
      onSuccess: (data) => {
         setUser(data)
      },
      onError: () => {
         Alert.alert("Error", "User not foud", [
            {
               text: "Cancel",
               style: "cancel",
            },
            { text: "OK" },
         ])
      }
   })

   const onSubmit = async (data: IFormData) => data && await mutateAsync(data)

   return (
      <View style={styles.wrapper}>
         <Text style={styles.title}>Please enter your login details</Text>
         <Controller
            control={control}
            rules={{
               required: {
                  value: true,
                  message: "This field is required"
               },
            }}
            render={({ field: { onBlur, onChange, value } }) => (
               <Input
                  onBlur={onBlur}
                  value={value}
                  isError={!!errors.username?.message}
                  onChange={onChange}
                  placeholder="User Name"
               />
            )}
            name="username"
         />
         <Controller
            control={control}
            rules={{
               required: {
                  value: true,
                  message: "This field is required"
               },
               minLength: {
                  value: 6,
                  message: 'The password must contain min 6 symbols'
               }
            }}
            render={({ field: { onBlur, onChange, value } }) => (
               <Input
                  onBlur={onBlur}
                  isError={!!errors.password?.message}
                  value={value}
                  onChange={onChange}
                  placeholder="Password"
                  marginTop={20}
               />
            )}
            name="password"
         />

         <AuthButtons
            isShowReplaceBtn
            isLoading={isPending}
            submitFn={handleSubmit(onSubmit)}
            replaceFc={() => navigate("Register")}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      paddingHorizontal: '7%'
   },
   title: {
      textAlign: 'center',
      fontWeight: '300',
      fontSize: 19,
      marginVertical: 40
   }
})
