import React, {useEffect, useState} from "react";
import CommonBotConfigForm, {ContextBotConfigForm} from "./BotConfigForms";

export default function BotConfigDialog(props: any) {
    const botConfigFormMap:Map<string,JSX.Element> = new Map<string,JSX.Element>(
        [
            ["context", <ContextBotConfigForm/>],
            ["common", <CommonBotConfigForm/>]]
    );
    const {type} = props;
    useEffect(() => {
        console.log("BotConfigDialog type: ", type);
    })

    return (
        <div>
            <input type="checkbox" id="commonBotConfig" className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className={""}>
                        {botConfigFormMap.get(type)}
                    </div>
                </div>
            </div>
        </div>
    )
}