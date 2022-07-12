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

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete the post.");
      }
      console.log("Post was successfully deleted!");
    } catch (error: any) {
      setError(error);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      bg="white"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        width="40px"
        borderRadius={4}
        p={2}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={onVote}
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
          onClick={onVote}
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
        <Stack spacing={1} p="10pt">
          <Stack
            direction="row"
            spacing={0.6}
            align="center"
            justify="space-between"
            fontSize="9pt"
          >
            {/* Home Page Check */}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
            <Menu>
              <MenuButton
                padding="0px 4px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
              >
                <Icon as={BsThreeDots} fontSize={20} />
              </MenuButton>
              {userIsCreator && (
                <MenuList>
                  <MenuItem _hover={{ bg: "gray.200" }}>
                    <Flex align="center" onClick={handleDelete}>
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
