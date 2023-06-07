import React, {useEffect, useMemo, useRef, useState} from "react";
// import { isNumber, last, uniq } from "lodash";
// import { useTranslation } from "react-i18next";
import RecordEditor from "@/components/recordwall/RecordEditor";
import RecordsData from "@/util/records";
import {get} from "@/util/request";
import {LIST_PUBLIC_RECORD} from "@/util/apis";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

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
        setLoading(true)
        get(LIST_PUBLIC_RECORD, {}).then((res: any) => {
            console.log(res);
            setRecords(res.data);
            setLoading(false)
        });
    }, []);

    const highlightTag = (content: string, tag: string) => {
        tag.split(",").forEach((t) => {
            content = content.replace(t, `<span class="text-blue-500 hover:cursor-pointer">${t}</span>`)
        });
        return content;
    }

    return (
        <div className={"flex flex-row w-full"}>
            <div className={"flex flex-col h-full w-full pl-5 pr-5"}>

                <RecordEditor/>
                <div className={"prose record-line flex flex-col w-full flex-grow"}>
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
                    <div className={"prose divider"}>已经到底了🎈🎈🎈</div>
                }
            </div>


            <div className={"side mr-5 w-2/6"}>
                <div className={"search relative"}>
                    <form>
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search"
                                   className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search..." required/>
                            <button type="submit"
                                    className="absolute btn btn-primary btn-sm right-2.5 bottom-2.5 font-medium ">Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}