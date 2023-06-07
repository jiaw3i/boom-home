import toast, {Toaster} from "react-hot-toast";
import React, {ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {post} from "@/util/request";
import {ADD_RECORD} from "@/util/apis";


type RecordProp = {
    content: string,
    permission: string,
}
const publishSuccess = () => toast.success('发布成功');
const publishFailed = () => toast.error('发布失败，请检查内容');


export default function RecordEditor(props: any) {
    const {refreshRecords} = props;
    const {register, handleSubmit, formState: {errors}} = useForm<RecordProp>();
    const publishRecord = (data: RecordProp) => {
        console.log(data);
        if (data.content === "") {
            publishFailed()
        } else {
            post(ADD_RECORD, data).then((res: any) => {
                if (res.success) {
                    refreshRecords();
                    publishSuccess();
                }
            });
        }
    }
    return (
        <div className={"mb-5 prose write-box flex flex-col justify-between bg-base-300 w-full max-w-full rounded-xl"}>
            <form className={"max-h-full p-1 bg-transparent shadow-xl rounded-xl w-full"}
                  onSubmit={handleSubmit(publishRecord)}>
                <textarea
                    {...register("content", {required: false})}
                    placeholder={"Write here..."}
                    className={"text-left bg-base-300 textarea resize-none w-full focus-visible:outline-0 no-scrollbar break-all"}>
                </textarea>
                {/*<div dangerouslySetInnerHTML={{__html: highlightedText}}></div>*/}
                <div className={"p-1 flex flex-row"}>
                    <div
                        className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-200"}>
                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                        </svg>
                    </div>
                    <div
                        className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-200"}>
                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                        </svg>
                    </div>
                </div>
                <div className={"divider p-0 m-0"}></div>
                <div className={"w-full flex flex-row justify-between pl-1 pr-1 mb-1"}>

                    <select {...register("permission", {required: true})}
                            className="select select-primary select-sm w-2/6 max-w-xs" defaultValue={"public"}>
                        <option value={1}>所有人可见</option>
                        <option value={2}>仅自己可见</option>
                    </select>
                    <input type={"submit"} className={"btn-primary btn-sm rounded hover:cursor-pointer"}
                           value={"发布✍️"}/>
                    <Toaster></Toaster>
                </div>
            </form>
        </div>
    )
}