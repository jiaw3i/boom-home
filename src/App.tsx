import React, {useState} from 'react'
import './App.css'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Projects from "./components/Projects";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";

function App() {
    const [title, setTitle] = useState("Home")
    return (

        <div className="flex flex-row w-screen">

            <Sidebar setTitle={setTitle} title={title}></Sidebar>
            <div className="flex flex-col flex-grow">
                <Header title={title}/>
                <Routes>
                    <Route path={"/projects"} element={<Projects/>}/>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                </Routes>
            </div>
        </div>


    )
}

export default App
