import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";
import Directory from "./directory/Directory";
import RightContent from "./rightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      bg="white"
      height="49px"
      width="100%"
      padding="6px 12px"
      position="sticky"
      top="0"
      justifyContent={{ md: "space-between" }}
      zIndex={1000}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "unset" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/redditFace.svg" height="30px" alt="" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
          alt=""
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
