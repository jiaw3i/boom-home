import {useEffect} from "react";

export default function PageTitle(props: any) {
    const {title} = props;
    return (
        <div className={"flex items-center justify-center lg:pl-10 h-full"}>
            <p className={"font-bold text-2xl prose flex lg:ml-2 m-0 h-auto"}>{title.toUpperCase()}</p>
        </div>

    )
}