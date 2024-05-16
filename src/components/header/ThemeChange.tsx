export default function ThemeChange() {

    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
    ]

    return (
        <>
            <div className="dropdown dropdown-end max-h-full">
                <label tabIndex={0} className="btn btn-ghost lg:m-1 m-0 max-h-5">
                    主题
                    <svg width="12px" height="12px" className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                    </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content no-scrollbar z-20 flex-nowrap menu p-2 shadow bg-base-300 rounded-box font-mono h-70[vh] w-56 max-h-96 font-bold overflow-y-auto">
                    {
                        themes.map((theme, index) => {
                            return <li key={index} className={"p-0 mt-1 mb-1"} >
                                <div className={"bg-base-100 hover:bg-base-100"} onClick={() => {
                                    document.documentElement.setAttribute("data-theme", theme);
                                }}>{theme}</div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}