import {useEffect, useState} from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import "./index.css"
import {useForm} from "react-hook-form";
import {Post} from "@/pages/blog/Blog";

const EditPost = () => {
    const [vd, setVd] = useState<Vditor>();
    // const {editPost} = props;
    const editPost: Post = {} as Post
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<Post>();
    useEffect(() => {
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
                url: "http://localhost:8080/",
                max: 1024 * 1024 * 100,
            },
            after: () => {
                vditor.setValue("");
                setVd(vditor);
            },
        });
        if (editPost != undefined) {
            setValue("id", editPost.id)
            setValue("title", editPost.title)
            setValue("desc", editPost.desc)
            setValue("tag", editPost.tag)
        }
        // Clear the effect
        return () => {
            vd?.destroy();
            setVd(undefined);
        };
    }, []);

    const formSubmit = (data: any) => {
        const content = vd?.getValue()
        console.log(content)
        console.log(data)
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
                            <textarea  {...register("desc")}
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