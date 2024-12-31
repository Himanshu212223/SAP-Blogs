"use client";

import '@/ComponentCss/SideBar.css'
import Hamburger from './Hamburger';
import { useState , useEffect } from 'react';
import Link from 'next/link';
import {fiori, capm} from '@/Resources/contentList.js'

const SideBar = () => {

    const [fetchedFioriTopics, setFetchedFioriTopics] = useState({}) ;
    const [fioriTopics, setFioriTopics] = useState([]);
    const [fioriVisibility, setFioriVisibility] = useState(false) ;

    const [fetchedCapmTopics, setFetchedCapmTopics] = useState([]) ;
    const [capmTopics, setCapmTopics] = useState([]) ;
    const [capmVisibility, setCAPMVisibility] = useState(false) ;

    useEffect(() => {
      setFetchedFioriTopics(fiori);
      setFioriTopics(fiori);
      setFetchedCapmTopics(capm);
      setCapmTopics(capm) ;
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



        setCapmTopics(null) ;

        let newCapmTopics = [] ;
        fetchedCapmTopics.forEach(element => {
            let elementTitle = element.title.toLowerCase();
            if(elementTitle.includes(searched)){
                newCapmTopics.push(element) ;
            }
        })

        setCapmTopics(newCapmTopics) ;
    }


    const handleFioriVisibility = () => {
        setFioriVisibility(!fioriVisibility) ;
    }

    const handleCAPMVisibility = () => {
        setCAPMVisibility(!capmVisibility) ;
    }


    return (
        <>
            {/* <Hamburger /> */}

            <div className='sideBar'>

                
                <input className='search' placeholder='Search' onChange={handleSearch} />
                
                <div className='fiori-container'>

                    <p className='fiori' onClick={handleFioriVisibility}>Fiori</p>
                    <div className={fioriVisibility ? 'fiori-items-visible' : 'fiori-items-hidden'}>

                    {/* <div className='fiori-items-visible'> */}
                        {/* <Link className='side-bar-item' href="/Blogs/ImportExcelToFiori">Import Excel To Fiori</Link>
                        <Link className='side-bar-item' href="/Blogs/ConnectToJsonModel">Configure JSON Model with Fiori UI5 Application</Link> */}
                        {
                        fioriTopics && fioriTopics.map((element) => {
                            return <Link key={element.link} className='side-bar-item' href={element.link}>{element.title}</Link>    
                        })
                    }
                    </div>

                </div>

                <br />
                    
                <div className='capm-container'>

                    <p className='capm' onClick={handleCAPMVisibility}>CAPM</p>
                    <div className={capmVisibility ? 'capm-items-visible' : 'capm-items-hidden'}>

                    {/* <div className='fiori-items-visible'> */}
                        {/* <Link className='side-bar-item' href="/Blogs/ImportExcelToFiori">Import Excel To Fiori</Link>
                        <Link className='side-bar-item' href="/Blogs/ConnectToJsonModel">Configure JSON Model with Fiori UI5 Application</Link> */}
                        {
                        capmTopics && capmTopics.map((element) => {
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