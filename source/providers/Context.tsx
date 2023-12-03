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

type SetLangType<T> = Dispatch<SetStateAction<T>>
type UserType = IUser | undefined

interface IContext {
   user: UserType
   setUser: SetLangType<UserType>
}

export const Context = createContext<IContext>({
   user: undefined,
   setUser: () => { }
})

export const ContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   const [user, setUser] = useState<UserType>(undefined)

   const contextValue: IContext = useMemo(() => ({
      user,
      setUser
   }), [user])

   return (
      <Context.Provider value={contextValue}>
         {children}
      </Context.Provider>
   )
}