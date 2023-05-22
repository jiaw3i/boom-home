import {useState} from "react";

type HOME = {
    name: string,
    englishName: string,
    skill: string,
    aboutMe: string,
    findMe: {
        github: string,
        email: string,
        wechat: string,
        blog: string,
        twitter: string
    }
}
export default function Home() {

    const [home, setHome] = useState<HOME>({
        name: "韩佳卫",
        englishName: "Owen Han",
        skill: "Java / Typescript / Python",
        aboutMe:
            "主业后端开发工程师，熟悉SpringBoot、SpringCloud、Mybatis、SpringMVC等JavaWeb开发框架🚀。\n" +
            "也是一名前端爱好者，会一丢丢的React、Vue、Ant Design、TailWind Css等框架✨。\n" +
            "还是一名业余Python开发者，了解一点Gunicorn、Flask、Django等框架🐍。\n" +
            "\n💕Emoji爱好者",
        findMe: {
            github: "https://github.com/jiaw3i",
            blog: "https://blog.hanjiawei.com/",
            email: "jiawei.me@hotmail.com",
            wechat: "flower_chai",
            twitter: "https://twitter.com/_owen99",
        }
    } as HOME);

    return (
        <div className={"home overflow-auto prose block max-w-none no-scrollbar"}>
            <div className={"content flex flex-col items-center"}>
                <div className={"flex flex-col text-left font-bold text-3xl font-mono pl-5"}>
                    <span>Hello,</span>
                    <span>I'm <kbd className="kbd kbd-xl text-sky-700">{home.englishName}</kbd></span>
                </div>
                <div className={"grid lg:w-8/12 w-10/12 "}>
                    <div className={"mb-5"}>

                        <div className={"title flex mr-5"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>skill</span>
                        </div>
                        <div className={"desc flex text-left"}>
                            <span className={"text-xl font-mono mt-3"}>{home.skill}</span>
                        </div>
                    </div>
                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>about me</span>
                        </div>
                        <div className={"desc flex text-left"}>
                            <span className={"text-xl font-mono mt-3 whitespace-pre-wrap"}>{home.aboutMe}</span>
                        </div>
                    </div>

                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>find me</span>
                        </div>
                        <div className={"desc flex text-left justify-between"}>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={home.findMe.github} target="_blank">
                                    <svg className="inline h-6 w-6 text-blue-500" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path
                                        d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"/></svg>
                                    Github
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={home.findMe.blog} target="_blank">
                                    <svg className="inline h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                    </svg>
                                    Blog
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={`mailto:${home.findMe.email}`} target={"_blank"}>
                                    {/*<svg className="inline h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"*/}
                                    {/*     stroke="currentColor">*/}
                                    {/*  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                                    {/*        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>*/}
                                    {/*</svg>*/}
                                    <svg className="inline h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" strokeLinecap="round"
                                         strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2"/>  <polyline points="3 7 12 13 21 7"/>
                                    </svg>
                                    EMail
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={home.findMe.twitter} target={"_blank"}>
                                    <svg className="inline h-6 w-6 text-blue-500" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path
                                        d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z"/></svg>
                                    Twitter
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}