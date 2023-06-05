import {useForm} from "react-hook-form";
import {post} from "../util/request";
import {LOGIN_API} from "../datas/apis";

type LoginProp = {
    username: string,
    password: string,
}
export default function Login() {

    // useForm()
    // const
    const {register, handleSubmit, formState: {errors}} = useForm<LoginProp>();

    const login = (login: LoginProp) => {
        console.log(login);
        post(LOGIN_API, login).then((res: any) => {
            console.log(res);
            if (res.success) {
                window.location.href = "/home";
            }
        });
    }
    return (
        <div className="flex items-center w-screen h-screen">
            <div
                className="flex w-full h-auto bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                     style={{backgroundImage: 'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80")'}}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Hello.</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">login with email</a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <form onSubmit={handleSubmit(login)}>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            </div>
                            <input
                                {...register("username")}
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email"/>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            </div>
                            <input
                                {...register("password")}
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"/>
                        </div>
                        <div className="mt-8">
                            <input
                                type={"submit"}
                                value={"Login"}
                                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:cursor-pointer hover:bg-gray-600"/>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <a href="#"
                           className="text-xs text-gray-500 uppercase hover:cursor-not-allowed">暂未开放注册</a>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}