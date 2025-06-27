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
            <h1>Configure JSON Model with Fiori UI5 Application</h1>

            <div className='content'>

                <p>In this example, we will connect a JSON model to an input field. The input value will be saved to the JSON model and displayed in a text element when a button is clicked.</p>

                <p>We will be following below steps-</p>

                <ul className='list'>
                    <ol>1. Create a JSON File on model folder.</ol>
                    <ol>2. Configure the JSON model on manifest.json file.</ol>
                    <ol>3. Create Input field, buttons and Text field on the view file.</ol>
                    <ol>4. Define the function linked to the button inside the controller file.</ol>
                </ul>

                <h2>Step 1 - Create a JSON File on model folder</h2>

                <p>In <span className='highlight'>model folder</span> create a JSON File (for example we have created SampleModel.json file).</p>

                <Image src="/resources/createModel.png" width={200} height={200} alt="Picture of the author" priority />

                <h2>Step 2 - Configure the JSON model on manifest.json file</h2>

                <p>Next, open the <span className="highlight">manifest.json</span> file and define the JSON Model under model section.</p>


                <CodeBlock code={`
"DataModel":{
    "type": "sap.ui.model.json.JSONModel",
    "uri": "model/SampleModel.json"
}
                `} language="javascript" />

                <p>In this case, <span className='highlight'>DataModel</span>  is the identifier used to reference the JSON model, and the uri specifies the path to the JSON file.</p>


                <p>
                    As a result, your models section will now appear as follows:
                </p>

                <CodeBlock code={`
"models":{
    "i18n":{
        "type": "sap.ui.model.resource.ResourceModel",
        "settings":{
            "bundleName": "basic.sap.i18n.i18n"
        }
    },
    "DataModel":{
        "type": "sap.ui.model.json.JSONModel",
        "uri": "model/SampleModel.json"
    }
},
                `} language="javascript" />

                <p>
                    With this, the JSON model is now successfully integrated into the Fiori UI5 application.
                </p>

                <h2>Step 3 - Create Input field, buttons and Text field on the view file</h2>

                <p>
                    In the <span className='highlight'>view.xml file</span>, add an input field and a button. Also Configure the button to retrieve data from the model, and include a text field to display the retrieved information.
                </p>

                <CodeBlock code={`
<VBox >
  <Input id="textInput" type="Text" placeholder="Enter a Text." />
  <Button id="submitButton" press="submitData" text="Submit" />

  <Button id="fetchData" press="fetchData" text="Fetch Model Data" />
  <Text id="showModelData" />
</VBox>
                `} language="xml" />


                <h2>Step 4 - Define the function linked to the button inside the controller file</h2>

                <p>In the <span className='highlight'>controller.js file</span>, implement the methods that handle the button functionality.</p>

                <CodeBlock code={`
onInit: function () {
},

submitData : function(){
    let inputText = this.byId("textInput").getValue();
    let modelContent = {
        "userInput" : inputText
    }
                        
    this.getOwnerComponent().getModel("DataModel").setData(modelContent, "userInput");
},

fetchData : function () {
    let dataModel = this.getOwnerComponent().getModel("DataModel").getData();
    let {userInput} = dataModel;
    this.byId("showModelData").setText(userInput);
}
                `} language="javascript" />


                <p>And it is done !!!</p>


            </div>

        </main>
    );
}

export default page;