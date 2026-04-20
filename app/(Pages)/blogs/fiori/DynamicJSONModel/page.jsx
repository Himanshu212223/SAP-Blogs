import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

// Code Sneppit
const code1 = `import JSONModel from "sap/ui/model/json/JSONModel";`;
const code2 = 
`public onInit(): void {
    const MyModel = new JSONModel();
    this.getView()?.setModel(MyModel, "MySampleModel");
}`;
const code3 = 
`{
    "sampleData" : "This data is coming from MySampleModel JSON Data"
}`;
const code4 = 
`public onSetData(): void {

    // Since we are using TypeScript, Lets define the interface for object
    interface ContentObject {
        sampleData : string
    }

    //  using the same interface, create an json object
    let content: ContentObject = {
        'sampleData': 'This data is coming from MySampleModel JSON Data'
    };

    //  get the Model from the view.
    const myModel = this.getView()?.getModel('MySampleModel') as JSONModel;

    //  if model exist, set the data created above.
    if (myModel) {
        myModel.setData(content);
    }

    MessageToast.show("SampleData has been set successfully on MySampleModel");
}`;

const code5 = 
`public onShowModelData() : void {
    interface ContentObject {
        sampleData : string
    }

    const myModel = this.getView()?.getModel("MySampleModel") as JSONModel ;
    const modelData = myModel.getData() as ContentObject;

    MessageToast.show(modelData.sampleData);
}`;

const code6 = 
`import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace fiori.ui5app.controller
 */
export default class View1 extends Controller {

    public onInit(): void {
        const MyModel = new JSONModel();
        this.getView()?.setModel(MyModel, "MySampleModel");
    }

    public onSetData(): void {

        // Lets define the interface for object
        interface ContentObject {
            sampleData : string
        }

        //  using the same interface, create an json object
        let content: ContentObject = {
            'sampleData': 'This data is coming from MySampleModel JSON Data'
        };

        //  get the Model from the view.
        const myModel = this.getView()?.getModel('MySampleModel') as JSONModel;

        //  if model exist, set the data created above.
        if (myModel) {
            myModel.setData(content);
        }

        MessageToast.show("SampleData has been set successfully on MySampleModel");
    }


    public onShowModelData() : void {
        interface ContentObject {
            sampleData : string
        }

        const myModel = this.getView()?.getModel("MySampleModel") as JSONModel ;
        const modelData = myModel.getData() as ContentObject;

        MessageToast.show(modelData.sampleData);
    }
}
`;
const code7 = 
`<Button id="view1Btn1" text="Set Data on JSON Model" press="onSetData" />
<Button id="view1Btn2" text="Show Model Data - SampleData" press="onShowModelData" />`



//   Rendered UI 
  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">Dynamic Configuration of JSON Model with Fiori UI5 App</h1>

        <p>We will set up the JSON model within the controller, store data on the model and show it on Button click.</p>
        <div><RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/2-config-json-model-dynamically" /></div>

        <p>The objective is to create a JSON model as soon as the controller loads. Then, on a button click, data is set into the same model, and on another button click, the data is retrieved from the model and displayed in a popup.</p>

        <p>We will be following below steps-</p>

        <ul className="list-decimal ml-6">
            <li>Create JSON Model with no data and set it to the view.</li>
            <li>Create method which will set data on the model.</li>
            <li>Create method which will read the data from model.</li>
            <li>Create Buttons on View to set and show data.</li>
        </ul>





        <h3 className="text-3xl">Step 1 - Create JSON Model and set it to the view</h3>

        <p>We will create the JSON Model on <span className="text-gray-950 font-semibold">onInit</span> method on controller as the <span className="text-gray-950 font-semibold">onInit method runs automatically when the controller is instantiated</span>, which happens right after the view is created and its controls are initialized.</p>

        <p>Since we are using TypeScript, so in our case the controller is - View1.controller.ts</p>

        <p>Import the JSONModel Module - </p>
        <div>
            <CodeSnippet code={code1} language="typescript" title="View1.controller.ts" />
        </div>

        <p>Now on onInit method, create a JSON Model and set it to the View.</p>

        <p>In our case, we want to create a model - MyModel and use it with the name &quot;MySampleModel&quot;, so we will set the model to the view using this same name.</p>
        <div>
            <CodeSnippet code={code2} language="typescript" title="View1.controller.ts" />
        </div>





        <h3 className="text-3xl">Step 2 - Create method which will set data on the model</h3>

        <p>We wants to set the below data on the JSON Model.</p>
        <div>
            <CodeSnippet code={code3} language="typescript" title="JSON Data" />
        </div>

        <p>In our case we will create onSetData method which will set the above data on MySampleModel JSON Model.</p>
        <div>
            <CodeSnippet code={code4} language="typescript" title="View1.controller.ts" />
        </div>





        <h3 className="text-3xl">Step 3 - Create method which will read the data from model</h3>

        <p>Now we want to define a method which will read data from the JSON Model and it will work based on button click.</p>
        <div>
            <CodeSnippet code={code5} language="typescript" title="View1.controller.ts" />
        </div>


        {/* <p>So your Controller will look like below - </p> */}
        {/* <div>
            <CodeSnippet code={code6} language="typescript" title="View1.controller.ts" />
        </div> */}

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/2-config-json-model-dynamically/webapp/controller/View1.controller.ts" />
        </div>





        <h3 className="text-3xl">Step 4 - Create Buttons on View to set and show data</h3>

        <p>Since we want to store data in the JSON model on one button click and then read that data to display it in a popup on another button click, we will define these buttons in the View1.view.xml file and bind the corresponding methods to their events.</p>

        <div>
            <CodeSnippet code={code7} language="xml" title="View1.view.xml" />
        </div>

        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/2-config-json-model-dynamically/webapp/view/View1.view.xml" />
        </div>


        <p>!!!! And, its Done !!!!</p>
        
        
    </div>
  );
};

export default page;
