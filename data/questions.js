export const INTRO = {
  title: "CS1: Actuarial Statistics",
  body: "CS1 is one of the IFoA's core statistics subjects. It builds the statistical foundation used throughout the actuarial qualification -- covering probability theory, distributions, estimation, hypothesis testing, and regression -- and introduces Bayesian methods that reappear heavily in later subjects like SP/SA papers. Where CM1 is about the time value of money, CS1 is about handling data and uncertainty: fitting distributions to real data, estimating unknown parameters, testing whether a pattern is real or just noise, and formally updating beliefs as new evidence arrives. It's a demanding subject because each chapter builds on the last -- probability underpins random variables, random variables underpin estimation, estimation underpins hypothesis testing and regression. Skipping a shaky chapter tends to cause trouble two or three chapters later.",
};

export const CHAPTERS = [
  { n: 1, title: "Data analysis" },
  { n: 2, title: "Random variables and distributions" },
  { n: 3, title: "Generating functions" },
  { n: 4, title: "Joint distributions and dependence" },
  { n: 5, title: "Expectations and conditional expectations" },
  { n: 6, title: "The Central Limit Theorem" },
  { n: 7, title: "Random sampling and sampling distributions" },
  { n: 8, title: "Estimation and estimators" },
  { n: 9, title: "Confidence intervals and prediction intervals" },
  { n: 10, title: "Hypothesis testing and goodness of fit" },
  { n: 11, title: "Exploratory data analysis (correlation & PCA)" },
  { n: 12, title: "Linear regression" },
  { n: 13, title: "Generalised linear models" },
  { n: 14, title: "Bayesian statistics I: Bayes' theorem and estimation" },
  { n: 15, title: "Bayesian statistics II: credible intervals and loss functions" },
  { n: 16, title: "Bayesian statistics III: credibility theory" },
];



   1: {
  title: "Chapter 1: Data Analysis",
  body: `
    <h3>1. What is data analysis?</h3>
    <p><strong>Definition:</strong> Data analysis is the process of turning raw data into useful information that helps you make a decision.</p>
    <ul>
      <li><strong>Raw data:</strong> facts and figures as they were recorded, before any sorting or summarising.</li>
      <li><strong>Information:</strong> data that has been organised so it means something and can be acted on.</li>
    </ul>
    <p><em>Example:</em> A pizza shop has a record of every order this month (raw data). It counts the orders by day and finds that Friday is the busiest (information), so it puts extra staff on Fridays (decision).</p>
    <p><em>Why actuaries care:</em> an actuary does this every day, just with claims instead of pizzas &mdash; raw claims records become "claims frequency is rising in this region," which becomes a decision to adjust next year's premiums.</p>

    <h3>2. The three types of data analysis</h3>
    <p>Each type goes one step further than the one before.</p>
    <p><strong>Descriptive &rarr; Inferential &rarr; Predictive</strong></p>
    <p><strong>Descriptive: What happened?</strong><br>
    Summarises the data you have into simple numbers or charts. It makes no claims beyond that data.<br>
    <em>Example:</em> "The shop sold an average of 100 pizzas a day last month."</p>
    <p><strong>Inferential: What is true for everyone?</strong><br>
    Uses a sample (a small group actually studied) to draw conclusions about the population (the entire group you actually care about &mdash; could be all customers, all policies, all claims). The sample must fairly represent the population.<br>
    <em>Example:</em> "80 of the 100 customers we asked like the new pizza, so about 80% of all customers probably like it."<br>
    <em>Watch out:</em> asking only the shop's Instagram followers would miss customers who don't use Instagram, so the result would be biased.</p>
    <p><strong>Predictive: What will happen next?</strong><br>
    Uses past data to forecast the future. Patterns are learned from one set of data (the training set) and checked on a separate set (the test set), to make sure the pattern actually holds up rather than just fitting the data it was built on.<br>
    <em>Example:</em> "Based on the last two years of sales, the shop will sell about 150 pizzas next Friday."</p>
    <table>
      <tr><th>Type</th><th>Question</th><th>Example</th></tr>
      <tr><td>Descriptive</td><td>What happened?</td><td>Average of 100 pizzas a day</td></tr>
      <tr><td>Inferential</td><td>What is true for everyone?</td><td>80% of customers like the new pizza</td></tr>
      <tr><td>Predictive</td><td>What will happen next?</td><td>About 150 pizzas next Friday</td></tr>
    </table>
    <p><em>Why actuaries care:</em> a pricing actuary uses all three in sequence &mdash; descriptive stats on last year's claims, inference about the wider policyholder base from a sample, then a predictive model to set next year's premium.</p>

    <h3>3. The data analysis process</h3>
    <p><em>Example: The pizza shop wants to know why online orders have dropped.</em></p>
    <table>
      <tr><th>Step</th><th>What it means</th><th>Pizza shop example</th></tr>
      <tr><td>1. Set objectives</td><td>Decide exactly what the analysis must answer</td><td>"Why have online orders fallen?"</td></tr>
      <tr><td>2. Identify the data needed</td><td>Decide which data items are required</td><td>Order dates, delivery times, ratings</td></tr>
      <tr><td>3. Collect the data</td><td>Gather it from inside or outside the business</td><td>Download records from the ordering app</td></tr>
      <tr><td>4. Process and format</td><td>Put the data into a usable form</td><td>Load it into Excel or R</td></tr>
      <tr><td>5. Clean the data</td><td>Fix missing, unusual or inconsistent values</td><td>Remove duplicate orders</td></tr>
      <tr><td>6. Explore the data</td><td>Carry out descriptive, inferential or predictive analysis</td><td>Compare delivery times before and after the drop</td></tr>
      <tr><td>7. Model the data</td><td>Build a model to explain or predict</td><td>Model how delivery time affects repeat orders</td></tr>
      <tr><td>8. Communicate results</td><td>Report the data used, method, assumptions, findings and limitations</td><td>"Orders fell because deliveries got 15 minutes slower"</td></tr>
      <tr><td>9. Monitor and repeat</td><td>Update the data and rerun when needed</td><td>Repeat the analysis every quarter</td></tr>
    </table>
    <p>Throughout the process: follow professional standards and the law, e.g. data protection rules and rules against unfair discrimination.</p>
    <p><em>Why actuaries care:</em> this 9-step process is essentially a compressed version of how a real actuarial investigation gets signed off &mdash; a reserving report or pricing review goes through the same objectives &rarr; data &rarr; model &rarr; communicate &rarr; monitor cycle, and step 8 (documenting assumptions and limitations) is exactly what's expected in a professional actuarial report.</p>

    <h3>4. Data sources</h3>
    <p><strong>Primary and secondary data</strong></p>
    <table>
      <tr><th>Type</th><th>Meaning</th><th>Example</th></tr>
      <tr><td>Primary</td><td>You collect it yourself</td><td>The shop surveys its own customers</td></tr>
      <tr><td>Secondary</td><td>Someone else collected it and you reuse it</td><td>The shop uses a published report on eating-out trends</td></tr>
    </table>
    <p>Primary data comes from either an experiment (you control the conditions) or an observational study (you just record what happens, e.g. a survey).</p>
    <p><strong>What can make data less accurate</strong></p>
    <ul>
      <li>Manual entry: people typing data in make mistakes.</li>
      <li>Low precision: age recorded as "18 to 30" instead of the exact age.</li>
      <li>No checks: nothing stops impossible values, such as a delivery time of minus 5 minutes.</li>
      <li>Converting formats: moving data from one system to another can introduce errors.</li>
    </ul>
    <p><strong>Sampling methods</strong></p>
    <table>
      <tr><th>Method</th><th>Meaning</th><th>Example</th></tr>
      <tr><td>Simple random</td><td>Everyone has an equal chance of being picked</td><td>Pick 100 customers at random from the full list</td></tr>
      <tr><td>Stratified</td><td>Split people into groups, then pick randomly from each group</td><td>Pick 50 students and 50 families so both are fairly represented</td></tr>
    </table>
    <p>Grouped data: data is sometimes grouped (e.g. into age bands) to protect people's privacy.</p>
    <p><strong>Types of data</strong></p>
    <table>
      <tr><th>Type</th><th>Meaning</th><th>Example</th></tr>
      <tr><td>Cross-sectional</td><td>Many cases at one point in time</td><td>All customers' orders this week</td></tr>
      <tr><td>Longitudinal</td><td>The same case over time</td><td>One customer's orders every week for a year</td></tr>
      <tr><td>Censored</td><td>Value is only partly known</td><td>A delivery bike still works when the study ends, so we only know it lasted at least 3 years</td></tr>
      <tr><td>Truncated</td><td>Some values are never recorded at all</td><td>Only complaints about delays over 30 minutes are logged, so shorter delays are missing</td></tr>
    </table>
    <p><em>A second example, since this pair is the easiest to mix up:</em> Suppose the shop tracks how long customers stay subscribed to a loyalty app.</p>
    <ul>
      <li><strong>Censored:</strong> a customer is still subscribed when the study ends. You know they lasted "at least" 8 months, but not the true total.</li>
      <li><strong>Truncated:</strong> the shop only keeps records for customers who stayed subscribed more than 1 month. Anyone who cancelled in the first month never appears in the data at all, not even partially.</li>
    </ul>
    <p><strong>Remember: censored data is incomplete (you have some information, just not the full picture); truncated data is missing entirely (you have no record it ever existed).</strong></p>
    <p><em>Why actuaries care:</em> this is one of the most tested ideas in the whole subject, because most insurance data is censored &mdash; a life insurance policyholder who's still alive at the end of the investigation period is a censored observation, and getting this wrong distorts mortality and reserving calculations.</p>

    <h3>5. Big data</h3>
    <p>Big data is data so large or complex that normal methods on one computer can't handle it. It is usually collected automatically.</p>
    <table>
      <tr><th>Feature</th><th>Meaning</th><th>Example</th></tr>
      <tr><td>Size</td><td>A huge number of records and variables, often with many blanks</td><td>Millions of delivery orders</td></tr>
      <tr><td>Speed</td><td>Data arrives very fast</td><td>Each rider's GPS location every second</td></tr>
      <tr><td>Variety</td><td>Comes from many sources and formats</td><td>App orders, reviews, photos, clicks</td></tr>
      <tr><td>Reliability</td><td>Hard to check if it's accurate</td><td>A rider's GPS loses signal and records wrong locations</td></tr>
    </table>
    <p><em>Note: some textbooks and past papers use the word "veracity" instead of "reliability" for this fourth feature &mdash; they mean exactly the same thing, so don't let the different wording throw you.</em></p>
    <p><strong>Privacy:</strong></p>
    <ul>
      <li>Joining two "anonymous" data sets can reveal who someone is.</li>
      <li>Data being online doesn't mean you're allowed to use it however you like.</li>
    </ul>
    <p><em>Why actuaries care:</em> telematics (usage-based car insurance) is a live example &mdash; GPS and driving-behaviour data is huge, fast, varied and imperfect, and pricing actuaries increasingly build models directly on this kind of big data instead of traditional rating factors alone.</p>

    <h3>6. Reproducible research</h3>
    <table>
      <tr><th>Term</th><th>Meaning</th><th>Example</th></tr>
      <tr><td>Replication</td><td>Someone repeats the whole study with new data and gets the same result</td><td>Another shop runs the same customer survey and gets similar findings</td></tr>
      <tr><td>Reproducibility</td><td>Someone uses your data and method and gets exactly the same result</td><td>A colleague runs your code on your data and gets identical numbers</td></tr>
    </table>
    <p>Why replication is often hard: the study may be very big, very expensive or slow to collect data for, or about an event that won't happen again. That's why reproducibility is used instead.</p>
    <p><strong>What you need for reproducibility</strong></p>
    <ul>
      <li>Data and code: share both.</li>
      <li>Documentation: explain every variable and record every change made to the data.</li>
      <li>Version control: keep track of changes to your code (a tool like "git" is commonly used for this).</li>
      <li>Software details: record exactly which software and version was used to run the analysis, so someone else can set up the same environment.</li>
      <li>Random seed: if the analysis involves any randomness or simulation, fix a starting point (called a "seed") so it produces the same result every time it's rerun, instead of a different random result each run.</li>
      <li>No manual steps: avoid hand-editing spreadsheets or clicking through menus, since there's no record of what was changed.</li>
    </ul>
    <p><strong>Why it's valuable:</strong> it lets others check your work, satisfies regulators and auditors, makes updates easy, allows fair comparison with past results, and reduces errors.</p>
    <p><strong>Limitations</strong></p>
    <ul>
      <li>Reproducible does not mean correct. A wrong assumption gives the same wrong answer every time.</li>
      <li>Timing matters. If you only make work reproducible at the end, it may be too late to fix problems.</li>
    </ul>
    <p><em>Why actuaries care:</em> a reserving or capital model that isn't reproducible can't survive a regulator's audit or a peer review &mdash; this is a professional requirement, not just good practice, under actuarial standards of work.</p>
  `
},
