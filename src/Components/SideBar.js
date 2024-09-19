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
                        <Link className='side-bar-item' href="/Blogs/sample1">Fiori</Link>
                        <Link className='side-bar-item' href="/Blogs/sample2">Fiori</Link>
                        <Link href="/" className='side-bar-item' >Fiori</Link>
                        <p className='side-bar-item' >Fiori</p>
                        <p className='side-bar-item' >Fiori</p>
                        <p className='side-bar-item' >Fiori</p>
                        <p className='side-bar-item' >Fiori</p>
                    </div>
                
                </div>

            </div>
        </>
    );
}

export default SideBar;