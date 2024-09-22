import '@/app/page.css';

export default function Home() {
  return (
    <div>

      <h1 className='headline'>Fiori UI5 and CAPM Documentation</h1>

      <h3 className='sub-headline'>Fiori UI5</h3>

      <p className='content-p'>
        SAP Fiori is a user experience (UX) design approach and a set of applications developed by SAP that aims to provide a more intuitive and user-friendly interface for SAP software. It focuses on delivering a consistent and responsive experience across devices, whether on desktops, tablets, or smartphones.
      </p>

      <p className='content-p bold underline'>Key features of SAP Fiori include:</p>

      <ul className='ul'>
        <li>
          Role-Based Access: Applications are designed around user roles, making it easier for users to access the functions they need.
        </li>
        <li>
          Responsive Design: Fiori apps adapt to different screen sizes and orientations, providing a seamless experience on any device.
        </li>
        <li>
          Simple and Intuitive: The design emphasizes simplicity, minimizing clutter and focusing on essential tasks.
        </li>
        <li>
          Integration with SAP: Fiori applications are built to integrate smoothly with SAP backend systems, utilizing technologies like SAP HANA.
        </li>
        <li>
          Extensibility: Developers can customize and extend Fiori apps to meet specific business needs.
        </li>
      </ul>

      <h3 className='sub-headline'>CAPM</h3>

      <p className='content-p'>
        SAP CAPM (Cloud Application Programming Model) is a development framework provided by SAP to simplify the creation of business applications in the cloud. It helps developers build enterprise-grade applications quickly and efficiently, leveraging the capabilities of the SAP Business Technology Platform (BTP).
      </p>

      <p className='content-p bold underline'>Key features of CAPM:</p>

      <ul className='ul'>
        <li>
          Domain-driven Design: CAPM encourages a model-driven approach, allowing you to focus on business logic rather than low-level programming.
        </li>
        <li>
          Multi-language Support: It supports multiple programming languages, primarily Node.js and Java, enabling developers to use familiar environments.
        </li>
        <li>
          Consistent APIs: CAPM provides a unified set of APIs for building and consuming services, streamlining the development process.
        </li>
        <li>
          Integration with SAP Services: The model integrates seamlessly with various SAP services, including database services and application services.
        </li>
        <li>
          Support for Cloud and On-Premise: CAPM can be used to develop applications that run in the cloud or on-premise, providing flexibility depending on business needs.
        </li>
        <li>
          Open Standards: The framework uses open standards like OData and CDS (Core Data Services), promoting interoperability and ease of integration.
        </li>
      </ul>

    </div>
  );
}
