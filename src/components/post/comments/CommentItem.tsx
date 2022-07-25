import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { Comment } from "./Comments";

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  loadingDelete,
  onDeleteComment,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Flex align="center" gap={2} fontSize="8pt">
          <Text
            textTransform="capitalize"
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.creatorDisplayName}
          </Text>
          <Text color="gray.600">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size="sm" />}
        </Flex>
        <Text fontSize="10pt">{comment.text}</Text>
        <Flex align="center" fontWeight={600} color="gray.500" gap={2}>
          <Icon as={IoArrowUpCircleOutline} cursor="pointer" />
          <Icon as={IoArrowDownCircleOutline} cursor="pointer" />
          {userId === comment.creatorId && (
            <>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                cursor="pointer"
              >
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
                cursor="pointer"
              >
                Delete
              </Text>
            </>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
