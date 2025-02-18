import {create} from "zustand";

export const useIsLogged = create((set) => ({
    isLogged: false,
    setLogged: (isLogged) => set(() => ({isLogged: isLogged})),
}));

export const useReload = create((set) => ({
    reload: false,
    SetReload: (reload) => set({reload: reload}),
}))