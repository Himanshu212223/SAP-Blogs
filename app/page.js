import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl md:text-6xl font-bold text-gray-400 mb-4">NOTE<span className="text-gray-950">S AP</span>P</h1>
      <p className="text-gray-500">Reference Notes for SAP Fiori & CAPM</p>
      <p className="text-gray-500 text-center max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed">An SAP Notes App or blog platform where I document my learnings in SAP Fiori UI5 and CAPM development using simple examples, so I can easily refer back in the future and reuse code snippets whenever needed.</p>
    </div>
  );
}
