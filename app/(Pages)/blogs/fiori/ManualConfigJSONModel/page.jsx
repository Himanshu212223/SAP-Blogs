import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

// Code Snippet
const code1 = 
`{
  "sampleData": "This data is coming from MySampleModel JSON Data"
}
`;
const code2 = 
`"MySampleModel" : {
    "type": "sap.ui.model.json.JSONModel",
    "uri": "model/MyModel.json"
}
`;
const code3 = `<Button id="view1Btn2" text="Show Model Data - SampleData" press="onShowModelData" />` ;
const code4 = 
`public onShowModelData() : void {
    interface ContentObject {
        sampleData : string
    }

    const myModel = this.getView()?.getModel("MySampleModel") as JSONModel ;
    const modelData = myModel.getData() as ContentObject;

    MessageToast.show(modelData.sampleData);
}`;
    

//   UI
  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">Manual Configuration of JSON Model</h1>

        <p>We will set up the JSON model manually on the app, store data on the model and show it on Button click.</p>

        <div><RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/3-config-json-model-manually" /></div>

        <p>The objective is to configure a JSON model with the UI5 App. Then, on a button click the data will be retrieved from the model and displayed in a popup.</p>

        <p>We will be following below steps-</p>

        <ul className="list-decimal ml-6">
            <li>Create JSON File for JSON Model.</li>
            <li>Configure the JSON Model on manifest file.</li>
            <li>Create Button on View to show data.</li>
            <li>Define Button logic on Controller.</li>
        </ul>

        




        <h3 className="text-3xl">Step 1 - Create JSON File for JSON Model.</h3>

        <p>Create a JSON File inside <span className="text-gray-950 font-semibold">model folder</span> and add data to it.</p>

        <p>In our case, we created a file named MyModel.json within the model folder and populated it with the following sample data.</p>

        <div>
            <CodeSnippet code={code1} language="json" title="model/MyModel.json" />
        </div>





        <h3 className="text-3xl">Step 2 - Configure the JSON Model on manifest file.</h3>

        <p>Define the created JSON file as a JSON model in the <span className="text-gray-950 font-semibold">manifest.json</span> file under the <span className="text-gray-950 font-semibold">models</span> section.</p>

        <p>In our case, we want to use the JSON model file with the name &quot;MySampleModel&quot;, so we define it in the manifest.json file as shown below.</p>

        <div>
            <CodeSnippet code={code2} language="json" title="manifest.json" />
        </div>

        <div><RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/3-config-json-model-manually/webapp/manifest.json" /></div>

        <p>And that is it, our JSON Model has been configured. Now lets try to use it.</p>





        <h3 className="text-3xl">Step 3 - Create Button on View.</h3>

        <p>Create a button in <span className="text-gray-950 font-semibold">View1.view.xml</span> that, when clicked, reads data from the model and displays it in a popup.</p>

        <div>
            <CodeSnippet code={code3} language="xml" title="View1.view.xml" />
        </div>

        <div><RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/3-config-json-model-manually/webapp/view/View1.view.xml" /></div>
        






        <h3 className="text-3xl">Step 4 - Define Button logic on Controller.</h3>

        <p>Define the Button event logic on <span className="text-gray-950 font-semibold">View1.controller.ts</span> to read and display the JSON Model data on popup.</p>

        <div>
            <CodeSnippet code={code4} language="typescript" title="View1.controller.ts" />
        </div>

        <div><RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/3-config-json-model-manually/webapp/controller/View1.controller.ts" /></div>


        <p>!!!! And its done !!!!</p>

        
    </div>
  )
}

export default page