"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
    ssr: false,
});

const page = () => {

    return (
        <main className='main'>
            <h1>Consume oData V2 in UI5 Application</h1>

            <div className='content'>

                <p>In this example, We will create an UI5 application and consume the oData V2 Service.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. oData V2 adapter is configured on CAPM App.</ol>
                    <ol>2. Destination configuration for oData V2 service.</ol>
                    <ol>3. Create and configure the Destination on xs-app in UI.</ol>
                    <ol>4. Configure data source on manifest file.</ol>
                    <ol>5. Configure UI and Controller file to consume the oData Service.</ol>
                </ul>

                <h2>Step 1 - oData V2 adapter is configured on CAPM App</h2>

                <p>If you are trying to consume the <span className='highlight'>oData Service of CAPM</span> on UI5 App, make sure oData adapter has been configured on CAPM app.</p>

                <p>You can execute the below npm command in CAPM Project Terminal to enable oData V2 Service.</p>

                <CodeBlock code={`npm i @cap-js-community/odata-v2-adapter`} language="javascript" />

                <h2>Step 2 - Destination configuration for oData V2 service</h2>

                <p>Once the CAPM App is deployed, create a Destination using the CAPM App service Environment Variables.</p>

                <p><span className='highlight'>url</span> - use the url of capm service</p>
                <p><span className='highlight'>Authentication</span> - oAuth2UserTokenExchange</p>
                <p><span className='highlight'>Client ID</span> - xsuaa client id from CAPM Environment Variables</p>
                <p><span className='highlight'>Client Secret</span> - xsuaa client secret from CAPM Environment Variables</p>
                <p><span className='highlight'>Token Service URL</span> - xsuaa url from CAPM Environment Variables, append /oauth/token at the end of the url</p>

                <p>Additional Properties - </p>
                <p><span className='highlight'>sap.cloud.service</span> - xsuaa xsapp name from CAPM Environment Variables</p>
                <p><span className='highlight'>verificationkey</span> - xsuaa verificationkey name from CAPM Environment Variables</p>
                <p><span className='highlight'>xsappname</span> - xsuaa xsappname name from CAPM Environment Variables</p>

                <Image src="/resources/oData/Destination.png" width={500} height={200} alt="Formatter on Table" />

                <h2>Step 3 - Create and configure the Destination on xs-app in UI</h2>

                <p>Create a UI5 App and on the <span className='highlight'>xs-app.json file</span> add the Destination configuration refering the below code -</p>

                <CodeBlock code={`
{
	"authenticationType": "xsuaa",
	"csrfProtection": false,
	"source": "^/odata/v2/api/products/(.*)",
	"target": "/odata/v2/api/products/$1",
	"destination": "productmanagement-backend"
}
`} language='javascript' />

                <p><span className='highlight'>source and target</span> - configure the endpoint which is required to be used after the url of the destination.</p>

                <p><span className='highlight'>destination</span> - destination configured on the Subaccount.</p>

                <p>For example in our case if - </p>
                <p><span className='highlight'>complete CAP endpoint url is</span> - https://trial-subaccount-productmanagement-srv.cfapps.us10.hana.ondemand.com/odata/v2/api/products/ProductDetails</p>

                <p><span className='highlight'>on Destination, url is till</span> - https://trial-subaccount-productmanagement-srv.cfapps.us10.hana.ondemand.com</p>

                <p><span className='highlight'>On xs-app.json file we are using</span> - /odata/v2/api/products</p>

                <p><span className='highlight'>and on the Controller we will consume</span> - /ProductDetails</p>

                <h2>Step 4 - Configure data source on manifest file</h2>

                <p>In <span className='highlight'>manifest.json file</span> of your UI5 Application and under the <span className='highlight'>dataSources</span>, add a new Data source as mentioned below -</p>

                <CodeBlock code={`
"mainService": {
	"uri": "/odata/v2/api/products/",
	"type": "OData",
	"settings": {
		"odataVersion": "2.0"
	}
}
`} language='javascript' />

                <p>So your <span className='highlight'>dataSources</span> will look like below -</p>

                <CodeBlock code={`
"dataSources": {
	"mainService": {
	"uri": "/odata/v2/api/products/",
	"type": "OData",
	"settings": {
		"odataVersion": "2.0"
		}
	}
}
`} language='javascript' />

                <p>In the same <span className='highlight'>manifest.json file</span> of your UI5 Application and under the <span className='highlight'>models</span>, add a new model as mentioned below -</p>

                <CodeBlock code={`
"serviceModel": {
	"dataSource": "mainService",
	"preload": true,
	"settings": {
		"synchronizationMode": "None",
		"operationMode": "Server",
		"autoExpandSelect": true,
		"earlyRequests": true
	}
}
`} language='javascript' />

                <p>So the <span className='highlight'>models</span> will look like below-</p>

                <CodeBlock code={`
"models": {
	"i18n": {
	"type": "sap.ui.model.resource.ResourceModel",
	"settings": {
		"bundleName": "product.managementui.i18n.i18n"
		}
	},
	"serviceModel": {
	"dataSource": "mainService",
	"preload": true,
	"settings": {
		"synchronizationMode": "None",
		"operationMode": "Server",
		"autoExpandSelect": true,
		"earlyRequests": true
		}
	}
}
`} language='javascript' />

                <h2>Step 5 - Configure UI and Controller file to consume the oData Service</h2>

                <p>In the <span className='highlight'>View.xml</span> file, add the Button clicking on which will fetch the data from oData service.</p>

                <CodeBlock code={`<Button id="fetchData" text="Fetch Data" press="press" />`} language='xml' />

                <p>Now, configure the button pressed method on <span className='highlight'>View.Controller.js</span> file.</p>

                <CodeBlock code={`
press: async function () {
try {


	const oModel = this.getView().getModel("serviceModel");

	const mParameters = {
		urlParameters: {},
		success: function (oData) {
			console.log(oData);
		}.bind(this),
		error: function (oError) {
			console.log(oError)
		}
	};



	oModel.read("/ProductDetails", mParameters);
	console.log(oModel);

	}
	catch (error) {
		console.log(error);
	}
}
`} language='javascript' />







                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;