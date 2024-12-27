import { useState, useEffect } from "react";

const useOffline = (key, initialValue) => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialValue;
    });

    useEffect(() => {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }, [data, key]);

    return [data, setData];
};

export default useOffline;
