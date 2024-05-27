import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {get} from "@/util/request";
import {GET_POST_BY_ID} from "@/util/apis";
import toast from "react-hot-toast";
import {Post} from "@/pages/blog/Blog";
import "./index.css"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from 'rehype-slug'
import remarkGfm from "remark-gfm";
import {Terminal} from "lucide-react";
import CopyButton from "@/components/CopyBtn";
import PostToolBar from "@/pages/blog/PostTool";
import {TOC} from "@/pages/blog/Toc";
import "highlight.js/styles/github-dark.css";
import Giscus from "@giscus/react";
import {BlogSEO} from "@/components/SEO";

export type Heading = {
    level: number,
    title: string | undefined
}

const PostView = (props: any) => {
    const {setTitle} = props
    const {postId, postTitle} = useParams()
    const [post, setPost] = useState<Post>()
    const [showPostNav, setShowPostNav] = useState<boolean>(false)
    const [headings, setHeadings] = useState<Array<Heading>>([])
    // let headings: any = {}
    useEffect(() => {
        // document.title = postTitle as string
        getPostById(postId as string)

    }, []);

    useEffect(() => {
        setTitle(post?.title)
    }, [post]);

    useEffect(() => {
        let inCodeBlock = false;
        let heads: Heading[] | undefined = post?.content
            .split('\n')
            .filter((line) => {
                // 检查是否进入或离开代码块
                if (line.trim().startsWith("```")) {
                    inCodeBlock = !inCodeBlock;
                    return false;
                }
                // 如果在代码块中，跳过这一行
                if (inCodeBlock) {
                    return false;
                }
                // 匹配标题，但要确保它不在代码块中
                return line.match(/#{1,3}\s/);
            })
            .map((line) => {
                const [, level, title]: any = line.match(/(#{1,3})\s(.*)/);
                return {
                    level: level.length,
                    title,
                } as Heading;
            });
        if (heads != undefined) {
            setHeadings(heads)
        }
    }, [post]);

    const getPostById = (id: string) => {
        get(`${GET_POST_BY_ID}/${id}`).then(res => {
            if (!res.success) {
                toast.error(res.message)
                return
            }
            setPost(res.data)
        })
    }
    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <BlogSEO title={post?.title as string} description={post?.description as string}/>
            <div
                className={"post-view lg:px-5 lg:pt-0 flex flex-row max-w-100vw justify-between"}>
                <div className={"post-left flex flex-col lg:w-9/12 px-5"}>

                    <div className={"prose post-header mb-3"}>
                        {/*<div className={"font-bold text-xl"}>{post?.title}</div>*/}
                        <div className={"flex flex-row justify-center"}>
                            <div className={"flex flex-row mr-3"}>
                                <div className={"flex items-center"}>
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <span>发布于{post?.createTime.split(" ")[0]}</span>
                            </div>
                            {
                                post?.tag &&
                                <div className={"post-tag flex flex-row text-gray-400 items-center"}>
                                    {
                                        post.tag.split(",").map(tag => {
                                            return <div key={tag} className={"mr-2 badge  badge-primary w-max"}>
                                    <span className={"w-full"}>
                                    {tag}
                                    </span>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <article id="previewWrap" className={"rounded-md"}>

                        <ReactMarkdown className={"article-body text-left prose prose-invert"}
                                       children={post?.content as string}
                                       rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight as any]}
                                       remarkPlugins={[remarkGfm]}
                                       components={{
                                           h1: ({children}) => {
                                               return (<h1 id={children as string}
                                                           className={"target:pt-20 target:-mt-20"}>{children}</h1>)
                                           },
                                           h2: ({children}) => {
                                               return (<h2 id={children as string}
                                                           className={"target:pt-20 target:-mt-20"}>{children}</h2>)
                                           },
                                           h3: ({children}) => {
                                               return (<h2 id={children as string}
                                                           className={"target:pt-20 target:-mt-20"}>{children}</h2>)
                                           },
                                           img: ({node, ...props}) => {
                                               return <img {...props} alt={"loading..."} className={"lg:max-w-xl"}/>
                                           },
                                           pre: ({children}) => <pre
                                               className="p-0">{children}</pre>,
                                           code: ({node, className, children, ...props}) => {
                                               if (typeof props.inline === "boolean")
                                                   props.inline = props.inline.toString() as any;
                                               const match = /language-(\w+)/.exec(className || "");
                                               if (!props?.inline) {
                                                   const id = Math.random().toString(36).substr(2, 9);
                                                   return (
                                                       <div className="rounded-md">
                                                           <div
                                                               className="flex h-9 items-center justify-between px-4 bg-neutral-600">
                                                               <div className="flex items-center gap-2 font-bold">
                                                                   <Terminal size={18}/> {match ? match[1] : ""}
                                                               </div>
                                                               <CopyButton id={id}/>
                                                           </div>
                                                           <div className="font-lxgw">
                                                               <div id={id}
                                                                    className="whitespace-pre-wrap [word-break:break-word] px-4 py-1">
                                                                   {children}
                                                               </div>
                                                           </div>
                                                       </div>
                                                   );
                                               } else {
                                                   return (
                                                       <code {...props}
                                                             className="prose whitespace-pre-wrap rounded px-1 font-lxgw text-sm">
                                                           {children}
                                                       </code>
                                                   );
                                               }
                                           }
                                       }}/>
                    </article>


                    {/*<div className={"max-w-full lg:w-[70vw]"}>*/}
                    <div className={"w-full flex justify-center"}>
                        <div className={"divider w-full prose"}>正文结束</div>
                    </div>
                    <ul className={"prose w-full mb-3 post-copyright text-left border-solid border-2 rounded-md border-zinc-400 p-2 bg-base-200"}>
                        <li className={"m-0"}><strong>文章作者：</strong>Jackway</li>
                        <li className={"m-0"}><strong>文章地址：</strong><a
                            href={`https://6lazi.com/blog/${post?.id}`}>https://6lazi.com/blog/{post?.id}</a></li>
                        <li className={"m-0"}><strong>版权声明：</strong>本文采用
                            <a rel="license"
                               href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                               target="_blank"
                               title="Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)">CC
                                BY-NC-ND 4.0</a>
                            许可协议。转载请注明出处。
                        </li>
                    </ul>

                    <Giscus repo={"jiaw3i/giscus-comments"}
                            repoId={"R_kgDOL5nykw"}
                            mapping={"title"}
                            category="Announcements"
                            categoryId="DIC_kwDOL5nyk84CfQ17"
                            strict="0"
                            reactionsEnabled="1"
                            emitMetadata="0"
                            inputPosition="top"
                            theme="light"
                            lang="zh-CN"
                            loading="lazy"/>
                </div>

                {headings.length > 0 && <TOC showToc={showPostNav} headings={headings}></TOC>}
                <PostToolBar setShowPostNav={setShowPostNav} showPostNav={showPostNav}></PostToolBar>
            </div>
        </>

    )
}


export default PostView;