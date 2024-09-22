import PrismLoader from "@/Components/prism-loader";
import Image from "next/image";

const sample1 = () => {
    return (
        <div className="indexing">
            <h1 className="headline">Connect Fiori Application to JSON Model</h1>

            <h3 className="heading">Objective</h3>

            <p className="paragraph">
                We will try to connect our Fiori Application to JSON Model.
            </p>

            <h3 className="heading">Procedure</h3>

            <p className="paragraph">
                To connect our Fiori UI5 application with JSON Model, we need to first create JSON file in our model.
            </p>

            <ul>
                <li className="list">
                    1. Go to your Fiori Application and on Model folder, create a JSON file (say we are creating SampleModel.json).
                </li>
            </ul>

            <Image src="/resources/createModel.png" width={200} height={200} alt="Picture of the author"  />

            <ul>
                <li className="list">
                    2. Now, go to <span className="tomato">manifest.json</span> file, and on models, add the following code.
                </li>
            </ul>

            <pre className="flex-column">
                <code className="language-js">
                &#x22;DataModel&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                &ldquo;type&ldquo;: &ldquo;sap.ui.model.json.JSONModel&ldquo;,
                </code>

                <code className="language-js">
                &ldquo;uri&ldquo;: &ldquo;model/SampleModel.json&ldquo;
                </code>

                <code className="language-js">
                &#x7d;
                </code>
            </pre>

            <p className="paragraph">
                Here, DataModel is the name we will use to call the Json Model, and inside the uri we are providing the address of the json model.
            </p>

            <p className="paragraph">
                So, now your models section will look like this - 
            </p>

            <pre className="flex-column">
                <code className="language-js">
                &#x22;models&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                &#x22;i18n&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                &ldquo;type&ldquo;: &ldquo;sap.ui.model.resource.ResourceModel&ldquo;,
                </code>

                <code className="language-js">
                &#x22;settings&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                &ldquo;bundleName&ldquo;: &ldquo;basic.sap.i18n.i18n&ldquo;
                </code>

                <code className="language-js">
                &#x7d;
                </code>

                <code className="language-js">
                &#x7d;&#x2c;
                </code>

                <code className="language-js">
                &#x22;DataModel&#x22;&#x3a;&#x7b;
                </code>

                <code className="language-js">
                &ldquo;type&ldquo;: &ldquo;sap.ui.model.json.JSONModel&ldquo;,
                </code>

                <code className="language-js">
                &ldquo;uri&ldquo;: &ldquo;model/SampleModel.json&ldquo;
                </code>

                <code className="language-js">
                &#x7d;
                </code>

                <code className="language-js">
                &#x7d;&#x2c;
                </code>
            </pre>

            <PrismLoader />
        </div>
    );
}

export default sample1;