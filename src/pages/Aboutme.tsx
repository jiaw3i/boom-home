import {useEffect, useState} from "react";

type HOME = {
    name: string,
    englishName: string,
    skill: string,
    aboutMe: string,
    findMe: any[]
}


export default function Aboutme(props: any) {
    const {setTitle} = props
    useEffect(() => {
        setTitle("我的信息")
        document.title = "我的信息 | Jackway"
    }, []);
    const [home, setHome] = useState<HOME>({
        name: "6辣子",
        englishName: "Jackway",
        skill: "Java / Typescript / Python",
        aboutMe:
            "- 因为是陕西关中人，所以用6lazi.com作为域名，就是6辣子夹馍那个6辣子。\n" +
            "- 👴职业代码人\n" +
            "- 💻电子设备爱好者\n" +
            "- 💕Emoji爱好者\n" +
            "- 🌼祖国的花朵\n",
        findMe: [
            {name: "Github", value: "https://github.com/jiaw3i"},
            {name: "Email", value: "jackwaycn@gmail.com"},
            // {name: "github", url: "https://github.com/jiaw3i"}
        ]
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
                            <span
                                className={"text-xl font-mono mt-3 whitespace-pre-wrap leading-10"}>{home.aboutMe}</span>
                        </div>
                    </div>

                    <div className={"mb-5"}>
                        <div className={"title flex mr-5 text-right"}>
                            <span className={"font-bold text-2xl font-mono mt-3"}>find me: </span>
                        </div>
                        <div className={"desc mt-3 flex flex-col text-xl text-left justify-between"}>
                            {home.findMe.map(item => {
                                return (
                                    <div key={item.name} className={"find-me-item"}>
                                        {item.name}: {item.value}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}