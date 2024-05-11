import {ManageMenusData, MenusData, Links, IMenu} from "@/util/menus";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {UseUserStore} from "@/store/UserInfoStore";
import {get} from "@/util/request";
import {LOGOUT_API} from "@/util/apis";
import toast from "react-hot-toast";

function Sidebar(props: any) {
    const {type, title, setTitle} = props;
    const [menus, setMenus] = useState(type === "common" ? MenusData : ManageMenusData);
    const navigate = useNavigate();
    const path = location.pathname

    useEffect(() => {
    }, []);

    useEffect(() => {
        setMenus(type === "common" ? MenusData : ManageMenusData)
    }, [type]);
    const {username} = UseUserStore();
    const logout = () => {
        get(LOGOUT_API).then(res => {
            if (res.success) {
                toast.success(res.message)
                location.reload()
            }
        })
    }
    return (
        <div className="drawer-side flex-shrink-0 z-20 h-screen max-h-screen no-scrollbar">
            <label htmlFor="my-drawer-menu" className="drawer-overlay"></label>
            <aside className="flex flex-col bg-base-200 h-full pt-8 w-80 lg:w-60">
                <div className="chat chat-start flex h-auto pl-4 pr-4 items-end">
                    <div className="chat-image avatar hover:cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-12 rounded-full">
                            <img src="/huahua.png" alt={"loading"}/>
                        </div>
                    </div>
                    <div className="chat-bubble font-bold font-mono text-sm flex flex-col justify-center">
                        <label className={"text-left"}>头像是一只柴犬，叫花花。</label>
                    </div>
                </div>
                <ul className="menu p-4 text-base-content ">
                    <div className={"divider text-lg"}>Pages</div>
                    {
                        menus.filter((menuItem: IMenu) => menuItem.isShow).map(menuItem => {
                            let isCurrent = path.split("/")[1] === menuItem.path.split("/")[1]
                            // if (isCurrent) {
                            //     setTitle(menuItem.title)
                            //     document.title = `${menuItem.title} | Jackway`
                            // }
                            return <li className="" key={menuItem.title}>
                                <div
                                    className={"hover:text-black hover:bg-gray-300 font-bold text-base " + (isCurrent ? "active" : "")}
                                    key={menuItem.title}
                                    onClick={() => {
                                        navigate(`${menuItem.path}`)
                                    }}>
                                    {menuItem.icon}
                                    {menuItem.cnTitle}
                                </div>
                            </li>
                        })
                    }

                    <div className={"divider font-mono text-lg"}>Links</div>

                    {
                        Links.filter(link => link.isShow && ((link.needLogin && username == "jiawei.me@hotmail.com") || !link.needLogin)).map(link => {
                                return <li className="" key={link.title}>
                                    <div className={"hover:text-black hover:bg-gray-300 font-bold text-l"}
                                         key={link.title} onClick={() => {
                                        window.open(link.url, "_blank");
                                    }}>
                                        {link.title}
                                        <span className={"flex-none lowercase absolute right-0 mr-3"}>
                                            <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"
                                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                 strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line
                                                x1="17" y1="7" x2="7" y2="17"/>  <polyline
                                                points="8 7 17 7 17 16"/></svg>
                                        </span>
                                    </div>
                                </li>
                            }
                        )
                    }
                </ul>
                <div className="footer mt-auto">
                    <footer className="footer items-center justify-center p-2 text-neutral-content">
                        <div className="items-center font-mono align-middle gap-0">
                            {/*如果username==jiawei.me@hotmail.com，那么就显示已登录*/}
                            {username === "jiawei.me@hotmail.com" &&
                                <div className={"w-full flex justify-between"}>
                                    <div className={"prose"}>已登录</div>
                                    <div className={"prose hover:cursor-pointer text-secondary"}
                                         onClick={logout}>退出登录
                                    </div>
                                </div>

                            }
                            <p className={"prose"}>Copyright©2023 Owen</p>
                            <a href="https://icp.gov.moe/?keyword=20233353" className={"prose"}
                               target="_blank">陕ICP备2024028129号</a>
                        </div>
                    </footer>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;