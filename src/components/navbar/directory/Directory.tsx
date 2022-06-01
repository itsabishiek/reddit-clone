import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const UserMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        padding="0px 4px"
        ml={2}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "180px" }}
        >
          <Flex align="center">
            <Icon as={TiHome} fontSize={22} mr={1} />
            <Text
              display={{ base: "none", lg: "flex" }}
              fontWeight={550}
              fontSize={14}
              color="gray.700"
            >
              Home
            </Text>
          </Flex>
          <Icon as={ChevronDownIcon} color="gray.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
