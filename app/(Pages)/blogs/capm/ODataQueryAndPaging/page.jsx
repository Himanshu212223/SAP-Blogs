import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses(550e8400-e29b-41d4-a716-446655440009)
Content-Type: application/json`;

const code2 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses(ID=550e8400-e29b-41d4-a716-446655440008)
Content-Type: application/json`;

const code3 = 
`Request
   ↓
Custom Handler
   ↓
 STOP`;

const code4 = 
`Request
   ↓
Custom Handler
   ↓
next()
   ↓
CAP Generic Provider
   ↓
Database
   ↓
Response`;

const code5 = 
`srv.on('READ', 'Warehouses', async (request, next) => {
    try {
        // console.log(JSON.stringify(request.query, null, 2));

        return next();

    }
    catch (error) {
        return request.error({
            code: 500,
            message: 'Internal Server Error'
        });
    }
});`;

const code6 =
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$select=ID,name
Content-Type: application/json`;

const code7 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$search=Warehouse
Content-Type: application/json`;

const code8 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$filter=name eq 'Elite Storage'
Content-Type: application/json`;

const code9 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$filter=ID gt 550e8400-e29b-41d4-a716-446655440004
Content-Type: application/json`;

const code10 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$filter=ID gt 550e8400-e29b-41d4-a716-446655440004 and name eq 'Elite Storage'
Content-Type: application/json`;


const code11 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$orderby=name desc
Content-Type: application/json`;


const code12 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5
Content-Type: application/json`;


const code13 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5&$skip=2
Content-Type: application/json`;


const code14 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5&$skip=2&$count=true
Content-Type: application/json`;


const code15 =
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5&$skip=2
Content-Type: application/json`;


const code16 = 
`service WarehouseService @(path : 'warehouse') {
    
    @cds.query.limit.default: 5
    @cds.query.limit.max: 8
    entity Warehouses as projection on schema.Warehouse;

    function getWarehouseCount() returns Integer ;

    action updateWarehouseOwner(warehouseId : String, newOwner : String) returns String ;
}`;


const code17 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json`;


const code18 =
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=12
Content-Type: application/json`;


const code19 = 
`"cds": {
   "query": {
      "limit": {
         "default": 5,
         "max": 8
      }
   }
}`;

const code20 =
`GET http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json`;

const code21 = 
`GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=12
Content-Type: application/json`;



//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Path, Query Parameter and Paging</h1>


        <h2 className="text-4xl wrap-break-word">Path Variable</h2>

        <p className="wrap-break-word">A Path Variable is a <span className="text-gray-950 font-semibold wrap-break-word">dynamic value embedded directly within the URL path</span> that is used to identify, locate, or operate on a specific resource in an application.</p>

        <p className="wrap-break-word">In SAP CAP, a path variable is a value passed in the URL path that uniquely identifies a specific resource (entity instance). In OData services, path variables are typically represented by the entity key inside parentheses.</p>

        <p className="wrap-break-word">Path Variable <span className="text-gray-950 font-semibold wrap-break-word">must have Primary Key field atleast</span>.</p>

        <p className="wrap-break-word">CAP <span className="text-gray-950 font-semibold wrap-break-word">provides inbuild path variable feature</span> which we can consume directly.</p>

        <p className="wrap-break-word">For Example -</p>
        <div>
            <CodeSnippet code={code1} language="javascript" title="test-api/Path and Query Param.http" />
        </div>

        <p className="wrap-break-word">OR</p>
        
        <div>
            <CodeSnippet code={code2} language="javascript" title="test-api/Path and Query Param.http" />
        </div>

        <p className="wrap-break-word">And we <span className="text-gray-950 font-semibold wrap-break-word">can customize the custom logic based on request.params</span>.</p>






        <h3 className="text-3xl wrap-break-word">What is next in cap ..?</h3>

        <p className="wrap-break-word">next is a function available in CAP on event handlers that passes control to the next handler in the processing chain or to CAP's built-in Generic Provider.</p>

        <p className="wrap-break-word">So, since we know CAP automatically provides CRUD operations through its Generic Provider without any custom logic. When we <span className="text-gray-950 font-semibold wrap-break-word">implement any custom logic</span> then we are <span className="text-gray-950 font-semibold wrap-break-word">affecting CAP normal flow</span>.</p>

        <p className="wrap-break-word">At that point CAP does not know whether you want to completely replace the READ operation OR you only want to add validation and continue.</p>

        <p className="wrap-break-word">next() resolves this ambiguity.</p>


        <p className="wrap-break-word">So without next(), Your handler becomes responsible for everything.</p>

        <div>
            <CodeSnippet code={code3} language="md" title="Flow Diagram" />
        </div>

        <p className="wrap-break-word">and with next(), your handler act as a validation check.</p>

        <div>
            <CodeSnippet code={code4} language="md" title="Flow Diagram" />
        </div>

        <p className="wrap-break-word">and we can use next() in custom handler like-</p>

        <div>
            <CodeSnippet code={code5} language="javascript" title="srv/warehouse-service.js" />
        </div>



        <p className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">Remember, if you are using next and also performing some CRUD operation on DB through custom logic, then you are already reading the database once and then next() causes CAP to read it again</span>.</p>

        <p className="wrap-break-word">So there will be two database calls, Hence we should appropriately use the next function.</p>

        <h4 className="text-2xl wrap-break-word">When Should we Use next() ..?</h4>

        <p className="wrap-break-word">Use it when we want to:</p>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">Validate input and still use standard CRUD.</li>
            <li className="wrap-break-word">Check authorization.</li>
            <li className="wrap-break-word">Log requests.</li>
            <li className="wrap-break-word">Enrich responses.</li>
            <li className="wrap-break-word">Add business rules before or after CAP processing.</li>
        </ul>
        
        <h4 className="text-2xl wrap-break-word">When Should You Avoid next() ..?</h4>

        <p className="wrap-break-word">Avoid it when:</p>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">We want complete control over the response.</li>
            <li className="wrap-break-word">We are replacing CAP's default CRUD behavior.</li>
            <li className="wrap-break-word">We are reading from an external API instead of the database.</li>
            <li className="wrap-break-word">We are building a completely custom query.</li>
        </ul>









        <h2 className="text-4xl wrap-break-word">Query Parameter</h2>

        <p className="wrap-break-word">A Query Parameter is a <span className="text-gray-950 font-semibold wrap-break-word">key-value pair appended to the URL after a ? symbol</span> and is used to filter, search, sort, paginate, or modify the behavior of an API request without changing the resource path.</p>

        <p className="wrap-break-word">Path parameters identify a resource, while query parameters refine or filter the result.</p>
        
        <p className="wrap-break-word">Different Query Params provided by CAP are -</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">$select</li>
            <li className="wrap-break-word">$search</li>
            <li className="wrap-break-word">$filter</li>
            <li className="wrap-break-word">$orderby</li>
            <li className="wrap-break-word">$top</li>
            <li className="wrap-break-word">$skip</li>
            <li className="wrap-break-word">$count</li>
        </ul>



        <h4 className="text-2xl wrap-break-word">1. $select</h4>
        
        <p className="wrap-break-word">If we want to display only specific fields in the response, we can use the $select query option.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code6} language="javascript" title="test-api/Path and Query Param.http" />
        </div>



        <h4 className="text-2xl wrap-break-word">2. $search</h4>
        
        <p className="wrap-break-word">If we want to search for a specific value in the response data, we can use the $search query option.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code7} language="javascript" title="test-api/Path and Query Param.http" />
        </div>



        <h4 className="text-2xl wrap-break-word">3. $filter</h4>
        
        <p className="wrap-break-word">The $filter query option is used to retrieve data that matches a specified condition.</p>

        <p className="wrap-break-word">Example, filter the result where name is equals Elite Storage -</p>
        
        <div>
            <CodeSnippet code={code8} language="javascript" title="test-api/Path and Query Param.http" />
        </div>
        
        <p className="wrap-break-word">Example, filter the result where ID is greater than certain value -</p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="test-api/Path and Query Param.http" />
        </div>
        
        <p className="wrap-break-word">Example, filter the result where ID is greater than certain value and name equals to certain value -</p>

        <div>
            <CodeSnippet code={code10} language="javascript" title="test-api/Path and Query Param.http" />
        </div>


        <h4 className="text-2xl wrap-break-word">4. $orderby</h4>
        
        <p className="wrap-break-word">The $orderby query option is used to sort the response data in ascending or descending order based on a specified field.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code11} language="javascript" title="test-api/Path and Query Param.http" />
        </div>


        <h4 className="text-2xl wrap-break-word">5. $top</h4>
        
        <p className="wrap-break-word">The $top query option is used to limit the number of records and return specific number of response data.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code12} language="javascript" title="test-api/Path and Query Param.http" />
        </div>



        <h4 className="text-2xl wrap-break-word">6. $skip</h4>
        
        <p className="wrap-break-word">Use the $skip query option to ignore the first N records in the response. It is typically combined with $top to implement paging.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code13} language="javascript" title="test-api/Path and Query Param.http" />
        </div>



        <h4 className="text-2xl wrap-break-word">7. $count</h4>
        
        <p className="wrap-break-word">The $count query parameter allows us to obtain the total count of records that match the query criteria.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code14} language="javascript" title="test-api/Path and Query Param.http" />
        </div>









        <h2 className="text-4xl wrap-break-word">Paging</h2>

        <p className="wrap-break-word">Paging in SAP CAP is the process of retrieving data in smaller chunks instead of fetching the entire dataset at once.</p>

        <p className="wrap-break-word">CAP supports paging through the OData query options $top and $skip.</p>

        
        
        <h4 className="text-2xl wrap-break-word">1. Client-Side Paging</h4>
        
        <p className="wrap-break-word">Client-side paging can be implemented by using the $top and $skip OData query options to retrieve a specific subset of records from the complete dataset.</p>

        <p className="wrap-break-word">Example -</p>
        
        <div>
            <CodeSnippet code={code15} language="javascript" title="test-api/Path and Query Param.http" />
        </div>

        
        
        <h4 className="text-2xl wrap-break-word">2. Server-Side Paging (Default Page Size)</h4>
        
        <p className="wrap-break-word">We can configure a default and maximum page size in our service definition in service.cds file.</p>

        <p className="wrap-break-word">We can use @cds.query.limit.default and @cds.query.limit.max annotation on the service file.</p>

        <p className="wrap-break-word">like -</p>
        
        <div>
            <CodeSnippet code={code16} language="javascript" title="srv/warehouse-service.cds" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/3-odata-query-and-paging/srv/warehouse-service.cds" />
        </div>


        <p className="wrap-break-word">and then request data will return default of 5 records using -</p>

        <div>
            <CodeSnippet code={code17} language="javascript" title="test-api/Path and Query Param.http" />
        </div>

        <p className="wrap-break-word">and will return max of 8 records if we try to fetch more than 8 records -</p>

        <div>
            <CodeSnippet code={code18} language="javascript" title="test-api/Path and Query Param.http" />
        </div>


        
        
        
        <h4 className="text-2xl wrap-break-word">3. Global Paging Configuration</h4>
        
        <p className="wrap-break-word">You can define limits for all services of the application and can define define it in package.json.</p>

        <p className="wrap-break-word">like -</p>
        
        <div>
            <CodeSnippet code={code19} language="javascript" title="package.json" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/3-odata-query-and-paging/package.json" />
        </div>

        
        <p className="wrap-break-word">and then request data will return default of 5 records using -</p>

        <div>
            <CodeSnippet code={code20} language="javascript" title="test-api/Path and Query Param.http" />
        </div>

        <p className="wrap-break-word">and will return max of 8 records if we try to fetch more than 8 records -</p>

        <div>
            <CodeSnippet code={code21} language="javascript" title="test-api/Path and Query Param.http" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/3-odata-query-and-paging/test-api/Path%20and%20Query%20Param.http" />
        </div>
        

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

    </div>
  );
};

export default page;