import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {get} from "../util/request";
import {create} from "zustand";
import {v4 as uuidv4} from 'uuid';
import message from "../util/message";

type Message = {
    role: number,
    time: string,
    content: string
}
export default function ChatBot() {
    const [isContext, setIsContext] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [curRandomId, setCurRandomId] = useState<string>(uuidv4());

    const {register, handleSubmit, formState: {errors}} = useForm({
        values: {
            message: message
        }
    });
    const sendMessage: any = (data: any) => {
        // element?.scrollIntoView();

        let message = data.message;
        let curMsgs = messages;
        curMsgs.push({
            role: 2,
            time: new Date().toLocaleTimeString(),
            content: message
        } as Message);
        curMsgs.push({
            role: 1,
            time: new Date().toLocaleTimeString(),
            content: "正在为您处理..."
        } as Message);
        setMessages(curMsgs);
        setIsLoading(true);
        setMessage("");
        get("/api/gpt/chat", {
            message: message,
            id: curRandomId,
            isContext: isContext
        }).then((res: any) => {
            // let msgs = messages;
            let msg: Message = messages[messages.length - 1];
            msg.content = res.data.content;
            msg.time = new Date().toLocaleTimeString();
            // this,setMessages([]);

            setMessages((preMessages) => {
                preMessages.pop();
                return [...preMessages, msg];
            });
            setIsLoading(false);
            setTimeout(() => {
                let elementChats = document.getElementById("chats");
                if (elementChats != undefined) {
                    console.log(elementChats.scrollTop)
                    elementChats.scrollTop = elementChats.scrollHeight;
                    console.log(elementChats.scrollTop)
                }
            }, 500)
        })

        setTimeout(() => {
            let elementChats = document.getElementById("chats");
            if (elementChats != undefined) {
                console.log(elementChats.scrollTop)
                elementChats.scrollTop = elementChats.scrollHeight;
                console.log(elementChats.scrollTop)
            }
        }, 500)

    }

    const deleteContext = (id: string) => {
        get("/api/gpt/clear", {
            id: curRandomId
        }).then((res: any) => {
            console.log(res);
        })
    }


    /**
     * 离开页面请求删除当前id的上下文对话，防止后端内存泄漏
     */
    useEffect(() => {
        const preventUnload = (event: BeforeUnloadEvent) => {

            navigator.sendBeacon("/api/gpt/clear?id=" + curRandomId, "");
            // deleteContext(curRandomId)
            // deleteContext();
            event.preventDefault();
            event.returnValue = message;
        };

        window.addEventListener('beforeunload', preventUnload);

        return () => {
            window.removeEventListener('beforeunload', preventUnload);
            // setTimeout
            deleteContext(curRandomId);
        };
    }, []);

    const commentEnterSubmit = (e: any) => {
        if (isLoading) {
            console.log("正在处理上一段对话");
            return;
        }
        if (e.key === "Enter" && e.ctrlKey==true &&e.shiftKey == false) {
            e.preventDefault();
            const data: any = {message: e.target.value};
            return handleSubmit(sendMessage(data));
        }
    };

    return (
        isSelected ?
            (<div className={"chat-gpt p-0 m-5  lg:m-10 overflow-y-auto flex-grow max-h-full card bg-base-300 relative justify-between"}>

                <div className={"mt-0 mb-5"}>

                </div>

                <div id={"chats"} className={"lg:m-10 m-3 overflow-auto h-full mb-10 chat-area no-scrollbar"}>
                    {
                        messages.map((msg, index) => {
                            return (
                                <div key={index} className={"chat " + (msg.role === 1 ? "chat-start" : "chat-end")}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={msg.role === 1 ? "/OIP.jpg" : "/avatar.png"} alt={""}/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {/*BOT*/}
                                        <time className="text-xs opacity-50">{msg.time}</time>
                                    </div>
                                    <div className="chat-bubble whitespace-pre-line text-left">{msg.content}</div>
                                    {/*<div className="chat-footer opacity-50">*/}
                                    {/*    Delivered*/}
                                    {/*</div>*/}
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    className={"absolute m-0 ml-auto mr-auto bottom-10 message-area w-4/6  no-scrollbar relative bg-transparent"}>
                    <form className={"no-scrollbar"} onSubmit={handleSubmit(sendMessage)}>
                    <textarea
                        {...register("message", {required: true})}
                        placeholder="在此输入消息，Ctrl+Enter或者点击右下方飞机按钮发送。"
                        onKeyDown={commentEnterSubmit}
                        className={"bg-base-200 textarea rounded-xl shadow-2xl resize-none w-full  no-scrollbar break-all"}>
                    </textarea>
                        {errors.message && <p className={"text-red-500 absolute"}>message is required.</p>}
                        <button
                            type={"submit"}
                            disabled={isLoading}
                            className="border-0 disabled:cursor-not-allowed absolute bg-base-200 p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:border-0 hover:bg-base-300 focus:border-0 dark:disabled:hover:bg-transparent right-1 md:right-2">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                                 strokeLinecap="round"
                                 strokeLinejoin="round" className="h-4 w-4 mr-1" height="1em" width="1em"
                                 xmlns="http://www.w3.org/2000/svg">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>)
            :
            (<div className={"flex flex-col justify-center align-middle "}>
                <div className={"lg:mt-0 lg:mb-5"}>

                </div>
                <div className={"flex flex-col"}>
                    <div>
                        <p className={"text-xl font-bold"}>选择对话模式</p>
                    </div>
                    <div className={"divider"}></div>
                </div>
                <div className={"flex flex-row flex-wrap justify-center align-middle"}>
                    <div className="card p-0 w-96 bg-base-300 shadow-xl m-3">
                        <figure className="hidden lg:px-10 lg:pt-10 lg:flex">
                            <img src="/OIP.jpg" alt="Shoes" className="hidden lg:rounded-xl lg:block"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">普通模式</h2>
                            <p>普通问答模式，不会记录对话上下文信息，不关联上下文对话</p>
                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={()=>{
                                    setIsContext(false);
                                    setIsSelected(true);
                                    setMessages([{
                                        role: 1,
                                        time: new Date().toLocaleTimeString(),
                                        content: "您将使用普通模式与我对话。"
                                    } as Message]);
                                }}>普通模式</button>
                            </div>
                        </div>
                    </div>
                    <div className="card p-0 w-96 bg-base-300 shadow-xl m-3">
                        <figure className="hidden lg:px-10 lg:pt-10 lg:flex">
                            <img src="/OIP.jpg" alt="Shoes" className="hidden lg:rounded-xl lg:block"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">上下文模式</h2>
                            <p>关联对话上下文，会根据上下文内容做出回答，但是由于gpt的token限制，每次对话次数有限。</p>
                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={()=>{
                                    setIsContext(true);
                                    setIsSelected(true);
                                    setMessages([{
                                        role: 1,
                                        time: new Date().toLocaleTimeString(),
                                        content: "您将使用上下文模式与我对话。"
                                    } as Message]);
                                }}>上下文模式</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)
    )
}