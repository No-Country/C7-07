import { Box, Image, Text, Link as ChakraLink } from "@chakra-ui/react";
import NotFoundImage from "../../assets/img/NotFoundImage.png";
import logoTravis from "../../assets/img/Logo_Travis.svg";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      minH="90vh"
      w="full"
      justifyContent={"center"}
      alignItems="center"
      paddingY={10}
    >
      <Box
        w={"400px"}
        paddingX={[5]}
        display={"flex"}
        flexDirection={"column"}
        paddingY={5}
      >
        <ChakraLink as={RouterLink} to="/home">
          <Image src={logoTravis} marginBottom={"30px"} w={"200px"} />
        </ChakraLink>
        <Box>
          <Text fontWeight={300} fontSize="3xl">
            ¡Oooops! No hemos podido encontrar la página que buscas.
          </Text>
          <Text
            color="gray.500"
            as={"i"}
            marginTop={"5px"}
            display={"flex"}
            justifyContent={"flex-end"}
            marginRight={"35px"}
          >
            - Equipo Travel Space
          </Text>
        </Box>
      </Box>
      <Image src={NotFoundImage} w={["300px", "400px", "400px"]} />
    </Box>
  );
}

export default NotFound;
