/*global chrome*/
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import DomainElement from "@/components/page/tab/domainElement";
import Omnibox from "@/components/page/tab/omnibox";
import AllTabList from "@/components/page/tab/allTabList";
import FilteredTabList from "@/components/page/tab/filteredTabList";

const queryInfo:chrome.tabs.QueryInfo = {
    windowType:"normal"
}

const Page = () => {
    const [ tabList, setTabList ] = useState<chrome.tabs.Tab[]>([]);
    const [ omnibox, setOmnibox ] = useState<string>("");
    const [ domainList, setDomainList ] = useState<Map<string,{domain:string,tabId:number[]}|undefined>>(new Map());

    useEffect(()=>{
        async function getTabData(){
            const tmpTabList = await chrome.tabs.query(queryInfo);
            setTabList(()=>{
                return tmpTabList.map((tab)=>tab)
            })
        }
        getTabData();
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
        chrome.tabs.onMoved.addListener((tabId,moveInfo)=>{
            console.log(tabId,moveInfo);
            const isFromIndexBigger = moveInfo.fromIndex > moveInfo.toIndex ? true : false;
            setTabList((oldTabList)=>{
                const tmpTabList = oldTabList.map((oldTab)=>{
                    if(oldTab.windowId === moveInfo.windowId){
                        if(oldTab.index === moveInfo.fromIndex){
                            oldTab.index = moveInfo.toIndex;
                        }
                        else if(isFromIndexBigger && oldTab.index >= moveInfo.toIndex && oldTab.index < moveInfo.fromIndex){
                            oldTab.index++;
                        }
                        else if(!isFromIndexBigger && oldTab.index > moveInfo.fromIndex && oldTab.index <= moveInfo.toIndex){
                            oldTab.index--;
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
    },[])

    useEffect(()=>{
        setDomainList(()=>{
            let tmpMap:Map<string,{domain:string,tabId:number[]}|undefined> = new Map()
            tabList.map((tab)=>{
                if(tab.favIconUrl){
                    let tmpValue = tmpMap.get(tab.favIconUrl)
                    if(tab.id){
                        if(tmpValue){
                            tmpValue.tabId.push(tab.id)
                        }
                        else{
                            if(tab.url){
                                const splitUrl = tab.url.split("/");
                                tmpValue = {
                                    domain:splitUrl[2] ? splitUrl[2] : "",
                                    tabId:[tab.id]
                                }
                            }
                        }
                    }
                    tmpMap.set(tab.favIconUrl,tmpValue);
                }
            })
            return tmpMap;
        })
    },[tabList])
    
    return (
        <>
            <div
                className="sticky top-0 pb-2 bg-white ring-1"
            >
                <DomainElement domainList={domainList} setOmnibox={setOmnibox}/>
                <Omnibox omnibox={omnibox} setOmnibox={setOmnibox}/>
            </div>
            <div
                className={omnibox ? "visibility: visible" : "visibility: hidden"}
            >
                <FilteredTabList tabList={tabList} setTabList={setTabList} omnibox={omnibox} />
            </div>
            <div
                className={omnibox ? "visibility: hidden" : "visibility: visible"}
            >
                <AllTabList tabList={tabList} setTabList={setTabList} />
            </div>
        </>
    )
}

export default Page;