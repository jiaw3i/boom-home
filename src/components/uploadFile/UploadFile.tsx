import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {data} from "autoprefixer";
import {filterProps} from "framer-motion";
import {post} from "@/util/request";
import {IMG_UPLOAD} from "@/util/apis";
import {fileToBase64} from "@/util/records";

interface FileInfo {
    name: string,
    size: number,
    base64: string,
}

const UploadFile = (props: any) => {

    const {register, getValues, setValue, handleSubmit, formState: {errors}} = useForm<any>();
    const [files, setFiles] = React.useState<FileInfo[]>([]);
    const {setImages} = props;
    const formSubmit = (data: any) => {
        // let formData = new FormData();
        // formData.append("files", data);
        // setImages(files);
        // console.log("uploadfile formsubmit data", data.file)

        setImages(data.files)
        document.getElementById("close_modal")?.click()
        // post(IMG_UPLOAD, formData).then((res) => {
        //     console.log("upload", res)
        // })
        // post()
    }

    const formChange = async (event: any) => {
        const fileList = event.target.files;
        let arr: FileInfo[] = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];

            let fileInfo: FileInfo = {
                name: file.name,
                size: file.size,
                base64: ""
            };

            fileInfo.base64 = await fileToBase64(file);
            arr.push(fileInfo);
        }

        setFiles(arr);
    };

    return (
        <dialog id={"upload_file"} className={"modal"}>
            <div
                className="modal-box w-2/3 lg:w-1/3 mx-auto bg-base-300 rounded-xl">
                <form
                    onSubmit={handleSubmit(formSubmit)}
                    onChange={formChange}
                    className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="dropzone-file"
                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                className="font-semibold">Click to upload</span> or
                                drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" multiple={true}  {...register("files", {required: false})}
                               className="hidden"/>
                    </label>

                    <div className={"mt-3 mb-1 w-full text-left"}>文件列表</div>
                    <div
                        className={"chosen-files pl-3 pr-3 bg-gray-50 rounded-lg file-item flex-col w-full max-h-48  items-center overflow-y-scroll no-scrollbar"}>
                        {
                            files.map((file, index) => {
                                return (
                                    <div key={index} className={"flex flex-row bg-gray-50 text-gray-600 font-mono"}>
                                        {/*<div className={"w-10 h-10"}>*/}
                                        {/*    <img className={"h-full rounded-xl w-full m-0"} src={file.base64}*/}
                                        {/*         alt={"loading..."}></img>*/}
                                        {/*</div>*/}
                                        <div
                                            className={"flex flex-col flex-wrap text-left text-wrap break-all overflow-hidden"}>
                                            <p className={"m-0"}>{"- " + file.name}</p>
                                            {/*<p className={"m-0"}>{file.size},等待上传</p>*/}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={"flex mt-5 w-full justify-end"}>
                        <button className={"btn mr-2 btn-primary"}>确认选择</button>
                        <button type="button" className={"btn btn-primary"} onClick={() => {
                            document.getElementById("close_modal")?.click()
                        }}>关闭
                        </button>
                    </div>
                </form>

                <form method={"dialog"}>
                    <div className="modal-action m-0 w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button id={"close_modal"} className="btn hidden">Close</button>
                    </div>
                </form>
            </div>
        </dialog>

    )
}

export {UploadFile}