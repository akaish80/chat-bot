/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import UserResponse from "../UserResponse";
import BotMessage from "../BotMessage";

const ChatMessage = (props: { messages: any }) => {
  const { messages } = props;
  return (
    <Box
sx={{
height: 300,
overflowY: "auto",
p: 2,
border: "1px solid grey",
}}
>
{messages?.map(
(item: { isSender: boolean; id: string; message: string }) =>
item.isSender ? (
<UserResponse key={item.id} message={item.message} />
) : (
<BotMessage key={item.id} message={item.message} />
)
)}
</Box>
);
};

export default ChatMessage;