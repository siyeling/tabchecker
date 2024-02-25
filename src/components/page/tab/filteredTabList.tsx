import {Dispatch,SetStateAction} from "react"
import TabListFragment from "./tabListFragment";

const FilteredTabList = ({tabList,setTabList,omnibox}:{tabList:chrome.tabs.Tab[],setTabList:Dispatch<SetStateAction<chrome.tabs.Tab[]>>,omnibox:string}) => {
    return (
        <>
            {
                tabList.filter(tab=>{
                    const reg = new RegExp(omnibox,"i");
                    let isCurrect:boolean = false;
                    if(tab.title){
                        isCurrect = tab.title.match(reg) ? true : false
                    }
                    if(tab.url){
                        isCurrect = isCurrect ? true : (tab.url.match(reg) ? true : false);
                    }
                    return isCurrect;
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