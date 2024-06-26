import toast, {Toaster} from "react-hot-toast";
import React, {ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {set, useForm} from "react-hook-form";
import {post} from "@/util/request";
import {ADD_RECORD} from "@/util/apis";
import {UploadFile} from "@/components/uploadFile/UploadFile";
import Images from "@/components/Images";


type RecordProp = {
    content: string,
    images: any,
    permission: string,
}
const publishSuccess = () => toast.success('发布成功');
const publishFailed = () => toast.error('发布失败，请检查内容');

declare const window: any;
export default function RecordEditor(props: any) {
    const {refreshRecords, refreshTags, tags} = props;
    // const
    const [images, setImages] = useState<any>([]);
    const {register, getValues, setValue, handleSubmit, formState: {errors}} = useForm<RecordProp>();
    const [tagTipHidden, setTagTipHidden] = useState<boolean>(true);
    const publishRecord = (data: RecordProp) => {
        if (data.content === "") {
            publishFailed()
        } else {
            let toastId = toast.loading('发布中...');
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
            formData.append("content", data.content)
            formData.append("permission", data.permission)
            post(ADD_RECORD, formData, {'content-type': 'multipart/form-data'}).then((res: any) => {
                if (res.success) {
                    refreshRecords();
                    refreshTags();
                    toast.dismiss(toastId);
                    publishSuccess();
                } else {
                    toast.dismiss(toastId);
                    toast.error(res.message);
                }
            });
        }
    }

    const handleEditorPower = (type: string, value: string = "") => {
        let oldValue = getValues("content");
        console.log(getValues("content"));
        if (oldValue !== "" && type != "tag") {
            oldValue = oldValue + "\n"
        }
        // 给表单赋值
        if (type === "todo") {
            setValue("content", oldValue + "* [ ] todo" + "\n" + "* [x] finished todo");
        }
        if (type === "image") {
            setValue("content", oldValue + "![](https://img.hanjiawei.com/owen/2023/05/25/646ed03933b34.png)");
        }
        if (type === "code") {
            setValue("content", oldValue + "```\n\n```");
        }
        if (type === "tag") {
            setValue("content", oldValue + `${value} `)
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
                <Images images={images} setImages={setImages}/>

                <div className={"p-1 flex flex-row"}>
                    <div
                        className={"relative group btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-200"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon-img h-5 w-5">
                            <line x1="4" y1="9" x2="20" y2="9"></line>
                            <line x1="4" y1="15" x2="20" y2="15"></line>
                            <line x1="10" y1="3" x2="8" y2="21"></line>
                            <line x1="16" y1="3" x2="14" y2="21"></line>
                        </svg>
                        <div
                            className={"tags-tip text-xl w-52 top-6 mt-1 p-1 left-0 overflow-y-scroll no-scrollbar shadow rounded absolute justify-start flex-wrap hidden group-hover:flex bg-gray-400"}>
                            {
                                tags.filter((tag: any) => tag.tagName != "").map((tag: any) => {
                                    return (
                                        <div key={tag.id}
                                             onClick={() => handleEditorPower("tag", tag.tagName)}
                                             className={"tag-item w-auto max-w-full truncate text-black dark:text-gray-300 cursor-pointer rounded text-sm leading-6 px-2 hover:bg-zinc-300 dark:hover:bg-zinc-700 shrink-0"}>
                                            <span className={"hover:cursor-pointer"}>{tag.tagName}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div
                        onClick={() => handleEditorPower("todo")}
                        className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-200"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon-img h-5 w-5">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <div
                        onClick={() => window.upload_file.showModal()}
                        className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-200"}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                    </div>
                    <div
                        onClick={() => handleEditorPower("code")}
                        className={"btn p-1 h-auto btn-xs bg-transparent border-none hover:border-none hover:bg-base-200"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon-img h-5 w-5">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </div>
                </div>
                <div className={"divider p-0 m-0"}></div>
                <div className={"w-full flex flex-row justify-between pl-1 pr-1 mb-1"}>

                    <select {...register("permission", {required: true})}
                            className="select select-primary select-sm w-2/6 max-w-xs" defaultValue={"public"}>
                        <option value={1}>所有人可见</option>
                        <option value={0}>仅自己可见</option>
                    </select>
                    <input type={"submit"} className={"btn btn-primary btn-sm rounded hover:cursor-pointer"}
                           value={"发布"}/>
                    <Toaster></Toaster>
                </div>
            </form>


            <UploadFile images={images} setImages={setImages}/>
        </div>
    )
}