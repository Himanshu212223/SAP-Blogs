import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const sample1 = () => {


    return (
        <div className="indexing">
            <h1 className="headline">Routing & Navigation in Fiori UI5 using Base Controller.</h1>

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
                Firstly, lets create another View <span className="teal">(lets say you will create View2.view.xml file on view)</span>.
            </p>



            <p className="paragraph">
                Go to <span className="tomato">View2.view.xml</span> file and add the below line of codes to create a basic View page.
            </p>

        

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<mvc:View controllerName="namespace.modulename.controller.View2"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <Page id="page2" title="{i18n>title2}" showNavButton="true" navButtonPress="onNavBack">
    <content>
       <Text id="page2text" text="Welcome to View 2" />
    </content>
    </Page>
</mvc:View>
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                2. Now, go to Controller Folder and create a new <span className="tomato">BaseController.js</span> file and add the below line of code to make a basic Controller file.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
] , (Controller, History, UIComponent) => {
    "use strict" ;

    return Controller.extend("namespace.modulename.controller.BaseController" , {

        RouteTo : function(viewName){
            const router = UIComponent.getRouterFor(this) ;
            router.navTo(viewName) ;
        },


        onNavBack : function() {
            let oHistory = History.getInstance() ;
            let sPreviousHash = oHistory.getPreviousHash() ;

            if(sPreviousHash !== undefined){
                window.history.go(-1) ;
            }
            else{
                this.RouteTo("View1", {}, true) ;
            }
        }


    });
});
                    `
                }
            </SyntaxHighlighter>



            <p className="list">
                3. Now, go to Controller Folder and create a <span className="tomato">View2.controller.js</span> controller file for View2 and add the below line of code to make a basic Controller file (This Controller will extend the Base Controller).
            </p>

            
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {`
sap.ui.define([
    "namespace/modulename/controller/BaseController"
] , (BaseController) => {
    "use strict" ;

    return BaseController.extend("namespace.modulename.controller.View2" , {
        
        
        onInit() {

        },

    });
});
            `}
            </SyntaxHighlighter>



            <p className="list">
                4. We also have to update the Controller of first View <span className="tomato">View1.controller.js</span> and make it <span className="teal">extends the BaseController.js</span>.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "namespace/modulename/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("namespace.modulename.controller.View1", {
        
        onInit() {
        } ,


    });
});
                    `
                }
            </SyntaxHighlighter>


            
            <p className="paragraph">
                Now go to <span className="teal">routes</span> array of <span className="tomato">manifest.json</span> and add the below line of code -
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
 {
    "name": "SecondView",
    "pattern": "secondView",
    "target" : "secondView"
}
                    `
                }
            </SyntaxHighlighter>


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
          "name": "SecondView",
          "pattern": "secondView",
          "target" : "secondView"
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
"secondView" : {
    "id" : "secondViewAvailalbe",
    "name": "View2",
    "transition" :"fade"
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
    "secondView" : {
        "id" : "secondViewAvailalbe",
        "name": "View2",
        "transition" :"fade"
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
<Button id="view1Btn" text="next View" press="navToNext"></Button>
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
                Now, add the logic on <span className="tomato">View1.controller.js</span> file by creating <span className="teal">navToSecond</span> function which will nagivate you from View1 to Second View.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
navToNext : function() {
            this.RouteTo("SecondView") ;
        }
                    `
                }
            </SyntaxHighlighter>


            <p className="list">
                So, the <span className="tomato">View1.controller.js</span> file will look like below - 
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
sap.ui.define([
    "namespace/modulename/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("namespace.modulename.controller.View1", {
        
        onInit() {
        } ,


        navToNext : function() {
            this.RouteTo("SecondView") ;
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