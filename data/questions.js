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
