import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

const UserMenu: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        padding="0px 4px"
        ml={2}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "180px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt=""
                borderRadius="full"
                boxSize="24px"
                mr={2}
              />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
                fontSize={22}
                mr={1}
              />
            )}
            <Text
              display={{ base: "none", lg: "flex" }}
              fontWeight={550}
              fontSize={14}
              color="gray.700"
            >
              {directoryState.selectedMenuItem.displayText}
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
