import { FC, useContext } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../ui/Input"
import { AuthButtons } from "../ui/AuthButtons"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../services/auth/auth.service"
import { Context } from "../providers/Context"

interface IFormData {
   name: string
   username: string
   password: string
}

export const Register: FC = () => {
   const { setUser } = useContext(Context)
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormData>({
      mode: "onBlur",
      defaultValues: {
         name: "",
         username: "",
         password: "",
      },
   })

   const { isPending, mutateAsync } = useMutation({
      mutationKey: ["register"],
      mutationFn: (data: IFormData) => AuthService.register(data),
      onSuccess: (data) => {
         setUser(data)
      },
      onError: () => {
         Alert.alert("Error", "Failed to register user", [
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
         <Text style={styles.title}>Please enter your register details</Text>
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
                  isError={!!errors.name?.message}
                  onChange={onChange}
                  placeholder="Your Name"
               />
            )}
            name="name"
         />
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
                  marginTop={20}
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
               pattern: {
                  value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])/g,
                  message: "The password must contain at least one special character and one number"
               },
               minLength: {
                  value: 6,
                  message: "The password must contain min 6 symbols"
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
            isLoading={isPending}
            isShowReplaceBtn={false}
            submitFn={handleSubmit(onSubmit)}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      paddingHorizontal: "7%"
   },
   title: {
      textAlign: "center",
      fontWeight: "300",
      fontSize: 19,
      marginVertical: 40
   }
})
