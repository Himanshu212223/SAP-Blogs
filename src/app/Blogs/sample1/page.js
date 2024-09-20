import PrismLoader from "@/Components/prism-loader";

const sample1 = () => {
    return (
        <div className="indexing">
            Welcome to sample1

            <pre>
                <code className="language-js">
                    console.log(&quot;hello world&quot;);
                </code>
            </pre>
            <pre>
                <code className="language-ts">console.log(&quot;hello world&quot;);</code>
            </pre>
            <PrismLoader />
        </div>
    );
}

export default sample1;