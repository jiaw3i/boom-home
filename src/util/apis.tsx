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

// const BOOM_HOME_BASE = "/api"
const BOOM_HOME_BASE = "/api/home/portal"
// components /Projects.tsx
export const PROJECT_LIST = BOOM_HOME_BASE + "/project/list"
export const PROJECT_ADD = BOOM_HOME_BASE + "/project/add"
export const PROJECT_UPDATE = BOOM_HOME_BASE + "/project/update"
export const PROJECT_DELETE = BOOM_HOME_BASE + "/project/delete"
export const LIST_PUBLIC_RECORD = BOOM_HOME_BASE + "/record/listAllPublicRecords"

export const LIST_ALL_RECORD = BOOM_HOME_BASE + "/record/listAllRecords"

export const LIST_RECORD_BY_TAG = BOOM_HOME_BASE + "/record/listRecordsByTags"

export const ADD_RECORD = BOOM_HOME_BASE + "/record/addRecord"

export const UPDATE_RECORD = BOOM_HOME_BASE + "/record/updateRecord"

export const DELETE_RECORD = BOOM_HOME_BASE + "/record/deleteRecord"
export const LIST_TAGS = BOOM_HOME_BASE + "/record/listTags"

// components /ChatBot.tsx
export const GPT_STREAM_CHAT = BOOM_HOME_BASE + "/gpt/streamchat"

export const LOGIN_API = "/api/auth/login"

export const CURRENT_USER = "/api/auth/current"

const AI_BASE = "/api/ai"
export const AZURE_CHAT = AI_BASE + "/azure/chat"
export default apis;
