"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    const statement1 = '`/${destinationName}/${additionalURI}`' ;
    const statement2 = '`auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}`' ;
    const statement3 = 'from=${fromTime}&time_to=${toTime}' ;
    const statement4 = '`auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}`' ;


    return (
        <main className='main'>
            <h1>Connect Destination with Fiori UI5 and Consume the URL</h1>

            <div className='content'>

                <p>In this example, We will create an UI5 application and consume the destination api.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Destination configuration for required service.</ol>
                    <ol>2. Configure the Destination on xs-app in UI.</ol>
                    <ol>3. Configure UI and Controller file to consume the oData Service.</ol>
                </ul>

                <h2>Step 1 - Destination configuration for required service</h2>

                <p>Create a Destination on BTP Cockpit Subaccount where you will deploy your Fiori UI5 Application.</p>

                <p>Do not forget to add Additional Properties - </p>
                <p><span className='highlight'>HTML5.DynamicDestination </span> - true</p>
                <p><span className='highlight'>WebIDEEnabled</span> - true</p>
                <p><span className='highlight'>WebIDEUsage</span> - odata_gen</p>

                <Image src="/resources/connectDestinationWithUI5/destination.png" width={700} height={350} alt="Picture of the author" />



                <h2>Step 2 - Configure the Destination on xs-app in UI</h2>

                <p>Create a UI5 App and on the <span className='highlight'>xs-app.json file</span> add the Destination configuration refering the below code -</p>

                <CodeBlock code={`
{
    "source": "^/AuditLog_Destination/(.*)$",
    "target" : "/$1",
    "authenticationType": "xsuaa",
    "destination" : "AuditLog_Destination",
    "csrfProtection": false
},
`} language='javascript' />

                <p><span className='highlight'>source and destination</span> - destination configured on the Subaccount.</p>

                <p>So your xs-app.json file will look something like below - </p>

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
      "source": "^/AuditLog_Destination/(.*)$",
      "target" : "/$1",
      "authenticationType": "xsuaa",
      "destination" : "AuditLog_Destination",
      "csrfProtection": false
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



                <h2>Step 3 - Configure UI and Controller file to consume the oData Service</h2>

                <p>In the <span className='highlight'>View.xml</span> file, create a button clicking on which will get the data using Destination.</p>
                
                <CodeBlock code={`<Button id="button" text="Fetch Logs" press="getLog" />`} language='xml' />

                <p>Now, in the <span className='highlight'>Controller.js</span> file of the view, add the below methods to get data from Destination.</p>

                <CodeBlock code={`
fetchFromDestination : async function(destinationName, additionalURI, requestMethod) {
    var sAppId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
    var sAppPath = sAppId.replaceAll(".", "/");
    var sAppModulePath = jQuery.sap.getModulePath(sAppPath);

    let responseData = "" ;

    $.ajax({
    url: sAppModulePath + ${statement1},
     method : requestMethod,
                async : false,
                success : async function (result, xhr, data){
                    try{
                        responseData = result;
                    }
                    catch(e){
                        console.log("Unable to consume the Destinaton.");
                        console.log("Internal Server Error.");
                        console.log(e.message);
                    }
                },
                error : function(request, status, error){
                    console.log(error);
                    console.log(status);
                    console.log(error);
                }
    });
    
    return responseData ;
}


getLog : async function() {
    const destinationName = "AuditLog_Destination" ;
    const fromTime = "2024-11-20T00:00:00";
    const toTime = "2024-11-20T23:00:00" ;
    const requestMethod = "GET" ;
    const additionalURI = ${statement2} ;

    /*  So, the complete url is 
     https://auditlog-management.cfapps.us10.hana.ondemand.com/auditlog/v2/auditlogrecords?time_${statement3}

    But, we have maintained https://auditlog-management.cfapps.us10.hana.ondemand.com on Destination.
    
    and maintained ${statement4} on additionalURI.
    */

    // Lets call the Destination method to consume the api.
    let response = await this.fetchFromDestination(destinationName, additionalURI, requestMethod) ;

    console.log(response) ;
}
`} language='javascript' />

                






                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;