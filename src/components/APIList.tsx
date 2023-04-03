import apis from "../datas/apis";
import {useState} from "react";

export default function APIList() {
    const [activeTab,setActiveTab] = useState(1);
    return (
        <div className={"flex flex-col flex-grow items-center"}>
            <div className={"mt-5"}>
                <p className={"font-bold text-2xl prose"}>🛠️MAYBE YOU CAN USE.🛠️</p>
            </div>
            <div className="divider"></div>
            <div className={"flex flex-row flex-grow w-5/6 pl-10 pr-10 pb-20 justify-center"}>
                <div className={"bg-base-200 card shadow-xl hover:shadow-2xl"}>
                    <ul className={"menu p-2 text-base-content rounded-box"}>
                        {apis.map(api => {
                            return (
                                <li key={api.id} className={""}>
                                    <a className={""}>{api.name}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={"divider divider-horizontal"}></div>
                <div className={"w-4/6 bg-transparent flex flex-col flex-grow "}>
                    <div className="tabs w-full">
                        <a onClick={()=>setActiveTab(1)} className={"tab tab-lifted " + (activeTab===1?"tab-active":"")}>
                            API说明
                        </a>
                        <a onClick={()=>setActiveTab(2)} className={"tab tab-lifted " + (activeTab===2?"tab-active":"")}>在线体验</a>
                    </div>
                    <div className={"left-box bg-base-200 flex-grow rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"}>
                        <p className={"prose max-w-none"}>{activeTab===1?"API说明":"在线体验"}</p>
                    </div>
                </div>


            </div>
        </div>
    )
}