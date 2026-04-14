"use client" ;

import {createContext, useState} from 'react' ;

//  Create the Contenxt first
export const AppContext = createContext() ;

//  Create your Provider
export const AppContextProvider = ({children}) => {
    // define your variables and their methods here
    const [visibleHamburger, setVisibleHamburger] = useState(false) ;

    return (
        <AppContext.Provider value={{visibleHamburger, setVisibleHamburger}}>
            {children}
        </AppContext.Provider>
    );
};