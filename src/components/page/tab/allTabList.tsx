import {Dispatch,SetStateAction,useState} from "react"
import TabListFragment from "./tabListFragment";

const AllTabList = ({tabList,setTabList}:{tabList:chrome.tabs.Tab[],setTabList:Dispatch<SetStateAction<chrome.tabs.Tab[]>>}) => {
    const [ dragIndex, setDragIndex ] = useState<number|null>();

    return (
        <>
            {
                tabList.map((tab,index)=>{
                    return (
                        <tr
                            key={tab.id}
                            draggable={true}
                            onDragEnter={()=>{
                                if(index !== dragIndex){
                                    setDragIndex(index);
                                }
                            }}
                            onDragOver={(e)=>{
                                e.preventDefault();
                            }}
                            onDragEnd={()=>{
                                if(tab.id && dragIndex){
                                    const moveProperties = {index:dragIndex,windowId:tab.windowId}
                                    chrome.tabs.move(tab.id,moveProperties)
                                }
                                setDragIndex(null);
                            }}
                        >
                            <TabListFragment
                                tab={tab}
                                setTabList={setTabList}
                            />
                        </tr>
                    )
                })
            }
        </>
    )
}

export default AllTabList;