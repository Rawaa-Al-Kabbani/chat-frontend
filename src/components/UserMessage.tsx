import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { onDeleteMessage, onEditMessage } from '../api/room'
import { WebsocketContext } from '../contexts/WebsocketContext'

const UserMessage: FunctionComponent<{
  message: any
  getRoom: (id: string) => void
}> = ({ message, getRoom }) => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const socket = useContext(WebsocketContext)

  const handleOnEditMessage = async (text: string) => {
    const input = {
      room_id: id,
      text: text
    }
    const result = await onEditMessage(message.id, input)
    if (result && result === 401) {
      window.location.href = 'http://localhost:5001/sign_in'
    } else {
      return result
    }
  }

  const handleOnDeleteMessage = async (messageId: string) => {
    await onDeleteMessage(messageId)
    const deletedMessage = await onDeleteMessage(messageId)
    if (deletedMessage && deletedMessage === 401) {
      window.location.href = 'http://localhost:5001/sign_in'
    } else {
      return deletedMessage
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected')
    })
    socket.on('onMessage', (data: any) => {
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

  return (
    <>
      {message && (
        <Columns key={Number(message.id)}>
          <Name>{message?.user?.user_name}</Name>
          {isOpen ? (
            <div style={{ width: '100%' }}>
              <Input
                type='text'
                placeholder='Write a messsage'
                defaultValue={message.text}
                onBlur={(e) => handleOnEditMessage(e.target.value)}
              />
            </div>
          ) : (
            <Message>{message.text}</Message>
          )}
          <Button onClick={() => setIsOpen(true)}>Edit</Button>
          <Button onClick={() => handleOnDeleteMessage(message.id)} style={{ marginLeft: '6px' }}>
            Delete
          </Button>
        </Columns>
      )}
    </>
  )
}
export default UserMessage

const Columns = styled.div`
  display: grid;
  grid-template-columns: 20% 50% 15% 15%;
  margin-bottom: 50px;
`

const Message = styled.div`
  padding: 10px;
  border-radius: 5px;
  text-align: left;
`

const Input = styled.input`
  width: 100%;
`

const Button = styled.button`
  background-color: #1e2945;
  color: white;
  padding: 10px;
  border-radius: 5px;
`

const Name = styled.div`
  background-color: #128c7e;
  color: white;
  padding: 10px;
  border-radius: 5px;
`
