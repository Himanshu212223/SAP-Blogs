import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = 
`fioriui5 (application name)
|
|- node_modules (Folder)
|
|- webapp (Folder)
|   |- controller (Folder)
|   |   |- App.controller.js
|   |   |- View1.controller.js
|   |
|   |- css (Folder)
|   |   |- style.css
|   |
|   |- i18n (Folder)
|   |   |- i18n.properties
|   |
|   |- model (Folder)
|   |   |- models.js
|   |
|   |- test (Folder)
|   |
|   |- view (Folder)
|   |   |- App.view.xml
|   |   |- View1.view.xml
|   |
|   |- Component.js
|   |- index.html
|   |- manifest.json
|   
|- .appGenInfo.json
|- .gitignore
|- mta.yaml
|- package-lock.json
|- package.json
|- ui5-deploy.yaml
|- ui5-local.yaml
|- xs-app.json
|- xs-security.json`;

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">File Structure</h1>
        <p>Below File structures were created -</p>
        <div>
            <CodeSnippet code={code1} language="md" title="File Structure" />
        </div>





        <h2 className="text-4xl">Understand the Files and their usage -</h2>

        <h3 className="text-3xl">1. node_modules Folder</h3>
        <ul className="list-disc ml-6">
            <li>It is a core part of Application (which uses npm Node Package Module) as this file store all the project dependencies.</li>
            <li>You can delete this folder and when you execute the command <span className="text-gray-950 font-semibold">npm install</span> then npm automatically create this folder and install the dependencies.</li>
            <li>Which dependencies needs to be installed is defined on <span className="text-gray-950 font-semibold">package.json</span> file so npm uses the details from <span className="text-gray-950 font-semibold">package.json</span> and install the dependencies on <span className="text-gray-950 font-semibold">node_module folder</span>.</li>
        </ul>


        <h3 className="text-3xl">2. webapp Folder</h3>
        <ul className="list-disc ml-6">
            <li>It is the main <span className="text-gray-950 font-semibold">source folder</span> of the application that contains application runtime resources like index.html, Component.js, manifest.json, view, controller, etc.</li>
            <li>It contains all files which will be deployed and served to the browser.</li>
        </ul>

        <h4 className="text-2xl">2.1. controller Folder</h4>




        <span className="text-gray-950 font-semibold">Bold Content</span>

        <ul className="list-disc ml-6">
            <li>content list item 1</li>
            <li>content list item 2</li>
            <li>content list item 3</li>
            <li>content list item 4</li>
        </ul>
        
        <ul className="list-decimal ml-6">
            <li>content list item 1</li>
            <li>content list item 2</li>
            <li>content list item 3</li>
            <li>content list item 4</li>
        </ul>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/1-manage-multi-language-using-i18n/README.md" />
        </div>

        <div>
            <CodeSnippet code={code1} language="xml" title="View1.view.xml" />
        </div>
        


        Filter, sort on table / List
        Routing Navigation
        Page, Pannel, Shell, App Controls
        Formatter, Dialog, Fragment, Nested View
        Custom Control
    </div>
  );
};

export default page;
