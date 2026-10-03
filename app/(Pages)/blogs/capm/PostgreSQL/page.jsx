import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = `cds init capApp --nodejs`;
const code2 = `cd capApp`;
const code3 = `npm install`;

const code4 = 
`namespace cap.application.db.schema;

entity Warehouse {
    key ID : UUID;
    name : String;
    owner : String;
    address : String;
}`;

const code5 = `cds add data`;

const code6 = `ID,name,owner,address`;

const code7 = 
`ID,name,owner,address
550e8400-e29b-41d4-a716-446655440000,Central Warehouse,ABC Logistics,123 Industrial Area Chandigarh
550e8400-e29b-41d4-a716-446655440001,North Storage Hub,XYZ Supply Co,45 Sector 17 Chandigarh
550e8400-e29b-41d4-a716-446655440002,East Distribution Center,QuickMove Ltd,88 Phase 1 Mohali
550e8400-e29b-41d4-a716-446655440003,West Depot,TransWare Inc,12 Sector 8 Panchkula
550e8400-e29b-41d4-a716-446655440004,South Logistics Hub,FastTrack Pvt Ltd,222 Industrial Park Zirakpur
550e8400-e29b-41d4-a716-446655440005,Metro Warehouse,Reliant Storage,67 Sector 34 Chandigarh
550e8400-e29b-41d4-a716-446655440006,Prime Storage,LogiChain Solutions,9 IT Park Chandigarh
550e8400-e29b-41d4-a716-446655440007,City Depot,UrbanMove Logistics,101 Sector 22 Chandigarh
550e8400-e29b-41d4-a716-446655440008,Global Warehouse,Global Freight Ltd,55 Airport Road Mohali
550e8400-e29b-41d4-a716-446655440009,Elite Storage,Elite Transport Co,77 Business Zone Panchkula`;

const code8 = `npm add @cap-js/postgres` ;

const code9 = 
`using {cap.application.db.schema} from '../db/schema' ;

service WarehouseService @(path : 'warehouse') {

    entity Warehouses as projection on schema.Warehouse;

}`;


const code10 = `cds add mta,xsuaa,approuter --for production`;

const code11 = `npm update --package-lock-only`;

const code12 = 
`
# PostgreSQL resource definition
  - name: capApp-postgres
    type: org.cloudfoundry.managed-service
    parameters:
      service: postgresql-db
      service-plan: trial
      service-name: postgresql-instance     # instance name which we created on BTP Cockpit
`;


const code13a = "${default-url}";
const code13b = "${protocol}";
const code13c = "${default-uri}";
const code13d = "${org}-${space}";

const code13 = 
`
_schema-version: 3.3.0
ID: capApp
version: 1.0.0
description: "A simple CAP project."
parameters:
  enable-parallel-deployments: true
build-parameters:
  before-all:
    - builder: custom
      commands:
        - npm ci
        - npx cds build --production
modules:

  # cap app srv
  - name: capApp-srv
    type: nodejs
    path: gen/srv
    parameters:
      instances: 1
      buildpack: nodejs_buildpack
    build-parameters:
      builder: npm-ci
    provides:
      - name: srv-api # required by consumers of CAP services (e.g. approuter)
        properties:
          srv-url: ${code13a}
    requires:
      - name: capApp-auth
      - name: capApp-postgres

  # deployer service
  - name: capApp-postgres-deployer
    type: nodejs
    path: gen/pg
    parameters:
      buildpack: nodejs_buildpack
      no-route: true
      no-start: true
      tasks:
        - name: deploy-to-postgresql
          command: npm start
    requires:
      - name: capApp-postgres

  # app router
  - name: capApp
    type: approuter.nodejs
    path: app/router
    parameters:
      keep-existing-routes: true
      disk-quota: 256M
      memory: 256M
    requires:
      - name: srv-api
        group: destinations
        properties:
          name: srv-api # must be used in xs-app.json as well
          url: ~{srv-url}
          forwardAuthToken: true
      - name: capApp-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${code13b}
          app-uri: ${code13c}

resources:

  # xs-uaa resource definition
  - name: capApp-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: capApp-${code13d}
        tenant-mode: dedicated
        oauth2-configuration:
          credential-types:
            - "binding-secret"
            - "x509"
          redirect-uris:  
            - https://*~{app-api/app-uri}/**
    requires:
      - name: app-api

  # PostgreSQL resource definition
  - name: capApp-postgres
    type: org.cloudfoundry.managed-service
    parameters:
      service: postgresql-db
      service-plan: trial
      service-name: postgresql-instance     # instance name which we created on BTP Cockpit

`;

const code14 = `mbt build -t gen --mtar mta.tar` ;
const code15 = `cf deploy gen/mta.tar` ;




//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl text-black wrap-break-word">CAPM application with PostgreSQL</h1>





        <h2 className="text-4xl text-sky-500 wrap-break-word">Objective</h2>
        
        <p className="text-1xl wrap-break-word">In this example, we will build a CAP application from scratch, integrate it with a PostgreSQL database, and deploy the application data to the PostgreSQL instance.</p>




        
        
        
        <h2 className="text-4xl text-pink-500 wrap-break-word">Procedure</h2>

        <p className="text-1xl wrap-break-word">We will be following below steps -</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word text-blue-400"><a href="#step1">Create CAP Application</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step2">Create Entity and add Sample Data</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step3">Add the PostgreSQL CAP adapter</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step4">Create CAP Service</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step5">Create PostgreSQL Instance</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step6">Add MTA, XSUAA, and App Router Configuration</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step7">Configuration check in the MTA file</a></li>
            <li className="wrap-break-word text-blue-400"><a href="#step8">Build and Deploy the application</a></li>
        </ul>


        <h3 id="step1" className="text-3xl text-black wrap-break-word">Step 1 - Create CAP Application</h3>

        <p className="text-1xl wrap-break-word">In our example, we will use <span className="text-gray-950 font-semibold wrap-break-word">capApp</span> as the application name.</p>

        <p className="text-1xl wrap-break-word">The following commands will create the CAP application, navigate into the application directory, and install the required dependencies:</p>

        <div>
            <CodeSnippet code={code1} language="javascript" title="Terminal" />
        </div>
        
        <div>
            <CodeSnippet code={code2} language="javascript" title="Terminal" />
        </div>

        <div>
            <CodeSnippet code={code3} language="javascript" title="Terminal" />
        </div>








        <h3 id="step2" className="text-3xl text-black wrap-break-word">Step 2 - Create Entity and add Sample Data</h3>

        <p className="text-1xl wrap-break-word">In our case, we are creating a Warehouse entity in the schema.cds file under the db folder.</p>

        <div>
            <CodeSnippet code={code4} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">And to add sample data, use the below command which will create csv file.</p>

        <div>
            <CodeSnippet code={code5} language="javascript" title="terminal" />
        </div>

        <p className="text-1xl wrap-break-word">It adds sample data support to your CAP project.</p>

        <p className="text-1xl wrap-break-word">It typically creates a db/data folder where you can place CSV files containing initial records.</p>

        <p className="text-1xl wrap-break-word">In our case, it creates cap.application.db.schema-Warehouse.csv file which looks like -</p>

        <div>
            <CodeSnippet code={code6} language="javascript" title="db/data/cap.application.db.schema-Warehouse.csv" />
        </div>
        
        <p className="text-1xl wrap-break-word">We can add sample data on csv file like -</p>

        <div>
            <CodeSnippet code={code7} language="javascript" title="db/data/cap.application.db.schema-Warehouse.csv" />
        </div>







        <h3 id="step3" className="text-3xl text-black wrap-break-word">Step 3 - Add the PostgreSQL CAP adapter</h3>

        <p className="text-1xl wrap-break-word">We can use the below command to add the PostgreSQL adapter -</p>

        <div>
            <CodeSnippet code={code8} language="command" title="javascript" />
        </div>

        <p className="text-1xl wrap-break-word">it will add the PostgreSQL dependencies on <span className="text-gray-950 font-semibold wrap-break-word">package.json</span> file.</p>





        <h3 id="step4" className="text-3xl text-black wrap-break-word">Step 4 - Create CAP Service</h3>

        <p className="text-1xl wrap-break-word">We will define Service (cds file) in <span className="text-gray-950 font-semibold wrap-break-word">srv folder</span> to expose your data model (entities) for consumers through oData endpoint/api.</p>
        
        <p className="text-1xl wrap-break-word">In our case, we are creating warehouse-service.cds file to expose our entity as a service.</p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="srv/warehouse-service.cds" />
        </div>


        









        <h3 id="step5" className="text-3xl text-black wrap-break-word">Step 5 - Create PostgreSQL Instance</h3>

        <p className="text-1xl wrap-break-word">Create PostgreSQL instance on the <span className="text-gray-950 font-semibold wrap-break-word">space where you will deploy your cap application</span> in SAP BTP Cockpit.</p>


        <p className="text-1xl wrap-break-word">In our case, we have created the instance with name - <span className="text-gray-950 font-semibold wrap-break-word">postgresql-instance</span>, below are the details-</p>

        <table className="border-collapse border border-gray-400 wrap-break-word">
            <thead>
                <tr>
                    <th className="border text-black border-gray-300 wrap-break-word">Property</th>
                    <th className="border border-gray-300 wrap-break-word">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border text-black border-gray-300 px-3 wrap-break-word">Instance Name</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">postgresql-instance</td>
                </tr>
                <tr>
                    <td className="text-black border border-gray-300 px-3 wrap-break-word">Service</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">PostgreSQL, Hyperscaler Option</td>
                </tr>
                <tr>
                    <td className="text-black border border-gray-300 px-3 wrap-break-word">Plan</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">trial</td>
                </tr>
            </tbody>
        </table>









        <h3 id="step6" className="text-3xl text-black wrap-break-word">Step 6 - Add MTA, XSUAA, and App Router Configuration</h3>

        <p className="text-1xl wrap-break-word">Use the following command to generate the MTA configuration, XSUAA configuration, and App Router files required for deploying the CAP application to the SAP BTP environment:</p>

        <div>
            <CodeSnippet code={code10} language="javascript" title="terminal" />
        </div>

        <p className="text-1xl wrap-break-word">Next, run the following command to update the package-lock.json file without modifying the installed dependencies:</p>

        <div>
            <CodeSnippet code={code11} language="javascript" title="terminal" />
        </div>

        <p className="text-1xl wrap-break-word">This ensures that the package-lock.json file is updated with the dependency information required for the application.</p>







        <h3 id="step7" className="text-3xl text-black wrap-break-word">Step 7 - Configuration check in the MTA file</h3>

        <p className="text-1xl wrap-break-word">Open the <span className="text-gray-950 font-semibold wrap-break-word">mta.yaml</span> file and verify the generated configuration.</p> 
        
        <p className="text-1xl wrap-break-word">You will notice that the PostgreSQL requirement has been added to the app-srv module under the <span className="text-gray-950 font-semibold wrap-break-word">modules</span> section, while the corresponding PostgreSQL resource has been defined under the <span className="text-gray-950 font-semibold wrap-break-word">resources</span> section, as shown below:</p>

        <div>
            <CodeSnippet code={code12} language="yaml" title="mta.yaml" />
        </div>

        <p className="text-1xl wrap-break-word">So our complete mta.yaml file looks like-</p> 

        <div>
            <CodeSnippet code={code13} language="yaml" title="mta.yaml" />
        </div>



        <h3 id="step8" className="text-3xl text-black wrap-break-word">Step 8 - Build and Deploy the application</h3>

        <p className="text-1xl wrap-break-word">Use the below command to build the application and generate mtar file:</p>

        <div>
            <CodeSnippet code={code14} language="command" title="terminal" />
        </div>

        <p className="text-1xl wrap-break-word">Then, use the below command to Deploy the mtar file:</p>

        <div>
            <CodeSnippet code={code15} language="command" title="terminal" />
        </div>




        







        

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

        
    </div>
  );
};

export default page;