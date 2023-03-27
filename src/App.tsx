import React, {useState} from 'react'
import './App.css'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Projects from "./components/Projects";
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./components/Home";
import ManageProject from "./components/manager/ManageProject";
import APIList from "./components/APIList";
import ChatBot from "./components/ChatBot";

function App() {
    const currentTitle = () => {
        console.log("enter,{}", location.pathname)
        let title = "Home";
        if (location.pathname.match("/manage/*")) {
            title = location.pathname.split("/")[2];
            if (title === undefined || title === "") {
                title = "Project";
            }
            // 返回首字母大写
            return "Manage " + title.replace(/^\S/, s => s.toUpperCase());
        } else {
            title = location.pathname.split("/")[1];
            if (title === undefined || title === "") {
                title = "Home";
            }
            return title.replace(/^\S/, s => s.toUpperCase());
        }
    }
    const location = useLocation();
    const [title, setTitle] = useState(currentTitle());
    const [type, setType] = useState(location.pathname.match("/manage/*") ? "admin" : "common");
    return (

        <div className="flex flex-row w-screen h-screen max-h-screen">
            <div className="drawer drawer-mobile">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
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
                    <div className="flex flex-col flex-grow max-h-full">
                        <Routes>
                            <Route path={"/projects"} element={<Projects/>}/>
                            <Route path={"/"} element={<Home/>}/>
                            <Route path={"/home"} element={<Home/>}/>
                            <Route path={"/manage"} element={<ManageProject/>}>
                                <Route path={"project"} element={<ManageProject/>}/>
                            </Route>
                            <Route path={"/apis"} element={<APIList/>}/>
                            <Route path={"/chatbot"} element={<ChatBot/>}/>
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
