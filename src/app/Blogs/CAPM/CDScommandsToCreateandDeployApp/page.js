import PrismLoader from "@/Components/prism-loader";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";
import '@/app/page.css';

const page = () => {

    const welcomeSomeOneContent = "`Welcome ${request.data.name} to our first CAPM Project`" ;

    return (
        <div className="indexing">
            <h1 className="headline">CDS Commands to Create and Deploy the CAP Application.</h1>

            <h3 className="objective">Objective</h3>

            <p className="paragraph">
                We will see all the commands which can be used to create and deploy a CAP Application.
            </p>

            <h3 className="heading">Commands to follow</h3>

            <p className="paragraph">
                Suppose we are creating a CAP App named <span className="tomato">managementCAP</span>
            </p>


            <p className="paragraph">
                To <span className="lightGreen">create managementCAP app</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds init managementCAP  `}
            </SyntaxHighlighter>
            
            
            <p className="paragraph">
                Now, <span className="lightGreen">go inside the Folder</span>, and install the dependencies.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cd managementCAP  `}
            </SyntaxHighlighter>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` npm install  `}
            </SyntaxHighlighter>
            
            
            
            <p className="paragraph">
                After <span className="lightGreen">creating the Schema, if you want to generate csv file to store sample data</span>, use the below command.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds add data  `}
            </SyntaxHighlighter>
            
            
            
            <p className="paragraph">
                If you want to deploy the db data in <span className="lightGreen">SQLite server </span>, add the below line of code in <span className="tomato">package.json file below the script object</span>,
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {`
"cds" : { "requires" : {
    "db" : {
        "kind" : "sqlite",
        "credentials: " : { "url" : "db/managementCAP.sqlite" }
        }
    }
}
                `}
            </SyntaxHighlighter>


            <p className="paragraph">
                OR Use the below line of command to deploy it.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds deploy --to sqlite:./db.sqlite `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, <span className="tomato">to add hana, mta file, xsuaa and approuter file</span>, use the below command.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds add hana,mta,xsuaa,approuter --for production  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Use the below line of command to deploy it.
            </p>

            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cds deploy  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, Use the below line of command to <span className="lightGreen">update and lock the package lock file</span>.
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` npm update --package-lock-only  `}
            </SyntaxHighlighter>
            

            <p className="paragraph">
                Now, to <span className="lightGreen">generate Build File of the Project</span>, use the below command,
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` mbt build -t gen --mtar mta.tar  `}
            </SyntaxHighlighter>


            <p className="paragraph">
                Now, to <span className="lightGreen">Deploy the CAP Project</span>, use the below command,
            </p>


            <SyntaxHighlighter language="javascript" style={atomDark}>
                {` cf deploy gen/mta.tar  `}
            </SyntaxHighlighter>




            <p className="list bold pinky">
                Now, your app is successfully deployed to Subaccount Space you are logged in.
            </p>



            {/* <PrismLoader /> */}


        </div>
    );
}

export default page;