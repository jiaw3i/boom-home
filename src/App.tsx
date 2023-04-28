import React, {lazy, Suspense, useEffect, useState} from 'react'
import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import ChatBot from "./components/chatbot/ChatBot";
import ChatType from "./components/chatbot/ChatType";
import Header from "./components/Header";

const Projects = lazy(() => import('./components/Projects'));
const ManageProject = lazy(() => import('./components/manager/ManageProject'));
const APIList = lazy(() => import('./components/APIList'));
// const ChatBot = import('./components/ChatBot');
const Home = lazy(() => import('./components/Home'));
const Sidebar = lazy(() => import('./components/Sidebar'));

function App() {
    const location = useLocation();
    const [type, setType] = useState(location.pathname.match("/manage/*") ? "admin" : "common");
    const [title, setTitle] = useState("Home");

    useEffect(() => {
        setTitle(currentTitle());
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
    }
    return (

        <div className="flex flex-row w-screen bg-base-100 h-screen max-h-screen">
            <div className="drawer drawer-mobile">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
                    <div className="flex flex-col pt-1">
                        <div className="lg:w-full lg:justify-center flex flex-grow max-w-full">
                            <div className="flex-none lg:hidden left-0">
                                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         className="inline-block w-6 h-6 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <Header title={title}></Header>
                        </div>
                        <div className={"divider mt-0"}></div>
                        <Routes>
                            <Route path={"/projects"} element={
                                <React.Suspense>
                                    <Projects/>
                                </React.Suspense>
                            }/>
                            <Route path={"/"} element={
                                <React.Suspense>
                                    <Home/>
                                </React.Suspense>
                            }/>
                            <Route path={"/home"} element={
                                <React.Suspense>
                                    <Home/>
                                </React.Suspense>
                            }/>
                            <Route path={"/manage"} element={
                                <React.Suspense>
                                    <ManageProject/>
                                </React.Suspense>
                            }>
                                <Route path={"project"} element={
                                    <React.Suspense>
                                        <ManageProject/>
                                    </React.Suspense>
                                }/>
                            </Route>
                            <Route path={"/apis"} element={
                                <React.Suspense>
                                    <APIList/>
                                </React.Suspense>
                            }/>
                            {/*<Route path={"/chatbot"} element={*/}
                            {/*    // <React.Suspense>*/}
                            {/*        <ChatBot/>*/}
                            {/*    // </React.Suspense>*/}
                            {/*}/>*/}
                            <Route path={"/chatbot"} element={
                                <React.Suspense>
                                    <ChatType/>
                                </React.Suspense>
                            }>
                            </Route>
                            <Route path={"/chatbot/:type"} element={<ChatBot/>}/>
                        </Routes>
                    </div>
                </div>

                <Sidebar type={type} setTitle={setTitle} title={title}></Sidebar>
            </div>
        </div>


    )
}

export default App
