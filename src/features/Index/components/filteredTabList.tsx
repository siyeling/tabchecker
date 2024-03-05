import {Dispatch,SetStateAction} from "react"
import TabListFragment from "@/features/Index/components/tabListFragment";

const FilteredTabList = ({
    tabList,
    setTabList,
    includeOmnibox,
    excludeOmnibox,
    isAnd,
    isNand
}:{
    tabList:chrome.tabs.Tab[],
    setTabList:Dispatch<SetStateAction<chrome.tabs.Tab[]>>,
    includeOmnibox:string,
    excludeOmnibox:string,
    isAnd:boolean,
    isNand:boolean
}) => {
    return (
        <>
            {
                tabList.filter(tab=>{
                    if(!includeOmnibox) return true;
                    const splitOmniboxs = includeOmnibox.split(/[ 　]/);
                    const isCurrects:boolean[] = []
                    for(const splitOmnibox of splitOmniboxs){
                        if(!splitOmnibox) break;
                        const reg = new RegExp(splitOmnibox,"i");
                        let isCurrect:boolean = false;
                        if(tab.title){
                            isCurrect = tab.title.match(reg) ? true : false
                        }
                        if(tab.url){
                            isCurrect = isCurrect ? true : (tab.url.match(reg) ? true : false);
                        }
                        isCurrects.push(isCurrect);
                    }
                    if(isAnd){
                        return !isCurrects.includes(false)
                    }
                    else{
                        return isCurrects.includes(true)
                    }
                }).filter(tab=>{
                    const splitOmniboxs = excludeOmnibox.split(/[ 　]/);
                    const isCurrects:boolean[] = []
                    for(const splitOmnibox of splitOmniboxs){
                        if(!splitOmnibox) break;
                        const reg = new RegExp(splitOmnibox,"i");
                        let isCurrect:boolean = false;
                        if(tab.title){
                            isCurrect = tab.title.match(reg) ? true : false
                        }
                        if(tab.url){
                            isCurrect = isCurrect ? true : (tab.url.match(reg) ? true : false);
                        }
                        isCurrects.push(isCurrect);
                    }
                    if(isNand){
                        return isCurrects.includes(false)
                    }
                    else{
                        return !isCurrects.includes(true)
                    }
                }).map((tab,index)=>{
                    return (
                        <TabListFragment
                            key={index}
                            tab={tab}
                            setTabList={setTabList}
                        />
                    )
                })
            }
        </>
    )
}

export default FilteredTabList;