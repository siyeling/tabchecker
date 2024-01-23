/*global chrome*/
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const queryInfo:chrome.tabs.QueryInfo = {
    windowType:"normal"
}

const Page = () => {
    const [ tabList, setTabList ] = useState<chrome.tabs.Tab[]>([]);
    const [ omnibox, setOmnibox ] = useState<string>("");

    useEffect(()=>{
        async function getTabData(){
            if(chrome.hasOwnProperty("tabs")){
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

    console.log(tabList);

    return (
        <>
            <div
                className="flex"
            >
                <div>normal</div>
                <div>
                    <input
                        className=""
                        onChange={
                            (e)=>{
                                setOmnibox(e.currentTarget.value)
                            }
                        }
                    />
                </div>
            </div>
            <div>
            {
                tabList.map((tab)=>{
                    return (
                        <div
                            className={(tab.active ? "bg-emerald-200 ": "") + "flex justify-between ring-1"}
                            key={tab.id}
                        >
                            <div
                                className="text-center"
                            >
                                {tab.windowId}:{tab.index}
                            </div>
                            <button
                                onClick={
                                    ()=>{
                                        console.log(tab);
                                        const tabId = tab.id;
                                        if(tabId){
                                            chrome.tabs.update(tabId,{active:true});
                                        }
                                    }}
                            >{tab.title}</button>
                            <button
                                onClick={
                                    ()=>{
                                        console.log(tab.id);
                                        const tabId = tab.id;
                                        if(tabId){
                                            chrome.tabs.remove(tabId);
                                            setTabList((oldTabList)=>{
                                                return oldTabList.filter(oldTab => oldTab.id !== tabId);
                                            })
                                        }
                                    }
                                }
                            >remove</button>
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default Page;