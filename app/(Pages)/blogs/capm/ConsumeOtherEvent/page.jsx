import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import Link from "next/link";
import React from "react";

const page = () => {
const code1 = "${namespace}" ;
const code2 = 
`{
    "emname": "pocem",
    "namespace": "companyName/subaccountName/pocem",
     "version": "1.1.0",
    "resources": {
        "units": "10"
    },
    "options": {
        "management": true,
        "messagingrest": true,
        "messaging": true
    },
    "rules": {
        "topicRules": {
            "publishFilter": [
                "${code1}/*"
            ],
            "subscribeFilter": [
                "${code1}/*"
            ]
        },
        "queueRules": {
            "publishFilter": [
                "${code1}/*"
            ],
            "subscribeFilter": [
                "${code1}/*"
            ]
        }
    },
    "xs-security": {
        "oauth2-configuration": {
            "credential-types": []
        }
    },
    "authorities" : [
        "$ACCEPT_GRANTED_AUTHORITIES"
    ]
}`;
const code3 = `- name: pocem` ;
const code4 = 
`- name: pocem
    type: org.cloudfoundry.managed-service
    parameters:
      service: enterprise-messaging
      service-plan: default
      service-name: pocem`;
const code4b = 
`processed-after:
      - pocem`;
const code5a = "${default-url}" ;
const code5b = "${protocol}" ;
const code5c = "${default-uri}" ;
const code5d = "${org}-${space}" ;
const code6 = 
`_schema-version: 3.3.0
ID: poc13app
version: 1.0.0
description: "A simple CAP project."
parameters:
  enable-parallel-deployments: true
build-parameters:
  before-all:
    - builder: custom
      commands:
        - npm ci
        - npx cds build --production
modules:
  - name: poc13app-srv
    type: nodejs
    path: gen/srv
    parameters:
      instances: 1
      buildpack: nodejs_buildpack
    build-parameters:
      builder: npm-ci
    provides:
      - name: srv-api # required by consumers of CAP services (e.g. approuter)
        properties:
          srv-url: ${code5a}
    requires:
      - name: poc13app-auth
      - name: poc13app-db
      - name: pocem
  - name: poc13app-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: poc13app-db
  - name: poc13app
    type: approuter.nodejs
    path: app/router
    parameters:
      keep-existing-routes: true
      disk-quota: 256M
      memory: 256M
    requires:
      - name: srv-api
        group: destinations
        properties:
          name: srv-api 
          url: ~{srv-url}
          forwardAuthToken: true
      - name: poc13app-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${code5b}
          app-uri: ${code5c}
resources:
  - name: poc13app-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: poc13app-${code5d}
        tenant-mode: dedicated
        oauth2-configuration:
          redirect-uris:
            - https://*~{app-api/app-uri}/**
    requires:
      - name: app-api
    processed-after:
      - pocem
  - name: poc13app-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
  - name: pocem
    type: org.cloudfoundry.managed-service
    parameters:
      service: enterprise-messaging
      service-plan: default
      service-name: pocem` ;
const code7 = 
`"cds": {
  "requires": {
    "messaging": {
      "kind": "enterprise-messaging",
      "queue": {
        "name" : "$namespace/pocqueue"
      }
    }
  }
}`;
const code8 = 
`{
  "scopes": [
    {
      "name": "$XSAPPNAME.emcallback",
      "description": "Enterprise-Messaging Callback Access",
      "grant-as-authority-to-apps": [
        "$XSSERVICENAME(pocem)"
      ]
    },
    {
      "name": "$XSAPPNAME.emmanagement",
      "description": "Enterprise-Messaging Management Access"
    }
  ],
  "attributes": [],
  "role-templates": [],
  "authorities": [
    "$XSAPPNAME.emmanagement",
    "$XSAPPNAME.mtcallback"
  ]
}`;
const code21 = 
`{
    "emname": "poc7acc-em",
    "namespace": "companyName/subaccountName/poc7acc-em",
     "version": "1.1.0",
    "resources": {
        "units": "10"
    },
    "options": {
        "management": true,
        "messagingrest": true,
        "messaging": true
    },
    "rules": {
        "topicRules": {
            "publishFilter": [
                "${code1}/*"
            ],
            "subscribeFilter": [
                "${code1}/*"
            ]
        },
        "queueRules": {
            "publishFilter": [
                "${code1}/*"
            ],
            "subscribeFilter": [
                "${code1}/*"
            ]
        }
    },
    "xs-security": {
        "oauth2-configuration": {
            "credential-types": []
        }
    },
    "authorities" : [
        "$ACCEPT_GRANTED_AUTHORITIES"
    ]
}`;
const code22 = 
`"cds": {
    "requires": {
      "messaging": {
        "kind": "enterprise-messaging-shared",
        "publishPrefix": "$namespace/",
        "subscribePrefix": "$namespace/",
        "format": "cloudevents",
        "vcap": {
          "label": "user-provided",
          "name": "emis-consume-messaging-ups"
        },
        "queue": {
          "name": "$namespace/testing"
        }
      }
    }
}`;
const code23 = `cds add mta --for production` ;
const code24 = `- name: pocConsumerEM`;
const code25 = 
`- name: pocConsumerEM
    type: org.cloudfoundry.user-provided-service
    parameters:
      service: User-Provided
      service-name: emis-consume-messaging-ups
      path: ./em-configuration.json`;
const code26 = 
`import cds from '@sap/cds';

const CustomService = async (srv) => {
  
    const messaging = await cds.connect.to('messaging');
    // Create queue - testing and topic - testing/Worked on step -1 
    await messaging.on('testing/Worked', (msg) => {
        console.log('Event Received: ', msg.data);
        // your custom logic comes here
    });

};

export default CustomService;`;


const code31 = 
`{
    "emname": "poc7acc-em",
    "namespace": "companyName/subaccountName/poc7acc-em",
     "version": "1.1.0",
    "resources": {
        "units": "10"
    },
    "options": {
        "management": true,
        "messagingrest": true,
        "messaging": true
    },
    "rules": {
        "topicRules": {
            "publishFilter": [
                "${code1}/*"
            ],
            "subscribeFilter": [
                "${code1}/*"
            ]
        },
        "queueRules": {
            "publishFilter": [
                "${code1}/*"
            ],
            "subscribeFilter": [
                "${code1}/*"
            ]
        }
    },
    "xs-security": {
        "oauth2-configuration": {
            "credential-types": []
        }
    },
    "authorities" : [
        "$ACCEPT_GRANTED_AUTHORITIES"
    ]
}`;






  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">Consume Event Mesh Message</h1>

        <p>We will attempt to consume event messages from an Event Mesh instance that has been created in a different space than the one where the CAP application is deployed.</p>

        <h2 className="text-4xl">How SAP Event Mesh Works (Consumption Flow)</h2>

        <p>SAP Event Mesh is a message broker based on pub/sub (publish–subscribe) pattern.</p>
        <ul className="list-disc ml-6">
            <li>Producer (Publisher) sends event/message to a Topic.</li>
            <li>Event Mesh Broker stores & routes message to subscribed queues.</li>
            <li>Queue (Subscriber endpoint) holds messages until consumed.</li>
            <li>Consumer (Your App) reads messages from the queue. Consumer doesnot consume directly from topic, it consume from a queue bound to that topic.</li>
        </ul>

        <h2 className="text-4xl">Different ways to Consume Event Messages -</h2>

        <Link href={"#method1"} className="text-sky-600"><h3 className="text-3xl">1. Consume Event Mesh with service binding</h3></Link>
        <ul className="list-disc ml-6">
            <li>Event Driven works on Push Mechanism where your app subscribes to a queue or topic.</li> <li>When an event occurs then Event Mesh pushes the message to your app and we donot need to ask to push the message repeatedly.</li>
            <li>It follows Asynchronous communication with Real-time or near real-time communication which avoid unncecssary calls and suitable for High scalable project.</li>
            <li>It uses AMQP (Advanced Message Queuing Protocol) which is standard messaging protocol used for sending messages between applications in a reliable and structured way.</li>
            <li>In this approach, we directly create a Service binding with Event Mesh Service Instance.</li>
        </ul>

        
        <Link href={"#method2"} className="text-sky-600"><h3 className="text-3xl">2. Consume Event using User-Provided Service</h3></Link>

        <ul className="list-disc ml-6">
            <li>It is similar to above but we uses a User Provided Service Instance of Event Mesh and bind the CAP Application to it to consume the Messages.</li>
        </ul>

        

        <Link href={"#method2"} className="text-sky-600"><h3 className="text-3xl">3. Polling</h3></Link>
        <ul className="list-disc ml-6">
        <li>Polling refers to the method where a consumer application actively and repeatedly requests or pulls messages from a queue, rather than waiting for the message to be pushed to it.</li>
        <li>When you poll, Event Mesh checks queue if message exists or not. If exist then it sends message and marks it as &quot;in-delivery&quot; and if Acknowledgement received after delivery then it removes the message from the queue. If no Acknowledgement received then message is marked as Un-Acknowledged and stays or redelivered.</li>
        <li>It repeatedly calls the API even when there is no data. It also doesnot provides real-time data as it depends on polling interval.</li>
        </ul>

        <br></br>
        <br></br>
        <br></br>

        <h3 id="method1" className="text-3xl">Method 1 - Consume Event Mesh with service binding</h3>

        <p>This approach works well <span className="text-gray-950 font-semibold">when both the Event Mesh instance and the CAP application are deployed within the same Cloud Foundry space</span>.</p>

        <p>We will be following below steps - </p>

        <ul className="list-decimal ml-6">
            <li>Create Event Mesh Instance</li>
            <li>Create Event Mesh Service Binding with CAP App</li>
            <li>Define configuration on package.json</li>
            <li>Check xs-security.json configuration</li>
        </ul>





        <h4 className="text-2xl">Step 1 - Create Event Mesh Instance</h4>

        <p>Create the Event Mesh Service Instance on the space on your SAP BTP Subaccount.</p>
        <p>In our case, we are creating an Event Mesh Service Instance with below details - </p>

        <ul className="list-disc ml-6">
            <li>Event Mesh Instance Name - pocem</li>
            <li>Service Key - key</li>
            <li>emname - pocem</li>
            <li>namespace - companyName/subaccountName/pocem</li>
        </ul>

        

        <p>You can define the similar based on your requirement.</p>

        <p>I have used below json parameters while creating the Event Mesh Service Instance on BTP Cockpit Subaccount.</p>
        
        <div>
            <CodeSnippet code={code2} language="json" title="Parameters" />
        </div>

        <p>Once the Event Mesh Service Instance has been created, create Queue on the Event Mesh and subscribe to the topic.</p>

        <p>In our case, we have created below queue and subscribed to topic - </p>
        <ul className="list-disc ml-6">
            <li>Queue - companyName/subaccountName/pocem/pocqueue</li>
            <li>Subscribed topic - companyName/subaccountName/pocem/cap/hello/created</li>
        </ul>



        <h4 className="text-2xl">Step 2 - Create Event Mesh Service Binding with CAP App</h4>

        <p>In SAP CAP, consuming a service typically requires a service binding. Therefore, we create a binding between the Event Mesh service instance and the CAP application.</p>

        <p>To create the same, we will define the event mesh instance in mta.yaml file as below - </p>

        <p>Under modules requires section, mention the event mesh instance name. In our case the event mesh instance name is pocem, we will mention the same as - </p>

        <div>
            <CodeSnippet code={code3} language="yaml" title="mta.yaml" />
        </div>

        <p>We will then define the same service under resources like below - </p>

        <div>
            <CodeSnippet code={code4} language="yaml" title="mta.yaml" />
        </div>

        <p>also define the process after property auth resource in mta.yaml like -  </p>
        <div>
            <CodeSnippet code={code4b} language="yaml" title="mta.yaml" />
        </div>


        <p>mta.yaml file will look something like below - </p>
        <div>
            <CodeSnippet code={code6} language="yaml" title="mta.yaml" />
        </div>



        <h4 className="text-2xl">Step 3 - Define configuration on package.json</h4>

        <p>Define the Event Mesh configuration under the cds section in the package.json file as shown below:</p>

        <p>In our case, the queue name is - pocqueue</p>

        <div>
            <CodeSnippet code={code7} language="json" title="package.json" />
        </div>


        <h4 className="text-2xl">Step 4 - Check xs-security.json configuration</h4>

        <div>
            <CodeSnippet code={code8} language="json" title="package.json" />
        </div>

        <h4 className="text-2xl">Step 5 - Define Service logic to consume Event Message</h4>

        <p>Now, consume the messages in your <span className="text-gray-950 font-semibold">custom service.js file</span> as shown below -</p>

        <div>
            <CodeSnippet code={code26} language="javascript" title="service.js" />
        </div>

        <p>!!! Done !!!</p>


        <br></br>
        <br></br>
        <br></br>



        <h3 id="method2" className="text-3xl">Method 2 - Consume Event using User-Provided Service</h3>

        <p>This approach works well <span className="text-gray-950 font-semibold">when both the Event Mesh instance and the CAP application are deployed either on same or on different cloud foundry space</span>.</p>

        <p>We will be following below steps - </p>

        <ul className="list-decimal ml-6">
            <li>Create Event Mesh Instance</li>
            <li>Define Service Binding in mta.yaml file</li>
            <li>Define messaging service configuration on package.json</li>
            <li>Maintain Event Mesh Service Key</li>
            <li>Define Service logic to consume Event Message</li>
        </ul>

        <h4 className="text-2xl">Step 1 - Create Event Mesh Instance</h4>

        <p><span className="text-gray-950 font-semibold">Create the Event Mesh Service Instance and service key</span> on your SAP BTP Subaccount.</p>
        <p>In our case, we are creating an Event Mesh Service Instance with below details - </p>

        <ul className="list-disc ml-6">
            <li>Event Mesh Instance Name - poc7accEM</li>
            <li>Service Key - key</li>
            <li>emname - poc7acc-em</li>
            <li>namespace - companyName/subaccountName/poc7acc-em</li>
        </ul>

        <p>You can define the similar based on your requirement.</p>

        <p>I have used below json parameters while creating the Event Mesh Service Instance on BTP Cockpit Subaccount.</p>
        
        <div>
            <CodeSnippet code={code21} language="json" title="poc7accEM Instance Parameters" />
        </div>

        <p>Once the Event Mesh Service Instance has been created, create Queue on the Event Mesh and subscribe to the topic.</p>

        <p>In our case, we have created below queue and subscribed to topic - </p>
        <ul className="list-disc ml-6">
            <li>Queue - companyName/subaccountName/pocem/testing</li>
            <li>Subscribed topic - companyName/subaccountName/pocem/testing/Worked</li>
        </ul>


        <h4 className="text-2xl">Step 2 - Define Service Binding in mta.yaml file</h4>

        <p>If mta.yaml file is not present, use the below command to create it.</p>

        <div>
            <CodeSnippet code={code23} language="md" title="command" />
        </div>

        <p><span className="text-gray-950 font-semibold">Define User-Provided Service binding under modules requires section in mta.yaml file</span> like below - </p>

        <div>
            <CodeSnippet code={code24} language="yaml" title="mta.yaml" />
        </div>

        <p>In our case -</p>
        <ul className="list-disc ml-6">
            <li>service binding name - pocConsumerEM</li>
        </ul>

        <p>Define same User-Provided Service binding details <span className="text-gray-950 font-semibold">under resources section in mta.yaml file</span> like below - </p>

        <div>
            <CodeSnippet code={code25} language="yaml" title="mta.yaml" />
        </div>

        <p>where -</p>
        <ul className="list-disc ml-6">
            <li>service binding name - pocConsumerEM</li>
            <li>service name - User-Provided</li>
            <li>service instance name - emis-consume-messaging-ups (same defined in package.json vcap section)</li>
            <li>path - a local json file created at the project level.</li>
        </ul>


        <h4 className="text-2xl">Step 3 - Define messaging service configuration on package.json</h4>

        <p>Define the messaging configuration under the <span className="text-gray-950 font-semibold">cds section in the package.json file</span> like below -</p>
        
        <p>Here, the VCAP name refers to the User-Provided Service instance name, which we defined in mta.yaml file.</p>
        <div>
            <CodeSnippet code={code22} language="json" title="package.json" />
        </div>



        <h4 className="text-2xl">Step 4 - Maintain Event Mesh Service Key</h4>

        <p>Create an em-configuration.json file at the project root level, copy the Event Mesh service key details (from Step 1) and paste it into this file.</p>


        <h4 className="text-2xl">Step 5 - Define Service logic to consume Event Message</h4>

        <p>Now, consume the messages in your <span className="text-gray-950 font-semibold">custom service.js file</span> as shown below -</p>

        <div>
            <CodeSnippet code={code26} language="javascript" title="service.js" />
        </div>

        <p>!!! Done !!!</p>



        <br></br>
        <br></br>
        <br></br>


        <h3 id="method3" className="text-3xl">Method 3 - Consume Event using Polling</h3>

        <p>This approach is useful when messages are consumed manually through action calls.</p>
        <p> However, it is not recommended, as it continuously invokes the API even when no data is available. Additionally, it does not provide real-time data, since it relies on a polling interval.</p>
        <p>In this approach, we will use Event Mesh API through Destination to consume Event Message.</p>

        <p>We will be following below steps - </p>

        <ul className="list-decimal ml-6">
            <li>Create Event Mesh Instance</li>
            <li>Create Event Mesh Destination on BTP Subaccount</li>
            <li>Define Destination Service Binding in mta.yaml file</li>
            <li>Define Message Consumer and Acknowledgement functionality</li>
            <li>Define Service logic to consume Event Message</li>
        </ul>

        <h4 className="text-2xl">Step 1 - Create Event Mesh Instance</h4>

        <p><span className="text-gray-950 font-semibold">Create the Event Mesh Service Instance and service key</span> on your SAP BTP Subaccount.</p>
        <p>In our case, we are creating an Event Mesh Service Instance with below details - </p>

        <ul className="list-disc ml-6">
            <li>Event Mesh Instance Name - poc7accEM</li>
            <li>Service Key - key</li>
            <li>emname - poc7acc-em</li>
            <li>namespace - companyName/subaccountName/poc7acc-em</li>
        </ul>

        <p>You can define the similar based on your requirement.</p>
        
        <p>I have used below json parameters while creating the Event Mesh Service Instance on BTP Cockpit Subaccount.</p>

        <div>
            <CodeSnippet code={code31} language="json" title="poc7accEM Instance Parameters" />
        </div>


        <h4 className="text-2xl">Step 2 - Create Event Mesh Destination on BTP Subaccount</h4>

        <p>Use the service key details generated from the Event Mesh service instance (created on Step 1) to create the destination.</p>

        <table className="border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300">Parameter</th>
                    <th className="border border-gray-300">Values</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3">Name</td>
                    <td className="border border-gray-300 px-3">Any Name (In our case its poc7accEMDestination)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">Type</td>
                    <td className="border border-gray-300 px-3">HTTP</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3">URL</td>
                    <td className="border border-gray-300 px-3">uri from oa2 section of event mesh service binding (append /messagingrest/v1/queues)</td>
                    <td className="border border-gray-300 px-3">URL</td>
                    <td className="border border-gray-300 px-3">uri from oa2 section of event mesh service binding (append /messagingrest/v1/queues)</td>
                </tr>
            </tbody>
        </table>
        








        <span className="text-gray-950 font-semibold">Bold Content</span>

        
        
        
    </div>
  );
};

export default page;
