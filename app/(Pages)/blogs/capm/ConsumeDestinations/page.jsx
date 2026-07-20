import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

const code1 = 
`- name: cap-application-destination-service`;

const code2 = 
`# Define Destination Service Resource detials
- name: cap-application-destination-service
  type: org.cloudfoundry.managed-service
  parameters:
    service: destination
    service-plan: lite
    service-name: cap-application-destination-instance # <-- Service instance name
    config:
      HTML5Runtime_enabled: true
`;

const code3 = `npm install @sap-cloud-sdk/connectivity @sap-cloud-sdk/http-client` ;

const code4 = 
`import SdkConnectivity from '@sap-cloud-sdk/connectivity';
import SdkHttpClient from '@sap-cloud-sdk/http-client';`;


const code5 = 
`const myDestination = await SdkConnectivity.getDestination({
    destinationName: 'Log_Destination'
});

if (!myDestination) {
    return request.error({ code: 404, message: 'Destination not found' });
}

const endpoint = '/auditlog/v2/auditlogrecords?time_from=2026-07-10T00:00:00&time_to=2026-07-10T00:03:00' ;

console.log('Destination retrieved:', myDestination.name);

const destinationResponse = await SdkHttpClient.executeHttpRequest(myDestination, {
        url: endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        // data: JSON.stringify(requestBody)
    }
);

if (!destinationResponse) {
    return request.error({ code: 404, message: 'No response from Destination' });
}

const data = destinationResponse.data;`;




//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Consume Destination</h1>

        <p className="text-1xl wrap-break-word">In this example, we will fetch data from any API by configuring it as a Destination in SAP BTP and then consuming it through a CAP application.</p>

        <p className="text-1xl wrap-break-word">To achieve this, we will follow these steps-</p>


        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Create Destination on BTP Cockpit</li>    
            <li className="wrap-break-word">Create Service Binding on CAP application</li>
            <li className="wrap-break-word">Install dependencies</li>
            <li className="wrap-break-word">Consume Destination</li>
        </ul>






        <h2 className="text-4xl wrap-break-word">Step 1 - Create Destination on BTP Cockpit</h2>

        <p className="text-1xl wrap-break-word">Create a Destination in the SAP BTP subaccount where your application will be deployed. Configure the Destination based on the requirements of the API, including the necessary endpoint, authentication details, and any other credentials required to establish the connection.</p>

        <p className="text-1xl wrap-break-word">In our case, we created Destination with properties like-</p>

        <table className="border-collapse border border-gray-400 wrap-break-word">
            <thead>
                <tr>
                    <th className="border border-gray-300 wrap-break-word">Property</th>
                    <th className="border border-gray-300 wrap-break-word">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Destination Name</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Log_Destination</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Type</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">HTTP</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">URL</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">endpoint you want to consume</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Authentication</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">OAuth2ClientCredentials</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">ProxyType</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Internet</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">ClientId</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">credentials required to generate access token</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">ClientSecret</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">credentials required to generate access token</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">TokenServiceURL</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">URL to generate access token</td>
                </tr>
            </tbody>
        </table>





        <h2 className="text-4xl wrap-break-word">Step 2 - Create Service Binding on CAP application</h2>

        <p className="text-1xl wrap-break-word">Service binding gives your CAP application permission and the credentials to access the Destination service itself.</p>

        <p className="text-1xl wrap-break-word">Without the service binding, the application has no way to retrieve or use the Destination configuration, even though the Destination exists in the subaccount.</p>

        <p className="text-1xl wrap-break-word">To achieve this, we can declare the Destination Service requirement under modules requires section in mta.yaml file like -</p>

        <div>
            <CodeSnippet code={code1} language="yaml" title="mta.yaml" />
        </div>

        <p className="text-1xl wrap-break-word">And then we can define the service details under resources section on mta.yaml file like -</p>

        <div>
            <CodeSnippet code={code2} language="yaml" title="mta.yaml" />
        </div>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/7-consume-destination/mta.yaml" />
        </div>







        <h2 className="text-4xl wrap-break-word">Step 3 - Install Dependencies</h2>

        <p className="text-1xl wrap-break-word">We need connectivity and http-client dependencies from sap-cloud-sdk and can install using below command -</p>

        <div>
            <CodeSnippet code={code3} language="text" title="terminal" />
        </div>





        <h2 className="text-4xl wrap-break-word">Step 4 - Consume Destination</h2>

        <p className="text-1xl wrap-break-word">Now, we can consume the destination through custom logic.</p>

        <p className="text-1xl wrap-break-word">Make sure to import the required SAP Cloud SDK dependencies into your custom logic js file-</p>

        <div>
            <CodeSnippet code={code4} language="javascript" title="custom-service.js" />
        </div>
        
        <p className="text-1xl wrap-break-word">And here is the sample code to consume the destination-</p>

        <div>
            <CodeSnippet code={code5} language="javascript" title="custom-service.js" />
        </div>


        <div>
          <section className="rounded-t-lg bg-green-700 p-1 border-green-600  text-white">Note</section>
          <section className="p-3 border-b-2 border-l-2 border-r-2 border-green-700 rounded-b-lg">
            <ul className="list-disc ml-6">
                <li className="wrap-break-word">As a best practice, <span className="text-gray-950 font-semibold wrap-break-word">store the Destination name and API endpoint in User-Provided Variables</span>, and access them in your CAP application through environment variables.</li>
                <li className="wrap-break-word">This approach <span className="text-gray-950 font-semibold wrap-break-word">improves maintainability and avoids hardcoding configuration values</span> in your application code.</li>
            </ul>
          </section>
        </div>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/7-consume-destination/srv/custom-service.js" />
        </div>

        




        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>


    </div>
  );
};

export default page;