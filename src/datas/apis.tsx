const apis = [
    {
        id: 1,
        name: "查询15日天气",
        url: "https://api.hanjiawei.com/weather",
        description: "从今天开始，查询往后15日的天气",
    },
    {
        id: 2,
        name: "夸夸我",
        url: "https://api.hanjiawei.com/goodme",
        description: "随机一句夸夸你的话",
    },
    {
        id: 3,
        name: "励志语录",
        url: "https://api.hanjiawei.com/upup",
        description: "随机一句励志语录",
    },
    {
        id: 4,
        name: "查询15日天气",
        url: "https://api.hanjiawei.com/weather",
        description: "从今天开始，查询往后15日的天气",
    },
    {
        id: 5,
        name: "夸夸我",
        url: "https://api.hanjiawei.com/goodme",
        description: "随机一句夸夸你的话",
    },
    {
        id: 6,
        name: "励志语录",
        url: "https://api.hanjiawei.com/upup",
        description: "随机一句励志语录",
    }
]

// components /Projects.tsx
export const PROJECT_LIST = "/api/project/list"
export const PROJECT_ADD = "/api/project/add"
export const PROJECT_UPDATE = "/api/project/update"
export const PROJECT_DELETE = "/api/project/delete"

// components /ChatBot.tsx

export const GPT_STREAM_CHAT = "/api/gpt/streamchat"

export default apis;