import React, {useState} from 'react'
import './App.css'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Projects from "./components/Projects";

function App() {
    const [count, setCount] = useState(0)
    const [title, setTitle] = useState("Home")

    return (
        <div className="flex flex-row w-screen">
            {/*<Navbar></Navbar>*/}

            <Sidebar setTitle={setTitle}></Sidebar>
            <div className="flex flex-col flex-grow">
                <Header title={title}/>
                <Projects/>
            </div>
        </div>
    )
}

export default App
