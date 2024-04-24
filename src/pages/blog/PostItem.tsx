import Blog, {Post} from "@/pages/blog/Blog";

const PostItem = (props: { post: Post }) => {
    const {post} = props

    return (
        <div className={"card p-5 pb-3 rounded-lg prose post-item max-w-full bg-base-300 flex flex-col mb-3 hover:cursor-pointer hover:shadow-lg"}>
            <div className={"post-title mb-1 text-left font-bold"}>{post.title}</div>

            <div className={"post-desc text-left mb-2"}>
                {post.desc}
            </div>
            <div className={"post-footer flex flex-row justify-between"}>
                <div className={"post-tag flex flex-row text-gray-400"}>
                    {
                        post.tag.split(",").map(tag => {
                            return <div className={"mr-2 badge badge-primary"}>
                                {tag}
                            </div>
                        })
                    }
                </div>
                <div className={"post-info mb-1 text-gray-500 flex flex-row text-right"}>
                    <div className={""}>@jiawei 发布于</div>
                    <div>
                        {post.createTime.split(" ")[0]}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostItem;