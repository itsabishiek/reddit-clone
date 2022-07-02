import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type TabItemProps = {
  item: TabItem;
  selectedTab: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <Flex
      align="center"
      justify="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={700}
      color={selectedTab ? "blue.500" : "gray.500"}
      borderWidth={selectedTab ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selectedTab ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      _hover={{ bg: "gray.50" }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon height="100%" as={item.icon} fontSize={18} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
export default TabItem;
