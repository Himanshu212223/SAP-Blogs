import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const page = () => {

    const welcomeSomeOneContent = "`Welcome ${request.data.name} to our first CAPM Project`" ;

    return (
        <div className="indexing">
            <h1 className="headline">Create a Blank CAP Project.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will create a Blank SAP CAPM (Cloud Application Programming Model) Application using the CDS (Core Data Service) Commands.
            </p>

            <h3 className="heading">Commands to follow</h3>

            <p className="paragraph">
                Lets create a Folder named CAP Projects and inside it we will create our CAPM Application.
            </p>


            <p className="paragraph">
                To <span className="lightGreen">create a Folder</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` mkdir CAP_Projects  `}
            </SyntaxHighlighter>
            
            
            <p className="paragraph">
                To <span className="lightGreen">go inside the Folder</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cd CAP_Projects  `}
            </SyntaxHighlighter>
            
            
            
            <p className="paragraph">
                To <span className="lightGreen">create blank CAPM Project</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds init <project name>  `}
            </SyntaxHighlighter>
            
            
            
            <p className="paragraph">
                For Example we want to create a blank <span className="lightGreen">helloWorld Project</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds init helloWorld  `}
            </SyntaxHighlighter>


            <p className="list">
                It will create a blank CAPM project having 3 blank folders inside it and 1 eslint configuration file and 1 package.json file.
            </p>


            <p className="list">
                The <span className="lightGreen">app Folder</span> is used to create our UI (Fiori).
            </p>
            <p className="list">
                The <span className="lightGreen">db Folder</span> is used to create our database model.
            </p>
            <p className="list">
                And the <span className="lightGreen">srv Folder</span> is used to create our services.
            </p>


            <p className="paragraph">
                Now, to run the project, firstly go inside the project and then run it.
            </p>


            <p className="paragraph">
                To go inside the project, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cd <project name>  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                In our case, the project name is <span className="lightGreen">helloWorld</span>, so we will use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cd helloWorld  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now to run it, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds watch  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Since it is a blank application, so when you run it, it will show <span className="tomato">No models found in db/ srv/ app/ schema, services</span>.
            </p>


            <p className="paragraph">
                So, lets create a basic Service for our project.
                To do so, we have to go inside the <span className="tomato">srv Folder</span> and create <span className="lightGreen"> 1 js file </span> and <span className="lightGreen">1 cds file </span> for our services.
            </p>


            <p className="paragraph">
                To <span className="lightGreen">go inside srv folder</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cd srv  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, lets create a service file (<span className="tomato">myService.js</span>), use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` touch myService.js  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now create a service function and inside it create your custom functions.
            </p>


            <p className="paragraph">
                Like in the below code, we are creating our service function named <span className="tomato">myServiceFunction</span> and inside our Service we will create 2 different functions named <span className="lightGreen">welcomeFunction</span> and <span className="lightGreen">welcomeSomeOne</span>.
            </p>

            <p className="list">
                1. <span className="lightGreen">welcomeFunction</span> will just return a String for greeting.
            </p>


            <p className="list">
                2. <span className="lightGreen">welcomeSomeOne</span> will just return a String for greeting but includes the data send in the request content.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {`
const myServiceFunction = function(srv){
    
    srv.on("welcomeFunction", (request, response) => {
        return("Welcome to our First CAPM Project.");
    });

    srv.on("welcomeSomeOne", (request, response) => {
        return(${welcomeSomeOneContent});
    });

};


module.exports = myServiceFunction ;
                `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, we will have to create another file (<span className="tomato">cds file</span>) with same name as our service file i.e., <span className="lightGreen">myService.cds</span> inside <span className="tomato">srv folder</span>.
            </p>


            <p className="paragraph">
                So use the below command to create the file.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` touch myService.cds  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, inside the cds service file we have to define the same service function i.e., <span className="lightGreen">myServiceFunction</span>.
            </p>


            <p className="paragraph">
                And inside the service function we have to define our custom function which we had created on our service js file.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {`
service myServiceFunction {
    
    function welcomeFunction() returns String ;

    function welcomeSomeOne(name : String) returns String ;

}
                `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, if you will run the application and call the custom functions by adding it at the end of the url, you will be able to see the result.
            </p>


            <p className="list bold pinky">
                Now, you can utilize the response as you want.
            </p>



            {/* <PrismLoader /> */}


        </div>
    );
}

export default page;