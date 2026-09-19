export const QUESTIONS = [
  {
    id: "cm1-1",
    subject: "CM1",
    topic: "Time value of money",
    text: "An annuity pays £1,000 at the end of each year for 10 years. If the effective annual interest rate is 5%, what is the present value (to the nearest £)?",
    options: ["£7,722", "£8,108", "£6,463", "£10,000"],
    correct: 0,
    explain:
      "PV = 1000 x a(10,5%) = 1000 x (1-1.05^-10)/0.05 ~ £7,722. Standard annuity-immediate present value formula.",
  },
  {
    id: "cm1-2",
    subject: "CM1",
    topic: "Life tables",
    text: "Given l(60)=90,000 and l(61)=89,000, what is q(60)?",
    options: ["0.0111", "0.0100", "0.0089", "0.9889"],
    correct: 0,
    explain:
      "q(60) = (l60-l61)/l60 = 1000/90000 ~ 0.0111 -- the probability a life aged 60 dies within one year.",
  },
  {
    id: "cs1-1",
    subject: "CS1",
    topic: "Probability distributions",
    text: "For a Poisson(lambda) random variable, what is the relationship between the mean and variance?",
    options: ["They are equal (both lambda)", "Variance = 2 x mean", "Mean = 0", "Variance is always 0"],
    correct: 0,
    explain:
      "A defining property of the Poisson distribution: mean and variance are both equal to lambda.",
  },
  {
    id: "cs1-2",
    subject: "CS1",
    topic: "Estimation",
    text: "An estimator is described as 'unbiased' when:",
    options: [
      "Its expected value equals the true parameter value",
      "Its variance is zero",
      "It always gives the exact parameter value",
      "It is based on maximum likelihood",
    ],
    correct: 0,
    explain:
      "Unbiasedness means E[theta_hat] = theta -- on average across repeated samples the estimator doesn't over- or under-estimate.",
  },
  {
    id: "cs1-3",
    subject: "CS1",
    topic: "1. Data analysis",
    text: "The number of claims made on a car insurance policy in a year is an example of what type of data?",
    options: ["Discrete quantitative", "Continuous quantitative", "Nominal qualitative", "Ordinal qualitative"],
    correct: 0,
    explain:
      "Claim counts take whole-number values (0, 1, 2, ...) with no fractional values possible, making this discrete quantitative data.",
  },
  {
    id: "cs1-4",
    subject: "CS1",
    topic: "1. Data analysis",
    text: "Which measure of central tendency is most sensitive to extreme outliers in a dataset?",
    options: ["Mean", "Median", "Mode", "Trimmed mean"],
    correct: 0,
    explain:
      "The mean uses every data point in its calculation, so a single extreme value can shift it significantly. The median and mode are far more resistant to outliers.",
  },
  {
    id: "cs1-5",
    subject: "CS1",
    topic: "2. Probability",
    text: "If events A and B are independent, with P(A) = 0.3 and P(B) = 0.4, what is P(A and B)?",
    options: ["0.12", "0.70", "0.10", "0.7"],
    correct: 0,
    explain: "For independent events, P(A and B) = P(A) x P(B) = 0.3 x 0.4 = 0.12.",
  },
  {
    id: "cs1-6",
    subject: "CS1",
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
    id: "cs1-7",
    subject: "CS1",
    topic: "3. Random variables",
    text: "For X ~ Binomial(n, p), what is Var(X)?",
    options: ["np(1-p)", "np", "n(1-p)", "p(1-p)"],
    correct: 0,
    explain:
      "The variance of a Binomial(n,p) random variable is np(1-p) -- maximised when p = 0.5 for a given n.",
  },
  {
    id: "cs1-8",
    subject: "CS1",
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
    id: "cs1-9",
    subject: "CS1",
    topic: "4. Generating functions & CLT",
    text: "For a moment generating function M_X(t), what is M_X(0)?",
    options: ["1", "0", "E[X]", "Var(X)"],
    correct: 0,
    explain:
      "M_X(0) = E[e^0] = E[1] = 1 for any valid MGF -- this is a useful check when you derive one.",
  },
  {
    id: "cs1-10",
    subject: "CS1",
    topic: "4. Generating functions & CLT",
    text: "The Central Limit Theorem states that, for a large enough sample size, the distribution of the sample mean approaches which distribution?",
    options: ["Normal", "Poisson", "Exponential", "Uniform"],
    correct: 0,
    explain:
      "Regardless of the underlying population distribution, the sample mean's distribution approaches Normal as sample size grows -- the basis for most large-sample inference.",
  },
  {
    id: "cs1-11",
    subject: "CS1",
    topic: "5. Joint distributions",
    text: "If X and Y are independent random variables, what is Cov(X,Y)?",
    options: ["0", "1", "Var(X) x Var(Y)", "It cannot be determined"],
    correct: 0,
    explain:
      "Independence implies zero covariance (though the reverse isn't always true -- zero covariance doesn't guarantee independence in general).",
  },
  {
    id: "cs1-12",
    subject: "CS1",
    topic: "5. Joint distributions",
    text: "The correlation coefficient between two random variables always lies in which range?",
    options: ["-1 to 1", "0 to 1", "-infinity to infinity", "0 to infinity"],
    correct: 0,
    explain:
      "Correlation is a standardised measure of linear association, bounded between -1 (perfect negative) and +1 (perfect positive).",
  },
  {
    id: "cs1-13",
    subject: "CS1",
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
    id: "cs1-14",
    subject: "CS1",
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
    id: "cs1-15",
    subject: "CS1",
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
    id: "cs1-16",
    subject: "CS1",
    topic: "7. Confidence intervals",
    text: "All else equal, what happens to the width of a confidence interval as sample size increases?",
    options: ["It decreases", "It increases", "It stays the same", "It becomes undefined"],
    correct: 0,
    explain:
      "Larger samples give more precise estimates of the parameter, which narrows the confidence interval for a given confidence level.",
  },
  {
    id: "cs1-17",
    subject: "CS1",
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
    id: "cs1-18",
    subject: "CS1",
    topic: "8. Hypothesis testing",
    text: "The significance level (alpha) of a hypothesis test represents the probability of which error?",
    options: ["Type I error", "Type II error", "Both Type I and Type II equally", "Neither -- it relates to power"],
    correct: 0,
    explain:
      "Alpha is set by the researcher in advance and equals the probability of rejecting a true null hypothesis (Type I error / false positive).",
  },
  {
    id: "cs1-19",
    subject: "CS1",
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
    id: "cs1-20",
    subject: "CS1",
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
    id: "cs1-21",
    subject: "CS1",
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
    id: "cs1-22",
    subject: "CS1",
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
    id: "cs1-23",
    subject: "CS1",
    topic: "11. Bayesian statistics",
    text: "In Bayesian statistics, a prior belief about a parameter is updated using observed data to form what?",
    options: ["A posterior distribution", "A new prior distribution", "A p-value", "A confidence interval"],
    correct: 0,
    explain:
      "Posterior is proportional to likelihood x prior. The posterior distribution represents updated belief about the parameter after combining prior knowledge with observed data.",
  },
  {
    id: "cs1-24",
    subject: "CS1",
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

export const NOTES = {
  CM1: [
    {
      topic: "Annuities & present values",
      body: "An annuity-immediate paying 1 per year for n years has present value a(n) = (1 - v^n) / i, where v = 1/(1+i). An annuity-due is a(n) x (1+i). Most exam errors come from mixing up immediate vs due timing, not the algebra itself.",
    },
    {
      topic: "Immunisation (Redington)",
      body: "Three conditions must hold: (1) PV(assets) = PV(liabilities), (2) matched duration, (3) asset convexity exceeds liability convexity. Condition 3 means the asset portfolio reacts more favourably to rate shocks in both directions than the liabilities do.",
    },
  ],
  CS1: [
    {
      topic: "Poisson distribution",
      body: "X ~ Poisson(lambda): E[X] = Var[X] = lambda. Used to model counts of rare independent events over a fixed interval, e.g. claims arriving per month.",
    },
    {
      topic: "Hypothesis testing",
      body: "Type I error = rejecting a true null hypothesis (false positive). Type II error = failing to reject a false null (false negative). Power = 1 - Type II error rate.",
    },
  ],
};
