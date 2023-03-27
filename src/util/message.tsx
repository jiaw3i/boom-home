import { createRoot } from 'react-dom/client';
import {Alert} from "../components/Alert";

const message = {
    success( message:string, duration = 1500 ) {
        // 创建一个dom
        const dom = document.createElement('div');
        // 定义组件，
        const JSXdom = <Alert message={message} type="success"></Alert>;
        // 渲染DOM
        createRoot(dom).render(JSXdom);
        // 置入到body节点下
        document.body.appendChild(dom);
        setTimeout(() => {
            console.log("remove",dom)
            // 移除dom
            document.body.removeChild(dom);

        }, duration);
    },
    error(message:string, duration = 1500 ) {
        const dom = document.createElement('div');
        const JSXdom = <Alert message={message} type="error"></Alert>;
        createRoot(dom).render(JSXdom);
        document.body.appendChild(dom);
        setTimeout(() => {
            console.log("remove",dom)
            // 移除dom
            document.body.removeChild(dom);

        }, duration);
    },
    warning(message:string, duration = 1500) {
        const dom = document.createElement('div');
        const JSXdom = <Alert message={message} type="warning"></Alert>;
        createRoot(dom).render(JSXdom);
        document.body.appendChild(dom);
        setTimeout(() => {
            console.log("remove",dom)
            // 移除dom
            document.body.removeChild(dom);

        }, duration);
    },
    info(message:string, duration = 1500) {
        const dom = document.createElement('div');
        const JSXdom = <Alert message={message}  type="info"></Alert>;
        createRoot(dom).render(JSXdom);
        document.body.appendChild(dom);
        setTimeout(() => {
            console.log("remove",dom)
            // 移除dom
            document.body.removeChild(dom);

        }, duration);
    }
};

export default message;