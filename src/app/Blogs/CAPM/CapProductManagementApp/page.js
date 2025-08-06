"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    return (
        <main className='main'>
            <h1>CAP Product Management App with CRUD Operation</h1>

            <div className='content'>

                <p>In this example, Our goal is to create Product Management CAP Application.</p>

                <p className='tomato'>Github link - <a href='https://github.com/HimanshuSap124/Product-Management-CAP-App' className='aLink highlight' target='_blank'>https://github.com/HimanshuSap124/Product-Management-CAP-App</a></p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Creating a CAP App.</ol>
                    <ol>2. Create Schema in db and Add Data.</ol>
                    <ol>3. Create Service cds file and declare the endpoints.</ol>
                    <ol>4. Create Service js file and define the endpoint logic.</ol>
                    <ol>5. Create the utility Files.</ol>
                    <ol>6. Create Test API File.</ol>
                    <ol>7. Deploy on SQLite Server to run the application Locally.</ol>
                    <ol>8. To add Hana, mta file, xsuaa and approuter file.</ol>
                    <ol>9. Define Destination Service configuration and Logger service configuration on mta file.</ol>
                    <ol>10. Update and Lock Package lock file and Build, Deploy the application.</ol>
                </ul>



                <h2>Step 1 - Creating a CAP App</h2>

                <p>Use the below command to create a CAP Application - </p>

                <CodeBlock code={`cds init <Project_Name> `} language="javascript" />

                <p>Here, our Application name is warehouse-cap-app</p>

                <p>Now, go inside the Project Folder, and install the dependencies. - </p>

                <CodeBlock code={`cd <Project_Name> `} language="javascript" />

                <CodeBlock code={`npm install`} language="javascript" />







                <h2>Step 2 - Create Schema in db and Add Data</h2>

                <p>In the Project on <span className='highlight'>db folder</span> we have define <span className='highlight'>Schema.cds</span> file which you can refer.</p>

                
                <h2>Step 3 - Create Service cds file and declare the endpoints</h2>

                <p>In the Project on <span className='highlight'>srv folder</span> we have define <span className='highlight'>custom-service.cds</span> file which you can refer.</p>

                <p>In this file, we have declared all the endpoints which we are going to use.</p>





                <h2>Step 4 - Create Service js file and define the endpoint logic</h2>
                
                <p>In the Project on <span className='highlight'>srv folder</span> we have define <span className='highlight'>custom-service.js</span> file which you can refer.</p>

                <p>In this file, we have defined the endpoints and simply calling the logic methods from specific utility folder.</p>



                <h2>Step 5 - Create the utility Files</h2>

                <p>In the Project on <span className='highlight'>srv folder</span> we have define <span className='highlight'>ProductUtility.js</span> file and <span className='highlight'>OrderUtility.js</span> file on which we have defined the Product CRUD Logics and Order CRUD Logics which you can refer.</p>


                <h2>Step 6 - Create Test API File.</h2>

                <p>In the project, I have created <span className='highlight'>Test API Folder</span> inside which I have defined <span className='highlight'>testAPI.http</span> file and defined endpoints to test the application.</p>



                <h2>Step 7 - Deploy on SQLite Server to run the application Locally</h2>

                <p>Use the below line of command to deploy it Locally on SQLite DB -</p>

                <CodeBlock code={`cds deploy --to sqlite:./db.sqlite`} language='javascript' />

                <p>Now run the application using <span className='highlight'>cds watch</span> and test the endpoints using testAPI.http file.</p>


                <h2>Step 8 - To add Hana, mta file, xsuaa and approuter file</h2>

                <CodeBlock code={`cds add hana,mta,xsuaa,approuter --for production `} language='javascript' />


                <h2>Step 9 - Define Destination Service configuration and Logger service configuration on mta file</h2>

                <p>In the <span className='highlight'>mta.yml</span> we have defined the Destination service configuration.</p>

                <p>(Refer to line 30, 62, and 107 for destination configuration and line 31 , 114 for Logger Service configuration in mta file)</p>


                <h2>Step 10 - Update and Lock Package lock file and Build, Deploy the application</h2>

                <CodeBlock code={`npm update --package-lock-only `} language='javascript' />
                <CodeBlock code={`mbt build -t gen --mtar mta.tar `} language='javascript' />
                <CodeBlock code={`cf deploy gen/mta.tar  `} language='javascript' />



                
                <p>And it is done, You can deploy your app and use it. !!!</p>


            </div>

        </main>
    );
}

export default page;