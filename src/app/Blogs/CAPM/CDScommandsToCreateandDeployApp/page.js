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
            <h1>CDS Commands to Create and Deploy the CAP Application.</h1>

            <div className='content'>

                <p>In this document, We will see all the commands which can be used to create and deploy a CAP Application.</p>

                <h2>Creating a CAP App -</h2>

                <CodeBlock code={`cds init <Project_Name> `} language="javascript" />

                <p>Now, go inside the Folder, and install the dependencies.</p>

                <CodeBlock code={`cd <Project_Name> `} language="javascript" />

                <CodeBlock code={`npm install `} language="javascript" />

                <h2>After creating the Schema, if you want to generate csv file to store sample data -</h2>

                <CodeBlock code={`cds add data `} language="javascript" />

                <h2>To deploy the db data in SQLite server-</h2>

                <p>add the below line of code in <span className='highlight'>package.json</span> file <span className='highlight'>below the script object</span></p>

                <CodeBlock code={`"cds" : { "requires" : {
    "db" : {
        "kind" : "sqlite",
        "credentials: " : { "url" : "db/managementCAP.sqlite" }
        }
        }
        } `} language="javascript" />

        
                <p>Use the below line of command to deploy it.</p>

                <CodeBlock code={`
cds deploy --to sqlite:./db.sqlite
                    `} language="javascript" />
                
                
                <h2>To add Hana, mta file, xsuaa and approuter file</h2>

                <CodeBlock code={`cds add hana,mta,xsuaa,approuter --for production `} language="javascript" />

                
                <h2>To Deploy the app -</h2>

                <CodeBlock code={`cds deploy `} language="javascript" />
                
                <h2>Command to update and lock the package lock file -</h2>

                <CodeBlock code={`npm update --package-lock-only `} language="javascript" />
                
                <h2>To Build and generate Build File -</h2>

                <CodeBlock code={`mbt build -t gen --mtar mta.tar `} language="javascript" />
                
                <h2>To Deploy the Build File -</h2>

                <CodeBlock code={`cf deploy gen/mta.tar  `} language="javascript" />



                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;