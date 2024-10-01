import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";

const sample1 = () => {
    return (
        <div className="indexing">
            <h1 className="headline">Configure JSON Model with Fiori UI5 Application</h1>


            <p className="paragraph">
                We will try to connect our Fiori Application to JSON Model.
            </p>

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                To connect our Fiori UI5 application with JSON Model, we need to first create JSON file in our model.
            </p>

            <p className="list">
                1. Go to your Fiori Application and on Model folder, create a JSON file (say we are creating SampleModel.json).
            </p>

            <Image src="/resources/createModel.png" width={200} height={200} alt="Picture of the author" />


            <p className="list">
                2. Now, go to <span className="tomato">manifest.json</span> file, and on models, add the following code.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
"DataModel":{
    "type": "sap.ui.model.json.JSONModel",
    "uri": "model/SampleModel.json"
}
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                Here, DataModel is the name we will use to call the Json Model, and inside the uri we are providing the address of the json model.
            </p>

            <p className="paragraph">
                So, now your models section will look like this -
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
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
                    `
                }
            </SyntaxHighlighter>


            <p className="paragraph deepPink">
                Hence, the JSON Model is now connected with Fiori UI5 Application.
            </p>

            <h3 className="heading">Lets use this JSON Model in Fiori UI5 Application</h3>

            <p className="paragraph">
                Lets first create an input field on our View and some button to submit (store the input data into Model) and then fetch the same stored data from Model.
            </p>

            <p className="list">
                1. Add the below code in your <span className="tomato"> view xml </span> file.
            </p>


            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<VBox >
  <Input id="textInput" type="Text" placeholder="Enter a Text." />
  <Button id="submitButton" press="submitData" text="Submit" />

  <Button id="fetchData" press="fetchData" text="Fetch Model Data" />
  <Text id="showModelData" />
</VBox>
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                2. Add the below code in your <span className="tomato"> controller </span> file.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
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
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                And, it is done. You can use this JSON Model in your Fiori UI5 Application.
            </p>

            {/* <PrismLoader /> */}


        </div>
    );
}

export default sample1;