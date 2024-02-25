import type {SetStateAction,Dispatch} from "react";

const Omnibox = ({omnibox,setOmnibox}:{omnibox:string,setOmnibox:Dispatch<SetStateAction<string>>}) => {
    return (
        <div
            className="flex"
        >
            <div
                className="pr-4"
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
                onClick={()=>setOmnibox("")}
            >
                clear
            </button>
        </div>
    )
}

export default Omnibox;