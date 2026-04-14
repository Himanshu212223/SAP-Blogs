"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// 👇 NEW IMPORTS
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSnippet({ code, language, title}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#0d1117] text-white rounded-xl overflow-hidden border border-gray-700">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-700">
        <span className="text-sm font-semibold">{title}</span>

        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem"
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}