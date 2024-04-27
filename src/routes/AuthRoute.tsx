import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {get} from "@/util/request";
import {CURRENT_USER} from "@/util/apis";
import toast from "react-hot-toast";
import * as path from "node:path";


const AuthRoute = ({element}: { element: JSX.Element }) => {
    // 该flag用于控制 受保护页面的渲染时机，需要等待useEffect中所有的权限验证条件完成后才表示可以渲染
    const [canRender, setRenderFlag] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        get(CURRENT_USER, {}).then(res => {
            console.log(res)
            console.log(element)
            if (res.success) {
                if (location.pathname == "/login") {
                    navigate("/")
                }
                setRenderFlag(true)
            } else {
                toast.error("请先登录！", {
                    duration: 2000
                })
                navigate({
                    pathname: "/login",
                    search: `callback=${encodeURI(location.pathname)}`
                },)
            }
        })
    }, [location.pathname]);

    if (!canRender) return null;
    return element;
}


export default AuthRoute;