import {useEffect, useState} from "react";

export default function Projects(){
    const [projects,setProjects] = useState<Array<any>>([]);

    // 页面载入时 请求获取项目列表
    useEffect(()=>{
        post("/api/project/list",{}).then((res) => {
            console.log(res);
            // setProjects(res);
        });
    },[]);
    return (
        <div>
            <div>
                <p className={"font-bold text-2xl"}>ALL MY PROJECTS</p>
            </div>
            <div className="divider"></div>
            <div className={"flex projects flex-wrap align-middle justify-center"}>
                {
                    ProjectsData.map(project=>{
                        return (
                            <div key={project.id} className="card p-0 ml-3 mr-3 mb-3 mt-3 w-2/5 bg-base-300 shadow-xl hover:cursor-pointer hover:shadow-2xl">
                                <div className="card-body p-5 text-left">
                                    <h2 className="card-title">{project.name}</h2>
                                    <p>{project.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-square btn-sm">
                                            <svg className="h-8 w-8 text-white" width="24" height="24" viewBox="0 0 24 24"
                                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z"/>
                                                <path
                                                    d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"/>
                                            </svg>
                                        </button>
                                        <button className="btn btn-square btn-sm">
                                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>

)
}
import ProjectsData from "../datas/projects";
import {get, post} from "../util/request";
