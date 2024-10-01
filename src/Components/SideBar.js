"use client";

import '@/ComponentCss/SideBar.css'
import Hamburger from './Hamburger';
import { useState } from 'react';
import Link from 'next/link';

const SideBar = () => {

    const [fiori, setFiori] = useState(false);

    const handleFiori = () => {
        if (fiori) {
            setFiori(false);
        }
        else {
            setFiori(true);
        }
    }

    return (
        <>
            {/* <Hamburger /> */}

            <div className='sideBar'>
                
                <div className='fiori-container'>
                    
                    <p className='fiori' onClick={handleFiori}>Fiori</p>
                    {/* <div className={fiori ? 'fiori-items-visible' : 'fiori-items-hidden'}> */}
                    
                    <div className='fiori-items-visible'>
                        <Link className='side-bar-item' href="/Blogs/ImportExcelToFiori">Import Excel To Fiori</Link>
                        <Link className='side-bar-item' href="/Blogs/ConnectToJsonModel">Configure JSON Model with Fiori UI5 Application</Link>
                    </div>
                
                </div>

            </div>
        </>
    );
}

export default SideBar;