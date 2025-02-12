import {useEffect, useState} from "react";
// import {useIsLogged} from "@/app/store/logged.zustand.js";

export default function useLogout() {
    // const {isLogged, setLogged} = useIsLogged();

    useEffect(() => {

        const logoutSession = async () => {
            try {
                const res = await fetch("/api/logout");
                if (!res.ok) throw new Error("session invalide");

            } catch (error) {
                console.log("Erreur lors de logout", error);
            }
        }
        logoutSession();
    }, [])

    // return({isLogged})
}