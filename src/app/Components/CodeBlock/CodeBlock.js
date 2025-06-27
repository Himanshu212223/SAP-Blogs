'use client'; // <- ensures this component is treated as a client component

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ code, language = 'javascript' }) {
  return (
    <SyntaxHighlighter language={language} style={atomDark}>
      {code}
    </SyntaxHighlighter>
  );
}
