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
            <h1>Configure JSON Model with Fiori UI5 Application Dynamically</h1>

            <div className='content'>

                <p>In this example, we will set up the JSON model within the controller and retrieve data from it.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Import the JSONModel library in the controller file.</ol>
                    <ol>2. Pass the JSONModel on the main method.</ol>
                    <ol>3. Create a method that initializes the JSON model, adds data to it, and then retrieves the data.</ol>
                </ul>

                <h2>Step 1 - Import the JSONModel library in the controller file</h2>

                <p>In <span className='highlight'>controller.js file</span> define the library in <span className='highlight'>sap.ui.define</span>.</p>

                <CodeBlock code={`"sap/ui/model/json/JSONModel"`} language="javascript" />

                <p>So, <span className='highlight'>sap.ui.define</span> looks like below:</p>

                <CodeBlock code={`
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    ],
    `} language="javascript" />

            
                <h2>Step 2 - Pass the JSONModel on the main method</h2>

                <CodeBlock code={`function (Controller, JSONModel) {`} language="javascript" />

                <h2>Step 3 - Create a method that initializes the JSON model, adds data to it, and then retrieves the data</h2>

                <p>In the controller.js file, define the below method-</p>

                <CodeBlock code={`
createJSONModel : function () {
    //  Create an array which will contain all the objects.
    let dataArray = [] ;

    //  Lets create an object.
    let content = {
        'name' : 'User1',
        'email' : 'user.email@email.com'
    };

    //  Push the object on the array.
    dataArray.push(content);

    //  lets create the JSON Model and add the Array Data.
    const myModel = new JSONModel(dataArray) ;

    //  At the end, set the model to the view.
    this.getView().setModel(myModel, "myModel") ;

    //  We can use the below line to use the created Model.
    let getMyModel = this.getView().getModel("myModel").getData();
            
}
`} language="javascript" />

                <p>So, the Controller will look like below:</p>

                <CodeBlock code={`
sap.ui.define([
    "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("basic.sap.controller.View1", {
        onInit: function () {
        },

        createJSONModel : function () {
            //  Create an array which will contain all the objects.
            let dataArray = [] ;

            //  Lets create an object.
            let content = {
                'name' : 'User1',
                'email' : 'user.email@email.com'
            };

            //  Push the object on the array.
            dataArray.push(content);

            //  lets create the JSON Model and add the Array Data.
            const myModel = new JSONModel(dataArray) ;

            //  At the end, set the model to the view.
            this.getView().setModel(myModel, "myModel") ;

            //  We can use the below line to use the created Model.
            let getMyModel = this.getView().getModel("myModel").getData();
            
        },

    });
});
`} language="javascript" />

                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;