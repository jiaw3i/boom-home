import {create} from "zustand";
import {CommonBotConfig} from "../datas/constants";

const useCommonBotConfigStore = create((set) => ({
    commonBotConfig: {
        temperature: 0.9,
        model: "gpt2",
        maxTokens: 4000,
        compressSize: 3000,
    },
    setCommonBotConfig: (commonBotConfig: CommonBotConfig) => set({commonBotConfig: commonBotConfig}),
}));


export default useCommonBotConfigStore;