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
import remarkGfm from "remark-gfm";
import {Terminal} from "lucide-react";
import CopyButton from "@/components/CopyBtn";

const PostView = () => {

    const {postId} = useParams()
    const [post, setPost] = useState<Post>()

    useEffect(() => {

        getPostById(postId as string)
    }, []);

    useEffect(() => {
        // renderMDToPreview()
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
        <div className={"post-view p-5 pt-0 flex flex-col w-full items-center overflow-scroll no-scrollbar"}>
            <div className={"prose post-header lg:w-[70vw] mb-3"}>
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

            <div id="previewWrap" className={" rounded-md overflow-scroll no-scrollbar lg:w-[70vw]"}>

                <ReactMarkdown className={"text-left prose max-w-full prose-invert"}
                               children={post?.content as string}
                               rehypePlugins={[rehypeRaw, rehypeHighlight as any]}
                               remarkPlugins={[remarkGfm]}
                               components={{
                                   img: ({node, ...props}) => {
                                       return <img {...props} alt={"loading..."}/>
                                   },
                                   pre: ({children}) => <pre
                                       className="p-0 w-full max-w-full overflow-x-hidden">{children}</pre>,
                                   code: ({node, className, children, ...props}) => {

                                       if (typeof props.inline === "boolean")
                                           props.inline = props.inline.toString() as any;
                                       // const match = /language-(\w+)/.exec(className || "");
                                       if (!props?.inline) {
                                           const id = Math.random().toString(36).substr(2, 9);
                                           return (
                                               <div className="rounded-md">
                                                   <div
                                                       className="flex h-9 items-center justify-between px-4 bg-neutral-600">
                                                       <div className="flex items-center gap-2">
                                                           <Terminal size={18}/>
                                                       </div>
                                                       <CopyButton id={id}/>
                                                   </div>
                                                   <div className="overflow-x-auto">
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
                                                     className="not-prose rounded bg-gray-200 px-1 font-lxgw dark:bg-zinc-900">
                                                   {children}
                                               </code>
                                           );
                                       }
                                   }
                               }}/>
            </div>
        </div>
    )
}


export default PostView;