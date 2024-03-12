import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "/";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    (config) => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json",
        } as any;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        if (response.data.errCode === 2) {
            console.log("过期");
        }
        return response;
    },
    (error) => {
        console.log("请求出错：", error);
    }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: string, data: any) {
    return new Promise((resolve, reject) => {
        // TODO: 支持表单提交
        axios.post(url, data).then(
            (response) => {
                //关闭进度条
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: string, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

//统一接口处理，返回数据
export default function (fetch: string, url: string, param: any) {
    let _data = "";
    return new Promise((resolve, reject) => {
        switch (fetch) {
            case "get":
                console.log("begin a get request,and url:", url);
                get(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request GET failed.", error);
                        reject(error);
                    });
                break;
            case "post":
                post(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
};
