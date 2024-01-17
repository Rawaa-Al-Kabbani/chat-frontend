import { useEffect, useState } from 'react'
import Rooms from '../components/Rooms'

const HomePage = () => {
  const endpoint = 'http://localhost:3001/graphql'
  const [rooms, setRooms] = useState<any[]>([])

  const fetchRooms = async () => {
    const query = `
            query {
                rooms {
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
            `
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }
    try {
      const response = await fetch(endpoint, requestOptions)
      const json = await response.json()
      setRooms(json.data.rooms)
    } catch (error) {
      console.error('Error fetching rooms:', error)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  if (rooms.length === 0) {
    return <div>No items</div>
  }

  return <Rooms rooms={rooms as any[]} fetchRooms={fetchRooms} />
}

export default HomePage
