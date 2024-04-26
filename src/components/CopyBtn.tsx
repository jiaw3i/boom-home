import {Copy, Check} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";

const CopyButton = ({id}: { id: string }) => {
    const [copied, setCopited] = useState(false);

    const onCopy = async () => {
        try {
            setCopited(true);
            toast.success("已经拷贝到剪切板");
            const text = document.getElementById(id)!.innerText;
            await navigator.clipboard.writeText(text);
            setTimeout(() => {
                setCopited(false);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            id={"copy-btn"}
            onClick={onCopy}
            className="p-2 bg-transparent border-0 transition-all hover:scale-125 focus:outline-none active:outline-0 active:scale-150"
        >
            <Copy
                size={16}
                className={`transition-all`}
            />
        </button>
    );
};

export default CopyButton;


