import projects from "../../datas/projects";
import {useForm} from "react-hook-form"
import message from "../../util/message";
import request, {get, post} from "../../util/request";
import {useEffect, useState} from "react";

type Inputs = {
    name: string,
    description: string,
    gitUrl: string,
    homeUrl: string
};
export default function ManageProject() {
    const [projects, setProjects] = useState<Array<any>>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [editProject, setEditProject] = useState<any>({});
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        values: {
            name: editProject.name,
            description: editProject.description,
            gitUrl: editProject.gitUrl,
            homeUrl: editProject.homeUrl
        }
    });
    // 页面载入时 请求获取项目列表
    useEffect(() => {
        post("/api/project/list", {}).then((res: any) => {
            console.log(res);
            setProjects(res.data);
        });
    }, []);
    const formSubmit = (editedProject: any) => {
        editedProject.id = editProject.id;
        // message.info("hello", 1500);
        post("/api/project/update", editedProject).then((res:any) => {
            if (res.success){
                post("/api/project/list", {}).then((res: any) => {
                    setProjects(res.data);
                });
            }
        });
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <div className={"manage project drawer h-full  drawer-end"}>
            <input checked={isDrawerOpen} id="my-drawer" type="checkbox" className="drawer-toggle"/>
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
                                        <th>{project.gitUrl}</th>
                                        <th>{project.homeUrl}</th>
                                        <td>
                                            <label onClick={() => {
                                                setEditProject(project);
                                                setIsDrawerOpen(true);
                                            }}
                                                   htmlFor={"my-drawer"}
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
            <div className="drawer-side">
                <label key={editProject} htmlFor="my-drawer" className="drawer-overlay" ></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <form id={"productForm"} onSubmit={handleSubmit(formSubmit)}>
                        <label className="label">
                            <span className="label-text">项目名称</span>
                            <span className="label-text-alt">必填项</span>
                        </label>
                        <input type="text" {...register("name", {required: true})}
                               placeholder="项目名称" className="input input-bordered w-full max-w-xs"/>
                        {errors.name && <p className={"text-red-500"}>name is required.</p>}
                        <label className="label">
                            <span className="label-text">项目描述</span>
                            <span className="label-text-alt">project desc</span>
                        </label>
                        <input type="text" {...register("description")}
                               placeholder="项目描述" className="input input-bordered w-full max-w-xs"/>
                        <label className="label">
                            <span className="label-text">GIT地址</span>
                            <span className="label-text-alt">git url</span>
                        </label>
                        <input type="text" {...register("gitUrl")}
                               placeholder="GIT地址" className="input input-bordered w-full max-w-xs"/>
                        <label className="label">
                            <span className="label-text">HOME地址</span>
                            <span className="label-text-alt">home url</span>
                        </label>
                        <input type="text" {...register("homeUrl")}
                               placeholder="HOME地址" className="input input-bordered w-full max-w-xs"/>
                        <div className={"divider"}></div>

                        <input type={"submit"} value={"确认修改"} className={"btn"}/>
                    </form>
                </ul>
            </div>
        </div>
    )
}