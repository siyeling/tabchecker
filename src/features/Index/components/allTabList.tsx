import {Dispatch,SetStateAction,useState} from "react"
import TabListFragment from "@/features/Index/components/tabListFragment";

const AllTabList = ({tabList,setTabList}:{tabList:chrome.tabs.Tab[],setTabList:Dispatch<SetStateAction<chrome.tabs.Tab[]>>}) => {
    const [ dragIndex, setDragIndex ] = useState<number|null>();
    const [ dragWindowId, setDragWindowId ] = useState<number|null>();
    const [ isOpenMoveAlert, setIsOpenMoveAlert ] = useState<boolean>(false);

    return (
        <>
            {
                tabList.map((tab)=>{
                    return (
                        <tr
                            key={tab.id}
                            draggable={true}
                            onDragEnter={()=>{
                                if(tab.index !== dragIndex){
                                    setDragIndex(tab.index);
                                }
                                if(tab.windowId !== dragWindowId){
                                    setDragWindowId(tab.windowId);
                                }
                            }}
                            onDragOver={(e)=>{
                                e.preventDefault();
                            }}
                            onDragEnd={()=>{
                                console.log(dragIndex);
                                if(!tab.id || !dragIndex || !dragWindowId) return;
                                if(dragWindowId === tab.windowId){
                                    const moveProperties = {index:dragIndex,windowId:dragWindowId}
                                    chrome.tabs.move(tab.id,moveProperties)
                                }
                                else{
                                    //警告を表示
                                    setIsOpenMoveAlert(true);
                                    const moveProperties = {index:dragIndex,windowId:dragWindowId}
                                    chrome.tabs.move(tab.id,moveProperties)
                                }
                                setDragIndex(null);
                                setDragWindowId(null);
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