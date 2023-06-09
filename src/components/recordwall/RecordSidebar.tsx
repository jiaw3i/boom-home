import React, {useEffect, useState} from "react";
import {get} from "@/util/request";
import {LIST_TAGS} from "@/util/apis";

export interface Tag {
    id: number,
    tagName: string,
    createTime: string,
}

interface RecordSidebarProps {
    filterRecords: Function,
    refreshRecords: Function,
    refreshTags: Function,
    tags: Tag[],
    isLoading: boolean,
}

export default function RecordSidebar(Props: RecordSidebarProps) {
    const {filterRecords, refreshRecords, refreshTags, tags, isLoading = false} = Props;

    const [selectedTags, setSelectedTags] = useState<string[] | undefined>(undefined);
    useEffect(() => {
        refreshTags();
    }, [])

    useEffect(() => {
        if (selectedTags === undefined) {
            return;
        }
        if (selectedTags.length === 0) {
            refreshRecords();
            return;
        }
        filterRecords(selectedTags);
    }, [selectedTags])

    const onclickTag = (tag: string) => {
        if (selectedTags == undefined) {
            setSelectedTags([tag]);
            return;
        }
        if (selectedTags?.includes(tag)) {
            setSelectedTags(selectedTags.filter(item => item !== tag));
            return;
        }
        setSelectedTags([...selectedTags, tag]);
    }
    return (
        <div className={"lg:!flex lg:h-full lg:max-h-full lg:!w-3/12 lg:!min-w-[15rem] lg:mr-5 side drawer-side "}>
            <label htmlFor="record-drawer" className="drawer-overlay"></label>
            <div
                className={"side-content w-80 bg-base-300 lg:bg-transparent lg:shadow-xl lg:rounded-xl flex h-full lg:pt-0 pt-5 flex-col lg:w-full pl-5 pr-5"}>

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
                <div className={"mt-5 font-mono text-gray-400 text-left"}>标签</div>
                <div className={"tag-area flex flex-row mt-1 flex-wrap"}>
                    {
                        tags.map((tag: Tag) => tag.tagName).filter(tag => tag != "").map(tag => {
                            return (
                                <div key={tag} className={"pl-1 pr-1"} onClick={() => onclickTag(tag)}>
                                <span
                                    className={"text-blue-500 hover:cursor-pointer"}>{selectedTags?.includes(tag) ? tag + "🎈" : tag} </span>
                                </div>
                            )
                        })
                    }
                </div>
                {isLoading &&
                    <div>
                        <span className={"loading loading-dots loading-sm"}></span>
                    </div>
                }
            </div>
        </div>
    )
}