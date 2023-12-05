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
type HeaderInputShowType = "search" | "add" | ""

interface IContext {
   user: UserType
   setUser: SetStateType<UserType>,
   isHomeLoad: boolean,
   setIsHomeLoad: SetStateType<boolean>,
   headerInputShow: HeaderInputShowType,
   setHeaderInputShow: SetStateType<HeaderInputShowType>,
   inputValue: string,
   setInputValue: SetStateType<string>
}

export const Context = createContext<IContext>({
   user: undefined,
   setUser: () => { },
   isHomeLoad: false,
   setIsHomeLoad: () => { },
   headerInputShow: "",
   setHeaderInputShow: () => { },
   inputValue: "",
   setInputValue: () => { }
})

export const ContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
   const [user, setUser] = useState<UserType>(undefined)
   const [isHomeLoad, setIsHomeLoad] = useState<boolean>(false)
   const [headerInputShow, setHeaderInputShow] = useState<HeaderInputShowType>("")
   const [inputValue, setInputValue] = useState<string>("")

   const contextValue: IContext = useMemo(() => ({
      user,
      setUser,
      isHomeLoad,
      setIsHomeLoad,
      headerInputShow,
      setHeaderInputShow,
      inputValue,
      setInputValue
   }), [user, isHomeLoad, headerInputShow, inputValue])

   return (
      <Context.Provider value={contextValue}>
         {children}
      </Context.Provider>
   )
}