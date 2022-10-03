import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import fileImage from "../../assets/img/File_Photo.svg";

export const PostForm = () => {
  return (
    <Box
      as="section"
      border="1px solid #C7C5C5"
      borderRadius="10px"
      padding="15px 13px 10px 13px"
      w="auto"
    >
      <FormControl
        w="inherit"
        as="form"
        display="grid"
        gridTemplateColumns={["45px 1fr .5fr", "45px 1fr .2fr"]}
        alignItems="center"
        gridTemplateRows="1fr"
        gap="8px 6px"
      >
        <Box borderRadius="full" w="35px" h="35px" bgColor="#796E6E"></Box>
        <Input
          borderRadius="full"
          bgColor="#EAEAEA"
          placeholder="¿Qué tienes en mente Usuario?"
          _placeholder={{ fontSize: "10px", marginInline: "12px" }}
        />
        <Flex justifySelf="flex-start" gap="8px" color="#796E6E">
          <Image w="35px" h="35px" src={fileImage} /> <Text>Foto</Text>
        </Flex>
        <Button
          borderRadius="10px"
          h="45px"
          type="submit"
          color="white"
          background="#4ED972"
          _hover={{ background: "#2BA84C" }}
          gridColumn={"1/4"}
        >
          Publicar
        </Button>
      </FormControl>
    </Box>
  );
};
