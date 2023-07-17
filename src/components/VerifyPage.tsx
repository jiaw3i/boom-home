import {useForm} from "react-hook-form";
import {post} from "@/util/request";
import {UseVerifyStateStore} from "@/store/VerifyStateStore";
import toast from "react-hot-toast";

type VerifyProps = {
    setIsVerify: Function
}
export default function Verify(props: VerifyProps) {
    const {setIsVerify} = props;
    const {register, handleSubmit, formState: {errors}} = useForm();

    const verifySubmit = (data: any) => {
        console.log(data)
        post("/api/verify", data).then((res: any) => {
            console.log(res)
            if (res.success) {
                UseVerifyStateStore.setState(true);
                setIsVerify(true);
            } else {
                toast.error(res.message);
            }
        })
    }

    return (
        <div className={"verify h-full"}>
            <div className={"flex justify-center h-full"}>
                <form className={"verify-form flex flex-row w-96 justify-center"} onSubmit={handleSubmit(verifySubmit)}>
                    <input type="text" placeholder="输入认证码" {...register("verifyCode", {required: true})}
                           className="input input-primary mr-2"/>
                    {errors.name && <p className={"text-red-500"}>code is required.</p>}
                    <input type={"submit"} className={"btn btn-primary"} value={"认证"}/>
                </form>
            </div>
        </div>
    )
}