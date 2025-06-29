"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    const markup1 = "`Welcome ${request.data.name} to our first CAPM Project`" ;

    return (
        <main className='main'>
            <h1>Create a Blank CAP Project</h1>

            <div className='content'>

                <p>In this example, We will try to create a simple CAPM Project.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create a Folder / Directory.</ol>
                    <ol>2. Create a Project inside the Folder / Directory.</ol>
                    <ol>3. Create a Service (JS) File and define some api endpoints.</ol>
                    <ol>4. Create a Service (CDS) File with same name as JS file and declare the api endpoints.</ol>
                    <ol>5. To Build and generate Build File.</ol>
                    <ol>6. To Deploy the Built Application.</ol>
                </ul>

                <h2>Step 1 - Create a Folder / Directory</h2>

                <p>We will create a Folder / Directory and inside the Folder / Directory we will create the Project.</p>

                <p>In the terminal create a folder using below comman - </p>

                <CodeBlock code={`mkdir <Folder Name>`} language="xml" />

                <p>To move inside the Folder / Directory - </p>

                <CodeBlock code={`cd <Folder Name>`} language="xml" />

                
                
                <h2>Step 2 - Create a Project inside the Folder / Directory</h2>

                <p>To create capm project - </p>

                <CodeBlock code={`cds init <project name>`} language="xml" />

                <p>Move inside the project folder - </p>

                <CodeBlock code={`cd <project name>`} language="xml" />

                <p>Install npm dependencies - </p>

                <CodeBlock code={`npm install`} language="xml" />
                
                <p>It will create a blank CAPM project having 3 blank folders inside it and 1 eslint configuration file and 1 package.json file.</p>

                <p>The <span className='highlight'>app Folder</span> is used to create our UI (Fiori).</p>

                <p>The <span className='highlight'>db Folder</span>  is used to create our database model.</p>

                <p>The <span className='highlight'>srv Folder</span>  is used to create our services.</p>

                <h2>Step 3 - Create a Service File and define api endpoints</h2>

                <p>In the <span className='highlight'>srv folder</span>, create a file with js extension.</p>

                <p>For example - We have created <span className='highlight'>myService.js</span> file.</p>

                <p>We will define 2 endpoints <span className='highlight'>welcomeFunction and welcomeSomeOne</span> which will return greeting string.</p>

                <p>Refer the below code -</p>

                <CodeBlock code={`
const myServiceFunction = function(srv){
    
    srv.on("welcomeFunction", (request, response) => {
        return("Welcome to our First CAPM Project.");
    });
    
    srv.on("welcomeSomeOne", (request, response) => {
        return(${markup1});
    });
        
};
        
        
module.exports = myServiceFunction ;
        `} language="javascript" />

                <h2>Step 4 - Create a Service (CDS) File with same name as JS file and declare the api endpoints</h2>

                <p>Refer the below code to declare the API Endpoints in <span className='highlight'>cds file</span> (Note the CDS file and JS file should have same name).</p>

                <CodeBlock code={`service myServiceFunction {
    
    function welcomeFunction() returns String ;
    
    function welcomeSomeOne(name : String) returns String ;
    
}`} language="javascript" />

                <h2>Step 5 - To Build and Generate Build File</h2>

                <CodeBlock code={`mbt build -t gen --mtar mta.tar `} language="javascript" />

                <h2>Step 6 - To Deploy the Built Application</h2>

                <CodeBlock code={`cf deploy gen/mta.tar  `} language="javascript" /> 




                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;