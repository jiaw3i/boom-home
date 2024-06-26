import PostItem from "@/pages/blog/PostItem";
import React, {useEffect, useState} from "react";
import {get, post} from "@/util/request";
import ContentSidebar, {Tag} from "@/components/ContentSidebar";
import {LIST_POST, LIST_TAGS} from "@/util/apis";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import Loader from "@/components/Loader";
import {PageSEO} from "@/components/SEO";


const Blog = (props: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [tagLoading, setTagLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [posts, setPosts] = useState<Array<Post>>([])
    const pageSize = 10
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)
    const {setTitle} = props
    useEffect(() => {
        setTitle("文章列表")
    }, []);

    // 请求获取列表
    useEffect(() => {
        getPosts()
        getTags()
    }, [page]);

    const getPosts = (options?: any) => {
        post(LIST_POST, {page: page, pageSize: pageSize, ...options}).then((res: any) => {
            setPosts(res.data.posts)
            setTotal(res.data.total)
            setTotalPage(Math.ceil(res.data.total / pageSize))
        });
    }

    const getTags = () => {
        get(LIST_TAGS, {type: "post"}).then((res: any) => {
            setTags(res.data);
        });
    }

    const filterPost = (tags: Array<Tag>) => {
        setLoading(true)
        getPosts({tags: tags})
        setLoading(false);
    }

    return (
        <>
            <PageSEO title={"文章列表"} description={"文章列表"}/>
            <div
                className={"drawer drawer-end lg:drawer-open lg:px-10 lg:mt-2 pt-0 flex flex-row w-full"}>
                <input id="sidbar-drawer" type="checkbox" className="drawer-toggle"/>

                {
                    !posts.length ? <Loader/> :
                        <div className={"flex flex-col w-full px-5 "}>
                            <div className={"post-links"}>

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
                                        return <Link key={post.id} to={`${post.id.toString()}`}>
                                            <PostItem post={post}/>
                                        </Link>
                                    })
                                }
                            </div>
                            <div className={"flex flex-row justify-between mt-2"}>
                                <button className="join-item btn" onClick={() => {
                                    if (page > 1) {
                                        setPage(page - 1);
                                    } else {
                                        toast("已经是第一页了")
                                    }
                                }}>上一页
                                </button>

                                <div className={"bg-transparent prose flex flex-col justify-center"}>
                    <span>
                        {page}/{totalPage}
                    </span>
                                </div>
                                <button className="join-item btn" onClick={() => {
                                    if (page < totalPage) {
                                        setPage(page + 1);
                                    } else {
                                        toast("已经是最后一页了")
                                    }
                                }}>下一页
                                </button>
                            </div>
                        </div>
                }
                <ContentSidebar isLoading={tagLoading} tags={tags} refreshTags={getTags} filter={filterPost}
                                total={total}
                                type={"blog"}/>
            </div>
        </>

    )
}


export default Blog;

export type Post = {
    id: string,
    title: string,
    description?: string,
    content: string,
    publish: string,
    tag: string,
    createTime: string,
    updateTime: string
    // 原创 or 转载
    // type: string
}