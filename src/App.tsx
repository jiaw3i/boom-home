import React, {lazy, Suspense, useEffect, useState} from 'react'
import './App.css'
import {useLocation} from "react-router-dom";
import {get} from "./util/request";
import {CURRENT_USER} from "./util/apis";
import {UseUserStore} from "@/store/UserInfoStore";
import {Toaster} from "react-hot-toast";
import MyRoutes from "@/routes/Routes";
import Header from "@/components/header/Header";

const Sidebar = lazy(() => import('./components/Sidebar'));

function App() {
    const location = useLocation();
    const [type, setType] = useState(location.pathname.match("/manage/*") ? "admin" : "common");
    const [title, setTitle] = useState("主页");
    // const [theme, setTheme] = useState("light");
    const {setUsername, username} = UseUserStore();

    const [imgUrl, setImgUrl] = useState<string>("");
    useEffect(() => {
        // setTitle(currentTitle());
        setType(location.pathname.match("/manage/*") ? "admin" : "common")
        if (username === "") {
            get(CURRENT_USER).then((res: any) => {
                if (res.success && res.data.username !== username) {
                    setUsername(res.data.username);
                }
            });
        }
    });

    return (
        <div className="flex flex-row w-screen bg-base-100  max-w-screen no-scrollbar">
            <div><Toaster/></div>
            <div className="drawer drawer-mobile lg:drawer-open no-scrollbar">
                <input id="my-drawer-menu" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col no-scrollbar">

                    <div className="flex flex-col flex-grow no-scrollbar">
                        <Header title={title}/>
                        {/*<div className={"divider mt-0 mb-1 lg:flex hidden"}></div>*/}
                        <Suspense>
                            <div className={"content lg:pt-0 pt-[50px] pb-2 -z-1"}>
                                {/*<div className={"h-[50px] w-full lg:hidden"}></div>*/}
                                <MyRoutes setImgUrl={setImgUrl} setTitle={setTitle}/>
                            </div>
                        </Suspense>
                    </div>
                </div>

                <Sidebar type={type}></Sidebar>
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