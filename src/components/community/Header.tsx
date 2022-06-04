import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Community } from "../../atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const [isJoined, setIsJoined] = useState(false); // read from our communitySnippets
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex bg="white" flexGrow={1} justify="center">
        <Flex width="95%" maxWidth="860px">
          {communityData.imageURL ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={65}
              position="relative"
              top={-3}
              color="gray.300"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={700} fontSize="16pt">
                {communityData.name}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              onClick={() => setIsJoined(!isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
