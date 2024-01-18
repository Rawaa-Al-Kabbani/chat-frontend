import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { fetchRoom, onDeleteMessage, onEditMessage } from '../api/room'
import { MessageModel } from '../types'

const UserMessage: FunctionComponent<{
  message: any
  getRoom: (id: number) => void
}> = ({ message, getRoom }) => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editedMessage, setEditedMessage] = useState<string>('')

  const handleOnEditMessage = async (text: string) => {
    const input = {
      room_id: Number(id),
      text: text,
      user_name: message.user_name
    }
    const result = await onEditMessage(message.id, input)
    if (result) {
      const newRoom = await fetchRoom(Number(id))
      if (newRoom) {
        const newMessage = newRoom.messages.find((item: MessageModel) => message.id === item.id)?.text
        if (newMessage) {
          setEditedMessage(newMessage)
        }
      }
    }
  }

  useEffect(() => {
    if (message.text !== editedMessage) {
      setEditedMessage(message.text)
    }
  }, [message])

  const handleOnDeleteMessage = async (messageId: number) => {
    const deletedMessage = await onDeleteMessage(messageId)
    if (deletedMessage) {
      getRoom(Number(id))
    }
  }

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
                    defaultValue={editedMessage}
                    onChange={(e) => handleOnEditMessage(e.target.value)}
                  />
                </div>
              ) : (
                <Message>{message.text}</Message>
              )}
            </Rows>
          </Rows>
          <Buttons>
            <Button onClick={() => setIsOpen(true)}>Edit</Button>
            <Button onClick={() => handleOnDeleteMessage(Number(message.id))} style={{ marginLeft: '6px' }}>
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
