import { Grid2, styled, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Room } from "../graphql/graphql";
import { colors } from "../theme";

const StyledRoomCard = styled(Grid2)(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0.5px 0.5px 1px 0.5px rgba(0, 0, 0, 0.2)",
  backgroundColor: colors.green,
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

const RoomCard: FunctionComponent<{ room: Room }> = ({ room }) => {
  const navigate = useNavigate();

  return (
    <StyledRoomCard
      size={{ xs: 12, md: 6, lg: 4 }}
      height={{ xs: "auto", md: "150px" }}
    >
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, textAlign: "center" }}
        onClick={() => navigate(`/room/${room.id}`)}
      >
        {room.name}
      </Typography>
    </StyledRoomCard>
  );
};

export default RoomCard;
