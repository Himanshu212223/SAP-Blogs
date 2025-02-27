import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {


    const uri = '`${destinationName}/${additionalURI}`' ;
    const additionalURI = '`auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}`' ;
    const completeURL = 'https://auditlog-management.cfapps.us10.hana.ondemand.com/auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}' ;


    return (
        <div className="indexing">
            <h1 className="headline">Connect Destination with Fiori UI5 and Consume the URL using Fetch method.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                Since we know that if we want to fetch data from an api then we need to create a Destination on BTP Cockpit and then consume the Destination to fetch the data. So the Object here is to connect the Destination with Fiori Ui5 and consume the api.
            </p>

            <p className="paragraph">
                Here, we will create a button and when user click on it, it will fetch the data by consuming the api using Destination and display it on console.
            </p>

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                To connect the Destination with Fiori UI5 Application, we have to follow these steps.
            </p>

            <p className="list">
                1. Create a Destination on BTP Cockpit Subaccount where we will deploy our Fiori UI5 Application.<span className="teal"> (suppose we are creating the Destination AuditLog_Destination)</span>.
            </p>

            <Image src="/resources/connectDestinationWithUI5/destination.png" width={1000} height={200} alt="Picture of the author" />

            <p className="list">
                Don&#x27;t forget to mention the following Additional Properties on the Destination &#x2d;
            </p>

            <p className="list pinky">
                HTML5.DynamicDestination &#x2d; true
            </p>
            <p className="list pinky">
                WebIDEEnabled &#x2d; true
            </p>
            <p className="list pinky">
                WebIDEUsage &#x2d; odata_gen
            </p>


            <p className="list">
                2. Now, go to <span className="tomato">xs-app.json</span> file, and add the following object on the <span className="tomato">routes</span> array.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
{
    "source": "^/AuditLog_Destination/(.*)$",
    "target" : "/$1",
    "authenticationType": "xsuaa",
    "destination" : "AuditLog_Destination",
    "csrfProtection": false
}
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                Here, on source and destination we have mentioned AuditLog_Destination because we have created the Destination on BTP Cockpit <span className="teal"> (subaccount were we want to deploy)</span> with same name i.e &#x2e;&#x2c; <span className="pinky"> AuditLog_Destination</span>.
            </p>

            <p className="paragraph">
                So, now your <span className="tomato">xs-app.json</span> will look like this -
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
}

                    `
                }
            </SyntaxHighlighter>

            
            <p className="list">
                3. Now, go to the <span className="tomato">controller.js</span> file, and add the following function.
            </p>

            <p className="list">
                You can copy it and paste it in your controller.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
            {
`
fetchFromDestination : async function(destinationName, additionalURI, requestMethod) {
    let sUrl = ${uri} ;

    const fetchedData = await fetch(sUrl, {
        method : requestMethod,
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    });

    let responseData = await fetchedData.json();

    return responseData ;
}
                ` 
            }
            </SyntaxHighlighter>
            

            <p className="paragraph">
                4. Now, lets create a function to consume above function.
            </p>
            <p className="paragraph pinky">
                We will create a button on UI and on press the button, it will call the below method.
            </p>

            <p className="paragraph pinky">
                And this below method then call the fetchFromDestination method inside it and will get the data from Destination.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
getLog : async function() {
    const destinationName = "AuditLog_Destination" ;
    const fromTime = "2024-11-20T00:00:00";
    const toTime = "2024-11-20T23:00:00" ;
    const requestMethod = "GET" ;
    const additionalURI = ${additionalURI} ;

    /*  So, the complete url is 
     ${completeURL}

    But, we have maintained https://auditlog-management.cfapps.us10.hana.ondemand.com on Destination.
    
    and maintained ${additionalURI} on additionalURI.
    */

    // Lets call the Destination method to consume the api.
    let response = await this.fetchFromDestination(destinationName, additionalURI, requestMethod) ;

    console.log(response) ;
}
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                5. Lets create a button on <span className="tomato"> view xml </span> file.
            </p>


            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<Button id="button" text="Fetch Logs" press="getLog" />
                    `
                }
            </SyntaxHighlighter>


            <p className="deepPink">
                And, it is done. You can use this JSON Model in your Fiori UI5 Application.
            </p>

            <p className="list">
                Now, Deploy the application on the Subaccount and space.
            </p>
            

            <p className="list">
                Open the Deployed project from HTML5 Applications and open the console by click on the Fetch Logs button of UI.
                You will find the response on the console.
            </p>


            <p className="list bold pinky">
                Now, you can utilize the response as you want.
            </p>



            {/* <PrismLoader /> */}


        </div>
    );
}

export default sample1;