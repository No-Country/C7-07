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

export interface Props {
  id: string;
  country: string;
  title: string;
  personPriceUsd: string;
  mainImages: Array<string>;
  days: number;
  city: string;
}

function TourCard({ id, country, title, personPriceUsd, mainImages, days, city }: Props) {
  return (
    <Center  bg="gray.100" w={["full", "full", "320px"]} marginBottom='15px'>
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
            {city}, {country}
          </Text>
          <Text color={"gray.500"} fontSize={"xl"}>
            {days} Día{days > 1 ? "s" : ""}
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text color={"gray.500"} fontSize={"xl"}>
              Desde
            </Text>
            <Text fontWeight={700} fontSize={"xl"}>
              ${personPriceUsd}
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
