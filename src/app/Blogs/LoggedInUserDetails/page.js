import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {



    return (
        <div className="indexing">
            <h1 className="headline">Logged in User Details in Fiori UI5.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will try to get the details of logged in user using SAP standard api.
            </p>

            <p className="paragraph">
                Firstly, we will modify the <span className="tomato">xs-app.json </span> and add the standard sap api to get the user details.
                Then, we will create a Table on <span className="tomato">view.xml </span>file to display the Logged in User details.
                Then, we will write a logic on <span className="tomato">controller.js </span>file to fetch the logged in user details using api.
            </p>


            {/* STEPS to FOLLOW */}

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                Firstly, modify the <span className="tomato">xs-app.json</span> and add the below line of code in <span className="tomato">router array</span>.
            </p>



            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
{
    "source" : "^/user-api(.*)",
    "target" : "$1",
    "service" : "sap-approuter-userapi",
    "authenticationType" : "xsuaa"
}
                    `
                }
            </SyntaxHighlighter>


            <p className="paragraph">
                So the <span className="tomato">xs-app.json</span> file looks like below-
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
{
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
}
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
                2. Now, go to <span className="tomato">View.xml</span> file and add the below line of code to create a Table View.
            </p>

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
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
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                So, the <span className="tomato">View.xml</span> file looks like below.
            </p>


            
            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<mvc:View controllerName="fiori.loginuser.controller.Home"
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
</mvc:View>
                    `
                }
            </SyntaxHighlighter>




            <p className="list">
                3. Now go to <span className="tomato">Controller.js</span> file and add below logics there.
            </p>
            <p className="list">
                We will fetch the details using ajax call and store it in JSON Model. And we will call this method in <span className="tomato">onInit method</span>.    
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
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
                    `
                }
            </SyntaxHighlighter>

            
            <p className="list">
                So, the <span className="javascript">controller.js</span> file will look like below-
            </p>



            <p className="list bold pinky">
                And it is done. You can use this to Navigate from One View to Another View.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
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
});
                    `
                }
            </SyntaxHighlighter>

            
            <p className="list bold pinky">
                Now, you can see the logged in User details.
            </p>

            {/* <PrismLoader /> */}


        </div>
    );
}

export default sample1;