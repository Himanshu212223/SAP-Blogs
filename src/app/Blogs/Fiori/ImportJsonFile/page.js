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
      <h1>Import JSON File to Fiori UI5 Application</h1>

      <div className='content'>

        <p>In this example, We will create an UI5 application which allow to import the json file, read its content and show in console.</p>

        <p>We will be following below steps-</p>

        <ul className='list'>
          <ol>1. Create a File Uploader in View.xml.</ol>
          <ol>2. Define Method on Controller.</ol>
        </ul>


        <h2>Step 1 - Create a File Uploader in View.xml</h2>

        <p>In the <span className='highlight'>View.xml file</span>, define the FileUploader in the Page content.</p>

        <CodeBlock code={`<mvc:View controllerName="fiori.auditlog.controller.View1"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns:u="sap.ui.unified"
    xmlns="sap.m">
    <Page id="page" title="{i18n>title}">
        <content>
            <u:FileUploader id="fileuploader" change="handleUploadFile"/>
        </content>
    </Page>
</mvc:View>`} language='xml' />

        <p>Do not forget to add the sap library on the View.</p>

        <CodeBlock code={`xmlns:u="sap.ui.unified"`} language='xml' />




        <h2>Step 2 -  Define Method on Controller</h2>

        <p>In the <span className='highlight'>Controller.js file</span> of the view, define the method to read and display the json file content in the console.</p>

        <CodeBlock code={`handleUploadFile: async function (e) {
    try {
        let response = await this.importFile(e.getParameter("files") && e.getParameter("files")[0]);
        console.log(response);
    }
    catch (error) {
        console.log(error)
    }
}`} language='javascript' />


        <CodeBlock code={`importFile: function (file) {
    let data = "";

    if (file && window.FileReader) {

        var reader = new FileReader();

        reader.onload = function (e) {
            data = e.target.result;

        };

        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsText(file);

    }

    return data;
}`} language='javascript' />









        <p>And it is done !!!</p>


      </div>

    </main>
  );
}

export default page;