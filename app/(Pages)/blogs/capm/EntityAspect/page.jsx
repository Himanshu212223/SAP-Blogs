import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

const code1 = 
`entity Warehouse {
    key warehouseID : UUID;
    name : String;
    owner : String;
    address : String;
}`;

const code2 = 
`using { cuid } from '@sap/cds/common';

entity Warehouse : cuid{
   name : String;
   owner : String;
   address : String;
}`;

const code3 = 
`entity Warehouse {
   key ID : UUID;
   name : String;
   owner : String;
   address : String;
}`;


const code4 = 
`using { cuid, managed } from '@sap/cds/common';

entity Warehouse : cuid, managed{
   name : String;
   owner : String;
   address : String;
}`;


const code5 =
`entity Warehouse {
   key ID : UUID;
   name : String;
   owner : String;
   address : String;

   createdAt  : Timestamp;
   createdBy  : User;
   modifiedAt : Timestamp;
   modifiedBy : User;
}`;

const code6 = 
`using { cuid, temporal } from '@sap/cds/common';

entity Warehouse : cuid, temporal{
    name : String;
    owner : String;
    address : String;
}`;

const code7 = 
`entity Warehouse {
   key ID : UUID;
   name : String;
   owner : String;
   address : String;

   validFrom : Timestamp;
   validTo   : Timestamp;
}`;

const code8 = 
`aspect CodeList {
    key code  : String;
    name      : String;
    descr     : String;
}`;

const code9 = 
`using { cuid, sap.common.CodeList as CodeList} from '@sap/cds/common';

entity Regions : CodeList {};

entity Warehouse : cuid {
    name       : String;
    owner      : String;
    address    : String;

    region : Association to Regions;
}`;


const code10 = 
`aspect SoftDelete {
    isDeleted : Boolean default false;
}`;


const code11 = 
`using { cuid } from '@sap/cds/common';

aspect SoftDelete {
    isDeleted : Boolean default false;
}

entity Warehouse : cuid, SoftDelete {
    name       : String;
    owner      : String;
    address    : String;
}`;


const code12 = 
`entity Warehouse : cuid, SoftDelete {
    name       : String;
    owner      : String;
    address    : String;
    isDeleted  : Boolean default false;
}`;

const code13 = 
`namespace cap.application.db.schema;

using { cuid, managed, temporal, sap.common.CodeList as CodeList } from '@sap/cds/common';

aspect SoftDelete {
    isDeleted : Boolean default false;
}

entity Region : cuid, CodeList {};

entity Warehouse : managed, temporal, SoftDelete {
    key ID      : UUID;
        name    : String;
        owner   : String;
        address : String;
        region  : Association to Region ;
}`;

const code14 = `cds add data`;

const code15 = 
`ID,name,descr
550e8400-e29b-41d4-a716-446655440001,India,Country-India
550e8400-e29b-41d4-a716-446655440002,Germany,Country-Germany
550e8400-e29b-41d4-a716-446655440003,United States,Country-United States
550e8400-e29b-41d4-a716-446655440004,Japan,Country-Japan
550e8400-e29b-41d4-a716-446655440005,Australia,Country-Australia`;

const code16 = 
`using {cap.application.db.schema} from '../db/schema';

service WarehouseService @(path: 'warehouse') {

    entity Warehouses as projection on schema.Warehouse;

    function AllEntities() returns String ;
}`;

const code17 = "`${request.data.owner} - NEW`" ;
const code18 = 
`import cds from '@sap/cds';

// refering to the entity which we have defined in our data model. We can also refer to the entity by using the relative path like this : cds.entities('Warehouses') 
// but it is always recommended to use the absolute path to avoid any confusion in case of multiple entities with same name in different namespaces.

// const { Warehouses } = cds.entities('warehouse');   //  -> Relative path to refer to the entity
const { Warehouse } = cds.entities('cap.application.db.schema');    //  -> Absolute path to refer to the entity (RECOMMENDED).



const WarehouseService = async (srv) => {


    //  ######################### Handler to get all the Entity details ##########################
    srv.on('AllEntities', async (request) => {
        console.log(Object.keys(cds.entities('cap.application.db.schema')));
    });




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
            request.data.owner = ${code17};
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
            const { name, owner, address, region_ID } = request.data;

            //  Lets make it valid from today and valid to 1 year from now
            const newEntryPayload = {
                name: name,
                owner: owner,
                address: address,
                region_ID: region_ID,
                validFrom: new Date().toISOString(),
                validTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
            }

            const newEntry = await cds.tx( async (tx) => {
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

        console.log("Successfully created the Record");

        return data;
    });


}

export default WarehouseService;`;

const code19 = 
`### GET call to Read all the Warehouses
GET http://localhost:4004/odata/v4/warehouse/AllEntities


### GET call to Read all the Warehouses
GET http://localhost:4004/odata/v4/warehouse/Warehouses



### POST call to Create a new Warehouse
POST http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json

{
    "name" : "Elite Storage",
    "owner" : "Elite Transport Co",
    "address" : "77 Business Zone Panchkula",
    "region_ID" : "550e8400-e29b-41d4-a716-446655440005"
}` ;



//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Aspects</h1>

        <p className="text-1xl wrap-break-word">An aspect is a reusable collection of fields, annotations, or relationships that can be shared across multiple entities to avoid writing the same code repeatedly.</p>
        
        <p className="text-1xl wrap-break-word">We use aspects to reuse common fields, annotations, or relationships across multiple entities, reducing code duplication and making the data model easier to maintain.</p>




        <h2 className="text-4xl wrap-break-word">1. uuid</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">UUID (Universally Unique Identifier) is a data type in SAP CAP that stores a globally unique 128-bit identifier.</li>
            <li className="wrap-break-word">It is used when you want every record to have a unique ID that is extremely unlikely to duplicate, even across different systems.</li>
        </ul>

        <p className="text-1xl wrap-break-word">We can use UUID in entity like - </p>

        <div>
            <CodeSnippet code={code1} language="javascript" title="db/schema.cds" />
        </div>




        <h2 className="text-4xl wrap-break-word">2. cuid</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">cuid (Canonical Unique Identifier) is a built-in aspect provided by SAP CAP that automatically adds a primary key named ID of type UUID to an entity.</li>
            <li className="wrap-break-word">It saves you from manually declaring the UUID key, so if we use cuid then entity will itself make a field of ID as UUID and its value will automatically gets added when we add new entry on the entity.</li>
        </ul>

        <p className="text-1xl wrap-break-word">We can use CUID aspect in entity like - </p>

        <div>
            <CodeSnippet code={code2} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">and the actual entity internally will look like - </p>

        <div>
            <CodeSnippet code={code3} language="javascript" title="db/schema.cds" />
        </div>
        
        <p className="text-1xl wrap-break-word">So we do not need to add or manage the ID manually.</p>
        
        



        <h2 className="text-4xl wrap-break-word">3. managed</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">managed is a built-in aspect that automatically adds and maintains audit fields such as who created or modified a record and when those actions occurred.</li>
        </ul>

        <p className="text-1xl wrap-break-word">We can use this aspect in entity like -</p>

        <div>
            <CodeSnippet code={code4} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">and the actual entity internally will look like - </p>

        <div>
            <CodeSnippet code={code5} language="javascript" title="db/schema.cds" />
        </div>
        
        



        <h2 className="text-4xl wrap-break-word">4. temporal</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">temporal is a built-in aspect that adds validity period fields (validFrom and validTo) to an entity.</li>
            <li className="wrap-break-word">It is used for storing historical or time-dependent data.</li>
        </ul>

        <p className="text-1xl wrap-break-word">We can use this aspect in entity like -</p>

        <div>
            <CodeSnippet code={code6} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">and the actual entity internally will look like - </p>

        <div>
            <CodeSnippet code={code7} language="javascript" title="db/schema.cds" />
        </div>
        
        



        <h2 className="text-4xl wrap-break-word">5. CodeList</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">A CodeList in SAP CAP is a predefined aspect used to create lookup (master) data.</li>
            <li className="wrap-break-word">It stores a fixed list of values that can be reused across your application instead of typing the same text repeatedly.</li>
            <li className="wrap-break-word">For Example, if we are repeatedly using the Region to define country, we can instead define it in a Region entity and rest other entity can use it simply.</li>
        </ul>

        <p className="text-1xl wrap-break-word">Aspect CodeList actually is - </p>

        <div>
            <CodeSnippet code={code8} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">and we can use it on entity as -</p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="db/schema.cds" />
        </div>
        
        



        <h2 className="text-4xl wrap-break-word">6. Custom Aspect</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">A custom aspect is a reusable collection of fields, associations, or annotations created by the developer.</li>
            <li className="wrap-break-word">It allows the same structure to be shared across multiple entities.</li>
        </ul>

        <p className="text-1xl wrap-break-word">We can create an aspect like - </p>

        <div>
            <CodeSnippet code={code10} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">and can use it on entity like - </p>

        <div>
            <CodeSnippet code={code11} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">and our entity will actually looks like - </p>

        <div>
            <CodeSnippet code={code12} language="javascript" title="db/schema.cds" />
        </div>







        <h2 className="text-4xl wrap-break-word">Code Example using all the aspects -</h2>

        <p className="text-1xl wrap-break-word">Let's create an application to manage warehouse details.</p>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">The application should maintain audit information, such as when a record was created or last updated - for which we will use managed.</li>
            <li className="wrap-break-word">It should also store the validity period of each warehouse - for which we will use temporal.</li>
            <li className="wrap-break-word">It also defines the country or region to which the warehouse belongs - for which we will use Region CodeList.</li>
            <li className="wrap-break-word">It also keep track of whether a warehouse record has been marked or requested for deletion - for which we will define our custom aspect.</li>
        </ul>

        <p className="text-1xl wrap-break-word">So, we can define the entity with aspects in schema.cds file in db folder like - </p>

        <div>
            <CodeSnippet code={code13} language="javascript" title="db/schema.cds" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/4-entity-aspect/db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">We can then create entity data csv file using command - </p>

        <div>
            <CodeSnippet code={code14} language="javascript" title="terminal" />
        </div>
        
        <p className="text-1xl wrap-break-word">We can then define some sample data for Country Region like - </p>
        
        <div>
            <CodeSnippet code={code15} language="javascript" title="db/data/cap.application.db.schema-Region.csv" />
        </div>
        
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/4-entity-aspect/db/data/cap.application.db.schema-Region.csv" />
        </div>



        <p className="text-1xl wrap-break-word">We can define the service file like - </p>

        <div>
            <CodeSnippet code={code16} language="javascript" title="srv/warehouse-service.cds" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/4-entity-aspect/srv/warehouse-service.cds" />
        </div>


        

        <p className="text-1xl wrap-break-word">And similarly we can define our custom logic to store warehouse details like - </p>

        <div>
            <CodeSnippet code={code18} language="javascript" title="srv/warehouse-service.js" />
        </div>
        
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/4-entity-aspect/srv/warehouse-service.js" />
        </div>




        <p className="text-1xl wrap-break-word">To test the endpoint locally, run the application and create http file like - </p>
        
        <div>
            <CodeSnippet code={code19} language="javascript" title="test-api/warehouse.http" />
        </div>
        
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/4-entity-aspect/test-api/warehouse.http" />
        </div>

       

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>


       
    </div>
  );
};

export default page;