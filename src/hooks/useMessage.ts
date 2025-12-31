/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { fetchMessage, postNewMessage } from "../utils";

const useMessage = (chatId: string | undefined) => {
    const [messageList, setMessageList] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const fetchTriggered = useRef<boolean>(false);

    const [userInputMsg, setUserInputMsg] = useState("");

    const { handleCreateChat, refetchChatData, setRefetchChatData } =
        useAppContext() || {
            handleCreateChat: () => { },
            refetchChatData: false,
            setRefetchChatData: () => { },
        };

    /* Fetch Message */
    useEffect(() => {
        if (!fetchTriggered.current) {
            if (chatId) {
                fetchTriggered.current = true;
                fetchMessage(
                    chatId,
                    setLoading,
                    setMessageList,
                    setError,
                    fetchTriggered
                );
            }
            if (refetchChatData) {
                setRefetchChatData(false);
            }
        }
    }, [chatId, refetchChatData, setRefetchChatData]);

    /* HandleCreactNewMessage Message */
    const handleSend = () => {
        const handleNewMessage = async (
            chatId: string | undefined,
            newMessage: any
        ) => {
            const resp = await postNewMessage(chatId, newMessage);
            handleCreateChat(resp.data.chats, true);
        };

        const messageObj = {
            id: crypto.randomUUID(),
            message: userInputMsg,
            isSender: true,
        };

        handleNewMessage(chatId, messageObj);
        setUserInputMsg("");
    };

    return {
        messageList,
        loading,
        error,
        handleCreateChat,
        userInputMsg,
        setUserInputMsg,
        handleSend,
    };
};

export default useMessage;

