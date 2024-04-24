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
    allDate: Array<any>,
    setDate: Function,
}

export default function ContentSidebar(Props: RecordSidebarProps) {
    const {filter, allDate, refreshTags, tags, isLoading = false, setDate} = Props;

    const [selectedTags, setSelectedTags] = useState<string[] | undefined>(undefined);
    useEffect(() => {
        refreshTags();
    }, [])

    useEffect(() => {
        if (selectedTags === undefined) {
            return;
        }
        if (selectedTags.length === 0) {
            setDate([...allDate]);
            return;
        }
        filter(selectedTags);
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
            <label htmlFor="sidbar-drawer" className="drawer-overlay"></label>
            <div
                className={"side-content w-80 bg-base-300 lg:bg-transparent lg:shadow-xl lg:rounded-xl flex h-full lg:pt-0 pt-5 flex-col lg:w-full pl-5 pr-5"}>

                <div className={"prose text-left"}>累计发布了 {allDate.length} 条记录😜</div>
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