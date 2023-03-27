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

        <div className="flex flex-row w-screen">
            <Sidebar type={type} setTitle={setTitle} title={title}></Sidebar>
            <div className="flex flex-col flex-grow">
                <Header title={"HELLO,"}/>
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


    )
}

export default App
