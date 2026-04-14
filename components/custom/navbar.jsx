import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import Hamburger from "./hamburger";

const NavBar = () => {

    return(
        <nav className="h-15 flex items-center justify-between px-2 md:px-20 bg-gray-200">
            {/* Hamburger */}
            {/* <Button variant="ghost" className="md:hidden text-lg"><RxHamburgerMenu /></Button> */}
            {/* <RxHamburgerMenu className="text-2xl md:hidden" onClick={() => {console.log("It has been clicked bro")}} /> */}
            <Hamburger />


            {/* Logo */}
            <Link href={"/"} ><h1 className="text-2xl md:text-2xl font-bold text-gray-500">NOTE<span className="text-gray-950">SAP</span>P</h1></Link>

            {/* Search */}
            {/* <Input placeholder="This is Search" className="w-xl" /> */}

            {/* Github */}
            <Link href={"https://github.com/HimanshuSap124"} target='_blank'><Button className="cursor-pointer"><Image src={"/icons/github.png"} height={20} width={20} className='invert' alt='github' /> <span className="hidden sm:block">Github</span></Button></Link>
        </nav>  
    );
}

export default NavBar;