import projects from "../../datas/projects";
import {useForm} from "react-hook-form"
import message from "../../util/message";

export default function ManageProject() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = (e: any) => {
        console.log(e);
        message.info("hello", 2000);
    }

    return (
        <div className={"manage project drawer h-full  drawer-end"}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content">
                <div>
                    <p className={"font-bold text-2xl"}>ALL MY PROJECTS</p>
                </div>
                <div className="divider"></div>
                <div className="overflow-x-auto pl-10 pr-10">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Git Url</th>
                            <th>Home Url</th>
                            <th>action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            projects.map((project) => {
                                return (
                                    <tr key={project.id}>
                                        <th>{project.id}</th>
                                        <th>{project.name}</th>
                                        <th>{project.description}</th>
                                        <th>{project.git_url}</th>
                                        <th>{project.home_url}</th>
                                        <td>
                                            <label htmlFor={"my-drawer"}
                                                   className={"btn btn-sm btn-primary"}>Edit</label>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <form className={"project-form"} onSubmit={handleSubmit(formSubmit)} >
                        <label className="label">
                            <span className="label-text">项目名称</span>
                            <span className="label-text-alt">必填项</span>
                        </label>
                        <input {...register("name",{required:true})} type="text" placeholder="项目名称" className="input input-bordered w-full max-w-xs"/>
                        {errors.name && <p className={"text-red-500"}>name is required.</p>}
                        <label className="label">
                            <span className="label-text">项目描述</span>
                            <span className="label-text-alt">project desc</span>
                        </label>
                        <input {...register("description")} type="text" placeholder="项目描述" className="input input-bordered w-full max-w-xs"/>
                        <label className="label">
                            <span className="label-text">GIT地址</span>
                            <span className="label-text-alt">git url</span>
                        </label>
                        <input {...register("gitUrl")} type="text" placeholder="GIT地址" className="input input-bordered w-full max-w-xs"/>
                        <label className="label">
                            <span className="label-text">HOME地址</span>
                            <span className="label-text-alt">home url</span>
                        </label>
                        <input {...register("homeUrl")} type="text" placeholder="HOME地址" className="input input-bordered w-full max-w-xs"/>
                        <div className={"divider"}></div>

                        <input type={"submit"} value={"确认修改"} className={"btn"}/>
                    </form>

                </ul>
            </div>
        </div>
    )
}