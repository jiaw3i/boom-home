import React, {useEffect, useMemo, useRef, useState} from "react";
import RecordEditor from "@/components/recordwall/RecordEditor";
import {get} from "@/util/request";
import {DELETE_RECORD, LIST_ALL_RECORD, LIST_PUBLIC_RECORD} from "@/util/apis";
import {Simulate} from "react-dom/test-utils";
import RecordSidebar from "@/components/recordwall/RecordSidebar";
import {UseUserStore} from "@/store/UserInfoStore";
import toast from "react-hot-toast";

interface RecordInfo {
    id: number,
    content: string,
    permission: number,
    tag: string,
    createTime: string,
}

export default function RecordWall() {

    const [records, setRecords] = useState<RecordInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const username = UseUserStore((state) => state.username);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    useEffect(() => {
        refreshRecords()
    }, [isLogin]);

    useEffect(() => {
        if (username === "jiawei.me@hotmail.com") {
            setIsLogin(true)
        }
    }, [username])

    const refreshRecords = () => {
        setLoading(true)
        let api = isLogin ? LIST_ALL_RECORD : LIST_PUBLIC_RECORD;
        get(api, {}).then((res: any) => {
            setRecords(res.data);
            setLoading(false)
        });
    }
    const highlightTag = (content: string, tag: string) => {
        tag.split(",").forEach((t) => {
            content = content.replace(t, `<span class="text-blue-500 hover:cursor-pointer">${t}</span>`)
        });
        return content;
    }
    const deleteRecord = (record: RecordInfo) => {
        let elementById = document.getElementById("record-item-" + record.id);
        elementById?.blur();
        get(DELETE_RECORD, {id: record.id}).then((res: any) => {
            if (res.success) {
                refreshRecords();
                toast.success("Delete Success");
            }
        })
    }

    return (
        <div className={"flex flex-row flex-grow w-full h-full max-h-fit overflow-scroll no-scrollbar"}>
            <div className={"flex flex-col w-full pl-5 pr-5 max-h-full overflow-scroll no-scrollbar"}>

                <RecordEditor refreshRecords={refreshRecords}/>
                <div className={"prose record-line flex flex-col w-full max-w-full max-h-fit flex-grow"}>
                    {
                        records.map((record) =>
                            (
                                <div key={record.id}
                                     className={"text-left record-line-item flex flex-col bg-base-300 shadow-xl rounded-xl justify-between items-center p-2 mb-5"}>
                                    <div className={"flex flex-row w-full"}>
                                        <div
                                            className={"time text-left font-mono text-gray-500 flex-grow"}>{record.createTime.replace("T", " ")}
                                        </div>
                                        <div className={"dropdown dropdown-left"}>
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
                                                <li className={"p-0"} onClick={() => {deleteRecord(record)}}>
                                                    <div>删除</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={"divider m-0"}></div>
                                    <div dangerouslySetInnerHTML={{__html: highlightTag(record.content, record.tag)}}
                                         className={"w-full text-left"}></div>
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

                {
                    !loading &&
                    <div className={"prose divider max-w-full"}>已经到底了🎈🎈🎈</div>
                }
            </div>
            <RecordSidebar/>
        </div>

    );
}