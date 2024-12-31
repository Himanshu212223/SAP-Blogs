import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {
    return (
        <div className="indexing">
            <h1 className="headline">Configure JSON Model with Fiori UI5 Application Dynamically</h1>


            <p className="paragraph">
                We will try to connect our Fiori Application to JSON Model.
            </p>

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                To connect our Fiori UI5 application with JSON Model, follow the below steps.
            </p>

            <p className="list">
                1. Go to your Fiori Application and on <span className="tomato">Controller.view.js</span> file, add the below library on <span className="tomato">sap.ui.define</span>.
            </p>

            {/* <Image src="/resources/createModel.png" width={200} height={200} alt="Picture of the author" /> */}

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`"sap/ui/model/json/JSONModel"`
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                So, <span className="tomato">sap.ui.define</span> looks like below.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`
sap.ui.define([
    "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
],
`
                }
            </SyntaxHighlighter>

            <p className="list">
                2. Now, pass the JSONModel argument on the main function.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`function (Controller, JSONModel) {`
                }
            </SyntaxHighlighter>

            <p className="list">
                3. Now, lets create method to create and set model.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
createJSONModel : function () {
    //  Create an array which will contain all the objects.
    let dataArray = [] ;

    //  Lets create an object.
    let content = {
        'name' : 'User1',
        'email' : 'user.email@email.com'
    };

    //  Push the object on the array.
    dataArray.push(content);

    //  lets create the JSON Model and add the Array Data.
    const myModel = new JSONModel(dataArray) ;

    //  At the end, set the model to the view.
    this.getView().setModel(myModel, "myModel") ;

    //  We can use the below line to use the created Model.
    let getMyModel = this.getView().getModel("myModel").getData();
            
}
    `
                }
            </SyntaxHighlighter>


            <p className="paragraph">
                So, the Controller will look like below.
            </p>

            
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("basic.sap.controller.View1", {
        onInit: function () {
        },

        createJSONModel : function () {
            //  Create an array which will contain all the objects.
            let dataArray = [] ;

            //  Lets create an object.
            let content = {
                'name' : 'User1',
                'email' : 'user.email@email.com'
            };

            //  Push the object on the array.
            dataArray.push(content);

            //  lets create the JSON Model and add the Array Data.
            const myModel = new JSONModel(dataArray) ;

            //  At the end, set the model to the view.
            this.getView().setModel(myModel, "myModel") ;

            //  We can use the below line to use the created Model.
            let getMyModel = this.getView().getModel("myModel").getData();
            
        },

    });
});
                    `
                }
            </SyntaxHighlighter>

            
            <p className="deepPink">
                And, it is done. You can use this JSON Model in your Fiori UI5 Application.
            </p>

            {/* <PrismLoader /> */}


        </div>
    );
}

export default sample1;