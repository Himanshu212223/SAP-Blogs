import CodeSnippet from "@/components/custom/codeSnippet";
import RedirectButton from "@/components/ui/redirectButton";
import React from "react";

const page = () => {
  const code1 = `<Here comes the code>`;


//   ############################## UI #######################################

  return (
    <div className="flex flex-col gap-5 text-gray-500 text-lg h-full">

        <h1 className="text-5xl wrap-break-word">Template File</h1>

        <h1 className="text-5xl wrap-break-word">Heading 1</h1>

        <h2 className="text-4xl wrap-break-word">Heading 2</h2>

        <h3 className="text-3xl wrap-break-word">Heading 3</h3>

        <h4 className="text-2xl wrap-break-word">Heading 3</h4>


        <span className="text-gray-950 font-semibold wrap-break-word">Bold Content</span>

        <ul className="list-disc ml-6">
            <li className="wrap-break-word">content list item 1</li>
            <li className="wrap-break-word">content list item 2</li>
            <li className="wrap-break-word">content list item 3</li>
            <li className="wrap-break-word">content list item 4</li>
        </ul>
        
        <ul className="list-decimal ml-6">
            <li className="wrap-break-word">content list item 1</li>    
            <li className="wrap-break-word">content list item 2</li>
            <li className="wrap-break-word">content list item 3</li>
            <li className="wrap-break-word">content list item 4</li>
        </ul>

        {/* Redirect Button */}
        <div>
            <RedirectButton text="Github Repo" link="https://github.com/HimanshuSap124/SAP-Fiori-UI5-Application/blob/1-manage-multi-language-using-i18n/README.md" />
        </div>

        <div>
            <CodeSnippet code={code1} language="xml" title="View1.view.xml" />
        </div>


        <table className="border-collapse border border-gray-400 wrap-break-word">
            <thead>
                <tr>
                    <th className="border border-gray-300 wrap-break-word">State</th>
                    <th className="border border-gray-300 wrap-break-word">City</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Indiana</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Indianapolis</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Ohio</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Columbus</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-3 wrap-break-word">Michigan</td>
                    <td className="border border-gray-300 px-3 wrap-break-word">Detroit</td>
                </tr>
            </tbody>
        </table>
        

        <p className="text-1xl text-blue-600 wrap-break-word">!!! Its Done !!!</p>


        Filter, sort on table / List
        Routing Navigation
        Page, Pannel, Shell, App Controls
        Formatter, Dialog, Fragment, Nested View
        Custom Control
    </div>
  );
};

export default page;