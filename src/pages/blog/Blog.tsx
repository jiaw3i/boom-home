import PostItem from "@/pages/blog/PostItem";
import React, {useState} from "react";
import {UseUserStore} from "@/store/UserInfoStore";
import {get} from "@/util/request";
import ContentSidebar, {Tag} from "@/components/recordwall/ContentSidebar";
import {LIST_TAGS} from "@/util/apis";
import RecordEditor from "@/components/recordwall/RecordEditor";
import {RecordList} from "@/components/recordwall/RecordList";


const Blog = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [tagLoading, setTagLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([{
        id: 1,
        tagName: "第一个",
        createTime: "s"
    }, {
        id: 2,
        tagName: "第二个",
        createTime: "s"
    }, {
        id: 3,
        tagName: "第三个",
        createTime: "s"
    }]);
    const [posts, setPosts] = useState<Array<Post>>([
        {
            id: "1",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "第一个,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "2",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "3",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "4",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,第一个",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "5",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
    ])
    const [allPosts, setAllPosts] = useState<Array<Post>>([
        {
            id: "1",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "第一个,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "2",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "3",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "4",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,第一个",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
        {
            id: "5",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
    ])

    const refreshTags = () => {
        // setTagLoading(true);
        // get(LIST_TAGS, {}).then((res: any) => {
        //     setTags(res.data);
        //     setTagLoading(false);
        // });
    }

    const filterPost = (tags: Array<string>) => {
        setLoading(true)
        let filterPosts = posts.filter((post: Post) => {
            let recordTags = post.tag.split(",");
            // recordTags和tags有无并集
            for (let i = 0; i < recordTags.length; i++) {
                for (let j = 0; j < tags.length; j++) {
                    if (recordTags[i] === tags[j]) {
                        return true;
                    }
                }
            }
            return false;
        });
        setPosts([...filterPosts]);
        setLoading(false);
    }
    const categories = ["哈哈", "asddasd", "哈哈", "asddasd", "哈哈", "asddasd"]
    return (
        <div
            className={"drawer drawer-end lg:drawer-open p-10 pt-0 flex flex-row flex-grow w-full h-full max-h-fit overflow-scroll no-scrollbar"}>
            <input id="sidbar-drawer" type="checkbox" className="drawer-toggle"/>
            <div className={"flex flex-col w-full pl-5 pr-5 max-h-full overflow-scroll no-scrollbar"}>
                <div className={"flex flex-row justify-between mb-2 pb-1 lg:hidden"}>
                    <div className={"font-bold text-2xl prose"}>✍️</div>
                    <label htmlFor="sidbar-drawer" className="drawer-button hover:cursor-pointer prose">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </label>
                </div>
                {
                    posts.map(post => {
                        return <PostItem post={post}/>
                    })
                }
                <div className={"flex flex-row justify-between"}>
                    <button className="join-item btn">上一页</button>
                    <div className={"bg-transparent prose flex flex-col justify-center"}>
                    <span>
                        1/14
                    </span>
                    </div>
                    <button className="join-item btn">下一页</button>
                </div>
            </div>
            <ContentSidebar isLoading={tagLoading} tags={tags} refreshTags={refreshTags} filter={filterPost}
                            allDate={allPosts} setDate={setPosts}/>
        </div>
    )
}


export default Blog;

export type Post = {
    id: string,
    title: string,
    desc: string,
    tag: string,
    createTime: string,
    updateTime: string
    // 原创 or 转载
    type: string
}