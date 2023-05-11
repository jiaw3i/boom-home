import React from "react";
import {AllBots, BotInfo, BotTypes, GeneralBots, InterviewBots} from "../../datas/bots";
import {useNavigate} from "react-router-dom";
import BotConfigDialog from "./BotConfig";

export default function ChatType() {

    const navigate = useNavigate();
    const toChat = (type: string) => {
        navigate(`/chatbot/${type}`);
    }
    const [settingType, setSettingType] = React.useState<string>("");

    // const botConfigDialog = ()

    return (<div className={"flex flex-col prose max-w-none justify-center align-middle "}>
        {
            BotTypes.map(botType => {
                return (
                    <div key={botType} className={"flex flex-col lg:pl-10 lg:pr-10"}>
                        <div className={"title text-left ml-3 mb-2 flex flex-row"}>
                            <div className={"bg-blue-700 w-1 h-full"}></div>
                            <div className={"font-bold ml-2"}>{botType.toUpperCase()}🐶</div>
                        </div>
                        <div className={"flex flex-row not-prose  flex-wrap"}>
                            {
                                AllBots.get(botType)?.map((bot: BotInfo) => {
                                    return (
                                        <div key={bot.id}
                                             className="card p-0 w-full lg:w-[31%] justify-start bg-base-300 shadow-xl m-[1%] hover:shadow-2xl">
                                            {/*<figure className="hidden mt-0 mb-0 lg:px-10 lg:pt-10 lg:flex">*/}
                                            {/*    <img src="/OIP.jpg" alt="Shoes" className="hidden lg:rounded-xl lg:block"/>*/}
                                            {/*</figure>*/}
                                            <div className="card-body p-6 items-center text-center">
                                                <h2 className="card-title">{bot.name}</h2>
                                                <p className={"text-left overflow-ellipsis"}>{bot.description}</p>
                                                <div className="card-actions flex w-full flex-row-reverse">
                                                    <div className={bot.enable ? "" : "hover:cursor-not-allowed"}>
                                                        <button className={"btn btn-primary "} disabled={!bot.enable}
                                                                onClick={() => {
                                                                    toChat(bot.type);
                                                                }}>
                                                            <svg className="h-7 w-7 text-white" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                                            </svg>

                                                        </button>
                                                    </div>

                                                    <div className={bot.enable ? "" : "hover:cursor-not-allowed"}>
                                                        <button className={"btn btn-primary "} disabled={!bot.enable}>

                                                            <label htmlFor="commonBotConfig"
                                                                   className={"hover:cursor-pointer w-full h-full flex flex-row justify-center items-center"}
                                                                   onClick={() => setSettingType(bot.type)}
                                                                   >
                                                                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2"
                                                                     strokeLinecap="round" strokeLinejoin="round">
                                                                    <circle cx="12" cy="12" r="3"/>
                                                                    <path
                                                                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                                                </svg>
                                                            </label>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                )
            })
        }
        <BotConfigDialog type={settingType}/>

    </div>)
}