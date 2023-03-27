import {AlertType} from "../datas/alertType";
import {useState} from "react";

export function Alert(props: any) {
    const {message,type,duration,setAlertShow} = props;

    const [open, setOpen] = useState(true);
    // 关闭消息提示
    console.log("alert alert-info shadow-lg absolute w-1/3 left-1/3 top-2 -ml-2/12 " + (open?"":"hidden"))
    const close = () => {
        setOpen(false);
    };
    const info = (

        <div className={"alert alert-info shadow-lg absolute w-1/3 left-1/3 top-2 -ml-2/12 " + (open?"":"hidden")}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{message}</span>
            </div>
        </div>
    )
    const success = (
        <div className={"alert alert-success shadow-lg absolute w-1/3 left-1/3 top-2 -ml-2/12 " + (open?"":"hidden")}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
            </div>
        </div>
    )
    const error = (
        <div className={"alert alert-error shadow-lg absolute w-1/3 left-1/3 top-2 -ml-2/12" + (open?"":"hidden")}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{message}</span>
            </div>
        </div>
    )
    const warning = (
        <div className={"alert alert-warning shadow-lg absolute w-1/3 left-1/3 top-2 -ml-2/12 " + (open?"":"hidden")}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{message}</span>
            </div>
        </div>

    )


    switch (type) {
        case AlertType.INFO:
            return info;
        case AlertType.SUCCESS:
            return success;
        case AlertType.ERROR:
            return error;
        case AlertType.WARNING:
            return warning;
        default: return info;
    }

}