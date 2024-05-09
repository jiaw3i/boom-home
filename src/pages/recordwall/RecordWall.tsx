import React, {useEffect, useMemo, useRef, useState} from "react";
import RecordEditor from "@/pages/recordwall/RecordEditor";
import {get, post} from "@/util/request";
import {LIST_ALL_RECORD, LIST_TAGS} from "@/util/apis";
import ContentSidebar, {Tag} from "@/components/ContentSidebar";
import {UseUserStore} from "@/store/UserInfoStore";
import {RecordList} from "@/pages/recordwall/RecordList";

export interface RecordInfo {
    id: number,
    content: string,
    permission: number,
    tag: string,
    createTime: string,
    imgs: string,
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
        if (username === "jiawei.me@hotmail.com") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [username])

    useEffect(() => {
        if (isLogin !== undefined) {
            getRecords()
        }
    }, [isLogin]);

    const getRecords = (options?: any) => {
        setLoading(true)
        setRecords([])
        post(LIST_ALL_RECORD, {...options}).then((res: any) => {
            if (res.success) {
                setRecords(res.data);
            }
            setLoading(false)
        });
    }

    const filterRecords = (tags: Array<Tag>) => {
        setLoading(true)
        getRecords({tags: tags})
        setLoading(false);
    }

    const refreshTags = () => {
        setTagLoading(true);
        get(LIST_TAGS, {"type": "record"}).then((res: any) => {
            setTags(res.data);
            setTagLoading(false);
        });
    }
    return (
        <div
            className={"drawer drawer-end lg:drawer-open flex flex-row flex-grow w-full h-full max-h-full"}>
            <input id="sidbar-drawer" type="checkbox" className="drawer-toggle"/>
            <div className={"flex flex-col w-full pl-5 pr-5 max-h-full"}>
                <div className={"flex flex-row justify-between mb-1 pb-1 lg:hidden"}>
                    <div className={"font-bold text-2xl prose"}>✍️👀💻</div>
                    <label htmlFor="sidbar-drawer" className="drawer-button hover:cursor-pointer prose">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </label>
                </div>
                {isLogin && <RecordEditor tags={tags} refreshRecords={getRecords} refreshTags={refreshTags}/>}
                <RecordList isLogin={isLogin} loading={loading} records={records}
                            refreshRecords={getRecords}
                            refreshTags={refreshTags}
                            setImgUrl={setImgUrl}
                />
            </div>
            <ContentSidebar isLoading={tagLoading} tags={tags} refreshTags={refreshTags} filter={filterRecords}
                            total={records.length}/>
        </div>

    );
}