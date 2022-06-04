import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  //   console.log("HERE IS THE CHILDREN", children);

  return (
    <Flex justify="center" p="16px 0px">
      <Flex justify="center" w="95%" maxWidth="860px">
        {/* Left Content */}
        <Flex
          direction="column"
          w={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {" "}
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Box>
      </Flex>
    </Flex>
  );
};
export default PageContent;
