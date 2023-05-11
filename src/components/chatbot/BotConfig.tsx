import React from "react";
import {useForm} from "react-hook-form"
import {CommonBotConfig} from "../../datas/constants";

export default function CommonBotConfigDialog() {

    const {register, handleSubmit, formState: {errors}} = useForm<CommonBotConfig>({
        values: {
            temperature: 0.9,
            model: "gpt2",
            maxTokens: 4000,
            compressSize: 3000,
        }
    });

    const formSubmit = (data: CommonBotConfig) => {
        console.log(data);
    }

    return (
        <div>
            <input type="checkbox" id="commonBotConfig" className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className={""}>
                        <form id={"commonBotForm"} onSubmit={handleSubmit(formSubmit)}>
                            <label className="label">
                                <span className="label-text">随机性</span>
                                <span className="label-text-alt">temperature</span>
                            </label>
                            <div>
                                <input type="range" {...register("temperature", {required: true})}
                                       className="w-full max-w-full"/>
                                {errors.temperature && <p className={"text-red-500"}>name is required.</p>}
                            </div>

                            <label className="label">
                                <span className="label-text">模型</span>
                                <span className="label-text-alt">model</span>
                            </label>
                            <select className="select select-primary w-full max-w-full">
                                {/*<option disabled selected>Pick your favorite Simpson</option>*/}
                                <option>GPT-3.5-turbo</option>
                                <option disabled={true}>GPT-4</option>
                            </select>

                            <label className="label">
                                <span className="label-text">最大tokens</span>
                                <span className="label-text-alt">maxTokens</span>
                            </label>
                            <input type="text" {...register("maxTokens")}
                                   className="input input-primary w-full max-w-full"/>

                            <label className="label">
                                <span className="label-text">压缩阈值</span>
                                <span className="label-text-alt">compressSize</span>
                            </label>
                            <input type="text" {...register("compressSize")}
                                   className="input input-primary w-full max-w-full"/>
                            <div className={"divider"}></div>

                            <input type={"submit"} value={"确认修改"} className={"btn"}/>
                        </form>
                    </div> 
                    {/*<div className="modal-action">*/}
                    {/*    <label htmlFor="common-bot-config" className="btn">Yay!</label>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}