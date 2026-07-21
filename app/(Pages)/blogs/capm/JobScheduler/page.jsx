import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = `- name: cap-application-job-scheduler`;

const code2 = 
`# Declare Job Scheduler Resources below
- name: cap-application-job-scheduler
  type: org.cloudfoundry.managed-service
  parameters:
    service: jobscheduler
    service-plan: standard
    service-name: cap-application-job-scheduler-instance  # <-- Job Schedular Instance name
    config:
      enable-job-scheduler: true
`;

const code3 = 
`{
  "scopes": [
    {
      "name": "$XSAPPNAME.JobScheduler",
      "description": "Job Scheduler Scope",
      "grant-as-authority-to-apps": [
        "$XSSERVICENAME(cap-application-job-scheduler-instance)"
      ]
    }
  ],
  "attributes": [],
  "role-templates": [
    {
      "name": "JobSchedulerRole",
      "description": "Role collection for Job Scheduler calls",
      "scope-references": [
        "$XSAPPNAME.JobScheduler"
      ]
    }
  ]
}`;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Job Scheduler with CAP Application </h1>

        <p className="text-1xl wrap-break-word">In this example, we will create a service binding with the Job Scheduler service and configure it to trigger an endpoint in the CAP application.</p>

        <p className="text-1xl wrap-break-word">To achieve this, we will follow these steps-</p>


        <ul className="list-decimal ml-6">   
            <li className="wrap-break-word">Create Service Binding on CAP application</li>
            <li className="wrap-break-word">Authorize Job Scheduler Service Instance</li>
        </ul>








        <h3 className="text-3xl wrap-break-word">Step 1 - Create Service Binding on CAP application</h3>

        <p className="text-1xl wrap-break-word">We can declare the Job Scheduler Service requirement under <span className="text-gray-950 font-semibold wrap-break-word">modules requires</span> section in <span className="text-gray-950 font-semibold wrap-break-word">mta.yaml</span> file like-</p>

        <div>
            <CodeSnippet code={code1} language="yaml" title="mta.yaml" />
        </div>

        <p className="text-1xl wrap-break-word">We can then define the <span className="text-gray-950 font-semibold wrap-break-word">Job Scheduler Service resource</span> details under <span className="text-gray-950 font-semibold wrap-break-word">resources</span> section like-</p>

        <div>
            <CodeSnippet code={code2} language="yaml" title="mta.yaml" />
        </div>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/9-job-scheduler-cap/mta.yaml" />
        </div>
        
        
        
        
        
        
        <h3 className="text-3xl wrap-break-word">Step 2 - Authorize Job Scheduler Service Instance</h3>

        <p className="text-1xl wrap-break-word">We can then define the authorization for the Job Scheduler in <span className="text-gray-950 font-semibold wrap-break-word">xs-security.json</span> file like-</p>

        <div>
            <CodeSnippet code={code3} language="json" title="xs-security.json" />
        </div>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-CAP-Application/blob/9-job-scheduler-cap/xs-security.json" />
        </div>


        
        
        
        
        

        <p className="text-1xl wrap-break-word">You can now configure the Job and Schedules on the Job Scheduler instance.</p>


        

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

    </div>
  );
};

export default page;