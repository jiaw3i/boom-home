import {Heading} from "@/pages/blog/PostView";

export const TOC = (props: any) => {
    const {headings, showToc} = props
    return (
        <div
            className={"prose fixed navigation right-2 top-[70px] lg:w-[10%] w-[30] text-left shadow-xl lg:shadow-none backdrop-blur-sm lg:block lg:bg-transparent p-2 rounded-md " + (showToc ? "" : "hidden ")}>
            <div className={"font-bold"}>目录</div>
            <div className={"text-sm"}>
                {
                    headings.map((heading: Heading) => {
                        return (<div className={`ml-${(heading.level - 1) * 2}`}><a href={`#${heading.title}`}
                                                                                    className={"no-underline"}>{heading.title}</a>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}