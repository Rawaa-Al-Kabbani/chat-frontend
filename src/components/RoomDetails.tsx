import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Button,
  Container,
  Divider,
  Grid2,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createMessage,
  deleteMessage,
  deleteRoom,
  findRoom,
} from "../api/room";
import { getUser } from "../authentication";
import { WebsocketContext } from "../contexts/WebSocketContext";
import { CreateMessageInput, FindRoomMutation, User } from "../graphql/graphql";
import { colors } from "../theme";
import { getErrorMessages, getSwedishFormattedTime } from "../utils";

const RoomDetails: FunctionComponent = () => {
  const { id: roomId } = useParams();
  const socket = useContext(WebsocketContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState<FindRoomMutation["room"] | undefined>(
    undefined,
  );
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const MessagesContainer = styled("div")(({ theme }) => ({
    maxHeight: "400px",
    overflowY: "auto",
    padding: theme.spacing(2),
  }));

  const MessageContainer = styled("div")(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  }));

  const fetchRoom = async () => {
    setErrorMessage("");
    try {
      setRoom(await findRoom(roomId as string));
    } catch (error: any) {
      setErrorMessage(getErrorMessages(error));
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [room?.messages]);

  useEffect(() => {
    const load = async () => {
      await fetchRoom();

      socket.on(roomId as string, (event: any) => {
        if (event.content) {
          fetchRoom();
        }
      });

      return () => {
        socket.off(roomId as string);
      };
    };

    load();
  }, [roomId]);

  const isRoomOwner = () => {
    const user = getUser();
    if (user) {
      return user.id === room?.created_by.id;
    }
    return false;
  };

  const isMessageOwner = (messageUser: User) => {
    const user = getUser();
    if (user) {
      return user.id === messageUser.id;
    }
    return false;
  };

  const onChangeMessage = (value: string) => {
    setMessage(value.trim());
  };

  const createNewMessage = async () => {
    setErrorMessage("");
    const input: CreateMessageInput = {
      text: message,
      room_id: roomId as string,
    };
    try {
      await createMessage(input);
      setMessage("");
    } catch (error: any) {
      setErrorMessage(getErrorMessages(error));
    }
  };

  const onDeleteMessage = async (id: string) => {
    setErrorMessage("");
    try {
      await deleteMessage(id);
    } catch (error: any) {
      setErrorMessage(getErrorMessages(error));
    }
  };

  const onDeleteRoom = async () => {
    try {
      await deleteRoom(roomId as string);
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessages(error));
    }
  };

  return (
    <Container maxWidth={false} sx={{ width: { xs: "100%", md: "600px" } }}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {room && (
        <Paper elevation={1} sx={{ padding: 6 }}>
          <Grid2 size={12}>
            <Grid2 size={12}>
              <Typography variant="h4">{room?.name}</Typography>
            </Grid2>
            {isRoomOwner() && (
              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 2,
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: colors.red,
                  }}
                  disabled={false}
                  onClick={onDeleteRoom}
                >
                  Delete Room
                </Button>
              </Grid2>
            )}
          </Grid2>

          {room.messages.length > 0 && (
            <MessagesContainer ref={messagesEndRef}>
              {room.messages.map((message) => (
                <MessageContainer>
                  {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}
                  {isMessageOwner(message.user) ? (
                    <Grid2
                      size={12}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Grid2>
                        <DeleteIcon
                          onClick={() => onDeleteMessage(message.id)}
                          sx={{ cursor: "pointer" }}
                        />
                      </Grid2>
                      <Grid2
                        sx={{
                          flex: 1,
                          alignSelf: "flex-end",
                          textAlign: "right",
                        }}
                      >
                        <Typography>{message.text}</Typography>
                      </Grid2>
                    </Grid2>
                  ) : (
                    <Typography align={"left"}>{message.text}</Typography>
                  )}

                  <Divider
                    textAlign={isMessageOwner(message.user) ? "right" : "left"}
                  >
                    {message.user?.username} -{" "}
                    {getSwedishFormattedTime(message?.created_at)}
                  </Divider>
                </MessageContainer>
              ))}
            </MessagesContainer>
          )}

          <Grid2
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 2,
            }}
          >
            <Grid2 sx={{ flex: 1 }}>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                value={message}
                onChange={(event) => onChangeMessage(event.target.value)}
                fullWidth
              />
            </Grid2>
            <Button
              onClick={createNewMessage}
              disabled={!message}
              style={{
                backgroundColor: "transparent",
              }}
            >
              <SendIcon htmlColor={message ? colors.green : "black"} />
            </Button>
          </Grid2>
        </Paper>
      )}
    </Container>
  );
};

export default RoomDetails;
