import PrismLoader from "@/Components/prism-loader";
import Image from "next/image";

const sample1 = () => {
    return (
        <div className="indexing">
            <h1 className="headline">Connect Fiori Application to JSON Model</h1>

            <h3 className="heading">Objective</h3>

            <p className="paragraph">
                We will try to connect our Fiori Application to JSON Model.
            </p>

            <h3 className="heading">Procedure</h3>

            <p className="paragraph">
                To connect our Fiori UI5 application with JSON Model, we need to first create JSON file in our model.
            </p>

            <ul>
                <li className="list">
                    1. Go to your Fiori Application and on Model folder, create a JSON file (say we are creating SampleModel.json).
                </li>
            </ul>

            <Image src="/resources/createModel.png" width={200} height={200} alt="Picture of the author" />

            <ul>
                <li className="list">
                    2. Now, go to <span className="tomato">manifest.json</span> file, and on models, add the following code.
                </li>
            </ul>

            <pre className="flex-column">
                <code className="language-js">
                    &#x22;DataModel&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                    &#x22;type&#x22;: &#x22;sap.ui.model.json.JSONModel&#x22;,
                </code>

                <code className="language-js">
                    &#x22;uri&#x22;: &#x22;model/SampleModel.json&#x22;
                </code>

                <code className="language-js">
                    &#x7d;
                </code>
            </pre>

            <p className="paragraph">
                Here, DataModel is the name we will use to call the Json Model, and inside the uri we are providing the address of the json model.
            </p>

            <p className="paragraph">
                So, now your models section will look like this -
            </p>

            <pre className="flex-column">
                <code className="language-js">
                    &#x22;models&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                    &#x22;i18n&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                    &#x22;type&#x22;: &#x22;sap.ui.model.resource.ResourceModel&#x22;,
                </code>

                <code className="language-js">
                    &#x22;settings&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                    &#x22;bundleName&#x22;: &#x22;basic.sap.i18n.i18n&#x22;
                </code>

                <code className="language-js">
                    &#x7d;
                </code>

                <code className="language-js">
                    &#x7d;&#x2c;
                </code>

                <code className="language-js">
                    &#x22;DataModel&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                    &#x22;type&#x22;: &#x22;sap.ui.model.json.JSONModel&#x22;,
                </code>

                <code className="language-js">
                    &#x22;uri&#x22;: &#x22;model/SampleModel.json&#x22;
                </code>

                <code className="language-js">
                    &#x7d;
                </code>

                <code className="language-js">
                    &#x7d;&#x2c;
                </code>
            </pre>

            <p className="paragraph green">
                Hence, the JSON Model is now connected with Fiori UI5 Application.
            </p>

            <h3 className="heading">Lets use this JSON Model in Fiori UI5 Application</h3>

            <p className="paragraph">
                Lets first create an input field on our View and some button to submit (store the input data into Model) and then fetch the same stored data from Model.
            </p>

            <ul>
                <li className="list">
                    1. Add the below code in your <span className="tomato"> view xml </span> file.
                </li>
            </ul>

            <pre className="flex-column">
                {/* <VBox >
                <Input id="textInput" type="Text" placeholder="Enter a Text." />
                <Button id="submitButton" press="submitData" text="Submit" />

                <Button id="fetchData" press="fetchData" text="Fetch Model Data" />
                <Text id="showModelData" />
                </VBox> */}
                <code className="language-xml">
                    &#x3c;&#x56;&#x42;&#x6f;&#x78;&#x20;&#x3e;
                </code>
                <code>
                    &nbsp;&nbsp;&#x3c;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x20;&#x69;&#x64;&#x3d;&#x22;&#x74;&#x65;&#x78;&#x74;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x22;&#x20;&#x74;&#x79;&#x70;&#x65;&#x3d;&#x22;&#x54;&#x65;&#x78;&#x74;&#x22;&#x20;&#x70;&#x6c;&#x61;&#x63;&#x65;&#x68;&#x6f;&#x6c;&#x64;&#x65;&#x72;&#x3d;&#x22;&#x45;&#x6e;&#x74;&#x65;&#x72;&#x20;&#x61;&#x20;&#x54;&#x65;&#x78;&#x74;&#x2e;&#x22;&#x20;&#x2f;&#x3e;
                </code>
                <code>
                    &nbsp;&nbsp;&#x3c;&#x42;&#x75;&#x74;&#x74;&#x6f;&#x6e;&#x20;&#x69;&#x64;&#x3d;&#x22;&#x73;&#x75;&#x62;&#x6d;&#x69;&#x74;&#x42;&#x75;&#x74;&#x74;&#x6f;&#x6e;&#x22;&#x20;&#x70;&#x72;&#x65;&#x73;&#x73;&#x3d;&#x22;&#x73;&#x75;&#x62;&#x6d;&#x69;&#x74;&#x44;&#x61;&#x74;&#x61;&#x22;&#x20;&#x74;&#x65;&#x78;&#x74;&#x3d;&#x22;&#x53;&#x75;&#x62;&#x6d;&#x69;&#x74;&#x22;&#x20;&#x2f;&#x3e;
                </code>
                <br />
                <code>
                    &nbsp;&nbsp;&#x3c;&#x42;&#x75;&#x74;&#x74;&#x6f;&#x6e;&#x20;&#x69;&#x64;&#x3d;&#x22;&#x66;&#x65;&#x74;&#x63;&#x68;&#x44;&#x61;&#x74;&#x61;&#x22;&#x20;&#x70;&#x72;&#x65;&#x73;&#x73;&#x3d;&#x22;&#x66;&#x65;&#x74;&#x63;&#x68;&#x44;&#x61;&#x74;&#x61;&#x22;&#x20;&#x74;&#x65;&#x78;&#x74;&#x3d;&#x22;&#x46;&#x65;&#x74;&#x63;&#x68;&#x20;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x20;&#x44;&#x61;&#x74;&#x61;&#x22;&#x20;&#x2f;&#x3e;
                </code>
                <code>
                    &nbsp;&nbsp;&#x3c;&#x54;&#x65;&#x78;&#x74;&#x20;&#x69;&#x64;&#x3d;&#x22;&#x73;&#x68;&#x6f;&#x77;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x44;&#x61;&#x74;&#x61;&#x22;&#x20;&#x2f;&#x3e;
                </code>
                <code>
                    &#x3c;&#x2f;&#x56;&#x42;&#x6f;&#x78;&#x3e;
                </code>

            </pre>

            <ul>
                <li className="list">
                    2. Add the below code in your <span className="tomato"> controller </span> file.
                </li>
            </ul>

            <pre className="flex-column">

                {/* onInit: function () {

                },

                submitData : function(){
                    let inputText = this.byId("textInput").getValue();

                    let modelContent = 
                        {
                            "userInput" : inputText
                        }

                    this.getOwnerComponent().getModel("DataModel").setData(modelContent, "userInput");
                    debugger
                },

                fetchData : function () {
                    let dataModel = this.getOwnerComponent().getModel("DataModel").getData();
                    let {userInput} = dataModel;
                    
                    this.byId("showModelData").setText(userInput)
                    debugger
                }


                }); */}

                <code className="language-js">
                    &#x6f;&#x6e;&#x49;&#x6e;&#x69;&#x74;&#x3a;&#x20;&#x66;&#x75;&#x6e;&#x63;&#x74;&#x69;&#x6f;&#x6e;&#x20;&#x28;&#x29;&#x20;&#x7b;
                </code>
                <code className="language-js">
                    &#x7d;&#x2c;
                </code>
                <br />
                <code className="language-js">
                    &#x73;&#x75;&#x62;&#x6d;&#x69;&#x74;&#x44;&#x61;&#x74;&#x61;&#x20;&#x3a;&#x20;&#x66;&#x75;&#x6e;&#x63;&#x74;&#x69;&#x6f;&#x6e;&#x28;&#x29;&#x7b;
                </code>
                <code className="language-js">
                    &nbsp;&#x6c;&#x65;&#x74;&#x20;&#x69;&#x6e;&#x70;&#x75;&#x74;&#x54;&#x65;&#x78;&#x74;&#x20;&#x3d;&#x20;&#x74;&#x68;&#x69;&#x73;&#x2e;&#x62;&#x79;&#x49;&#x64;&#x28;&#x22;&#x74;&#x65;&#x78;&#x74;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x22;&#x29;&#x2e;&#x67;&#x65;&#x74;&#x56;&#x61;&#x6c;&#x75;&#x65;&#x28;&#x29;&#x3b;
                </code>
                <code className="language-js">
                    &nbsp;&#x6c;&#x65;&#x74;&#x20;&#x6d;&#x6f;&#x64;&#x65;&#x6c;&#x43;&#x6f;&#x6e;&#x74;&#x65;&#x6e;&#x74;&#x20;&#x3d;&#x20;&#x7b;
                </code>
                <code className="language-js">
                    &nbsp;&nbsp;&#x22;&#x75;&#x73;&#x65;&#x72;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x22;&#x20;&#x3a;&#x20;&#x69;&#x6e;&#x70;&#x75;&#x74;&#x54;&#x65;&#x78;&#x74;
                </code>
                <code className="language-js">
                    &nbsp;&#x7d;
                </code>
                <code className="language-js">
                    &nbsp;&#x74;&#x68;&#x69;&#x73;&#x2e;&#x67;&#x65;&#x74;&#x4f;&#x77;&#x6e;&#x65;&#x72;&#x43;&#x6f;&#x6d;&#x70;&#x6f;&#x6e;&#x65;&#x6e;&#x74;&#x28;&#x29;&#x2e;&#x67;&#x65;&#x74;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x28;&#x22;&#x44;&#x61;&#x74;&#x61;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x22;&#x29;&#x2e;&#x73;&#x65;&#x74;&#x44;&#x61;&#x74;&#x61;&#x28;&#x6d;&#x6f;&#x64;&#x65;&#x6c;&#x43;&#x6f;&#x6e;&#x74;&#x65;&#x6e;&#x74;&#x2c;&#x20;&#x22;&#x75;&#x73;&#x65;&#x72;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x22;&#x29;&#x3b;
                </code>
                <code className="language-js">
                    &#x7d;&#x2c;
                </code>
                <br />
                <code className="language-js">
                    &#x66;&#x65;&#x74;&#x63;&#x68;&#x44;&#x61;&#x74;&#x61;&#x20;&#x3a;&#x20;&#x66;&#x75;&#x6e;&#x63;&#x74;&#x69;&#x6f;&#x6e;&#x20;&#x28;&#x29;&#x20;&#x7b;
                </code>
                <code className="language-js">
                    &nbsp;&#x6c;&#x65;&#x74;&#x20;&#x64;&#x61;&#x74;&#x61;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x20;&#x3d;&#x20;&#x74;&#x68;&#x69;&#x73;&#x2e;&#x67;&#x65;&#x74;&#x4f;&#x77;&#x6e;&#x65;&#x72;&#x43;&#x6f;&#x6d;&#x70;&#x6f;&#x6e;&#x65;&#x6e;&#x74;&#x28;&#x29;&#x2e;&#x67;&#x65;&#x74;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x28;&#x22;&#x44;&#x61;&#x74;&#x61;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x22;&#x29;&#x2e;&#x67;&#x65;&#x74;&#x44;&#x61;&#x74;&#x61;&#x28;&#x29;&#x3b;
                </code>
                <code className="language-js">
                    &nbsp;&#x6c;&#x65;&#x74;&#x20;&#x7b;&#x75;&#x73;&#x65;&#x72;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x7d;&#x20;&#x3d;&#x20;&#x64;&#x61;&#x74;&#x61;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x3b;
                </code>
                <code className="language-js">
                    &nbsp;&#x74;&#x68;&#x69;&#x73;&#x2e;&#x62;&#x79;&#x49;&#x64;&#x28;&#x22;&#x73;&#x68;&#x6f;&#x77;&#x4d;&#x6f;&#x64;&#x65;&#x6c;&#x44;&#x61;&#x74;&#x61;&#x22;&#x29;&#x2e;&#x73;&#x65;&#x74;&#x54;&#x65;&#x78;&#x74;&#x28;&#x75;&#x73;&#x65;&#x72;&#x49;&#x6e;&#x70;&#x75;&#x74;&#x29;&#x3b;
                </code>
                <code className="language-js">
                    &#x7d;
                </code>


            </pre>

            <p className="paragraph">
                And, it is done. You can use this JSON Model in your Fiori UI5 Application.
            </p>

            <PrismLoader />
        </div>
    );
}

export default sample1;