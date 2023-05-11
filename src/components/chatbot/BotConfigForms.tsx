import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {CommonBotConfig, ContextBotConfig} from "../../datas/constants";
import {useCommonBotConfigStore, useContextBotConfigStore} from "../../store/BotConfigStore";

const CommonBotConfigForm = (props: any) => {
    // const {formSubmit} = props;
    const {
        setValue,
        reset,
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm<CommonBotConfig>({
        values: useCommonBotConfigStore((state: any) => state.commonBotConfig)
    });
    const setCommonBotConfig = useCommonBotConfigStore((state: any) => state.setCommonBotConfig);
    const formSubmit = (data: CommonBotConfig) => {
        // 保存config到zustand
        setCommonBotConfig(data);
    }
    const commonBotConfig = getValues();
    const [temperature, setTemperature] = useState(commonBotConfig.temperature);
    return (
        <form id={"commonBotForm"} onSubmit={handleSubmit(formSubmit)}>
            <label className="label">
                <span className="label-text">随机性</span>
                <span className="label-text-alt text-l">{commonBotConfig.temperature}</span>
            </label>
            <div>
                <input type="range" min={0} max={1}
                       step={0.1} {...register("temperature", {required: true})}
                       onChange={(e) => {
                           setValue("temperature", e.target.valueAsNumber);
                           setTemperature(e.target.valueAsNumber);
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
            <div className={"divider"}></div>
            <input id={"botConfigSubmit"} type={"submit"} hidden={true}/>

            <div className="modal-action">
                <label htmlFor="commonBotConfig" className="btn" onClick={() => {
                    reset();
                    setTemperature(commonBotConfig.temperature)
                }}>取消</label>
                <label htmlFor="commonBotConfig" className="btn" onClick={() => {
                    document.getElementById("botConfigSubmit")?.click();
                }}>提交</label>
            </div>
        </form>
    )
}
const ContextBotConfigForm = (props: any) => {
    // const {formSubmit} = props;
    const {
        setValue,
        reset,
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm<ContextBotConfig>({
        values: useContextBotConfigStore((state: any) => state.contextBotConfig)
    });
    const setContextBotConfig = useContextBotConfigStore((state: any) => state.setContextBotConfig);
    const formSubmit = (data: ContextBotConfig) => {
        // 保存config到zustand
        setContextBotConfig(data);
    }
    const contextBotConfig = getValues();
    const [temperature, setTemperature] = useState(contextBotConfig.temperature);
    return (
        <form id={"commonBotForm"} onSubmit={handleSubmit(formSubmit)}>
            <label className="label">
                <span className="label-text">随机性</span>
                <span className="label-text-alt text-l">{contextBotConfig.temperature}</span>
            </label>
            <div>
                <input type="range" min={0} max={1}
                       step={0.1} {...register("temperature", {required: true})}
                       onChange={(e) => {
                           setValue("temperature", e.target.valueAsNumber);
                           setTemperature(e.target.valueAsNumber);
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
                <span className="label-text">保存历史会话记录数</span>
                <span className="label-text-alt">history</span>
            </label>
            <input type="text" {...register("history")}
                   className="input input-primary w-full max-w-full"/>
            <label className="label">
                <span className="label-text">压缩token阈值</span>
                <span className="label-text-alt">compressSize</span>
            </label>
            <input type="text" {...register("compressSize")}
                   className="input input-primary w-full max-w-full"/>

            <div className={"divider"}></div>
            <input id={"botConfigSubmit"} type={"submit"} hidden={true}/>
            <div className="modal-action">
                <label htmlFor="commonBotConfig" className="btn" onClick={() => {
                    reset();
                    setTemperature(contextBotConfig.temperature)
                }}>取消</label>
                <label htmlFor="commonBotConfig" className="btn" onClick={() => {
                    document.getElementById("botConfigSubmit")?.click();
                }}>提交</label>
            </div>
        </form>
    )
}


export default CommonBotConfigForm;

export {CommonBotConfigForm, ContextBotConfigForm};