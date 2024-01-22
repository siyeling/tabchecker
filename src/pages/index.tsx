/*global chrome*/
import { useEffect, useState } from "react";
//import "tailwindcss/tailwind.css";


const Page = () => {
    const [ tabList, setTabList ] = useState<chrome.tabs.Tab[]>([]);

    useEffect(()=>{
        async function getTabData(){
            if(chrome.hasOwnProperty("tabs")){
                const queryInfo:chrome.tabs.QueryInfo = {
                    windowType:"normal"
                }
                const tmpTabList = await chrome.tabs.query(queryInfo);
                setTabList(()=>{
                    return [
                        ...tmpTabList
                    ]
                })
            }
        }
        getTabData();
    },[])

    if(!tabList[0]){
        return (
            <>Now Loading ...</>
        )
    }

    console.log(tabList);

    return (
        <>
            <div>title</div>
            <div>
            {
                tabList.map((tab,index)=>{
                    return (
                        <div
                            key={index}
                        >
                            {tab.title}
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default Page;