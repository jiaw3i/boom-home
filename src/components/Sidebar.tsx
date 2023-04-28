import {ManageMenusData, MenusData, Links} from "../datas/menus";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Sidebar(props: any) {
    const {title, setTitle} = props;
    const [theme, setTheme] = useState("light");
    const {type, setType} = props;
    const [menus, setMenus] = useState(type === "common" ? MenusData : ManageMenusData);
    const navigate = useNavigate();

    return (
        <div className="drawer-side flex-shrink-0  h-screen">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <aside className="flex flex-col bg-base-200 pt-10 w-80 lg:w-60">
                <label className="swap swap-flip text-5xl h-auto">

                    <input type="checkbox"/>

                    <div className="swap-on tooltip" data-tip={"点击切换页面主题"} onClick={() => {
                        document.documentElement.setAttribute("data-theme", "light");
                    }}>😈
                    </div>
                    <div className="swap-off tooltip" data-tip={"点击切换页面主题"} onClick={() => {
                        document.documentElement.setAttribute("data-theme", "dark");
                    }}>😇
                    </div>
                </label>
                {/*<div className="w-60">*/}
                <ul className="menu p-4 text-base-content ">
                    <div className={"divider"}>Pages</div>
                    {
                        menus.filter(menuItem => menuItem.isShow).map(menuItem => {
                            return <li className="" key={menuItem.title}>
                                <a className={"hover:[hsl(var(--p)/var(--tw-bg-opacity))] font-bold text-l " + (title.toLowerCase() === menuItem.title.toLowerCase() ? "active" : "")}
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
                                    {menuItem.title}
                                </a></li>
                        })
                    }

                    <div className={"divider"}>Links</div>

                    {
                        Links.filter(link => link.isShow).map(link => {
                                return <li className="" key={link.title}>
                                    <a className={"hover:[hsl(var(--p)/var(--tw-bg-opacity))] font-bold text-l "}
                                       key={link.title} onClick={() => {
                                        window.open(link.url, "_blank");
                                    }}>
                                        {link.icon}
                                        {link.title}

                                        <span className={"flex-none lowercase absolute right-0 mr-3"}>
                                            <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"
                                                 strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                                 strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line
                                                x1="17" y1="7" x2="7" y2="17"/>  <polyline points="8 7 17 7 17 16"/></svg>
                                        </span>
                                    </a>
                                </li>
                            }
                        )
                    }
                </ul>
                <div className="footer mt-auto">
                    <footer className="footer items-center justify-center p-2 text-neutral-content">
                        <div className="items-center font-mono align-middle gap-0">
                            <p className={"prose"}>Copyright©2023 Owen</p>
                            <a href="https://icp.gov.moe/?keyword=20233353" className={"prose"} target="_blank">萌ICP备20233353号</a>
                        </div>
                    </footer>
                </div>
                {/*</div>*/}
            </aside>


        </div>

        // <div className="drawer-side">
        //     <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        //     <ul className="menu p-4 w-80 bg-base-100">
        //         <li><a>Sidebar Item 1</a></li>
        //         <li><a>Sidebar Item 2</a></li>
        //
        //     </ul>
        //
        // </div>
    )
}

export default Sidebar;