import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/community/NotFound";
import Header from "../../../components/community/Header";
import PageContent from "../../../components/layout/PageContent";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>Reddit - r/{communityData.id}</title>
        <meta name="description" content="Dive into anything!" />
        <link rel="icon" href="/images/redditFace.svg" />
      </Head>

      <Header communityData={communityData} />
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
    </>
  );
};
export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get community data and pass it to the client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    //   could add error page here
    console.log("getServerSideProps", error);
  }
}
