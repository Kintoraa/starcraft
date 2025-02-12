"use client";
import { useState, useEffect } from "react";

export default function useSession() {
    const [isAuth, setIsAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching session...");

        const fetchSession = async () => {
            try {
                const res = await fetch("/api/session");
                if (!res.ok) return setIsAuth(null);

                const data = await res.json();
                console.log(data);
                setIsAuth(data.isAuth);
                setUserId(data.userId ? data.userId : null);
            } catch (error) {
                console.error("Erreur lors de la récupération de la session:", error);
                setIsAuth(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return { isAuth, loading, userId };
}

