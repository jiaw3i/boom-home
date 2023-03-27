import {useForm} from "react-hook-form";
import {useState} from "react";

export default function ChatBot() {
    const [message, setMessage] = useState<string>("");
    const [botMessage,setBotMessage] = useState<string>("");

    const {register, handleSubmit, formState: {errors}} = useForm({
        values: {
            message: message
        }
    });
    const sendMessage = (data: any) => {
        let message = data.message;
        let eventSource = new EventSource("/api/gpt/chat?message=" + message);
        console.log(message);
        let allBotMessages = "";
        // eventSource.addEventListener("message", (event) => {
        //     allBotMessages = allBotMessages.concat(event.data);
        //     console.log("allBotMessages",allBotMessages)
        //     setBotMessage(allBotMessages);
        //     console.log("botMessages",botMessage)
        // });

        eventSource.onmessage = (event) => {

            console.log(event);
            console.log("before add", botMessage);
            setBotMessage(botMessage.concat(event.data));
            console.log("after add", botMessage);
        }

        // eventSource.close();

        // eventSource.addEventListener("error", (event) => {
        //     console.log(event);
        //     setMessage("error");
        // });

        // console.log(allBotMessages)


    }

    return (
        <div className={"chat-gpt p-0 m-10 h-full card bg-base-300 relative justify-between"}>
            <div className={"p-10 chat-area"}>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="/OIP.jpg"/>
                        </div>
                    </div>
                    <div className="chat-header">
                        {/*BOT*/}
                        {/*<time className="text-xs opacity-50">12:45</time>*/}
                    </div>
                    <div className="chat-bubble">You were the Chosen One!</div>
                    {/*<div className="chat-footer opacity-50">*/}
                    {/*    Delivered*/}
                    {/*</div>*/}
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="/avatar.png"/>
                        </div>
                    </div>
                    <div className="chat-header">
                        {/*ME*/}
                        {/*<time className="text-xs opacity-50">12:46</time>*/}
                    </div>
                    <div className="chat-bubble">I hate you!</div>
                    {/*<div className="chat-footer opacity-50">*/}
                    {/*    Seen at 12:46*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className={"absolute m-0 ml-auto mr-auto bottom-10 message-area w-4/6 relative bg-transparent"}>
                {/*<div className={"divider "}></div>*/}
                {/*<div className={"absolute card bg-base-200"}>*/}
                <form onSubmit={handleSubmit(sendMessage)}>
                    <textarea
                        {...register("message", {required: true})}
                        placeholder="在此输入消息，Enter发送"

                        className={"bg-base-200 textarea rounded-xl shadow-2xl resize-none w-full"}>
                    </textarea>
                    {errors.message && <p className={"text-red-500"}>message is required.</p>}
                    <button
                        type={"submit"}
                        className="border-0 absolute bg-base-200 p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:border-0 hover:bg-base-300 focus:border-0 dark:disabled:hover:bg-transparent right-1 md:right-2">
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