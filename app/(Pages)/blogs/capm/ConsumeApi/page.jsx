import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = `npm install axios@latest`;
const code2 = "`${clientId}:${clientSecret}`" ;
const code3 = "`Bearer ${accessToken}`";

const code4 =
`// Replace <region> with your actual region in the baseUrl
const baseUrl = 'https://auditlog-management.cfapps.<region>.hana.ondemand.com';


const clientId = 'sb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxb6316';
const clientSecret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const tokenURL = 'https://<subdomain>.authentication.<region>.hana.ondemand.com/oauth/token';

const endpoint = '/auditlog/v2/auditlogrecords?time_from=2026-07-10T00:00:00&time_to=2026-07-10T00:03:00';

// Axios POST call to Generate Token
const tokenResponse = await axios.post(tokenURL, qs.stringify(
    {
        grant_type: 'client_credentials'
    }
), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(${code2}).toString('base64')
    }
});


const accessToken = await tokenResponse.data.access_token;

const apiUri = baseUrl + endpoint;

// Axios GET call to fetch API data
const apiResponse = await axios.get(apiUri, {
    headers: {
        'Authorization': ${code3},
        'Accept': 'application/json'
    }
});

const data = apiResponse.data ;`;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Consume API</h1>
        
        <p className="text-1xl wrap-break-word">In this example, we will try to fetch data from any api using axios.</p>
        
        <p className="text-1xl wrap-break-word">It is a straightforward process where we first install the Axios dependency and then use it to call the API and retrieve the response data.</p>

        <p className="text-1xl wrap-break-word">In our case, the API is secured using OAuth 2.0 Client Credentials authentication. Therefore, we first make an Axios request to obtain an access token. Once the token is generated, we use it in a second Axios request to authenticate and consume the API.</p>

        <h4 className="text-2xl wrap-break-word">Install axios</h4>

        <div>
            <CodeSnippet code={code1} language="text" title="terminal" />
        </div>



        <h4 className="text-2xl wrap-break-word">Sample Code logic</h4>

        <div>
            <CodeSnippet code={code4} language="javascript" title="custom-logic.js" />
        </div>


    

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>


    </div>
  );
};

export default page;