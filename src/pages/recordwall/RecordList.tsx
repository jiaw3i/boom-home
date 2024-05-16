import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React from "react";
import {RecordInfo} from "@/pages/recordwall/RecordWall";
import {get} from "@/util/request";
import {DELETE_RECORD} from "@/util/apis";
import toast from "react-hot-toast";
import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {log} from "vditor/dist/ts/util/log";
import rehypeHighlight from "rehype-highlight";
import {Terminal} from "lucide-react";
import CopyButton from "@/components/CopyBtn";

interface RecordListProps {
    records: RecordInfo[],
    loading: boolean,
    isLogin: boolean | undefined,
    refreshRecords: () => void,
    refreshTags: () => void,
    setImgUrl: Function,
}

declare const window: any;
const RecordList = (props: RecordListProps) => {
    const {records, loading, isLogin, refreshRecords, refreshTags, setImgUrl} = props;
    const highlightTag = (content: string, tag: string) => {
        if (tag === "") {
            return content;
        }
        tag.split(",").forEach((t) => {
            content = content.replace(t, "")
        });
        return content;
    }
    const deleteRecord = (record: RecordInfo) => {
        let elementById = document.getElementById("record-item-" + record.id);
        elementById?.blur();
        let toastId = toast.loading("Deleting...");
        get(DELETE_RECORD, {id: record.id}).then((res: any) => {
            if (res.success) {
                refreshRecords();
                refreshTags();
                toast.dismiss(toastId);
                toast.success("Delete Success");
            } else {
                toast.dismiss(toastId);
                toast.error("Delete Failed,Try again later,Please!")
            }
        })
    }

    const viewImage = (imgUrl: string) => {
        console.log(imgUrl);
        setImgUrl(imgUrl);

        if (imgUrl !== "" && window.view_image !== undefined) {
            window.view_image.showModal();
        }
    }

    return (
        <div className={"prose record-line flex flex-col w-full max-w-full flex-grow"}>
            {
                records.map((record: RecordInfo) =>
                    (
                        <div key={record.id}
                             className={"card prose text-left record-line-item flex flex-col bg-base-300 rounded-lg justify-between items-center p-2 mb-5"}>
                            <div className={"flex flex-row w-full"}>
                                <div
                                    className={"text-left flex flex-row font-mono text-gray-500 flex-grow items-center"}>
                                    <div
                                        className={"time mr-2 text-sm"}>{record.createTime.replace("T", " ")}
                                    </div>
                                    {
                                        record.tag.split(",").map(tag => <div
                                            className={"badge badge-outline badge-primary badge-sm mr-1"}>{tag.replace("#", "")}</div>)

                                    }

                                    {
                                        record.permission === 0 &&
                                        <div>
                                            <div className={"badge badge-outline badge-secondary"}>仅自己可见</div>
                                        </div>
                                    }
                                </div>
                                {
                                    isLogin && <div className={"dropdown dropdown-left"}>
                                        <label
                                            tabIndex={0}
                                            className={"btn btn-xs p-0 bg-transparent border-0 hover:bg-base-200"}>
                                            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="1"/>
                                                <circle cx="12" cy="5" r="1"/>
                                                <circle cx="12" cy="19" r="1"/>
                                            </svg>
                                        </label>

                                        <ul tabIndex={0}
                                            id={"record-item-" + record.id}
                                            className="dropdown-content menu p-0  prose bg-gray-400 rounded-xl w-30">
                                            <li className={"p-0"} onClick={() => {
                                                deleteRecord(record)
                                            }}>
                                                <div>删除</div>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className={"divider m-0"}></div>
                            <div
                                className={"w-full break-word"}>
                                <PhotoProvider>
                                    <ReactMarkdown className={"prose max-w-full prose-invert"}
                                                   children={highlightTag(record.content, record.tag)}
                                                   rehypePlugins={[rehypeRaw, rehypeHighlight as any]}
                                                   remarkPlugins={[remarkGfm]}
                                                   components={{
                                                       img: ({node, ...props}) => {
                                                           return <PhotoView src={props.src}>
                                                               <img {...props} alt={"loading..."}/>
                                                           </PhotoView>
                                                       },
                                                       pre: ({children}) => <pre
                                                           className="p-0 w-full max-w-full overflow-x-hidden">{children}</pre>,
                                                       code: ({node, className, children, ...props}) => {
                                                           // const match = /language-(\w+)/.exec(className || "");
                                                           if (typeof props.inline === "boolean")
                                                               props.inline = props.inline.toString() as any;
                                                           if (!props?.inline) {
                                                               const id = Math.random().toString(36).substr(2, 9);
                                                               return (
                                                                   <div className="rounded-md">
                                                                       <div
                                                                           className="flex h-9 items-center justify-between px-4 bg-neutral-600">
                                                                           <div className="flex items-center gap-2">
                                                                               <Terminal size={18}/>
                                                                           </div>
                                                                           <CopyButton id={id}/>
                                                                       </div>
                                                                       <div className="overflow-x-auto">
                                                                           <div id={id}
                                                                                className="whitespace-pre-wrap pl-4 pr-4 pt-1 pb-1">
                                                                               {children}
                                                                           </div>
                                                                       </div>
                                                                   </div>
                                                               );
                                                           } else {
                                                               return (
                                                                   <code
                                                                       {...props}
                                                                       className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
                                                                   >
                                                                       {children}
                                                                   </code>
                                                               );
                                                           }
                                                       },
                                                   }}/>
                                </PhotoProvider>

                            </div>
                            <div className={"record-images w-full"}>
                                <div className={"flex w-full flex-row flex-wrap"}>
                                    {
                                        record.imgs !== undefined && record.imgs !== "" &&
                                        JSON.parse(record.imgs).map((imgUrl: string, index: number) => {
                                            return <img key={index} src={imgUrl}
                                                        className={"w-30 h-30 mb-0 hover:cursor-pointer"}
                                                        alt={"loading..."} onClick={() => viewImage(imgUrl)}></img>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            {loading &&
                <div>
                    <span className={"loading loading-dots loading-sm"}></span>
                </div>
            }
            {
                !loading &&
                <div className={"prose divider max-w-full"}>已经到底了🎈🎈🎈</div>
            }
        </div>
    )
}

export {RecordList}