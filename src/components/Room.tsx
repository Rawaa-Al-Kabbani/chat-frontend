import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { fetchRoom, onCreateMessage } from '../api/room'
import { WebsocketContext } from '../contexts/WebsocketContext'
import UserMessage from './UserMessage'

const Room: FunctionComponent = () => {
  const { id } = useParams()
  const [room, setRoom] = useState<any>('')
  const [userName, setUserName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const socket = useContext(WebsocketContext)

  const handleOnChangeUserName = (value: string) => {
    setUserName(value)
  }

  const handleOnChangeMessage = (value: string, input?: any) => {
    if (input) {
      setMessage(value)
      handleOnChangeMessage({ ...input, text: value })
    }
    setMessage(value)
  }

  const handleOnCreateMessage = async () => {
    const input = {
      user_name: userName,
      text: message,
      room_id: id
    }
    await onCreateMessage(input);
    setUserName('')
    setMessage('')
  }

  const getRoom = async (id: string) => {
    const oneRoom = await fetchRoom(id)
    if (oneRoom) {
      setRoom(oneRoom)
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected')
    });
    socket.on(id as string, (data: any) => {
      if (data.content) {
        console.log('OnMessage data is recieved')
        console.log('data', data)
        if (id) {
          getRoom(id)
        }
      }
    })

    return () => {
      console.log('Unregistering events....')
      socket.off('connect')
      socket.off('onMessage')
    }
  }, [])

  useEffect(() => {
    if (id) {
      getRoom(id)
    }
  }, [id])

  if (!room) {
    return null
  }

  return (
    <Container>
      <SubContainer>
        <div style={{ margin: '50px' }}>
          <span>{room.name} </span>
          <span>Room</span>
        </div>
        {room.messages.length > 0 &&
          room.messages.map((message: any) => <UserMessage key={message.id} message={message} getRoom={getRoom} />)}

        <Columns key={room.messages.map((item: any) => item.id).join(",")}>
          <Rows style={{ flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <Input
                type='text'
                placeholder='Enter user name'
                defaultValue={userName}
                onChange={(e) => handleOnChangeUserName(e.target.value)}
              />
            </div>

            <div style={{ width: '100%' }}>
              <Input
                type='text'
                placeholder='Write a messsage'
                defaultValue={message}
                onChange={(e) => handleOnChangeMessage(e.target.value)}
              />
            </div>
          </Rows>

          <Buttons>
            <Button onClick={() => handleOnCreateMessage()}>Send</Button>
          </Buttons>
        </Columns>
      </SubContainer>
    </Container>
  )
}
export default Room

const Container = styled.div`
  text-align: center;
  width: 500px;
  margin: auto;
`

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const Columns = styled.div`
  display: flex;
  margin-bottom: 50px;
`

const Input = styled.input`
  width: 100%;
`

const Buttons = styled(Rows)`
  flex-direction: row;
  margin-left: 30px;
  align-self: flex-end;
`

const Button = styled.button`
  background-color: #1e2945;
  color: white;
  padding: 10px;
  border-radius: 5px;
`
