"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    const markup1 = '`Employee ${name} alrady exist.`' ;
    const markup2 = "`Error Creating the User.`" ;
    const markup3 = "`Successfully created ${name}`" ;
    const markup4 = "`Internal Server Error.`" ;
    const markup5 = "`Deleted User ${empId} Successfully.`" ;

    return (
        <main className='main'>
            <h1>CRUD Operation using Action in CAP</h1>

            <div className='content'>

                <p>In this example, Our goal is to create Employee Schema and perform CRUD Operation to it.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Creating a CAP App.</ol>
                    <ol>2. Create Schema in db and Add Data.</ol>
                    <ol>3. Create Service cds file and declare the endpoints.</ol>
                    <ol>4. Create Service js file and define the endpoint logic.</ol>
                    <ol>5. Deploy the db Data on SqLite.</ol>
                    <ol>6. Run the app and Test it using HTTP File.</ol>
                </ul>



                <h2>Step 1 - Creating a CAP App</h2>

                <p>Use the below command to create a CAP Application - </p>

                <CodeBlock code={`cds init <Project_Name> `} language="javascript" />

                <p>Now, go inside the Project Folder, and install the dependencies. - </p>

                <CodeBlock code={`cd <Project_Name> `} language="javascript" />

                <CodeBlock code={`npm install`} language="javascript" />



                <h2>Step 2 - Create Schema in db and Add Data</h2>

                <p>In the db Folder create <span className='highlight'>Schema.cds</span> file</p>

                <p>In the <span className='highlight'>Schema.cds</span> use below code to create Entity - </p>

                <CodeBlock code={`
namespace capEmployee.db.schema;

entity Employees {
  key empId    : Integer;
  name     : String;
  location : String;
  login    : Date ;
  }`} language="javascript" />

                  <p>To add data we needs to create csv files, hence run the below command - </p>

                  <CodeBlock code={`cds add data`} language="javascript" />

                  <p>Now in <span className='highlight'>data folder inside db folder </span> paste the below data - </p>

                  <CodeBlock code={`
empId,name,location,login
101,Peter Willson,London,2025-01-14
102,Sarah Thompson,Manchester,2025-01-15
103,James Smith,Birmingham,2025-01-16
104,Emily Johnson,Leeds,2025-01-17
105,Daniel Williams,Glasgow,2025-01-18
106,Olivia Brown,Liverpool,2025-01-19
107,Matthew Taylor,Sheffield,2025-01-20
108,Isabella Lee,Edinburgh,2025-01-21
109,David Harris,Bristol,2025-01-22
110,Mia Clark,Newcastle,2025-01-23
111,Jack Lewis,Southampton,2025-01-24
112,Ava Walker,Nottingham,2025-01-25
113,Ethan Allen,Oxford,2025-01-26
114,Grace King,Cambridge,2025-01-27
115,Benjamin Wright,Cardiff,2025-01-28
116,Lily Scott,Manchester,2025-01-29
`} language="csv" />

                <h2>Step 3 - Create Service cds file and declare the endpoints</h2>
                
                <p>Create <span className='highlight'>service.cds</span> file inside <span className='highlight'>srv</span> folder - </p>

                <CodeBlock code={`
using capEmployee.db.schema from '../db/schema' ;

service customServices {

    // Get Details of all the Users.
    entity EmployeeDetails as projection on schema.Employees;

    // Get a Particular User Details.
    action getUser(empId : Integer) returns String ;

    // Create a User on DB
    action addUser(empId : Integer, name: String, location: String, login: Date) returns String ;

    // Update User Details.
    action updateUser(empId : Integer, name : String, location : String, login : Date) returns String ; 

    // Delete User from DB
    action deleteUser(empId : Integer) returns String ; 

}
`} language='javascript' />

                



                <h2>Step 4 - Create Service js file and define the endpoint logic</h2>
                
                <p>Create <span className='highlight'>service.js</span> file inside <span className='highlight'>srv</span> folder - </p>


                <CodeBlock code={`
const cds = require('@sap/cds');

const LOGGER = cds.log('mycustom-service');

const { Employees } = cds.entities;

const customServices = (srv) => {


    /*
        Fetch User Details based on empId - 
        ---------------------------------------------

        Payload - 
        {
            "empId" : <value>
        }

        STEPS - 
        Step 1 - Extract the empId from the request payload.
        Step 2 - Validate the empId if exist or not.
        Step 3 - Query the database to retrieve user details based on the empId.
        Step 4 - Check if employee details even exist on DB or not.
        Step 5 - Return the employee details.

    */
    srv.on("getUser", async (request, response) => {
        try {

            //  Step 1 - Extract the empId from the request payload.
            const { empId } = request.data;

            // Step 2 - Validate the empId if exist or not.
            if (!empId) {
                LOGGER.error("empId is empty");
                return request.error(400, "Invalid Payload");
            }

            //  Step 3 - Query the database to retrieve user details based on the empId.
            let userDetails = await cds.run(SELECT.from(Employees).where({ empId: empId }));

            //  Step 4 - Check if employee details even exist on DB or not.
            if (userDetails.length == 0) {
                LOGGER.error("User doesnot exist");
                return request.error(400, 'User doesnot exist.');
                }

            //  Step 5 - Return the employee details.
            LOGGER.info("Provided User details on Response");
            return userDetails;
            }
            catch (error) {
            LOGGER.error(error);
            request.error(500, "Internal Server Error");
        }
    });



    /*
        Add new User on DB - 
        ---------------------------------------------

        Payload - 
        {
            "empId" : <value>,
            "name" : <value>,
            "location" : <value>,
            "login" : <value>
        }

        STEPS - 
        Step 1 - Extract the empId, name, location, login from the request payload and check if not null.
        Step 2 - Check if User already exist in DB based on empId.
        Step 3 - Create an object of Employee with details which will be used to add new Employee on Schema.
        Step 4 - Adding the Employee into Employee Table on DB.
        Step 5 - Return the required response.

    */

    srv.on("addUser", async (request, response) => {
        try {

            //  Step 1 - Extract the empId, name, location, login from the request payload and check if not null.
            const { empId, name, location, login } = await request.data;


            if (!empId || !name || !location || !login) {
                LOGGER.error("Invalid Payload");
                return request.error(400, "Invalid Payload.");
            }

            //  Step 2 - Check if User already exist in DB based on empId.
            const isUserAlreadyPresent = await cds.run(SELECT.from(Employees).where({ empId: empId }));


            if (isUserAlreadyPresent.length != 0) {
                LOGGER.error("User already exist in DB");
                return request.error(409, ${markup1});
            }

            //  Step 3 - Create an object of Employee with details which will be used to add new Employee on Schema.
            const newEmployee = {
                empId, name, location, login
            };

            //  Step 4 - Adding the Employee into Employee Table on DB.
            const addEmployee = await cds.run(INSERT.into(Employees).entries(newEmployee));
            
            if (addEmployee.error) {
                LOGGER.error(addEmployee.error);
                return request.error(500, ${markup2})
            }

            //  Step 5 - Return the required response.
            LOGGER.info("Successfully created the User");
            return (201, ${markup3});
        }
        catch (error) {
            LOGGER.error(error);
            request.error(500, ${markup4});
        }

    });




    /*
       Update existing User detains on DB - 
        ---------------------------------------------

        Payload - 
        {
            "empId" : <value>,
            "name" : <value>,
            "location" : <value>
        }

        STEPS - 
        Step 1 - Extract the empId, name, location, login from the request payload and check if not null.
        Step 2 - Check if User already exist in DB based on empId.
        Step 3 - Create an object of Employee with details which will be used to add new Employee on Schema.
        Step 4 - Update the Employee into Employee Table on DB.
        Step 5 - Return the required response.

    */

    srv.on("updateUser", async (request, response) => {
        try {

            //  Step 1 - Extract the empId, name, location, login from the request payload and check if not null.
            const { empId, name, location } = request.data;

            if(!empId || !name || !location){
                LOGGER.error("Invalid Payload");
                return request.error(400, "Invalid Payload");
            }
                
            //  Step 2 - Check if User already exist in DB based on empId.
            const userDetails = await cds.run(SELECT.from(Employees).where({ empId: empId }));
                
            if (userDetails.length === 0) {
                LOGGER.error("User doesnot exist in DB");
                return request.error(404, "User does not exist.");
            }

            //  Step 3 - Create an object of Employee with details which will be used to add new Employee on Schema.
            let updateEmployee = {
                empId: empId,
                name: name,
                location: location
            }

            if (name == undefined && location == undefined) {
                LOGGER.error("Invalid Payload - neither name nor location is provided");
                return request.error(400, 'Invalid Request, No input is provided to be updated.')
            }

            if (name == undefined) {
                updateEmployee.name = userDetails[0].name;
            }

            if (location == undefined) {
                updateEmployee.location = userDetails[0].location;
            }

            //  Step 4 - Update the Employee into Employee Table on DB.
            let updateDB = await cds.run(UPDATE(Employees).set({ name: updateEmployee.name, location: updateEmployee.location }).where({ empId: empId }));

            if (updateDB) {
                LOGGER.info("Updated the User details on DB");
                return (202, 'Employee Details are updated Successfully.')
            }

            //  Step 5 - Return the required response.
            LOGGER.error("Failed to Update User Details.");
            return request.error(500, 'Something went wrong.')

        }
        catch (error) {
            return request.error(500, ${markup4});
        }
    });



    /*
       Delete existing User detains on DB - 
        ---------------------------------------------

        Payload - 
        {
            "empId" : <value>,
            "name" : <value>,
            "location" : <value>
        }

        STEPS - 
        Step 1 - Extract the empId from the request payload and check if not null.
        Step 2 - Check if User already exist in DB based on empId.
        Step 3 - Delete the Employee into Employee Table on DB.
        Step 4 - Return the required response.

    */
    srv.on("deleteUser", async (request, response) => {
        try {
            //  Step 1 - Extract the empId from the request payload and check if not null.
            const { empId } = request.data;

            if(!empId){
                LOGGER.error("Invalid Payload");
                return request.error(400, "Invalid Payload");
            }

            //  Step 2 - Check if User already exist in DB based on empId.
            const isUserExist = await cds.run(SELECT.from(Employees).where({ empId: empId }));

            if (isUserExist == 0) {
                LOGGER.error("User doesnot exist in DB");
                return request.error(400, 'User Does not Exist.');
            }

            //  Step 3 - Delete the Employee into Employee Table on DB.
            let deleteUser = await cds.run(DELETE.from(Employees).where({ empId: empId }));

            //  Step 4 - Return the required response.
            if (deleteUser) {
                LOGGER.info("Successfully Deleted the User");
                return (${markup5});
            }

            LOGGER.error("Failed to Delete");
            return request.error(500, ${markup4});
        }
        catch (error) {
            LOGGER.error(error);
            return request.error(500, ${markup4});
        }
    });


}

module.exports = customServices;
`} language="javascript" />


              <h2>Step 5 - Deploy the db Data on SqLite</h2>

              <p>For Local Testing, deploy the data into SqLite server using below command - </p>

              <CodeBlock code={`cds deploy --to sqlite:./db.sqlite`} language='javascript' />




              <h2>Step 6 - Run the app and Test it using HTTP File</h2>

              <p>In your app create <span className='highlight'>Test Folder</span> and create <span className='highlight'>test.http file</span>  inside it.</p>


              <CodeBlock code={`
### Get Details of all the Users
GET http://localhost:4004/odata/v4/custom-services/EmployeeDetails


### Get User Details based on empId
POST http://localhost:4004/odata/v4/custom-services/getUser

Content-Type : application/json
{
    "empId" : 113
}


### Add new User
POST http://localhost:4004/odata/v4/custom-services/addUser

Content-Type : application/json
{
    "empId" : 10012,
    "name" : "Test User",
    "location" : "Test Location",
    "login" : "1990-10-31"
}


### Update Existing user
POST http://localhost:4004/odata/v4/custom-services/updateUser

Content-Type : application/json
{
    "empId" : 10012,
    "name" : "Update Test User Name",
    "location" : "Test Location"
}



### Delete the User 
POST http://localhost:4004/odata/v4/custom-services/deleteUser

Content-Type : application/json
{
    "empId" : 10012
}
`} language='javascript' />

                <p>Now run your app using <span className='highlight'>cds watch</span> and test these APIs on test.http file.</p>


                





                
                <p>And it is done, You can deploy your app and use it. !!!</p>


            </div>

        </main>
    );
}

export default page;