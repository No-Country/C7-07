import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex, Spacer,
} from "@chakra-ui/react";
import { Carousel } from "../Carousel/Carousel";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

function TourCard() {
  return (
    <Center mt={50} bg="gray.100" w={400}>
      <Box
        role={"group"}
        p={3}
        maxW={"100%"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          /* _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            // backgroundImage: `url(${I]MAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }} */
          position="relative"
          w="100%"
          h="300px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Carousel />
        </Box>

        <Stack pt={3} align={"left"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            Machu Picchu
          </Heading>
          <Text color={"gray.500"} fontSize={"xl"}>
            Puno, Perú
          </Text>
          <Text color={"gray.500"} fontSize={"xl"}>
            1 Día
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text color={"gray.500"} fontSize={"xl"}>
              Desde
            </Text>
            <Text fontWeight={700} fontSize={"xl"}>
              39 USD
            </Text>
            <Text color={"gray.500"} fontSize={"xl"}>
              por persona
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export default TourCard;
