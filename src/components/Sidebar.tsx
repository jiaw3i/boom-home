import {ManageMenusData, MenusData,} from "../datas/menus";
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

                    <div className="swap-on" onClick={() => {
                        console.log("aaa")
                        document.documentElement.setAttribute("data-theme", "light");
                    }}>😈</div>
                    <div className="swap-off" onClick={() => {
                        document.documentElement.setAttribute("data-theme", "dark");
                    }}>😇</div>
                </label>
                {/*<div className="w-60">*/}
                <ul className="menu p-4 text-base-content ">
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
                </ul>
                <div className="footer mt-auto">
                    <footer className="footer items-center p-2 bg-neutral text-neutral-content">
                        <div className="items-center align-middle">
                            <p>Copyright © 2023 Jiawei</p>
                            <p>All right reserved</p>
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