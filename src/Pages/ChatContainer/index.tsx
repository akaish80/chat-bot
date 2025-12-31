import SnackbarContent from "@mui/material/SnackbarContent";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { useMemo } from "react";
// import { useAppContext } from "../../../Context/AppContext";
// import AddNewChat from "../../atoms/AddNewChat";
// import { ChatMessageContainer, LeftPanelContainer } from "../../molecules";
import { useAppContext } from "../../Context/AppContext";
import AddNewChat from "../../components/AddNewChat";
import ChatMessageContainer from "../../components/ChatMessageContainer";
import LeftPanelContainer from "../../components/LeftPanelContainer";

const ChatContainer = () => {
    const { id = "1" } = useParams();

    const { chats } = useAppContext() || {
        chats: [],
    };

    const selectedIndex = useMemo(
        () =>
            chats?.findIndex((item: { id: string }) => {
                return item.id === id;
            }),
        [chats, id]
    );

    const action = (
        <AddNewChat size="small" />
    );

    return (
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
            {selectedIndex === -1 && id !== undefined && (
                <SnackbarContent
                    message="Chat group not available"
                    action={action}
                    sx={{ backgroundColor: "white", color: "black" }}
                />
            )}
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    height: 500,
                    margin: "40px auto",
                    display: "flex",
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <LeftPanelContainer selectedIndex={selectedIndex} />
                <ChatMessageContainer chatId={id} />
            </Paper>
        </Stack>
    );
};

export default ChatContainer;