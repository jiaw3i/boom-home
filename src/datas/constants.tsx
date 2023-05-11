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