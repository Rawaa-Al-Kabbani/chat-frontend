import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";


const UserMessage: FunctionComponent<{
    message: any;
    handleOnChangeMessage: (value: string) => void;
    fetchRoom: (id: number) => void;

}> = ({message, handleOnChangeMessage, fetchRoom}) => {
    const endpoint = "http://localhost:3001/graphql";
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editedMessage, setEditedMessage] = useState<string>(message.text || "");


    console.log('messssssssage', message);

    const onMessage = (value: string) => {
        handleOnEditMessage(value);
    }

    const handleOnEditMessage = async (text: string) => {
        const mutation = `
            mutation editMessage($id: Int!, $input: CreateMessageInput!) {
                editMessage(id: $id, input: $input) {
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
            id: message.id,
            input: {
                room_id: Number(id),
                text: text,
                user_name: message.user_name
            }
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
              } else if (result.data && result.data.editMessage) {
                fetchRoom(Number(id));
                console.log('data', result.data.editMessage);
           } else {
                console.error('Unexpected response:', result);
              }
        } catch (error) {
            console.error('Error fetching room:', error);
        }
    }

    const handleOnDeleteMessage = async(messageId: number) => {
        const mutation = `
            mutation deleteMessage($id: Int!) {
                deleteMessage(id: $id) {
                    id
                }
            }
        `;
        const variables = {
            id: messageId,
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
            } else if (result.data && result.data.deleteMessage) {
                console.log('data', result.data.deleteMessage);
                fetchRoom((Number(id)));
        } else {
                console.error('Unexpected response:', result);
            }
        } catch (error) {
            console.error('Error fetching room:', error);
        }
    }

    return (
        <>
            {message && (
                <Columns key={Number(message.id)}>
                    <Rows style={{flex: 1}}>
                        <Rows>
                            <div>{message?.user_name}</div>
                            {isOpen ? (
                                <div style={{width: "100%"}}>
                                <Input
                                    type="text"
                                    placeholder="Write a messsage"
                                    defaultValue={editedMessage}
                                    onChange={(e) => onMessage(e.target.value)}
                                />
                            </div>  
                            ):(
                                <Message>{message.text}</Message>                                )}
                        </Rows>

                    </Rows>
                    <Buttons>
                        <Button onClick={() => setIsOpen(true)}>Edit</Button>
                        <Button onClick={() => handleOnDeleteMessage(Number(message.id))}
                            style={{marginLeft: "6px"}}
                        >
                            Delete
                        </Button>
                    </Buttons>

                </Columns>
            )}
        </>
    )
}
export default UserMessage;


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

