import React, {useEffect, useMemo, useRef, useState} from "react";
import RecordEditor from "@/components/recordwall/RecordEditor";
import {get} from "@/util/request";
import {DELETE_RECORD, LIST_ALL_RECORD, LIST_PUBLIC_RECORD} from "@/util/apis";
import {Simulate} from "react-dom/test-utils";
import RecordSidebar from "@/components/recordwall/RecordSidebar";
import {UseUserStore} from "@/store/UserInfoStore";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {RecordList} from "@/components/recordwall/RecordList";

export interface RecordInfo {
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
    const [isLogin, setIsLogin] = useState<boolean>();
    useEffect(() => {
        console.log(username);
        if (username === "jiawei.me@hotmail.com") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [username])

    useEffect(() => {
        if (isLogin !== undefined) {
            console.log(isLogin)
            refreshRecords()
        }
    }, [isLogin]);

    const refreshRecords = () => {
        setLoading(true)
        let api = isLogin ? LIST_ALL_RECORD : LIST_PUBLIC_RECORD;
        get(api, {}).then((res: any) => {
            if (res.success) {
                setRecords(res.data);
            }
            setLoading(false)
        });
    }


    return (
        <div className={"flex flex-row flex-grow w-full h-full max-h-fit overflow-scroll no-scrollbar"}>
            <div className={"flex flex-col w-full pl-5 pr-5 max-h-full overflow-scroll no-scrollbar"}>

                <RecordEditor refreshRecords={refreshRecords}/>
                <RecordList loading={loading} records={records} refreshRecords={refreshRecords}></RecordList>
                {
                    !loading &&
                    <div className={"prose divider max-w-full"}>已经到底了🎈🎈🎈</div>
                }
            </div>
            <RecordSidebar/>
        </div>

    );
}