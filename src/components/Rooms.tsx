import { FunctionComponent, useEffect, useState } from 'react'
import { X } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { fetchRooms, onCreateRoom, onRemoveRoom } from '../api/room'
import { RoomModel } from '../types'

const Rooms: FunctionComponent = () => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<RoomModel[]>([])
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false)
  const [roomName, setRoomName] = useState<string | undefined>(undefined)

  const handleOnClickRoom = (roomId: string) => {
    navigate(`/room/${roomId}`)
  }

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRoomName(value)
  }

  const handleOnCreateRoom = () => {
    const createRoom = async () => {
      const newRoom = await onCreateRoom(roomName || '')
      if (newRoom) {
        getRooms()
        setIsCreatingRoom(false)
        setRoomName('')
      }
    }
    createRoom()
  }

  const handleOnRemoveRoom = (roomId: number) => {
    const removeRoom = async () => {
      const deletedRoom = await onRemoveRoom(roomId)
      if (deletedRoom) {
        getRooms()
      }
    }
    removeRoom()
  }

  const getRooms = async () => {
    const allRooms = await fetchRooms()
    if (allRooms) {
      setRooms(allRooms)
    }
  }

  useEffect(() => {
    getRooms()
  }, [])

  if (rooms.length === 0) {
    return <div>No items</div>
  }

  return (
    <Container>
      <SubContainer>
        <div style={{ margin: '50px' }}>Chat rooms</div>
        <RoomList key={rooms.map((room) => room.id).join(',')}>
          {rooms.length > 0 &&
            rooms.map((room: any) => {
              return (
                <RoomContainer key={room.id}>
                  <RoomItem onClick={() => handleOnClickRoom(room.id)}>{room.name}</RoomItem>
                  <RemoveContainer onClick={() => handleOnRemoveRoom(room.id)}>
                    <X color={'white'} width={'30px'} height={'30px'} />
                  </RemoveContainer>
                </RoomContainer>
              )
            })}
          {isCreatingRoom ? (
            <RoomItem>
              <Input
                type='text'
                placeholder='Enter room name'
                value={roomName}
                onChange={(e) => handleOnChangeName(e)}
                onBlur={() => handleOnCreateRoom()}
              />
            </RoomItem>
          ) : (
            <RoomItem onClick={() => setIsCreatingRoom(true)}>Create new room</RoomItem>
          )}
        </RoomList>
      </SubContainer>
    </Container>
  )
}
export default Rooms

const Container = styled.div`
  text-align: center;
  width: 900px;
  margin: auto;
`

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const RoomList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const RoomItem = styled.div`
  cursor: pointer;
  background-color: #1e2945;
  color: white;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Input = styled.input``

const RoomContainer = styled.div`
  position: relative;
`

const RemoveContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
`
