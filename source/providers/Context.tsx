import {
   FC,
   useMemo,
   useState,
   Dispatch,
   PropsWithChildren,
   SetStateAction,
   createContext
} from "react"
import { IUser } from "../services/auth/types"

type SetStateType<T> = Dispatch<SetStateAction<T>>
type UserType = IUser | undefined

interface IContext {
   user: UserType
   setUser: SetStateType<UserType>,
   isHomeLoad: boolean,
   setIsHomeLoad: SetStateType<boolean>
}

export const Context = createContext<IContext>({
   user: undefined,
   setUser: () => { },
   isHomeLoad: false,
   setIsHomeLoad: () => { }
})

export const ContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   const [user, setUser] = useState<UserType>(undefined)
   const [isHomeLoad, setIsHomeLoad] = useState<boolean>(false)

   const contextValue: IContext = useMemo(() => ({
      user,
      setUser,
      isHomeLoad,
      setIsHomeLoad
   }), [user, isHomeLoad])

   return (
      <Context.Provider value={contextValue}>
         {children}
      </Context.Provider>
   )
}