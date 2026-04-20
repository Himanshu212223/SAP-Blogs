import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {

    // Page Code Snippets
const code1 = 
`<Page>
	<content>
    <Button text="This is an example Text Statement" press="onClick" />
    
    <Select>
        <items>
            <core:Item key="1" text="Option 1" />
            <core:Item key="2" text="Option 2" />
        </items>
    </Select>

	</content>
</Page>` ;
    
const code2 = `{
    "employeeName": "User1"
}`;


const code3 = 
`{
    "employee" : {
        "name": "User1",
        "role": "Developer"
    }
}`;

const code4 = 
`{
    "employees" : [
        {
            "name": "User1",
            "role": "Developer"
        },
        {
            "name": "User2",
            "role": "Admin"
        },
        {
            "name": "User3",
            "role": "Viewer"
        }
    ]
}`;

const code5 = 
`{
    "employees" : [
        {
            "name": "User1",
            "role": "Developer",
            "rating": 3
        },
        {
            "name": "User2",
            "role": "Admin",
            "rating": 4
        },
        {
            "name": "User3",
            "role": "Viewer",
            "rating": 2
        }
    ]
}`;



    // Page UI
  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">
        
        <h1 className="text-5xl">About Fiori UI5 Application</h1>

        <ul className="list-disc ml-6">
            <li>SAP UI5 applications are built using the MVC architecture, where responsibilities are divided among Model, View, and Controller.</li>
            <li>The View defines the UI using XML, the Controller handles application logic and user interactions, and the Model manages the application data.</li>
            <li>This separation of concerns ensures that the code remains clean, reusable, and easy to maintain.</li>
            <li>Moreover, UI5 provides powerful data binding between the Model and the View, enabling automatic UI updates without requiring manual intervention.</li>
        </ul>

        <div>For UI5 Application File Structure, usage and flow of execution, use - &nbsp;
        <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/1-manage-multi-language-using-i18n/README.md" />
        </div>
        
        

        
        <h2 className="text-4xl">Types of Data Model</h2>
        
        <h4 className="text-2xl">1. Resource Model(sap.ui.model.resource.ResourceModel)</h4>
        <ul className="list-disc ml-6">
            <li>The Resource Model is used in SAP Fiori UI5 to handle text translations (internationalization - i18n).</li>
            <li>Instead of hardcoding text in UI, we can store them in a properties file (i18n.properties), and UI dynamically loads the correct language.</li>
            <li>Its main purpose is it provide <span className="text-gray-950 font-semibold">Multi-language support</span> which can be implemented by creating multiple i18n file based on different country language like - i18n_hi.properties (for Hindi), i18n_de.properties (for German), i18n_ja.properties (for Japanese), etc.. <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/1-manage-multi-language-using-i18n" /></li>
            <li>It is also called <span className="text-gray-950 font-semibold">Client Side Model</span> as data is stored in the browser (frontend).</li>
        </ul>
        
        <h4 className="text-2xl">2. JSON Model (sap.ui.model.json.JSONModel)</h4>
        <ul className="list-disc ml-6">
            <li>It is used to stores data in JSON format (key-value pairs) and is <span className="text-gray-950 font-semibold">mostly used</span>.</li>
            <li>It is fast, easy to use for small apps but Not suitable for large backend data.</li>
            <li>It is also called <span className="text-gray-950 font-semibold">Client Side Model</span> as data is stored in the browser (frontend).</li>
        </ul>
        
        <h4 className="text-2xl">3. OData Model</h4>
        <ul className="list-disc ml-6">
            <li>OData Service (Open Data Protocol Service) is a REST-based web service used to exchange data between client and server in a standardized way.</li>
            <li>An OData service allows applications (like SAP Fiori apps) to read, create, update, and delete data over HTTP using standard methods.</li>
            <li>It is of 2 Types - oData v2 and oData v4 where oData v2 is widely used OData model in SAP UI5 which is version 2 protocol and is supported in almost all SAP systems while oData v4 is New and advanced version of OData, designed for better performance and cleaner architecture.</li>
            <li>It is also called <span className="text-gray-950 font-semibold">Server Side Model</span> as data comes from backend server via API/odata service.</li>
        </ul>
        
        <h4 className="text-2xl">4. XML Model</h4>
        <ul className="list-disc ml-6">
            <li>The XML Model is used to manage data in XML format inside a UI5 application.</li>
            <li>Data is structured using XML tags.</li>
            <li>It is also called <span className="text-gray-950 font-semibold">Client Side Model</span> as data is stored in the browser (frontend).</li>
        </ul>







        <h2 className="text-4xl">Architecture of Fiori UI5 View</h2>

        <h4 className="text-2xl">1. Object (Root Class)</h4>
        <ul className="list-disc ml-6">
            <li>Object is the root base class in SAP UI5 that provides object-oriented features like inheritance, lifecycle management, and class extension.</li>
            <li>All UI5 elements and controls ultimately inherit from this class.</li>
        </ul>
        
        <h4 className="text-2xl">2. Element (Base Class)</h4>
        <ul className="list-disc ml-6">
            <li>Element is the base class for most UI5 objects.</li>
            <li>It provides basic features like:- ID handling, Event handling, Data binding support, but does NOT render UI directly.</li>
        </ul>

        <h4 className="text-2xl">3. Control (UI Component)</h4>
        <ul className="list-disc ml-6">
            <li>Control <span className="text-gray-950 font-semibold">extends Element</span>(Base Class) and is responsible for UI rendering.</li>
            <li>It renders <span className="text-gray-950 font-semibold">visible UI</span>, has properties, aggregations, events and used inside XML Views.</li>
        </ul>

        <h4 className="text-2xl">4. Aggregation (Aggregate)</h4>
        <ul className="list-disc ml-6">
            <li>Aggregation defines parent-child relationship between controls.</li>
            <li>It renders <span className="text-gray-950 font-semibold">visible UI</span>, has properties, aggregations, events and used inside XML Views.</li>
        </ul>

        <h4 className="text-2xl">5. Property</h4>
        <ul className="list-disc ml-6">
            <li>A property is a value that defines the state or appearance of a <span className="text-gray-950 font-semibold">Control</span>.</li>
            <li>It is used to manage- Text content, Visibility, Color, size, etc..</li>
        </ul>
        
        <h4 className="text-2xl">6. Event</h4>
        <ul className="list-disc ml-6">
            <li>Event is a mechanism through which a <span className="text-gray-950 font-semibold">Control</span> notifies the application when a user interaction or action occurs.</li>
            <li>Event manages or handle:- User Click, Any Change, User Input, Selection, etc..</li>
        </ul>

        <p>Code Example - </p>
        <div>
            <CodeSnippet code={code1} language="xml" title="View1.view.xml" />
        </div>

        <ul className="list-disc ml-6">
            <p>On the above code snippet -</p>
            <li>Page - <span className="text-gray-950 font-semibold">Control</span></li>
            <li>content - <span className="text-gray-950 font-semibold">Aggregation</span></li>
            <li>Button - <span className="text-gray-950 font-semibold">Control</span></li>
            <li>text - <span className="text-gray-950 font-semibold">Property</span></li>
            <li>press - <span className="text-gray-950 font-semibold">Event</span></li>
            <li>Select - <span className="text-gray-950 font-semibold">Control</span></li>
            <li>items - <span className="text-gray-950 font-semibold">Aggregation</span></li>
            <li>Item - <span className="text-gray-950 font-semibold">Element</span> (not Control because it is not directly rendered, instead Select gets rendered in UI)</li>
        </ul>






        <h2 className="text-4xl">What is Data Binding ..?</h2>
        <ul className="list-disc ml-6">
            <li>
            Data Binding connects your UI (View) with data (Model). It keeps UI and data in sync automatically.
            </li>
        </ul>



        <h3 className="list-decimal text-3xl">Types of Binding</h3>

        <h3 className="list-decimal text-2xl">1. Property Binding (One Value Binding)</h3>
        <ul className="list-disc ml-6">
            <li>
            It is used to bind a <span className="text-gray-950 font-semibold">single value (like text, title, visibility, etc.)</span> in the form of Text, Input, etc.
            </li>
        </ul>

        <p>Sample Data Example - </p>

        <div>
            <CodeSnippet code={code2} language="javascript" title="model/Data.json" />
        </div>

        <h3 className="list-decimal text-2xl">2. Element Binding (Context Binding)</h3>
        <ul className="list-disc ml-6">
            <li>
            It is used when we wants to bind <span className="text-gray-950 font-semibold">an object content </span> from the data in Form, Details, etc.
            </li>
            <li>Like you wants to bind the below object data - </li>
        </ul>

        <p>Sample Data Example - </p>
        <div>
            <CodeSnippet code={code3} title="model/Data.json" language="js" />
        </div>



        <h3 className="list-decimal text-2xl">3. Aggregation Binding (List Binding)</h3>
        <ul className="list-disc ml-6">
            <li>
            It is used when we wants to bind <span className="text-gray-950 font-semibold">multiple records (array/list of objects)</span> from the data in Table, List, etc.
            </li>
            <li>Like you wants to bind the below array of object data - </li>
        </ul>

        <p>Sample Data Example - </p>
         <div>
            <CodeSnippet code={code4} title="model/Data.json" language="js" />
        </div>
        


        <h3 className="list-decimal text-2xl">4. Expression Binding</h3>
        <ul className="list-disc ml-6">
            <li>Expression Binding is writing small logic (conditions or calculations) directly inside the XML view.</li>
            <li>It changes UI dynamically based on data.</li>
        </ul>
        <p>For Example change the view based on rating value - </p>
         <div>
            <CodeSnippet code={code5} title="model/Data.json" language="js" />
        </div>




        <h3 className="text-3xl">Type of Data Binding based on Data Flow</h3>

        <h4 className="text-2xl">1. One Time Binding</h4>
        <ul className="list-disc ml-6">
            <li>In this way of binding, data flows from model to UI only once.</li>
            <li>Once data is set on UI, no further update happens.</li>
            <li>Example - Binding Resource Model with UI</li>
        </ul>
        
        <h4 className="text-2xl">2. One-Way Binding</h4>
        <ul className="list-disc ml-6">
            <li>In this way of binding, data flows only from Model to View.</li>
            <li>UI gets updated when model changes.</li>
            <li>User changes in UI do NOT update model.</li>
            <li>Example - Display Data on Text, labels, read-only fields using Property, Element or Aggregation Binding.</li>
        </ul>
        
        <h4 className="text-2xl">3. Two-Way Binding</h4>
        <ul className="list-disc ml-6">
            <li>In this way of binding, data flows from Model to View and from View to Model.</li>
            <li>Model updates UI and UI updates Model.</li>
            <li>User changes in UI updates model data.</li>
            <li>Example - Display and Read Data from Forms or Input Fields using Property, Element or Aggregation Binding.</li>
        </ul>
        

    </div>
  );
};

export default page;
