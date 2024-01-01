import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


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
            console.log('room', json.data.room);
            setRoom(json.data.room);
        } catch (error) {
            console.error('Error fetching room:', error);
        }
    }
    useEffect(() => {
        console.log('room id', id);
        fetchRoom(Number(id));
    }, [id])
    
    return (
        <div>Room</div>
    )
}
export default Room;