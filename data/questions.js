export const INTRO = {
  title: "CS1: Actuarial Statistics",
  body: "CS1 is one of the IFoA's core statistics subjects. It builds the statistical foundation used throughout the actuarial qualification -- covering probability theory, distributions, estimation, hypothesis testing, and regression -- and introduces Bayesian methods that reappear heavily in later subjects like SP/SA papers. Where CM1 is about the time value of money, CS1 is about handling data and uncertainty: fitting distributions to real data, estimating unknown parameters, testing whether a pattern is real or just noise, and formally updating beliefs as new evidence arrives. It's a demanding subject because each chapter builds on the last -- probability underpins random variables, random variables underpin estimation, estimation underpins hypothesis testing and regression. Skipping a shaky chapter tends to cause trouble two or three chapters later.",
};

export const CHAPTERS = [
  { n: 1, title: "Data analysis" },
  { n: 2, title: "Probability" },
  { n: 3, title: "Random variables" },
  { n: 4, title: "Generating functions & the Central Limit Theorem" },
  { n: 5, title: "Joint distributions" },
  { n: 6, title: "Estimation" },
  { n: 7, title: "Confidence intervals" },
  { n: 8, title: "Hypothesis testing" },
  { n: 9, title: "Correlation & regression" },
  { n: 10, title: "Analysis of variance (ANOVA)" },
  { n: 11, title: "Bayesian statistics" },
];

export const NOTES = {
  1: {
    title: "Data analysis",
    body: "The starting point for CS1: understanding what kind of data you're working with before doing anything else. Data splits into qualitative (categories, e.g. policy type) and quantitative (numbers, e.g. claim amount), and quantitative data is further split into discrete (countable, e.g. number of claims) and continuous (measurable, e.g. claim size). Summary statistics fall into measures of location (mean, median, mode) and measures of spread (variance, standard deviation, interquartile range). The mean is sensitive to outliers; the median is not -- this single fact explains why actuaries often report both when data is skewed, as insurance claims data typically is (a few very large claims pull the mean up well above the median).",
  },
  2: {
    title: "Probability",
    body: "The formal rules underlying everything that follows. Key building blocks: the addition rule P(A or B) = P(A) + P(B) - P(A and B); independence, where P(A and B) = P(A) x P(B); and conditional probability, P(A|B) = P(A and B) / P(B). Bayes' theorem -- P(A|B) = P(B|A) x P(A) / P(B) -- lets you reverse a conditional probability, and is the seed of the entire Bayesian statistics chapter later in the course. A common exam trap: confusing P(A|B) with P(B|A) -- they are generally not equal, and mixing them up is one of the most common real-world statistical errors, not just an exam one.",
  },
  3: {
    title: "Random variables",
    body: "A random variable maps outcomes to numbers, and comes with a probability distribution describing how likely each value (or range of values) is. Discrete distributions worth knowing cold: Binomial (number of successes in n trials), Poisson (count of rare events, mean = variance = lambda), Geometric (trials until first success). Continuous distributions: Normal (symmetric, bell-shaped), Exponential (memoryless waiting times), Gamma, and others. For each, you should know the mean, variance, and when it's the natural model to reach for -- e.g. Poisson for claim counts, Exponential or Gamma for claim severity/waiting times between events.",
  },
  4: {
    title: "Generating functions & CLT",
    body: "Moment generating functions (MGFs) and probability generating functions (PGFs) are algebraic tools: differentiate them and you get the moments (mean, variance) of a distribution without doing the underlying integration or summation directly. They're also useful for finding the distribution of a sum of independent random variables. The Central Limit Theorem (CLT) is the chapter's other major result: regardless of the underlying population distribution, the sample mean of a large enough sample is approximately Normally distributed. This is the theoretical justification for a huge amount of later statistical inference -- confidence intervals and hypothesis tests routinely lean on the CLT to justify using the Normal distribution even when the underlying data isn't Normal.",
  },
  5: {
    title: "Joint distributions",
    body: "Extends single-variable distributions to pairs (or more) of random variables considered together. Key ideas: joint probability functions, marginal distributions (the distribution of one variable, ignoring the other), and conditional distributions (the distribution of one variable given a specific value of the other). Covariance measures how two variables move together; correlation is covariance standardised to lie between -1 and 1, which makes it comparable across different pairs of variables. Independence implies zero covariance, but zero covariance does not imply independence in general -- a nuance that shows up repeatedly in exam questions.",
  },
  6: {
    title: "Estimation",
    body: "How do you estimate an unknown population parameter (like a mean or a probability) from sample data? Two main methods: the method of moments (set sample moments equal to theoretical moments and solve), and maximum likelihood estimation, or MLE (choose the parameter value that makes the observed data most probable). Good estimators are judged by properties like unbiasedness (expected value equals the true parameter), consistency (gets more accurate as sample size grows), and efficiency (has the smallest possible variance among unbiased estimators). MLE is usually the more powerful and widely-used method in practice, though the method of moments is often simpler to compute by hand.",
  },
  7: {
    title: "Confidence intervals",
    body: "A confidence interval gives a range of plausible values for an unknown parameter, built from sample data. The correct interpretation is subtle and frequently misstated: a 95% confidence interval means that if you repeated the sampling process many times, about 95% of the resulting intervals would contain the true parameter value -- it is not a 95% probability statement about one specific interval you've already calculated. Wider intervals happen with smaller samples or more variable data; intervals narrow as sample size grows. Constructing one typically involves a point estimate, a standard error, and a critical value from the Normal or t-distribution.",
  },
  8: {
    title: "Hypothesis testing",
    body: "A formal procedure for deciding whether observed data provides enough evidence against a default assumption (the null hypothesis, H0) in favour of an alternative (H1). The p-value is the probability of seeing data this extreme (or more) if H0 were actually true -- a small p-value is evidence against H0. The significance level (alpha), chosen in advance, is the threshold below which you reject H0, and also equals the probability of a Type I error (rejecting a true H0). A Type II error is the opposite mistake: failing to reject a false H0. There's an inherent trade-off between the two error types that exam questions frequently probe.",
  },
  9: {
    title: "Correlation & regression",
    body: "Correlation measures the strength and direction of a linear relationship between two variables (from -1 to +1), but says nothing about causation and misses non-linear relationships entirely. Regression goes further: it fits a line (or curve) that best predicts one variable from another. Simple linear regression uses the least squares method, which chooses the line minimising the sum of squared residuals (the vertical distances between observed points and the fitted line). Key regression outputs to interpret: the slope (effect size), the intercept, and R-squared (proportion of variance in the response explained by the model).",
  },
  10: {
    title: "Analysis of variance (ANOVA)",
    body: "ANOVA extends the two-sample hypothesis test idea to three or more groups at once, testing whether their means are all equal. Rather than comparing means directly, it compares two sources of variance: between-group variance (how much the group means differ from each other) and within-group variance (natural variation inside each group). The F-test statistic is the ratio of these two, and a large F value suggests the group means genuinely differ rather than the variation being random noise. Running many separate two-sample tests instead of one ANOVA would inflate the overall false-positive rate -- this is exactly the problem ANOVA is designed to avoid.",
  },
  11: {
    title: "Bayesian statistics",
    body: "A different philosophy of inference from the rest of the course. Instead of treating a parameter as a fixed unknown, Bayesian statistics treats it as having a probability distribution reflecting our belief about it -- starting with a prior distribution (belief before seeing data), which is updated using observed data via the likelihood, to produce a posterior distribution (belief after seeing data): posterior is proportional to likelihood x prior. A conjugate prior is one chosen so the posterior stays in the same distribution family as the prior, keeping the maths tractable -- e.g. a Beta prior with a Binomial likelihood always gives a Beta posterior. This framework becomes central again in later subjects covering credibility theory.",
  },
};

export const QUESTIONS = [
  {
    id: "cs1-1",
    subject: "CS1",
    chapter: 1,
    topic: "1. Data analysis",
    text: "The number of claims made on a car insurance policy in a year is an example of what type of data?",
    options: ["Discrete quantitative", "Continuous quantitative", "Nominal qualitative", "Ordinal qualitative"],
    correct: 0,
    explain:
      "Claim counts take whole-number values (0, 1, 2, ...) with no fractional values possible, making this discrete quantitative data.",
  },
  {
    id: "cs1-2",
    subject: "CS1",
    chapter: 1,
    topic: "1. Data analysis",
    text: "Which measure of central tendency is most sensitive to extreme outliers in a dataset?",
    options: ["Mean", "Median", "Mode", "Trimmed mean"],
    correct: 0,
    explain:
      "The mean uses every data point in its calculation, so a single extreme value can shift it significantly. The median and mode are far more resistant to outliers.",
  },
  {
    id: "cs1-3",
    subject: "CS1",
    chapter: 2,
    topic: "2. Probability",
    text: "If events A and B are independent, with P(A) = 0.3 and P(B) = 0.4, what is P(A and B)?",
    options: ["0.12", "0.70", "0.10", "0.7"],
    correct: 0,
    explain: "For independent events, P(A and B) = P(A) x P(B) = 0.3 x 0.4 = 0.12.",
  },
  {
    id: "cs1-4",
    subject: "CS1",
    chapter: 2,
    topic: "2. Probability",
    text: "Bayes' theorem expresses P(A|B) in terms of which quantities?",
    options: [
      "P(B|A) x P(A) / P(B)",
      "P(A) x P(B)",
      "P(A) + P(B) - P(A and B)",
      "P(B|A) / P(A)",
    ],
    correct: 0,
    explain:
      "Bayes' theorem: P(A|B) = P(B|A) x P(A) / P(B). It lets you reverse the direction of a conditional probability using the reverse conditional and the marginal probabilities.",
  },
  {
    id: "cs1-5",
    subject: "CS1",
    chapter: 3,
    topic: "3. Random variables",
    text: "For X ~ Binomial(n, p), what is Var(X)?",
    options: ["np(1-p)", "np", "n(1-p)", "p(1-p)"],
    correct: 0,
    explain:
      "The variance of a Binomial(n,p) random variable is np(1-p) -- maximised when p = 0.5 for a given n.",
  },
  {
    id: "cs1-6",
    subject: "CS1",
    chapter: 3,
    topic: "3. Random variables",
    text: "The exponential distribution is described as 'memoryless'. What does this mean?",
    options: [
      "P(X > s+t | X > s) = P(X > t) -- future waiting time doesn't depend on time already elapsed",
      "The distribution has no defined mean",
      "X can only take integer values",
      "The variance equals zero",
    ],
    correct: 0,
    explain:
      "Memorylessness means the probability of waiting an additional t units, given you've already waited s units, is the same as the probability of waiting t units from the start.",
  },
  {
    id: "cs1-7",
    subject: "CS1",
    chapter: 4,
    topic: "4. Generating functions & CLT",
    text: "For a moment generating function M_X(t), what is M_X(0)?",
    options: ["1", "0", "E[X]", "Var(X)"],
    correct: 0,
    explain:
      "M_X(0) = E[e^0] = E[1] = 1 for any valid MGF -- this is a useful check when you derive one.",
  },
  {
    id: "cs1-8",
    subject: "CS1",
    chapter: 4,
    topic: "4. Generating functions & CLT",
    text: "The Central Limit Theorem states that, for a large enough sample size, the distribution of the sample mean approaches which distribution?",
    options: ["Normal", "Poisson", "Exponential", "Uniform"],
    correct: 0,
    explain:
      "Regardless of the underlying population distribution, the sample mean's distribution approaches Normal as sample size grows -- the basis for most large-sample inference.",
  },
  {
    id: "cs1-9",
    subject: "CS1",
    chapter: 5,
    topic: "5. Joint distributions",
    text: "If X and Y are independent random variables, what is Cov(X,Y)?",
    options: ["0", "1", "Var(X) x Var(Y)", "It cannot be determined"],
    correct: 0,
    explain:
      "Independence implies zero covariance (though the reverse isn't always true -- zero covariance doesn't guarantee independence in general).",
  },
  {
    id: "cs1-10",
    subject: "CS1",
    chapter: 5,
    topic: "5. Joint distributions",
    text: "The correlation coefficient between two random variables always lies in which range?",
    options: ["-1 to 1", "0 to 1", "-infinity to infinity", "0 to infinity"],
    correct: 0,
    explain:
      "Correlation is a standardised measure of linear association, bounded between -1 (perfect negative) and +1 (perfect positive).",
  },
  {
    id: "cs1-11",
    subject: "CS1",
    chapter: 6,
    topic: "6. Estimation",
    text: "The method of moments estimates parameters by equating sample moments to which quantities?",
    options: [
      "The corresponding theoretical (population) moments",
      "The maximum likelihood estimates",
      "The sample median",
      "Zero",
    ],
    correct: 0,
    explain:
      "Method of moments sets sample moments (e.g. sample mean, sample variance) equal to the theoretical moments implied by the assumed distribution, then solves for the parameters.",
  },
  {
    id: "cs1-12",
    subject: "CS1",
    chapter: 6,
    topic: "6. Estimation",
    text: "Maximum likelihood estimation (MLE) chooses parameter values that do what?",
    options: [
      "Maximise the likelihood function given the observed data",
      "Minimise the sample variance",
      "Equal the sample mean exactly",
      "Minimise the number of parameters",
    ],
    correct: 0,
    explain:
      "MLE finds the parameter values under which the observed data would have been most probable -- i.e. those that maximise the likelihood function.",
  },
  {
    id: "cs1-13",
    subject: "CS1",
    chapter: 7,
    topic: "7. Confidence intervals",
    text: "What is the correct interpretation of a 95% confidence interval for a parameter?",
    options: [
      "If we repeated the sampling process many times, about 95% of such intervals would contain the true parameter value",
      "There is a 95% probability the true parameter lies in this specific interval",
      "95% of the data lies within this interval",
      "The parameter equals the midpoint of the interval with 95% certainty",
    ],
    correct: 0,
    explain:
      "This is one of the most commonly misstated concepts in statistics -- the 95% refers to the long-run behaviour of the procedure across repeated samples, not a probability statement about one fixed interval.",
  },
  {
    id: "cs1-14",
    subject: "CS1",
    chapter: 7,
    topic: "7. Confidence intervals",
    text: "All else equal, what happens to the width of a confidence interval as sample size increases?",
    options: ["It decreases", "It increases", "It stays the same", "It becomes undefined"],
    correct: 0,
    explain:
      "Larger samples give more precise estimates of the parameter, which narrows the confidence interval for a given confidence level.",
  },
  {
    id: "cs1-15",
    subject: "CS1",
    chapter: 8,
    topic: "8. Hypothesis testing",
    text: "The p-value in a hypothesis test represents the probability of obtaining a result at least as extreme as observed, assuming what?",
    options: [
      "The null hypothesis is true",
      "The alternative hypothesis is true",
      "The sample size is infinite",
      "The data is normally distributed",
    ],
    correct: 0,
    explain:
      "The p-value is always calculated under the assumption that H0 is true -- a small p-value suggests the observed data would be unusual if H0 were actually correct.",
  },
  {
    id: "cs1-16",
    subject: "CS1",
    chapter: 8,
    topic: "8. Hypothesis testing",
    text: "The significance level (alpha) of a hypothesis test represents the probability of which error?",
    options: ["Type I error", "Type II error", "Both Type I and Type II equally", "Neither -- it relates to power"],
    correct: 0,
    explain:
      "Alpha is set by the researcher in advance and equals the probability of rejecting a true null hypothesis (Type I error / false positive).",
  },
  {
    id: "cs1-17",
    subject: "CS1",
    chapter: 9,
    topic: "9. Correlation & regression",
    text: "In simple linear regression, the least squares method chooses the line that minimises what?",
    options: [
      "The sum of squared residuals",
      "The sum of the residuals",
      "The correlation coefficient",
      "The number of data points above the line",
    ],
    correct: 0,
    explain:
      "Least squares regression finds the line minimising the sum of squared vertical distances between observed points and the fitted line -- squaring avoids positive and negative residuals cancelling out.",
  },
  {
    id: "cs1-18",
    subject: "CS1",
    chapter: 9,
    topic: "9. Correlation & regression",
    text: "A correlation coefficient close to 0 between two variables implies what?",
    options: [
      "A weak linear relationship (though a strong non-linear one could still exist)",
      "The variables are definitely independent",
      "One variable causes the other",
      "The variables have equal variance",
    ],
    correct: 0,
    explain:
      "Correlation only measures linear association. Two variables can have a strong curved relationship (e.g. U-shaped) and still show a correlation coefficient near zero.",
  },
  {
    id: "cs1-19",
    subject: "CS1",
    chapter: 10,
    topic: "10. Analysis of variance (ANOVA)",
    text: "ANOVA is primarily used to compare what?",
    options: [
      "The means of three or more groups",
      "The variances of exactly two groups",
      "The medians of two groups",
      "The correlation between two variables",
    ],
    correct: 0,
    explain:
      "ANOVA (Analysis of Variance) tests whether the means of three or more groups are significantly different from each other, using variance decomposition to do so.",
  },
  {
    id: "cs1-20",
    subject: "CS1",
    chapter: 10,
    topic: "10. Analysis of variance (ANOVA)",
    text: "The F-test in ANOVA compares which two sources of variance?",
    options: [
      "Between-group variance and within-group variance",
      "Sample variance and population variance",
      "The variance of X and the variance of Y",
      "Prior variance and posterior variance",
    ],
    correct: 0,
    explain:
      "If between-group variance is large relative to within-group variance, this suggests the group means genuinely differ rather than the variation being just random noise.",
  },
  {
    id: "cs1-21",
    subject: "CS1",
    chapter: 11,
    topic: "11. Bayesian statistics",
    text: "In Bayesian statistics, a prior belief about a parameter is updated using observed data to form what?",
    options: ["A posterior distribution", "A new prior distribution", "A p-value", "A confidence interval"],
    correct: 0,
    explain:
      "Posterior is proportional to likelihood x prior. The posterior distribution represents updated belief about the parameter after combining prior knowledge with observed data.",
  },
  {
    id: "cs1-22",
    subject: "CS1",
    chapter: 11,
    topic: "11. Bayesian statistics",
    text: "A prior distribution is described as 'conjugate' to a likelihood when:",
    options: [
      "The resulting posterior distribution belongs to the same family as the prior",
      "The prior and likelihood have identical parameters",
      "The posterior is always Normal",
      "The prior has a mean of zero",
    ],
    correct: 0,
    explain:
      "Conjugate priors are chosen because they make the maths tractable -- e.g. a Beta prior combined with a Binomial likelihood always produces a Beta posterior.",
  },
];
