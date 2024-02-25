import Image from "next/image"
import { useState, Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const DomainElement = ({domainList,setOmnibox}:{domainList:Map<string,{domain:string,tabId:number[]}|undefined>,setOmnibox:Dispatch<SetStateAction<string>>}) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const list = Array.from(domainList.keys());

    return (
        <div>
            <Popover
                isOpen={isOpen}
                onOpenChange={(open)=>{
                    setIsOpen(open)
                }}
                placement="bottom"
                showArrow={true}
            >
                <PopoverTrigger>
                    <button>domain list</button>
                </PopoverTrigger>
                <PopoverContent>
                    <div
                        className="bg-amber-100"
                    >
                        {
                            list.map((value,index)=>{
                                return (
                                    <button
                                        key={index}
                                        onClick={()=>{
                                            setOmnibox((oldOmnibox)=>{
                                                const mapFlagment = domainList.get(value)
                                                if(domainList && mapFlagment !== undefined){
                                                    return mapFlagment.domain
                                                }
                                                else{
                                                    return oldOmnibox
                                                }
                                            })
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Image
                                            src={value ? value : ""}
                                            alt=""
                                            height={32}
                                            width={32}
                                        />
                                    </button>
                                )
                            })
                        }
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DomainElement;