/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchMessage = (
    chatId: string,
    setLoading: (val: boolean) => void,
    setMessageList: (data: any) => void,
    setError: (err: string) => void,
    fetchTriggered: any
) => {
    fetch(`http://localhost:3947/chat/${chatId}`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            setLoading(false);
            if (!res) {
                setError("No data found");
            }
            fetchTriggered.current = false;
            setMessageList(res);
        })
        .catch((e: any) => {
            setLoading(false);
            setError(e);
            fetchTriggered.current = false;
        });
};

export const postNewChat = async () => {
    const rep = fetch(`http://localhost:3947/chat/newChat`, {
        method: "POST",
    });

    const val = await (await rep).json();
    const result: { data: any; error: any } = { data: null, error: null };
    if (!val?.error) {
        result.data = val;
    } else {
        result.error = val.error;
    }

    return result;
};

export const postNewMessage = async (chatId: string | undefined, obj: any) => {
    const rep = fetch(`http://localhost:3947/chat/newMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: chatId, message: obj }),
    });

    const val = await (await rep).json();
    const result: { data: any; error: any } = { data: null, error: null };
    if (!val?.error) {
        result.data = val;
    } else {
        result.error = val.error;
    }

    return result;
};

export async function addNewChat(
    handleCreateChat: (data: any, refetch: boolean) => void,
    navigate: (url: string) => void
) {
    const resp = await postNewChat();
    const chats = resp?.data?.chats;
    handleCreateChat(chats, false);
    if (navigate) {
        navigate(`/chats/${chats[chats.length - 1].id}`);
    }
}

