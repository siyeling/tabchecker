import { Dispatch,SetStateAction } from "react";

function tabEvent(setTabList:Dispatch<SetStateAction<chrome.tabs.Tab[]>>){
    chrome.tabs.onRemoved.addListener((tabId:number)=>{
        setTabList((oldTabList)=>{
            return oldTabList.filter((oldTab) =>oldTab.id !== tabId);
        })
    })
    chrome.tabs.onCreated.addListener((newTab:chrome.tabs.Tab)=>{
        setTabList((oldTabList)=>{
            return [...oldTabList,newTab].sort((a,b)=>a.index - b.index).sort((a,b)=>a.windowId - b.windowId);
        })
    })
    chrome.tabs.onActivated.addListener((activeInfo)=>{
        setTabList((oldTabList)=>{
            return oldTabList.map((oldTab)=>{
                if(oldTab.windowId === activeInfo.windowId){
                    if(oldTab.id === activeInfo.tabId){
                        oldTab.active = true;
                    }
                    else{
                        oldTab.active = false;
                    }
                }
                return oldTab;
            })
        })
    })
    //発行は同一window間のみ
    chrome.tabs.onMoved.addListener((tabId,moveInfo)=>{
        console.log(tabId,moveInfo);
        const isFromIndexBigger = moveInfo.fromIndex > moveInfo.toIndex ? true : false;
        setTabList((oldTabList)=>{
            const tmpTabList = oldTabList.map((oldTab)=>{
                if(oldTab.index === moveInfo.fromIndex){
                    oldTab.index = moveInfo.toIndex;
                }
                else if(isFromIndexBigger && oldTab.index >= moveInfo.toIndex && oldTab.index < moveInfo.fromIndex){
                    oldTab.index++;
                }
                else if(!isFromIndexBigger && oldTab.index > moveInfo.fromIndex && oldTab.index <= moveInfo.toIndex){
                    oldTab.index--;
                }
                return oldTab;
            })
            return tmpTabList.sort((a,b)=>a.index - b.index).sort((a,b)=>a.windowId - b.windowId);
        })
    })
    chrome.tabs.onAttached.addListener((tabId,attachInfo)=>{
        setTabList((oldTabList)=>{
            let popTabWindowId:number|null = null;
            const tmpTabList = oldTabList.map((oldTab)=>{
                if(oldTab.id === tabId){
                    oldTab.index = attachInfo.newPosition;
                    popTabWindowId = oldTab.windowId;
                    oldTab.windowId = attachInfo.newWindowId;
                }
                else if(oldTab.windowId === popTabWindowId){
                    oldTab.index--;
                }
                else if(oldTab.windowId === attachInfo.newWindowId){
                    if(oldTab.index >= attachInfo.newPosition){
                        oldTab.index++;
                    }
                }
                return oldTab;
            })
            return tmpTabList.sort((a,b)=>a.index - b.index).sort((a,b)=>a.windowId - b.windowId);
        })
    })
    chrome.tabs.onUpdated.addListener((tabId,changeInfo)=>{
        console.log(tabId,changeInfo);
        setTabList((oldTabList)=>{
            return oldTabList.map((oldTab)=>{
                if(oldTab.id === tabId){
                    if(changeInfo.url){
                        oldTab.url = oldTab.url
                    }
                    if(changeInfo.title){
                        oldTab.title = changeInfo.title
                    }
                    if(changeInfo.favIconUrl){
                        oldTab.favIconUrl = changeInfo.favIconUrl
                    }
                }
                return oldTab;
            })
        })
    })
}

export default tabEvent;