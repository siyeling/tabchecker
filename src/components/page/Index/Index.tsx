/*global chrome*/
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import DomainElement from "@/features/Index/components/domainElement";
import Omnibox from "@/features/Index/components/omnibox";
import AllTabList from "@/features/Index/components/allTabList";
import FilteredTabList from "@/features/Index/components/filteredTabList";
import tabEvent from "@/features/Index/components/tabEvent";

const queryInfo:chrome.tabs.QueryInfo = {
    windowType:"normal"
}

const Index = () => {
    const [ tabList, setTabList ] = useState<chrome.tabs.Tab[]>([]);
    const [ includeOmnibox, setIncludeOmnibox ] = useState<string>("");
    const [ excludeOmnibox, setExcludeOmnibox ] = useState<string>("");
    const [ isAnd, setIsAnd ] = useState<boolean>(false);
    const [ isNand, setIsNand ] = useState<boolean>(false);
    const [ domainList, setDomainList ] = useState<Map<string,{domain:string,tabId:number[]}|undefined>>(new Map());

    useEffect(()=>{
        async function getTabData(){
            const tmpTabList = await chrome.tabs.query(queryInfo);
            setTabList(()=>{
                return tmpTabList.map((tab)=>tab)
            })
        }
        getTabData();
        tabEvent(setTabList);
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
                <DomainElement
                    domainList={domainList} 
                    setOmnibox={setIncludeOmnibox}
                />
                <div>
                    検索box
                </div>
                <Omnibox 
                    omnibox={includeOmnibox} 
                    setOmnibox={setIncludeOmnibox}
                    isAnd={isAnd}    
                    setIsAnd={setIsAnd}
                    mode="and"
                />
                <Omnibox 
                    omnibox={excludeOmnibox} 
                    setOmnibox={setExcludeOmnibox}
                    isAnd={isNand}    
                    setIsAnd={setIsNand}
                    mode="nand"
                />
            </div>
            <div>
                <div
                    className={(includeOmnibox || excludeOmnibox) ? "visibility: visible" : "visibility: hidden"}
                >
                    <FilteredTabList 
                        tabList={tabList} 
                        setTabList={setTabList} 
                        includeOmnibox={includeOmnibox}
                        excludeOmnibox={excludeOmnibox}
                        isAnd={isAnd}
                        isNand={isNand}
                    />
                </div>
                <div
                    className={(includeOmnibox || excludeOmnibox) ? "visibility: hidden" : "visibility: visible"}
                >
                    <AllTabList tabList={tabList} setTabList={setTabList} />
                </div>
            </div>
        </>
    )
}

export default Index;