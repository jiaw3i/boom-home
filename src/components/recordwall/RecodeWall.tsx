import React from "react";
import {useForm} from "react-hook-form";
import MemoEditor from "../MemoEditor";

export default function RecordWall() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        values: {
            record: ""
        }
    });

    return (
        <div className={"flex h-full w-full p-5"}>
            <div className={"write-box flex-col justify-between bg-base-200 w-full h-1/4 rounded-xl"}>
                <form className={"max-h-full p-1 bg-transparent"}>

                    <textarea
                        {...register("record", {required: true})}
                        placeholder="Write something here..."
                        className={" bg-base-200 textarea resize-none w-full  no-scrollbar break-all"}>
                    </textarea>
                    <div className={"p-1 flex flex-row"}>
                        <div className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-300"}>
                            <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                            </svg>
                        </div>
                        <div className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-300"}>
                            <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                            </svg>
                        </div>
                    </div>
                    <div className={"divider p-0 m-0"}></div>
                    <div className={"w-full flex flex-row justify-between pl-1 pr-1"}>

                        <select className="select select-primary select-sm w-full max-w-xs">
                            <option disabled selected>谁可以看见？</option>
                            <option>公开</option>
                            <option>私有</option>
                        </select>
                        <input type={"submit"} className={"btn-primary btn-sm rounded"} value={"发布✍️"}/>
                    </div>
                </form>
            </div>
        </div>
    );
}