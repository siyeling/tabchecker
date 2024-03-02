import Image from "next/image";
import { Dispatch,SetStateAction } from "react";

const TabListFragment = ({tab,setTabList}:{tab:chrome.tabs.Tab,setTabList:Dispatch<SetStateAction<chrome.tabs.Tab[]>>}) => {
    return (
        <div
            className={(tab.active ? "bg-emerald-200 ": "") + "flex justify-between ring-1 min-w-[256px]"}
        >
            <div
                className="text-center"
            >
                <div>
                    {tab.index}
                </div>
            </div>
            <button
                className="text-left ml-2"
                onClick={
                    ()=>{
                        const tabId = tab.id;
                        if(tabId){
                            chrome.tabs.update(tabId,{active:true});
                            setTabList((oldTabList:chrome.tabs.Tab[])=>{
                                return oldTabList.map((oldTab)=>{
                                    if(oldTab.active && oldTab.windowId === tab.windowId){
                                        oldTab.active = false;
                                        return oldTab;
                                    }
                                    else{
                                        if(oldTab.id === tabId){
                                            oldTab.active = true;
                                        }
                                        return oldTab;
                                    }
                                })
                            })
                        }
                    }
                }
            >
                <Image
                    src={tab.favIconUrl ? tab.favIconUrl : ""}
                    alt=""
                    height={16}
                    width={16}
                />
                <div>{tab.title}</div>
            </button>
            <button
                className="ml-4 border-lime"
                onClick={
                    ()=>{
                        const tabId:number|undefined = tab.id;
                        if(tabId){
                            chrome.tabs.remove(tabId);
                            setTabList((oldTabList:chrome.tabs.Tab[])=>{
                                let updateTabIndex:number = 0;
                                return oldTabList.filter(oldTab => oldTab.id !== tabId).map((oldTab)=>{
                                    if(tab.windowId === oldTab.windowId){
                                        oldTab.index = updateTabIndex
                                        updateTabIndex++;
                                        return oldTab;
                                    }
                                    else return oldTab;
                                });
                            })
                        }
                    }
                }
            >remove</button>
        </div>
    )
}

export default TabListFragment;