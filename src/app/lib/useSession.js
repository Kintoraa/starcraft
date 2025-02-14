"use client";
import { useState, useEffect } from "react";
import {useIsLogged} from "@/app/store/logged.zustand.js";

export default function useSession() {
    const [isAuth, setIsAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const setLogged = useIsLogged((state) => state.setLogged)

    useEffect(() => {
        console.log("Fetching session...");

        const fetchSession = async () => {
            try {
                const res = await fetch("/api/session");
                if (!res.ok) throw new Error("Session invalide");

                const data = await res.json();
                console.log("Session data:", data);
                setIsAuth(data.isAuth);
                setLogged(true)
            } catch (error) {
                console.error("Erreur lors de la récupération de la session:", error);
                setIsAuth(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return { isAuth, loading };
}