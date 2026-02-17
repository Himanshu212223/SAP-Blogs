"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    const markup1 = "`Error - ${error.message}`" ;
    const markup2 = "`Event published to roche/sandbox2023/pocem/cap/hello/created`" ;
    const markup3 = "${default-url}" ;
    const markup4 = "${protocol}" ;
    const markup5 = "${default-uri}" ;
    const markup6 = "${org}-${space}" ;

    return (
        <main className='main'>
            <h1>Create Event on SAP Event Mesh using CAP Application when Event Mesh instance is on different Space</h1>

            <div className='content'>

                <p>In this example, Our goal is to create events on SAP Event Mesh through CAP App using Event Mesh Destination.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create Instance of Event Mesh on any Cloud Foundry Space</ol>
                    <ol>2. Create Queue and Subscription on Event Mesh</ol>
                    <ol>3. Create Event Mesh Destination on Subaccount</ol>
                    <ol>4. Create CAP App</ol>
                    <ol>5. Add destination configuration on package.json file</ol>
                    <ol>6. Define services of the app on srvice.cds file</ol>
                    <ol>7. Define services custom logic on srvice.js file</ol>
                    <ol>8. Add Hana, mta file, xsuaa and approuter file</ol>
                    <ol>9. Check the Destination binding mta.yaml file</ol>
                </ul>

                <h2>Step 1 - Create Instance of Event Mesh on any Cloud Foundry Space</h2>

                <p>On SAP BTP Cockpit, go to the cloud foundry space on which you wants to create Event Mesh Instance.</p>

                <p>For our application, we are creating Event Mesh instance - <span className='highlight'>pocem</span></p>
                <p>We are using emname - <span className='highlight'>pocem</span> and similar for namespace - <span className='highlight'>pocem</span></p>

                <p>while creating the Event mesh instance, we have used below json -</p>

                <CodeBlock code={
`{
    "resources": {
        "units": "20"
    },
    "options": {
        "management": true,
        "messagingrest": true,
        "messaging": true
    },
    "rules": {
        "topicRules": {
            "publishFilter": [
                "${markup1}/*"
            ],
            "subscribeFilter": [
                "${markup1}/*"
            ]
        },
        "queueRules": {
            "publishFilter": [
                "${markup1}/*"
            ],
            "subscribeFilter": [
                "${markup1}/*"
            ]
        }
    },
    "version": "1.1.0",
    "emname": "pocem",
    "namespace": "companyName/subaccountName/pocem",
    "xs-security": {
        "oauth2-configuration": {
            "credential-types": []
        }
    }
}
`} language="javascript" />



                <h2>Step 2 - Create Queue and Subscription on Event Mesh</h2>

                <p>You can follow the similar way like we created for our application - </p>

                <CodeBlock code={
`Queue name -  companyName/subaccountName/pocem/pocqueue
Subscription Topic -  companyName/subaccountName/pocem/cap/topic`} language="javascript" />



                <h2>Step 3 - Create Event Mesh Destination on Subaccount</h2>
                
                <p>You can create <span className='highlight'>service key</span> on <span className='highlight'>event mesh instance</span> and use its credentials while creating the Destination.</p>

                <p>You can refer below details -</p>

                <p><span className='highlight'>Destination Name :- </span>Any Name (in our case, we are using - EVENT_MESH_DEST_POC13App)</p> 
                <p><span className='highlight'>Type :- </span>HTTP</p> 
                <p><span className='highlight'>URL :- </span>uri from event mesh instance service key + /messagingrest/v1/topics/ + topic name</p> 
                <p>remember - replace / with %2f on topic name </p>
                <p>since our topic was - companyName/subaccountName/pocem/cap/topic </p>
                <p>after replacing / with %2f - companyName%2fsubaccountName%2fpocem%2fcap%2ftopic </p>
                <CodeBlock code={
                  `similarly, url will become something like - https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com/messagingrest/v1/topics/companyName%2fsubaccountName%2fpocem%2fcap%2ftopic`} language="javascript" />
                  <p><span className='highlight'>Authtication :- </span>OAuth2ClientCredentials</p> 
                  <p><span className='highlight'>Proxy Type :- </span>Internet</p> 
                  <p><span className='highlight'>client Id :- </span>client id from uaa section of event mesh instance service key</p> 
                  <p><span className='highlight'>client secret :- </span>client secret from uaa section of event mesh instance service key</p> 
                  <p><span className='highlight'>token service url :- </span>url from uaa section of event mesh instance service key + /oauth/token</p> 



                <h2>Step 4 - Create CAP App</h2>

                <p>Follow below commands to create CAP app - </p>

                <CodeBlock code={
`cds init <project-Name>`} language="javascript" />
                <CodeBlock code={
`cd <project-Name>`} language="javascript" />
                <CodeBlock code={
`npm install
npm install @sap-cloud-sdk/resilience
npm install @sap-cloud-sdk/http-client`} language="javascript" />

                <p>These dependencies are needed to consume Destination on CAP App.</p>

                <p>In our case, the app name is poc13app</p>




                <h2>Step 5 - Add destination configuration on package.json file</h2>

                <p>In <span className='highlight'>package.json</span> file, add the below destination configuration after script or private key to connect connect with destination.</p>
                
                <CodeBlock code={
`"cds": {
  "requires": {
    "DestinaionCall": {
      "kind": "rest",
      "credentials": {
        "destination": "EVENT_MESH_DEST_POC13App"
      }
    }
  }
}`} language="javascript" />

                <p>In our case <span className='highlight'>package.json</span> file looks like below - </p>

                <CodeBlock code={
`{
  "name": "poc13app",
  "version": "1.0.0",
  "description": "A simple CAP project.",
  "dependencies": {
    "@cap-js/hana": "^2",
    "@sap/cds": "^9",
    "@sap/xssec": "^4",
    "express": "^4"
  },
  "devDependencies": {
    "@cap-js/sqlite": "^2",
    "@sap/cds-dk": "^9"
  },
  "scripts": {
    "start": "cds-serve"
  },
  "private": true,
  "cds": {
    "requires": {
      "DestinaionCall": {
        "kind": "rest",
        "credentials": {
          "destination": "EVENT_MESH_DEST_POC13App"
        }
      }
    }
  }
}`} language="javascript" />


                <h2>Step 6 - Define services of the app on srvice.cds file</h2>

                <p>In your <span className='highlight'>srv</span> folder, create <span className='tomato'>service.cds</span> file and define the event and action on the serivce like below- </p>
                
                <CodeBlock code={
`service CustomSrv {
    
    function greet() returns String ;
    action createMessage(message : String) returns String ;
}`} language="javascript" />



                  <h2>Step 7 - Define services custom logic on srvice.js file</h2>

                <p>In your <span className='highlight'>srv</span> folder, create <span className='tomato'>service.file</span> file and define the custom logic like below- </p>
                
                <CodeBlock code={
`const cds = require('@sap/cds');
const {executeHttpRequest} = require('@sap-cloud-sdk/http-client');
const CustomSrv = async (srv) => {

    srv.on('greet', async (request) => {
        return "working fine";
    });


    srv.on('createMessage', async (request) => {
        try {
            const { message } = request.data;
            if (!message) {
                request.error('No message provided');
            }

            const payload = {
                messages: message
            };

            const response = await executeHttpRequest(
                {destinationName : 'EVENT_MESH_DEST_POC13App'},
                {
                    method : 'POST',
                    url : '/messages',
                    headers : {
                        'Content-Type' : 'application/json',
                        'x-qos' : '1'
                    },
                    data : message
                }
            );
            return response?.data ?? { status: 'OK' };
        }
        catch (error) {
            request.reject(400, ${markup1});
        }
    });
}
module.exports = CustomSrv;`} language="javascript" />


              <h2>Step 8 - Add Hana, mta file, xsuaa and approuter file</h2>

              <p>use the below command for the same -</p>

                <CodeBlock code={
                  `cds add hana,mta,xsuaa,approuter --for production `} language="javascript" />


              <h2>Step 9 - Check the Destination binding mta.yaml file</h2>
              
              <p>Make sure the Destination service binding is defined properly on mta.yaml file under <span className='tomato'>resources</span> section to create proper binding like below - </p>

              <CodeBlock code={
`- name: poc13app-destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite`} language="javascript" />

              
                <p>And the same is defined under <span className='tomato'>modules requires</span> on mta.yaml file -</p>

      <CodeBlock code={
        `- name: poc13app-destination`} language="javascript" />
                
                <p><span className='tomato'>Note -</span> We are using name pocem because our event mesh instance has the name pocem</p>

                <p>In our case, mta.yaml file looks like below -</p>

      <CodeBlock code={
`schema-version: 3.3.0
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
          srv-url: ${markup3}
    requires:
      - name: poc13app-auth
      - name: poc13app-db
      - name: poc13app-destination
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
          name: srv-api # must be used in xs-app.json as well
          url: ~{srv-url}
          forwardAuthToken: true
      - name: poc13app-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${markup4}
          app-uri: ${markup5}
resources:
  - name: poc13app-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: poc13app-${markup6}
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
  - name: poc13app-destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite`} language="text" />


            
            

            
                
            <p>And it is done, you can deploy your app and test it. !!!</p>


            </div>

        </main>
    );
}

export default page;