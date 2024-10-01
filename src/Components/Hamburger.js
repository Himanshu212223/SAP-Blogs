'use client';

import '@/ComponentCss/Hamburger.css'
import Link from 'next/link';
import { useState } from 'react';

const Hamburger = () => {

    const [hamburger, setHamburger] = useState(false);

    const handleHamburger = () => {
        if (hamburger) {
            setHamburger(false);
        }
        else {
            setHamburger(true);
        }
    }

    return (
        <div className='hamburger'>
            <i className="fa-solid fa-bars hamburger-bar" onClick={handleHamburger}><span>Content</span></i>

            <div className={hamburger ? "hamburger-visible" : 'hamburger-hidden'}>

                <i className="fa-solid fa-x close" onClick={handleHamburger}></i>

                <div className='hamburger-content'>
                    <p className='hamburger-item main-topic'>Fiori</p>
                    <Link href='/Blogs/ImportExcelToFiori' className='hamburger-item-topic' onClick={handleHamburger} >Import Excel To Fiori</Link>
                    <Link href='/Blogs/ConnectToJsonModel' className='hamburger-item-topic' onClick={handleHamburger} >Configure JSON Model with Fiori UI5 Application</Link>
                </div>

            </div>
        </div>
    );
}

export default Hamburger;