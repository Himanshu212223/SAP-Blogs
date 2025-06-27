"use client"

import { useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({children}) => {

    const [hamburger, setHamburger] = useState('contentList') ;

    return (
        <MyContext.Provider value={{hamburger, setHamburger}}>
            {children}
        </MyContext.Provider>
    );
}

export default MyContextProvider ;