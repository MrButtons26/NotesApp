
import { useState } from "react";
import DropDown from "./DropDown";
import { useNavigate } from "react-router";

export default function Navbar(): JSX.Element {
    const [activeButton,setActiveButton]=useState<number>(-1);
    const navigate=useNavigate();
    return (
        <div className="flex justify-between mx-5 py-3 items-center" style={{ fontFamily: 'oswald' }}>
            <div className="flex gap-5 items-center">
                <h1 className="navbar-heading text-[22px] border-[1px] px-2 border-black cursor-pointer"onClick={()=>navigate('/')}>Notes</h1>
                <button onMouseEnter={()=>setActiveButton(1)} onMouseLeave={()=>setActiveButton(-1)}  className="flex relative gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Product
                    <span className="relative top-[2px]"> <ion-icon name="chevron-down-outline"></ion-icon></span>
                    {activeButton===1&&<DropDown ListName='Product' Value={activeButton}></DropDown>}
                </button>
                <button onMouseEnter={()=>setActiveButton(2)} onMouseLeave={()=>setActiveButton(-1)} className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Teams
                    <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    {activeButton===2&&<DropDown ListName='Teams' Value={activeButton}></DropDown>}
                </button>
                <button onMouseEnter={()=>setActiveButton(3)} onMouseLeave={()=>setActiveButton(-1)}  className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">
                    Individuals
                    <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span>
                    {activeButton===3&&<DropDown ListName='Individuals'  Value={activeButton}></DropDown>}
                </button>
                <button  onMouseEnter={()=>setActiveButton(4)} onMouseLeave={()=>setActiveButton(-1)} className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Download
                     <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span>
                     {activeButton==4&&<DropDown ListName='Download' Value={activeButton}></DropDown>}

                </button>
                <button className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]" onClick={()=>{navigate('/notes')}}>Notes 
                    </button>
            </div>
            <div className="flex ">
                <button onClick={()=>navigate('/login')} className="bg-black text-white px-3 py-1 rounded-md  border-[1px] transition-all transition-duration: 200ms border-black hover:bg-white hover:text-black">Log in</button>
            </div>
        </div>
    );
}
