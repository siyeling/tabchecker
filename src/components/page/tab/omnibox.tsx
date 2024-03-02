import type {SetStateAction,Dispatch} from "react";

const Omnibox = ({omnibox,setOmnibox}:{omnibox:string,setOmnibox:Dispatch<SetStateAction<string>>}) => {
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
                className="ml-2 px-2 py-2 ring-1 bg-indigo-500 text-white"
                onClick={()=>setOmnibox("")}
            >
                clear
            </button>
        </div>
    )
}

export default Omnibox;