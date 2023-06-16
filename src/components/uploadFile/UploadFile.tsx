import React from "react";
import {useForm} from "react-hook-form";
import {data} from "autoprefixer";
import {filterProps} from "framer-motion";

interface FileInfo {
    name: string,
    size: number,
    base64: string,
}

const UploadFile = () => {

    const {register, getValues, setValue, handleSubmit, formState: {errors}} = useForm<any>();
    const [files, setFiles] = React.useState<FileInfo[]>([]);
    const fileReader = new FileReader();
    const formSubmit = (data: any) => {
        console.log("upload", data)
    }

    const formChange = (event: any) => {
        let file = event.target.files[0]
        let fileInfo: FileInfo = {
            name: file.name,
            size: file.size,
            base64: ""
        }
        fileToBase64(file).then((base64:string) => {
            fileInfo.base64 = base64;
            setFiles([...files,fileInfo]);
        })
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result);
            };
            reader.onerror = (error) => reject(error);
        });
    }

    return (
        <form method={"dialog"}

              className="w-2/3 lg:w-1/3 mx-auto bg-base-300 rounded-xl">

            <form
                onSubmit={handleSubmit(formSubmit)}
                onChange={formChange}
                className="flex items-center justify-center p-5 w-full">
                <label htmlFor="dropzone-file"
                       className="flex flex-col p-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                            drag and drop</p>
                    </div>
                    <input id="dropzone-file" type="file"  {...register("file", {required: false})} className="hidden"/>
                </label>
            </form>
            <div className={"chosen-files pl-5 pr-5 bg-g file-item flex-col w-full items-center"}>
                {
                    files.map((file, index) => {
                        return (
                            <div key={index} className={"flex flex-row bg-gray-50 rounded-xl mb-3"}>
                                <div className={"w-10 h-10"}>
                                    <img className={"h-full rounded-xl w-full m-0"} src={file.base64} alt={"loading..."}></img>
                                </div>
                                <div className={"flex flex-col flex-wrap overflow-hidden"}>
                                    <p className={"m-0"}>{file.name}</p>
                                    <p className={"m-0"}>{file.size},等待上传</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="modal-action w-full ">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </div>
        </form>
    )
}

export {UploadFile}