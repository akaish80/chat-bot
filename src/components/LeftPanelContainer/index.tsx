
// import { useAppContext } from "../../../Context/AppContext";

import { Box, Stack } from "@mui/material";
// import ChatGroupList from "../../atoms/ChatGroupList";
// import AddNewChat from "../../atoms/AddNewChat";
import { useAppContext } from "../../Context/AppContext";
import ChatGroupList from "../ChatGroupList";
import AddNewChat from "../AddNewChat";

const LeftPanel = (props: { selectedIndex: number }) => {
  const { selectedIndex } = props;
  const { chats } = useAppContext() || {
    chats: [],
    handleCreateChat: () => {},
  };

  return (
    <Box
      sx={{
        width: 200,
        borderRight: "1px solid #e0e0e0",
        bgcolor: "#fafafa",
      }}
    >
      <Stack spacing={2} sx={{ maxHeight: 500 }}>
        <ChatGroupList chats={chats} selectedIndex={selectedIndex} />

        <AddNewChat />
      </Stack>
    </Box>
  );
};

export default LeftPanel;