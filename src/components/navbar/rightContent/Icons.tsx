import { Box, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import useDirectory from "../../../hooks/useDirectory";

const Icons: React.FC = () => {
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const onClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    // Open directory menu to select community to post to
    toggleMenuOpen();
  };

  return (
    <Flex>
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          cursor="pointer"
          padding={1}
          _hover={{ bg: "gray.200" }}
          borderRadius={4}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex>
        <>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsChatDots} fontSize={20} />
          </Flex>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoNotificationsOutline} fontSize={20} />
          </Flex>
          <Flex
            mr={3}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            onClick={onClick}
          >
            <Icon as={GrAdd} fontSize={20} />
          </Flex>
        </>
      </Box>
    </Flex>
  );
};
export default Icons;
