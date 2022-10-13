import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Carousel } from "../Carousel/Carousel";

interface Props {
  id: number;
  country: string;
  title: string;
  personPriceUsd: number;
  mainImages: Array<string>;
}

function TourCard({ id, country, title, personPriceUsd, mainImages }: Props) {
  return (
    <Center mt={50} bg="gray.100" w={["full", "full", "320px"]}>
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
        overflow="hide"
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
          w="full"
          h="300px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Carousel fotosPrincipales={mainImages} />
        </Box>

        <Stack pt={3} align={"left"}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Text color={"gray.500"} fontSize={"xl"}>
            {country}
          </Text>
          <Text color={"gray.500"} fontSize={"xl"}>
            1 Día
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text color={"gray.500"} fontSize={"xl"}>
              Desde
            </Text>
            <Text fontWeight={700} fontSize={"xl"}>
              {personPriceUsd} USD
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
