export interface IUser {
   id: string
   name: string
   username: string
   avatarPath: string
}

export interface IUserData {
   user: IUser
   accessToken: string
   refreshToken: string
}

export interface IRegisterFormData {
   name: string,
   username: string
   password: string
}

export interface ILoginFormData {
   username: string
   password: string
}

export interface IErrorRegister {
   message: string
}