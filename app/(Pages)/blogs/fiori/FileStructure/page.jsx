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

const code2 = 
`{
  "xsappname": "my-ui5-app",
  "tenant-mode": "dedicated",
  "scopes": [
    { "name": "$XSAPPNAME.Display", "description": "Display content" },
    { "name": "$XSAPPNAME.Admin", "description": "Admin access" }
  ],
  "role-templates": [
    {
      "name": "Viewer",
      "description": "Can view content",
      "scope-references": [ "$XSAPPNAME.Display" ]
    },
    {
      "name": "Administrator",
      "description": "Full access",
      "scope-references": [ "$XSAPPNAME.Display", "$XSAPPNAME.Admin" ]
    }
  ]
}`;

const code3 = `index.html ➜ UI5 bootstrap ➜ Component.js ➜ manifest.json ➜ routing/views/controllers`;
const code4 = `<App>`;
const code5 = 
`import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";

export function createDeviceModel () {
    const model = new JSONModel(Device);
    model.setDefaultBindingMode("OneWay");
    return model;
}`;

const code6 = 
`<mvc:View controllerName="fiori.ui5app.controller.App"
    displayBlock="true"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <App id="app">
    </App>
</mvc:View>`;

const code7 = 
`import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";

/**
 * @namespace fiori.ui5app
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
	};

	public init() : void {
		// call the base component's init function
		super.init();

        // set the device model
        this.setModel(createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize();
	}
}`;

const code8 = 
`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Fiori UI5 Application</title>
        <style>
            html, body, body > div, #container, #container-uiarea {
                height: 100%;
            }
        </style>
        <script
            id="sap-ui-bootstrap"
            src="resources/sap-ui-core.js"
            data-sap-ui-theme="sap_horizon"
            data-sap-ui-resource-roots='{
                "fiori.ui5app": "./"
            }'
            data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
            data-sap-ui-compat-version="edge"
            data-sap-ui-async="true"
            data-sap-ui-frame-options="trusted"
        ></script>
    </head>
    <body class="sapUiBody sapUiSizeCompact" id="content">
        <div
            data-sap-ui-component
            data-name="fiori.ui5app"
            data-id="container"
            data-settings='{"id" : "fiori.ui5app"}'
            data-handle-validation="true"
        ></div>
    </body>
</html>`;




  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">File Structure and their Usage</h1>
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

        <ul className="list-disc ml-6">
            <li>This folder contains <span className="text-gray-950 font-semibold">all the controller files</span> of the views.</li>
            <li>The controller file of each view holds the <span className="text-gray-950 font-semibold">logics</span> of that view.</li>
        </ul>


        <h5 className="text-xl text-amber-600">2.1.1. App.controller.js</h5>

        <ul className="list-disc ml-6">
            <li>It is a JS file which controls the main view (App view).</li>
            <li>It controls how the app behaves when it starts and during navigation etc.</li>
        </ul>
        



        <h5 className="text-xl text-amber-600">2.1.2 View1.controller.js</h5>

        <ul className="list-disc ml-6">
            <li>It is a JS file which controls the specific view (View1, or View2, etc).</li>
            <li>It contains the View specific logics.</li>
        </ul>


        <table className="border-collapse border border-gray-400">
            <thead>
                <tr>
                <th className="border border-gray-300">Feature</th>
                <th className="border border-gray-300">App.controller.js</th>
                <th className="border border-gray-300">Other controllers (e.g., View1.controller.js, Detail.controller.js)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="border border-gray-300 px-3">Scope</td>
                <td className="border border-gray-300 px-3">Application/global level</td>
                <td className="border border-gray-300 px-3">View-specific</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-3">View Attached</td>
                <td className="border border-gray-300 px-3">Usually attached to a root view like <span className="text-gray-950 font-semibold">App.view.xml</span></td>
                <td className="border border-gray-300 px-3">Attached to individual UI views</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-3">Common Responsibilities</td>
                <td className="border border-gray-300 px-3">Initialization of the app, routing, global events, container logic</td>
                <td className="border border-gray-300 px-3">Handling UI logic for a specific screen</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-3">Navigation</td>
                <td className="border border-gray-300 px-3">Often manages global navigation or passes navigation to routers</td>
                <td className="border border-gray-300 px-3">Typically handles local events (button clicks, input validations, binding)</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-3">Visibility</td>
                <td className="border border-gray-300 px-3">Loaded once for the entire session</td>
                <td className="border border-gray-300 px-3">Loaded when the specific view is loaded</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-3">Contents</td>
                <td className="border border-gray-300 px-3">Rarely contains business logic</td>
                <td className="border border-gray-300 px-3">Contains most of the UI interaction logic</td>
                </tr>
            </tbody>
        </table>


        <h4 className="text-2xl">2.2. css Folder and style.css file</h4>

        <ul className="list-disc ml-6">
            <li>CSS Folder and <span className="text-gray-950 font-semibold">style.css</span> file is used to define custom styles that overrides or extend the standard SAP UI5/Fiori visual designs.</li>
            <li>This file configuration has been already defined on the <span className="text-gray-950 font-semibold">manifest.json</span> file under <span className="text-gray-950 font-semibold">resources</span> on <span className="text-gray-950 font-semibold">sap.ui5</span> section.</li>
        </ul>




        <h4 className="text-2xl">2.3. i18n Folder and i18n file</h4>

        <ul className="list-disc ml-6">
            <li><span className="text-gray-950 font-semibold">i18n</span> stands for <span className="text-gray-950 font-semibold">Internationalization</span> Resource files used to store all translatable texts for your app.</li>
            <li><span className="text-gray-950 font-semibold">i18n.properties</span> file is default language resource file (usually English). It contains the data in Key-value pair and can be binded (used) with the view.</li>
            <li>Its binding with UI(View) is called <span className="text-gray-950 font-semibold">One-Time Binding</span> as it gets loaded when the application gets loaded.</li>
            <li>Its configuration is defined on the <span className="text-gray-950 font-semibold">model</span> section on <span className="text-gray-950 font-semibold">manifest.json</span> file.</li>
        </ul>



        <h4 className="text-2xl">2.4. model folder and models.js file</h4>

        <ul className="list-disc ml-6">
            <li>The model folder is the place to keep all model-related utilities and helpers.</li>
            <li>It helps to keep the setup modular, reusable and centralized.</li>
            <li>The <span className="text-gray-950 font-semibold">models.js</span> file is typically a utility module that exposes function to create and configure models used <span className="text-gray-950 font-semibold">throughout the app</span>.</li>
            <li>The <span className="text-gray-950 font-semibold">models.js</span> file uses the <span className="text-gray-950 font-semibold">device</span> dependency of <span className="text-gray-950 font-semibold">sap.ui</span> library and provide information about the current devices and environment (phone, tablet, desktop, orientation) at the runtime and hence provide <span className="text-gray-950 font-semibold">Responsive UI</span> out of the box and its is <span className="text-gray-950 font-semibold">Read-Only</span> safe with OneWay binding.</li>
            <li>This model is then set to the view through <span className="text-gray-950 font-semibold">Component.js</span> file.</li>
        </ul>

        <div>
            <CodeSnippet code={code5} language="typescript" title="models.ts" />
        </div>


        <h4 className="text-2xl">2.5. test folder</h4>

        <ul className="list-disc ml-6">
            <li>It contains files which are used for QUnit-based Testing.</li>
        </ul>



        <h4 className="text-2xl">2.6. view folder and App.view.xml file</h4>

        <ul className="list-disc ml-6">
            <li>View Folder contains the UI Definition of the application where each view represents a visual part of the app.</li>
            <li><span className="text-gray-950 font-semibold">App.view.xml</span> is the <span className="text-gray-950 font-semibold">root view</span> of UI5 application and act as a <span className="text-gray-950 font-semibold">container for other views/pages</span>.</li>
            <li>All other views are loaded inside this root container.</li>
            <li><span className="text-gray-950 font-semibold">{code4}</span> of <span className="text-gray-950 font-semibold">sap.m.App</span> is a navigation container that holds multiple <span className="text-gray-950 font-semibold">sap.m.Page</span> controls and manages transitions from one page to other.</li>
        </ul>

        <div>
            <CodeSnippet code={code6} language="xml" title="App.view.xml" />
        </div>


        <h4 className="text-2xl">2.7. Component.js</h4>

        <ul className="list-disc ml-6">
            <li><span className="text-gray-950 font-semibold">Component.js</span> is the <span className="text-gray-950 font-semibold">starting point (logical starting point)</span> of application and act as <span className="text-gray-950 font-semibold">main controller</span> of the <span className="text-gray-950 font-semibold">whole application</span>.</li>
            <li>It loads the <span className="text-gray-950 font-semibold">manifest.json</span> file and initialize Router which injects target (main view) into <span className="text-gray-950 font-semibold">{code4}</span>.</li>
            <li>It also <span className="text-gray-950 font-semibold">sets the device model (defined on models.js file)</span> for the whole application.</li>
        </ul>

        <div>
            <CodeSnippet code={code7} language="javascript" title="Component.ts" />
        </div>




        <h4 className="text-2xl">2.8. index.html</h4>

        <ul className="list-disc ml-6">
            <li>It is the <span className="text-gray-950 font-semibold">Entry point (starting point)</span> of the Application (any UI app have .html file as starting point) which loads the SAP UI5 Framework Application.</li>
            <li>It loads the <span className="text-gray-950 font-semibold">SAPUI5 Libraries</span> defined on <span className="text-gray-950 font-semibold">script</span>.</li>
            <li>It also loads the <span className="text-gray-950 font-semibold">Component.js</span> file also set the SAP UI Theme.</li>
            <li>Without index.html file browser wouldn't know from where to load the UI5 app.</li>
        </ul>

        <div>
            <CodeSnippet code={code8} language="html" title="index.html" />
        </div>





        <h4 className="text-2xl">2.9. manifest.json</h4>

        <ul className="list-disc ml-6">
            <li>It is the central configuration file of the application.</li>
            <li>It is the descriptor file which tells the SAP UI5 app about the <span className="text-gray-950 font-semibold">app name</span>, <span className="text-gray-950 font-semibold">resources</span> needed, <span className="text-gray-950 font-semibold">routing/navigation</span> used and the <span className="text-gray-950 font-semibold">model</span> which we are using.</li>
            <li>It contains the <span className="text-gray-950 font-semibold">app details, sap.ui5</span> details which includes <span className="text-gray-950 font-semibold">router details</span>, <span className="text-gray-950 font-semibold">models</span>, and <span className="text-gray-950 font-semibold">dependencies</span>.</li>
            <li>It contains the manifest.json version at the top and also contain the SAP UI5 verion used under sap.ui5 section.</li>
        </ul>


        <h3 className="text-3xl">3. .app.GenInfo.json</h3>

        <ul className="list-disc ml-6">
            <li>This file is auto generated by SAP Development Tool when we generate the app from Template.</li>
            <li>It stores the general information about how the app was created, help sap tools to identify the template to re-generate the application.</li>
        </ul>


        <h3 className="text-3xl">4. mta.yaml</h3>

        <ul className="list-disc ml-6">
            <li>It is the blueprint of the app which tells the BTP build/deployment tools what the app consists of, which services it needs, etc.</li>
            <li>It contains details of resources and services like xsuaa, destination, HTML5 App Repo, etc.</li>
        </ul>



        <h3 className="text-3xl">5. package-lock.json</h3>

        <ul className="list-disc ml-6">
            <li>This file gets automatically generate by npm and it locks the <span className="text-gray-950 font-semibold">exact version</span> of all the dependencies (and sub-dependencies).</li>
            <li>It does this so that everyone using this project gets the same version of dependencies to avoid work on particular machine issue.</li>
            <li>Deleting this fill wouldn't affect the working of application but create some issues as npm will regenerate this file but the exact version of the dependencies will not be installed and can lead to inconsistent behavior between environments.</li>
        </ul>



        <h3 className="text-3xl">5. package.json</h3>

        <ul className="list-disc ml-6">
            <li>It is the main configuration file for a NodeJS project.</li>
            <li>It contains details like project metadata (which includes name, description, version), Dependencies and Script commands.</li>
            <li>It contains a <span className="text-gray-950 font-semibold">rough version detials</span> of the dependencies.</li>
            <li>The project <span className="text-gray-950 font-semibold">will not work</span> if you delete this file because it have the details of which dependencies you app needs and which script needs to run.</li>
        </ul>

        <table className="border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300">Feature</th>
                    <th className="border border-gray-300">package.json</th>
                    <th className="border border-gray-300">package-lock.json</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3">Purpose</td>
                    <td className="border border-gray-300 px-3">Declares dependencies & scripts</td>
                    <td className="border border-gray-300 px-3">Locks exact versions for consistency</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Created by</td>
                    <td className="border border-gray-300 px-3">Developer manually or Auto Generated</td>
                    <td className="border border-gray-300 px-3">Auto-generated by npm</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Editable?</td>
                    <td className="border border-gray-300 px-3">Yes</td>
                    <td className="border border-gray-300 px-3">No (should not edit manually)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Used for</td>
                    <td className="border border-gray-300 px-3">Project setup & sharing</td>
                    <td className="border border-gray-300 px-3">Reproducible builds</td>
                </tr>
            </tbody>
        </table>



        <h3 className="text-3xl">6. ui5-deploy.yaml</h3>

        <ul className="list-disc ml-6">
            <li>It is a deployment configuration file which tells Fiori Tools where and how to deploy your build UI5 App.</li>
        </ul>


        <h3 className="text-3xl">7. ui5-local.yaml</h3>

        <ul className="list-disc ml-6">
            <li>It is used to define local development settings for UI5 app which includes local server port, local server middleware, etc.</li>
        </ul>


        <h3 className="text-3xl">8. ui5.yaml</h3>

        <table className="border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300">File Name</th>
                    <th className="border border-gray-300">Purpose</th>
                    <th className="border border-gray-300">When Used</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3">ui5.yaml</td>
                    <td className="border border-gray-300 px-3">Contains main configuration for UI5 Tooling. Defines project type, UI5 version, libraries, and build/serve settings.</td>
                    <td className="border border-gray-300 px-3">Always – for local development and build.</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">ui5-local.yaml</td>
                    <td className="border border-gray-300 px-3">Overrides or adds local development settings like proxy middleware, mock servers, or custom middlewares.</td>
                    <td className="border border-gray-300 px-3">Only during local development (not used in production).</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">ui5-deploy.yaml</td>
                    <td className="border border-gray-300 px-3">Deployment configuration for where and how to deploy the app (ABAP system or BTP HTML5 App Repo). Includes target system, credentials, package, transport.</td>
                    <td className="border border-gray-300 px-3">During deployment (CI/CD or manual deploy).</td>
                </tr>
            </tbody>
        </table>




        <h3 className="text-3xl">9. xs-app.json</h3>

        <ul className="list-disc ml-6">
            <li>It is a configuration file for the SAP Approuter and defines the routing rules.</li>
            <li>It is used to define authentication and authorization requirements for routes and used by Approuters to handle HTML5 app hosting, Destination based routing, and XSUAA Authentication.</li>
            <li>It contains the welcome file (ie., index.html file), authentication method for route, etc.</li>
        </ul>


        <h3 className="text-3xl">10. xs-security.json</h3>

        <ul className="list-disc ml-6">
            <li>It is used to define Role templates for assigning permission to users.</li>
        </ul>

        <div>
            <CodeSnippet code={code2} language="json" title="xs-security.json" />
        </div>



        <h2 className="text-4xl">Files Generated when we Build the UI5 Application</h2>

        <h3 className="text-3xl">1. dist Folder</h3>

        <ul className="list-disc ml-6">
            <li>It is a production ready build output of your UI5 Application created by UI5 tooling when we run the build.</li>
            <li>It contains all the files optimized for deployment (minified, bundled, and structured for fast loading).</li>
        </ul>


        <h3 className="text-3xl">2. mta_archives Folder</h3>

        <ul className="list-disc ml-6">
            <li>It is the location where the built deployable package (.mtar) is generated and stored when we run an MTA Build.</li>
        </ul>


        <h3 className="text-3xl">3. resources Folder</h3>

        <ul className="list-disc ml-6">
            <li>It acts as a container for static assets (like image, logo, icons, background, css, fonts, etc) that your app needs at runtime but are not part of the core UI5 Framework.</li>
        </ul>


        <table className="border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300">Folder</th>
                    <th className="border border-gray-300">Location</th>
                    <th className="border border-gray-300">Created When</th>
                    <th className="border border-gray-300">Contains</th>
                    <th className="border border-gray-300">Purpose</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3">resources/</td>
                    <td className="border border-gray-300 px-3">webapp/resources/</td>
                    <td className="border border-gray-300 px-3">Developer creates</td>
                    <td className="border border-gray-300 px-3">Static assets (images, CSS, fonts, PDFs, JSON)</td>
                    <td className="border border-gray-300 px-3">Used by the app for UI elements and styling.</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">dist/</td>
                    <td className="border border-gray-300 px-3">At module level</td>
                    <td className="border border-gray-300 px-3">After UI5 build (ui5 build)</td>
                    <td className="border border-gray-300 px-3">Minified UI5 app + resources + manifest</td>
                    <td className="border border-gray-300 px-3">Optimized build output for deployment.</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">mta_archives/</td>
                    <td className="border border-gray-300 px-3">Project root</td>
                    <td className="border border-gray-300 px-3">After MTA build (mbt build)</td>
                    <td className="border border-gray-300 px-3">.mtar file (Multi-Target Application archive)</td>
                    <td className="border border-gray-300 px-3">Final deployable artifact for SAP BTP.</td>
                </tr>
            </tbody>
        </table>



        <h2 className="text-4xl">Starting Point and Flow of Execution of SAP UI5 Application</h2>

        <ul className="list-decimal ml-6">
            <li><span className="text-gray-950 font-semibold">index.html</span> is the first file the browser loads (entry point).</li>
            <p>It loads the <span className="text-gray-950 font-semibold">UI5 Framework</span> defined on <span className="text-gray-950 font-semibold">UI5 bootstrap script</span> of index.html</p>
            <li><span className="text-gray-950 font-semibold">Component.js</span> file gets initialized and loaded with index.html</li>
            <li><span className="text-gray-950 font-semibold">manifest.json</span> is consumed by <span className="text-gray-950 font-semibold">Component.js</span> file to configure routes, models, etc.</li>
            <li>The Routes then loads the <span className="text-gray-950 font-semibold">main View</span> which then loads the <span className="text-gray-950 font-semibold">Controller</span> of the View.</li>
        </ul>

        <p>So the entry flow is:</p>
        <div>
            <CodeSnippet code={code3} language="md" title="Flow" />
        </div>



        <h3 className="text-3xl">Typical Local Execution Sequence</h3>

         <h4 className="text-2xl">1. Browser requests index.html</h4>
         
        <ul className="list-disc ml-6">
            <li>Served by UI5 tooling or static dev server.</li>
        </ul>


        <h4 className="text-2xl">2. index.html loads bootstraps UI5</h4>

        <ul className="list-disc ml-6">
            <li>It loads <span className="text-gray-950 font-semibold">sap-ui-core.js</span> library and other resources.</li>
            <li>UI5 Core loads configuration libraries (like sap.m, sap.ui.core) and apply the theme.</li>
            <li>It then loads the <span className="text-gray-950 font-semibold">Component.js</span></li>
        </ul>


        <h4 className="text-2xl">3. Component.js</h4>

        <ul className="list-disc ml-6">
            <li>Component.js reads the <span className="text-gray-950 font-semibold">manifest.json</span> file (through init method) which initialize the <span className="text-gray-950 font-semibold">models (models.js and i18n), Router and css/style.css</span></li>
        </ul>


        <h4 className="text-2xl">4. manifest.json</h4>

        <ul className="list-disc ml-6">
            <li>Router then reads the routes from <span className="text-gray-950 font-semibold">manifest.json</span> and navigates to initial route which is <span className="text-gray-950 font-semibold">root view</span> (mostly App.view.xml) and then <span className="text-gray-950 font-semibold">main view</span> (which can be View1.view.xml).</li>
            <li>The view xml file loads their <span className="text-gray-950 font-semibold">Controller.js</span> file.</li>
        </ul>


        <h3 className="text-3xl">Execution Sequence After Deployment (Approuter + HTML5 Apps Repo)</h3>

        <h4 className="text-2xl">Platform Side</h4>

        <h4 className="text-2xl">1. xs-app.json</h4>

        <ul className="list-disc ml-6">
            <li>Browser requests app url through the Approuter (configured via xs-app.json)</li>
        </ul>

        <h4 className="text-2xl">2. xs-security.json</h4>

        <ul className="list-disc ml-6">
            <li>Approuter checkes the authentication/authorization based on service binding defined on xs-security.json</li>
        </ul>
        
        <h4 className="text-2xl">3. index.html</h4>

        <ul className="list-disc ml-6">
            <li>Static contents are served from HTML5 App Repository or ui5-deploy.yaml target and then redirects to index.html of your app.</li>
        </ul>


        <h3 className="text-3xl">UI5 App Runtime (same as local but optimized)</h3>

        <h4 className="text-2xl">1. index.html</h4>

        <ul className="list-disc ml-6">
            <li>index.html loads UI5 bootstrap and then refers to Component-preload.js file generated by ui5 build.</li>
        </ul>
        
        <h4 className="text-2xl">2. Component.js and manifest.json</h4>

        <ul className="list-disc ml-6">
            <li><span className="text-gray-950 font-semibold">Component.js</span> file initialize the <span className="text-gray-950 font-semibold">models, and router</span>.</li>
            <li><span className="text-gray-950 font-semibold">Router</span> then reads the routes from <span className="text-gray-950 font-semibold">manifest.json</span> file and redirect to <span className="text-gray-950 font-semibold">root view</span> (usually App.view.xml).</li>
        </ul>
        
        <h4 className="text-2xl">3. Views and their Controllers</h4>

        <ul className="list-disc ml-6">
            <li>App.view.xml loads its controller which is App.controller.js file and the other required view (like View1.view.xml) is served on the <span className="text-gray-950 font-semibold">{code4}</span> section of App.view.xml and the controller of the respective view gets loaded.</li>
        </ul>
        
        <h4 className="text-2xl">4. Destinations/Backend Calls</h4>

        <ul className="list-disc ml-6">
            <li>If any backend service calls are required, Approuter uses destinations defined in <span className="text-gray-950 font-semibold">xs-app.json</span> and BTP Destination.</li>
        </ul>
        
        <h4 className="text-2xl">5. Static assets</h4>

        <ul className="list-disc ml-6">
            <li>Static assets and resources like images, css are delivered from build dist.</li>
        </ul>

        <h2 className="text-4xl">File-by-File Sequence Mapping (Local vs Deployed)</h2>

        <h3 className="text-3xl">Local (ui5 serve)</h3>

        <ul className="list-decimal ml-6">
            <li>index.html</li>
            <li>sap-ui-core.js (UI5 bootstrap)</li>
            <li>Component.js (init/component metadata)</li>
            <li>manifest.json (descriptor; auto-loaded by component)</li>
            <li>models.js (if called from Component.js)</li>
            <li>App.view.xml + App.controller.js</li>
            <li>View1.view.xml + View1.controller.js</li>
            <li>i18n/i18n.properties (as resource model)</li>
            <li>css/style.css</li>
        </ul>

        <h3 className="text-3xl">After Deployment (Approuter/HTML5 Repo)</h3>

        <ul className="list-decimal ml-6">
            <li>Approuter → xs-app.json → XSUAA (xs-security.json) (platform layer)</li>
            <li>index.html (from HTML5 repo runtime)</li>
            <li>sap-ui-core.js (UI5 bootstrap; often from CDN or served optimized)</li>
            <li>Component-preload.js (if built; bundles Component.js and other modules)</li>
            <li>manifest.json (may be in preload or fetched separately)</li>
            <li>models.js (if referenced; often in preload)</li>
            <li>App.view.xml/View1.view.xml + controllers (may be preloaded)</li>
            <li>i18n/i18n.properties (resource model, can be preloaded)</li>
            <li>css/style.css (minified; can be part of preload or separate)</li>
        </ul>


        <h2 className="text-4xl">Where xs-app.json and xs-security.json Fit</h2>

        <h3 className="text-3xl">xs-app.json (in project root):</h3>

        <ul className="list-disc ml-6">
            <li>Defines routes and authentication for the approuter. It decides:</li>    
            <ul className="list-decimal ml-6">
                <li>Which path serves your UI5 app static content (e.g., /resources, /index.html).</li>    
                <li>Which paths are proxied to backend destinations.</li>
            </ul>
            <li>xs-security.json:</li>
            <ul className="list-decimal ml-6">
                <li>Defines scopes/roles for XSUAA service (auth). The approuter uses it to protect your app.</li>
            </ul>
        </ul>

        <p>These files do not change the UI5 runtime sequence, they control access and routing before index.html is served.</p>

        
    </div>
  );
};

export default page;
