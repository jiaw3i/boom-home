export default function Header (props:any){
    const {title} = props;
    return (
        <div className="navbar bg-base-100 w-full">
            <a className="btn btn-ghost normal-case text-xl">{title}</a>
        </div>
    )
}