"use client"
import PrismLoader from "@/app/Components/PrismLoader/prism-loader";
import { useContext, useEffect, useState } from 'react';
import './ContentList.css'
import MyContext from '@/app/BlogContextProvider/MyContext';
import { fiori, capm } from '@/app/Resources/ContentList';
import Link from 'next/link';

const ContentList = () => {
    
    const [displayFiori, setDisplayFiori] = useState(fiori);

    const [displayCapm, setDisplayCapm] = useState(capm);

    const { hamburger, setHamburger } = useContext(MyContext);

    const [searchText, setSearchText] = useState("");


    // Handle Search here.
    const handleSearch = (event) => {
        setSearchText(event.target.value);

        if(event.target.value ===""){
            setDisplayFiori(fiori);
            setDisplayCapm(capm);
            console.log("it is empty")
            return
        }

        // console.log(event.target.value)

        const fioriTopicList = [] ;

        const capmTopicList = [] ;

        fiori.forEach(fioriElement => {
            const topic = (fioriElement.title).toLowerCase();
            const searchedTopic = searchText.toLowerCase();
            if(topic.includes(searchedTopic)){
                fioriTopicList.push(fioriElement);
            }
        });

        
        capm.forEach(capmElement => {
            const topic = (capmElement.title).toLowerCase();
            const searchedTopic = searchText.toLowerCase();
            if(topic.includes(searchedTopic)){
                capmTopicList.push(capmElement);
            }
        });
        

        setDisplayFiori(fioriTopicList) ;
        setDisplayCapm(capmTopicList) ;
    }


    return (
        <aside className={hamburger}>

            {/* Search the content on Fiori and CAPM */}

            <input type='text' placeholder='Search' className='search' name='search' onChange={handleSearch} value={searchText} />

            {/* For Fiori Contents */}

            <h3 className='list-topic-header'>Fiori</h3>
            <div className='topic-content'>
                {displayFiori.map(eachElement => {
                    return <Link key={eachElement.title} href={eachElement.link} className='contentList-item' >{eachElement.title}</Link>
                })}
            </div>
            
            {/* For CAPM Content */}
            
            <h3 className='list-topic-header'>CAPM</h3>
            <div className='topic-content'>
                {displayCapm.map(eachElement => {
                    return <Link key={eachElement.title} href={eachElement.link} className='contentList-item' >{eachElement.title}</Link>
                })}
            </div>
        </aside>
    );
}

export default ContentList;