import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="AI-powered IFoA exam prep: spaced-repetition question banks, an AI tutor, notes, and mock exams for CM1, CS1 and more."
        />
        <meta property="og:title" content="IFoA Prep" />
        <meta
          property="og:description"
          content="AI-powered IFoA exam prep built by an actuarial student, for actuarial students."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
