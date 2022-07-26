import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../modal/createCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {
  // user
};

const Communities: React.FC<CommunitiesProps> = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;
  console.log("COMMUNITIES", mySnippets);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      {mySnippets.find((item) => item.isModerator) && (
        <Box mt={2} mb={1}>
          <Text pl={3} mb={1} fontSize="10pt" fontWeight={600} color="gray.500">
            MODERATING
          </Text>
          {mySnippets
            .filter((item) => item.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                icon={FaReddit}
                iconColor="brand.100"
                imageURL={snippet.imageURL}
              />
            ))}
        </Box>
      )}
      <Box mt={3} mb={1}>
        <Text pl={3} mb={1} fontSize="10pt" fontWeight={600} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon as={GrAdd} fontSize={20} mr={2} color="inherit" />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            icon={FaReddit}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Communities;
