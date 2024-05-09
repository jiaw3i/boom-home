import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {get} from "@/util/request";
import {GET_POST_BY_ID} from "@/util/apis";
import toast from "react-hot-toast";
import {Post} from "@/pages/blog/Blog";
import Vditor from "vditor";
import "./index.css"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from 'rehype-slug'
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import {Terminal} from "lucide-react";
import CopyButton from "@/components/CopyBtn";
import PostToolBar from "@/pages/blog/PostTool";
import {TOC} from "@/pages/blog/Toc";

export type Heading = {
    level: number,
    title: string | undefined
}

const PostView = () => {

    const {postId} = useParams()
    const [post, setPost] = useState<Post>()
    const [showPostNav, setShowPostNav] = useState<boolean>(false)
    const [headings, setHeadings] = useState<Array<Heading>>([])
    // let headings: any = {}
    useEffect(() => {
        getPostById(postId as string)
    }, []);

    useEffect(() => {
        let heads: Heading[] | undefined = post?.content
            .split('\n')
            .filter((line) => line.match(/#{1,3}\s/))
            .map((line) => {
                const [, level, title]: any = line.match(/(#{1,3})\s(.*)/)
                return {
                    level: level.length,
                    title,
                } as Heading
            })
        if (heads != undefined) {
            setHeadings(heads)
        }
        console.log(heads)
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


    return (
        <div
            className={"post-view px-5 lg:pt-0 flex flex-col w-full items-center"}>
            <div className={"prose post-header lg:w-[70%] mb-3"}>
                <div className={"font-bold text-xl"}>{post?.title}</div>
                <div className={"flex flex-row justify-center"}>
                    <div className={"flex flex-row mr-3"}>
                        <div className={"flex items-center"}>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <span>发表于{post?.createTime.split(" ")[0]}</span>
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
                {/*<div className={"divider mt-0"}></div>*/}
            </div>

            <div id="previewWrap" className={"rounded-md lg:w-[70%]"}>

                <ReactMarkdown className={"text-left prose max-w-full prose-invert"}
                               children={post?.content as string}
                               rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight as any]}
                               remarkPlugins={[remarkGfm]}

                               components={{
                                   h1: ({children, node, ...props}) => {
                                       return (<h1 id={children as string} className={"target:pt-20 target:-mt-20"}>{children}</h1>)
                                   },
                                   h2: ({children, node, ...props}) => {
                                       return (<h2 id={children as string} className={"target:pt-20 target:-mt-20"}>{children}</h2>)
                                   },
                                   img: ({node, ...props}) => {
                                       return <img {...props} alt={"loading..."} className={"lg:max-w-xl"}/>
                                   },
                                   pre: ({children}) => <pre
                                       className="p-0 w-full max-w-full overflow-x-hidden">{children}</pre>,
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
                                                   <div className="overflow-x-auto font-lxgw">
                                                       <div id={id}
                                                            className="whitespace-pre-wrap pl-4 pr-4 pt-1 pb-1">
                                                           {children}
                                                       </div>
                                                   </div>
                                               </div>
                                           );
                                       } else {
                                           return (
                                               <code {...props}
                                                     className="prose rounded bg-gray-200 px-1 font-lxgw text-sm dark:bg-zinc-900">
                                                   {children}
                                               </code>
                                           );
                                       }
                                   }
                               }}/>
            </div>
            <TOC showToc={showPostNav} headings={headings}></TOC>

            {/*<div className={"max-w-full lg:w-[70vw]"}>*/}
            <div className={"w-full lg:w-auto"}>
                <div className={"divider w-full lg:w-[70%] prose"}>正文结束</div>
            </div>
            <ul className={"prose w-full lg:w-[70%] mb-3 post-copyright text-left border-solid border-2 rounded-md border-zinc-400 p-2 bg-base-200"}>
                <li className={"m-0"}><strong>文章作者：</strong>Jiawei</li>
                <li className={"m-0"}><strong>文章地址：</strong>https://tnbai.com/blog/{post?.id}</li>
                <li className={"m-0"}><strong>版权声明：</strong>本文采用
                    <a rel="license"
                       href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                       target="_blank"
                       title="Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)">CC
                        BY-NC-ND 4.0</a>
                    许可协议。转载请注明出处。
                </li>
            </ul>
            <PostToolBar setShowPostNav={setShowPostNav} showPostNav={showPostNav}></PostToolBar>
        </div>
    )
}


export default PostView;