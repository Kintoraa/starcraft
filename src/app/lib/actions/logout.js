import {useCallback, useEffect, useState} from "react";
import {useIsLogged} from "@/app/store/logged.zustand.js";


export default function useLogout() {
    const setLogged = useIsLogged((state) => state.setLogged)
    const logout = useCallback(async () => {
        try {
            const res = await fetch("/api/logout");
            if (!res.ok) throw new Error("session invalide");
            setLogged(false);
        } catch (error) {
            console.log("Erreur lors de logout", error);
        }
    }, [])

    return logout

}