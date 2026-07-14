import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 =
`namespace cap.application.db.schema;


entity Warehouse {
    key ID      : UUID;
        name    : String;
        owner   : String;
        address : String;
}`; 

const code2 = 
`service EmployeeService {

    entity EmployeeSummary {
        key ID   : UUID;
            name : String;
            count: Integer;
    };

}`;

const code3 =
`entity Employees {
    key ID           : UUID;
        name         : String;
        email        : String;

        profile      : Composition of one EmployeeProfiles on profile.employee = $self;

}

entity EmployeeProfiles {
    key ID          : UUID;
        phoneNumber : String;
        address     : String;
        dateOfBirth : Date;

        employee    : Association to one Employees;
}`;

const code4 =
`using { cap.application.db.schema } from '../db/schema' ;

service EmployeeService @(path : 'employee') {
    
    entity Employees as projection on schema.Employees;

    entity EmployeeProfiles as projection on schema.EmployeeProfiles;

}`;

const code5 = 
`import cds from '@sap/cds';

//  connect to the database
const { Employees } = cds.entities('cap.application.db.schema');

//  service implementation
const EmployeeService = async (srv) => {

    srv.on('CREATE', 'Employees', async (request) => {
        try {
            const { name, email, profile } = request.data;

            //  validation check
            if (!name || !email || !profile) {
                return request.reject(400, 'Name, Email, and Profile are required fields');
            }

            const employeeID = cds.utils.uuid();

            const newEmployeeEntry = {
                ID: employeeID,
                name: name,
                email: email,
                profile: {
                    ID: cds.utils.uuid(),
                    phoneNumber: profile.phoneNumber,
                    address: profile.address,
                    dateOfBirth: profile.dateOfBirth,
                    employee_ID: employeeID
                }
            }

            const transaction = await cds.tx(request);

            const newEmployee = await transaction.run(INSERT.into(Employees).entries(newEmployeeEntry));

            if(!newEmployee) {
                return request.reject(500, 'Failed to create employee entry');
            }

            return { 
                status: 201, data: { message: 'Employee entry created successfully', employeeID: employeeID } };


        }
        catch (error) {
            console.error('Error creating employee entry:', error);
            return request.reject(500, 'Internal server error');
        }
    });

}

export default EmployeeService;`;

const code6 =
`### Create Employee
POST http://localhost:4004/odata/v4/employee/Employees
Content-Type: application/json

{
    "name": "Vikash Patel",
    "email": "vikash.patel@example.com",
    "profile": {
        "phoneNumber": "123-456-7890",
        "address": "123 Main St, City, State 12345",
        "dateOfBirth": "1990-01-01"
    }  
}`;

const code7 = 
`namespace cap.application.db.schema;

entity Employees {
    key ID           : UUID;
        name         : String;
        email        : String;

        organization : Association to one Organizations;
}


entity Organizations {
    key ID        : String;
        name      : String;
        location  : String;

        employees : Composition of many Employees on employees.organization = $self;
}`;


const code8 = 
`using { cap.application.db.schema } from '../db/schema' ;

service EmployeeService @(path : 'employee') {
    
    entity Employees as projection on schema.Employees;

    entity EmployeeProfiles as projection on schema.EmployeeProfiles;

}` ;


const code9 = 
`srv.on('CREATE', 'Employees', async (request) => {
    try {
        const { name, email, organization } = request.data;

        //  validation check
        if (!name || !email || !organization) {
            return request.reject(400, 'Name, Email, and Organization are required fields');
        }

        const employeeID = cds.utils.uuid();

        const newEmployeeEntry = {
            ID: employeeID,
            name: name,
            email: email,
            organization: {
                ID : organization.ID
            }
        }

        const transaction = await cds.tx(request);

        const newEmployee = await transaction.run(INSERT.into(Employees).entries(newEmployeeEntry));

        if(!newEmployee) {
            return request.reject(500, 'Failed to create employee entry');
        }

        return { 
            status: 201, data: { message: 'Employee entry created successfully', employeeID: employeeID } };


    }
    catch (error) {
        console.error('Error creating employee entry:', error);
        return request.reject(500, 'Internal server error');
    }
});` ;


const code10 = 
`### Create Employee
POST http://localhost:4004/odata/v4/employee/Employees
Content-Type: application/json

{
    "name": "Vikash Patel",
    "email": "vikash.patel@example.com",
    "organization": {
        "ID" : "ORG002"
    }  
}` ;

const code11 = 
`namespace cap.application.db.schema;

entity Students {
    key ID             : UUID;
        name           : String;
        email          : String;

        studentCourses : Composition of many StudentCourses on studentCourses.student = $self;
}

entity Courses {
    key ID             : UUID;
        name           : String;
        duration       : Integer;

        studentCourses : Composition of many StudentCourses on studentCourses.course = $self;
}

entity StudentCourses {
    key ID      : UUID;

        student : Association to one Students;
        course  : Association to one Courses;
}` ;


const code12 = 
`using {cap.application.db.schema} from '../db/schema' ;

service StudentService @(path : 'student') {
    entity Students as projection on schema.Students;
    entity Corses as projection on schema.Courses;

    entity StudentCourses as projection on schema.StudentCourses;
}`; 

const code13 = 
`import cds from '@sap/cds';

const { Students, StudentCourses } = cds.entities('cap.application.db.schema');

const StudentService = async (srv) => {

    srv.on('CREATE', 'Students', async (request) => {
        try {
            const { name, email, studentCourses } = request.data;

            if (!name || !email || !studentCourses || !Array.isArray(studentCourses)) {
                return request.reject(400, 'Invalid request data');
            }

            const transaction = await cds.transaction(request);

            const studentId = cds.utils.uuid();

            const newStudentEntry = {
                ID: studentId,
                name: name,
                email: email
            }

            const newStudent = await transaction.run(
                INSERT.into(Students).entries(newStudentEntry)
            );

            if (!newStudent || newStudent.length === 0) {
                return request.reject(500, 'Failed to create student entry');
            }

            const studentCoursesEntries = [] ;

            studentCourses.forEach(element => {
                const studCourseObj = {
                    ID : cds.utils.uuid(),
                    student_ID : studentId,
                    course_ID : element.course.ID
                }
                studentCoursesEntries.push(studCourseObj);
            });

            console.log(studentCoursesEntries);

            const newStudentCourses = await transaction.run(
                INSERT.into(StudentCourses).entries(studentCoursesEntries)
            );

            if (!newStudentCourses || newStudentCourses.length === 0) {
                return request.reject(500, 'Failed to create student courses entries');
            }

            return {
                studentID: studentId            
            }
        }
        catch (error) {
            console.error('Error creating student entry:', error);
            return request.reject(500, 'Internal server error');
        }
    });

}

export default StudentService;` ;


const code14 = 
`### Create Student
POST http://localhost:4004/odata/v4/student/Students
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "studentCourses": [
        {
            "course": {
                "ID": "950e8400-e29b-41d4-a716-446655440002"
            }
        },
        {
            "course": {
                "ID": "950e8400-e29b-41d4-a716-446655440004"
            }
        }
    ]
}` ;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Entity Relationship</h1>



        <h2 className="text-4xl wrap-break-word">Different ways to declare entity</h2>

        <h4 className="text-2xl wrap-break-word text-amber-600">1. In schema.cds file (Domain Model Entity or Persistent entity)</h4>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It is a Persistence entity - means data is stored to non-volatile storage (like SSDs, hard drives, or databases) so it survives system reboots and application closures.</li>
            <li className="wrap-break-word">It by default creates the DB Table.</li>
            <li className="wrap-break-word">It doesnot directly exposed as OData API.</li>
        </ul>

        <div>
            <CodeSnippet code={code1} language="javascript" title="db/schema.cds" />
        </div>





        <h4 className="text-2xl wrap-break-word text-amber-600">2. In service.cds file (Service Entity or Non-Projected Entity)</h4>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">It is a non-projected service entity because it is defined directly inside the service and is not a projection on a database entity.</li>
            <li className="wrap-break-word">It is non-persisted and handled with custom logic in service.js file.</li>
            <li className="wrap-break-word">It <span className="text-gray-950 font-semibold wrap-break-word">doesnot</span> create DB Table by default.</li>
            <li className="wrap-break-word">It is exposed as OData API.</li>
        </ul>

        <div>
            <CodeSnippet code={code2} language="javascript" title="srv/employee-service.cds" />
        </div>






        <h2 className="text-4xl wrap-break-word text-purple-600">Association</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">An Association is a relationship between two entities that allows one entity to reference another entity.</li>
            <li className="wrap-break-word">In an Association, the relationship between the entities is weak, meaning <span className="text-gray-950 font-semibold wrap-break-word">records in both entities can exist independently</span>.</li>
            <li className="wrap-break-word">It means the lifecycle of both entities is independent, and the <span className="text-gray-950 font-semibold wrap-break-word">child entity records remain even if the associated parent record is deleted</span>.</li>
        </ul>



        <h2 className="text-4xl wrap-break-word text-purple-600">Composition</h2>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">A Composition is a strong parent-child relationship between two entities where the child belongs to the parent and is part of the parent's lifecycle.</li>
            <li className="wrap-break-word">In Composition, the relationship between the entities is strong, meaning <span className="text-gray-950 font-semibold wrap-break-word">records in both entities cannot exist independently</span>.</li>
            <li className="wrap-break-word">It means the lifecycle of both entities is dependent, and the <span className="text-gray-950 font-semibold wrap-break-word">child entity records gets deleted if the associated parent record is deleted</span>.</li>
        </ul>



        <h4 className="text-2xl wrap-break-word text-amber-600">Deep Insertion</h4>

        <p className="text-1xl wrap-break-word">Deep insertion means creating a parent entity and its composed child entity/entities in a single request.</p>





        <h2 className="text-4xl wrap-break-word">Different type of relations in capm</h2>

        <h3 className="text-3xl wrap-break-word">One-to-One Relation</h3>
        
        <p className="text-1xl wrap-break-word">A one-to-one relationship is a relationship between two entities where one record in the first entity is associated with only one record in the second entity, and vice versa.</p>

        <p className="text-1xl wrap-break-word">We can define it in db schema as -</p>

        <div>
            <CodeSnippet code={code3} language="javascript" title="db/schema.cds" />
        </div>
        
        <p className="text-1xl wrap-break-word">Once entities are defined, we can project it in service file as -</p>

        <div>
            <CodeSnippet code={code4} language="javascript" title="srv/employee-service.cds" />
        </div>

        <p className="text-1xl wrap-break-word">And we can define the custom logic to perform deep insertion like-</p>

        <div>
            <CodeSnippet code={code5} language="javascript" title="srv/employee-service.js" />
        </div>

        <p className="text-1xl wrap-break-word">We can test the defined endpoint like-</p>

        <div>
            <CodeSnippet code={code6} language="javascript" title="test-api/employee-service.http" />
        </div>






        <h3 className="text-3xl wrap-break-word">One-to-Many or Many-to-One Relation</h3>
        
        <p className="text-1xl wrap-break-word">A One-to-Many or Many-to-One relationship in SAP CAP is a relationship where one record of one entity can be associated with multiple records of another entity, while each record in the second entity is associated with only one record in the first entity.</p>

        <p className="text-1xl wrap-break-word">For Example, many Employees will be part of One organization.</p>
        
        <p className="text-1xl wrap-break-word">We can define it in db schema as -</p>

        <div>
            <CodeSnippet code={code7} language="javascript" title="db/schema.cds" />
        </div>
        
        <p className="text-1xl wrap-break-word">Once entities are defined, we can project it in service file as -</p>

        <div>
            <CodeSnippet code={code8} language="javascript" title="srv/employee-service.cds" />
        </div>

        <p className="text-1xl wrap-break-word">And we can define the custom logic to perform deep insertion like-</p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="srv/employee-service.js" />
        </div>

        <p className="text-1xl wrap-break-word">We can test the defined endpoint like-</p>

        <div>
            <CodeSnippet code={code10} language="javascript" title="test-api/employee-service.http" />
        </div>








        <h3 className="text-3xl wrap-break-word">Many-to-Many Relation</h3>
        
        <p className="text-1xl wrap-break-word">A Many-to-Many relationship in SAP CAP is a relationship where multiple records of one entity can be associated with multiple records of another entity.</p>

        <p className="text-1xl wrap-break-word">SAP CAP does not provide direct support for many-to-many relationships between entities. Instead, such relationships are implemented using a third entity (also known as a junction or link entity).</p>
        
        <p className="text-1xl wrap-break-word">We can define it in db schema as -</p>

        <div>
            <CodeSnippet code={code11} language="javascript" title="db/schema.cds" />
        </div>
        
        <p className="text-1xl wrap-break-word">Once entities are defined, we can project it in service file as -</p>

        <div>
            <CodeSnippet code={code12} language="javascript" title="srv/employee-service.cds" />
        </div>

        <p className="text-1xl wrap-break-word">And we can define the custom logic to perform deep insertion like-</p>

        <div>
            <CodeSnippet code={code13} language="javascript" title="srv/employee-service.js" />
        </div>

        <p className="text-1xl wrap-break-word">We can test the defined endpoint like-</p>

        <div>
            <CodeSnippet code={code14} language="javascript" title="test-api/employee-service.http" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/tree/5-entity-relations" />
        </div>










        
        
        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>



    </div>
  );
};

export default page;