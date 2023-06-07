const BotTypes = ["general", "interview", "games"];

type BotInfo = {
    id: number,
    name: string,
    type: string,
    description: string,
    enable: boolean
}
const GeneralBots: Array<BotInfo> = [
    {
        id: 1,
        name: "通用机器人-普通模式",
        type: "common",
        description: "普通问答模式，不会记录对话上下文信息，不关联上下文对话。",
        enable: true
    },
    {
        id: 2,
        name: "通用机器人-上下文模式",
        type: "context",
        description: "关联对话上下文，会根据上下文内容做出回答，但是由于gpt的token限制，每次对话次数有限。",
        enable: true
    }
];
const InterviewBots: Array<BotInfo> = [
    {
        id: 3,
        name: "前端面试官",
        type: "front-end-interview",
        description: "GPT扮演前端面试官，帮你模拟面试。",
        enable: false
    },
    {
        id: 4,
        name: "后端面试官",
        type: "back-end-interview",
        description: "GPT扮演前端面试官，帮你模拟面试。",
        enable: false
    },
    {
        id: 5,
        name: "全栈面试官",
        type: "full-stack-interview",
        description: "GPT扮演全栈面试官，帮你模拟面试。",
        enable: false
    }
]

const GamesBots: Array<BotInfo> = [
    {
        id: 6,
        name: "成语接龙",
        type: "idiom-solitaire",
        description: "跟GPT一起玩成语接龙",
        enable: false
    },
    {
        id: 7,
        name: "飞花令",
        type: "feihualing",
        description: "跟GPT一起玩飞花令",
        enable: false
    }
]


const AllBots: Map<string, Array<BotInfo>> = new Map;
AllBots.set("general", GeneralBots);
AllBots.set("interview", InterviewBots);
AllBots.set("games", GamesBots);

export {BotTypes, GeneralBots, InterviewBots, AllBots};
export type {BotInfo};

