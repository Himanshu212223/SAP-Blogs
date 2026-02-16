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
            <h1>CAP File structure and flow of execution</h1>

            <div className='content'>

                <p>We will try to understand the use of each file present on CAP (Cloud Application Programming) app and will also check the flow of execution.</p>




                <h2>CAP App structure</h2>


                <CodeBlock code={
`cap-app
|
|- app
|- db
|   |- schema.cds
|- srv
|   |- service.cds
|   |- service.js
|- .cdsrc.json
|- mta.yaml
|- package.json
|- package-lock.json
|- xs-security.json
`} language="javascript" />

                
                <h2>1. app folder</h2>

                <p>The app folder contains frontend applications, typically <span className='highlight'>SAP Fiori Elements apps, SAPUI5 applications</span> file and It is <span className='tomato'>not mandatory</span>, but used when you want UI inside the same project.</p>
                

                <h2>2. db folder</h2>

                <p>It contains your CDS (Core Data Service) entities and database artifacts.</p>
                <p>it creates tables in HANA / SQLite, defines relationships, etc.</p>
                
                
                <h2>3. srv folder</h2>

                <p>This folder contains your <span className='highlight'>services(.cds file) and business logic(.js file)</span>. </p>
                <p>It exposes OData or REST APIs.</p>


                <h2>4. .cdsrc.json</h2>

                <p>This is the CAP configuration file.</p>
                <p>It contains settings like database type, external services, authentication, etc.</p>
                <p>It also contains CAP runtime configuration.</p>
                
                
                
                <h2>5. mta.yaml</h2>

                <p>Multi-Target App descriptor for Cloud Foundry deployment.</p>
                <p>It defines your modules <span className='highlight'>(srv, db, approuter)</span> and resources <span className='highlight'>(HDI container, XSUAA)</span>.</p>
                <p>Used when you <span className='highlight'>build/deploy</span> to BTP.</p>
                
                
                <h2>6. package.json</h2>

                <p>This is the main Node.js project file.</p>
                <p>It contains-</p>
                <p>- Dependencies (like @sap/cds)</p>
                <p>- Scripts (start, build, etc.)</p>
                <p>- Project configuration</p>

                <p>Means, It contains project dependencies and settings.</p>



                <h2>7. package-lock.json</h2>

                <p>This file locks the <span className='highlight'>exact versions</span> of dependencies.</p>
                <p>It ensures everyone installs the same versions.</p>
                <p>So this file is known for version control for dependencies.</p>



                <h2>8. xs-security.json</h2>

                <p>This file is used for <span className='highlight'>authentication and authorization (XSUAA)</span>.</p>
                <p>It defines <span className='highlight'>roles, scopes, and security settings</span>.</p>
                

              <h1>What happens when you run the app locally</h1>

<CodeBlock code={
    `
cds watch
→ Read config
→ Compile CDS (db + srv)
→ Deploy local DB (SQLite) + load CSV data
→ Start Express server
→ Register handlers from srv/cat-service.js
→ Serve OData endpoints (e.g., /catalog)
→ Handle requests (before → on → after → DB → response)
`} language="javascript" />




                <h1>Build time: </h1>

<CodeBlock code={
    `
CDS → HANA artifacts + service metadata 
(via cds build, mbt build).
`} language="javascript" />


                <h1>Deploy time: </h1>

<CodeBlock code={
    `
CF creates DB (HDI), auth (XSUAA), starts srv & approuter.
`} language="javascript" />



                <h1>Runtime: </h1>

<CodeBlock code={
    `
Request passes Approuter → XSUAA → srv. 
CAP checks auth, runs your handlers in srv/cat-service.js, 
uses HANA for data, returns response.
`} language="javascript" />



                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;