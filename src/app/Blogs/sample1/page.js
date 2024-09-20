import PrismLoader from "@/Components/prism-loader";

const sample1 = () => {
    return (
        <>
            Welcome to sample1

            <pre className="language-js line-numbers">
                <code className="language-js">
                    console.log("hello world");
                </code>
            </pre>
            <pre className="language-ts line-numbers">
                <code className="language-ts">console.log("hello world")</code>
            </pre>
            <PrismLoader />
        </>
    );
}

export default sample1;