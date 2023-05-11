import React, {useEffect, useState} from "react";
import {CommonBotConfig} from "../../datas/constants";
import useCommonBotConfigStore from "../../store/BotConfigStore";
import CommonBotConfigForm from "./BotConfigForms";

export default function BotConfigDialog(props: any) {

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
                        <CommonBotConfigForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}