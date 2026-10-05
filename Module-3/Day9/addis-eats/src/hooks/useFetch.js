import { useState, useEffect } from "react";

export function useFetch(url) {
    const [state, setState] = useState({
        url,
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();

        fetch(url, { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error("Could not load the menu");
                return res.json();
            })
            .then(data => {
                setState({ url, data, loading: false, error: null });
            })
            .catch(err => {
                if (err.name !== "AbortError") {
                    setState({ url, data: null, loading: false, error: err.message });
                }
            });

        return () => controller.abort();
    }, [url]);

    if (state.url !== url) {
        return { data: null, loading: true, error: null };
    }

    return state;
}