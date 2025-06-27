"use client"

import { useContext } from 'react';
import './NavBar.css'
import MyContext from '@/app/BlogContextProvider/MyContext';
import Link from 'next/link';

const NavBar = () => {

    const { hamburger, setHamburger } = useContext(MyContext) ;

    const handleHamburger = () => {
        if(hamburger === 'contentList'){
            setHamburger('showContentList');
        }
        else{
            setHamburger('contentList');
            console.log(hamburger)
        }
    }

    return(
        <nav className="navbar">
            <Link href={"/"} className='logo'>my<span className='REF'>REF</span></Link>
            <div className='icons'>
                <a href='https://github.com/Himanshu212223' className="fa-brands fa-github git-icon" aria-hidden="true"></a>
                <span className='hamburger-icon' onClick={handleHamburger} ><i className="fa-solid fa-bars hamburger" aria-hidden="true" onClick={handleHamburger} ></i></span>
            </div>
        </nav>
    );
}

export default NavBar ;