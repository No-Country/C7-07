import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  FormLabel,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import fileImage from "../../assets/img/File_Photo.svg";
import { useSetPostMutation } from "../../services/social";

export const PostForm = React.memo(function FormMemo() {
  const [setPost] = useSetPostMutation();
  const [imgRef, setImgRef] = useState<{
    url: string | ArrayBuffer | null;
    alt: string;
  }>();

  const contentRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      const image: typeof imgRef = {
        url: reader.result ?? "",
        alt: files[0].name,
      };
      setImgRef(image);
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imgRef?.url && !contentRef?.current?.value) return;
    await setPost({
      description: contentRef?.current?.value ?? "",
      media: imgRef?.url ?? "",
    }).then(() => {
      if (contentRef?.current) contentRef.current.value = "";
      setImgRef({ url: null, alt: "" });
    });
  };

  return (
    <Box
      as="section"
      border="1px solid #C7C5C5"
      borderRadius="10px"
      padding="15px 13px 10px 13px"
      w="auto"
    >
      <VStack
        as="form"
        onSubmit={handleSubmit as (e: unknown) => void}
        alignItems="center"
        spacing="1rem"
      >
        <HStack w="full" spacing="0.8rem">
          <Box
            borderRadius="full"
            w="2rem"
            h="2rem"
            bgColor="#796E6E"
            flex="none"
          ></Box>
          <Input
            borderRadius="full"
            ref={contentRef}
            outline="none"
            border="none"
            _focus={{ outline: "2px solid #4ED972" }}
            name="content"
            bgColor="#EAEAEA"
            placeholder="¿Qué tienes en mente Usuario?"
            _placeholder={{ fontSize: "0.85rem" }}
            w="full"
          />
          <FormControl variant="floating" flex="none" w="auto">
            <Input
              type="file"
              name="file"
              display="none"
              onChange={handleFile}
            />
            <FormLabel
              display="flex"
              id="file"
              justifySelf="flex-start"
              alignItems="center"
              gap="5px"
              color="#796E6E"
              cursor="pointer"
            >
              <Image h="1.8rem" src={fileImage} />
              Photo
            </FormLabel>
          </FormControl>
        </HStack>
        <Button
          borderRadius="10px"
          type="submit"
          color="white"
          background="#4ED972"
          _hover={{ background: "#2BA84C" }}
          w="full"
        >
          Publicar
        </Button>
        {imgRef?.url && (
          <Image
            gridColumn="1/4"
            src={(imgRef.url as string) ?? undefined}
            alt={imgRef.alt}
            width="100%"
            objectFit="contain"
            height="400px"
          />
        )}
      </VStack>
    </Box>
  );
});
