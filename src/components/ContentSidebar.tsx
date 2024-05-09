import React, {useEffect, useState} from "react";

export interface Tag {
    id: number,
    tagName: string,
    createTime: string,
}

interface RecordSidebarProps {
    filter: Function,
    refreshTags: Function,
    tags: Tag[],
    isLoading: boolean,
    total: number
}

export default function ContentSidebar(Props: RecordSidebarProps) {
    const {filter, refreshTags, tags, isLoading = false, total} = Props;

    const [selectedTags, setSelectedTags] = useState<Array<Tag>>([]);
    useEffect(() => {
        refreshTags();
    }, [])

    useEffect(() => {
        filter(selectedTags);
    }, [selectedTags])

    const onclickTag = (tag: Tag) => {
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
        <div
            className={"lg:!flex lg:sticky  z-20 lg:z-1 lg:top-[60px] lg:max-h-80 lg:!w-3/12 lg:!min-w-[15rem] lg:mr-5 side drawer-side "}>
            <label htmlFor="sidbar-drawer" className="drawer-overlay"></label>
            <div
                className={"side-content w-80 bg-base-300 lg:bg-transparent lg:shadow-xl lg:rounded-xl flex h-full lg:pt-0 pt-5 flex-col lg:w-full pl-5 pr-5"}>

                <div className={"prose text-left"}>累计发布了 {total} 条记录😜</div>
                <div className={"mt-5 font-mono text-gray-400 text-left"}>标签</div>
                <div className={"tag-area flex flex-row mt-1 flex-wrap"}>
                    {
                        tags.filter(tag => tag.tagName != "").map(tag => {
                            return (
                                <div key={tag.tagName} className={"pl-1 pr-1"} onClick={() => onclickTag(tag)}>
                                <span
                                    className={"text-blue-500 hover:cursor-pointer"}>{selectedTags.map(tag => tag.tagName)?.includes(tag.tagName) ? tag.tagName + "🎈" : tag.tagName} </span>
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