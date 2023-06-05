import {create} from "zustand";


interface IUserInfo {
    username: string,
    setUsername: (username: string) => void,

    id: number,
    setId: (id: number) => void,
}

const UseUserStore = create<IUserInfo>((set) => ({
    username: "",
    setUsername: (username: string) => set({username: username}),
    id: -1,
    setId: (id: number) => set({id: id}),
}));


export {UseUserStore};