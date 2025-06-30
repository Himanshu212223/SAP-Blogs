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
            <h1>Routing & Navigation in Fiori UI5 using Base Controller</h1>

            <div className='content'>

                <p>In this example, We will try to setup Navigation and Routing among Views using Base Controller.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create another View file.</ol>
                    <ol>2. Create Base Controller file in the Controller Folder.</ol>
                    <ol>3. Create Controller file for the View in the Controller Folder.</ol>
                    <ol>4. Extent the Base Controller for View1 Controller.</ol>
                    <ol>5. Configure the View on manifest.json file.</ol>
                    <ol>6. Define Navigation Button and its Method.</ol>
                </ul>

                <h2>Step 1 - Create another View file</h2>

                <p>In <span className='highlight'>view folder</span> create another view.xml file (Like we have created <span className='highlight'>Second.view.xml</span> file).</p>

                <p>In your newly created view file, define the view using below code.</p>

                <CodeBlock code={`
<mvc:View controllerName="namespace.modulename.controller.View2"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <Page id="page2" title="{i18n>title2}" showNavButton="true" navButtonPress="onNavBack">
    <content>
       <Text id="page2text" text="Welcome to View 2" />
    </content>
    </Page>
</mvc:View>`} language="xml" />

                <h2>Step 2 - Create Base Controller file in the Controller Folder</h2>

                <p>In <span className='highlight'>Controller Folder</span>, create a controller file named <span className='highlight'>BaseController.js</span> file.</p>

                <p>Add the below code on your BaseController file.</p>

                <CodeBlock code={`
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
] , (Controller, History, UIComponent) => {
    "use strict" ;

    return Controller.extend("namespace.modulename.controller.BaseController" , {

        RouteTo : function(viewName){
            const router = UIComponent.getRouterFor(this) ;
            router.navTo(viewName) ;
        },


        onNavBack : function() {
            let oHistory = History.getInstance() ;
            let sPreviousHash = oHistory.getPreviousHash() ;

            if(sPreviousHash !== undefined){
                window.history.go(-1) ;
            }
            else{
                this.RouteTo("View1", {}, true) ;
            }
        }


    });
});`} language="javascript" />



                <h2>Step 3 - Create Controller file for the View in the Controller Folder</h2>
                
                <p>In the <span className='highlight'>Controller Folder</span> create Controller file for view like <span className='highlight'>View2.controller.js</span>.</p>

                <CodeBlock code={`
sap.ui.define([
    "namespace/modulename/controller/BaseController"
] , (BaseController) => {
    "use strict" ;

    return BaseController.extend("namespace.modulename.controller.View2" , {
        
        
        onInit() {

        },

    });
});`} language="javascript" />


                <h2>Step 4 - Extent the Base Controller for View1 Controller</h2>


                <p>In the <span className='highlight'>Controller Folder</span>, go to <span className='highlight'>View1Controller.js</span></p>

                <p>Refer the below code -</p>
                
                <CodeBlock code={`
sap.ui.define([
    "namespace/modulename/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("namespace.modulename.controller.View1", {
        
        onInit() {
        } ,


    });
});`} language="javascript" />

                <h2>Step 5 - Configure the View on manifest.json file.</h2>

                <p>In <span className='highlight'>manifest.json</span> file, under <span className='hightlight'>routes</span> section, define the view as below - </p>

                <CodeBlock code={`
{
    "name": "SecondView",
    "pattern": "secondView",
    "target" : "secondView"
}`} language="javascript" />

                <p>So, the routes will look like below - </p>
                
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
          "name": "SecondView",
          "pattern": "secondView",
          "target" : "secondView"
        }
      ],`} language="javascript" />

                <p>In the same manifest.json file in the targets object, define the target as below - </p>
               
               <CodeBlock code={`
"secondView" : {
    "id" : "secondViewAvailalbe",
    "name": "View2",
    "transition" :"fade"
}`} language="javascript" />

            <p>So your targets will look like below - </p>

            <CodeBlock code={`
"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "secondView" : {
        "id" : "secondViewAvailalbe",
        "name": "View2",
        "transition" :"fade"
    }
}`} language="javascript" />

                <h2>Step 6 - Define Navigation Button and its Method</h2>

                <p>In the <span className='highlight'>View1.xml</span> View file, create a button like below - </p>

                <CodeBlock code={`<Button id="view1Btn" text="next View" press="navToNext"></Button>`} language="xml" />

                <p>Now, In the <span className='highlight'>Controller Folder</span> and in <span className='highlight'>View1.Controller.js</span> file, define the method like below - </p>

                <CodeBlock code={`
navToNext : function() {
    this.RouteTo("SecondView") ;
}`} language="javascript" />

                <p>So the <span className='highlight'>View1.Controller.js</span> file will look like below - </p>

                <CodeBlock code={`
sap.ui.define([
    "namespace/modulename/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("namespace.modulename.controller.View1", {
        
        onInit() {
        } ,


        navToNext : function() {
            this.RouteTo("SecondView") ;
        }

    });
});`} language="javascript" />

                




                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;