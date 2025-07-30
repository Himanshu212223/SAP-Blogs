"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    const markup1 = "${default-url}" ;
    const markup2 = "${protocol}" ;
    const markup3 = "${default-uri}" ;
    const markup4 = "${org}-${space}" ;

    return (
        <main className='main'>
            <h1>Create Destination through CAP App</h1>

            <div className='content'>

                <p>In this example, Our goal is to configure the mta.yml file in order to create a destination.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Add the mta.yml file (if not present).</ol>
                    <ol>2. Add the required service in module section on mta.yml file.</ol>
                    <ol>3. Define the Destination configurations in mta.yml file.</ol>
                    <ol>4. Define the Destination service on resources.</ol>
                </ul>

                <h2>Step 1 - Add the mta.yml file (if not present)</h2>

                <p>If your CAP Application doesnot have mta file, then use the below command to add it.</p>

                <CodeBlock code={`cds add mta --for production`} language="javascript" />

                
                
                <h2>Step 2 - Add the required service in module section on mta.yml file</h2>

                <p>In the <span className='highlight'>mta.yml</span> file in <span className='highlight'>modules</span> section under <span className='highlight'>requires</span> add the destination service name.</p>

                <p>For example, we are using the name test-app-destination-service</p>

                <CodeBlock code={`- name: test-app-destination-service`} language='yaml' />





                <h2>Step 3 - Define the Destination configurations in mta.yml file</h2>

                <p>We are defining the Service name as test-application-destinations</p>

                <p>And in the required section we are declaring test-app-destination-service which we defined above in the module.</p>

                <p>Be careful with the names.</p>

                <CodeBlock code={`- name: test-application-destinations # For Destination
    type: com.sap.application.content
    requires:
     - name: test-application-auth
       parameters:
         service-key:
           name: test-application-auth-key     
     - name: srv-api
     - name: test-app-destination-service
       parameters:
         content-target: true
    parameters:
     content:       
       subaccount:
         destinations:
           - Authentication: OAuth2UserTokenExchange
             Name: test-application-app-srv #The destination to the CAP service. It is required by your UIs running in SAP Launchpad service to access your service.
             TokenServiceInstanceName: test-application-auth
             TokenServiceKeyName: test-application-auth-key
             URL: '~{srv-api/srv-url}'
             sap.cloud.service: test-application.service           
           - Authentication: OAuth2UserTokenExchange
             Name: test-application-auth  #The destination to your XSUAA service instance. The SAP Launchpad service needs it to convert OAuth tokens for use with your CAP service.
             ServiceInstanceName: test-application-auth
             ServiceKeyName: test-application-auth-key
             sap.cloud.service: test-application.service
         existing_destinations_policy: update 
    build-parameters:
     no-source: true`} language='yaml' />

                


                <h2>Step 4 - Define the Destination service on resources</h2>

                <p>In the <span className='highlight'>mta.yml</span> under <span className='highlight'>resources</span> section, define the destination service (with the same name as we defined in the modules on step 2).</p>

                <CodeBlock code={`- name: test-app-destination-service    # For Destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      config:
        HTML5Runtime_enabled: true`} language='yaml' />



                <p>So, your <span className='highlight'>mta.yml</span> file would look like below - </p>

                <p>Note - Our application name and id is test-application</p>

                <CodeBlock code={`_schema-version: 3.3.0
ID: test-application
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
  - name: test-application-srv
    type: nodejs
    path: gen/srv
    parameters:
      buildpack: nodejs_buildpack
      readiness-health-check-type: http
      readiness-health-check-http-endpoint: /health
    build-parameters:
      builder: npm
    provides:
      - name: srv-api # required by consumers of CAP services (e.g. approuter)
        properties:
          srv-url: ${markup1}
    requires:
      - name: test-application-db
      - name: test-application-auth
      - name: test-app-destination-service  # For Destination

  - name: test-application-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: test-application-db

  - name: test-application
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
      - name: test-application-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${markup2}
          app-uri: ${markup3}

  - name: test-application-destinations # For Destination
    type: com.sap.application.content
    requires:
     - name: test-application-auth
       parameters:
         service-key:
           name: test-application-auth-key     
     - name: srv-api
     - name: test-app-destination-service
       parameters:
         content-target: true
    parameters:
     content:       
       subaccount:
         destinations:
           - Authentication: OAuth2UserTokenExchange
             Name: test-application-app-srv #The destination to the CAP service. It is required by your UIs running in SAP Launchpad service to access your service.
             TokenServiceInstanceName: test-application-auth
             TokenServiceKeyName: test-application-auth-key
             URL: '~{srv-api/srv-url}'
             sap.cloud.service: test-application.service           
           - Authentication: OAuth2UserTokenExchange
             Name: test-application-auth  #The destination to your XSUAA service instance. The SAP Launchpad service needs it to convert OAuth tokens for use with your CAP service.
             ServiceInstanceName: test-application-auth
             ServiceKeyName: test-application-auth-key
             sap.cloud.service: test-application.service
         existing_destinations_policy: update 
    build-parameters:
     no-source: true


resources:
  - name: test-application-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
  - name: test-application-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: test-application-${markup4}
        tenant-mode: dedicated
  - name: test-app-destination-service    # For Destination
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      config:
        HTML5Runtime_enabled: true`} language='yaml' />



                
                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;