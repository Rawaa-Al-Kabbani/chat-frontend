import { createContext, FunctionComponent, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../constants";

export const socket: Socket = io(SOCKET_URL);
export const WebsocketContext = createContext<Socket>(socket);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebsocketProvider: FunctionComponent<WebSocketProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    socket.connect();
    console.log("WebSocket connected");

    return () => {
      socket.disconnect();
      console.log("WebSocket is disconnected");
    };
  }, []);
  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  );
};
