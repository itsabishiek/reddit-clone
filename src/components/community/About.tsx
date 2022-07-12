import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { BsTagsFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { Community } from "../../atoms/communitiesAtom";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  return (
    <Box position="sticky" top="60px">
      <Flex
        align="center"
        bg="blue.500"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="13px" fontWeight={700}>
          About Community
        </Text>
      </Flex>
      <Flex direction="column" p={2} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack pb={2}>
          <Text fontSize="10pt">{communityData?.bio}</Text>

          <Flex width="100%" padding="0px 8px 0px 8px" fontSize="10pt">
            <Flex direction="column" flexGrow={1}>
              <Text fontWeight={500}>
                {communityData.numberOfMembers.toLocaleString()}
              </Text>
              <Text fontWeight={550} fontSize="9pt" color="gray.600">
                Members
              </Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text fontWeight={500}>234</Text>
              <Text fontWeight={550} fontSize="9pt" color="gray.600">
                Online
              </Text>
            </Flex>
          </Flex>
        </Stack>
        <Divider />
        <Flex fontSize="10pt" mt={2} align="center">
          <Icon as={IoCreateOutline} mr={2} fontSize={15} />
          <Text>
            Created{" "}
            {moment(new Date(communityData.createdAt.seconds * 1000)).format(
              "MMM DD, YYYY"
            )}
          </Text>
        </Flex>
        <Flex fontSize="10pt" mt={2} align="center">
          <Icon as={BsTagsFill} mr={2} fontSize={15} />
          <Text>r/{communityData.id} topics</Text>
        </Flex>

        <Link href={`/r/${communityData.id}/submit`}>
          <Button height="30px" mt={3} mb={1}>
            Create Post
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
export default About;
