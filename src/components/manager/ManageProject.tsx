import projects from "../../datas/projects";

export default function ManageProject(){

    return (
        <div className={"manage project"}>
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
                                        <button className={"btn btn-sm btn-primary"}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}