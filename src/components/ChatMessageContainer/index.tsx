import { Box } from "@mui/material";
import Spinner from "../Spinner";
import ChatMessage from "../ChatMessage";
import MessageInputComp from "../MessageInputComp";
import TitleComp from "../TitleComp";
// import Spinner from "../Spinner";
// import useMessage from "../hooks/useMessage";
import useMessage from "../../hooks/useMessage";

const ChatMessageContainer = (props: { chatId: string | undefined }) => {
    const { chatId } = props;


    const { userInputMsg, setUserInputMsg, handleSend, loading, messageList } =
        useMessage(chatId);


    if (loading) return <Spinner />;

    const { messages } = messageList || {};

    return (
        <Box
            sx={{
                width: 500,
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TitleComp title="Chatbot" />
                <ChatMessage messages={messages} />
                <MessageInputComp
                    message={userInputMsg}
                    setMessage={setUserInputMsg}
                    handleClick={handleSend}
                />
            </Box>
        </Box>
    );
};

export default ChatMessageContainer;