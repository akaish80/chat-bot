import { Avatar, Box, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const BotMessage = (props: { message: string }) => {
  const { message } = props;

  return (
    <Box
sx={{
flex: 0.5,
overflowY: "auto",
display: "flex",
flexDirection: "column",
gap: 1,
}}
>
<Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
<Avatar>
<PersonIcon />
</Avatar>
<Paper sx={{ p: 1.5 }}>
<Typography>{message}</Typography>
</Paper>
</Box>
</Box>
);
};

export default BotMessage;