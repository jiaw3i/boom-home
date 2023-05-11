import {create} from "zustand";
import {CommonBotConfig, ContextBotConfig} from "../datas/constants";

const useCommonBotConfigStore = create((set) => ({
    commonBotConfig: {
        temperature: 0.9,
        model: "gpt2",
        maxTokens: 4000,
        compressSize: 3000,
    },
    setCommonBotConfig: (commonBotConfig: CommonBotConfig) => set({commonBotConfig: commonBotConfig}),
}));


const useContextBotConfigStore = create((set) => ({
    contextBotConfig: {
        temperature: 0.9,
        model: "gpt2",
        maxTokens: 4000,
        compressSize: 3000,
        history: 10
    },
    setContextBotConfig: (contextBotConfig: ContextBotConfig) => set({contextBotConfig: contextBotConfig}),
}));


export {useCommonBotConfigStore, useContextBotConfigStore};