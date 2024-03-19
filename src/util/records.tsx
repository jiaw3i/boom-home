import {RecordInfo} from "@/components/recordwall/RecordWall";

const RecordsData:Array<RecordInfo> = [
    {
        id: 1,
        content: "hello #hello  #world。  \n" +
            "![IMG_20230414_000624.jpg](https://img.hanjiawei.com/owen/2023/06/09/6482ec2f6c260.jpg)" +
            "<img src='https://img.hanjiawei.com/owen/2023/06/09/6482ec2f6c260.jpg' alt='loading...'/>",
        permission: 1,
        tag: "#hello,#world",
        createTime: "2021-06-09T00:06:24"
    },
]

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
        };
        reader.onerror = (error) => reject(error);
    });
}
export default RecordsData;