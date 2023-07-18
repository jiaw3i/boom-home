import {create} from "zustand";


const UseVerifyStore = create<{
    state: boolean;
    setState: (state: boolean) => void;
    verifyToken: string;
    setVerifyToken: (token: string) => void;
}>((set) => ({
    state: false,
    setState: (state: boolean) => set({state: state}),
    verifyToken: "",
    setVerifyToken: (token: string) => set({verifyToken: token})
}));


export {UseVerifyStore};