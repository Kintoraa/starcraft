import {create} from "zustand";

export const useIsLogged = create((set) => ({
    isLogged: false,
    setLogged: (isLogged) => set(() => ({isLogged: isLogged})),
}));