export interface UserInfo {
  name: string,
  class: string,
  mood: string,
  email: string,
}

export interface NewUserInfo {
  mood: string,
  email: string,
  password?: string,
  confirmPassword?: string,
}
