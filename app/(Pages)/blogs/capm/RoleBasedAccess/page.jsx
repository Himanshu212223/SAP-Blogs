import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

const code1 = 
`{
  "scopes": [
    {
      "name": "$XSAPPNAME.Admin",
      "description": "Admin access"
    },
    {
      "name": "$XSAPPNAME.Viewer",
      "description": "Viewer access"
    }
  ],
  "attributes": [],
  "role-templates": [
    {
      "name": "CAP-App-Admin",
      "description": "CAP-App Admin role",
      "scope-references": [
        "$XSAPPNAME.Admin"
      ]
    },
    {
      "name": "CAP-App-Viewer",
      "description": "CAP-App Viewer role",
      "scope-references": [
        "$XSAPPNAME.Viewer"
      ]
    }
  ]
}`;


const code2 = 
`service CustomService @(path: 'custom-service') {
    
    // @restrict: [{ grant: 'READ', to: ['Viewer'] },{ grant: '*', to: ['Admin'] }]
    @restrict: [{ grant: '*', to: ['CAP-App-Admin'] }]
    function getCustomData() returns String;
    
}`;


const code3 = 
`import cds from "@sap/cds";

const CustomService = async (srv) => {

    srv.on('getCustomData', async (request) => {
        try {

            // Custom authorization check if you don't want to use the @restrict annotation on cds file.
            if (!req.user.is('CAP-App-Admin')) {
                return req.reject(403, 'Not authorized');
            }

            const traceId = "Application is working fine" + request.id;

            return {
                status: 200,
                data: { message: traceId }
            }
        }
        catch (error) {
            console.error('Error retrieving destination:', error);
            return request.error({ code: 500, message: error.message });
        }
    });

}

export default CustomService;`;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Role Based access in CAP</h1>

        <p className="text-1xl wrap-break-word">In this example, we will define roles and restrict access to specific services based on those roles.</p>

        <p className="text-1xl wrap-break-word">We will be following below steps-</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Define roles in xs-security.json</li>    
            <li className="wrap-break-word">Protect your services with CDS annotations</li>
            <li className="wrap-break-word">Check roles manually in Custom handlers (optional)</li>
        </ul>





        <h3 className="text-3xl wrap-break-word">Step 1 - Define roles in xs-security.json</h3>
        
        <p className="text-1xl wrap-break-word">We wants to create 2 roles CAP-App-Admin and CAP-App-Viewer, so we can define the same in <span className="text-gray-950 font-semibold wrap-break-word">xs-security.json</span> file like-</p>

        <div>
            <CodeSnippet code={code1} language="json" title="xs-security.json" />
        </div>
        
        
        





        <h3 className="text-3xl wrap-break-word">Step 2 - Protect your services with CDS annotations</h3>
        
        <p className="text-1xl wrap-break-word">Now since we have defined the Roles, we can now restrict the services based on the roles using <span className="text-gray-950 font-semibold wrap-break-word">@restrict</span> in <span className="text-gray-950 font-semibold wrap-break-word">service cds</span> file like-</p>

        <div>
            <CodeSnippet code={code2} language="javascript" title="srv/custom-service.cds" />
        </div>






        <h3 className="text-3xl wrap-break-word">Step 3 - Check roles manually in Custom handlers (optional)</h3>
        
        <p className="text-1xl wrap-break-word">When you need custom checks (for example, dynamic rules or complex logic), skip annotations and check in your handler code in <span className="text-gray-950 font-semibold wrap-break-word">service js</span> file like-</p>

        <div>
            <CodeSnippet code={code3} language="javascript" title="srv/custom-service.js" />
        </div>
        




        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

    </div>
  );
};

export default page;