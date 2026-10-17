import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/resume.css';

/* function Resume() { */
const Resume = () => {
  // Drop the bottom fade once scrolled to the end so the last lines stay readable
  const boxRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);

  const checkBottom = useCallback(() => {
    const el = boxRef.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  }, []);

  // also on load/resize: a tall screen may show everything without scrolling
  useEffect(() => {
    checkBottom();
    window.addEventListener('resize', checkBottom);
    return () => window.removeEventListener('resize', checkBottom);
  }, [checkBottom]);

  return (
    <div className="Resume">
      <div
        ref={boxRef}
        onScroll={checkBottom}
        className={`ResumeContent${atBottom ? ' at-bottom' : ''}`}
      >
        <h1>Resume</h1>
        <h3>
            <u>DHL - North America, Analytics</u>
            <br />February 2025 - Present
        </h3>
        <h4>Data Engineer, Analytics</h4>
        <p>
          DHL acquired Inmar Intelligence in Feb 2025. My team develops and maintains e-commerce returns reporting for internal and external users.
        </p>
        <ul>
          <li>
            Standing up a new production reporting platform serving ~400 users to new infrastructure, including data source migration, indexing, security groups, 
            and configuring global settings with tenant specific settings to preserve load performance, security, and urgent notification functions when they arise
          </li>
          <li>
            Reverse-engineered an undocumented Alteryx workflow and rebuilt it as a transactional T-SQL stored procedure with ADF orchestration, 
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
            Reducing our schema load times by 50% through optimizing spark settings
          </li>
          <li>
            Built Python automations to reduce technical debt and improve project planning by parsing XML files, generating text from planning documents,
            and updating SQL queries across multiple reports. On average saving 5+ hours and improving accuracy and efficiency of our workstreams
          </li>
          <li>Conversion of several suites of reports from platforms scheduled to be decommissioned onto my team’s reporting platform. Over 50 reports across 3 reporting platforms.</li>
          <li>Development of new reporting and analytics for clients and internal monitoring inculding Advanced Shipment Notifications and Warehouse Container Processing Times</li>
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
          <li>Delivery of key insights around pricing and demand to all other business units. Our reporting and tools were used to regularly
            achieve $5-10MM in quarterly efficiencies
          </li>
          <li>
            I built a custom forcasting tool with the Facebook Prophet open source model to help with demand planning.
          </li>
          <li>
            I built several Python automations to reduce our technical debt, reduce our odds of human error, and cut reporting turn around time down from
            3+ hours to minutes
          </li>
          <li>
            Migration of a Product Scorecard report from Excel into a much more robust PowerBI report complete with more in depth metrics and views and automated refreshes from a live database
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
