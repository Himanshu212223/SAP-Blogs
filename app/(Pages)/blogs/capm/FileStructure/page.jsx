import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
  const code1 = 
`learning (application name)
|
|- app (Folder)
|- db (Folder)
|- node_modules (Folder)
|- srv (Folder)
|- eslint.config.mjs
|- mta.yaml
|- package-lock.json
|- package.json
|- xs-security.json`;

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">CAP App File Structure</h1>

        <p>Cloud Application Programming Model (CAP) is a framework by SAP to build cloud-ready business applications.</p>
        
        <p>CAP helps developers create backend services, databases, OData APIs, full-stack enterprise applications, etc, very quickly with less code.</p>
        
        <div>
            <CodeSnippet code={code1} language="md" title="CAP App file structure" />
        </div>



        <h3 className="text-3xl">1. app Folder</h3>

        <ul className="list-disc ml-6">
            <li>The app folder in an SAP CAP application is used to store the <span className="text-gray-950 font-semibold">frontend/UI</span> applications that consume CAP backend services.</li>
            <li>You can define a separate UI instead of defining both CAP and UI app together.</li>
        </ul>



        <h3 className="text-3xl">2. db Folder</h3>

        <ul className="list-disc ml-6">
            <li>The db folder in an SAP CAP application is used to define and manage the <span className="text-gray-950 font-semibold">database layer</span> of the application.</li>
            <li>It mainly contains <span className="text-gray-950 font-semibold">database entities, tables, relationships, views, reusable data models</span>, etc using CDS (Core Data Services) files.</li>
        </ul>

        
        
        <h3 className="text-3xl">3. node_modules folder</h3>
        
        <ul className="list-disc ml-6">
            <li>It is a core part of Application (which uses npm Node Package Module) as this file store all the project dependencies.</li>
            <li>You can delete this folder and when you execute the command <span className="text-gray-950 font-semibold">npm install</span> then npm automatically create this folder and install the dependencies.</li>
            <li>Which dependencies needs to be installed is defined on <span className="text-gray-950 font-semibold">package.json</span> file so npm uses the details from <span className="text-gray-950 font-semibold">package.json</span> and install the dependencies on <span className="text-gray-950 font-semibold">node_module</span> folder.</li>
        </ul>


        <h3 className="text-3xl">4. srv Folder</h3>

        <ul className="list-disc ml-6">
            <li>The srv folder in an SAP CAP application is used to create the <span className="text-gray-950 font-semibold">service layer</span> of the application.</li>
            <li>It is responsible for <span className="text-gray-950 font-semibold">exposing APIs, defining services, handling business logic</span> and <span className="text-gray-950 font-semibold">processing requests</span>.</li>
        </ul>
        
        <h3 className="text-3xl">5. eslint.config.mjs</h3>

        <ul className="list-disc ml-6">
            <li>eslint.config.mjs is the configuration file for ESLint using the new Flat Config format and ES Module syntax. ESLint is a tool that finds coding mistakes, enforces coding standards, improves code consistency.</li>
            <li>It is used to define linting rules, coding standards, parser settings, plugins, file matching rules for JavaScript/TypeScript projects.</li>
        </ul>
        
        
        <h3 className="text-3xl">6. mta.yaml</h3>

        <ul className="list-disc ml-6">
            <li>It is the configuration file used to define a Multi-Target Application (MTA) in SAP BTP which <span className="text-gray-950 font-semibold">describes- application modules, services, dependencies, deployment configuration</span> for the entire project.</li>
            <li>It tells SAP BTP about the <span className="text-gray-950 font-semibold">services used by the CAP application</span> and defines how the complete application should be built and deployed.</li>
            <li>It is also used to generate deployment Multi-Target Application Archive file (MTAR).</li>
        </ul>
        
        <h3 className="text-3xl">7. package-lock.json</h3>

        <ul className="list-disc ml-6">
            <li>This file gets automatically generate by npm and it locks the <span className="text-gray-950 font-semibold">exact version</span> of all the dependencies (and sub-dependencies).</li>
            <li>It does this so that everyone using this project gets the same version of dependencies to avoid work on particular machine issue.</li>
            <li>Deleting this fill wouldn't affect the working of application but create some issues as npm will regenerate this file but the exact version of the dependencies will not be installed and can lead to inconsistent behavior between environments.</li>
        </ul>



        <h3 className="text-3xl">8. package.json</h3>

        <ul className="list-disc ml-6">
            <li>It is the main configuration file for a NodeJS project.</li>
            <li>It contains details like project metadata (which includes name, description, version), Dependencies and Script commands.</li>
            <li>It contains a <span className="text-gray-950 font-semibold">rough version detials</span> of the dependencies.</li>
            <li>The project <span className="text-gray-950 font-semibold">will not work</span> if you delete this file because it have the details of which dependencies you app needs and which script needs to run.</li>
        </ul>

        <table className="border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300">Feature</th>
                    <th className="border border-gray-300">package.json</th>
                    <th className="border border-gray-300">package-lock.json</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3">Purpose</td>
                    <td className="border border-gray-300 px-3">Declares dependencies & scripts</td>
                    <td className="border border-gray-300 px-3">Locks exact versions for consistency</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Created by</td>
                    <td className="border border-gray-300 px-3">Developer manually or Auto Generated</td>
                    <td className="border border-gray-300 px-3">Auto-generated by npm</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Editable?</td>
                    <td className="border border-gray-300 px-3">Yes</td>
                    <td className="border border-gray-300 px-3">No (should not edit manually)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Used for</td>
                    <td className="border border-gray-300 px-3">Project setup & sharing</td>
                    <td className="border border-gray-300 px-3">Reproducible builds</td>
                </tr>
            </tbody>
        </table>


        <h3 className="text-3xl">9. xs-security.json</h3>

        <ul className="list-disc ml-6">
            <li>It is used to define Role templates for assigning permission to users.</li>
        </ul>
        




        <h2 className="text-4xl">What happens when you run the app locally ..?</h2>

        <h3 className="text-3xl">1. CAP reads configuration</h3>

        <ul className="list-disc ml-6">
            <li>reads package.json & .cdsrc.json (if any) which tells CAP where models are and which features to enable.</li>
            <li>reads .env/default-env.json (if present) for environment variables for local run.</li>
        </ul>
        
        <h3 className="text-3xl">2. CAP compiles your CDS model</h3>

        <p>It loads and merges all .cds files:</p>

        <ul className="list-disc ml-6">
            <li>db/schema.cds for data model (entities, types).</li>
            <li>srv/cat-service.cds for service definitions (which the app expose via OData/REST).</li>
        </ul>

        <h3 className="text-3xl">3. Database is prepared</h3>

        <ul className="list-disc ml-6">
            <li>For local dev, CAP typically uses SQLite.</li>
            <li>It creates tables from db/schema.cds.</li>
            <li>It auto-loads initial data from db/data/entity - csv file (as csv file name matches the entity), so your entity table gets records.</li>
        </ul>

        <h3 className="text-3xl">4. HTTP server starts (Express)</h3>

        <ul className="list-disc ml-6">
            <li>CAP boots an Express server.</li>
            <li>It mounts your service endpoints from srv service cds file.</li>
            <li>If you had srv/server.js, CAP would call it to let you add custom Express middleware or routes.</li>
        </ul>


        <h3 className="text-3xl">5. Custom logic is wired</h3>

        <ul className="list-disc ml-6">
            <li>CAP auto-loads srv service js file.</li>
            <li>All the handlers like before/on/after defined in the service file get registered.</li>
        </ul>


        <p><span className="text-gray-950 font-semibold">Build time:</span> CDS → HANA artifacts + service metadata (via cds build, mbt build).</p>
        <p><span className="text-gray-950 font-semibold">Deploy time:</span> CF creates DB (HDI), auth (XSUAA), starts srv & approuter.</p>
        <p><span className="text-gray-950 font-semibold">Runtime:</span> Request passes Approuter → XSUAA → srv. CAP checks auth, runs your handlers in srv/cat-service.js, uses HANA for data, returns response.</p>




        
    </div>
  );
};

export default page;
