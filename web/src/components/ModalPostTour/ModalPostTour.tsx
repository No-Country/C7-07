import React, { useEffect, useState } from "react";
import { Spacer } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Box,
  Text,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

function ModalPostTour() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  const [days, setDays] = useState(1);
  const [region, setRegion] = useState("arasd");
  const [country, setCountry] = useState("asdasd");
  const [description, setDescription] = useState("sdfsdfsd");
  const [experience, setExperience] = useState([
    {
      whatYouWillDo: [""],
      whatIncludes: [""],
      meetingPoint: "",
    },
  ]);
  const [mainImages, setmainImages] = useState(["asdasd", "asdasd"]);
  const [personPriceUsd, setpersonPriceUsd] = useState("1");
  const [stops, setStops] = useState([
    {
      name: "",
      number: "",
      direction: "",
      coords: [0, 0],
      height: 0,
      details: { watcher: false, pickUpPoint: false, trekking: false },
    },
  ]);
  const [title, setTitle] = useState("fghfghf");

  const tourTemplate = {
    days,
    region,
    country,
    description,
    experience,
    mainImages,
    personPriceUsd,
    stops,
    title,
  };

  /* {
    title: "hola",
    agencies: [
      {  
        name: "",
        description: "",
      },
    ],
    experience: [
      {
        whatYouWillDo: [""],
        whatIncludes: [""],
        meetingPoint: "",
        
      },
    ],
    country: "",
    description: "",
    personPriceUsd: 0,
    stops: [
      {
        name: "",
        number: "",
        direction: "",
        coords: [0, 0],
        height: 0,
        details: { watcher: false, pickUpPoint: false, trekking: false },
      }
      
    ],
    mainImages: [],
    region: "",
    days: 0,
  }; */
  

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWduYWNpbyBGZWRvcmVuY28iLCJlbWFpbCI6ImlnbmFjaW9mZWRvcmVuY28yMzE3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJHBhc3MxMjMiLCJhbGlhcyI6IklnbkZlZCIsInVzZXJUeXBlIjoiQWdlbmN5IiwiZGVzY3JpcHRpb24iOiJUcmF2ZWwgQWdlbmN5IiwiY29udGFjdHMiOnsid2hhdHNhcHAiOiIzMjE5MTMxOTgyNzM4In0sImlkIjoiNjM0Y2U0ZDhlYjFiYmQyZjlmMjkwZWFhIiwiaWF0IjoxNjY1OTgzNzA0fQ.rNcqm39rhKh5ViM24TRqyzYFRdfvUnCZbfW-A3Kc6Dw";

    
  async function postData(url = "http://localhost:3001/tours") {
    
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(tourTemplate),
      });
      const datas = await response.json();

      console.log("Success:", datas);
    } catch (e) {
      console.error("Error:", e);
      
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        marginX={["10px", "20px", "50px", "70px"]}
        bg="#4ED972"
        color="white"
        borderRadius="10px"
        h={["35px", "35px", "40px"]}
      >
        Publicar tour
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={"6xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontSize="3xl" fontWeight={"bold"}>
            Publica un tour
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexWrap={"wrap"}
            justifyContent="space-evenly"
            pb="20px"
          >
            <Box flex={1} paddingX="20px">
              <Text fontSize={["x-large"]} borderBottom="1px solid #B5B5B5">
                Información base
              </Text>
              <Input
                variant="filled"
                placeholder="Nombre"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Textarea
                resize={"none"}
                variant="filled"
                placeholder="Descripción"
                marginY={[1, 1, 1]}
                height={"100px"}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
              />
              <Box
                display={"flex"}
                flexDirection="row"
                experimental_spaceX={"15px"}
              >
                <Input
                  variant="filled"
                  placeholder="Precio"
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="text"
                />
                <Input
                  variant="filled"
                  placeholder="Días"
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="number"
                />
                <Input
                  variant="filled"
                  placeholder="País"
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="text"
                />
                <Input
                  variant="filled"
                  placeholder="Región"
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="text"
                />
              </Box>

              <Text fontSize={["x-large"]} borderBottom="1px solid #B5B5B5">
                Imagenes
              </Text>
              <Input
                variant="filled"
                placeholder="URL de la imagen 1"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Input
                variant="filled"
                placeholder="URL de la imagen 2"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Input
                variant="filled"
                placeholder="URL de la imagen 3"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
            </Box>

            <Box flex={1} paddingX="20px">
              <Text fontSize={["x-large"]} borderBottom="1px solid #B5B5B5">
                Experiencia
              </Text>
              <Textarea
                resize={"none"}
                variant="filled"
                placeholder="¿Qué hará?"
                marginY={[1, 1, 1]}
                height={"100px"}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
              />
              <Textarea
                resize={"none"}
                variant="filled"
                placeholder="¿Qué incluye?"
                marginY={[1, 1, 1]}
                height={"100px"}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
              />

              <Text fontSize={["x-large"]} borderBottom="1px solid #B5B5B5">
                Paradas
              </Text>
              <Input
                variant="filled"
                placeholder="Punto de encuentro"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Input
                variant="filled"
                placeholder="Nombre parada 1"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Input
                variant="filled"
                placeholder="Dirección parada 1"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />

              <Input
                variant="filled"
                placeholder="Nombre parada 2"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Input
                variant="filled"
                placeholder="Dirección parada 2"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />

              <Input
                variant="filled"
                placeholder="Nombre parada 3"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
              <Input
                variant="filled"
                placeholder="Dirección parada 3"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              bg="#4ED972"
              color="white"
              borderRadius="10px"
              onClick={() => postData()}
            >
              Publicar Tour
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPostTour;
