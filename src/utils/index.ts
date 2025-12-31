/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3947';

export const fetchMessage = (
    chatId: string,
    setLoading: (val: boolean) => void,
    setMessageList: (data: any) => void,
    setError: (err: string) => void,
    fetchTriggered: any
) => {
    fetch(`${API_BASE_URL}/chat/${chatId}`, {
        method: "GET",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
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
            setError(e.message || String(e));
            fetchTriggered.current = false;
        });
};

export const postNewChat = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/newChat`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const val = await response.json();
        const result: { data: any; error: any } = { data: null, error: null };
        if (!val?.error) {
            result.data = val;
        } else {
            result.error = val.error;
        }

        return result;
    } catch (error: any) {
        return { data: null, error: error.message || String(error) };
    }
};

export const postNewMessage = async (chatId: string | undefined, obj: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/newMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId: chatId, message: obj }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const val = await response.json();
        const result: { data: any; error: any } = { data: null, error: null };
        if (!val?.error) {
            result.data = val;
        } else {
            result.error = val.error;
        }

        return result;
    } catch (error: any) {
        return { data: null, error: error.message || String(error) };
    }
};

export async function addNewChat(
    handleCreateChat: (data: any, refetch: boolean) => void | Promise<void>,
    navigate: (url: string) => void | Promise<void>
) {
    const resp = await postNewChat();
    const chats = resp?.data?.chats;

    // Ensure any asynchronous work in handleCreateChat completes before navigating
    await Promise.resolve(handleCreateChat(chats, false));

    // Only navigate if we have at least one chat and a navigate function
    if (navigate && Array.isArray(chats) && chats.length > 0) {
        const lastChat = chats[chats.length - 1];
        // Support both synchronous and asynchronous navigate implementations
        await Promise.resolve(navigate(`/chats/${lastChat.id}`));
    }
}

