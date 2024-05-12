import {Heading} from "@/pages/blog/PostView";

export const TOC = (props: any) => {
    const {headings, showToc} = props
    const mlclass: Map<number, string> = new Map<number, string>([
        [1, "ml-0"],
        [2, "ml-3"],
        [3, "ml-6"],
    ])
    return (
        <div
            className={"prose fixed navigation p-5 backdrop-blur-sm rounded-md right-2 top-[70px]  lg:max-h-80 lg:w-3/12 lg:sticky w-[30] text-left shadow-xl lg:shadow-none lg:backdrop-blur-none lg:block lg:bg-transparent " + (showToc ? "" : "hidden ")}>
            <div className={"font-bold"}>目录</div>
            <div className={"text-sm"}>
                {
                    headings.map((heading: Heading) => {
                        return (<div key={heading.title} className={`${mlclass.get(heading.level)}`}><a
                            href={`#${heading.title}`}
                            className={"no-underline"}>{heading.title}</a>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}