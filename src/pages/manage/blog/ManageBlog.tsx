import {useForm} from "react-hook-form"
import request, {get, post} from "../../../util/request";
import {useEffect, useState} from "react";
import {Post} from "@/pages/blog/Blog";
import {useNavigate} from "react-router-dom";
import {DELETE_POST, LIST_POST} from "@/util/apis";
import toast from "react-hot-toast";

type Inputs = {
    id: string,
    title: string,
    desc: string,
    tag: string
};
export default function ManageBLog() {
    const [posts, setPosts] = useState<Array<Post>>([])
    const navigate = useNavigate()
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [editPost, setEditPost] = useState<Post>({} as any);
    const pageSize = 10
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        values: {
            id: editPost.id,
            title: editPost.title,
            desc: editPost.description ? editPost.description : "",
            tag: editPost.tag
        }
    });
    // 页面载入时
    // 请求获取列表
    useEffect(() => {
        getPost()
    }, []);
    const getPost = () => {
        post(LIST_POST, {page: page, pageSize: pageSize, publish: 2}).then((res: any) => {
            setPosts(res.data.posts);
            setTotalPage(res.data.total / pageSize)
        });
    }
    const deletePost = (postId: string) => {
        get(DELETE_POST, {id: postId}).then(res => {
            if (res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
            getPost()
        })
    }

    return (
        <div className={"manage project drawer h-full  drawer-end"}>
            <input checked={isDrawerOpen} id="post-form-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <div>
                    <div className={"btn font-bold text-2xl"} onClick={() => navigate("edit")}>新增文章</div>
                </div>
                <div className="divider"></div>
                <div className="overflow-x-auto px-5">
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
                            <th>公开</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.description}</td>
                                        <td>{post.tag}</td>
                                        <td>{post.createTime}</td>
                                        <td>{post.updateTime}</td>
                                        <td>{post.publish === "1" ? "🟢" : "🔴"}</td>
                                        <td className={"flex flex-row"}>
                                            <label onClick={() => {
                                                navigate(`edit/${post.id}`)
                                            }}
                                                   htmlFor={"post-form-drawer"}
                                                   className={"btn btn-sm btn-primary mr-1 mb-1"}
                                            >编辑</label>
                                            <label onClick={() => {
                                                deletePost(post.id)
                                            }}
                                                   htmlFor={"post-form-drawer"}
                                                   className={"btn btn-sm btn-primary"}
                                            >删除</label>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            {/*<div className="drawer-side no-scrollbar">*/}
            {/*    <label key={editPost.id} htmlFor="post-form-drawer" className="drawer-overlay"></label>*/}
            {/*    <ul className="menu p-4 w-80 bg-base-100 h-full text-base-content">*/}
            {/*        <form id={"productForm"} onSubmit={handleSubmit(formSubmit)}>*/}
            {/*            <label className="label">*/}
            {/*                <span className="label-text">标题</span>*/}
            {/*                <span className="label-text-alt">必填项</span>*/}
            {/*            </label>*/}
            {/*            <input type="text" {...register("title", {required: true})}*/}
            {/*                   placeholder="文章标题" className="input input-bordered w-full max-w-xs"/>*/}
            {/*            {errors.title && <p className={"text-red-500"}>title is required.</p>}*/}
            {/*            <label className="label">*/}
            {/*                <span className="label-text">文章描述</span>*/}
            {/*                <span className="label-text-alt">post desc</span>*/}
            {/*            </label>*/}
            {/*            <textarea  {...register("desc")}*/}
            {/*                       placeholder="文章描述"*/}
            {/*                       className="overflow-visible textarea textarea-bordered no-scrollbar w-full max-w-xs "/>*/}
            {/*            <label className="label">*/}
            {/*                <span className="label-text">标签</span>*/}
            {/*                <span className="label-text-alt">tags</span>*/}
            {/*            </label>*/}
            {/*            <input type="text" {...register("tag")}*/}
            {/*                   placeholder="标签" className="input input-bordered w-full max-w-xs"/>*/}
            {/*            <div className={"flex flex-row justify-between mt-5"}>*/}
            {/*                <input type={"submit"} value={"确认修改"} className={"btn btn-primary"}/>*/}
            {/*                <input type={"button"} value={"取消修改"} className={"btn btn-primary"}*/}
            {/*                       onClick={() => setIsDrawerOpen(false)}/>*/}
            {/*            </div>*/}
            {/*        </form>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )
}