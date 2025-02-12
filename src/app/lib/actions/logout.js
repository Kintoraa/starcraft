import {useEffect, useState} from "react";

export default function useLogout() {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        console.log("Logout");

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

    return({isAuth})
}