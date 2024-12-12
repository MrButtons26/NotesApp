import { useEffect, useState } from "react"
import { product,teams,individuals,download,valueCheck } from "../utils/DropDownLists"
type ListData={
    ListName:string,
    Value?:number
}
export default function DropDown(listData:ListData):JSX.Element{
const [dropDownData,setDropDownData]=useState<string[]|[]|string[][]>([])
useEffect(()=>{
    switch (listData.Value) {
        case 1:
            setDropDownData([...product])
            break;

            case 2:
                setDropDownData([...teams])
            break;

            case 3:
                setDropDownData([...individuals])
            break;
        
            case 4:
                setDropDownData([...download])
            break;
    }
},[listData.Value])
console.log(listData.Value)
console.log(dropDownData)
return(<>
{dropDownData.length!==0&&listData.Value==1?<div className="absolute top-8 shadow-2xl flex flex-col w-[180px] px-1 py-3 rounded-lg">{dropDownData.map((el,i)=><div key={i} className="flex flex-col px-[5px] py-1 hover:bg-[#0000000d] rounded-lg"><h1 className="self-start font-semibold">{el[0]}</h1><span className="self-start text-[14px] text-gray-600">{el[1]}</span></div>)}</div>:
dropDownData.length!==0&&valueCheck(listData.Value)&&<div className="absolute top-11 shadow-2xl flex flex-col w-[120px] px-1 py-2 rounded-lg">{dropDownData.map((el,i)=><div key={i} className="flex flex-col px-[5px] py-1 hover:bg-[#0000000d] rounded-lg"><h1 className="self-start ">{el}</h1></div>)}</div>}
</>)
}