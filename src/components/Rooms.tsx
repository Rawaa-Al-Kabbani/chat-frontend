import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";


const Rooms: FunctionComponent<{ rooms: any[] }> = ({ rooms }) => {
  const navigate = useNavigate();
  const handleOnClickRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  }
  return (
    <Container>
      <SubContainer>
        <div style={{ margin: "50px" }}>Chat rooms</div>
        {rooms.length > 0 && (
          <RoomList>
            {rooms.map((room: any) => {
              return (
                <RoomItem key={room.id} onClick={() => handleOnClickRoom(room.id)}>{room.name}</RoomItem>
              )
            })}
          </RoomList>
        )}
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
