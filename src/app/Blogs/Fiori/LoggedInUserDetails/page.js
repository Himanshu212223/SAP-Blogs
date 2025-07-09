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
      <h1>Logged in User Details in Fiori UI5</h1>

      <div className='content'>

        <p>In this example, We will create an UI5 application which will read the login User details and display it on Table.</p>

        <p>We will be following below steps-</p>

        <ul className='list'>
          <ol>1. Configure AppRouter service in xs-app.json.</ol>
          <ol>2. Create and define Table in View.</ol>
          <ol>3. Define Method on Controller.</ol>
        </ul>


        <h2>Step 1 - Configure AppRouter service in xs-app.json</h2>

        <p>In the <span className='highlight'>xs-app.json</span>, add the app router configuration.</p>

        <CodeBlock code={`{
    "source" : "^/user-api(.*)",
    "target" : "$1",
    "service" : "sap-approuter-userapi",
    "authenticationType" : "xsuaa"
}`} language='javascript' />

        <p>So your <span className='highlight'>xs-app.json</span> file will look like below - </p>

        <CodeBlock code={`{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/resources/(.*)$",
      "target": "/resources/$1",
      "authenticationType": "none",
      "destination": "ui5"
    },
    {
      "source" : "^/user-api(.*)",
      "target" : "$1",
      "service" : "sap-approuter-userapi",
      "authenticationType" : "xsuaa"
    },
    {
      "source": "^/test-resources/(.*)$",
      "target": "/test-resources/$1",
      "authenticationType": "none",
      "destination": "ui5"
    },
    {
      "source": "^(.*)$",
      "target": "$1",
      "service": "html5-apps-repo-rt",
      "authenticationType": "xsuaa"
    }
  ]
}`} language='javascript' />




      <h2>Step 2 - Create and define Table in View</h2>

      <p>In the <span className='highlight'>View.xml file</span>, define the table like below - </p>
        
      <CodeBlock code={`<mvc:View controllerName="fiori.loginuser.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <Page id="page" title="{i18n>title}">
        <content>
            <Table id="idProductsTable" items="{UserModel>/}" headerText="UserModel">
		        <headerToolbar>   
                    <OverflowToolbar>
				        <content>
					        <Title text="User Logged In" level="H2"/>
					            <ToolbarSpacer />
				        </content>
			        </OverflowToolbar>
                </headerToolbar>
		
		
                <columns>
					<Column>
						<Text text="First Name" />
					</Column>
					<Column>
						<Text text="Last Name" />
					</Column>
					<Column>
						<Text text="Email" />
					</Column>
				</columns>

				<items>
					<ColumnListItem vAlign="Middle">
						<cells>

							<Text text="{UserModel>firstName}" />
							<Text text="{UserModel>lastName}" />
							<Text text="{UserModel>email}" />
						</cells>
					</ColumnListItem>
				</items>
			</Table>

        </content>
    </Page>
</mvc:View>`} language='xml' />

    


    <h2>Step 3 - Define Method on Controller</h2>

    <p>In the <span className='highlight'>Controller.js file</span>, define the method and call it on onInit method like below - </p>

    <CodeBlock code={`sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("fiori.loginuser.controller.Home", {
        onInit() {

            this.getLoginUserDetails();
        },



        
        getLoginUserDetails: function () {
            let that = this;

            let myPromise = new Promise((resolve, reject) => {

                let sAppId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                let appPath = sAppId.replaceAll('.', '/');
                let oPath = jQuery.sap.getModulePath(appPath);

                let responseData = null;

                $.ajax({
                    url: oPath + "/user-api/attributes",
                    method: "GET",
                    async: false,
                    success: async function (result, xhr, data) {
                        try {
                            responseData = result;
                            console.log(result);
                        }
                        catch (e) {
                            console.log("Unable to consume the Destinaton.");
                            console.log("Internal Server Error.");
                            console.log(e.message);
                        }
                    },
                    error: function (request, status, error) {
                        console.log(error);
                        console.log(status);
                        reject("It didn't worked.");
                    }
                });

                resolve(responseData);
            });

            //  Execute after Promise will resolve
            myPromise.then((responseData) => {
                let modelData = [];

                let userDetails = {
                    "firstName": responseData.firstname,
                    "lastName": responseData.lastname,
                    "email": responseData.email
                }

                modelData = Array.from(modelData);
                modelData.push(userDetails);

                console.log("getting response")
                that.getOwnerComponent().getModel("UserModel").setData(modelData, "data");
            }).catch((error) => {   // Execute when Promise fails.
                    console.log(error);
            });
        }



    });
});`} language='javascript' />











        <p>And it is done !!!</p>


      </div>

    </main>
  );
}

export default page;