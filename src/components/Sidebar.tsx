import {ManageMenusData, MenusData, Links, IMenu} from "@/util/menus";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {UseUserStore} from "@/store/UserInfoStore";

function Sidebar(props: any) {
    const {title, setTitle} = props;
    const {theme, setTheme} = props;
    // const [theme, setTheme] = useState("light");
    const {type, setType} = props;
    const [menus, setMenus] = useState(type === "common" ? MenusData : ManageMenusData);
    const navigate = useNavigate();

    const {username} = UseUserStore();

    // useEffect(() => {
    //     console.log("sidebar,{}", username);
    //     // @ts-ignore
    //     // UserInfoStore.getState().setUserInfo({username:"owen"})
    //     console.log("sidebar2,{}", UseUserStore.getState());
    // })
    const switchTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            setTheme("light");
            document.documentElement.setAttribute("data-theme", "light");
        }

        const logoCheckbox = document.getElementById("logoCheckbox") as HTMLInputElement;
        const themeCheckbox = document.getElementById("themeCheckbox") as HTMLInputElement;
        if (logoCheckbox != null && logoCheckbox.checked != themeCheckbox.checked) {
            themeCheckbox.checked = logoCheckbox.checked;
        }
    }
    return (
        <div className="drawer-side flex-shrink-0  h-screen max-h-screen no-scrollbar">
            <label htmlFor="my-drawer-menu" className="drawer-overlay"></label>
            <aside className="flex flex-col bg-base-200 h-full pt-8 w-80 lg:w-60">
                <div className="chat chat-start flex h-auto pl-4 pr-4 items-end">
                    <div className="chat-image avatar">
                        <div className="w-12 rounded-full">
                            <img src="../../huahua.png"  alt={"loading"}/>
                        </div>
                    </div>
                    <div className="chat-bubble font-bold font-mono text-sm flex flex-col justify-center">
                        <label className={"text-left"}>头像是一只柴犬，叫花花。</label>
                    </div>
                </div>
                {/*<div className={"flex h-auto pl-4 pr-4"}>*/}
                {/*    <div className={"avatar mr-2"}>*/}
                {/*        <div className={"w-16"}>*/}
                {/*            <img src={"../../huahua.webp"} alt={"loading"}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={"flex flex-col font-mono font-bold justify-end"}>*/}
                {/*        <label className={"text-left"}>状态：</label>*/}
                {/*        <label className={"text-left"}>头像是一只小柴犬，叫花花</label>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<label className="swap swap-flip text-5xl h-auto">*/}

                {/*    <input id={"logoCheckbox"} type="checkbox" onClick={switchTheme}/>*/}

                {/*    <div className="swap-on tooltip" data-tip={"点击切换页面主题"}>😈*/}
                {/*    </div>*/}
                {/*    <div className="swap-off tooltip" data-tip={"点击切换页面主题"}>😇*/}
                {/*    </div>*/}
                {/*</label>*/}
                {/*<div className="w-60">*/}
                <ul className="menu p-4 text-base-content ">
                    <div className={"divider font-mono text-lg"}>Pages</div>
                    {
                        menus.filter((menuItem:IMenu) => menuItem.isShow).map(menuItem => {
                            return <li className="" key={menuItem.title}>
                                <div className={"hover:text-black hover:bg-gray-300 font-bold text-l " + (title.toLowerCase() === menuItem.title.toLowerCase() ? "active" : "")}
                                   key={menuItem.title} onClick={() => {
                                    if (type === "common") {
                                        setTitle(menuItem.title);
                                        navigate(`/${menuItem.title.toLowerCase()}`)
                                    } else {
                                        setTitle(menuItem.title);
                                        // 将manage profile改为manage/profile
                                        navigate(`/${menuItem.title.toLowerCase().replace(" ", "/")}`)
                                    }
                                }}>
                                    {menuItem.icon}
                                    {menuItem.cnTitle}
                                </div></li>
                        })
                    }

                    <div className={"divider font-mono text-lg"}>Links</div>

                    {
                        Links.filter(link => link.isShow).map(link => {
                                return <li className="" key={link.title}>
                                    <div className={"hover:text-black hover:bg-gray-300 font-bold text-l"}
                                       key={link.title} onClick={() => {
                                        window.open(link.url, "_blank");
                                    }}>
                                        {link.icon}
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
                                <p className={"prose"}>已登录</p>
                            }
                            <p className={"prose"}>Copyright©2023 Owen</p>
                            <a href="https://icp.gov.moe/?keyword=20233353" className={"prose"}
                               target="_blank">陕ICP备2024028129号</a>
                        </div>
                    </footer>
                </div>
                {/*</div>*/}
            </aside>
        </div>
    )
}

export default Sidebar;