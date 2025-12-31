
import { Box, TextField } from "@mui/material";
import ButtonComp from "../ButtonComp";

const MessageInputComp = (props: {
  message: string;
  setMessage: (e: string) => void;
  handlClick: () => void;
}) => {
  const { message, setMessage, handlClick } = props;
  return (
    <Box
      sx={{
        p: 2,
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        gap: 1,
        marginTop: "auto",
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <ButtonComp label="Send" variant="contained" handlClick={handlClick} />
    </Box>
  );
};


export default MessageInputComp