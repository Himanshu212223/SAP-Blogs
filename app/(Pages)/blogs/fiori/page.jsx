import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
  const code1 = `<Here comes the code>`;

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl">Template File</h1>

        <h1 className="text-5xl">Heading 1</h1>

        <h2 className="text-4xl">Heading 2</h2>

        <h3 className="text-3xl">Heading 3</h3>

        <h4 className="text-2xl">Heading 3</h4>


        <span className="text-gray-950 font-semibold">Bold Content</span>

        <ul className="list-disc ml-6">
            <li>content list item 1</li>
            <li>content list item 2</li>
            <li>content list item 3</li>
            <li>content list item 4</li>
        </ul>
        
        <ul className="list-decimal ml-6">
            <li>content list item 1</li>
            <li>content list item 2</li>
            <li>content list item 3</li>
            <li>content list item 4</li>
        </ul>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/1-manage-multi-language-using-i18n/README.md" />
        </div>

        <div>
            <CodeSnippet code={code1} language="xml" title="View1.view.xml" />
        </div>
        


        Filter, sort on table / List
        Routing Navigation
        Page, Pannel, Shell, App Controls
        Formatter, Dialog, Fragment, Nested View
        Custom Control
    </div>
  );
};

export default page;
