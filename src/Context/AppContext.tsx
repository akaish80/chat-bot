/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useState } from "react";

interface Message {
id: string;
message: string;
isSender: boolean;
}

interface ChatObject {
id: string;
name: string;
messages: Message[];
}

interface ChatContextType {
handleCreateChat: (obj: any, refetch: boolean) => void;
chats: any[];
refetchChatData: boolean;
setRefetchChatData: (val: boolean) => void;
}

export const AppContext = React.createContext<ChatContextType | null>(null);

const AppContextProvider: React.FC<{
children: React.ReactNode;
data: any;
}> = ({ children, data }) => {
const { chats } = data;
const [updatedChats, setUpdatedChats] = useState<ChatObject[]>(chats);
const [refetchChatData, setRefetchChatData] = useState<boolean>(false);

const handleCreateChat = (obj: any, refetch: boolean = false) => {
setUpdatedChats(obj);
if (refetch) {
setRefetchChatData(refetch);
}
};

return (
<AppContext.Provider
value={{
chats: updatedChats,
handleCreateChat,
refetchChatData,
setRefetchChatData,
}}
>
{children}
</AppContext.Provider>
);
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default AppContextProvider;