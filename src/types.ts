export type RoomModel = {
  id: string
  name: string
  messages: MessageModel[]
}

export type MessageModel = {
  id: string
  user_id: string
  text: string
  room_id: number
  created_at: any
  updated_at: any
}

export type UserModel = {
  id: string
  user_name: string
  password: string
}
