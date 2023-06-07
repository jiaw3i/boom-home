import React, {useEffect, useMemo, useRef, useState} from "react";
// import { isNumber, last, uniq } from "lodash";
// import { useTranslation } from "react-i18next";
import RecordEditor from "@/components/recordwall/RecordEditor";
import RecordsData from "@/util/records";
import {get} from "@/util/request";
import {LIST_PUBLIC_RECORD} from "@/util/apis";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import RecordSidebar from "@/components/recordwall/RecordSidebar";

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

    useEffect(() => {
        refreshRecords()
    }, []);

    const refreshRecords = () => {
        setLoading(true)
        get(LIST_PUBLIC_RECORD, {}).then((res: any) => {
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

    return (
        <div className={"flex flex-row flex-grow w-full h-full max-h-fit overflow-scroll no-scrollbar"}>
            <div className={"flex flex-col w-full pl-5 pr-5 max-h-full overflow-scroll no-scrollbar"}>

                <RecordEditor  refreshRecords={refreshRecords}/>
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
                                        <div className={"btn btn-xs p-0 bg-transparent border-0 hover:bg-base-200"}>
                                            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="1"/>
                                                <circle cx="12" cy="5" r="1"/>
                                                <circle cx="12" cy="19" r="1"/>
                                            </svg>
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