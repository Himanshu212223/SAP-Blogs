import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

const code0 = `npm i @cap-js-community/odata-v2-adapter` ;

const code1 = `https://trial-us10-development-tspace-cap-application-srv.cfapps.us10-004.hana.ondemand.com/odata/v2/custom-service/Warehouses`;


const code2 =
`{
    "authenticationType": "xsuaa",
    "csrfProtection": false,
    "source": "^/odata/v2/custom-service/(.*)",
    "target": "/odata/v2/custom-service/$1",
    "destination": "cap_application_srv"
}`;



const code3 = `https://trial-us10-development-tspace-cap-application-srv.cfapps.us10-004.hana.ondemand.com/odata/v2/custom-service/$metadata`;

const code4 = 
`"dataSources": {
    "WarehouseDataSource": {
        "uri": "/odata/v2/custom-service/",
        "type": "OData",
        "settings": {
            "odataVersion": "2.0"
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
`<!-- Show Table Details -->
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

</Table>`;

const code8 = `<Table id="idWarehouseTable" items="{WarehouseModel>/Warehouses}" headerText="Warehouse Details" mode="SingleSelectMaster" selectionChange="selectedRow">` ;

const code9 = 
`//  Method to get selected Table row details and route to another view.
selectedRow: function (oEvent) {
    const selectedID = oEvent.getParameter("listItem").getBindingContext("WarehouseModel").getObject().ID;
    debugger
    console.log("row pressed");

    // Route to View2 with ID on path
    const router = UIComponent.getRouterFor(this);
    router.navTo("DetailView", {
        id: selectedID
    });
}`;

const code10 =
`"routes": [
    {
        "name": "RouteView1",
        "pattern": ":?query:",
        "target": [
        "TargetView1"
        ]
    },
    {
        "name" : "DetailView",
        "pattern" : "Warehouse/{id}",
        "target" : "WarehouseDetails"
    }
]
`;


const code11 =
`"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "WarehouseDetails" : {
        "id" : "View2",
        "name" : "View2"
    }
}`;


const code12 = 
`onInit() {
    //  Extract the details from the Router path.
    const oRouter = UIComponent.getRouterFor(this);
    oRouter.getRoute("DetailView").attachPatternMatched(this._onObjectMatched, this);
},

// method to Bind the selected model data with UI.
_onObjectMatched(oEvent) {
    const id = oEvent.getParameter("arguments").id;

    // Bind the view to the selected entity
    this.getView().bindElement({
        path: "/Warehouses('" + id + "')",
        model: "WarehouseModel"
    });

    MessageToast.show('Details for Warehouse - ' + id);
}`;


const code13 = 
`<mvc:View
    controllerName="manage.warehouse.controller.View2"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page id="page2" title="Warehouse Details" showNavButton="true" navButtonPress="onNavBack">

        <!-- ************************ Page Header ************************  -->
        <ObjectHeader
            title="Warehouse ID - {WarehouseModel>ID}"
            class="sapUiResponsivePadding--header" >
            <statuses>
                <ObjectStatus
                    text="Active"
                    state="Success" />
            </statuses>

        </ObjectHeader>

        <Panel>

            <!-- ************************ Edit / Save / Cancel Buttons ************************ -->
            <HBox justifyContent="End">
                <Button text="Edit" type="Emphasized" visible="{View2Model>/editVisible}" press="onPressEdit" />
                <Button class="sapUiTinyMarginBegin" type="Accept" text="Save" visible="{View2Model>/saveVisible}" press="onPressSave" />
                <Button class="sapUiTinyMarginBegin" type="Reject" text="Cancel" visible="{View2Model>/cancelVisible}" press="onPressCancel" />
            </HBox>
            
            <!-- ************************ Binding Data with UI ************************ -->
            <VBox>
                <Label text="Warehouse Name" />
                <Input id="warehouseNameInput" value="{WarehouseModel>name}" editable="{View2Model>/inputEditable}" />

                <Label text="Owner" />
                <Input id="warehouseOwnerInput" value="{WarehouseModel>owner}" editable="{View2Model>/inputEditable}" />

                <Label text="Location" />
                <Input id="warehouseLocationInput" value="{WarehouseModel>location}" editable="{View2Model>/inputEditable}" />
            </VBox>
        </Panel>

    </Page>
</mvc:View>`;


const code14 = 
`sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"

], (Controller, UIComponent, MessageToast) => {
    "use strict";

    return Controller.extend("manage.warehouse.controller.View2", {

        onInit() {
            //  Extract the details from the Router path.
            const oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("DetailView").attachPatternMatched(this._onObjectMatched, this);
        },

        // method to extract the value from route and Bind the selected data with UI.
        _onObjectMatched(oEvent) {
            const id = oEvent.getParameter("arguments").id;

            // Bind the view to the selected entity
            this.getView().bindElement({
                path: "/Warehouses('" + id + "')",
                model: "WarehouseModel"
            });

            MessageToast.show('Details for Warehouse - ' + id);
        },

        //  Method to Navigate back to View1
        onNavBack: async function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo('RouteView1');
        },

        /*
            Below method will do the following -
            1. Make the Save and Cancel button visible.
            2. Disappear the Edit Button.
            3. Make Input field editable.
        */
        onPressEdit: function (oEvent) {
            this.getView().getModel('View2Model').setProperty('/inputEditable', true);
            this.getView().getModel('View2Model').setProperty('/inputEditable', true);
            this.getView().getModel('View2Model').setProperty('/inputEditable', true);

            this.getView().getModel('View2Model').setProperty('/editVisible', false);
            this.getView().getModel('View2Model').setProperty('/saveVisible', true);
            this.getView().getModel('View2Model').setProperty('/cancelVisible', true);

            MessageToast.show('Edit Enabled');
        },

        /*
            Below method will do the following -
            1. Make the Save and Cancel button disappear.
            2. Visible the Edit Button.
            3. Make Input field non-editable.
        */
        onPressCancel: function (oEvent) {
            this.getView().getModel('View2Model').setProperty('/inputEditable', false);
            this.getView().getModel('View2Model').setProperty('/inputEditable', false);
            this.getView().getModel('View2Model').setProperty('/inputEditable', false);

            this.getView().getModel('View2Model').setProperty('/editVisible', true);
            this.getView().getModel('View2Model').setProperty('/saveVisible', false);
            this.getView().getModel('View2Model').setProperty('/cancelVisible', false);

            MessageToast.show('No changes Saved');
        },

        /*
            This method will do the following -
            1. Get the data of input fields.
            2. Update the data on the backend.
            3. Make Input field editable.
            4. Make the Save and Cancel button disappear.
            5. Visible the Edit Button.
            6. Make Input field non-editable.
        */
        onPressSave: async function (oEvent) {
            const name = this.getView().byId('warehouseNameInput').getValue();
            const owner = this.getView().byId('warehouseOwnerInput').getValue();
            const location = this.getView().byId('warehouseLocationInput').getValue();

            // Update the data on the backend using the OData V2 service model.
            const oModel = this.getView().getModel("WarehouseModel");

            // Get the binding context, which represents the currently bound entity (specific record).
            const oContext = this.getView().getBindingContext("WarehouseModel");

            // Get the path of the bound entity (e.g. /Warehouses('82034810943')).
            const sPath = oContext.getPath();

            const oPayload = {
                name: name,
                owner: owner,
                location: location
            };

            oModel.update(sPath, oPayload, {
                success: function () {
                    MessageToast.show("Warehouse updated successfully");
                },
                error: function () {
                    MessageBox.error("Update failed");
                }
            });

            this.getView().getModel('View2Model').setProperty('/inputEditable', false);
            this.getView().getModel('View2Model').setProperty('/inputEditable', false);
            this.getView().getModel('View2Model').setProperty('/inputEditable', false);

            this.getView().getModel('View2Model').setProperty('/editVisible', true);
            this.getView().getModel('View2Model').setProperty('/saveVisible', false);
            this.getView().getModel('View2Model').setProperty('/cancelVisible', false);

            MessageToast.show('Successfully updated the details');
        }

    });
});`;



const code15 = 
`onInit() {
    const oRouter = UIComponent.getRouterFor(this);
    oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
},

//  Method to update/refresh the binding data with Table as well if User updated the Table row details.
_onPatternMatched: function () {
    const oBinding = this.byId("idWarehouseTable").getBinding("items");
    oBinding.refresh();
},`;


const code16 =
`<!-- ********** Create new Warehouse Entry ********** -->
<HBox justifyContent="End">
    <Button text="New" type="Emphasized" icon="sap-icon://add" press="onPressCreate" />
</HBox>
`;

const code17 =
`onPressCreate : function(){
    const router = UIComponent.getRouterFor(this);
    router.navTo("NewWarehouseView");
}`;

const code18 = 
`"routes": [
    {
        "name": "RouteView1",
        "pattern": ":?query:",
        "target": [
        "TargetView1"
        ]
    },
    {
        "name" : "NewWarehouseView",
        "pattern" : "NewWarehouse",
        "target" : "NewWarehouseTarget"
    },
    {
        "name" : "DetailView",
        "pattern" : "Warehouse/{id}",
        "target" : "WarehouseDetails"
    }
]`;


const code19 = 
`"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "NewWarehouseTarget" : {
        "id": "NewWarehouse",
        "name" : "NewWarehouse"
    },
    "WarehouseDetails" : {
        "id" : "View2",
        "name" : "View2"
    }
}`;



const code20 = 
`<Label text="Name" />
<Input id="name" placeholder="Warehouse Name" />
<Label text="Owner" />
<Input id="owner" placeholder="Warehouse Owner" />
<Label text="Location" />
<Input id="location" placeholder="Warehouse Location" />
<Label text="" />
<Button text="Register" type="Emphasized" press="onRegister" />
<Label text="" />
<Button text="Cancel" type="Reject" press="onCancel" />`;


const code21 = 
`//  Cancel Button logic will Navigate back to View1
onCancel: function () {
    const router = UIComponent.getRouterFor(this);
    router.navTo("RouteView1");
},

/*
    Below method will do the following -
    1. Get the data of Input Fields.
    2. Validate the data.
    3. Get the oData Model details and its binding.
    4. Push the data to db using the odata Model.
    5. Set the Input fields to empty.
    6. Navigate back to View1.
*/
onRegister: async function () {
    const wName = this.getView().byId("name").getValue();
    const wOwner = this.getView().byId("owner").getValue();
    const wLocation = this.getView().byId("location").getValue();

    if (wName.length == 0 || wOwner.length == 0 || wLocation.length == 0) {
        MessageToast.show("Please fill all the details.");
        return;
    }

    const oModel = this.getView().getModel("WarehouseModel");

    const oPayload = {
        name: this.byId("name").getValue(),
        owner: this.byId("owner").getValue(),
        location: this.byId("location").getValue()
    };

    try {
        oModel.create("/Warehouses", oPayload, {
            success: function (oData) {
                MessageToast.show("Warehouse created successfully");
            },
            error: function (oError) {
                MessageBox.error("Failed to create warehouse");
            }
        });

        this.getView().byId("name").setValue("");
        this.getView().byId("owner").setValue("");
        this.getView().byId("location").setValue("");

        //  Navigate back to View1
        this.getOwnerComponent().getRouter().navTo("RouteView1");
    } catch (err) {
        sap.m.MessageBox.error("Failed to create warehouse");
        console.error(err);
    }
}`;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Consume oData v2 service as Model</h1>

        <p className="wrap-break-word">In this example, we will try to consume SAP CAPM oData V4 service as an oData model in a UI5 application and bind it to a Table.</p>

        <p className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">Prerequisite:</span> Ensure that you have installed the OData V2 adapter plugin in your CAP application to expose the OData v2 APIs.</p>

        <div>
            <CodeSnippet code={code0} language="cmd" title="cap Terminal" />
        </div>



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
            <li className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">Service-</span> /odata/v2/custom-service</li>
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

        <p className="text-green-600 font-semibold wrap-break-word">Its done, now we can use the odata model in your UI5 Application.</p>













        <h2 className="text-4xl text-sky-600 wrap-break-word">CRUD Operation with oData v4 model</h2>

        <h3 className="text-3xl wrap-break-word">Objective-</h3>

        <p className="wrap-break-word">In this application, we will create a SAP UI5 application that addresses the following use case-</p>

        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">The first view <span className="text-gray-950 font-semibold wrap-break-word">displays all warehouse details</span> retrieved from the CAP application OData V4 service. The service is <span className="text-gray-950 font-semibold wrap-break-word">consumed as an OData model</span>, which is then bound to a table.</li>    
            <li className="wrap-break-word">Users can <span className="text-gray-950 font-semibold wrap-break-word">click any row in the table to navigate to View2</span>, where they <span className="text-gray-950 font-semibold wrap-break-word">can edit and update the selected warehouse record.</span></li>
            <li className="wrap-break-word">View1 includes an Add New Record button, Clicking this button navigates the user to the <span className="text-gray-950 font-semibold wrap-break-word">NewWarehouse view, where a new warehouse record can be created</span>. Once the record is successfully created, the application automatically redirects the user back to View1.</li>
        </ul>




        <h3 className="text-3xl wrap-break-word">Implementation - </h3>

        <h4 className="text-2xl text-pink-600 wrap-break-word">Use Case - 1</h4>

        <p className="wrap-break-word">We will displays all warehouse details retrieved from the CAP application OData V4 service. The service is consumed as an OData model, which is then bound to a table on View1.</p>

        <p className="wrap-break-word">Since we have already configured the OData V4 service as an <span className="text-gray-950 font-semibold wrap-break-word">OData model named WarehouseModel</span>, we can bind it to the <span className="text-gray-950 font-semibold wrap-break-word">table in View1.view.xml</span>, as shown below -</p>

        <div>
            <CodeSnippet code={code6} language="javascript" title="View1.view.xml" />
        </div>


        <p className="wrap-break-word">So the <span className="text-gray-950 font-semibold wrap-break-word">View1 Table</span> looks like-</p>
        
        <div>
            <CodeSnippet code={code7} language="xml" title="View1.view.xml" />
        </div>


        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/view/View1.view.xml" />
        </div>









        <h4 className="text-2xl text-pink-600 wrap-break-word">Use Case - 2</h4>

        <p className="wrap-break-word">Users can <span className="text-gray-950 font-semibold wrap-break-word">click any row in the table to navigate to View2</span>, which <span className="text-gray-950 font-semibold wrap-break-word">displays the selected warehouse details</span>. View2 allows users to <span className="text-gray-950 font-semibold wrap-break-word">edit and save the changes to the backend through the OData service</span>, and also provides an option to <span className="text-gray-950 font-semibold wrap-break-word">navigate back to View1.</span></p>

        <p className="wrap-break-word">To make the table <span className="text-gray-950 font-semibold wrap-break-word">rows selectable</span> and <span className="text-gray-950 font-semibold wrap-break-word">invoke the selectRow method</span> when a row is selected, define the attributes on <span className="text-gray-950 font-semibold wrap-break-word">View1 Table</span> as follows-</p>

        <div>
            <CodeSnippet code={code8} language="xml" title="View1.view.xml" />
        </div>

        <p className="wrap-break-word">Next, <span className="text-gray-950 font-semibold wrap-break-word">define the selectRow method in View1.controller.js</span> to retrieve the selected warehouse record and <span className="text-gray-950 font-semibold wrap-break-word">navigate to View2</span> using parameterized routing, as shown below-</p>

        <div>
            <CodeSnippet code={code9} language="javascript" title="View1.controller.js" />
        </div>


        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/controller/View1.controller.js" />
        </div>


        <p className="wrap-break-word">Next, <span className="text-gray-950 font-semibold wrap-break-word">create View2.view.xml</span> in view folder and <span className="text-gray-950 font-semibold wrap-break-word">View2.controller.js</span> in controller folder to implement the UI and its corresponding logic. Then, <span className="text-gray-950 font-semibold wrap-break-word">configure the route and target for View2 in manifest.json</span> like-</p>

        <div>
            <CodeSnippet code={code10} language="json" title="manifest.json" />
        </div>

        <div>
            <CodeSnippet code={code11} language="json" title="manifest.json" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/manifest.json" />
        </div>


        <p className="wrap-break-word">Next, implement the logic in <span className="text-gray-950 font-semibold wrap-break-word">View2.controller.js</span> to <span className="text-gray-950 font-semibold wrap-break-word">retrieve the selected warehouse ID</span> from the <span className="text-gray-950 font-semibold wrap-break-word">route parameters.</span></p>
        <p className="wrap-break-word">Once the <span className="text-gray-950 font-semibold wrap-break-word">ID is obtained, bind the corresponding warehouse record</span> to the view using element binding. This ensures that the UI automatically displays the details of the selected warehouse, as shown below-</p>

        <div>
            <CodeSnippet code={code12} language="javascript" title="View2.controller.js" />
        </div>

        



        <p className="wrap-break-word">And we can then bind the UI with the element in <span className="text-gray-950 font-semibold wrap-break-word">View2</span> and the <span className="text-gray-950 font-semibold wrap-break-word">navigation back button</span> at page like-</p>

        <div>
            <CodeSnippet code={code13} language="xml" title="View2.view.xml" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/view/View2.view.xml" />
        </div>

        <p className="wrap-break-word">And since we also defined the Edit, Save and Cancel button, we can then define their logics like-</p>

        <div>
            <CodeSnippet code={code14} language="javascript" title="View2.controller.js" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/controller/View2.controller.js" />
        </div>

        <p className="wrap-break-word">When the user <span className="text-gray-950 font-semibold wrap-break-word">navigates back to View1</span> after updating a warehouse record, the <span className="text-gray-950 font-semibold wrap-break-word">latest changes may not be reflected in the table automatically</span>. To ensure the table displays the updated data, <span className="text-gray-950 font-semibold wrap-break-word">refresh the table's binding whenever the View1 route is matched</span>, as shown below-</p>

        <div>
            <CodeSnippet code={code15} language="javascript" title="View1.controller.js" />
        </div>


        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/controller/View1.controller.js" />
        </div>









        <h4 className="text-2xl text-pink-600 wrap-break-word">Use Case - 3</h4>

        <p className="wrap-break-word"><span className="text-gray-950 font-semibold wrap-break-word">View1 includes an Add New Record button</span>, Clicking this button navigates the user to the <span className="text-gray-950 font-semibold wrap-break-word">NewWarehouse view</span>, where a new warehouse record can be created. Once the record is successfully created, the application automatically redirects the user back to View1.</p>

        <p className="wrap-break-word">Define the Button on <span className="text-gray-950 font-semibold wrap-break-word">View1.view.xml</span> to create new Warehouse Record clicking on which will navigate to NewWarehouse View Page.</p>

        <div>
            <CodeSnippet code={code16} language="xml" title="View1.view.xml" />
        </div>

        <p className="wrap-break-word">and its logic like-</p>
        
        <div>
            <CodeSnippet code={code17} language="javascript" title="View1.controller.js" />
        </div>

        <p className="wrap-break-word">Now, create <span className="text-gray-950 font-semibold wrap-break-word">NewWarehouse.view.xml</span> file in view folder and <span className="text-gray-950 font-semibold wrap-break-word">NewWarehouse.controller.js</span> file in controller folder and define the <span className="text-gray-950 font-semibold wrap-break-word">Route and Target</span> on <span className="text-gray-950 font-semibold wrap-break-word">manifest.json</span> file like-</p>

        <div>
            <CodeSnippet code={code18} language="javascript" title="manifest.json" />
        </div>

        <p className="wrap-break-word">And its target like-</p>

        <div>
            <CodeSnippet code={code19} language="javascript" title="manifest.json" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/manifest.json" />
        </div>


        <p className="wrap-break-word">We can define the Input fields in NewWarehouse View like -</p>

        <div>
            <CodeSnippet code={code20} language="xml" title="NewWarehouse.view.xml" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/view/NewWarehouse.view.xml" />
        </div>



        <p className="wrap-break-word">And will define its logic in <span className="text-gray-950 font-semibold wrap-break-word">NewWarehouse.controller.js</span> file like -</p>

        <div>
            <CodeSnippet code={code21} language="javascript" title="NewWarehouse.controller.js" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/7-odata-v2-service-model/webapp/controller/NewWarehouse.controller.js" />
        </div>


        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>
        

    </div>
  );
};

export default page;