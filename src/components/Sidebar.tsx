import {ManageMenusData, MenusData,} from "../datas/menus";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Sidebar(props: any) {
    const {title, setTitle} = props;
    const {type, setType} = props;
    const [menus, setMenus] = useState(type==="common"?MenusData:ManageMenusData);
    const navigate = useNavigate();

    return (
        <div className="drawer flex flex-col flex-shrink-0 w-60 drawer-mobile bg-base-200 h-screen">
            <div className="pt-10 pb-5 w-60">
                <label className="swap swap-flip text-5xl h-auto">

                    <input type="checkbox"/>

                    <div className="swap-on">😈</div>
                    <div className="swap-off">😇</div>
                </label>
            </div>
            <div className="drawer-side w-60">
                <ul className="menu p-4 w-60 text-base-content ">
                    {
                        menus.map(menuItem => {
                            return <li className="" key={menuItem.title}>
                                <a className={"font-bold text-l " + (title.toLowerCase() === menuItem.title.toLowerCase() ? "active" : "")}
                                   key={menuItem.title} onClick={() => {
                                    if (type === "common"){
                                        setTitle(menuItem.title);
                                        navigate(`/${menuItem.title.toLowerCase()}`)
                                    }else {
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
            </div>
            <div className="footer w-60 mt-auto">
                <footer className="footer items-center p-2 bg-neutral text-neutral-content">
                    <div className="items-center align-middle">
                        <p>Copyright © 2023 Jiawei</p>
                        <p>All right reserved</p>
                    </div>

                </footer>
            </div>
        </div>
    )
}

export default Sidebar;