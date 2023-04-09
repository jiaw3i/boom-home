import React, {lazy, Suspense, useEffect, useState} from 'react'
import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import ChatBot from "./components/ChatBot";

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
        document.title = "Owen❤ | " + finalTitle + "✔";
        return finalTitle;
    }
    return (

        <div className="flex flex-row w-screen bg-base-100 h-screen max-h-screen">
            <div className="drawer drawer-mobile">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
                    <div className="flex flex-col flex-grow max-h-full">
                        <div className="lg:w-full flex">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         className="inline-block w-6 h-6 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                        </div>
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
                            <Route path={"/chatbot"} element={
                                // <React.Suspense>
                                    <ChatBot/>
                                // </React.Suspense>
                            }/>
                        </Routes>
                    </div>
                </div>

                <Sidebar type={type} setTitle={setTitle} title={title}></Sidebar>
                {/*<div className="drawer-side">*/}
                {/*    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>*/}
                {/*    <ul className="menu p-4 w-80 bg-base-100">*/}
                {/*        <!-- Sidebar content here -->*/}
                {/*        <li><a>Sidebar Item 1</a></li>*/}
                {/*        <li><a>Sidebar Item 2</a></li>*/}

                {/*    </ul>*/}

                {/*</div>*/}
            </div>

        </div>


    )
}

export default App
