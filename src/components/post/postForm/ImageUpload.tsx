import { Icon } from "@chakra-ui/icons";
import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { TiUpload } from "react-icons/ti";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  setSelectedTab: (value: string) => void;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="column" align="center" justify="center" width="100%">
      {selectedFile ? (
        <>
          <Image src={selectedFile} alt="" maxWidth="400px" maxHeight="300px" />
          <Flex mt={3}>
            <Button height="28px" mr={3} onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              variant="outline"
              height="28px"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          direction="column"
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.300"
          borderRadius={4}
          width="100%"
        >
          <Icon
            as={TiUpload}
            fontSize={50}
            color="blue.400"
            cursor="pointer"
            _hover={{ opacity: 0.9 }}
            onClick={() => selectedFileRef.current?.click()}
          />
          <Text fontSize="12pt" fontWeight={600} color="gray.500" mt={2}>
            Upload
          </Text>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png"
            hidden
            ref={selectedFileRef}
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
