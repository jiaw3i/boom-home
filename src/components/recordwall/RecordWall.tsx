import React, {useEffect, useMemo, useRef, useState} from "react";
import RecordEditor from "@/components/recordwall/RecordEditor";
import {get, post} from "@/util/request";
import {DELETE_RECORD, LIST_ALL_RECORD, LIST_PUBLIC_RECORD, LIST_RECORD_BY_TAG, LIST_TAGS} from "@/util/apis";
import {Simulate} from "react-dom/test-utils";
import RecordSidebar, {Tag} from "@/components/recordwall/RecordSidebar";
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

export default function RecordWall(props: any) {

    const {setImgUrl} = props;
    const [records, setRecords] = useState<RecordInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tagLoading, setTagLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);
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
            refreshRecords()
        }
    }, [isLogin]);

    const refreshRecords = () => {
        setLoading(true)
        setRecords([])
        get(LIST_ALL_RECORD, {}).then((res: any) => {
            if (res.success) {
                setRecords(res.data);
            }
            setLoading(false)
        });
    }

    const filterRecords = (tags: Array<string>) => {
        setLoading(true)
        setRecords([])
        post(LIST_RECORD_BY_TAG, {
            "tags": tags
        }).then((res: any) => {
            if (res.success) {
                setRecords(res.data);
            }
            setLoading(false)
        });
    }

    const refreshTags = () => {
        setTagLoading(true);
        get(LIST_TAGS, {}).then((res: any) => {
            setTags(res.data);
            setTagLoading(false);
        });
    }
    return (
        <div
            className={"drawer drawer-end lg:drawer-open flex flex-row flex-grow w-full h-full max-h-fit overflow-scroll no-scrollbar"}>
            <input id="record-drawer" type="checkbox" className="drawer-toggle"/>
            <div className={"flex flex-col w-full pl-5 pr-5 max-h-full overflow-scroll no-scrollbar"}>
                <div className={"flex flex-row justify-between mb-1 pb-1 lg:hidden"}>
                    <div className={"font-bold text-2xl prose"}>✍️👀💻📓</div>
                    <label htmlFor="record-drawer" className="drawer-button">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </label>
                </div>
                {isLogin && <RecordEditor refreshRecords={refreshRecords} refreshTags={refreshTags}/>}
                <RecordList isLogin={isLogin} loading={loading} records={records}
                            refreshRecords={refreshRecords}
                            refreshTags={refreshTags}
                            setImgUrl={setImgUrl}
                />
            </div>
            <RecordSidebar isLoading={tagLoading} tags={tags} refreshTags={refreshTags} filterRecords={filterRecords}
                           refreshRecords={refreshRecords}/>
        </div>

    );
}