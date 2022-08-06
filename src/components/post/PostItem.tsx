import React, { useState } from "react";
import { Post } from "../../atoms/postsAtom";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  postIdx?: number;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
  postIdx,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const singlePostPage = !onSelectPost;

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete the post.");
      }
      console.log("Post was successfully deleted!");

      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error);
    }
    setLoadingDelete(false);
  };

  // console.log(userVoteValue);

  return (
    <Flex
      border="1px solid"
      borderColor={singlePostPage ? "white" : "gray.300"}
      bg="white"
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
        p={2}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text fontSize="10pt">{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10pt" pt={2.5}>
          <Stack direction="row" spacing={0.6} fontSize="9pt" align="center">
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    alt=""
                    borderRadius="full"
                    boxSize="21px"
                    mr={2}
                  />
                ) : (
                  <Icon as={FaReddit} fontSize="18pt" mr={1} color="blue.500" />
                )}
                <Link href={`/r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    _focus={{ border: "none" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    r/{post.communityId}
                  </Text>
                </Link>
                <Icon as={BsDot} color="gray.500" fontSize={8} />
              </>
            )}
            <Stack
              direction="row"
              width="100%"
              align="center"
              justify="space-between"
            >
              <Text>
                Posted by u/{post.creatorDisplayName}{" "}
                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </Text>
              <Menu>
                <MenuButton
                  padding="0px 4px"
                  borderRadius={4}
                  _hover={{ bg: "gray.200" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon as={BsThreeDots} fontSize={20} />
                </MenuButton>
                {userIsCreator && (
                  <MenuList>
                    <MenuItem _hover={{ bg: "gray.200" }}>
                      <Flex
                        align="center"
                        onClick={(e) => {
                          e.stopPropagation(), handleDelete();
                        }}
                      >
                        {loadingDelete ? (
                          <Spinner size="sm" ml={3} />
                        ) : (
                          <>
                            <Icon
                              as={AiOutlineDelete}
                              fontSize={20}
                              mr={2}
                              pb={1}
                            />
                            <Text fontWeight={600}>Delete Post</Text>
                          </>
                        )}
                      </Flex>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </Stack>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="11pt">{post.body}</Text>
          {post.imageURL && (
            <Flex align="center" justify="center" pt={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt=""
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex color="gray.500" fontWeight={600} ml={1} mb={0.5}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsChat} mr={1} />
            <Text fontSize="9pt">{post.numberOfComments} Comments</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoArrowRedoOutline} mr={1} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoBookmarkOutline} mr={1} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
