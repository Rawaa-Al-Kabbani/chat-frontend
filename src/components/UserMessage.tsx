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
      text: text,
      user_name: message.user_name
    }
    const result = await onEditMessage(message.id, input)
    if (result) {
      setIsOpen(false)
    }
  }

  const handleOnDeleteMessage = async (messageId: string) => {
    await onDeleteMessage(messageId)
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
          <Rows style={{ flex: 1 }}>
            <Rows>
              <div>{message?.user_name}</div>
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
            </Rows>
          </Rows>
          <Buttons>
            <Button onClick={() => setIsOpen(true)}>Edit</Button>
            <Button onClick={() => handleOnDeleteMessage(message.id)} style={{ marginLeft: '6px' }}>
              Delete
            </Button>
          </Buttons>
        </Columns>
      )}
    </>
  )
}
export default UserMessage

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

const Message = styled.div`
  background-color: #128c7e;
  color: white;
  padding: 10px;
  border-radius: 5px;
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
