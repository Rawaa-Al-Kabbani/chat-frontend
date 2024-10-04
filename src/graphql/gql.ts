/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n    mutation createRoom($input: CreateRoomInput!) {\n      createRoom(input: $input) {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n      }\n    }\n  ":
    types.CreateRoomDocument,
  "\n    mutation createMessage($input: CreateMessageInput!) {\n      createMessage(input: $input) {\n        id\n        text\n        room_id\n      }\n    }\n  ":
    types.CreateMessageDocument,
  "\n    mutation deleteMessage($id: String!) {\n      deleteMessage(id: $id) {\n        id\n      }\n    }\n  ":
    types.DeleteMessageDocument,
  "\n    mutation deleteRoom($id: String!) {\n      deleteRoom(id: $id) {\n        id\n        name\n      }\n    }\n  ":
    types.DeleteRoomDocument,
  "\n    query findRooms {\n      rooms {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n        messages {\n          id\n          text\n          user {\n            username\n          }\n        }\n      }\n    }\n  ":
    types.FindRoomsDocument,
  "\n    mutation findRoom($id: String!) {\n      room(id: $id) {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n        messages {\n          id\n          text\n          user {\n            id\n            username\n          }\n          created_at\n          updated_at\n        }\n      }\n    }\n  ":
    types.FindRoomDocument,
  "\n        mutation createUser($input: CreateUserInput!) {\n            createUser(input: $input) {\n                access_token\n                user {\n                  id\n                  username\n                }\n            }\n        }\n    ":
    types.CreateUserDocument,
  "\n        mutation signIn ($input: SignInUserInput!) {\n            signIn(input: $input) {\n                access_token\n                user {\n                  id\n                  username\n                }\n            }\n        }\n    ":
    types.SignInDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation createRoom($input: CreateRoomInput!) {\n      createRoom(input: $input) {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n      }\n    }\n  ",
): (typeof documents)["\n    mutation createRoom($input: CreateRoomInput!) {\n      createRoom(input: $input) {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation createMessage($input: CreateMessageInput!) {\n      createMessage(input: $input) {\n        id\n        text\n        room_id\n      }\n    }\n  ",
): (typeof documents)["\n    mutation createMessage($input: CreateMessageInput!) {\n      createMessage(input: $input) {\n        id\n        text\n        room_id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation deleteMessage($id: String!) {\n      deleteMessage(id: $id) {\n        id\n      }\n    }\n  ",
): (typeof documents)["\n    mutation deleteMessage($id: String!) {\n      deleteMessage(id: $id) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation deleteRoom($id: String!) {\n      deleteRoom(id: $id) {\n        id\n        name\n      }\n    }\n  ",
): (typeof documents)["\n    mutation deleteRoom($id: String!) {\n      deleteRoom(id: $id) {\n        id\n        name\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query findRooms {\n      rooms {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n        messages {\n          id\n          text\n          user {\n            username\n          }\n        }\n      }\n    }\n  ",
): (typeof documents)["\n    query findRooms {\n      rooms {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n        messages {\n          id\n          text\n          user {\n            username\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation findRoom($id: String!) {\n      room(id: $id) {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n        messages {\n          id\n          text\n          user {\n            id\n            username\n          }\n          created_at\n          updated_at\n        }\n      }\n    }\n  ",
): (typeof documents)["\n    mutation findRoom($id: String!) {\n      room(id: $id) {\n        id\n        name\n        created_by {\n          id\n          username\n        }\n        messages {\n          id\n          text\n          user {\n            id\n            username\n          }\n          created_at\n          updated_at\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation createUser($input: CreateUserInput!) {\n            createUser(input: $input) {\n                access_token\n                user {\n                  id\n                  username\n                }\n            }\n        }\n    ",
): (typeof documents)["\n        mutation createUser($input: CreateUserInput!) {\n            createUser(input: $input) {\n                access_token\n                user {\n                  id\n                  username\n                }\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation signIn ($input: SignInUserInput!) {\n            signIn(input: $input) {\n                access_token\n                user {\n                  id\n                  username\n                }\n            }\n        }\n    ",
): (typeof documents)["\n        mutation signIn ($input: SignInUserInput!) {\n            signIn(input: $input) {\n                access_token\n                user {\n                  id\n                  username\n                }\n            }\n        }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
