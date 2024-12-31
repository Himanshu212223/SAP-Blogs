'use client';

import '@/ComponentCss/Hamburger.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fiori, capm } from '@/Resources/contentList.js'

const Hamburger = () => {

    const [hamburger, setHamburger] = useState(false);

    const [fetchedFioriTopics, setFetchedFioriTopics] = useState({});
    const [fioriTopics, setFioriTopics] = useState([]);
    const [fioriVisibility, setFioriVisibility] = useState(false);

    const [fetchCapmTopics, setCapmFetchTopics] = useState([]);
    const [capmTopics, setCapmTopics] = useState([]);
    const [capmVisibility, setCAPMVisibility] = useState(false);

    const handleHamburger = () => {
        if (hamburger) {
            setHamburger(false);
        }
        else {
            setHamburger(true);
        }
    }


    useEffect(() => {
        setFetchedFioriTopics(fiori);
        setFioriTopics(fiori);
        setCapmFetchTopics(capm);
        setCapmTopics(capm);
    }, []);



    const handleSearch = (event) => {
        let searched = event.target.value;
        searched = searched.toLowerCase();

        setFioriTopics(null);

        let newTopics = [];
        fetchedFioriTopics.forEach(element => {
            let elementTitle = element.title.toLowerCase();
            if (elementTitle.includes(searched)) {
                newTopics.push(element);
            }
        })

        setFioriTopics(newTopics);
    }


    const handleFioriVisibility = () => {
        setFioriVisibility(!fioriVisibility) ;
    }

    const handleCAPMVisibility = () => {
        setCAPMVisibility(!capmVisibility) ;
    }


    return (
        <div className='hamburger'>
            <i className="fa-solid fa-bars hamburger-bar" onClick={handleHamburger}><span>Content</span></i>

            <div className={hamburger ? "hamburger-visible" : 'hamburger-hidden'}>

                <i className="fa-solid fa-x close" onClick={handleHamburger}></i>

                <div className='hamburger-content'>

                    <input className='search' placeholder='Search' onChange={handleSearch} />

                    <p className='hamburger-item main-topic' onClick={handleFioriVisibility}>Fiori</p>
                    {/* <Link href='/Blogs/ImportExcelToFiori' className='hamburger-item-topic' onClick={handleHamburger} >Import Excel To Fiori</Link>
                    <Link href='/Blogs/ConnectToJsonModel' className='hamburger-item-topic' onClick={handleHamburger} >Configure JSON Model with Fiori UI5 Application</Link> */}
                    <div className={fioriVisibility ? 'hamburger-item-topic-list' : 'hamburger-item-topic-list-hidden'}>
                        {
                            fioriTopics && fioriTopics.map((element) => {
                                return <Link key={element.link} className='hamburger-item-topic' href={element.link} onClick={handleHamburger} >{element.title}</Link>
                            })
                        }
                    </div>

                        <br />

                    <p className='hamburger-item main-topic' onClick={handleCAPMVisibility}>CAPM</p>
                    {/* <Link href='/Blogs/ImportExcelToFiori' className='hamburger-item-topic' onClick={handleHamburger} >Import Excel To Fiori</Link>
                    <Link href='/Blogs/ConnectToJsonModel' className='hamburger-item-topic' onClick={handleHamburger} >Configure JSON Model with Fiori UI5 Application</Link> */}
                    <div className={capmVisibility ? 'hamburger-item-topic-list' : 'hamburger-item-topic-list-hidden'}>
                        {
                            capmTopics && capmTopics.map((element) => {
                                return <Link key={element.link} className='hamburger-item-topic' href={element.link} onClick={handleHamburger} >{element.title}</Link>
                            })
                        }
                    </div>


                </div>

            </div>
        </div>
    );
}

export default Hamburger;