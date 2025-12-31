/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";

function useFetchChats(url: string) {
    const fetchTriggered = useRef<boolean>(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!fetchTriggered.current) {
            setData(null);
            setError(null);
            fetchTriggered.current = true;
            fetch(url, {
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
                    setData(res);
                    fetchTriggered.current = false
                })
                .catch((e: any) => {
                    setLoading(false);
                    setError(e);
                    fetchTriggered.current = false
                });
        }
    }, [url]);

    return { data, loading, error };
}

export default useFetchChats;