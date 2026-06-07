import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = 
`cds init cap-application`;
const code2 = 
`cd cap-application`;
const code3 = 
`npm install`;
const code4 = 
`namespace cap.application.db.schema;

entity Warehouse {
    key ID : UUID;
    name : String;
    owner : String;
    address : String;
}`;

const code5 = 
`cds add data`;

const code6 = `ID,name,owner,address` ;
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
const code8 = `cds deploy`;
const code9 = 
`using {cap.application.db.schema} from '../db/schema' ;

service WarehouseService @(path : 'warehouse') {

    entity Warehouses as projection on schema.Warehouse;

}`;
const code10 = `cds watch` ;
const code11 = 
`### GET call to Read all the Warehouses
GET http://localhost:4004/odata/v4/warehouse/Warehouses


### GET call to Read a specific Warehouse by ID
GET http://localhost:4004/odata/v4/warehouse/Warehouses(550e8400-e29b-41d4-a716-446655440004)


### POST call to Create a new Warehouse
POST http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json

{
    "ID": "550e8400-e29b-41d4-a716-446655440010",
    "name" : "Elite Storage",
    "owner" : "Elite Transport Co",
    "address" : "77 Business Zone Panchkula"
}


### PUT call to Update the Warehouse details
PUT http://localhost:4004/odata/v4/warehouse/Warehouses(550e8400-e29b-41d4-a716-446655440010)
Content-Type: application/json

{
    "name" : "Elite Storage New",
    "owner" : "Elite Transport Co Ltd",
    "address" : "601 Business Zone Panchkula"
}


### PATCH call to Update the Warehouse address
PATCH http://localhost:4004/odata/v4/warehouse/Warehouses(550e8400-e29b-41d4-a716-446655440010)
Content-Type: application/json

{
    "address": "605 Business Zone Panchkula"
}



### DELETE call to Remove the Warehouse
DELETE http://localhost:4004/odata/v4/warehouse/Warehouses(550e8400-e29b-41d4-a716-446655440010)`;
const code12 = `cds add hana,mta,xsuaa,approuter --for production`;
const code13 = `npm update --package-lock-only`;
const code14 = `mbt build -t gen --mtar mta.tar`;
const code15 = `cf deploy gen/mta.tar`;



    // ############################### UI ################################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Sample CAP Application</h1>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">This is a sample SAP CAP application built from scratch for learning purposes.</li>
            <li className="wrap-break-word">The application <span className="text-gray-950 font-semibold wrap-break-word">integrates with SAP HANA Cloud as the database</span> and uses <span className="text-gray-950 font-semibold wrap-break-word">XSUAA</span> for authentication and authorization.</li>
            <li className="wrap-break-word">It demonstrates <span className="text-gray-950 font-semibold wrap-break-word">standard CRUD (Create, Read, Update, Delete) operations provided by SAP CAP out of the box</span>.</li>
            <li className="wrap-break-word">The application is packaged and will <span className="text-gray-950 font-semibold wrap-break-word">deploy to Cloud Foundry using an MTA</span> (Multi-Target Application) deployment model.</li>
        </ul>



        {/* <h2 className="text-4xl wrap-break-word">Heading 2</h2> */}

        <h3 className="text-3xl wrap-break-word">Creating CAP Application - </h3>

        <p>In our case, the application name is cap-application. so the command will be create the application, move inside the application folder and install the dependencies - </p>

        <div>
            <CodeSnippet code={code1} language="md" title="terminal command" />
        </div>
        <div>
            <CodeSnippet code={code2} language="md" title="terminal command" />
        </div>
        <div>
            <CodeSnippet code={code3} language="md" title="terminal command" />
        </div>




        <h3 className="text-3xl wrap-break-word">Creating Entity -  </h3>

        <p>In our case, we are creating a Warehouse entity in the <span className="text-gray-950 font-semibold wrap-break-word">schema.cds</span> file under the <span className="text-gray-950 font-semibold wrap-break-word">db folder</span>.</p>

        <div>
            <CodeSnippet code={code4} language="javascript" title="db/schema.cds" />
        </div>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">namespace</span> in CDS (Core Data Service) is used to <span className="text-gray-950 font-semibold wrap-break-word">uniquely identify</span> and <span className="text-gray-950 font-semibold wrap-break-word">organize artifacts</span> (such as entities, types, and services) within a CAP application.</li>
            <li className="wrap-break-word">It helps prevent naming conflicts when different files or projects contain artifacts with the same name.</li>
            <li className="wrap-break-word">Suppose another developer creates an entity with the same name, then without namespaces, both entity would simply be Warehouse, causing a naming conflict.</li>
            <li className="wrap-break-word">Hence, Multiple entities can have the same name as long as they belong to different namespaces.</li>
        </ul>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/1-sample-cap-app/db/schema.cds" />
        </div>




        <h3 className="text-3xl wrap-break-word">Adding Sample Data -  </h3>

        <p>Use the below command to create csv file for sample data -</p>

        <div>
            <CodeSnippet code={code5} language="javascript" title="terminal" />
        </div>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It adds sample data support to your CAP project.</li>
            <li className="wrap-break-word">It typically creates a <span className="text-gray-950 font-semibold wrap-break-word">db/data folder</span> where you can place <span className="text-gray-950 font-semibold wrap-break-word">CSV files</span> containing initial records.</li>
        </ul>

        <p>In our case, it creates cap.application.db.schema-Warehouse.csv file which looks like - </p>

        <div>
            <CodeSnippet code={code6} language="md" title="db/data/cap.application.db.schema-Warehouse.csv" />
        </div>

        <p>We can add sample data on csv file like - </p>

        <div>
            <CodeSnippet code={code7} language="md" title="db/data/cap.application.db.schema-Warehouse.csv" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/1-sample-cap-app/db/data/cap.application.db.schema-Warehouse.csv" />
        </div>


        



        <h3 className="text-3xl wrap-break-word">Deploy Data in in-memory database -  </h3>

        <p>Use the below command - </p>

        <div>
            <CodeSnippet code={code8} language="cmd" title="terminal" />
        </div>

        <p>Since we are in development phase, we can use in-memory database to deploy csv file data locally for our application.</p>


        <h4 className="text-2xl wrap-break-word">In-Memory Database</h4>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">An <span className="text-gray-950 font-semibold wrap-break-word">in-memory database</span> stores data only in the <span className="text-gray-950 font-semibold wrap-break-word">application memory (RAM)</span>. The data <span className="text-gray-950 font-semibold wrap-break-word">exists only while the application is running locally</span> in Business Application Studio during Development.</li>
        </ul>

        <h4 className="text-2xl wrap-break-word">SQLite Database</h4>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">SQLite</span> is a <span className="text-gray-950 font-semibold wrap-break-word">lightweight file-based database</span> that <span className="text-gray-950 font-semibold wrap-break-word">stores data in a local file</span> on your machine.</li>
            <li className="wrap-break-word">However it not recommended for enterprise production applications because it is a file-based embedded database, whereas production systems usually require a dedicated database server capable of handling high traffic, scalability, security, backups, and high availability.</li>
            <li className="wrap-break-word">It does not mean SQLite is bad. It is excellent for local development, testing, mobile apps, desktop apps, and small websites.</li>
        </ul>


        <h4 className="text-2xl wrap-break-word">SAP Hana Cloud Database</h4>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">SAP HANA Cloud</span> is SAP enterprise-grade cloud database. HDI (HANA Deployment Infrastructure) provides isolated database containers for applications. It is Production-ready database and widely used.</li>
        </ul>




        <h3 className="text-3xl wrap-break-word">Create Service -</h3>

        <p>We will define Service (cds file) in <span className="text-gray-950 font-semibold wrap-break-word">srv folder</span> to expose your data model (entities) for consumers through oData endpoint/api.</p>
        <p>In our case, we are creating warehouse-service.cds file to expose our entity as a service.</p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="srv/warehouse-service.cds" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/1-sample-cap-app/srv/warehouse-service.cds" />
        </div>






        <h3 className="text-3xl wrap-break-word">Run the application locally -</h3>

        <p>Use the below command to run the application locally - </p>
        
        <div>
            <CodeSnippet code={code10} language="cmd" title="terminal" />
        </div>
        
        


        <h3 className="text-3xl wrap-break-word">Test the application locally -</h3>

        <p>To test the application service locally, create a <span className="text-gray-950 font-semibold wrap-break-word">test-api folder</span> and define the service endpoints in the <span className="text-gray-950 font-semibold wrap-break-word">warehouse.http file</span> (you can give any name to the file).</p>

        <div>
            <CodeSnippet code={code11} language="javascript" title="test-api/warehouse.http" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/1-sample-cap-app/test-api/warehouse.http" />
        </div>




        <h3 className="text-3xl wrap-break-word">add Hana, xsuaa, approuter and mta file for the application -</h3>

        <p>Use the below command to add mta file for the application and add hana, xsuaa and approuter binding configuration</p>
        <div>
            <CodeSnippet code={code12} language="cmd" title="terminal" />
        </div>

        <p>Use the below command to update and lock the package-lock json file -</p>
        <div>
            <CodeSnippet code={code13} language="cmd" title="terminal" />
        </div>




        <h3 className="text-3xl wrap-break-word">Build the application -</h3>

        <p>Use the below command to build the application and generate mtar file.</p>
        <div>
            <CodeSnippet code={code14} language="cmd" title="terminal" />
        </div>




        <h3 className="text-3xl wrap-break-word">Deploy the application -</h3>

        <p>Use the below command to below command to Deploy the mtar file.</p>
        <div>
            <CodeSnippet code={code15} language="cmd" title="terminal" />
        </div>



        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>





        
    </div>
  );
};

export default page;
