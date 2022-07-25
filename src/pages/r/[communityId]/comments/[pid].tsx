import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../../../../atoms/postsAtom";
import About from "../../../../components/community/About";
import PageContent from "../../../../components/layout/PageContent";
import Comments from "../../../../components/post/comments/Comments";
import PostItem from "../../../../components/post/PostItem";
import { auth, firestore } from "../../../../firebase/clientApp";
import useCommunityData from "../../../../hooks/useCommunityData";
import usePosts from "../../../../hooks/usePosts";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onDeletePost, onVote, postStateValue, setPostStateValue } =
    usePosts();
  const { communityStateValue } = useCommunityData();
  const router = useRouter();
  const { pid, communityId } = router.query;

  const fetchPost = async (postId: string) => {
    const postDocRef = doc(firestore, "posts", postId);
    const postDoc = await getDoc(postDocRef);
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
    }));
  };

  useEffect(() => {
    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, postStateValue.selectedPost]);

  return (
    <>
      <Head>
        <title>Reddit</title>
        <meta name="description" content="Dive into anything!" />
        <link rel="icon" href="/images/redditFace.svg" />
      </Head>

      <PageContent>
        <>
          {postStateValue.selectedPost && (
            <>
              <PostItem
                post={postStateValue.selectedPost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (vote) => vote.postId === postStateValue.selectedPost?.id
                  )?.voteValue
                }
                onDeletePost={onDeletePost}
                userIsCreator={
                  user?.uid === postStateValue.selectedPost?.creatorId
                }
              />
              <Comments
                user={user}
                communityId={communityId as string}
                selectedPost={postStateValue.selectedPost}
              />
            </>
          )}
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
export default PostPage;
