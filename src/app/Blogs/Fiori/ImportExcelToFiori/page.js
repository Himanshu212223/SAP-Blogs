"use client"

import '@/app/Blogs.css'

import Image from "next/image";
import dynamic from 'next/dynamic';
// Lazy load the CodeBlock and skip SSR
const CodeBlock = dynamic(() => import('@/app/Components/CodeBlock/CodeBlock'), {
  ssr: false,
});

const page = () => {

  const statement1 = '`${sAppModulePath}/${destinationName}/${additionalURI}`';
  const statement2 = '`auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}`';
  const statement3 = 'from=${fromTime}&time_to=${toTime}';
  const statement4 = '`auditlog/v2/auditlogrecords?time_from=${fromTime}&time_to=${toTime}`';


  return (
    <main className='main'>
      <h1>Import Excel Data into Fiori UI5 and store in JSON Model</h1>

      <div className='content'>

        <p>In this example, We will create an UI5 application which will import the excel sheet, read its data and display it in table.</p>

        <p>We will be following below steps-</p>

        <ul className='list'>
          <ol>1. Create a Table in View and bind it with JSON Model.</ol>
          <ol>2. Create and Configure JSON Model in manifest file.</ol>
          <ol>3. Add required libraries in Controller file.</ol>
          <ol>4. Define method on the Controller file to handle file upload.</ol>
        </ul>


        <Image src="/resources/importExcelToFiori/excelData.png" width={600} height={200} alt="Excel Data" />
        <br />
        <Image src="/resources/importExcelToFiori/import.png" width={800} height={200} alt="import in Fiori" />
        <br />
        <Image src="/resources/importExcelToFiori/chooseFile.png" width={800} height={200} alt="Choose File" />
        <br />
        <Image src="/resources/importExcelToFiori/displayInFiori.png" width={800} height={200} alt="Display in Fiori Table" />


        <h2>Step 1 - Create a Table in View and bind it with JSON Model</h2>

        <p>In the <span className='highlight'>View.xml file</span>, create a table which will bind to JSON Model.</p>

        <CodeBlock code={`<Table items="{DataModel>/}">

    <headerToolbar>
        <OverflowToolbar >
            <content>
                <Title title="Employee Table"/>
                <ToolbarSpacer />
                <!-- To create file upload button -->
                <u:FileUploader change="handleUploadFile"/>
            </content>
        </OverflowToolbar>
    </headerToolbar>

    <columns>
        <Column >
            <Text text="Employee Id"/>
        </Column>
        <Column >
            <Text text="Employee Name"/>
        </Column>
        <Column >
            <Text text="Job Level"/>
        </Column>
        <Column >
            <Text text="Location"/>
        </Column>
    </columns>

    <items>
        <ColumnListItem >
            <cells>
                <Text text="{DataModel>empId}" />
                <Text text="{DataModel>empName}" />
                <Text text="{DataModel>jobLevel}" />
                <Text text="{DataModel>location}" />
            </cells>
        </ColumnListItem>
    </items>
</Table>`} language='xml' />

        <p>In our case we are using JSON Model named DataModel.</p>

        <p>Do not forget to add the below sap library on the view.</p>

        <CodeBlock code={`xmlns:u="sap.ui.unified"`} language='xml' />

        <p>So, your View will look like this.</p>

        <CodeBlock code={`<mvc:View 
    controllerName="basic.sap.controller.View1"
    xmlns:mvc="sap.ui.core.mvc" 
    displayBlock="true"
    xmlns:u="sap.ui.unified"
    xmlns="sap.m"
>`} language='xml' />




        <h2>Step 2 - Create and Configure JSON Model in manifest file</h2>

        <p>Firstly create a file named <span className='highlight'>DataModel.json</span> inside <span className='highlight'>Model</span> Folder.</p>

        <p>Now, in the <span className='highlight'>manifest.json </span>file in model object, define the crated JSON model like below-</p>

        <CodeBlock code={`"DataModel":{
    "type": "sap.ui.model.json.JSONModel",
    "uri": "model/DataModel.json"
}`} language='javascript' />



      
      <h2>Step 3 - Add required libraries in Controller file</h2>

      <p>In the <span className='highlight'>Controller.js</span> file of the view, add the required libraries in the <span className='highlight'>onInit</span> method like below -</p>

      <CodeBlock code={`onInit: function () {

    //  Load below Scripts to add libraries of Excel
    var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
    document.head.appendChild(jQueryScript);


    var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
    document.head.appendChild(jQueryScript);
},`} language='javascript' />


      

      <h2>Step 4 - Define method on the Controller file to handle file upload</h2>

      <p>Now define the method to Handle the uploaded file.</p>

      <CodeBlock code={`handleUploadFile : async function (e) {
    //  Below Line of code just set the JSON Model to null
    this.getOwnerComponent().getModel("DataModel").setData(null) ;

    //  Below line of code will call another method (importExcel) which reads the Excel file and store into Model
    await this.importExcel(e.getParameter("files") && e.getParameter("files")[0]);
},`} language='javascript' />


      <CodeBlock code={`importExcel: async function (file) {
			
    var that = this;

    var excelData = {};

    if (file && window.FileReader) {
        
        var reader = new FileReader();
        
        reader.onload = function (e) {
            var data = e.target.result;
            
            var workbook = XLSX.read(data, {
                type: 'binary'
            });

            workbook.SheetNames.forEach(function (sheetName) {
                // Here is your object for every sheet in workbook
                excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

            });

            if(excelData){
                that.getOwnerComponent().getModel("DataModel").setData(excelData, "Data");
            }
        };

        reader.onerror = function (ex) {
            console.log(ex);
        };
        reader.readAsBinaryString(file);

    }
}`} language='javascript' />










        <p>And it is done !!!</p>


      </div>

    </main>
  );
}

export default page;