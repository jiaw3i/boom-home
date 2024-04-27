import {useEffect, useState} from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./index.css"
import {useForm} from "react-hook-form";
import {Post} from "@/pages/blog/Blog";
import {get, post, Result} from "@/util/request";
import {GET_POST_BY_ID, PUBLISH_POST} from "@/util/apis";
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";

const EditPost = () => {
    const [vd, setVd] = useState<Vditor>();
    // const {editPost} = props;
    const [editPost, setEditPost] = useState<Post>()
    const navigate = useNavigate()
    const {postId} = useParams()
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Post>();
    useEffect(() => {
        if (postId != null) {
            getPostById(postId)
        }
        const vditor = new Vditor("vditor", {
            toolbar: [
                "emoji",
                "strike",
                "link",
                "|",
                "check",
                "|",
                "line",
                "code",
                "inline-code",
                "|",
                "upload",
                "table",
                "|",
                "fullscreen",
                "edit-mode",
                {
                    name: "more",
                    toolbar: [
                        "both",
                        "code-theme",
                        "content-theme",
                        "export",
                        "outline",
                        "preview",
                        "devtools",
                        "info",
                        "help",
                    ],
                },
            ],
            height: "85vh",
            upload: {
                url: "/api/file/upload",
                multiple: false,
                fieldName: "file",
                max: 1024 * 1024 * 100,
                format(files: File[], responseText: string): string {
                    let filename = files[0].name;
                    let response = JSON.parse(responseText);
                    let res = {
                        "msg": response.message,
                        "code": 0,
                        "data": {
                            "errFiles": [],
                            "succMap": {
                                [filename]: response.data
                            }
                        }
                    };
                    return JSON.stringify(res);
                }
            },
            after: () => {
                if (editPost != null) {
                    vditor.setValue(editPost.content as string);
                } else {
                    vditor.setValue("");
                }
                setVd(vditor);
                vditor.focus();
            },
        });

        // Clear the effect
        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);

    useEffect(() => {
        if (editPost != undefined) {
            setValue("id", editPost.id)
            setValue("title", editPost.title)
            setValue("description", editPost.description)
            setValue("tag", editPost.tag)
            vd?.setValue(editPost.content as string)
        }
    }, [editPost]);

    const getPostById = (id: string) => {
        get(`${GET_POST_BY_ID}/${id}`).then(res => {
            if (!res.success) {
                toast.error(res.message)
                return
            }
            setEditPost(res.data)
        })
    }

    const formSubmit = (data: any) => {
        const content = vd?.getValue()
        let pubPost: Post = {...data}
        if (content == undefined || content.length == 1) {
            toast.error("文章内容不能为空！")
            return
        }
        pubPost.content = content

        post(PUBLISH_POST, pubPost).then((res) => {
            if (!res.success) {
                toast.error(res.message)
                return
            }
            toast.success(res.message)
            // navigate("post/")
        })
    }
    return (
        <div className={"edit-blog w-full h-full  flex lg:flex-row flex-col-reverse"}>
            <div className={"post-editor lg:w-5/6 p-5 pt-0 overflow-y-scroll no-scrollbar"}>
                <div id={"vditor"} className="vditor text-left font-lxgw"/>
            </div>
            <div className={"post-form p-5 pt-0 lg:p-0 lg:pr-5 "}>
                <form id={"post-form"} onSubmit={handleSubmit(formSubmit)}>
                    <div className={"flex lg:flex-col flex-row flex-wrap"}>
                        <div className={"w-40"}>
                            <label className="label ">
                                <span className="label-text">标题</span>
                            </label>
                            <input type="text" {...register("title", {required: true})}
                                   placeholder="文章标题" className="input input-bordered w-full"/>
                            {errors.title && <p className={"text-red-500"}>title is required.</p>}
                        </div>

                        <div className={"w-40"}>
                            <label className="label">
                                <span className="label-text">标签</span>
                            </label>
                            <input type="text" {...register("tag")}
                                   placeholder="标签" className="input input-bordered w-full"/>
                        </div>
                        <div className={"lg:w-40 w-full lg:mr-5"}>
                            <label className="label">
                                <span className="label-text">文章描述</span>
                            </label>
                            <textarea  {...register("description")}
                                       placeholder="文章描述"
                                       className="overflow-visible textarea textarea-bordered no-scrollbar w-full"/>
                        </div>

                    </div>
                    <div className={"flex flex-row justify-start mt-5"}>
                        <input type={"submit"} value={"发布"} className={"btn btn-primary"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPost;