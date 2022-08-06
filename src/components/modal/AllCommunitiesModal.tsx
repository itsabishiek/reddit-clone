import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  Image,
} from "@chakra-ui/react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";

type AllCommunitiesModalProps = {
  open: boolean;
  handleClose: () => void;
};

const AllCommunitiesModal: React.FC<AllCommunitiesModalProps> = ({
  handleClose,
  open,
}) => {
  const [loading, setLoading] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc")
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      console.log("HERE ARE COMS", communities);
      setCommunities(communities);
    } catch (error) {
      console.log("getCommunityRecommendations Error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Modal isOpen={open} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={18}
          padding={3}
        >
          Explore Communities
        </ModalHeader>

        <Box pl={3} pr={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0">
            <Flex
              direction="column"
              bg="white"
              borderRadius={4}
              cursor="pointer"
              border="1px solid"
              borderColor="gray.300"
              mb={2}
            >
              <Flex direction="column">
                {loading ? (
                  <Stack mt={2} p={3}>
                    <Flex justify="space-between" align="center">
                      <SkeletonCircle size="10" />
                      <Skeleton height="10px" width="70%" />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <SkeletonCircle size="10" />
                      <Skeleton height="10px" width="70%" />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <SkeletonCircle size="10" />
                      <Skeleton height="10px" width="70%" />
                    </Flex>
                  </Stack>
                ) : (
                  <>
                    {communities.map((community) => {
                      const isJoined = !!communityStateValue.mySnippets.find(
                        (snippet) => snippet.communityId === community.id
                      );

                      return (
                        <Link
                          key={community.id}
                          href={`/r/${community.id}`}
                          _hover={{ textDecoration: "none", bg: "gray.200" }}
                          _focus={{ bg: "gray.200" }}
                        >
                          <Flex
                            position="relative"
                            align="center"
                            cursor="pointer"
                            fontSize="10pt"
                            p="10px 12px"
                            fontWeight={600}
                          >
                            <Flex width="100%" align="center">
                              <Flex align="center" width="80%">
                                {community.imageURL ? (
                                  <Image
                                    borderRadius="full"
                                    boxSize="35px"
                                    src={community.imageURL}
                                    mr={2}
                                    alt=""
                                  />
                                ) : (
                                  <Icon
                                    as={FaReddit}
                                    fontSize={35}
                                    color="brand.100"
                                    mr={2}
                                  />
                                )}
                                <span
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >{`r/${community.id}`}</span>
                              </Flex>
                            </Flex>

                            <Box>
                              <Button
                                height="22px"
                                width="60px"
                                fontSize="8pt"
                                variant={isJoined ? "outline" : "solid"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onJoinOrLeaveCommunity(community, isJoined);
                                }}
                              >
                                {isJoined ? "Joined" : "Join"}
                              </Button>
                            </Box>
                          </Flex>
                        </Link>
                      );
                    })}
                  </>
                )}
              </Flex>
            </Flex>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default AllCommunitiesModal;
