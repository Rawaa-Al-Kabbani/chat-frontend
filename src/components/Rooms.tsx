import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";


const Rooms: FunctionComponent<{ rooms: any[]; fetchRooms: () => void }> = ({ rooms, fetchRooms }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string | undefined>(undefined);


  const handleOnClickRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  }

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoomName(value);
  }

  const endpoint = "http://localhost:3001/graphql";

  const handleOnSaveName = async () => {
    const mutation = `
      mutation createRoom($createRoomInput: CreateRoomInput!) {
        createRoom(createRoomInput: $createRoomInput) {
          id
          name
        }
      }
    `;
  
    const variables = {
      createRoomInput: {
        name: roomName,
      },
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation, variables }),
    };
  
    try {
      const response = await fetch(endpoint, requestOptions);
      const result = await response.json();
  
      if (result.errors) {
        console.error('GraphQL errors:', result.errors.map((error: any) => error.message));
      } else if (result.data && result.data.createRoom) {
        setIsOpen(false);
        fetchRooms();
      } else {
        console.error('Unexpected response:', result);
      }
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };
  


  return (
    <Container>
      <SubContainer>
        <div style={{ margin: "50px" }}>Chat rooms</div>
        <RoomList>
          {rooms.length > 0 && rooms.map((room: any) => {
            return (
              <RoomItem key={room.id} onClick={() => handleOnClickRoom(room.id)}>{room.name}</RoomItem>
            )
          })}
          {isOpen ? (
            <RoomItem>
              <Input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => handleOnChangeName(e)}
                onBlur={() => handleOnSaveName()}

              />
            </RoomItem>
          ) : (
            <RoomItem onClick={() => setIsOpen(true)}>Create new room</RoomItem>
          )}
        </RoomList>

      </SubContainer>
    </Container>
  )
}
export default Rooms;

const Container = styled.div`
  text-align: center;
  width: 900px;
  margin: auto;
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RoomList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const RoomItem = styled.div`
  cursor: pointer;
  background-color: #1e2945;
  color: white;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
`;
