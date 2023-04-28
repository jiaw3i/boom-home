import {useEffect} from "react";

export default function Header (props:any){
    const {title} = props;
    return (
        // <div>
            <div className={"flex items-center justify-center h-[48px]"}>
                <p className={"font-bold text-2xl prose flex m-0 h-auto"}>😊{title.toUpperCase()}😊</p>
            </div>
            // {/*<div className={"divider"}></div>*/}
        // </div>

    )
}