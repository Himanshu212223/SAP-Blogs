import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = `cds init <Project_Name>`;
const code2 = 
`cd <Project_Name>
npm install`;
const code3 = `cds add data` ;
const code4 = 
`"cds" : { "requires" : {
    "db" : {
        "kind" : "sqlite",
        "credentials: " : { "url" : "db/managementCAP.sqlite" }
        }
    }
} `;
const code5 = 
`cds deploy --to sqlite:./db.sqlite` ;
const code6 = `cds add hana,mta,xsuaa,approuter --for production` ;
const code7 = `npm update --package-lock-only` ;
const code8 = `mbt build -t gen --mtar mta.tar` ;
const code9 = `cf deploy gen/mta.tar` ;
const code10 = `cf undeploy <project-name> --delete-services --delete-service-keys` ;
const code11 = 
`"scripts" : {
    "start" : "cds-serve",
    "dev" : "cds-serve",
    "build" : "mbt build -t gen --mtar mta.tar",
    "deploy" : "cf deploy gen/mta.tar",
    "undeploy" : "cf undeploy <project-name> --delete-services --delete-service-keys"
}
`;



  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">CDS Commands</h1>

        <p>We will see most common commands which are used to create, build and deploy the cap app.</p>

        <h3 className="text-3xl">Creating a CAP App -</h3>
         <div>
            <CodeSnippet code={code1} language="md" title="Terminal" />
        </div>

        <p>Now, go inside the Folder, and install the dependencies -</p>
         <div>
            <CodeSnippet code={code2} language="md" title="Terminal" />
        </div>


        <h3 className="text-3xl">Generate csv file to store sample data for Schema in db -</h3>
         <div>
            <CodeSnippet code={code3} language="md" title="Terminal" />
        </div>


        <h3 className="text-3xl">Deploy the db data in SQLite server -</h3>
        <p>add the below line of code in package.json file below the script object</p>
         <div>
            <CodeSnippet code={code4} language="javascript" title="package.json" />
        </div>

        <p>Once added, Use the below line of command to deploy it -</p>
        <div>
            <CodeSnippet code={code5} language="md" title="Terminal" />
        </div>


        <h3 className="text-3xl">To add Hana, mta file, xsuaa and approuter file -</h3>
         <div>
            <CodeSnippet code={code6} language="md" title="Terminal" />
        </div>


        <h3 className="text-3xl">Command to update and lock the package lock file -</h3>
         <div>
            <CodeSnippet code={code7} language="md" title="Terminal" />
        </div>
        
        
        <h3 className="text-3xl">To Build and generate Build File -</h3>
         <div>
            <CodeSnippet code={code8} language="md" title="Terminal" />
        </div>
        
        
        <h3 className="text-3xl">To Deploy the Build File -</h3>
         <div>
            <CodeSnippet code={code9} language="md" title="Terminal" />
        </div>


        <h3 className="text-3xl">To Un-Deploy the Project -</h3>
         <div>
            <CodeSnippet code={code10} language="md" title="Terminal" />
        </div>


        <p>You can modify the scripts of your package.json and add all the required commands like below - </p>
         <div>
            <CodeSnippet code={code11} language="javascript" title="package.json" />
        </div>




    </div>
  );
};

export default page;
