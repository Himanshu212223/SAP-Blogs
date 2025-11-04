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
            <h1>Create CAP App using TypeScript</h1>

            <div className='content'>

                <p>In this example, Our goal is to setup and create CAP Application for TypeScript.</p>

                {/* <p className='tomato'>Github link - <a href='https://github.com/HimanshuSap124/Product-Management-CAP-App' className='aLink highlight' target='_blank'>https://github.com/HimanshuSap124/Product-Management-CAP-App</a></p> */}

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Creating a CAP App.</ol>
                    <ol>2. Install the Dependencies.</ol>
                    <ol>3. Initializes TypeScript in your project.</ol>
                    <ol>4. Create custom type declaration for @sap/cds.</ol>
                    <ol>5. Update tsconfig.json File.</ol>
                    <ol>6. Update Script on `package.json` file.</ol>
                    <ol>7. Create Service cds file.</ol>
                    <ol>8. Create Custom Service Implementation ts file.</ol>
                    <ol>9. How to run the project.</ol>
                </ul>



                <h2>Step 1 - Creates a new CAP project</h2>

                <p>Use the below command to create a CAP Application - </p>

                <CodeBlock code={`cds init <Project_Name> `} language="javascript" />

                <p>Here, our Application name is tscap</p>

                <p>Now, go inside the Project Folder, and install the dependencies. - </p>

                <CodeBlock code={`cd <Project_Name> `} language="javascript" />







                <h2>Step 2 - Install the Dependencies</h2>

                <p>Use the below commands to install the dependencies to setup the project.</p>

                <CodeBlock code={`npm install --save-dev typescript ts-node tsx @types/node @sap/cds`} language="javascript" />

                OR

                <CodeBlock code={`npm install typescript ts-node @types/node --save-dev @sap/cds --save-dev tsx typescript`} language="javascript" />
                
                <p>Below are the details of the Dependencies we are installing -</p>

                <p><span className='highlight'>typescript</span> - The TypeScript compiler (tsc). It lets you write code in .ts files and compile it to JavaScript.</p>

                <p><span className='highlight'>ts-node</span> - Runs TypeScript files directly without compiling them first — useful for quick scripts or development.</p>

                <p><span className='highlight'>tsx</span> - A fast, modern TypeScript/ESM runner similar to ts-node, but faster and supports modern module systems (ESM, JSX, etc.). Many new projects prefer tsx.</p>

                <p><span className='highlight'>@types/node</span> - TypeScript type definitions for Node.js built-in modules (like fs, path, etc.). Without this, TypeScript wouldn’t know Node’s API types.</p>

                <p><span className='highlight'>@sap/cds</span> - The SAP Cloud Application Programming Model (CAP) core library. It provides tools and APIs to define CDS models (.cds files), services, and entities for SAP applications.</p>



                <p>What happens when you run it -</p>
                <p>1. npm downloads all these packages and their dependencies.</p>
                <p>2. Adds them to your package.json under devDependencies.</p>
                <p>3. Creates or updates a package-lock.json file.</p>
                <p>4. Installs them into your node_modules directory.</p>


                <p>To install sqlite3, we can use below command - </p>
                
                <CodeBlock code={`npm install sqlite3`} language="javascript" />





                <h2>Step 3 - Initializes TypeScript in your project</h2>

                <CodeBlock code={`npx tsc --init`} language="javascript" />

                <p>It Initializes the typescript in the project and creates <span className='highlight'>tsconfig.json</span> file.</p>





                <h2>Step 4 - Create custom type declaration for @sap/cds</h2>

                <p>Create a file named - <span className='highlight'>types/@sap__cds/index.d.ts</span></p>

                <p>Inside the file, declare a module and define cds of type any as below -</p>

                <CodeBlock code={`
declare module '@sap/cds' {
  const cds: any;
  export = cds;
}`} language="javascript" />
                
                




                <h2>Step 5 - Update tsconfig.json File</h2>

                <p>On the <span className='highlight'>tsconfig.json</span> file, update the below properties - </p>
                <p><span className='highlight'>target</span> : ES2020</p>
                <p><span className='highlight'>module</span> : CommonJS</p>
                <p><span className='highlight'>rootDir</span> : srv</p>
                <p><span className='highlight'>outDir</span> : gen/srv</p>
                <p><span className='highlight'>esModuleInterop</span> : true</p>
                <p>Also define the <span className='highlight'>typeRoots</span> and <span className='highlight'>include</span>.</p>

                <p>You can copy the below details and replace the content of <span className='highlight'>tsconfig.json</span> file</p>


                <CodeBlock code={`
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "srv",
    "outDir": "gen/srv",
    "strict": true,
    "esModuleInterop": true,
    "typeRoots": [
      "./node_modules/@types",
      "./types"
    ]
  },
  "include": [
    "srv/**/*.ts",
    "types/**/*.d.ts"
  ]
}`} language="json" />






                <h2>Step 6 - Update Script on `package.json` file</h2>

                <p>In the <span className='highlight'>package.json</span> file add the below script in the <span className='highlight'>script</span> section.</p>

                <CodeBlock code={`"dev" : "tsc && cds watch"`} language="javascript" />








                <h2>Step 7 - Create Service cds file</h2>

                <p>Create your service cds file (lets say <span className='highlight'>MyService.cds</span> file) on srv folder and define the service like below-</p>

                <CodeBlock code={`service CustomService {
    function workingFine() returns String ;
    }`} language='javascript' />








                <h2>Step 8 - Create Custom Service Implementation ts file</h2>

                <p>Create your custom service implementation ts file (lets say <span className='highlight'>MyService.ts</span> file) on srv folder and define the service like below-</p>

                <CodeBlock code={`import cds from '@sap/cds';

export default cds.service.impl((srv : any) => {
  // service logic
  srv.on('workingFine', async (request : any) => {
    return "working fine"
  });
});`} language='javascript' />







                <h2>Step 9 - How to run the project</h2>

                <p>Use the below command to run the project -</p>

                <CodeBlock code={`npm run dev`} language='javascript' />



                
                <p>And it is done, You can deploy your app and use it. !!!</p>


            </div>

        </main>
    );
}

export default page;