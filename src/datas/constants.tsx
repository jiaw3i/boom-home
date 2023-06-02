export type CommonBotConfig = {
    temperature: number,
    model: string,
    maxTokens: number,
}

export type ContextBotConfig = CommonBotConfig & {
    history: number,
    compressSize: number,
}

export type interviewBotConfig = CommonBotConfig & {
    prompt: string,
}

export type Record = {
    id: string,
    content: string,
    tags: string[],
    createTime: string,
    updateTime: string,
    permission: number
}

export enum Permission {
    PRIVATE = 0,
    PUBLIC = 1,
}