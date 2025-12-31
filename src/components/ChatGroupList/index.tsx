/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ChatGroupList = (props: {
  chats: any;
  selectedIndex: number;
}) => {
  const { chats, selectedIndex } = props;


  const navigate = useNavigate();

  const handleClick = useCallback(
    (chatId: string) => {
      navigate(`/chats/${chatId}`);
    },
    [navigate]
  );

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: 300,
        overflowY: "auto",
      }}
    >
      <List>
        {chats?.map((item: { id: string; name: string }, index: number) => (
          <ListItemButton
            sx={{
              "&.Mui-selected": {
                backgroundColor: "grey",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkgrey",
                },
              },
            }}
            selected={selectedIndex === index}
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <ListItemText primary={`${item.name}`} />
          </ListItemButton>
))}
</List>
</Box>
);
};

export default ChatGroupList;