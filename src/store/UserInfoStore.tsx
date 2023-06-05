import {create} from "zustand";
import {UserInfo} from "../datas/constants";

const UserInfoStore = create((set) => ({
    userInfo: {
        id: "",
        username: "",
    },
    setUserInfo: (userInfo: UserInfo) => set({userInfo: userInfo})
}));

export {UserInfoStore};