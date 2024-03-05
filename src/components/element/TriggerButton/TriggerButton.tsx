import { Dispatch, SetStateAction } from "react"

const TriggerButton = ({
    text,
    state,
    setState
}:{
    text:string,
    state:boolean,
    setState:Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <button 
            className={(state ? "bg-red-300 " : "bg-emerald-300 ") + "w-16"}
            onClick={()=>{
                setState((oldValue)=>!oldValue);
            }}
        >
            {text}
        </button>
    )
}

export default TriggerButton