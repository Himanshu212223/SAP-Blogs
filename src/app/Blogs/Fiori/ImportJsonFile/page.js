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
            <h1 className="headline">Import JSON File to Fiori UI5 Application.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will try to upload the JSON file on SAP Fiori UI5 Application.
            </p>

            <p className="paragraph">
                So, we will firstly crate a upload button on the xml file for the ui, and then will define its method on the controller file to display the file content on the console so that user can use it as per their requirement.
            </p>


            {/* STEPS to FOLLOW */}

            <h3 className="heading">Steps to follow</h3>

            <p className="paragraph">
                Lets crate the UI first.
            </p>

            <p className="list">
                1. We have to define below sap library in the  <span className="tomato">xml file.</span>.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
xmlns:u="sap.ui.unified"
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                2. Now, add the File Uploader Tag in the <span className="teal">Page content</span> of <span className="tomato">xml file (or view)</span>.
            </p>

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<u:FileUploader id="fileuploader" change="handleUploadFile"/>
                    `
                }
            </SyntaxHighlighter>

            <p className="list">
                So, your <span className="tomato">xml file (or view)</span> will look like below code.
            </p>

            <SyntaxHighlighter language="xml" style={atomDark}>
                {
                    `
<mvc:View controllerName="fiori.auditlog.controller.View1"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns:u="sap.ui.unified"
    xmlns="sap.m">
    <Page id="page" title="{i18n>title}">
        <content>
            <u:FileUploader id="fileuploader" change="handleUploadFile"/>
        </content>
    </Page>
</mvc:View>
                    `
                }
            </SyntaxHighlighter>

            <p className="paragraph">
                Now, lets define the required methods on <span className="tomato">Controller file</span>.
            </p>

            
            <p className="paragraph">
                Go to your corresponding <span className="tomato">Controller file</span> and create a method <span className="teal">handleUploadFile</span> which will get triggered when we upload a json file.
            </p>
            
            <p className="paragraph">
                And this method will call another method <span className="teal">importFile</span> which will return the content of the uploaded file.
            </p>

            
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
handleUploadFile: async function (e) {
    try {
        let response = await this.importFile(e.getParameter("files") && e.getParameter("files")[0]);
        console.log(response);
    }
    catch (error) {
        console.log(error)
    }
}
                    `
                }
            </SyntaxHighlighter>
           
            
            <p className="paragraph">
                Now, lets define <span className="teal">importFile</span> method on <span className="tomato">controller file</span> which will read the file and return its content as response.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {
                    `
importFile: function (file) {
    let data = "";

    if (file && window.FileReader) {

        var reader = new FileReader();

        reader.onload = function (e) {
            data = e.target.result;

        };

        reader.onerror = function (ex) {
            console.log(ex);
        };

        reader.readAsText(file);

    }

    return data;
}
                    `
                }
            </SyntaxHighlighter>


            <p className="list bold pinky">
                Now, you can utilize the response as you want.
            </p>



            {/* <PrismLoader /> */}


        </div>
    );
}

export default sample1;