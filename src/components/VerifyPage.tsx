import {useForm} from "react-hook-form";
import {post} from "@/util/request";
import {UseVerifyStore} from "@/store/VerifyStateStore";
import toast from "react-hot-toast";
import {AZURE_CHAT_VERIFY} from "@/util/apis";
import {useState} from "react";

type VerifyProps = {
    setIsVerify: Function
}
export default function Verify(props: VerifyProps) {
    const {setIsVerify} = props;
    const {register, handleSubmit, formState: {errors}} = useForm();
    const verifySubmit = (data: any) => {
        let id = toast.loading("正在认证...");
        post(AZURE_CHAT_VERIFY, data).then((res: any) => {
            console.log(res)
            if (res.success) {
                UseVerifyStore.setState({state: true, verifyToken: res.data});
                setIsVerify(true);
                toast.dismiss(id);
                toast.success("认证成功！");
            } else {
                toast.dismiss(id);
                toast.error(res.data);
            }
        }).catch((err: any) => {
            toast.dismiss(id);
            toast.error("认证失败，请检查认证码是否正确");
        })
    }

    return (
        <div className={"verify h-full"}>
            <div className={"flex justify-center h-full"}>
                <form className={"verify-form flex flex-row w-96 justify-center"} onSubmit={handleSubmit(verifySubmit)}>
                    <div>
                        <label className="label">
                            <span className="label-text text-red-500">请先输入认证码！可联系站长授权。</span>
                        </label>
                        <input type="text" placeholder="输入认证码" {...register("verifyCode", {required: true})}
                               className="input input-primary mr-2"/>
                        {errors.name && <p className={"text-red-500"}>code is required.</p>}
                        <input type={"submit"} className={"btn btn-primary"} value={"认证"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}