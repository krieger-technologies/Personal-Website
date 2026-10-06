import React from 'react';
import '../styles/resume.css';

/* function Resume() { */
const Resume = () => {
  return (
    <div className="Resume">
      <div className="ResumeContent">
        <h1>Resume</h1>
        <h3>
            <u>DHL - North America, Data Analytics</u>
            <br />February 2025 - Present
        </h3>
        <h4>Senior Data Engineer, Data Analytics</h4>
        <p>
          DHL acquired Inmar Intelligence in Feb 2025. My team develops and maintains e-commerce returns reporting for internal and external users.
        </p>
        <ul>
          <li>
            Built Python scripting automations to reduce technical debt and improve project planning by parsing XML files, generating text from planning documents,
            and updating SQL queries across multiple reports. On average saving 5+ hours per sprint and improving accuracy and efficiency of our workstreams
          </li>
          <li>
            Reverse-engineered an undocumented legacy Alteryx workflow and rebuilt it as a transactional T-SQL stored procedure with ADF orchestration, 
            preventing a client's monthly commission reporting from being disrupted during a company-wide tool deprecation
          </li>
          <li>
            Coordinated concurrency testing (~220 peak simultaneous users) with a DBA-led load simulation and the CX team, validating dashboard performance 
            under production-level load ahead of go-live
          </li>
          <li>
            Ensuring that key client reports can pull from multiple Warehouse Management Systems (WMS) and output a single standardized report
          </li>
          <p></p>
          <li><b>Tools:</b> SQL Server Management Studio, Azure Data Factory, t-SQL</li>
        </ul>
        <h3>
          <u>Inmar Intelligence, Product Life Cycle Engineering</u>
          <br />November,  2022 - February, 2025
        </h3>
        <h4>
          Associate Data Engineer, Data Analytics
        </h4>
        <p>
          Inmar Intelligence specializes in delivering technology and data solutions helping retailers and brands manage commerce and reverse logistics reporting.
        </p>
        <ul>
          <li>
            Reducing our schema load times by 50% through organization and optimization of spark settings
          </li>
          <li>Conversion of several suites of reports from platforms scheduled to be decommissioned onto my team’s reporting platform. Over 50 reports across 3 platforms to date.</li>
          <li>Development of new reporting and analytics for clients and internal monitoring</li>
          <p></p>
          <li><b>Tools:</b> Incorta, Spark SQL, PySpark, Python, Excel</li>
        </ul>
        <h3>
          <u>Danone North America, Revenue Growth Management</u>
          <br />March 2020 - October 2022
        </h3>
        <h4>
          Data Analyst, Advanced Analytics
        </h4>
        <p>
          Danone is one of the largest dairy and dairy alternative manufacturers in North America where I supported Sales and Go-To-Market teams with analytics on pricing, promotions, and retail placements.
        </p>
        <ul>
          <li>Delivery of key insights and tooling to all other business units. Our reporting and tools were used to regularly
            achieve $5-10MM in quarterly efficiencies
          </li>
          <li>
            Stakeholders used our reporting and insights to focus on price pack architecture,
            trade strategies, long-term funding strategies, program analytics, and customer willingness to pay
          </li>
          <p></p>
          <li><b>Tools:</b> Power BI, Python, SQL, Excel, Snowflake</li>
        </ul>
        <h3><u>Education</u></h3>
        <h4>Michigan State University, B.A. of Economics
          <br />2019
        </h4>
        <p>Minor in Data Analytics; with special focus on Econometrics, programming in python & R, and
          statistics
        </p>
      </div>
    </div>
  );
}

export default Resume;
