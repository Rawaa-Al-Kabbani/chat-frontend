import { endpoint } from '../constants'
import { RoomModel } from '../types'

export const fetchRooms: () => Promise<RoomModel[]> = async () => {
  const query = `
            query {
                rooms {
                    id
                    name
                    messages {
                        id
                        user_name
                        text
                        room_id
                        created_at
                        updated_at
                    }
                }
            }
            `
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const json = await response.json()
    return json.data.rooms
  } catch (error) {
    console.error('Error fetching rooms:', error)
  }
}

export const fetchRoom = async (roomId: number) => {
  const mutation = `
            mutation findRoom($roomId: Int!) {
                room(id: $roomId) {
                    id
                    name
                    messages {
                    id
                    user_name
                    text
                    room_id
                    created_at
                    updated_at
                    }
                }
            }
        `
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: mutation, variables: { roomId } })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const json = await response.json()
    return json.data.room
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}

export const onCreateRoom: (roomName: string) => Promise<RoomModel> = async (roomName: string) => {
  const mutation = `
      mutation createRoom($createRoomInput: CreateRoomInput!) {
        createRoom(createRoomInput: $createRoomInput) {
          id
          name
        }
      }
    `
  const variables = {
    createRoomInput: {
      name: roomName
    }
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: mutation, variables })
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()

    if (result.errors) {
      console.error(
        'GraphQL errors:',
        result.errors.map((error: any) => error.message)
      )
    } else if (result.data && result.data.createRoom) {
      return result.data.createRoom
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error adding room:', error)
  }
}

export const onRemoveRoom: (roomId: number) => Promise<RoomModel> = async (roomId: number) => {
  const mutation = `
        mutation removeRoom($id: Int!) {
          removeRoom(id: $id) {
              id
            }
        }
    `
  const variables = {
    id: roomId
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      console.error(
        'GraphQL errors:',
        result.errors.map((error: any) => error.message)
      )
    } else if (result.data && result.data.removeMessage) {
      return result.data.removeMessage
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}

export const onCreateMessage = async (input: any) => {
  const mutation = `
            mutation createMessage($input: CreateMessageInput!) {
                createMessage(input: $input) {
                    id
                    user_name
                    text
                    room_id
                    created_at
                    updated_at
                }
            }
        `
  const variables = {
    input: input
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      console.error(
        'GraphQL errors:',
        result.errors.map((error: any) => error.message)
      )
    } else if (result.data && result.data.createMessage) {
      return result.data.createMessage
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}

export const onDeleteMessage = async (messageId: number) => {
  const mutation = `
            mutation deleteMessage($id: Int!) {
                deleteMessage(id: $id) {
                    id
                }
            }
        `
  const variables = {
    id: messageId
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      console.error(
        'GraphQL errors:',
        result.errors.map((error: any) => error.message)
      )
    } else if (result.data && result.data.deleteMessage) {
      return result.data.deleteMessage
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}

export const onEditMessage = async (messageId: string, input: any) => {
  const mutation = `
            mutation editMessage($id: Int!, $input: CreateMessageInput!) {
                editMessage(id: $id, input: $input) {
                    id
                    user_name
                    text
                    room_id
                    created_at
                    updated_at
                }
            }
        `
  const variables = {
    id: messageId,
    input: input
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      console.error(
        'GraphQL errors:',
        result.errors.map((error: any) => error.message)
      )
    } else if (result.data && result.data.editMessage) {
      return result.data.editMessage
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}
