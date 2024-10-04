import {
  CreateMessageInput,
  CreateMessageMutation,
  CreateRoomInput,
  CreateRoomMutation,
  DeleteMessageMutation,
  DeleteRoomMutation,
  FindRoomMutation,
  FindRoomsQuery,
} from "../graphql/graphql";
import { makeQuery } from "./api";
import { ApiError } from "./error";

export const createRoom = async (
  input: CreateRoomInput,
): Promise<CreateRoomMutation["createRoom"]> => {
  const mutation = /* GraphQL */ `
    mutation createRoom($input: CreateRoomInput!) {
      createRoom(input: $input) {
        id
        name
        created_by {
          id
          username
        }
      }
    }
  `;
  const { errors, data } = await makeQuery<CreateRoomMutation>(mutation, {
    input,
  });
  if (!data) {
    throw new ApiError("Failed to create room", errors);
  }
  return data.createRoom;
};

export const createMessage = async (
  input: CreateMessageInput,
): Promise<CreateMessageMutation["createMessage"]> => {
  const mutation = /* GraphQl */ `
    mutation createMessage($input: CreateMessageInput!) {
      createMessage(input: $input) {
        id
        text
        room_id
      }
    }
  `;
  const { errors, data } = await makeQuery<CreateMessageMutation>(mutation, {
    input,
  });
  if (!data) {
    throw new ApiError("Failed to create message", errors);
  }
  return data.createMessage;
};

export const deleteMessage = async (
  id: string,
): Promise<DeleteMessageMutation["deleteMessage"]> => {
  const mutation = /* GraphQL */ `
    mutation deleteMessage($id: String!) {
      deleteMessage(id: $id) {
        id
      }
    }
  `;
  const { errors, data } = await makeQuery<DeleteMessageMutation>(mutation, {
    id,
  });
  if (!data) {
    throw new ApiError(`Failed to delete message ${id}`, errors);
  }
  return data.deleteMessage;
};

export const deleteRoom = async (
  id: string,
): Promise<DeleteRoomMutation["deleteRoom"]> => {
  const mutation = /* GraphQL */ `
    mutation deleteRoom($id: String!) {
      deleteRoom(id: $id) {
        id
        name
      }
    }
  `;
  const { errors, data } = await makeQuery<DeleteRoomMutation>(mutation, {
    id,
  });
  if (!data) {
    throw new ApiError(`Failed to delete room ${id}`, errors);
  }
  return data.deleteRoom;
};

export const findRooms = async (): Promise<FindRoomsQuery["rooms"]> => {
  const query = /* GraphQL */ `
    query findRooms {
      rooms {
        id
        name
        created_by {
          id
          username
        }
        messages {
          id
          text
          user {
            username
          }
        }
      }
    }
  `;
  const { errors, data } = await makeQuery<FindRoomsQuery>(query);
  if (!data) {
    throw new ApiError("Failed to find rooms", errors);
  }
  return data.rooms;
};

export const findRoom = async (
  id: string,
): Promise<FindRoomMutation["room"]> => {
  const mutation = /* GraphQL */ `
    mutation findRoom($id: String!) {
      room(id: $id) {
        id
        name
        created_by {
          id
          username
        }
        messages {
          id
          text
          user {
            id
            username
          }
          created_at
          updated_at
        }
      }
    }
  `;
  const { errors, data } = await makeQuery<FindRoomMutation>(mutation, {
    id,
  });
  if (!data) {
    throw new ApiError(`Failed to find room ${id}`, errors);
  }
  return data.room;
};
