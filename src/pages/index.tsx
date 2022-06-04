import type { NextPage } from "next";
import Head from "next/head";
import PageContent from "../components/layout/PageContent";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit - Dive into anything</title>
        <meta name="description" content="Dive into anything!" />
        <link rel="icon" href="/images/redditFace.svg" />
      </Head>

      <PageContent>
        <>
          <div>Left Content</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </>
        <>
          <div>Right Content</div>
          <div>Hello</div>
        </>
      </PageContent>
    </div>
  );
};

export default Home;
