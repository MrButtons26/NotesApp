



export default function Navbar(): JSX.Element {
    return (
        <div className="flex justify-between mx-5 py-3 items-center" style={{ fontFamily: 'oswald' }}>
            <div className="flex gap-5 items-center">
                <h1 className="navbar-heading text-[22px] border-[1px] px-2 border-black cursor-pointer">Notes</h1>
                <button className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Product
                    <span className="relative top-[2px]"> <ion-icon name="chevron-down-outline"></ion-icon></span>
                </button>
                <button className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Teams
                    <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span>
                </button>
                <button className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">
                    Individuals
                    <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span>
                </button>
                <button className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Download <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span></button>
                <button className="flex gap-1  px-1.5 py-1 rounded-md hover:bg-[#0000000d]">Pricing <span className="relative top-[2px]"><ion-icon name="chevron-down-outline"></ion-icon></span></button>
            </div>
            <div className="flex gap-5">
                <button>Log in</button>
                <button> Get Notes Free</button>
            </div>
        </div>
    );
}
