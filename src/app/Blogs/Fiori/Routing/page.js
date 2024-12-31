import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {


    const uri = '`/${destinationName}/${additionalURI}`' ;
    const additionalURI = '`auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}`' ;
    const completeURL = 'https://auditlog-management.cfapps.us10.hana.ondemand.com/auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}' ;


    return (
        <div className="indexing">
            <h1 className="headline">Routing & Navigation in Fiori UI5.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will try to Navigate from one View to another view.
            </p>

            <p className="paragraph">
                So, we will firstly create another <span className="tomato">View</span> and then we will modify the <span className="tomato">manifest.json</span> file and then define the routing login on <span className="tomato">Controller.js</span> file. 
            </p>


            {/* STEPS to FOLLOW */}

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                Firstly, lets create another View <span className="teal">(lets say you will create Second.view.xml file on view)</span>.
            </p>



            <p className="paragraph">
                Go to <span className="tomato">Second.view.xml</span> file and add the below line of codes to create a basic View page.
            </p>

        

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<mvc:View controllerName="fiori.auditlog.controller.Second"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns:u="sap.ui.unified"
    xmlns="sap.m">
    <Page id="Second" title="{i18n>title}">
        <content>
            <Text id="SecondText" text="Welcome to Second Page"></Text>
        </content>
    </Page>
</mvc:View>
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                2. Now, go to Controller Folder and create <span className="tomato">Second.controller.js</span> file and add the below line of code to make a basic Controller file.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("fiori.auditlog.controller.Second", {
        onInit() {
        },

		
    });
});
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                3. Now go to <span className="tomato">manifest.json</span> file and add the Second View on <span className="teal">routes</span> array.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
{
    "name": "Second",
    "pattern": "second",
    "target": "secondTarget"
}
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                <span className="teal">(you can use any name instead of Second)</span>
            </p>

            
            <p className="paragraph">
                So, the <span className="teal">routes</span> array of <span className="tomato">manifest.json</span> file looks like below -
            </p>
            

            
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
"routes": [
        {
            "name": "RouteView1",
            "pattern": ":?query:",
            "target": [
            "TargetView1"
            ]
        },
        {
            "name": "Second",
            "pattern": "second",
            "target": "secondTarget"
        }
    ],
                    `
                }
            </SyntaxHighlighter>
           
            
            <p className="paragraph">
                Now, on <span className="tomato">manifest.json</span> file only, add the below lines on <span className="teal">targets</span> object.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
"secondTarget": {
    "id": "second",
    "name": "Second",
    "transition" : "slide"
}
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
            So, <span className="teal">targets</span> object of <span className="tomato">manifest.json</span> file looks like below - 
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
"targets": {
    "TargetView1": {
        "id": "View1",
        "name": "View1"
    },
    "secondTarget": {
        "id": "second",
        "name": "Second",
        "transition" : "slide"
    }
}
                    `
                }
            </SyntaxHighlighter>

            
            <p className="list">
                Now, go to <span className="tomato">View1.view.xml</span> file and create a <span className="teal">Button</span> for navigation.
            </p>


            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<Button id="goToSecond" text="Go to Second" press="navToSecond"></Button>
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
                Now, add the logic on <span className="tomato">View1.controller.js</span> file by creating <span className="teal">navToSecond</span> function which will nagivate you from View1 to Second View.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
navToSecond : function(oEvent){
    const router = UIComponent.getRouterFor(this) ;
    router.navTo("Second")
}
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
                Do not forget to add the <span className="tomato">UIComponent</span> library at the top on the Controller and pass the same on the define function.
            </p>


            <p className="list">
                So, the <span className="tomato">View1.controller.js</span> file will look like below - 
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], (Controller, UIComponent) => {
    "use strict";

    return Controller.extend("fiori.auditlog.controller.View1", {
        onInit() {
        },

		navToSecond : function(oEvent){
			const router = UIComponent.getRouterFor(this) ;
			router.navTo("Second")
		}

    });
});
                    `
                }
            </SyntaxHighlighter>


            <p className="list bold pinky">
                And it is done. You can use this to Navigate from One View to Another View.
            </p>



            {/* <PrismLoader /> */}


        </div>
    );
}

export default sample1;