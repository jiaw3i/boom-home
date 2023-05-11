import React, {useState} from "react";
import {set, useForm} from "react-hook-form"
import {CommonBotConfig} from "../../datas/constants";
export default function CommonBotConfigDialog() {

    const {setValue,reset,register, handleSubmit, formState: {errors},getValues} = useForm<CommonBotConfig>({
        values: {
            temperature: 0.9,
            model: "gpt2",
            maxTokens: 4000,
            compressSize: 3000,
        }
    });
    const commonBotConfig = getValues();
    const [temperature, setTemperature] = useState(commonBotConfig.temperature);
    const formSubmit = (data: CommonBotConfig) => {
        // temperature
        console.log(data);
        // console.log(temperature);
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
                                <span className="label-text-alt text-l">{commonBotConfig.temperature}</span>
                            </label>
                            <div>
                                <input type="range" min={0} max={1} step={0.1} {...register("temperature", {required: true})}
                                        onChange={(e)=>{
                                            setTemperature(e.target.valueAsNumber);
                                            setValue("temperature",e.target.valueAsNumber);
                                        }}
                                       className="w-full max-w-full"/>
                                {errors.temperature && <p className={"text-red-500"}>temperature is required.</p>}
                            </div>

                            <label className="label">
                                <span className="label-text">模型</span>
                                <span className="label-text-alt">model</span>
                            </label>
                            <select className="select select-primary w-full max-w-full">
                                {/*<option disabled selected>Pick your favorite Simpson</option>*/}
                                <option>GPT-3.5-turbo</option>
                                <option>GPT-3</option>
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
                            <input id={"botConfigSubmit"} type={"submit"} hidden={true}/>

                            <div className="modal-action">
                                <label htmlFor="commonBotConfig" className="btn" onClick={()=>reset()}>取消</label>
                                <label htmlFor="commonBotConfig" className="btn" onClick={()=>{
                                    document.getElementById("botConfigSubmit")?.click();
                                }}>提交</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}