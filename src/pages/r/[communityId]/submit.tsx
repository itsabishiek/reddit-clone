import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import About from "../../../components/community/About";
import PageContent from "../../../components/layout/PageContent";
import NewPostForm from "../../../components/post/postForm/NewPostForm";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();

  return (
    <>
      <Head>
        <title>Reddit - Create Post</title>
        <meta name="description" content="Dive into anything!" />
        <link rel="icon" href="/images/redditFace.svg" />
      </Head>
      <PageContent>
        <>
          <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
            <Text fontWeight={700}>Create a post</Text>
          </Box>
          {user && <NewPostForm user={user} />}
        </>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity} />
          )}
        </>
      </PageContent>
    </>
  );
};
export default SubmitPostPage;
