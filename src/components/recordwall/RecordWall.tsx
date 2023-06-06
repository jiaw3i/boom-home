import React, {useMemo, useRef, useState} from "react";
// import { isNumber, last, uniq } from "lodash";
// import { useTranslation } from "react-i18next";
import RecordEditor from "@/components/recordwall/RecordEditor";


interface State {
    memoVisibility: boolean;
    fullscreen: boolean;
    isUploadingResource: boolean;
    isRequesting: boolean;
}
export default function RecordWall() {
    return (
        <div className={"flex flex-col h-full w-full p-5"}>

            <RecordEditor />
            <div className={"record-line flex flex-col bg-base-300 shadow-xl rounded-xl flex-grow"}>
                <div className={"record-line-item flex flex-row justify-between items-center p-2"}>
                </div>
            </div>
        </div>
    );
}