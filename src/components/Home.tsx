export default function Home() {

    return (
        <div className={"home"}>
            <div>
                <p className={"font-bold text-2xl"}>HOME</p>
            </div>
            <div className="divider"></div>
            <div className={"content flex flex-col items-center"}>
                <div className={"flex flex-col text-left font-bold text-3xl font-mono pl-5"}>
                    <span>Hello,</span>
                    {/*<span>I'm <span className={"font-black text-4xl font-mono text-sky-700"}>Jiawei</span></span>*/}
                    <span>I'm <kbd className="kbd kbd-xl text-sky-700">Jiawei Han</kbd></span>

                </div>
                <div className={"grid  w-8/12 "}>
                    <div className={"mb-5"}>

                        <div className={"title flex mr-5"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>skill</span>
                        </div>
                        <div className={"desc flex text-left"}>
                            <span className={"text-xl font-mono mt-3"}> JavaWeb Developer / React / Python</span>
                        </div>
                    </div>
                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>about me</span>
                        </div>
                        <div className={"desc flex text-left"}>
                            <span className={"text-xl font-mono mt-3"}>Graduated from XUST and Technology, majoring in software engineering, born in 1998, focusing on web back-end development, but also slightly familiar with front-end frameworks, such as the react framework.</span>
                        </div>
                    </div>
                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>find me</span>
                        </div>
                        <div className={"desc flex text-left justify-between"}>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={"/"}>
                                    <svg className="inline h-6 w-6 text-blue-500" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path
                                        d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"/></svg>
                                    Github
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={"/"}>
                                    <svg className="inline h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                    </svg>
                                    WeChat
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={"/"}>
                                    <svg className="inline h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                    </svg>
                                    Facebook
                                </a>
                            </span>
                            <span className={"text-xl font-mono mt-3"}>
                                <a href={"/"}>
                                    <svg className="inline h-6 w-6 text-blue-500" width="24" height="24" viewBox="0 0 24 24"
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