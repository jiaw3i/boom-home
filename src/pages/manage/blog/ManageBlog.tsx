import {useForm} from "react-hook-form"
import request, {get, post} from "../../../util/request";
import {useEffect, useState} from "react";
import {Post} from "@/pages/blog/Blog";
import {useNavigate} from "react-router-dom";

type Inputs = {
    id:string,
    title: string,
    desc: string,
    tag: string
};
export default function ManageBLog() {
    const [posts, setPosts] = useState<Array<Post>>([
        {
            id: "1",
            title: "原创文章",
            desc: "原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章原创文章",
            cover: "OIP.jpg",
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
            cover: "OIP.jpg",
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
            cover: "OIP.jpg",
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
            cover: "OIP.jpg",
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
            cover: "OIP.jpg",
            tag: "标签a,技术",
            createTime: "2024-04-24 13:24:11",
            updateTime: "2024-04-24 13:24:11",
            // 原创 or 转载
            type: "原创"
        },
    ])
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [editPost, setEditPost] = useState<Post>({} as any);
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        values: {
            id: editPost.id,
            title: editPost.title,
            desc: editPost.desc,
            tag: editPost.tag
        }
    });
    // 页面载入时 请求获取项目列表
    // useEffect(() => {
    //     post("/api/project/list", {}).then((res: any) => {
    //         console.log(res);
    //         setPosts(res.data);
    //     });
    // }, []);
    const formSubmit = (data: any) => {
        editPost.id = data.id;
        // message.info("hello", 1500);
        post("/api/project/update", editPost).then((res:any) => {
            if (res.success){
                post("/api/project/list", {}).then((res: any) => {
                    setPosts(res.data);
                });
            }
        });
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <div className={"manage project drawer h-full  drawer-end"}>
            <input checked={isDrawerOpen} id="post-form-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <div>
                    <div className={"btn font-bold text-2xl"} onClick={()=>navigate("edit")}>新增文章</div>
                </div>
                <div className="divider"></div>
                <div className="overflow-x-auto pl-10 pr-10">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th className={"w-50"}>标题</th>
                            <th className={"w-1/3"}>描述</th>
                            <th>标签</th>
                            <th>创建时间</th>
                            <th>更新时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <th>{post.id}</th>
                                        <th>{post.title}</th>
                                        <th>{post.desc}</th>
                                        <th>{post.tag}</th>
                                        <th>{post.createTime}</th>
                                        <th>{post.updateTime}</th>
                                        <td>
                                            <label onClick={() => {
                                                setEditPost(post);
                                                setIsDrawerOpen(true);
                                            }}
                                                   htmlFor={"post-form-drawer"}
                                                   className={"btn btn-sm btn-primary"}
                                            >Edit</label>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="drawer-side no-scrollbar">
                <label key={editPost.id} htmlFor="post-form-drawer" className="drawer-overlay" ></label>
                <ul className="menu p-4 w-80 bg-base-100 h-full text-base-content">
                    <form id={"productForm"} onSubmit={handleSubmit(formSubmit)}>
                        <label className="label">
                            <span className="label-text">标题</span>
                            <span className="label-text-alt">必填项</span>
                        </label>
                        <input type="text" {...register("title", {required: true})}
                               placeholder="文章标题" className="input input-bordered w-full max-w-xs"/>
                        {errors.title && <p className={"text-red-500"}>title is required.</p>}
                        <label className="label">
                            <span className="label-text">文章描述</span>
                            <span className="label-text-alt">post desc</span>
                        </label>
                        <textarea  {...register("desc")}
                               placeholder="文章描述" className="overflow-visible textarea textarea-bordered no-scrollbar w-full max-w-xs "/>
                        <label className="label">
                            <span className="label-text">标签</span>
                            <span className="label-text-alt">tags</span>
                        </label>
                        <input type="text" {...register("tag")}
                               placeholder="标签" className="input input-bordered w-full max-w-xs"/>
                        <div className={"flex flex-row justify-between mt-5"}>
                            <input type={"submit"} value={"确认修改"} className={"btn btn-primary"}/>
                            <input type={"button"} value={"取消修改"} className={"btn btn-primary"} onClick={()=>setIsDrawerOpen(false)}/>
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    )
}