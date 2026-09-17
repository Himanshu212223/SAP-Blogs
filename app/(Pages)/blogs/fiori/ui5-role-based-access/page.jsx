import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const Page = () => {

//  Sample Codes
const code1 = 
`{
    "xsappname" : "<my-xsapp-name>",
    "description" : "Security profile of called applicaiton",
    
    "scope" : [
        {
            "name" : "$XSAPPNAME.Viewer",
            "description" : "Viewer Access"
        },
        {
            "name" : "$XSAPPNAME.Admin",
            "description" : "Admin Access"
        }
    ],

    "attributes" : [],

    "role-templates" : [
        {
            "name" : "MyAppViewerRole",
            "description" : "Role to View myApp",
            "scope-references" : [
                "$XSAPPNAME.Viewer"
            ]
        },
        {
            "name" : "MyAppViewerAdmin",
            "description" : "Admin Role for myApp",
            "scope-references" : [
                "$XSAPPNAME.Viewer", 
                "$XSAPPNAME.Admin"
            ]
        }
    ]
}`;

const code2 = 
`{
    "source" : "^/user-api/currentUser$",
    "target" : "/currentUser",
    "service" : "sap-approuter-userapi",
    "authenticationType" : "xsuaa"
}`;

const code3 = `{
    "welcomeFile" : "/index.html",
    "authenticationMethod" : "route",
    "routes" : [
        {
            "source" : "^/resources/(.*)$",
            "target" : "/resources/$1",
            "authenticationType" : "none",
            "destination" : "ui5"
        },
        {
            "source" : "^/test-resources/(.*)$",
            "target" : "/test-resources/$1",
            "authenticationType" : "none",
            "destination" : "ui5"
        },
        {
            "source" : "^/user-api/currentUser$",
            "target" : "/currentUser",
            "service" : "sap-approuter-userapi",
            "authenticationType" : "xsuaa"
        },
        {
            "source" : "^(.*)$",
            "target" : "$1",
            "service" : "html5-apps-repo-rt",
            "authenticationType" : "xsuaa"
        }
    ]
}`;


const code4 = `
_loadUserAuthorization : async function () {
    try{
        const response = await fetch("./user-api/currentUser", {
            credentials : "same-origin",
            headers : {
                Accept : "application/json"
            }
        });

        const rawResponse = await resposne.text();

        if(!response.ok){
            throw new Error("Unable to retrieve current user with status : " + response.status);
        }

        let responseData = null ;

        try{
            responseData = JSON.parse(rawResponse);
        }
        catch(parseError){
            throw new Error("Current User didnot return valid JSON " + parseError);
        }

        const scopes = Array.isArray(responseData.scopes) ? responseData.scopes : Array.isArray(responseData.user?.scopes) ? responseData.user.scopes : [];

        console.log(scopes);
    }
    catch(error){
        console.error("Authorization check failed with error " + error);
    }
}`;




    // ================================== UI ====================================
    return(
        <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

            <h1 className="text-5xl text-black wrap-break-word">UI5 App Roles based access</h1> 



            <h2 className="text-4xl text-sky-500 wrap-break-word">Objective -</h2>

            <p className="text-1xl wrap-break-word">In this example, we will create two roles (Viewer and Admin) for a SAP UI5 application and control the visibility of application content based on the roles assigned to users in SAP BTP.</p>






            <h2 className="text-4xl text-pink-500 wrap-break-word">Steps -</h2>

            <p className="text-1xl wrap-break-word">We will be following below steps -</p>

            <ul className="list-decimal ml-6">
                <li className="wrap-break-word">Define Roles</li>    
                <li className="wrap-break-word">Define AppRouter User API of xsuaa service</li>
                <li className="wrap-break-word">Define Logic to check User access</li>
            </ul>





            <h2 className="text-4xl text-black wrap-break-word">Step 1- Define Roles</h2>

            <p className="text-1xl wrap-break-word">We will define the required roles in the <span className="text-gray-950 font-semibold wrap-break-word">xs-security.json</span> file of our UI5 application.</p>

            <p className="text-1xl wrap-break-word">The following example can be used as a reference -</p>

            <div>
                <CodeSnippet code={code1} language="json" title="xs-security.json" />
            </div>







            <h2 className="text-4xl text-black wrap-break-word">Step 2- Define AppRouter User API of xsuaa service</h2>

            <p className="text-1xl wrap-break-word">We will add the <span className="text-gray-950 font-semibold wrap-break-word">User API</span> in the <span className="text-gray-950 font-semibold wrap-break-word">xs-app.json</span> file of the UI5 application to retrieve the details of the currently logged-in user accessing the application.</p>

            <div>
                <CodeSnippet code={code2} language="json" title="xs-app.json" />
            </div>

            <p className="text-1xl wrap-break-word">So the xs-app.json file will look like-</p>

            <div>
                <CodeSnippet code={code3} language="json" title="xs-app.json" />
            </div>
            
            
            




            <h2 className="text-4xl text-black wrap-break-word">Step 3- Define Logic to check User access</h2>

            <p className="text-1xl wrap-break-word">We can define the logic to check the access of Logged-in User.</p>

            <div>
                <CodeSnippet code={code4} language="javascript" title="xs-app.json" />
            </div>

            <p className="text-1xl wrap-break-word">We will get the User roles on the response scope and can store the same on the json model based on which can control the visibility of UI elements.</p>


            <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

        </div>
    );
}

export default Page ;