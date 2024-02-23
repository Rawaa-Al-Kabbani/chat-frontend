import { endpoint } from '../constants'
import { RoomModel, UserModel } from '../types'

const redirectWhenUnauthorizedUser = (errors: any) => {
  const status = errors[0].extensions.originalError.statusCode
  if (status === 401) {
    window.localStorage.removeItem('token')
    return status
  }
}
export const fetchRooms: () => Promise<RoomModel[]> = async () => {
  const query = `
            query {
                rooms {
                    id
                    name
                    messages {
                        id
                        user_id
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
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

export const fetchUsers: () => Promise<UserModel[]> = async () => {
  const query = `
            query {
                users {
                    id
                    user_name
                }
            }
            `
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ query })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const json = await response.json()
    return json.data.users
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

export const fetchRoom = async (roomId: string) => {
  const mutation = `
    mutation findRoom($roomId: String!) {
      room(id: $roomId) {
          id
          name
          messages {
            id
            user_id
            text
            room_id
            created_at
            updated_at
            user {
              user_name
            }
          }
      }
    }
  `
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
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

export const onCreateRoom: (roomName: string) => Promise<RoomModel | number> = async (roomName: string) => {
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ query: mutation, variables })
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()

    if (result.errors) {
      return redirectWhenUnauthorizedUser(result.errors)
    } else if (result.data && result.data.createRoom) {
      return result.data.createRoom
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error adding room:', error)
  }
}

export const onRemoveRoom: (roomId: string) => Promise<RoomModel | number> = async (roomId: string) => {
  const mutation = `
        mutation removeRoom($id: String!) {
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      return redirectWhenUnauthorizedUser(result.errors)
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
                    user_id
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      return redirectWhenUnauthorizedUser(result.errors)
    } else if (result.data && result.data.createMessage) {
      return result.data.createMessage
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}

export const onDeleteMessage = async (messageId: string) => {
  const mutation = `
            mutation deleteMessage($id: String!) {
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      return redirectWhenUnauthorizedUser(result.errors)
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
            mutation editMessage($id: String!, $input: CreateMessageInput!) {
                editMessage(id: $id, input: $input) {
                    id
                    user_id
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
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ query: mutation, variables })
  }
  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()
    if (result.errors) {
      return redirectWhenUnauthorizedUser(result.errors)
    } else if (result.data && result.data.editMessage) {
      return result.data.editMessage
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching room:', error)
  }
}

export const onCreateUser = async (input: any) => {
  const mutation = `
            mutation createUser($createUserInput: CreateUserInput!) {
                createUser(createUserInput: $createUserInput) {
                    id
                    user_name
                    password
                }
            }
        `
  const variables = {
    createUserInput: input
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
    } else if (result.data && result.data.createUser) {
      return result.data.createUser
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const onCheckUserName = async (userName: string) => {
  const mutation = `
            mutation findUserByName($userName: String!) {
              findUserByName(userName: $userName){
                id
                user_name
              }
            }
        `
  const variables = {
    userName: userName
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
      return result.errors.map((error: any) => error.message)[0]
    } else if (result.data.findUserByName) {
      return result.data.findUserByName
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export const loginUser = async (userName: string, password: string): Promise<string | undefined> => {
  const mutation = `
            mutation signIn($userName: String!, $password: String!) {
                signIn(userName: $userName, password: $password) {
                  access_token
                }
            }
        `
  const variables = {
    userName: userName,
    password: password
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
      return result.errors.map((error: any) => error.message)[0]
    } else if (result.data.signIn) {
      const { access_token } = result.data.signIn
      localStorage.setItem('token', access_token)
      window.location.href = '/'
    } else {
      console.error('Unexpected response:', result)
    }
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}
