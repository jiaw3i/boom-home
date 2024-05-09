
const BOOM_HOME_BASE = "/api"
// const BOOM_HOME_BASE = "/api/home/portal"
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
export const LIST_TAGS = BOOM_HOME_BASE + "/tag/list"

export const PUBLISH_POST = BOOM_HOME_BASE + "/post/publish"
export const UPDATE_POST = BOOM_HOME_BASE + "/post/update"
export const LIST_POST = BOOM_HOME_BASE + "/post/list"
export const DELETE_POST = BOOM_HOME_BASE + "/post/delete"
export const GET_POST_BY_ID = BOOM_HOME_BASE + "/post"

// components /ChatBot.tsx
export const GPT_STREAM_CHAT = BOOM_HOME_BASE + "/gpt/streamchat"

export const LOGIN_API = "/api/auth/login"
export const LOGOUT_API = "/api/auth/logout"
export const CURRENT_USER = "/api/auth/current"

const AI_BASE = "/api/ai"
export const AZURE_CHAT = AI_BASE + "/azure/chat"
export const AZURE_CHAT_CLEAR = AI_BASE + "/azure/clear"
export const AZURE_CHAT_VERIFY = AI_BASE + "/azure/verify"


const IMG_BASE = "https://img.hanjiawei.com/api/v1"

export const GEN_TOKENS = IMG_BASE + "/tokens"
export const IMG_UPLOAD = IMG_BASE + "/upload"