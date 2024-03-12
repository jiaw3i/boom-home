export default function Images(props: any) {

    const {images, setImages} = props;

    // images =

    console.log("Images.tsx images", images)

    return (
        <div className={"images bg-transparent w-full max-h-45 flex flex-row flex-wrap overflow-y-auto"}>
            {images.map((image: any) => {
                return <img key={"image.filename"} src={image.base64} className={"w-20 h-20 m-1"} alt={"loading..."}></img>
            })}
        </div>
    )

}