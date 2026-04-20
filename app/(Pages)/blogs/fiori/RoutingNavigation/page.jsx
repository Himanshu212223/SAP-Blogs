import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
const code1 = 
`#/home
#/about`;
const code2 = 
`<Panel>
    <VBox id="view1Vbox1">
        <Text id="view1Text1" text="{i18n>view1Text1}" />
    
        <Text id="view1Text2" text="This is view 1, click the below button to Navigate to View2." />

        <Button id="view1Btn1" text="Move to View2" press="moveToView2" />
    
    </VBox>
</Panel>`;
const code3 = 
`<view2:View
    controllerName="fiori.ui5app.controller.View2"
    xmlns:view2="sap.ui.core.mvc"
    xmlns="sap.m"
>
    <Page id="view2Page" title="{i18n>title}" >
        <Panel>
            <VBox>
                <Text id="view2Text1" text="This is View2" />

                <Button id="view2Btn1" text="Move to View1" press="moveToView1" />
            </VBox>
        </Panel>
    </Page>
</view2:View>`;
const code4 = 
`{
    "name" : "SecondView",
    "pattern" : "second",
    "target" : "SecondViewTarget"
}`;
const code5 = 
`"SecondViewTarget" : {
    "id": "view2Page",
    "name": "View2",
    "transition" : "fade"
}`;
const code6 = 
`"routes": [
    {
        "name": "RouteView1",
        "pattern": "",
        "target": [
        "TargetView1"
        ]
    },
    {
        "name" : "SecondView",
        "pattern" : "second",
        "target" : "SecondViewTarget"
    }
],
"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "SecondViewTarget" : {
        "id": "view2Page",
        "name": "View2",
        "transition" : "fade"
    }      
}`;
const code7 = 
`public moveToView2(oEvent : any) : void {
    console.log('Navigate to View2 from View1');
    const router = UIComponent.getRouterFor(this);
    router.navTo("SecondView");         // as defined on manifest.json
}`;
const code8 = 
`import UIComponent from "sap/ui/core/UIComponent";` ;
const code9 = 
`public moveToView1(): void {
    console.log('Navigate to View1 from View2');
    const router = UIComponent.getRouterFor(this);
    router.navTo('RouteView1');         // as defined on manifest.json
}`;
const code10 = 
`/Employee/104
/Employee/103
/Employee/110`;
const code11 = 
`"routes": [
    {
        "name": "RouteView1",
        "pattern": "",
        "target": [
        "TargetView1"
        ]
    },
    {
        "name" : "EmployeeView",
        "pattern": "Employee/{empId}",
        "target" : "EmployeeTarget"
    }
]`;
const code12 = 
`"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "EmployeeTarget" : {
        "id" : "EmployeePage",
        "name" : "Employee",
        "transition" : "slide"
    }      
}`;
const code13 = 
`public moveToView2(oEvent : any) : void {
    console.log('Navigate to EmployeeView from View1');
    const router = UIComponent.getRouterFor(this);
    router.navTo("EmployeeView", {
        empId : 103
    });         // as defined on manifest.json
}`;
const code14 = 
`/Employee?id=103&name=User3
/Employee?id=105&name=User5`;
const code15 =
`"routes": [
    {
        "name": "RouteView1",
        "pattern": "",
        "target": [
        "TargetView1"
        ]
    },
    {
        "name" : "EmployeeDetails",
        "pattern": "Employee:?query:",
        "target" : "EmployeeDetailsTarget"
    }
]`;
const code16 = 
`"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "EmployeeDetailsTarget" : {
        "id" : "EmployeePage",
        "name" : "Employee",
        "transition" : "slide"
    }      
}`;
const code17 = 
`public moveToView2(oEvent : any) : void {
    console.log('Navigate to EmployeeView from View1');
    const router = UIComponent.getRouterFor(this);
    router.navTo("EmployeeDetails", {
        query: {
            id: 103,
            name: User3
        }
    });         // as defined on manifest.json
}`;
const code18 = 
`<Page id="view2Page" title="{i18n>title}" showNavButton="true" navButtonPress="onNavBack" >` ;
const code19 = 
`//  Navigation Back button logic 
public onNavBack(): void {
    var oHistory = History.getInstance();
    var sPreviousHash = oHistory.getPreviousHash();

    if (sPreviousHash !== undefined) {
        window.history.go(-1);
    } else {
        (this.getOwnerComponent() as UIComponent).getRouter()?.navTo("home", {}, true);
    }
}`;
const code20 = 
`import History from "sap/ui/core/routing/History";`;






  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">Routing and Navigation</h1>

        <ul className="list-disc ml-6">
            <li><span className="text-gray-950 font-semibold">Routing</span> defines the mapping between URL patterns and views in the application and is configured in manifest.json.</li>
            <li><span className="text-gray-950 font-semibold">Navigation</span> is the process of programmatically moving between those routes using logic defined in the controller.</li>
        </ul>



        <h2 className="text-4xl">Different types of Routing</h2>

        <h3 className="text-3xl">1. Static Routing</h3>
        <ul className="list-disc ml-6">
            <li>Static routing in UI5 is a routing mechanism where navigation happens without passing any parameters, and a fixed view is loaded based on a predefined URL pattern.</li>
            <li>It is triggered automatically on app load.</li>
        </ul>
        <p>The URL is fixed and looks something like below -</p>
        <div>
            <CodeSnippet code={code1} language="md" title="URL example -" />
        </div>


        <h3 className="text-3xl">How to Implement ..?</h3>
        <p>We will create a View (View1) that contains a button, and upon clicking that button, the application will navigate to another view called (View2).</p>

        <h4 className="text-2xl">Step 1 - Define View1</h4>

        <p>You can use your default or root view (in our case, its View1 which created by default while creating the applicaiton).</p>
        <p>Create a button that navigates to View2 and attach an event handler to trigger the navigation.</p>
        <div>
            <CodeSnippet code={code2} language="xml" title="View1.view.xml" />
        </div>


        <h4 className="text-2xl">Step 2 - Define View2</h4>

        <p>Create another view (View2) on your view folder like below - </p>
        <div>
            <CodeSnippet code={code3} language="xml" title="View1.view.xml" />
        </div>



        <h4 className="text-2xl">Step 3 - Define Routes and Target on manifest.json</h4>

        <p>Since routes are defined in the manifest.json file, we will add View2 to the <span className="text-gray-950 font-semibold">routes array of manifest.json</span> and assign a corresponding target to it.</p>
        <p>You can also observe that the route for our root view (RouteView1) is already defined there.</p>
        <p>In our case, we have created a second view named View2, and we will define its route with the name SecondView like below -</p>
        <div>
            <CodeSnippet code={code4} language="json" title="manifest.json" />
        </div>

        <p>And since we have given target name as SecondViewTarget, so we will define the same on targets object like below - </p>
        <div>
            <CodeSnippet code={code5} language="json" title="manifest.json" />
        </div>

        <p>Here - </p>
        <ul className="list-disc ml-6">
            <li>view2Page is the id of Page on view2.</li>
            <li>View2 is the name of the file.</li>
            <li>Transition defines how the view will change.</li>
        </ul>

        <p>So the manifest.json routes and target will look like below - </p>
        <div>
            <CodeSnippet code={code6} language="json" title="manifest.json" />
        </div>


        <h4 className="text-2xl">Step 4 - Define Navigation logic on Controller file</h4>

        <p>Now, we will define the button logic of Controller file of View1 for Navigation.</p>
        <div>
            <CodeSnippet code={code7} language="typescript" title="View1.controller.ts" />
        </div>

        <p>Make sure to import the Module - </p>
        <div>
            <CodeSnippet code={code8} language="typescript" title="View1.controller.ts" />
        </div>

        <p>And we can define a similar logic on view2 controller for button defined on view2 - </p>
        <div>
            <CodeSnippet code={code9} language="typescript" title="View2.controller.ts" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/4-routing-navigation" />
        </div>



        <h3 className="text-3xl">2. Parameterized Routing (Dynamic Routing)</h3>

        <p>In Parameterized Routing, we pass the parameters in the URL.</p>
        
        <p>The URL is variable and looks something like below -</p>
        <div>
            <CodeSnippet code={code10} language="md" title="URL example -" />
        </div>

        <p>In this case, we configure the parameter on the <span className="text-gray-950 font-semibold">pattern of the route on routes array on manifest.json</span> like below - </p>
        <div>
            <CodeSnippet code={code11} language="json" title="manifest.json" />
        </div>

        
        <p>targets section will be similar to static route itself like - </p>
        <div>
            <CodeSnippet code={code12} language="json" title="manifest.json" />
        </div>
        
        <p>And we will pass the parameter (in our case empId) on the controller logic like - </p>
        <div>
            <CodeSnippet code={code13} language="typescript" title="View1.controller.ts" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/4-routing-navigation" />
        </div>






        <h3 className="text-3xl">3. Query Parameter Routing (Dynamic Routing)</h3>

        <p>In Query Parameter Routing, parameters are passed as query strings in the URL.</p>
        
        <p>The URL is variable and looks something like below -</p>
        <div>
            <CodeSnippet code={code14} language="md" title="URL example -" />
        </div>

        <p>In this case, we configure the query parameter on the <span className="text-gray-950 font-semibold">pattern of the route on routes array on manifest.json</span> like below - </p>
        <div>
            <CodeSnippet code={code15} language="json" title="manifest.json" />
        </div>

        
        <p>targets section will be similar to static route itself like - </p>
        <div>
            <CodeSnippet code={code16} language="json" title="manifest.json" />
        </div>
        
        <p>And we will pass the query parameter on the controller logic like - </p>
        <div>
            <CodeSnippet code={code17} language="typescript" title="View1.controller.ts" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/4-routing-navigation" />
        </div>




        <h3 className="text-3xl">How to Navigate Back using back button ..?</h3>

        <p>We can enable the Back button on Page by defining <span className="text-gray-950 font-semibold">showNavButton and navButtonPress properties</span> like - </p>

        <div>
            <CodeSnippet code={code18} language="xml" title="View2.view.xml" />
        </div>


        <p>And can define its logic on respective controller like - </p>
        <div>
            <CodeSnippet code={code19} language="typescript" title="View2.controller.ts" />
        </div>

        <p>And make sure to import History module.</p>
        <div>
            <CodeSnippet code={code20} language="typescript" title="View2.controller.ts" />
        </div>



        <span className="text-gray-950 font-semibold">!!!! Done !!!!</span>

        
        
        
    </div>
  );
};

export default page;
