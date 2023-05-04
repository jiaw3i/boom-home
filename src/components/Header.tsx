import {useEffect} from "react";

export default function Header (props:any){
    const {title} = props;
    return (
        // <div>
            <div className={"flex items-center justify-center lg:pl-10 h-[48px]"}>
                <p className={"font-bold text-2xl prose flex lg:ml-2 m-0 h-auto"}>✅{title.toUpperCase()}</p>
            </div>
            // {/*<div className={"divider"}></div>*/}
        // </div>

    )
}