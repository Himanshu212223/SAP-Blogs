'use client';

import '@/ComponentCss/Hamburger.css'
import Link from 'next/link';
import { useState } from 'react';

const Hamburger = () => {

    const [hamburger, setHamburger] = useState(false);

    const handleHamburger = () => {
        if(hamburger){
            setHamburger(false);
        }
        else{
            setHamburger(true);
        }
    }

    return (
        <div className='hambuerger-list'>
            <i className="fa-solid fa-bars hamburger-icon" onClick={handleHamburger}></i>
            
            <div className={hamburger ? 'hamburger-content-visible' : 'hamburger-content-hidden'}>
                
                <i className="fa-solid fa-x close" onClick={handleHamburger} ></i>
                
                <div className='hamburger-content-list'>
                    <div className='hamburger-content-list-item'>This is content 1.</div>
                    <Link href="/" className='hamburger-content-list-item'>This is content 1.</Link>
                    <Link href="/Blogs/sample1" className='hamburger-content-list-item'>This is content 1.</Link>
                    <Link href="/Blogs/sample2" className='hamburger-content-list-item'>This is content 1.</Link>
                </div>
                
            </div>

        </div>
    );
}

export default Hamburger;