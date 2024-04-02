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
        name: "jiawei",
        englishName: "Jiawei",
        skill: "Java / Typescript / Python",
        aboutMe:
            "👴职业代码人\n" +
            "💻电子设备爱好者\n" +
            "💕Emoji爱好者\n" +
            "🌼祖国的花朵\n",
        findMe: {
            github: "https://github.com/jiaw3i",
            blog: "https://tnbai.com/",
            email: "jiawei.me@hotmail.com",
            wechat: "flower_chai",
        }
    } as HOME);

    return (
        <div className={"home overflow-auto flex-grow prose block max-w-none no-scrollbar"}>
            <div className={"content flex flex-col h-full items-center"}>
                <div className={"flex flex-col text-left font-bold text-3xl font-mono pl-5"}>
                    <span>Hello,</span>
                    <span>I'm <kbd className="kbd kbd-xl text-sky-700">{home.englishName}</kbd></span>
                </div>
                <div className={"grid lg:w-8/12 w-10/12 "}>
                    <div className={"mb-5"}>

                        <div className={"title flex mr-5"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>code with: </span>
                        </div>
                        <div className={"desc flex text-left"}>
                            <span className={"text-xl font-mono mt-3"}>{home.skill}</span>
                        </div>
                    </div>
                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>about me: </span>
                        </div>
                        <div className={"desc flex text-left "}>
                            <span className={"text-xl font-mono mt-3 whitespace-pre-wrap leading-10"}>{home.aboutMe}</span>
                        </div>
                    </div>

                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>find me: </span>
                        </div>
                        <div className={"desc flex text-left justify-between"}>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={home.findMe.github} target="_blank">
                                    <svg className="inline h-6 w-6" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path
                                        d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"/></svg>
                                    Github
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={home.findMe.blog} target="_blank">
                                    <svg className="inline h-6 w-6 " fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                    </svg>
                                    Blog
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={`mailto:${home.findMe.email}`} target={"_blank"}>
                                    <svg className="inline h-6 w-6 " fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" strokeLinecap="round"
                                         strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2"/>  <polyline points="3 7 12 13 21 7"/>
                                    </svg>
                                    EMail
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}