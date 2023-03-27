import {useForm} from "react-hook-form";
import {useState} from "react";
import {get} from "../util/request";
import {create} from "zustand";
import message from "../util/message";

type Message = {
    role: number,
    time: string,
    content: string
}
export default function ChatBot() {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<Message>>([{
        role: 1,
        time: new Date().toLocaleTimeString(),
        content: "您好，我是您的私人助理"
    } as Message]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [botMessage, setBotMessage] = useState<string>("");
    const useStore = create((set) => ([]))

    const {register, handleSubmit, formState: {errors}} = useForm({
        values: {
            message: message
        }
    });
    const sendMessage = (data: any) => {
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

        get("/api/gpt/chat", {
            message: message
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

    return (
        <div
            className={"chat-gpt p-0 m-10 overflow-y-auto  flex-grow max-h-full card bg-base-300 relative justify-between"}>

            <div className={"mt-0 mb-5"}></div>
            <div id={"chats"} className={"m-10 overflow-auto h-full mb-10 chat-area no-scrollbar"}>
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
                {/*<div className={"divider "}></div>*/}
                {/*<div className={"absolute card bg-base-200"}>*/}
                <form className={"no-scrollbar"} onSubmit={handleSubmit(sendMessage)}>
                    <textarea
                        {...register("message", {required: true})}
                        placeholder="在此输入消息，Enter发送"

                        className={"bg-base-200 textarea rounded-xl shadow-2xl resize-none w-full  no-scrollbar"}>
                    </textarea>
                    {errors.message && <p className={"text-red-500 absolute"}>message is required.</p>}
                    <button
                        type={"submit"}
                        disabled={isLoading}
                        className="border-0 disabled:cursor-not-allowed absolute bg-base-200 p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:border-0 hover:bg-base-300 focus:border-0 dark:disabled:hover:bg-transparent right-1 md:right-2">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                             strokeLinejoin="round" className="h-4 w-4 mr-1" height="1em" width="1em"
                             xmlns="http://www.w3.org/2000/svg">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}