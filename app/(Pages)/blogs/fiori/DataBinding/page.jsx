import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import RedirectButtonOutline from '@/components/ui/redirectButtonOutline' ;
import React from "react";

const page = () => {
    // Code 
const code1 = `title=Binding Fiori UI5 Application`;
const code2 = `<Page id="page" title="{i18n>title}">`;
const code3 = 
`{
    "Company": "Tech_Company"
}`;
const code4 = `<Text id="view1Text4" text="Company Name - {MySampleModel>/Company}" />` ;
const code5 = 
`{
    "User": "",
    "Department": ""
}
`;
const code6 =
`<Input id="view1Input1" placeholder="Enter Login User Name" value="{MySampleModel>/User}" valueLiveUpdate="true" />
<Input id="view1Input2" placeholder="Department" value="{MySampleModel>/Department}" valueLiveUpdate="true" />

<Text id="view1Text8" text="User ID - {MySampleModel>/User}" />
<Text id="view1Text9" text="Department - {MySampleModel>/Department}" />`;
const code7 = 
`{
    "Owner": {
        "Name": "John Snow",
        "Gender": "M",
        "Location": "London"
    }
}`;
const code8 =
`<VBox id="panel4VBox4" binding="{MySampleModel>/Owner}" >
    <Text id="view1Panel4Text1" text="Topic - One Way Binding for Element Binding" />
    <Label id="view1Panel4Text2" text="Owner Details :" />
    <Text id="view1Panel4Text3" text="Owner Name - {MySampleModel>Name}" />
    <Text id="view1Panel4Text4" text="Gender - {MySampleModel>Gender}" />
    <Text id="view1Panel4Text5" text="Location - {MySampleModel>Location}" />
</VBox>`;
const code9 = 
`{
    "NewEmployee": {
        "Name": "",
        "Gender": "",
        "Location": ""
    }
}`;
const code10 =
`<VBox id="panel5VBox1" >
    <Text id="view1Panel5Text1" text="Topic - Two-Way Binding for Element Binding" />
    <form:SimpleForm
        editable="true"
        id="simpleForm1"
        layout="ResponsiveGridLayout"
        class="sapUiMediumMargin"
        binding="{MySampleModel>/NewEmployee}" 
        >

        <Title id="form1Title1" text="New Employee Form" />

        <Label id="form1Lable1" text="Name" />
        <Input id="form1Input1" value="{MySampleModel>Name}" placeholder="Enter Name" valueLiveUpdate="true" />

        <Label id="form1Lable2" text="Gender" />
        <Input id="form1Input2" value="{MySampleModel>Gender}" placeholder="Enter Gender" valueLiveUpdate="true" />

        <Label id="form1Lable3" text="Location" />
        <Input id="form1Input3" value="{MySampleModel>Location}" placeholder="Enter Location" valueLiveUpdate="true" />

        <Button id="form1Button1" text="Submit" press="onFormSubmit" />

    </form:SimpleForm>
</VBox >
<!-- Display Section -->
<VBox binding="{MySampleModel>/NewEmployee}">
    <Text text="Employee Name - {MySampleModel>Name}" />
    <Text text="Employee Gender - {MySampleModel>Gender}" />
    <Text text="Employee Location - {MySampleModel>Location}" />
</VBox>
`;
const code11 = 
`public onFormSubmit(oEvent : any): void {
    //  We can get the input data by targetting the id of input fields like - 
    const oInput1 = this.getView()?.byId("form1Input1") as Input;
    const inp1NameValue = oInput1.getValue() ;
    const oInput2 = this.getView()?.byId("form1Input2") as Input;
    const inp2LocationValue = oInput2.getValue() ;
    const oInput3 = this.getView()?.byId("form1Input3") as Input;
    const inp2GenderValue = oInput3.getValue() ;


    //  Best Approach - Since Form Input Data is mapped and stored on Model, better to extract it from there.
    const myModel = this.getView()?.getModel("MySampleModel") as JSONModel ;
    const modelData = myModel.getData();
    const sName = modelData.NewEmployee.Name ;
    const sGender = modelData.NewEmployee.Gender ;
    const sLocation = modelData.NewEmployee.Location ;

    // Show output
    MessageBox.information(
        "Employee Details :- " +
        "Name: " + sName + 
        "Gender: " + sGender +
        "Location: " + sLocation
    );
}`;
const code12 = 
`{
    "employees": [
        {
        "name": "User1",
        "role": "Developer",
        "city" : "Delhi",
        "rating" : 4
        },
        {
        "name": "User2",
        "role": "Admin",
        "city" : "Mumbai",
        "rating" : 2
        },
        {
        "name": "User3",
        "role": "Viewer",
        "city" : "Kolkata",
        "rating" : 3
        }
    ]
}
`;
const code13 = 
`<Table id="idProductsTable" items="{MySampleModel>/employees}" headerText="Employee Table" mode="SingleSelectMaster" selectionChange="onRowSelect">		
    <columns>
        <Column>
            <Text text="Employee Name" />
        </Column>
        <Column>
            <Text text="Role" />
        </Column>
        <Column>
            <Text text="City" />
        </Column>
        <Column>
            <Text text="Rating" />
        </Column>
    </columns>

    <items>
        <ColumnListItem vAlign="Middle">
            <cells>
                <Text text="{MySampleModel>name}" />
                <Text text="{MySampleModel>role}" />
                <Text text="{MySampleModel>city}" />
                <Text text="{MySampleModel>rating}" />
            </cells>
        </ColumnListItem>
    </items>
</Table>
`;
const code14 = 
`public onRowSelect(oEvent : any) : void {
    const selectedName = oEvent.getParameter("listItem").getBindingContext("MySampleModel").getObject().name ;
    const selectedRole = oEvent.getParameter("listItem").getBindingContext("MySampleModel").getObject().role ;
    const selectedCity = oEvent.getParameter("listItem").getBindingContext("MySampleModel").getObject().city ;
    
    // Show output
    MessageBox.information(
        "Employee Details:\n" +
        "Name: " + selectedName + "\n" +
        "Role: " + selectedRole + "\n" +
        "Location: " + selectedCity
    );
}`;
const code15 = "${MySampleModel>rating}" ;
const code16 = 
`<ObjectStatus text="{MySampleModel>rating}" state="{=${code15} >=4 ? 'Success' : 'Warning'}"/>`;



//   Rendered UI
  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">Data Binding</h1>

        <p>Data Binding connects your UI (View) with data (Model) to keeps UI and data in sync automatically.</p>
        <p>We will try to understand how to implement different types of Data Binding.</p>
        <p>We have created a MyModel.json file on model folder and configured the JSON Model with name - MySampleModel.</p>
        <div>
            <RedirectButtonOutline text="How to configure JSON Model" link="/blogs/fiori/ManualConfigJSONModel" />
        </div>


        <h3 className="text-3xl">1. One Time Binding and Resource Binding</h3>

        <ul className="list-disc ml-6">
            <li>One Time Binding means data is shown in UI only once and it will NOT update if the model changes later.</li>
            <li>The application page title retrieved from the i18n file is a One-Time binding, as it is initialized only once during application load.</li>
            <li>It is also an example of Resource Binding as is used to fetch text from the i18n (resource) file and display it in the UI.</li>
        </ul>

        <p>We can define the same on i18n.properties file like below - </p>
        <div>
            <CodeSnippet code={code1} language="properties" title="i18n/i18n.properties" />
        </div>

        <p>And the same is binded on the Page control title - </p>
        <div>
            <CodeSnippet code={code2} language="xml" title="view/View1.view.xml" />
        </div>
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/5-data-binding" />
        </div>




        <h3 className="text-3xl">2. Property Binding</h3>

        <ul className="list-disc ml-6">
            <li>It is used to bind a single value <span className="text-gray-950 font-semibold">(like text, title, visibility, etc.)</span> in the form of Text, Input, etc.</li>
        </ul>

        <h4 className="text-2xl">One-Way Binding with Property Binding</h4>
        <p>We will try to bind the below data <span className="text-gray-950 font-semibold">from model</span> from json model - </p>
        <div>
            <CodeSnippet code={code3} language="json" title="model/MyModel.json" />
        </div>
        <p>And will bind it with Text on <span className="text-gray-950 font-semibold">View</span> as - </p>
        <div>
            <CodeSnippet code={code4} language="xml" title="view/View1.view.xml" />
        </div>


         <h4 className="text-2xl">Two-Way Binding with Property Binding</h4>
        <p>Two-way binding ensures that any changes made by the user update the JSON model, and those updates are automatically reflected in the UI.</p>
        <p>We will try to bind the below data <span className="text-gray-950 font-semibold">from json model</span> - </p>
        <div>
            <CodeSnippet code={code5} language="json" title="model/MyModel.json" />
        </div>
        <p>And will bind it with Input and Text on <span className="text-gray-950 font-semibold">View</span> as - </p>
        <div>
            <CodeSnippet code={code6} language="xml" title="view/View1.view.xml" />
        </div>
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/5-data-binding" />
        </div>





        <h3 className="text-3xl">3. Element Binding</h3>

        <ul className="list-disc ml-6">
            <li>It is used when we wants to bind an <span className="text-gray-950 font-semibold">object content</span> from the model data in Form, Details, etc.</li>
        </ul>

        <h4 className="text-2xl">One-Way Binding with Element Binding</h4>
        <p>We will try to bind the below <span className="text-gray-950 font-semibold">object data</span> from json model - </p>
        <div>
            <CodeSnippet code={code7} language="json" title="model/MyModel.json" />
        </div>
        <p>And will bind it with VBox and Text on <span className="text-gray-950 font-semibold">View</span> as - </p>
        <div>
            <CodeSnippet code={code8} language="xml" title="view/View1.view.xml" />
        </div>

        <h4 className="text-2xl">Two-Way Binding with Element Binding</h4>
        <p>We will try to bind the below <span className="text-gray-950 font-semibold">object data</span> from json model - </p>
        <div>
            <CodeSnippet code={code9} language="json" title="model/MyModel.json" />
        </div>
        <p>And will bind it with Form to read the User input, VBox and Text to show the data on <span className="text-gray-950 font-semibold">View</span> as - </p>
        <div>
            <CodeSnippet code={code10} language="xml" title="view/View1.view.xml" />
        </div>
        
        <p>And if you want to get the data on <span className="text-gray-950 font-semibold">Controller</span> based on Submit button event, you can use the below logic - </p>
        <div>
            <CodeSnippet code={code11} language="typescript" title="controller/View1.controller.ts" />
        </div>
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/5-data-binding" />
        </div>



        <h3 className="text-3xl">4. Aggregation Binding</h3>

        <ul className="list-disc ml-6">
            <li>It is used when we wants to bind <span className="text-gray-950 font-semibold">multiple records (array/list of objects)</span> from the model data in Table, List, etc.</li>
        </ul>

       <p>We will try to bind the below array data from json model - </p>
        <div>
            <CodeSnippet code={code12} language="json" title="model/MyModel.json" />
        </div>
        <p>And will bind it with <span className="text-gray-950 font-semibold">Table on View</span> as - </p>
        <div>
            <CodeSnippet code={code13} language="xml" title="view/View1.view.xml" />
        </div>
        <p>And can define logic on Controller to get the details of selected row of table defined on selectionChange event of Table - </p>
        <div>
            <CodeSnippet code={code14} language="typescript" title="controller/View1.controller.ts" />
        </div>
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/tree/5-data-binding" />
        </div>




        <h3 className="text-3xl">5. Expression Binding</h3>

        <ul className="list-disc ml-6">
            <li>Expression Binding is writing small logic (conditions or calculations) directly inside the XML view.</li>
            <li>It changes UI dynamically based on data.</li>
        </ul>

        <p>So, from above Aggregation Binding example, if we wants to change the color of Rating color, we can define Expression Binding like - </p>

        <div>
            <CodeSnippet code={code16} language="xml" title="view/View1.view.xml" />
        </div>


        <p>--- END ---</p>


        
    </div>
  );
};

export default page;
