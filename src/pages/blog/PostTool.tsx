import {PostNav} from "@/components/Icons";
import React, {useState} from "react";

const PostToolBar = (props: any) => {
    const {showPostNav, setShowPostNav} = props


    return (
        <div className={"prose post-tool fixed right-0 top-[50px] lg:hidden"}>
            <div className={"post-directory lg:tooltip lg:tooltip-left"} data-tip={"目录"}
                 onClick={() => setShowPostNav(!showPostNav)}>
                {PostNav}
            </div>

        </div>
    )
}
export default PostToolBar;