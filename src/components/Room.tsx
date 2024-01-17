import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import UserMessage from "./UserMessage";


const Room: FunctionComponent = () => {
    const endpoint = "http://localhost:3001/graphql";
    const { id } = useParams();
    const [room, setRoom] = useState<any>(undefined);
    const [userName, setUserName] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleOnChangeUserName = (value: string) => {
        setUserName(value);
    }

    const handleOnChangeMessage = (value: string, input?: any) => {
        if (input) {
        setMessage(value);
        handleOnChangeMessage({...input, text: value});
        }
        setMessage(value);
     
    }

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

    const handleOnCreateMessage = async () => {
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
        `;
        const variables = {
            input: {
              user_name: userName,
              text: message,
              room_id: Number(id),
            },
          };
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: mutation, variables }),
        };
        try {
            const response = await fetch(endpoint, requestOptions);
            const result = await response.json();
            if (result.errors) {
                console.error('GraphQL errors:', result.errors.map((error: any) => error.message));
              } else if (result.data && result.data.createMessage) {
                console.log('data', result.data.createMessage);
                fetchRoom(Number(id));
           } else {
                console.error('Unexpected response:', result);
              }
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
                {room.messages.length > 0 && room.messages.map((message: any) => (
                    <UserMessage 
                        message={message} 
                        handleOnChangeMessage={handleOnChangeMessage}
                        fetchRoom={fetchRoom}
                    />
                ))}
                   

                <Columns>   
                <Rows style={{flex: 1, justifyContent: "flex-end"}}>
                    <div style={{width: "100%", marginBottom: "15px"}}>
                        <Input
                            type="text"
                            placeholder="Enter user name"
                            defaultValue={userName}
                            onChange={(e) => handleOnChangeUserName(e.target.value)}
                        />
                    </div>

                    <div style={{width: "100%"}}>
                        <Input
                            type="text"
                            placeholder="Write a messsage"
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
`;

const Rows = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const Columns = styled.div`
    display: flex;
    margin-bottom: 50px;
`;

const Message = styled.div`
  background-color: #128C7E;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const Input = styled.input`
    width: 100%;
`;

const Buttons = styled(Rows)`
    flex-direction: row;
    margin-left: 30px;
    align-self: flex-end;
`;

const Button = styled.button`
  background-color: #1e2945;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

