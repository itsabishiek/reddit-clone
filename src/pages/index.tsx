import type { NextPage } from "next";
import Head from "next/head";
import PersonalHome from "../components/community/PersonalHome";
import Premium from "../components/community/Premium";
import Recommendations from "../components/community/Recommendations";
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
          <Recommendations />
          <Premium />
          <PersonalHome />
        </>
      </PageContent>
    </div>
  );
};

export default Home;
