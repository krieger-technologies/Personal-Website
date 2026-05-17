import '../../styles/NewsScraperExplanation.css';
export default function NewsScraperExplanation() {
  return (
    <div className="news-explanation-card">
      <div className="news-text">

        {/* ── INFOGRAPHIC ── */}
        <div className="pipeline-card">

          <div className="pipeline-card__topper" />

          <div className="pipeline-card__header">
            <div className="pipeline-eyebrow">Pipeline Overview</div>
            <h2 className="pipeline-title">News Scraper — ETL Architecture</h2>
            <p className="pipeline-subtitle">
              End-to-end pipeline scraping Google Alert emails to classify U.S. legislative
              ban headlines by state and topic, publishing live data to a React frontend.
            </p>
          </div>

          <div className="pipeline-steps">

            <div className="pipeline-step">
              <div className="pipeline-spine">
                <div className="pipeline-node pipeline-node--blue">01</div>
                <div className="pipeline-connector" />
              </div>
              <div className="pipeline-body">
                <div className="pipeline-label pipeline-label--blue">Ingest</div>
                <div className="pipeline-step-title">Google Alerts via Gmail API</div>
                <div className="pipeline-step-desc">
                  A Google Alert monitors the web for "ban" headlines and delivers results
                  by email. The Gmail API paginates through 500+ messages per run using
                  OAuth2 credentials.
                </div>
                <div className="pipeline-tags">
                  <span className="pipeline-tag pipeline-tag--blue">Gmail API</span>
                  <span className="pipeline-tag pipeline-tag--blue">Google Alerts</span>
                  <span className="pipeline-tag pipeline-tag--blue">OAuth2</span>
                </div>
              </div>
            </div>

            <div className="pipeline-step">
              <div className="pipeline-spine">
                <div className="pipeline-node pipeline-node--blue">02</div>
                <div className="pipeline-connector" />
              </div>
              <div className="pipeline-body">
                <div className="pipeline-label pipeline-label--blue">Parse</div>
                <div className="pipeline-step-title">Email Parsing & Link Extraction</div>
                <div className="pipeline-step-desc">
                  Emails are Base64-decoded, split into article blocks, and parsed for
                  headline text and URLs. Google redirect wrappers are unwrapped to recover
                  original source links.
                </div>
                <div className="pipeline-tags">
                  <span className="pipeline-tag pipeline-tag--blue">base64</span>
                  <span className="pipeline-tag pipeline-tag--blue">regex</span>
                  <span className="pipeline-tag pipeline-tag--blue">urllib</span>
                </div>
              </div>
            </div>

            <div className="pipeline-step">
              <div className="pipeline-spine">
                <div className="pipeline-node pipeline-node--green">03</div>
                <div className="pipeline-connector" />
              </div>
              <div className="pipeline-body">
                <div className="pipeline-label pipeline-label--green">Classify</div>
                <div className="pipeline-step-title">State & Geography Detection</div>
                <div className="pipeline-step-desc">
                  Headlines are matched against a custom regex dictionary covering all 50
                  states — including abbreviations, cities, and political figures
                  (e.g. Newsom → California). Unmatched articles are tagged National / Unknown.
                </div>
                <div className="pipeline-tags">
                  <span className="pipeline-tag pipeline-tag--green">regex</span>
                  <span className="pipeline-tag pipeline-tag--green">50 states + D.C.</span>
                </div>
              </div>
            </div>

            <div className="pipeline-step">
              <div className="pipeline-spine">
                <div className="pipeline-node pipeline-node--green">04</div>
                <div className="pipeline-connector" />
              </div>
              <div className="pipeline-body">
                <div className="pipeline-label pipeline-label--green">Classify</div>
                <div className="pipeline-step-title">Topic & Keyword Tagging</div>
                <div className="pipeline-step-desc">
                  After NLTK stopword removal, headlines are matched against a
                  priority-ordered library of 50+ topics (cannabis, AI, guns, voting, and
                  more). Up to 3 tags per headline, with a regex fallback for unknowns.
                </div>
                <div className="pipeline-tags">
                  <span className="pipeline-tag pipeline-tag--green">NLTK</span>
                  <span className="pipeline-tag pipeline-tag--green">50+ topics</span>
                  <span className="pipeline-tag pipeline-tag--green">priority matching</span>
                </div>
              </div>
            </div>

            <div className="pipeline-step">
              <div className="pipeline-spine">
                <div className="pipeline-node pipeline-node--orange">05</div>
                <div className="pipeline-connector" />
              </div>
              <div className="pipeline-body">
                <div className="pipeline-label pipeline-label--orange">Transform</div>
                <div className="pipeline-step-title">Deduplication & Aggregation</div>
                <div className="pipeline-step-desc">
                  Data is loaded into a Pandas DataFrame. Duplicate URLs and malformed
                  records are dropped, dates normalized to ISO 8601 UTC, and two output
                  datasets are built — a row-level detail table and a top-10 summary.
                </div>
                <div className="pipeline-tags">
                  <span className="pipeline-tag pipeline-tag--orange">pandas</span>
                  <span className="pipeline-tag pipeline-tag--orange">deduplication</span>
                  <span className="pipeline-tag pipeline-tag--orange">ISO 8601</span>
                </div>
              </div>
            </div>

            <div className="pipeline-step pipeline-step--last">
              <div className="pipeline-spine">
                <div className="pipeline-node pipeline-node--orange">06</div>
                <div className="pipeline-connector" />
              </div>
              <div className="pipeline-body">
                <div className="pipeline-label pipeline-label--orange">Load</div>
                <div className="pipeline-step-title">Publish to S3 → React Frontend</div>
                <div className="pipeline-step-desc">
                  Three JSON files — detail table, bar chart summary, and run timestamp —
                  are written to S3 via boto3. The React frontend fetches these on load and
                  renders live infographics with no database required.
                </div>
                <div className="pipeline-tags">
                  <span className="pipeline-tag pipeline-tag--orange">AWS S3</span>
                  <span className="pipeline-tag pipeline-tag--orange">boto3</span>
                  <span className="pipeline-tag pipeline-tag--orange">React</span>
                </div>
              </div>
            </div>

          </div>{/* end pipeline-steps */}

          <div className="pipeline-divider"><span>Infrastructure</span></div>

          <div className="pipeline-infra">
            <div className="pipeline-infra-item">
              <div className="pipeline-infra-icon">🖥️</div>
              <div className="pipeline-infra-lbl">Compute</div>
              <div className="pipeline-infra-val">AWS EC2 Amazon Linux 2023</div>
            </div>
            <div className="pipeline-infra-item">
              <div className="pipeline-infra-icon">⏱️</div>
              <div className="pipeline-infra-lbl">Scheduling</div>
              <div className="pipeline-infra-val">Lambda + CloudWatch Cron</div>
            </div>
            <div className="pipeline-infra-item">
              <div className="pipeline-infra-icon">🪣</div>
              <div className="pipeline-infra-lbl">Storage</div>
              <div className="pipeline-infra-val">AWS S3 Static Hosting</div>
            </div>
          </div>

        </div>{/* end pipeline-card */}
        <p className="indent">
        This started out as a relatively simple project in concept, but spanned many new and interesting fields of tech to pull off.<br/>
        The idea is simple, find some easily scrape-able and often updated news source, and do some basic analysis. My stretch goal was to fully automate it and
        make it a living process anyone with internet access can view. Here are some of the trials and tribulations I've faced;</p>
        <p>
        <p>
        <u>A few notes & details about the process:</u>
        <ul>
            <li>A Google news alert into an email address I setup just for this project seemed like the easiest way to begin aggregating a large volume of real world data.
                A throwaway email has the benefit of keeping my main personal email address clean and free of clutter. In future iterations it might be interesting to test out some ideas
                on how to cast a wider net or selectively scrape/avoid specific news sources.
            </li>
            <li>The cron job → lambda function → EC2 instance is very useful combination I discovered that enables me to run my data scraping / cleaning script at regular intervals
                without needing to keep my personal laptop on 24/7 or pay for unecessary resources from AWS. These tools cost me about $4/month.<br/>
                Staying on top of text parsing is a never ending task, but provides a fun puzzle in how to accurately parse and organize hundreds and thousands of headlines.
                Maybe in some future iteration I will try my hand at some more advanced analytics on this data.
            </li>
            <li>
                JSON is not an effcient storage format for this type of data repository. I did briefly set up an RDS database and API connection, but quickly shut it down since
                I didn't want to have to pay for API calls to a live database hosted on AWS. In a future iteration I will switch to parquet file data storage.
            </li>
            <li>I also have set up a sort of ETL processing history in my S3 bucket that retains the last 30 days of metadata in case something breaks and I need to truobleshoot</li>
        </ul>
        </p>
        <p>
        <u>My Greatest Challenge:</u>
        </p>
        <ul>
            <li>
            The greatest challenge I faced was without a doubt in figuring out how to host my cleaning script on AWS and running it in a cost effective fashion. I spent maybe a month
            trying to jam the entire thing inside a lambda function and trying to compress and slim down my pandas package with docker. In the end it proved to be much easier to 
            create the EC2 instance and use lambda + cron to turn on the environment, run my script, then turn the instance back off once complete. 
            </li>
        </ul></p>
        <p className="indent">
        Although my website and this project might be simple by many standards, it still easily achieves enough complexity to offer a host of other efficiencies and options
        to explore and further improve/expand on.
        </p>
        </div>
    </div>
  );
}
