"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    const markup1 = "${namespace}" ;
    const markup2 = "`Event published to roche/sandbox2023/pocem/cap/hello/created`" ;
    const markup3 = "${default-url}" ;
    const markup4 = "${protocol}" ;
    const markup5 = "${default-uri}" ;
    const markup6 = "${org}-${space}" ;

    return (
        <main className='main'>
            <h1>Create Event on SAP Event Mesh through CAP Application</h1>

            <div className='content'>

                <p>In this example, Our goal is to create events on SAP Event Mesh through CAP App.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create Instance of Event Mesh</ol>
                    <ol>2. Create Queue and Subscription on Event Mesh</ol>
                    <ol>3. Create CAP App to create Event on Event Mesh</ol>
                    <ol>4. Add Event Mesh configuration on package.json file</ol>
                    <ol>5. Define services of the app on srvice.cds file</ol>
                    <ol>6. Define services custom logic on srvice.js file</ol>
                    <ol>7. Add Hana, mta file, xsuaa and approuter file</ol>
                    <ol>8. Check the Event Mesh Instance binding on mta.yaml file</ol>
                    <ol>9. Check the xs-security.json file configuration</ol>
                </ul>

                <h2>Step 1 - Create Instance of Event Mesh</h2>

                <p>On SAP BTP Cockpit, go to the cf space on which you will be deploying your CAP Application.</p>
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

                <CodeBlock code={
`Queue name -  companyName/subaccountName/pocem/pocqueue
Subscription Topic -  companyName/subaccountName/pocem/cap/hello/created`} language="javascript" />



                <h2>Step 3 - Create CAP App to create Event on Event Mesh</h2>

                <p>Follow below commands to create CAP app - </p>

                <CodeBlock code={
`cds init <project-Name>`} language="javascript" />
                <CodeBlock code={
`cd <project-Name>`} language="javascript" />
                <CodeBlock code={
`npm install`} language="javascript" />

                <p>In our case, the app name is poc13app</p>




                <h2>Step 4 -  Add Event Mesh configuration on package.json file</h2>

                <p>In <span className='highlight'>package.json</span> file, add the below event mesh configuration after script or private key to connect connect with Event Mesh.</p>
                
                <CodeBlock code={
`"cds": {
  "requires": {
    "messaging": {
      "kind": "enterprise-messaging",
      "publishPrefix": "$namespace/",
      "subscribePrefix": "$namespace/",
      "format": "cloudevents"
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
      "messaging": {
        "kind": "enterprise-messaging",
        "publishPrefix": "$namespace/",
        "subscribePrefix": "$namespace/",
        "format": "cloudevents"
      }
    }
  }
}`} language="javascript" />


                <h2>Step 5 - Define services of the app on srvice.cds file</h2>

                <p>In your <span className='highlight'>srv</span> folder, create <span className='tomato'>service.cds</span> file and define the event and action on the serivce like below- </p>
                
                <CodeBlock code={
`service PocService @(path: '/poc') {
  // Declare an event and pin it to a concrete Event Mesh topic
  @topic : 'cap/hello/created'
  event HelloCreated : {
    message : String;
  };
  // Simple action to trigger/publish the event
  action fireHello(message : String) returns String;
}`} language="javascript" />



                  <h2>Step 6 - Define services custom logic on srvice.js file</h2>

                <p>In your <span className='highlight'>srv</span> folder, create <span className='tomato'>service.file</span> file and define the custom logic like below- </p>
                
                <CodeBlock code={
`const cds = require('@sap/cds');
const PocService = async (srv) => {
  
  // Connect to CAP logical messaging service (Event Mesh behind the scenes)
  const messaging = await cds.connect.to('messaging');
  
  srv.on('fireHello', async (req) => {
    
    const data = {
      message: req.data.message,
    };

    // Option A: publish to explicit topic (recommended when you control topic naming)
    
    await messaging.emit('cap/hello/created', data);
    
    // Option B: emit by modeled event name -> CAP resolves to @topic
    // await this.emit('HelloCreated', data);
    
    return ${markup2};
  });
};


module.exports = PocService ;`} language="javascript" />


              <h2>Step 7 - Add Hana, mta file, xsuaa and approuter file</h2>

              <p>use the below command for the same -</p>

                <CodeBlock code={
                  `cds add hana,mta,xsuaa,approuter --for production `} language="javascript" />


              <h2>Step 8 - Check the Event Mesh Instance binding on mta.yaml file</h2>
              
              <p>Make sure the Event Mesh Instance is defined properly on mta.yaml file under <span className='tomato'>resources</span> section to create proper binding like below - </p>

              <CodeBlock code={
`- name: pocem
    type: org.cloudfoundry.managed-service
    parameters:
      service: enterprise-messaging
      service-plan: default
      service-name: pocem`} language="javascript" />

              
                <p>And the same is defined under <span className='tomato'>modules requires</span> on mta.yaml file -</p>

      <CodeBlock code={
        `- name: pocem`} language="javascript" />
                
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
  - name: pocem
    type: org.cloudfoundry.managed-service
    parameters:
      service: enterprise-messaging
      service-plan: default
      service-name: pocem`} language="text" />


            <h2>Step 9 - Check the xs-security.json file configuration</h2>


            <p>It gives permission for SAP Event Mesh and your CAP app to talk to each other securely.</p>
            
            <p>Make sure it has the configuration like below - </p>


              <CodeBlock code={
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
}`} language="javascript" />

            <h3>Explaination of above statement - </h3>
            
            <p>This below scope says - Event Mesh is allowed to call my application.</p>


            <CodeBlock code={
`{
  "name": "$XSAPPNAME.emcallback",
  "grant-as-authority-to-apps": [
    "$XSSERVICENAME(pocem)"
  ]
}`} language="javascript" />


<p>This below statement allows your CAP app to manage Event Mesh like Create queues, Create subscriptions, Manage messaging configuration</p>


            <CodeBlock code={
`{
  "name": "$XSAPPNAME.emmanagement"
  }`} language="javascript" />


  <p>This below statement gives these permissions directly to your CAP application.</p>

<CodeBlock code={
`"authorities": [
  "$XSAPPNAME.emmanagement",
  "$XSAPPNAME.mtcallback"
]`} language="javascript" />
            

            
                
            <p>And it is done, you can deploy your app and test it. !!!</p>


            </div>

        </main>
    );
}

export default page;