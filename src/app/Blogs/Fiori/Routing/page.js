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

                <p>In <span className='highlight'>Controller Folder</span>, create a controller file for the view like we are creating <span className='highlight'>Second.controller.js</span> file.</p>

                <p>Add the below code on your Controller file.</p>

                <CodeBlock code={`
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("fiori.auditlog.controller.Second", {
        onInit() {
        },

		
    });
});`} language="javascript" />



                <h2>Step 3 - Configure the View on manifest.json file</h2>
                
                <p>Now go to <span className='highlight'>manifest.json</span> file and add the <span className='highlight'>Second View</span> on routes array.</p>

                <CodeBlock code={`
{
    "name": "Second",
    "pattern": "second",
    "target": "secondTarget"
}`} language="javascript" />

                <p>(you can use any name instead of Second)</p>

                <p>So, the routes array of manifest.json file looks like below -</p>
                
                <CodeBlock code={`
"routes": [
    {
        "name": "RouteView1",
        "pattern": ":?query:",
        "target": [
        "TargetView1"
        ]
    },
    {
        "name": "Second",
        "pattern": "second",
        "target": "secondTarget"
    }
],`} language="javascript" />
                
               <p>Now, on <span className='highlight'>manifest.json</span> file only, add the below lines on <span className='highlight'>targets</span> object.</p> 

               <CodeBlock code={`
"secondTarget": {
    "id": "second",
    "name": "Second",
    "transition" : "slide"
}`} language="javascript" />

                <p>Here, id - Second is the id of the new view which we created on step 1.</p>
            
                <p>So, targets object of manifest.json file looks like below -</p>

                <CodeBlock code={`
"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "secondTarget": {
        "id": "second",
        "name": "Second",
        "transition" : "slide"
    }
}`} language="javascript" />

                <h2>Step 4 - Create Button on View 1 and define its method on Controller file</h2>
                
                <p>In <span className='highlight'>View1.view.xml</span> file, create a Button for navigation.</p>
                
                <CodeBlock code={`
<Button id="goToSecond" text="Go to Second" press="navToSecond"></Button>`} language="xml" />

                <p>Add the logic in <span className='highlight'>View1.controller.js</span> file for navToSecond function which will nagivate you from View1 to Second View.</p>

                <CodeBlock code={`
navToSecond : function(oEvent){
    const router = UIComponent.getRouterFor(this) ;
    router.navTo("Second")
}`} language="javascript" />

                <p>Do not forget to add the <span className='highlight'>UIComponent library</span> at the top on the Controller and pass the same on the define function.</p>

                <p>So, the <span className='highlight'>View1.controller.js</span> file will look like below -</p>

                <CodeBlock code={`
sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], (Controller, UIComponent) => {
    "use strict";

    return Controller.extend("fiori.auditlog.controller.View1", {
        onInit() {
        },

		navToSecond : function(oEvent){
			const router = UIComponent.getRouterFor(this) ;
			router.navTo("Second")
		}

    });
});`} language="javascript" />

                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;