import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";

const importExcelToFiori = () => {
    return (
        <div className="indexing">
            <h1 className="headline">Import Excel Data into Fiori UI5 and store in JSON Model</h1>


            <p className="paragraph">
                We will try to import Data stored on Excel Sheet into JSON Model and then bind it with Fiori UI5 Table.
            </p>

            <Image src="/resources/importExcelToFiori/excelData.png" width={600} height={200} alt="Excel Data" />
            <br />
            <Image src="/resources/importExcelToFiori/import.png" width={800} height={200} alt="import in Fiori" />
            <br />
            <Image src="/resources/importExcelToFiori/chooseFile.png" width={800} height={200} alt="Choose File" />
            <br />
            <Image src="/resources/importExcelToFiori/displayInFiori.png" width={800} height={200} alt="Display in Fiori Table" />

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                Firstly, we have to import CDN Libraries of Excel to handle Excel Data once uploaded.
            </p>

            <p className="list">
                1. Go to your Fiori Application and on <span className="tomato">View.controller.js</span>, add the below line of code on your <span className="tomato"> onInit Method </span> to load the Script for Excel Libraries.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
    document.head.appendChild(jQueryScript);
		
		
var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
    document.head.appendChild(jQueryScript);
        `
                }
            </SyntaxHighlighter>


            <p className="list">
                So, your <span className="tomato"> onInit Method </span> will look like this.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
onInit: function () {

    //  Load below Scripts to add libraries of Excel
    var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/jszip.js');
    document.head.appendChild(jQueryScript);


    var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.10.0/xlsx.js');
    document.head.appendChild(jQueryScript);
},
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                2. Now, lets define a method on <span className="tomato">View.controller.js</span> which will reset the JSON Model and then call importExcel method.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
handleUploadFile : async function (e) {
    //  Below Line of code just set the JSON Model to null
    this.getOwnerComponent().getModel("DataModel").setData(null) ;

    //  Below line of code will call another method (importExcel) which reads the Excel file and store into Model
    await this.importExcel(e.getParameter("files") && e.getParameter("files")[0]);
},`
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                3. Lets define importExcel method in <span className="tomato">View.controller.js</span> which will read the excel data and store it on JSON Model.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
importExcel: async function (file) {
			
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
}

        `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                4. Now, Lets create a Table in <span className="tomato">View.xml</span> and Bind the JSON Model with the Table. 
            </p>

            <p className="paragraph">
                Firstly, we have to define below sap library in the View. 
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
`xmlns:u="sap.ui.unified"`
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                So, your View will look like this. 
            </p>

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
`<mvc:View 
    controllerName="basic.sap.controller.View1"
    xmlns:mvc="sap.ui.core.mvc" 
    displayBlock="true"
    xmlns:u="sap.ui.unified"
    xmlns="sap.m"
>`
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                Now, create Table in the Page content on View.xml. 
            </p>

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<Table items="{DataModel>/}">

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
</Table>
                    `
                }
            </SyntaxHighlighter>


            <p className="paragraph deepPink">
                Now, we are able to Uplod the content of Excel into JSON Model for Fiori UI5 Application. 
            </p>
        </div>
    );
}

export default importExcelToFiori;