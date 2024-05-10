export interface IMenu {
    title: string,
    cnTitle: string,
    icon: any,
    isShow: boolean
}

const MenusData: Array<IMenu> = [
    {
        title: "RecordWall",
        cnTitle: "流水账📒",
        icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>,
        isShow: true,
    },
    {
        title: "Blog",
        cnTitle: "博客📖",
        icon: <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>,
        isShow: true,
    },
    {
        title: "ChatBot",
        cnTitle: "机器人🤖",
        icon: <svg className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7"/>
        </svg>,
        isShow: true,
    },
    {
        title: "Lab",
        cnTitle: "实验室🧪",
        icon: <svg className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
            <polyline points="7.5 19.79 7.5 14.6 3 12"/>
            <polyline points="21 12 16.5 14.6 16.5 19.79"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>,
        isShow: true,
    },
    {
        title: "AboutMe",
        cnTitle: "关于我🤓",
        icon: <svg className="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24"
                   strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                   strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="5 12 3 12 12 3 21 12 19 12"/>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
        </svg>,
        isShow: true,
    },
    {
        title: "Apis",
        cnTitle: "接口",
        icon: <svg className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>,
        isShow: false,
    },

    {
        title: "Links",
        cnTitle: "链接",
        icon: <svg className="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                   stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
        </svg>,
        isShow: false,
    },
]
const ManageMenusData: Array<IMenu> = [
    {
        title: "Manage Profile",
        cnTitle: "个人信息",
        icon: <svg className="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24"
                   strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                   strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="5 12 3 12 12 3 21 12 19 12"/>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
        </svg>,
        isShow: true,
    },
    {
        title: "Manage Project",
        cnTitle: "项目管理",
        icon: <svg className="h-8 w-8 " viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
            <polyline points="7.5 19.79 7.5 14.6 3 12"/>
            <polyline points="21 12 16.5 14.6 16.5 19.79"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>,
        isShow: true,
    },
    {
        title: "Manage Blog",
        cnTitle: "博客管理",
        icon: <svg className="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                   stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"/>
            <line x1="13" y1="8" x2="15" y2="8"/>
            <line x1="13" y1="12" x2="15" y2="12"/>
        </svg>,
        isShow: true,
    },
    {
        title: "Manage Link",
        cnTitle: "链接管理",
        icon: <svg className="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                   stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>
        </svg>,
        isShow: false,
    },
]

const Links = [
    {
        title: "Github",
        // icon: <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        //           d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        // </svg>
        // ,
        isShow: true,
        url: "https://github.com/jiaw3i"
    },
    {
        title: "管理系统",
        // icon: <svg className="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
        //            stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        //     <path stroke="none" d="M0 0h24v24H0z"/>
        //     <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"/>
        //     <line x1="13" y1="8" x2="15" y2="8"/>
        //     <line x1="13" y1="12" x2="15" y2="12"/>
        // </svg>,
        isShow: true,
        needLogin:true,
        url: "/manage"
    },

]
// export default MenusData;
export {MenusData, ManageMenusData, Links};