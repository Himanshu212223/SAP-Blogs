"use client"

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { AppContext } from "@/context/AppContextProvider";

const Hamburger = () => {

    const {visibleHamburger, setVisibleHamburger} = useContext(AppContext) ;

    const toggleHamburger = () => {
        setVisibleHamburger(!visibleHamburger) ;
    }

    return (
        <>
        {
            visibleHamburger ? <RxCross2 className="text-2xl md:hidden" onClick={toggleHamburger} /> : <RxHamburgerMenu className="text-2xl md:hidden" onClick={toggleHamburger} />
        }
        </>
    );
}

export default Hamburger ;