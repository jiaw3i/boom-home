import {useEffect} from "react";

export default function PageTitle(props: any) {
    const {title} = props;
    return (
        <div className={"flex items-center justify-center  whitespace-nowrap overflow-hidden text-ellipsis lg:pl-10 h-full"}>
            <p className={"font-bold lg:text-2xl text-lg prose flex lg:ml-2 m-0 h-auto"}>{title}</p>
        </div>

    )
}