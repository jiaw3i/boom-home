import React, {lazy, Suspense, useEffect, useState} from 'react'
import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
// import PageTitle from "./components/PageTitle";
// import Home from "./components/Home";
// import Sidebar from "./components/Sidebar";
import {get} from "./util/request";
import {CURRENT_USER} from "./util/apis";
import {UseUserStore} from "@/store/UserInfoStore";
import {Toaster} from "react-hot-toast";
import ThemeChange from "@/components/header/ThemeChange";
import PostView from "@/pages/blog/PostView";
import MyRoutes from "@/routes/Routes";
import Header from "@/components/header/Header";

const Sidebar = lazy(() => import('./components/Sidebar'));
const PageTitle = lazy(() => import('./components/header/PageTitle'));

function App() {
    const location = useLocation();
    const [type, setType] = useState(location.pathname.match("/manage/*") ? "admin" : "common");
    const [title, setTitle] = useState("Recordwall");
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
            let paths = location.pathname.split("/")
            title = paths[2];
            if (title === undefined || title === "") {
                title = "Project";
            }
            // 返回首字母大写
            finalTitle = "manage " + title.replace(/^\S/, s => s.toUpperCase());
        } else {
            title = location.pathname.split("/")[1];
            if (title === undefined || title === "") {
                title = "Recordwall";
            }
            finalTitle = title.replace(/^\S/, s => s.toUpperCase());
        }
        document.title = finalTitle + "✔" + " | Owen❤";
        return finalTitle;
    };
    return (
        <div className="flex flex-row w-screen bg-base-100 h-screen max-h-screen max-w-screen no-scrollbar">
            <div><Toaster/></div>
            <div className="drawer drawer-mobile lg:drawer-open no-scrollbar">
                <input id="my-drawer-menu" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content max-h-screen flex flex-col no-scrollbar">

                    <div className="flex flex-col flex-grow max-h-full no-scrollbar">
                        <Header title={title}/>
                        {/*<div className={"divider mt-0 mb-1 lg:flex hidden"}></div>*/}
                        <Suspense>
                            <div className={"content lg:pt-0 pb-2 -z-1 overflow-scroll no-scrollbar"}>
                                <div className={"h-[50px] w-full lg:hidden"}></div>
                                <MyRoutes setImgUrl={setImgUrl}/>
                            </div>
                        </Suspense>
                    </div>
                </div>

                <Sidebar type={type} setTitle={setTitle} title={title}></Sidebar>
            </div>

            <dialog id="view_image" className="modal">
                <form method="dialog" className="modal-box p-0 no-scrollbar">
                    <img src={imgUrl} alt={"loading..."} className={"w-full"}/>
                </form>
                <form method="dialog" className="modal-backdrop opacity-0">
                    <button className={"border-none"}>close</button>
                </form>
            </dialog>
        </div>


    )
}

export default App;