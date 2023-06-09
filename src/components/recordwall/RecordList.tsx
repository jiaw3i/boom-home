import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React from "react";
import {RecordInfo} from "@/components/recordwall/RecordWall";
import {get} from "@/util/request";
import {DELETE_RECORD} from "@/util/apis";
import toast from "react-hot-toast";

interface RecordListProps {
    records: RecordInfo[],
    loading: boolean,
    isLogin: boolean | undefined,
    refreshRecords: () => void,
}

const RecordList = (props: RecordListProps) => {
    const {records, loading, isLogin, refreshRecords} = props;
    const highlightTag = (content: string, tag: string) => {
        if (tag === "") {
            return content;
        }
        tag.split(",").forEach((t) => {
            content = content.replace(t, `<span class="text-blue-500 hover:cursor-pointer">${t}</span>`)
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
                toast.dismiss(toastId);
                toast.success("Delete Success");
            } else {
                toast.dismiss(toastId);
                toast.error("Delete Failed,Try again later,Please!")
            }
        })
    }

    return (
        <div className={"prose record-line flex flex-col w-full max-w-full flex-grow"}>
            {
                records.map((record: RecordInfo) =>
                    (
                        <div key={record.id}
                             className={"text-left record-line-item flex flex-col bg-base-300 shadow-xl rounded-xl justify-between items-center p-2 mb-5"}>
                            <div className={"flex flex-row w-full"}>
                                <div
                                    className={"time text-left font-mono text-gray-500 flex-grow"}>{record.createTime.replace("T", " ")}
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
                                className={"w-full"}>
                                <ReactMarkdown className={"not-prose"}
                                               children={highlightTag(record.content, record.tag)}
                                               rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}></ReactMarkdown>
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
        </div>
    )
}

export {RecordList}