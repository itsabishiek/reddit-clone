import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <Flex direction="column" align="center" justify="center" height="80vh">
      <Box width="100px" height="100px" bg="gray.400" borderRadius="50%" />
      <Text fontSize="18px" fontWeight={600} color="black" mt="32px" mb="20px">
        Sorry, there aren&apos;t any communities on Reddit with that name.
      </Text>
      <Text fontSize="14px" color="gray.500" mb="32px">
        This community may have been banned or the community name is incorrect.
      </Text>
      <Link href="/">
        <Button>GO HOME</Button>
      </Link>
      <Text
        fontSize="8pt"
        width="500px"
        align="center"
        color="gray.400"
        mt="32px"
      >
        Use of this site constitutes acceptance of our User Agreement and
        Privacy Policy. &copy; 2022 reddit inc. All rights reserved. REDDIT and
        the ALIEN Logo are registered trademarks of reddit inc.
      </Text>
    </Flex>
  );
};
export default NotFound;
