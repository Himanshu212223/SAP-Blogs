import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {


    return (
        <div className="indexing">
            <h1 className="headline">Consume oData V2 in UI5 Application.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will try to create the oData V4 to oData V2 of our CAP Application and consume it on UI5 Application.
            </p>


            {/* STEPS to FOLLOW */}

            <h3 className="heading">Steps to follow -</h3>

            <p className="paragraph">
                1. Firstly, go to your <span className="tomato">CAPM Applicaton</span>, open terminal and paste the below npm command to create oData V2 of the same endpoints (oData V4) created on srv files. 
            </p>
            
			<SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `npm i @cap-js-community/odata-v2-adapter`
                }
            </SyntaxHighlighter>


			 <p className="paragraph">
                2. Deploy your CAP Application on the required BTP Cockpit Subaccount and Space.
            </p>


			 <p className="paragraph">
                3. On the Same Subaccount, create a Destination using the credentials from CAP Application srv Environment Variables.
				We have chosen the Destination name as <span className="tomato">productmanagement-backend</span>.
            </p>

			<Image src="/resources/oData/Destination.png" width={1000} height={200} alt="Formatter on Table" />
            
            <p className="paragraph">
                4. Now go to your UI5 Application and inside <span className="tomato">xs-app.json</span> file.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`{
	"authenticationType": "xsuaa",
	"csrfProtection": false,
	"source": "^/odata/v2/api/products/(.*)",
	"target": "/odata/v2/api/products/$1",
	"destination": "productmanagement-backend"
}`
                }
            </SyntaxHighlighter>



            <p className="paragraph">
                Here, <span className="tomato">source, target, & destination </span> is the api endpoints from your CAP Application endpoints and the Destination created on BTP Cockpit Subaccount. 
            </p>



            <p className="paragraph">
                <span className="tomato">For example if the CAP endpoint url is</span> - https://trial-subaccount-productmanagement-srv.cfapps.us10.hana.ondemand.com/odata/v2/api/products/ProductDetails
			</p> 
            <p className="paragraph">
			 	<span className="tomato">So, On Destination we are using </span> -  https://trial-subaccount-productmanagement-srv.cfapps.us10.hana.ondemand.com
            </p>
            <p className="paragraph">
				<span className="tomato">On xs-app.json file we are using</span> - /odata/v2/api/products
            </p>
            <p className="paragraph">
				<span className="tomato">and on the Controller we will consume</span> - /ProductDetails
            </p>


			<p className="paragraph">
                5. Now go to <span className="tomato">manifest.json</span> file of your UI5 Application and under the <span className="tomato">dataSources</span>, add a new Data source as mentioned below -
            </p>
            
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
"mainService": {
	"uri": "/odata/v2/api/products/",
	"type": "OData",
	"settings": {
		"odataVersion": "2.0"
	}
}
`
                }
            </SyntaxHighlighter>



			<p className="paragraph">
                So your <span className="tomato">dataSources</span> will look like below - 
            </p>
            
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
"dataSources": {
	"mainService": {
	"uri": "/odata/v2/api/products/",
	"type": "OData",
	"settings": {
		"odataVersion": "2.0"
		}
	}
}
`
                }
            </SyntaxHighlighter>

			

			<p className="paragraph">
                6. Under <span className="tomato">models</span> add the data source under the model.
            </p>


			<SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
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
`
                }
            </SyntaxHighlighter>
			
			
			
			<p className="paragraph">
                So the <span className="tomato">models</span> will look like below-
            </p>


			<SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
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
`
                }
            </SyntaxHighlighter>
			
			
			
			
			<p className="paragraph">
                7. To define a button on <span className="tomato">view.xml</span> clicking on which we can consume these oData.
            </p>


			<SyntaxHighlighter language="xml" style={atomDark}>
                {
`
<Button id="fetchData" text="Fetch Data" press="press" />
`
                }
            </SyntaxHighlighter>
			
			
			
			<p className="paragraph">
                8. Now define the functions associated with the button on <span className="tomato">controller.js</span> file.
            </p>


			<SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
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
`
                }
            </SyntaxHighlighter>



            

            <p className="list bold pinky">
                And all set, we can use it as per your requirement.
            </p>

            
        </div>
    );
}

export default sample1;