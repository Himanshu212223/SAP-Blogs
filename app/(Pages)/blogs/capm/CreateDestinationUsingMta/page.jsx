import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

const code1 = "${default-url}";
const code2 = "${protocol}";
const code3 = "${default-uri}";
const code4 = "${org}-${space}";
const code5 = "${org}" ;
const code6 = "${default-domain}" ;
const code7 = "${org}.${default-domain}";

const code8 = "- name: cap-application-destination-service" ;


const code9 =
`_schema-version: 3.3.0
ID: cap-application
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
  - name: cap-application-srv
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
          srv-url: ${code1}
    requires:
      - name: cap-application-auth
      - name: cap-application-db
      # Declare Destination Service Requirement below
      - name: cap-application-destination-service`;



const code10 =
`resources:
  # Define Destination Service Resource detials
  - name: cap-application-destination-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      service-name: cap-application-destination-instance # <-- Service instance name
      config:
        HTML5Runtime_enabled: true`;



const code11 = 
`_schema-version: 3.3.0
ID: cap-application
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
  - name: cap-application-srv
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
          srv-url: ${code1}
    requires:
      - name: cap-application-auth
      - name: cap-application-db
      # Declare Destination Service Requirement below
      - name: cap-application-destination-service

  - name: cap-application-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: cap-application-db
  
  - name: cap-application
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
      - name: cap-application-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${code2}
          app-uri: ${code3}




resources:
  # Define XSUAA Service Resource details
  - name: cap-application-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: cap-application-${code4}
        tenant-mode: dedicated
        oauth2-configuration:
          redirect-uris:
            - https://*~{app-api/app-uri}/**
    requires:
      - name: app-api
  
  # Define HDI Container Resource details
  - name: cap-application-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
  
  # Define Destination Service Resource detials
  - name: cap-application-destination-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      service-name: cap-application-destination-instance # <-- Service instance name
      config:
        HTML5Runtime_enabled: true`


const code12 = 
`  # Define Destination Service Resource detials
  - name: cap-application-destination-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      service-name: cap-application-destination-instance # <-- Service instance name
      config:
        HTML5Runtime_enabled: true
        # Destination 3 - Custom Destinations
        init_data:
          subaccount:
            destinations:
              # Destination detail
            - Name: cap_application_Testing_Destination_URL
                Type: HTTP
                ProxyType: Internet
                Authentication: NoAuthentication
                URL: https://myurl.com
            existing_destinations_policy: update
        version: 1.0.0`



const code13 = 
`- name: cap-application-cap-destinations-creator-module # Module to create Destination using Destination Service
  type: com.sap.application.content
  requires:
    - name: cap-application-auth
      parameters:
        service-key:
          name: cap-application-cap-auth-key
    - name: srv-api
    - name: cap-application-destination-service
      parameters:
        content-target: true
  parameters:
    content:
      subaccount:
        destinations:
          # Destinations based on the CAP service and XSUAA service are created here.    
          # Destination - 1 
          - Name: cap_application_Testing_Destination #The destination to the CAP service. It is required by your UIs running in SAP Launchpad service to access your service.
            Authentication: OAuth2UserTokenExchange
            TokenServiceInstanceName: cap-application-auth
            TokenServiceKeyName: cap-application-auth-key
            URL: '~{srv-api/srv-url}'
            sap.cloud.service: cap-application.service
            
          # Destination - 2
          - Name: cap_application_Testing_Destination-auth #The destination to your XSUAA service instance. The SAP Launchpad service needs it to convert OAuth tokens for use with your CAP service.
            Authentication: OAuth2UserTokenExchange
            ServiceInstanceName: cap-application-auth
            ServiceKeyName: cap-application-auth-key
            sap.cloud.service: cap-application.service

        existing_destinations_policy: update
  build-parameters:
    no-source: true`;



const code14 = 
`_schema-version: 3.3.0
ID: cap-application
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
  - name: cap-application-srv
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
          srv-url: ${code1}
    requires:
      - name: cap-application-auth
      - name: cap-application-db
      # Declare Destination Service Requirement
      - name: cap-application-destination-service

  - name: cap-application-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: cap-application-db
  
  - name: cap-application
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
      - name: cap-application-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${code2}
          app-uri: ${code3}

  - name: cap-application-cap-destinations-creator-module # Module to create Destination using Destination Service
    type: com.sap.application.content
    requires:
      - name: cap-application-auth
        parameters:
          service-key:
            name: cap-application-cap-auth-key
      - name: srv-api
      - name: cap-application-destination-service
        parameters:
          content-target: true
    parameters:
      content:
        subaccount:
          destinations:
            # Destinations based on the CAP service and XSUAA service are created here.    
            # Destination - 1 
            - Name: cap_application_Testing_Destination #The destination to the CAP service. It is required by your UIs running in SAP Launchpad service to access your service.
              Authentication: OAuth2UserTokenExchange
              TokenServiceInstanceName: cap-application-auth
              TokenServiceKeyName: cap-application-auth-key
              URL: '~{srv-api/srv-url}'
              sap.cloud.service: cap-application.service
              
            # Destination - 2
            - Name: cap_application_Testing_Destination-auth #The destination to your XSUAA service instance. The SAP Launchpad service needs it to convert OAuth tokens for use with your CAP service.
              Authentication: OAuth2UserTokenExchange
              ServiceInstanceName: cap-application-auth
              ServiceKeyName: cap-application-auth-key
              sap.cloud.service: cap-application.service

          existing_destinations_policy: update
    build-parameters:
      no-source: true




resources:
  # Define XSUAA Service Resource details
  - name: cap-application-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: cap-application-${code4}
        tenant-mode: dedicated
        oauth2-configuration:
          redirect-uris:
            - https://*~{app-api/app-uri}/**
    requires:
      - name: app-api
  
  # Define HDI Container Resource details
  - name: cap-application-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
  
  # Define Destination Service Resource detials
  - name: cap-application-destination-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      service-name: cap-application-destination-instance # <-- Service instance name
      config:
        HTML5Runtime_enabled: true
        init_data:
          subaccount:
            destinations:
              # Destination 3 - Custom Destinations
              - Name: cap_application_Testing_Destination_URL
                Type: HTTP
                ProxyType: Internet
                Authentication: NoAuthentication
                URL: https://${code7}
            existing_destinations_policy: update
        version: 1.0.0`;


const code15 = `- name: cap-application-sbpa-service`;


const code16 = 
`# Define SBPA Service Resource detials
- name: cap-application-sbpa-service
  type: org.cloudfoundry.managed-service
  parameters:
    service: process-automation-service
    service-plan: standard
    service-name: cap-application-sbpa-service-instance`;


const code17 =
`# Destination Module
- name: cap-application-cap-destinations-creator-module # Module to create Destination using Destination Service
  type: com.sap.application.content
  requires:
    - name: cap-application-auth
      parameters:
        service-key:
          name: cap-application-cap-auth-key
    - name: srv-api
    - name: cap-application-destination-service
      parameters:
        content-target: true
    - name: cap-application-sbpa-service  # <-- Add SBPA resource details as requirement here
      parameters:
        service-key:
          name: cap-application-sbpa-service-key
  parameters:
    content:
      subaccount:
        destinations:
          # Destinations based on the CAP service and XSUAA service are created here.    
          # Destination - 1 
          - Name: cap_application_Testing_Destination #The destination to the CAP service. It is required by your UIs running in SAP Launchpad service to access your service.
            Authentication: OAuth2UserTokenExchange
            TokenServiceInstanceName: cap-application-auth
            TokenServiceKeyName: cap-application-auth-key
            URL: '~{srv-api/srv-url}'
            sap.cloud.service: cap-application.service
            
          # Destination - 2
          - Name: cap_application_Testing_Destination-auth #The destination to your XSUAA service instance. The SAP Launchpad service needs it to convert OAuth tokens for use with your CAP service.
            Authentication: OAuth2UserTokenExchange
            ServiceInstanceName: cap-application-auth
            ServiceKeyName: cap-application-auth-key
            sap.cloud.service: cap-application.service

          # Destination - 3 - SBPA Destination
          - Name: cap_application_Destination-sbpa
            Authentication: OAuth2UserTokenExchange
            ServiceInstanceName: cap-application-sbpa-service-instance  # <-- SBPA Service Instance Name
            ServiceKeyName: cap-application-sbpa-service-key            # <-- SBPA Service Service Key
            sap.cloud.service: cap-application.service

        existing_destinations_policy: update
  build-parameters:
    no-source: true`;



const code18 = 
`_schema-version: 3.3.0
ID: cap-application
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
  - name: cap-application-srv
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
          srv-url: ${code1}
    requires:
      - name: cap-application-auth
      - name: cap-application-db
      # Declare Destination Service Requirement below
      - name: cap-application-destination-service
      # Declare SBPA Service Requirement below
      - name: cap-application-sbpa-service


      
  - name: cap-application-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: nodejs_buildpack
    requires:
      - name: cap-application-db
  
  - name: cap-application
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
      - name: cap-application-auth
    provides:
      - name: app-api
        properties:
          app-protocol: ${code2}
          app-uri: ${code3}

  - name: cap-application-cap-destinations-creator-module # Module to create Destination using Destination Service
    type: com.sap.application.content
    requires:
      - name: cap-application-auth
        parameters:
          service-key:
            name: cap-application-cap-auth-key
      - name: srv-api
      - name: cap-application-destination-service
        parameters:
          content-target: true
      - name: cap-application-sbpa-service  # <-- Add SBPA resource details as requirement here
        parameters:
          service-key:
            name: cap-application-sbpa-service-key
    parameters:
      content:
        subaccount:
          destinations:
            # Destinations based on the CAP service and XSUAA service are created here.    
            # Destination - 1 
            - Name: cap_application_Testing_Destination #The destination to the CAP service. It is required by your UIs running in SAP Launchpad service to access your service.
              Authentication: OAuth2UserTokenExchange
              TokenServiceInstanceName: cap-application-auth
              TokenServiceKeyName: cap-application-auth-key
              URL: '~{srv-api/srv-url}'
              sap.cloud.service: cap-application.service
              
            # Destination - 2
            - Name: cap_application_Testing_Destination-auth #The destination to your XSUAA service instance. The SAP Launchpad service needs it to convert OAuth tokens for use with your CAP service.
              Authentication: OAuth2UserTokenExchange
              ServiceInstanceName: cap-application-auth
              ServiceKeyName: cap-application-auth-key
              sap.cloud.service: cap-application.service

            # Destination - 3 - SBPA Destination
            - Name: cap_application_Destination-sbpa
              Authentication: OAuth2UserTokenExchange
              ServiceInstanceName: cap-application-sbpa-service-instance  # <-- SBPA Service Instance Name
              ServiceKeyName: cap-application-sbpa-service-key            # <-- SBPA Service Service Key
              sap.cloud.service: cap-application.service

          existing_destinations_policy: update
    build-parameters:
      no-source: true



resources:
  # Define XSUAA Service Resource details
  - name: cap-application-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json
      config:
        xsappname: cap-application-${code4}
        tenant-mode: dedicated
        oauth2-configuration:
          redirect-uris:
            - https://*~{app-api/app-uri}/**
    requires:
      - name: app-api
  
  # Define HDI Container Resource details
  - name: cap-application-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
  
  # Define Destination Service Resource detials
  - name: cap-application-destination-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: destination
      service-plan: lite
      service-name: cap-application-destination-instance # <-- Service instance name
      config:
        HTML5Runtime_enabled: true
        # Destination 3 - Custom Destinations
        init_data:
          subaccount:
            destinations:
              - Name: cap_application_Testing_Destination_URL
                Type: HTTP
                ProxyType: Internet
                Authentication: NoAuthentication
                URL: https://myurl.com
            existing_destinations_policy: update
        version: 1.0.0

  # Define SBPA Service Resource detials
  - name: cap-application-sbpa-service
    type: org.cloudfoundry.managed-service
    parameters:
      service: process-automation-service
      service-plan: standard
      service-name: cap-application-sbpa-service-instance`;






//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Create Destination using <span className="text-gray-950 font-semibold wrap-break-word">mta.yaml</span></h1>

        <p className="wrap-break-word">Using the CAP application mta.yaml file, we can create both the CAP application destination and custom destinations during deployment.</p>

        
        <p className="wrap-break-word">To create destinations, we first need to create service instnace of destination service, bind the application to the service and then define the destination details.</p>
        
        
        
        <h3 className="text-3xl wrap-break-word">Create Instance and Service Binding</h3>


        <p className="wrap-break-word">This can be achieved by <span className="text-gray-950 font-semibold wrap-break-word">declaring the Destination service</span> as a required dependency in the <span className="text-gray-950 font-semibold wrap-break-word">module</span> definition, as shown below:</p>

        <div>
            <CodeSnippet code={code8} language="yaml" title="mta.yaml" />
        </div>

        <p className="wrap-break-word">For Example, under modules requires section -</p>
        
        <div>
            <CodeSnippet code={code9} language="yaml" title="mta.yaml" />
        </div>



        <p className="wrap-break-word">We can then define the service details under <span className="text-gray-950 font-semibold wrap-break-word">resources</span> section like below - </p>

        <div>
            <CodeSnippet code={code10} language="yaml" title="mta.yaml" />
        </div>



        <p className="wrap-break-word">So your mta.yaml will look like - </p>

        <div>
            <CodeSnippet code={code11} language="yaml" title="mta.yaml" />
        </div>



        <p className="wrap-break-word">Now since <span className="text-gray-950 font-semibold wrap-break-word">service binding has been created</span>, we can proceed to create Custom Destination.</p>










        <h3 className="text-3xl wrap-break-word">Create Custom Destination</h3>

        <p className="wrap-break-word">Now to create custom destinations, we can define its details in the resources like - </p>

        <div>
            <CodeSnippet code={code12} language="yaml" title="mta.yaml" />
        </div>








        <h3 className="text-3xl wrap-break-word">Create CAP Destination using xsuaa credentials</h3>

        <p className="wrap-break-word">Now to create custom destinations, we can <span className="text-gray-950 font-semibold wrap-break-word">define a separate module</span> which will use the xsuaa service credentials and will create the destination - </p>

        <div>
            <CodeSnippet code={code13} language="yaml" title="mta.yaml" />
        </div>




        <p className="wrap-break-word">So the complete mta.yaml file looks like-</p>
        <div>
            <CodeSnippet code={code14} language="yaml" title="mta.yaml" />
        </div>


        <div>
          <section className="rounded-t-lg bg-green-700 p-1 border-green-600  text-white">Note:</section>
          <section className="p-3 border-b-2 border-l-2 border-r-2 border-green-700 rounded-b-lg">
            <p className="wrap-break-word">{code5} - it gives Subaccout subdomain</p>
            <p className="wrap-break-word">{code6} - it gives cf org details</p>
          </section>
        </div>





        <h3 className="text-3xl wrap-break-word">Create SBPA Destination</h3>

        <p className="wrap-break-word">So, as we discussed earlier, to create or use service credentials, we <span className="text-gray-950 font-semibold wrap-break-word">first need to create the service instance, establish a service binding, and then create the required destination</span> using those service credentials.</p>


        <h4 className="text-2xl wrap-break-word">Describe SBPA Resource details-</h4>

        <p className="wrap-break-word">We can declare the requirement of SBPA resources under<span className="text-gray-950 font-semibold wrap-break-word"> modules resources</span> section like- </p>

        <div>
            <CodeSnippet code={code15} language="yaml" title="mta.yaml" />
        </div>


        <h4 className="text-2xl wrap-break-word">Define SBPA Resource details-</h4>

        <p className="wrap-break-word">We can define the SBPA service details under<span className="text-gray-950 font-semibold wrap-break-word"> resources</span> section like- </p>

        <div>
            <CodeSnippet code={code16} language="yaml" title="mta.yaml" />
        </div>


        <h4 className="text-2xl wrap-break-word">Define SBPA Destination details-</h4>

        <p className="wrap-break-word">Now we can define the SBPA instance details under<span className="text-gray-950 font-semibold wrap-break-word"> destination module</span> section like- </p>

        <div>
            <CodeSnippet code={code17} language="yaml" title="mta.yaml" />
        </div>


        <p className="wrap-break-word">So the complete mta.yaml will looks like-</p>

        <div>
            <CodeSnippet code={code18} language="yaml" title="mta.yaml" />
        </div>




        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>

    </div>
  );
};

export default page;