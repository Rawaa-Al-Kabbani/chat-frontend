import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";


const Room: FunctionComponent = () => {
    const endpoint = "http://localhost:3001/graphql";
    const { id } = useParams();
    const [room, setRoom] = useState<any>(undefined);

    const fetchRoom = async (roomId: number) => {
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
            `;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: mutation, variables: { roomId } }),
        };
        try {
            const response = await fetch(endpoint, requestOptions);
            const json = await response.json();
            setRoom(json.data.room);
        } catch (error) {
            console.error('Error fetching room:', error);
        }
    }
    useEffect(() => {
        fetchRoom(Number(id));
    }, [id])

    if (!room) {
        return null;
    }

    return (
        <Container>
            <SubContainer>
                <div style={{ margin: "50px" }}>
                    <span>{room.name} </span>
                    <span>Room</span>
                </div>
                {room.messages.length > 0 && (
                    <Messages>
                        {room.messages.map((message: any) => (
                            <MessageBlock key={message.id}>
                                <div>{message.user_name}</div>
                                <Message>{message.text}</Message>
                            </MessageBlock>
                        ))}
                    </Messages>
                )}
            </SubContainer>
        </Container>
    )
}
export default Room;

const Container = styled.div`
  text-align: center;
  width: 500px;
  margin: auto;
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const MessageBlock = styled.div`
  height: auto;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Message = styled.div`
  background-color: #1e2945;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;