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
            <h1>Routing & Navigation in Fiori UI5</h1>

            <div className='content'>

                <p>In this example, We will create an additional view and navigate from one view to the other upon a button click.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create another View file.</ol>
                    <ol>2. Create Controller file for the View.</ol>
                    <ol>3. Configure the View on manifest.json file.</ol>
                    <ol>4. Create Button on View 1 and define its method on Controller file.</ol>
                </ul>

                <h2>Step 1 - Create another View file</h2>

                <p>In <span className='highlight'>view folder</span> create another view.xml file (Like we have created <span className='highlight'>Second.view.xml</span> file).</p>

                <p>In your newly created view file, define the view using below code.</p>

                <CodeBlock code={`
<mvc:View controllerName="fiori.auditlog.controller.Second"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns:u="sap.ui.unified"
    xmlns="sap.m">
    <Page id="Second" title="{i18n>title}">
        <content>
            <Text id="SecondText" text="Welcome to Second Page"></Text>
        </content>
    </Page>
</mvc:View>`} language="xml" />

                <h2>Step 2 - Create Controller file for the View</h2>



                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;