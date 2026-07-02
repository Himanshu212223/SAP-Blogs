import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

//  ############################## CODE #####################################
const code1 = `cds init employee-management-cap`;

const code2 = 
`cd employee-management-cap
npm install`;

const code3 = 
`namespace employee.management.cap.db.schema;

using {cuid} from '@sap/cds/common';

entity Employees {
    key employeeId  : String(20);
        firstName   : String(100);
        lastName    : String(100);
        email       : String(100);
        designation : String(100);
        managerID   : String(20);
        projects     : Association to many Projects on projects.employee = $self;
        leaves       : Composition of many Leaves on leaves.employee = $self;
}


entity Projects : cuid {
    projectName : String(100);
    employee    : Association to Employees;
}

//  Defining an ENUM as employee leave status can only be Pending, Approved or Rejected.
type LeaveStatus : String enum {
    PENDING;
    APPROVED;
    REJECTED;
}

entity Leaves : cuid {
    fromDate : String;
    toDate   : String;
    reason   : String;
    status   : LeaveStatus;
    employee : Association to Employees;
}
`;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Employee Management Application</h1>

        <h2 className="text-4xl text-sky-500 wrap-break-word">Context -</h2>


        <h3 className="text-3xl wrap-break-word">CAP application with below details -</h3>

        <p className="text-1xl wrap-break-word">Create an <span className="text-gray-950 font-semibold wrap-break-word">Employee entity</span> containing the following fields:</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Employee ID</li>
            <li className="wrap-break-word">First Name</li>
            <li className="wrap-break-word">Last Name</li>
            <li className="wrap-break-word">Email</li>
            <li className="wrap-break-word">Designation</li>
            <li className="wrap-break-word">Manager ID</li>
        </ul>



        <p className="text-1xl wrap-break-word">Create an <span className="text-gray-950 font-semibold wrap-break-word">Project entity</span> containing the following fields:</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Project ID</li>
            <li className="wrap-break-word">Project Name</li>
        </ul>

        <p className="text-1xl wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">Note :-</span></p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">One Employee can be associated with multiple projects.</li>
            <li className="wrap-break-word">Employee IDs should be generated in the format EMPYYYYNNN, where EMP is a fixed prefix, YYYY denotes the employee's year of joining, and NNN is an auto-incrementing sequence number. Example: EMP2026254</li>
            <li className="wrap-break-word">Whenever a new employee is onboarded, the Employee ID should be automatically assigned as the next sequential number based on the last existing employee record.</li>
            <li className="wrap-break-word">Each employee can access only their details.</li>
            <li className="wrap-break-word">Only Manager can add or remove any employee detail.</li>
        </ul>
        




        <h3 className="text-3xl wrap-break-word">Integrate the SAPUI5 Application with the CAP Service -</h3>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Display all employee records in a SAPUI5 Table (sap.m.Table) when the application loads.</li>    
            <li className="wrap-break-word">Implement a FilterBar on the initial page to enable employee search and filtering.</li>
            <li className="wrap-break-word">Upon selecting an employee, navigate to a Detail Page that displays:</li>
            <ul className="list-disc ml-6">
                <li className="wrap-break-word">Complete employee information</li>
                <li className="wrap-break-word">All projects assigned to the selected employee</li>
            </ul>
            <li className="wrap-break-word">Design the Detail Page using an Object Page Layout.</li>
            <li className="wrap-break-word">Provide functionality to create new employee records from the UI.</li>
        </ul>






        <h2 className="text-4xl text-pink-500 wrap-break-word">Steps -</h2>

        <h3 className="text-3xl wrap-break-word">Step 1 - Create cap application</h3>

        <p className="text-1xl wrap-break-word">Use the below command to create a cap application.</p>
        <p className="text-1xl wrap-break-word">In our case, app name is - employee-management-cap</p>

        <div>
            <CodeSnippet code={code1} language="javascript" title="terminal-command" />
        </div>

        <p className="text-1xl wrap-break-word">move into the project folder and install the dependencies -</p>

        <div>
            <CodeSnippet code={code2} language="javascript" title="terminal-command" />
        </div>




        <h3 className="text-3xl wrap-break-word">Step 2 - Create Required Entities</h3>

        <p className="text-1xl wrap-break-word">Create a schema.cds file inside the db folder to define the data model for the application.</p>
        <p className="text-1xl wrap-break-word">We will define three entities in schema.cds file:</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Employees - Stores employee details.</li>    
            <li className="wrap-break-word">Projects - Stores project details.</li>
            <li className="wrap-break-word">Leaves - Stores employee leave requests.</li>
        </ul>

        <div>
            <CodeSnippet code={code3} language="javascript" title="db/schema.cds" />
        </div>

        <p className="text-1xl wrap-break-word">The relationship between Employees and Projects is created using an Association because both entities can exist independently. Even if an employee is deleted, the project can still exist.</p>
        
        <p className="text-1xl wrap-break-word">The relationship between Employees and Leaves is created using a Composition because leave records belong to an employee. If an employee is deleted, all of that employee's leave records should also be deleted automatically. This is why Composition is the right choice for this relationship.</p>












        <h3 className="text-3xl wrap-break-word">Heading 3</h3>

        <h4 className="text-2xl wrap-break-word">Heading 3</h4>


        <span className="text-gray-950 font-semibold wrap-break-word">Bold Content</span>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">content list item 1</li>
            <li className="wrap-break-word">content list item 2</li>
            <li className="wrap-break-word">content list item 3</li>
            <li className="wrap-break-word">content list item 4</li>
        </ul>
        
        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">content list item 1</li>    
            <li className="wrap-break-word">content list item 2</li>
            <li className="wrap-break-word">content list item 3</li>
            <li className="wrap-break-word">content list item 4</li>
        </ul>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/1-manage-multi-language-using-i18n/README.md" />
        </div>

        <div>
            <CodeSnippet code={code1} language="xml" title="View1.view.xml" />
        </div>


        <table className="border-collapse border border-gray-400 wrap-break-word">
            <thead>
                <tr>
                    <th className="border border-gray-300 wrap-break-word">State</th>
                    <th className="border border-gray-300 wrap-break-word">City</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Indiana</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Indianapolis</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Ohio</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Columbus</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Michigan</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Detroit</td>
                </tr>
            </tbody>
        </table>
        
        

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>


        Filter, sort on table / List
        Routing Navigation
        Page, Pannel, Shell, App Controls
        Formatter, Dialog, Fragment, Nested View
        Custom Control
    </div>
  );
};

export default page;
