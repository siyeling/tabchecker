import type {SetStateAction,Dispatch} from "react";

const Omnibox = ({
    omnibox,
    setOmnibox,
    isAnd,
    setIsAnd
}:{
    omnibox:string,
    setOmnibox:Dispatch<SetStateAction<string>>
    isAnd:boolean,
    setIsAnd:Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <div
            className="text-center flex"
        >
            <div
                className="pr-4 py-2"
            >
                検索box
            </div>
            <input
                className="ring-1"
                value={omnibox}
                onChange={
                    (e)=>{
                        setOmnibox(e.currentTarget.value)
                    }
                }
            />
            <button 
                className={(isAnd ? "bg-red-300" : "bg-emerald-300")}
                onClick={()=>{
                    setIsAnd((oldValue)=>!oldValue);
                }}
            >
                {isAnd ? "AND" : "OR"}
            </button>
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