import { Icon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityId, setCommunityId] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityId(event.target.value);
    // Recalculate how many chars we have left in the name
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // Validate the community name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityId) || communityId.length < 3) {
      setError(
        "Community names must be betweem 3-21 characters, and can only contain letters, numbers or underscores"
      );
      return;
    }

    setLoading(true);

    try {
      // Create the community document in firestore database
      // Check that name is not taken
      // If valid name, create community

      const communityDocRef = doc(firestore, "communities", communityId);

      await runTransaction(firestore, async (transaction) => {
        // Check if community exists in the database
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityId} is taken. Try another.`);
        }

        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          name: communityName,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Create coummunitySnippet on users
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityId),
          {
            communityId: communityId,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateCommunity", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={18}
            padding={3}
          >
            Create a community
          </ModalHeader>

          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Input
                size="sm"
                mt={2}
                placeholder="Name"
                _placeholder={{ color: "gray.500" }}
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
              />
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                size="sm"
                pl="22px"
                value={communityId}
                onChange={handleChange}
              />
              <Text
                color={charsRemaining === 0 ? "red" : "gray.500"}
                fontSize="9pt"
              >
                {charsRemaining} Characters remaining
              </Text>

              <Text fontSize="9pt" color="red">
                {error}
              </Text>

              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15} mb={2}>
                  Community Type
                </Text>
                {/* Checkbox */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={handleCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Anyone can view, post and comment to this community.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={handleCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Anyone can view this community, but only approved users
                        can post.
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={handleCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Only approved users can view and submit to this
                        community.
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="10px 10px 0px 0px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              isLoading={loading}
              onClick={handleCreateCommunity}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
