import {fileToBase64} from "@/util/records";
import {useEffect, useState} from "react";

export default function Images(props: any) {

    const {images, setImages} = props;
    const [previews, setPreviews] = useState<string[]>([]);
    const updatePreviews = async (images: any) => {
        if (images == undefined) {
            return [];
        }

        let arr: string[] = [];
        for (let i = 0; i < images.length; i++) {
            let base64 = await fileToBase64(images.item(i));
            arr.push(base64)
        }
        setPreviews(arr);
    }

    useEffect(() => {
        updatePreviews(images)
    }, [images]);


    // const [previews, setPreviews] = useState(getPreviews(images));

    return (
        <div className={"images bg-transparent w-full max-h-45 flex flex-row flex-wrap overflow-y-auto"}>

            {
                previews.map((preview: string, index: number) => {
                    return <img key={index} src={preview} className={"w-20 h-20 m-1"}
                                alt={"loading..."}></img>
                })
            }
        </div>
    )

}