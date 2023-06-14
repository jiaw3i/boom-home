import React, {lazy, useEffect, useState} from 'react'
import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import ChatBot from "./components/chatbot/ChatBot";
import ChatType from "./components/chatbot/ChatType";
import PageTitle from "./components/PageTitle";
import NotFound from "./components/NotFound";
import Loader from "./components/Loader";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import {get} from "./util/request";
import {CURRENT_USER} from "./util/apis";
import {UseUserStore} from "@/store/UserInfoStore";
import RecordWall from "./components/recordwall/RecordWall";


const Projects = lazy(() => import('./components/Projects'));
const ManageProject = lazy(() => import('./components/manager/ManageProject'));


function App() {
    const location = useLocation();
    const [type, setType] = useState(location.pathname.match("/manage/*") ? "admin" : "common");
    const [title, setTitle] = useState("Home");
    const [theme, setTheme] = useState("light");
    const {setUsername, setId, username} = UseUserStore();

    const [imgUrl, setImgUrl] = useState<string>("");
    useEffect(() => {
        setTitle(currentTitle());
        if (username === "") {
            get(CURRENT_USER).then((res: any) => {
                if (res.success && res.data.username !== username) {
                    console.log("app,{}", res.data.username);
                    setUsername(res.data.username);
                }
            });
        }
    });

    const currentTitle = () => {
        // console.log("enter,{}", location.pathname)
        let title = "Home";
        let finalTitle = "Home";
        if (location.pathname.match("/manage/*")) {
            title = location.pathname.split("/")[2];
            if (title === undefined || title === "") {
                title = "Project";
            }
            // 返回首字母大写
            finalTitle = "Manage " + title.replace(/^\S/, s => s.toUpperCase());
        } else {
            title = location.pathname.split("/")[1];
            if (title === undefined || title === "") {
                title = "Home";
            }
            finalTitle = title.replace(/^\S/, s => s.toUpperCase());
        }
        document.title = finalTitle + "✔" + " | Owen❤";
        return finalTitle;
    };
    const switchTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            setTheme("light");
            document.documentElement.setAttribute("data-theme", "light");
        }
        const logoCheckbox = document.getElementById("logoCheckbox") as HTMLInputElement;
        const themeCheckbox = document.getElementById("themeCheckbox") as HTMLInputElement;
        if (logoCheckbox != null && logoCheckbox.checked != themeCheckbox.checked) {
            logoCheckbox.checked = themeCheckbox.checked;
        }
    };
    return (

        <div className="flex flex-row w-screen bg-base-100 h-screen max-h-screen max-w-screen no-scrollbar">
            <div className="drawer drawer-mobile lg:drawer-open no-scrollbar">
                <input id="my-drawer-menu" type="checkbox" className="drawer-toggle"/>
                {/*<input id="my-drawer-record" type="checkbox" className="drawer-toggle"/>*/}
                <div className="drawer-content max-h-screen flex flex-col no-scrollbar">
                    <div className="flex flex-col pt-1 flex-grow max-h-full no-scrollbar">
                        <div className="lg:w-full flex justify-between max-w-full">
                            <div className="flex-none lg:hidden left-0 prose">
                                <label htmlFor="my-drawer-menu" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         className="inline-block w-6 h-6 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <PageTitle title={title}></PageTitle>
                            <div className={"lg:ml-auto prose lg:mr-8 flex"}>
                                <label className="swap swap-rotate w-[3rem] h-[3rem]">
                                    <input id={"themeCheckbox"} type="checkbox" onClick={switchTheme}/>
                                    <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                                    </svg>
                                    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <div className={"divider mt-0"}></div>
                        <Routes>
                            <Route path={"/projects"} element={
                                <React.Suspense fallback={<Loader/>}>
                                    <Projects/>
                                </React.Suspense>
                            }/>
                            <Route path={"/"} element={
                                <Home/>
                            }/>
                            <Route path={"/home"} element={
                                <Home/>
                            }/>
                            <Route path={"/manage"} element={
                                <React.Suspense fallback={<Loader/>}>
                                    <ManageProject/>
                                </React.Suspense>
                            }>
                                <Route path={"project"} element={
                                    <React.Suspense fallback={<Loader/>}>
                                        <ManageProject/>
                                    </React.Suspense>
                                }/>
                            </Route>
                            <Route path={"/recordwall"} element={
                                <React.Suspense fallback={<Loader/>}>
                                    <RecordWall setImgUrl={setImgUrl}/>
                                </React.Suspense>
                            }/>
                            {/*<Route path={"/chatbot"} element={*/}
                            {/*    // <React.Suspense>*/}
                            {/*        <ChatBot/>*/}
                            {/*    // </React.Suspense>*/}
                            {/*}/>*/}
                            <Route path={"/chatbot"} element={
                                <React.Suspense fallback={<Loader/>}>
                                    <ChatType/>
                                </React.Suspense>
                            }>
                            </Route>
                            <Route path={"/chatbot/:type"} element={<ChatBot/>}/>

                            <Route path={"*"} element={<NotFound/>}>
                            </Route>
                        </Routes>
                    </div>
                </div>

                <Sidebar type={type} setTitle={setTitle} setTheme={setTheme} theme={theme} title={title}></Sidebar>
            </div>

            <dialog id="view_image" className="modal">
                <form method="dialog" className="modal-box p-0">
                    <img src={imgUrl} alt={"loading..."} className={"w-full"}/>
                </form>
                <form method="dialog" className="modal-backdrop opacity-0">
                    <button className={"border-none"}>close</button>
                </form>
            </dialog>
        </div>


    )
}

export default App
