import { ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateRoom from "./components/CreateRoom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import SignInUser from "./components/SignInUser ";
import SignUpUser from "./components/SignUpUser";
import { WebsocketProvider } from "./contexts/WebSocketContext";
import { theme } from "./theme";

const LazyRoomsComponent = lazy(() => import("./components/Rooms"));
const LazyRoomDetailsComponent = lazy(() => import("./components/RoomDetails"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/sign-up" element={<SignUpUser />} />
            <Route path="/sign-in" element={<SignInUser />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <LazyRoomsComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/room/:id"
              element={
                <PrivateRoute>
                  <WebsocketProvider>
                    <LazyRoomDetailsComponent />
                  </WebsocketProvider>
                </PrivateRoute>
              }
            />
            <Route
              path="/create-room"
              element={
                <PrivateRoute>
                  <CreateRoom />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
