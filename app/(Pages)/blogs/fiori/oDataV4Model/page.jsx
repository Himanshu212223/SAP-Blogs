import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

const code1 = `https://trial-us10-development-tspace-cap-application-srv.cfapps.us10-004.hana.ondemand.com/odata/v4/custom-service/Warehouses`;


const code2 =
`{
    "authenticationType": "xsuaa",
    "csrfProtection": false,
    "source": "^/odata/v4/custom-service/(.*)",
    "target": "/odata/v4/custom-service/$1",
    "destination": "cap_application_srv"
}`;



const code3 = `https://trial-us10-development-tspace-cap-application-srv.cfapps.us10-004.hana.ondemand.com/odata/v4/custom-service/$metadata`;

const code4 = 
`"dataSources": {
    "WarehouseDataSource": {
        "uri": "/odata/v4/custom-service/",
        "type": "OData",
        "settings": {
            "odataVersion": "4.0"
        }
    }
}`;


const code5 = 
`"WarehouseModel": {
    "dataSource": "WarehouseDataSource",
    "preload": true,
    "settings": {
        "synchronizationMode": "None",
        "operationMode": "Server",
        "autoExpandSelect": true,
        "earlyRequests": true
    }
}
`;

const code6 = `items="{WarehouseModel>/Warehouses}"`;

const code7 =
`<mvc:View controllerName="warehouse.project3.controller.View1"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
	xmlns:l="sap.ui.layout"
	xmlns:form="sap.ui.layout.form"
    >
    	<!-- Show Details Panel -->
        <Panel class="m-tb-10">
            <Table id="idWarehouseTable" items="{WarehouseModel>/Warehouses}" headerText="Warehouse Details">
                <headerToolbar>
                    <OverflowToolbar>
                        <content>
                            <Title text="Warehouses" level="H2"/>
                            <ToolbarSpacer />
                        </content>
                    </OverflowToolbar>
                </headerToolbar>
		
                <columns>
                    <Column>
                        <Text text="ID" />
                    </Column>
                    <Column>
                        <Text text="Registered Name" />
                    </Column>
                    <Column>
                        <Text text="Owner" />
                    </Column>
                    <Column>
                        <Text text="Location" />
                    </Column>
                </columns>

                <items>
                    <ColumnListItem vAlign="Middle">
                        <cells>
                            <Text text="{WarehouseModel>ID}" />
                            <Text text="{WarehouseModel>name}" />
                            <Text text="{WarehouseModel>owner}" />
                            <Text text="{WarehouseModel>location}" />
                        </cells>
                    </ColumnListItem>
                </items>

            </Table>
        </Panel>

    </Page>
</mvc:View>
`;


const code8 =
`<Panel class="m-tb-10">
    <VBox class="sapUiSmallMargin">
        <form:SimpleForm id="SimpleFormDisplay354"
            editable="true"
            layout="ResponsiveGridLayout"
            title="Register Warehouse"
            labelSpanXL="3"
            labelSpanL="3"
            labelSpanM="3"
            labelSpanS="12"
            adjustLabelSpan="false"
            emptySpanXL="4"
            emptySpanL="4"
            emptySpanM="4"
            emptySpanS="0"
            columnsXL="1"
            columnsL="1"
            columnsM="1"
            singleContainerFullSize="false" >
            <form:content>
                <Label text="Name" />
                <Input id="name" placeholder="Warehouse Name" />
                <Label text="Owner" />
                <Input id="owner" placeholder="Owner Name" />
                <Label text="Location" />
                <Input id="location" placeholder="Complete Address" />
                <Label text="" />
                <Button text="Register" type="Emphasized" press="registerWarehouse" />
            </form:content>
        </form:SimpleForm>
    </VBox>
</Panel>`;


const code9 = 
`registerWarehouse: function () {
    const name = this.getView().byId('name').getValue();
    const owner = this.getView().byId('owner').getValue();
    const location = this.getView().byId('location').getValue();

    if (name.length == 0 || owner.length == 0 || location.length == 0) {
        MessageToast.show('Please fill all the fields');
        return;
    }

    // Get Table and its binding
    const oTable = this.byId("idWarehouseTable");
    const oBinding = oTable.getBinding("items");

    //  Insert Data using Binding
    const oContext = oBinding.create({
        name: name,
        owner: owner,
        location: location
    });

    oContext.created()
        .then(() => {
            MessageToast.show("Warehouse created successfully!");
        })
        .catch((oError) => {
            MessageToast.show("Error creating warehouse: " + oError.message);
        });
}`;



//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Consume oData v4 service as Model</h1>

        <p className="wrap-break-word">In this example, we will try to consume SAP CAPM oData V4 service as an oData model in a UI5 application and bind it to a Table.</p>



        <p className="wrap-break-word">We will follow below steps -</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">Create Destination using CAP application details</li>    
            <li className="wrap-break-word">Configure App Router for oData</li>
            <li className="wrap-break-word">Define Data Source</li>
            <li className="wrap-break-word">Define Data Model</li>
        </ul>







        <h3 className="text-3xl wrap-break-word">Step 1 - Create Destination using CAP application details</h3>
        
        <p className="wrap-break-word">In our case, the SAP CAP application exposes the following OData service-</p>

        <div>
            <CodeSnippet code={code1} language="http" title="CAP app oData service" />
        </div>

        <p className="wrap-break-word">So, we will create Destination using below details - </p>

        <table className="border-collapse border border-gray-400 wrap-break-word">
            <thead>
                <tr>
                    <th className="border border-gray-300 wrap-break-word">Property</th>
                    <th className="border border-gray-300 wrap-break-word">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Name</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--any-name-- (In our case, we are using cap_application_srv)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Type</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">HTTP</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">ProxyType</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Internet</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">URL</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--your-cap-app-url-- (in our case, its- https://trial-us10-development-tspace-cap-application-srv.cfapps.us10-004.hana.ondemand.com)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Authentication</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">OAuth2UserTokenExchange</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Client ID</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--cap-app-client-id--</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Client Secret</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--cap-app-client-secret--</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Token Service URL</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--cap-app-client-id-- (add /oauth/token at the end)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">verificationKey</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--from cap app environment variables--</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">xsappname</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--from cap app environment variables--</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">sap.cloud.service</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">--appName.service--</td>
                </tr>
            </tbody>
        </table>
        




        <h3 className="text-3xl wrap-break-word">Step 2 - Configure App Router for oData</h3>
        
        <p className="wrap-break-word">Define the app router for odata requests in <span className="text-gray-950 font-semibold wrap-break-word">xs-app.json</span> file after resources object like-</p>

        <div>
            <CodeSnippet code={code2} language="json" title="xs-app.json" />
        </div>

        <p className="wrap-break-word">In our case-</p>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">Destination- </span> cap_application_srv</li>
            <li className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">Service-</span> /odata/v4/custom-service</li>
        </ul>
        
        <p className="wrap-break-word">and we are able to see the metadata using -</p>
        
        <div>
            <CodeSnippet code={code3} language="http" title="metadata" />
        </div>





        <h3 className="text-3xl wrap-break-word">Step 3 - Define Data Source</h3>
        
        <p className="wrap-break-word">Now, define the odata as Data Source under <span className="text-gray-950 font-semibold wrap-break-word">sap.app</span> section after <span className="text-gray-950 font-semibold wrap-break-word">crossNavigation</span> on <span className="text-red-600 font-semibold wrap-break-word">manifest.json file</span> like-</p>

        <div>
            <CodeSnippet code={code4} language="json" title="webapp/manifest.json" />
        </div>

        <p className="wrap-break-word">In our case, the data source is defined with the name <span className="text-gray-950 font-semibold wrap-break-word">WarehouseDataSource</span>.</p>






        <h3 className="text-3xl wrap-break-word">Step 4 - Define Data Model</h3>

        <p className="wrap-break-word">Now use the data source to define a oData model under <span className="text-gray-950 font-semibold wrap-break-word">models</span> section on <span className="text-gray-950 font-semibold wrap-break-word">sap.ui5</span> section in <span className="text-red-600 font-semibold wrap-break-word">manifest.json</span> file like-</p>
        
        <div>
            <CodeSnippet code={code5} language="json" title="webapp/manifest.json" />
        </div>

        <p className="wrap-break-word">In our case, the model is defined with the name <span className="text-gray-950 font-semibold wrap-break-word">WarehouseModel</span>.</p>

        <p className="text-green-600 font-semibold wrap-break-word">Its done, now we can use the odata model and bind it with table.</p>




        
        <h3 className="text-3xl wrap-break-word">Bind oData Model with Table</h3>

        <p className="wrap-break-word">Lets define a table in the <span className="text-gray-950 font-semibold wrap-break-word">View1.view.xml</span> file and bind its items aggregation to the OData model.</p>
        
        <p className="wrap-break-word">We will define the binding with item like -</p>

        <div>
            <CodeSnippet code={code6} language="javascript" title="table" />
        </div>


        <p className="wrap-break-word">so the complete code will look like -</p>

        <div>
            <CodeSnippet code={code7} language="xml" title="webapp/view/View1.view.xml" />
        </div>






        <h3 className="text-3xl wrap-break-word">Create new Record</h3>

        <p>We can define custom logic to create a new record and persist it through the OData model.</p>

        <p>Lets define a UI for User input like-</p>

        <div>
            <CodeSnippet code={code8} language="xml" title="webapp/view/View1.view.xml" />
        </div>

        <p>And then on button press, we can trigger custom logic like - </p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="webapp/controller/View1.controller.js" />
        </div>


        






        

        
        
        
        

        <h1 className="text-5xl wrap-break-word">Heading 1</h1>

        <h2 className="text-4xl wrap-break-word">Heading 2</h2>

        <h3 className="text-3xl wrap-break-word">Heading 3</h3>

        <h4 className="text-2xl wrap-break-word">Heading 3</h4>


        <span className="text-gray-950 font-semibold wrap-break-word">Bold Content</span>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">content list item 1</li>
            <li className="wrap-break-word">content list item 2</li>
            <li className="wrap-break-word">content list item 3</li>
            <li className="wrap-break-word">content list item 4</li>
        </ul>
        
        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">content list item 1</li>    
            <li className="wrap-break-word">content list item 2</li>
            <li className="wrap-break-word">content list item 3</li>
            <li className="wrap-break-word">content list item 4</li>
        </ul>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/1-manage-multi-language-using-i18n/README.md" />
        </div>

        <div>
            <CodeSnippet code={code1} language="xml" title="View1.view.xml" />
        </div>


        <table className="border-collapse border border-gray-400 wrap-break-word">
            <thead>
                <tr>
                    <th className="border border-gray-300 wrap-break-word">State</th>
                    <th className="border border-gray-300 wrap-break-word">City</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Indiana</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Indianapolis</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Ohio</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Columbus</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Michigan</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Detroit</td>
                </tr>
            </tbody>
        </table>



        <div>
          <section className="rounded-t-lg bg-green-700 p-1 border-green-600  text-white">Note</section>
          <section className="p-3 border-b-2 border-l-2 border-r-2 border-green-700 rounded-b-lg">
            <p className="wrap-break-word">{code1} - it gives Subaccout subdomain</p>
            <p className="wrap-break-word">{code1} - it gives cf org details</p>
          </section>
        </div>




        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>


        Filter, sort on table / List
        Routing Navigation
        Page, Pannel, Shell, App Controls
        Formatter, Dialog, Fragment, Nested View
        Custom Control
        oData model
    </div>
  );
};

export default page;