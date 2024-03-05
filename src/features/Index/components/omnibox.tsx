import type {SetStateAction,Dispatch} from "react";
import TriggerButton from "@/components/element/TriggerButton/TriggerButton";

const Omnibox = ({
    omnibox,
    setOmnibox,
    isAnd,
    setIsAnd,
    mode
}:{
    omnibox:string,
    setOmnibox:Dispatch<SetStateAction<string>>
    isAnd:boolean,
    setIsAnd:Dispatch<SetStateAction<boolean>>,
    mode:string
}) => {
    return (
        <div
            className="text-center flex"
        >
            <input
                className="ring-1"
                value={omnibox}
                onChange={
                    (e)=>{
                        setOmnibox(e.currentTarget.value)
                    }
                }
            />
            <TriggerButton
                text={isAnd ? (mode === "and" ? "AND" : "NAND") : (mode === "and" ? "OR" : "NOR")}
                state={isAnd}
                setState={setIsAnd}
            />
            <button
                className="ml-2 px-2 py-2 ring-1 bg-indigo-500 text-white"
                onClick={()=>setOmnibox("")}
            >
                clear
            </button>
        </div>
    )
}

export default Omnibox;