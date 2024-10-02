"use client";

import '@/ComponentCss/SideBar.css'
import Hamburger from './Hamburger';
import { useState , useEffect } from 'react';
import Link from 'next/link';
import {fiori} from '@/Resources/contentList.js'

const SideBar = () => {

    const [fetchedFioriTopics, setFetchedFioriTopics] = useState({}) ;
    const [fioriTopics, setFioriTopics] = useState([]);

    useEffect(() => {
      setFetchedFioriTopics(fiori);
      setFioriTopics(fiori);
    }, []);
    


    const handleSearch = (event) => {
        let searched = event.target.value ;
        searched = searched.toLowerCase();

        
        setFioriTopics(null) ;

        let newTopics = [] ;
        fetchedFioriTopics.forEach(element => {
            let elementTitle = element.title.toLowerCase();
            if(elementTitle.includes(searched) ){
                newTopics.push(element) ;
            }
        })

        setFioriTopics(newTopics);
    }

    return (
        <>
            {/* <Hamburger /> */}

            <div className='sideBar'>

                
                <input className='search' placeholder='Search' onChange={handleSearch} />
                
                <div className='fiori-container'>

                    <p className='fiori'>Fiori</p>
                    {/* <div className={fiori ? 'fiori-items-visible' : 'fiori-items-hidden'}> */}

                    <div className='fiori-items-visible'>
                        {/* <Link className='side-bar-item' href="/Blogs/ImportExcelToFiori">Import Excel To Fiori</Link>
                        <Link className='side-bar-item' href="/Blogs/ConnectToJsonModel">Configure JSON Model with Fiori UI5 Application</Link> */}
                        {
                        fioriTopics && fioriTopics.map((element) => {
                            return <Link key={element.link} className='side-bar-item' href={element.link}>{element.title}</Link>    
                        })
                    }
                    </div>

                    

                </div>

            </div>
        </>
    );
}

export default SideBar;