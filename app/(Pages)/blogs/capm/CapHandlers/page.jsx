import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code01 = "`${request.data.owner} - NEW`" ;
const code1 = 
`import cds from '@sap/cds';

// refering to the entity which we have defined in our data model. We can also refer to the entity by using the relative path like this : cds.entities('Warehouses') 
// but it is always recommended to use the absolute path to avoid any confusion in case of multiple entities with same name in different namespaces.

// const { Warehouses } = cds.entities('warehouse');   //  -> Relative path to refer to the entity
const { Warehouse } = cds.entities('cap.application.db.schema');    //  -> Absolute path to refer to the entity (RECOMMENDED).



const WarehouseService = async (srv) => {

    //  ######################### CREATE - Handler ##########################

    srv.before('CREATE', 'Warehouses', async (request) => {
        try {
            const { name, owner, address } = request.data;

            if (!name || !owner || !address) {
                return request.error({
                    code: 400,
                    message: 'Invalid request, please check your payload'
                });
            }

            //  We wants to modify the owner field and wants to append it with "- NEW" just for fun ;-)
            request.data.owner = ${code01};
        }
        catch (error) {
            return request.error({
                code: 500,
                message: error.message
            });
        }
    });


    srv.on('CREATE', 'Warehouses', async (request) => {
        try {
            const { name, owner, address } = request.data;

            const newEntryPayload = {
                name: name,
                owner: owner,
                address: address
            }

            const newEntry = await cds.tx(async (tx) => {
                return await tx.run(INSERT.into(Warehouse).entries(newEntryPayload));
            });

            if (!newEntry) {
                return request.error({
                    code: 500,
                    message: 'Something went wrong while creating the warehouse entry'
                });
            }


            return newEntryPayload;
        }
        catch (error) {
            return request.error({
                code: 500,
                message: error.message
            });
        }
    });


    srv.after('CREATE', 'Warehouses', async (data, request) => {
        //  Just for fun, we wants to log the message in console after creating the entry in database.
        console.log(data);

        console.log(request.data);

        return data;
    });



}

export default WarehouseService;`;


const code2 = 
`using {cap.application.db.schema} from '../db/schema' ;

service WarehouseService @(path : 'warehouse') {

    entity Warehouses as projection on schema.Warehouse;

}`;

const code2b = 
`### POST call to Create a new Warehouse
POST http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json

{
    "ID": "550e8400-e29b-41d4-a716-446655440010",
    "name" : "Elite Storage",
    "owner" : "Elite Transport Co",
    "address" : "77 Business Zone Panchkula"
}`;

const code3 = 
`using {cap.application.db.schema} from '../db/schema' ;

service WarehouseService @(path : 'warehouse') {

    entity Warehouses as projection on schema.Warehouse;

    function getWarehouseCount() returns Integer ;

    action updateWarehouseOwner(warehouseId : String, newOwner : String) returns String ;
}`;

const code4 = 
`import cds from '@sap/cds';

// refering to the entity which we have defined in our data model. We can also refer to the entity by using the relative path like this : cds.entities('Warehouses') 
// but it is always recommended to use the absolute path to avoid any confusion in case of multiple entities with same name in different namespaces.

// const { Warehouses } = cds.entities('warehouse');   //  -> Relative path to refer to the entity
const { Warehouse } = cds.entities('cap.application.db.schema');    //  -> Absolute path to refer to the entity (RECOMMENDED).



const WarehouseService = async (srv) => {

    //  ######################### Function ##########################
    srv.on('getWarehouseCount', async (request) => {
        try {
            const warehouseRecords = await cds.tx(async (tx) => {
                return await tx.run(SELECT.from(Warehouse));
            });

            if (!warehouseRecords) {
                throw new Error('No Records Found');
            }

            return warehouseRecords.length;
        }
        catch (error) {
            return request.error({
                code: 500,
                message: 'Internal Server Error'
            });
        }
    });




    //  ######################### Actions ##########################
    srv.on('updateWarehouseOwner', async (request) => {
        try {

            const {warehouseId , newOwner} = await request.data ;

            if(!warehouseId || !newOwner){
                throw new Error('Invalid Request, please check payload');
            }


            const updateRecord = await cds.tx(async (tx) => {
                return await tx.run(UPDATE(Warehouse).set({owner : newOwner}).where({ID : warehouseId}));
            });

            if(!updateRecord){
                throw new Error('Failed to Update Warehouse Owner');
            }

            return "Owner details updated Successfully"

        }
        catch (error) {
            return request.error({
                code: 500,
                message: 'Internal Server Error'
            });
        }
    });



}

export default WarehouseService;`;

const code4b = 
`### Get Warehouse Count
GET http://localhost:4004/odata/v4/warehouse/getWarehouseCount


### Update Owner of a Warehouse
POST http://localhost:4004/odata/v4/warehouse/updateWarehouseOwner
Content-Type: application/json

{
    "warehouseId" : "550e8400-e29b-41d4-a716-446655440001",
    "newOwner" : "John Deo"
}`;


const codeEventSpecific = 
`this.on('myAction', (req) => {
  return { result: 'Success' };
});`;


const wildcard = 
`this.before('*', (req) => {
  console.log('Triggered for all events');
});`;



  

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Handlers in CAP</h1>

        <p className="wrap-break-word">Handlers are used to add custom logic to service operations (like CRUD or custom actions/functions). They are typically <span className="text-gray-950 font-semibold wrap-break-word">implemented in JavaScript (Node.js) or Java</span> and are registered on service events.</p>

        <p>In SAP CAP, different methods are represented as -</p>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">GET → READ</li>
            <li className="wrap-break-word">POST → CREATE</li>
            <li className="wrap-break-word">PATCH → UPDATE</li>
            <li className="wrap-break-word">DELETE → DELETE</li>
        </ul>






        
        <h2 className="text-4xl wrap-break-word">Main Types of Handlers in SAP CAP</h2>

        <h3 className="text-3xl wrap-break-word">1. Before Handlers (before)</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It gets executed <span className="text-gray-950 font-semibold wrap-break-word">before the actual operation</span> is performed.</li>
            <li className="wrap-break-word">It is used for - <span className="text-gray-950 font-semibold wrap-break-word">Input validation, Data modification or Authorization checks</span>, etc.</li>
            <li className="wrap-break-word">It can <span className="text-gray-950 font-semibold wrap-break-word">modify request data</span> or can <span className="text-gray-950 font-semibold wrap-break-word">reject request</span> using req.error().</li>
        </ul>


        <h3 className="text-3xl wrap-break-word">2. On Handlers (on)</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It <span className="text-gray-950 font-semibold wrap-break-word">Replace or fully handle the core processing logic</span>.</li>
            <li className="wrap-break-word">It is used when you want to <span className="text-gray-950 font-semibold wrap-break-word">override default CAP behavior or Implement custom business logic</span>.</li>
        </ul>


        <h3 className="text-3xl wrap-break-word">3. After Handlers (after)</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It gets <span className="text-gray-950 font-semibold wrap-break-word">executed after the operation has finished</span>.</li>
            <li className="wrap-break-word">It is used for - <span className="text-gray-950 font-semibold wrap-break-word">Enriching response data, Logging or Post-processing</span> etc.</li>
            <li className="wrap-break-word">It <span className="text-gray-950 font-semibold wrap-break-word">cannot reject the request</span> as the request main logic has already been implemented in On Handler, and After Handler works on response data and useful for <span className="text-gray-950 font-semibold wrap-break-word">formatting the response data</span>.</li>
        </ul>


        <h4 className="text-2xl wrap-break-word">For Example -</h4>

        <p>Lets implement custom logic that validates the incoming payload before creating a new record. Once the payload is validated, we can apply any modification on the request data.</p>
        <p>Once the custom processing is completed, the record will be created in the corresponding entity/database. Finally, the created record will be returned as the response.</p>


        <div>
            <CodeSnippet code={code1} language="javascript" title="srv/warehouse-service.js" />
        </div>


        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/2-handlers/srv/warehouse-service.js" />
        </div>


        <p>On the above code, we are defining Handlers for Warehouses because it is the entity exposed in the service definition in the CDS file, as shown below -</p>

        <div>
            <CodeSnippet code={code2} language="javascript" title="srv/warehouse-service.cds" />
        </div>
        
        <p>And we can test it locally by defining the POST call on .http file like -</p>

        <div>
            <CodeSnippet code={code2b} language="javascript" title="test-api/warehouse.http" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/2-handlers/test-api/warehouse.http" />
        </div>






        <h2 className="text-4xl wrap-break-word">Functions and Actions</h2>

        <h3 className="text-3xl wrap-break-word">1. Functions</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">A function in SAP CAP is a <span className="text-gray-950 font-semibold wrap-break-word">read-only operation</span> defined in CDS that retrieves or computes data <span className="text-gray-950 font-semibold wrap-break-word">without causing any side effects</span> or modifying the database.</li>
            <li className="wrap-break-word">Function is used to fetch or calculate data without changing anything.</li>
        </ul>


        <h3 className="text-3xl wrap-break-word">2. Actions</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">An action in SAP CAP is an operation defined in CDS that <span className="text-gray-950 font-semibold wrap-break-word">performs business logic</span> and can modify data or cause side effects in the system.</li>
            <li className="wrap-break-word">Actions are used to execute operations that change data or trigger business processes.</li>
        </ul>






        <h2 className="text-4xl wrap-break-word">Additional Handler Variants</h2>

        <h3 className="text-3xl wrap-break-word">1. Event-Specific Handlers</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It work with - Standard events like: CREATE, READ, UPDATE, DELETE and Custom events like: myAction, myFunction</li>
        </ul>

        <div>
            <CodeSnippet code={codeEventSpecific} language="javascript" title="srv/warehouse-service.js" />
        </div>


        <h3 className="text-3xl wrap-break-word">2. Wildcard Handlers</h3>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It is used to attach handler to multiple or all entities/events.</li>
        </ul>

        <div>
            <CodeSnippet code={wildcard} language="javascript" title="srv/warehouse-service.js" />
        </div>



        <h4 className="text-2xl wrap-break-word">For Example -</h4>

        <p>Lets define and implement a function and an action.</p>
        <p>The function will return the total number of warehouse records, while the action will update the owner details of a warehouse.</p>

        <p>First, define the function and action in the service CDS file.</p>

        <div>
            <CodeSnippet code={code3} language="javascript" title="srv/warehouse-service.cds" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/2-handlers/srv/warehouse-service.cds" />
        </div>
        

        <p>Then, define its custom logic on service js file.</p>

        <div>
            <CodeSnippet code={code4} language="javascript" title="srv/warehouse-service.js" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/2-handlers/srv/warehouse-service.js" />
        </div>
        
        


        
        <p>We can test it locally by defining the GET endpoints for function and POST endpoint for action on .http file like - </p>

        <div>
            <CodeSnippet code={code4b} language="javascript" title="function-action/function-action.http" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/2-handlers/test-api/function-action.http" />
        </div>




        
        

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

    </div>
  );
};

export default page;
