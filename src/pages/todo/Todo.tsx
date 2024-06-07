import {PageSEO} from "@/components/SEO";
import {useEffect} from "react";
import {set} from "react-hook-form";

const Todo = (props: any) => {
    const {setTitle} = props
    useEffect(() => {
        setTitle("待办事项")
    }, []);

    return (
        <>
            <PageSEO title={"待办事项"} description={"待办事项"}/>
            <div>

            </div>
            <div className={"flex w-full h-screen"}>
                <div className={"todo-content "}></div>
                <div className={"todo-input sticky bottom-5 w-full "}>
                    <input type="text" className={"input input-bordered"}/>
                </div>
            </div>
        </>
    )
}

export default Todo