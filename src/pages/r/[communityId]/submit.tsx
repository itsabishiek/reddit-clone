import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../../../components/layout/PageContent";
import NewPostForm from "../../../components/post/postForm/NewPostForm";
import { auth } from "../../../firebase/clientApp";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
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
        <></>
      </PageContent>
    </>
  );
};
export default SubmitPostPage;
