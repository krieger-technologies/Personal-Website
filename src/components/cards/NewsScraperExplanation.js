export default function NewsScraperExplanation() {
  return (
    <div className="news-explanation-card">
        <div className="news-text">
        <p className="indent">First and foremost I want to clarify that this was never intended to be a source of objective truth for current events
            or anything of that nature. Plain and simple, this is a hobby study evaluating what is happening in the media landscape. Although I've done no sentiment
        analysis, there is still bias baked into what various publications decide to write about, and all of those should be considered when viewing
        this data. Many true things can be inferred from the data presented, but context and methodology should always be taken into consideration.</p>
        <p className="indent">
        This started out as a relatively simple project in concept, but spanned many new and interesting fields of tech to pull off.<br/>
        The idea is simple, find some easily scrape-able and often updated news source, and do some basic analysis. Also, figure out
        how to update it automatically and host it on my website. Here is what I have put together and some details about the trials and tribulations 
        I faced in the process.</p>
        <p>
        <ul>
            <li>I set up an automated google alert in a project email address to notify me of any US based news articles that mention the word "ban".
            This was by far the easiest part. Perhaps in some future iteration I will attempt to set up my own internet crawling script. But for now this
            gets the job done.</li><br/>
            <li>I then wrote a local python script to scrape out these email alerts, parse out the interesting and useful data, organize it into a dataframe, 
            categorize it, and plot it via plotly graphics.</li>
            <ul>
                <li>This is a slippery and fun challenge to grapple with once you start accumulating some data. Figuring out how to dial in the parsing / regex
                to be maximally accurate across a wide range of articles and subject is not easy!</li>  
            </ul><br/>
            <li>The next step was to figure out how to migrate and host it on AWS and feed it into my website.<br/>
            I went through several different methods to get this one to work correctly</li>
            <ul>
                <li>Firstly I attempted to convert my local python script into a lambda function. However I ran into problems in trying to use pandas in AWS lambda.
                Since pandas is a pretty large package it does not easily translate. I attempted to find various ways to slim is down with docker or using klayers, but
                eventually threw my hands up.
                </li>
                <li>
                Next I created an EC2 instance. This was definetly a step closer and got me some good experience setting up an environment to run my python in and writting
                / converting it with vim/nano and using some linux style programming to set up my directories, store my sensetive information in secure ways, etc. 
                </li>
                <li>
                Next I set up an RDS to write my cleaned up emails and final dataframe into, and set up an API to feed into my website. What I didn't fully realize is that
                I would need to keep my EC2 instance running 24/7 despite only wanting to run my script once a day/week. Although I set my EC2 up very cheaply, it would still be
                a waste of money. So I explored more efficient options.
                </li>
                <li>
                And finally, for its current state (at least for the moment), I decided to write my scraping data out to a publicly available JSON in my S3 bucket and read THAT into
                my website. It loads much faster than my live DB and API and my EC2 only runs when I want to scrape my emails. 
                </li>
            </ul>
        </ul></p>
        <p className="indent">
        Although my website and this project might be simple by many modern standards, it still easily achieves enough complexity to still offer a host of other efficiencies and options
        to explore to further improve and expand on. For example; I would still like to enable dynamic filtering for my insights, display a dynamic table, further expand my google alerts
        or web scraping, and improve my text parsing logic just to name a few things!
        </p>
        </div>
    </div>
  );
}
