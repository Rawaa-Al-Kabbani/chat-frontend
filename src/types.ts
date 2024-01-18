export type RoomModel = {
  id: number
  name: string
  messages: MessageModel[]
}

export type MessageModel = {
  id: number
  user_name: string
  text: string
  room_id: number
  created_at: any
  updated_at: any
}
