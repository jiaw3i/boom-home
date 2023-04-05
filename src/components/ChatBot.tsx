import {useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import {get} from "../util/request";
import {v4 as uuidv4} from 'uuid';
import {fetchEventSource} from "@microsoft/fetch-event-source";
import ReactMarkdown from "react-markdown";
import RemarkMath from "remark-math";

import CodeBlock from "./CodeBlock";


type Message = {
    role: number,
    time: string,
    content: string
}
export default function ChatBot() {
    const [isContext, setIsContext] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const botMessage = useRef<string>("");
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const curRandomId = useRef<string>(uuidv4());

    const {register, handleSubmit, formState: {errors}} = useForm({
        values: {
            message: message
        }
    });
    const sendMessage: any = (data: any) => {
        // element?.scrollIntoView();

        let message = data.message;
        let curMsgs = messages;
        console.log("[1.messages]", messages);
        console.log("[1.curMsgs]", curMsgs);
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
        fetchBotMessage(message, curRandomId.current, false);
        // setTimeout(() => {
        //     console.log(messages);
        // }, 5000)
    }

    const handleMessages = () => {

        let msg: Message = {...messages[messages.length - 1]};

        msg.content = botMessage.current;
        msg.time = new Date().toLocaleTimeString();
        msg.role = 1;
        // this,setMessages([]);
        setMessages((preMessages) => {
            preMessages.pop();
            return [...preMessages, msg];
        });
        let elementChats = document.getElementById("chats");
        if (elementChats != undefined) {
            elementChats.scrollTop = elementChats.scrollHeight;

        }
    }


    const fetchBotMessage = (message: string, id: string, isContext: boolean) => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchEventSource(`api/gpt/streamchat`, {
            signal: signal,
            method: "POST",
            body: JSON.stringify({
                "message": message,
                "id": id,
                "isContext": isContext
            }),
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json",
            },
            onmessage(event) {

                // const parsedData = JSON.parse(event.data);
                if (event.data == "@end@") {
                    botMessage.current = "";
                    setIsLoading(false);
                    abortController.abort();
                    return
                }
                let partMessage = event.data.replaceAll("&#32;", " ").replaceAll("&#92n;&#92n;", "\n").replaceAll("&#92n;", "\n");

                botMessage.current = botMessage.current.concat(partMessage);
                handleMessages();
            },
            onclose() {
                console.log("Connection closed by the server");
                setIsLoading(false);
            },
            onerror(err) {
                console.log("There was an error from server", err);
                setIsLoading(false);
            },
        }).then(r => {
            console.log("[fetchEventSource then]", r)
        });
    };


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
            deleteContext(curRandomId.current);
        };
    }, []);

    const commentEnterSubmit = (e: any) => {
            if (e.key === "Enter" && e.ctrlKey == true && e.shiftKey == false) {
                if (isLoading) {
                    console.log("正在处理上一段对话");
                    return;
                }
                e.preventDefault();
                const data: any = {message: e.target.value};
                return handleSubmit(sendMessage(data));
            }
        };

    return (
        isSelected ?
            (<div
                className={"chat-gpt m-5 p-3 lg:p-10 prose max-w-none lg:m-10 overflow-y-auto flex-grow card bg-base-300 relative justify-between"}>

                <div id={"chats"} className={"overflow-auto h-full mb-10 chat-area no-scrollbar"}>
                    {
                        messages.map((msg, index) => {
                            // console.log("msg==>", msg)
                            return (
                                <div key={index} className={"chat " + (msg.role === 1 ? "chat-start" : "chat-end")}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 not-prose rounded-full">
                                            <img src={msg.role === 1 ? "/OIP.jpg" : "/avatar.png"} alt={""}/>
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {/*BOT*/}
                                        <time className="text-xs opacity-50">{msg.time}</time>
                                    </div>
                                    <div
                                        className={"chat-bubble not-prose whitespace-pre-wrap break-words text-left"}
                                    >
                                        <ReactMarkdown
                                            children={msg.content}

                                            className={"not-prose list-decimal rmd"}
                                            remarkPlugins={[RemarkMath]}
                                            // rehypePlugins={[RehypeRaw]}
                                            // rehypePlugins={[RehypeKatex, [RehypePrsim, {ignoreMissing: true}]]}
                                            components={CodeBlock}
                                        />

                                    </div>


                                </div>
                            )
                        })
                    }
                </div>
                <div
                    className={"not-prose m-0 ml-auto mr-auto bottom-3 message-area w-4/6  no-scrollbar relative bg-transparent"}>
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
                            className="border-0 disabled:cursor-not-allowed absolute bg-base-200 p-1 rounded-md text-gray-500 bottom-1.5 bottom-2.5 hover:border-0 hover:bg-base-300 focus:border-0 dark:disabled:hover:bg-transparent right-1 md:right-2">
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
            (<div className={"flex flex-col prose max-w-none justify-center align-middle "}>
                <div className={"lg:mt-0 lg:mb-5"}>

                </div>
                <div className={"flex flex-col"}>
                    <div>
                        <p className={"text-xl font-bold"}>选择对话模式</p>
                    </div>
                    <div className={"divider"}></div>
                </div>
                <div className={"flex flex-row not-prose flex-wrap justify-center align-middle"}>
                    <div className="card p-0 w-96 bg-base-300 shadow-xl m-3">
                        <figure className="hidden mt-0 mb-0 lg:px-10 lg:pt-10 lg:flex">
                            <img src="/OIP.jpg" alt="Shoes" className="hidden lg:rounded-xl lg:block"/>
                        </figure>
                        <div className="card-body  items-center text-center">
                            <h2 className="card-title">普通模式</h2>
                            <p>普通问答模式，不会记录对话上下文信息，不关联上下文对话</p>
                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={() => {
                                    setIsContext(false);
                                    setIsSelected(true);
                                    setMessages([{
                                        role: 1,
                                        time: new Date().toLocaleTimeString(),
                                        content: "您将使用普通模式与我对话。"
                                    } as Message]);
                                }}>普通模式
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card p-0 w-96 bg-base-300 shadow-xl m-3">
                        <figure className="hidden mt-0 mb-0 lg:px-10 lg:pt-10 lg:flex">
                            <img src="/OIP.jpg" alt="Shoes" className="hidden lg:rounded-xl lg:block"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">上下文模式</h2>
                            <p>关联对话上下文，会根据上下文内容做出回答，但是由于gpt的token限制，每次对话次数有限。</p>
                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={() => {
                                    setIsContext(true);
                                    setIsSelected(true);
                                    setMessages([{
                                        role: 1,
                                        time: new Date().toLocaleTimeString(),
                                        content: "您将使用上下文模式与我对话。"
                                    } as Message]);
                                }}>上下文模式
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)
    )
}