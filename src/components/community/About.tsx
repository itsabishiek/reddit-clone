import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsTagsFill } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { Community, communityState } from "../../atoms/communitiesAtom";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useSelectFile from "../../hooks/useSelectFile";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      console.log("onUpdateImage Error", error.message);
    }
    setUploadingImage(false);
  };

  return (
    <Box position="sticky" top="60px">
      <Flex
        align="center"
        bg="blue.500"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="13px" fontWeight={700}>
          About Community
        </Text>
      </Flex>
      <Flex direction="column" p={2} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack pb={2}>
          <Text fontSize="10pt">{communityData?.bio}</Text>

          <Flex width="100%" padding="0px 8px 0px 8px" fontSize="10pt">
            <Flex direction="column" flexGrow={1}>
              <Text fontWeight={500}>
                {communityData.numberOfMembers.toLocaleString()}
              </Text>
              <Text fontWeight={550} fontSize="9pt" color="gray.600">
                Members
              </Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text fontWeight={500}>234</Text>
              <Text fontWeight={550} fontSize="9pt" color="gray.600">
                Online
              </Text>
            </Flex>
          </Flex>
        </Stack>
        <Divider />
        <Flex fontSize="10pt" mt={2} align="center">
          <Icon as={IoCreateOutline} mr={2} fontSize={15} />
          {communityData.createdAt && (
            <Text>
              Created{" "}
              {moment(new Date(communityData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </Text>
          )}
        </Flex>
        <Flex fontSize="10pt" mt={2} align="center">
          <Icon as={BsTagsFill} mr={2} fontSize={15} />
          <Text>r/{communityData.id} topics</Text>
        </Flex>

        <Link href={`/r/${communityData.id}/submit`}>
          <Button height="30px" mt={3} mb={3}>
            Create Post
          </Button>
        </Link>
        {user?.uid === communityData.creatorId && (
          <>
            <Divider />
            <Stack spacing={1} fontSize="10pt" mt={2}>
              <Text fontWeight={600} fontSize={15}>
                Admin
              </Text>
              <Flex align="center" justify="space-between">
                <Text
                  cursor="pointer"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => selectedFileRef.current?.click()}
                >
                  Change Image
                </Text>
                {communityData.imageURL || selectedFile ? (
                  <Image
                    src={selectedFile || communityData.imageURL}
                    alt=""
                    borderRadius="full"
                    boxSize="50px"
                  />
                ) : (
                  <Icon
                    as={FaReddit}
                    fontSize="50px"
                    position="relative"
                    top={-3}
                    color="blue.500"
                    border="4px solid white"
                    borderRadius="50%"
                  />
                )}
              </Flex>
              {selectedFile && (
                <Button
                  cursor="pointer"
                  height="30px"
                  onClick={onUpdateImage}
                  isLoading={uploadingImage}
                >
                  Save Changes
                </Button>
              )}

              <input
                id="file-upload"
                type="file"
                accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png"
                hidden
                ref={selectedFileRef}
                onChange={onSelectFile}
              />
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};
export default About;
