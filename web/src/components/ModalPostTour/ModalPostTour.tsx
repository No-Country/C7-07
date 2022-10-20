import React, { useEffect, useState, useRef } from "react";
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
  InputGroup,
  InputRightElement,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { ITour } from "../../interfaces/ITour";
import { loadTours } from "../../features/tours/toursSlice";
import { useAppDispatch } from "../../app/hooks";

function ModalPostTour() {
  const dispatch: any = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [numberStops, setNumberStops] = useState(0);

  const [days, setDays] = useState<string | number | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [personPriceUsd, setPersonPriceUsd] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const [whatYouWillDo, setWhatYouWillDo] = useState<[string] | null>(null);
  const [whatIncludes, setWhatIncludes] = useState<[string] | null>(null);
  const [meetingPoint, setMeetingPoint] = useState<string | null>(null);

  const experience = {
    whatYouWillDo,
    whatIncludes,
    meetingPoint,
  };

  const [mainImages, setmainImages] = useState([]);

  const [stop, setStop] = useState({
    name: null,
    number: null,
    direction: null,
    coords: [0, 0],
    height: 0,
    details: { watcher: false, pickUpPoint: false, trekking: false },
  });

  const [stops, setStops] = useState([]);
  console.clear();
  console.log(
    "🚀 ~ file: ModalPostTour.tsx ~ line 70 ~ ModalPostTour ~ stops",
    stops
  );

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
  } as unknown as ITour;
  // console.log("🚀 ~ file: ModalPostTour.tsx ~ line 82 ~ ModalPostTour ~ tourTemplate", tourTemplate)

  /* const tourTemplate = {
    title: title.current?.value,
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
      },
    ],
    mainImages: [],
    region: "",
    days: 0,
  } as unknown as ITour; */

  const token = localStorage.getItem("token") || "";

  async function postData(url = "http://localhost:3001/tours") {
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    return (reader.onloadend = () => {
      setmainImages([...mainImages, reader.result as string]);
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        marginX={["10px", "20px", "50px", "70px"]}
        bg="#4ED972"
        color="white"
        borderRadius="10px"
        h={["40px", "40px", "40px"]}
        w={["full", "full", "140px"]}
      >
        Publicar tour
      </Button>

      <Modal
        isOpen={true}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={"6xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontSize="3xl" fontWeight={"bold"}>
            Publicar tour
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
                name="title"
                onChange={(e) => setTitle(() => e.target.value)}
                value={title as string}
                variant="filled"
                placeholder="Nombre"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
                maxLength={30}
                minLength={10}
              />
              <Textarea
                name="description"
                value={description as string}
                onChange={(e) => setDescription(() => e.target.value)}
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
                  name={"personPriceUsd"}
                  value={personPriceUsd as string}
                  onChange={(e) => setPersonPriceUsd(() => e.target.value)}
                  variant="filled"
                  placeholder="Precio"
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="number"
                />
                <Input
                  name="days"
                  value={days as number}
                  variant="filled"
                  placeholder="Días"
                  onChange={(e) => setDays(() => e.target.value)}
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="number"
                />
                <Input
                  name="country"
                  value={country as string}
                  onChange={(e) => setCountry(() => e.target.value)}
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
                  value={region as string}
                  onChange={(e) => setRegion(() => e.target.value)}
                  placeholder="Región"
                  marginY={[3, 3, 2]}
                  focusBorderColor="#4ED972"
                  colorScheme={"#EBEEF1"}
                  bg="#EBEEF1"
                  type="text"
                />
              </Box>

              <Text fontSize={["x-large"]} borderBottom="1px solid #B5B5B5">
                Paradas
              </Text>

              <Input
                value={meetingPoint as string}
                variant="filled"
                onChange={(e) => setMeetingPoint(() => e.target.value)}
                placeholder="Punto de encuentro"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="text"
              />

              {[...Array(numberStops)].map((elementInArray, index) => (
                <Box key={index} padding={"20px"}>
                  <Text
                    fontSize={["large"]}
                    borderBottom="1px solid #B5B5B5"
                  >{`Parada ${index + 1}`}</Text>
                  <Input
                    variant="filled"
                    onChange={(e) => {
                      setStop((prev: any) => {
                        return {
                          ...prev,
                          name: e.target.value,
                          number: index + 1,
                        };
                      });
                    }}
                    placeholder={`Nombre`}
                    marginY={[3, 3, 3]}
                    focusBorderColor="#4ED972"
                    colorScheme={"#EBEEF1"}
                    bg="#EBEEF1"
                    type="text"
                  />
                  <Input
                    onChange={(e) => {
                      setStop((prev: any) => {
                        return { ...prev, direction: e.target.value };
                      });
                    }}
                    variant="filled"
                    placeholder={`Dirección`}
                    marginY={[3, 3, 0]}
                    focusBorderColor="#4ED972"
                    colorScheme={"#EBEEF1"}
                    bg="#EBEEF1"
                    type="text"
                  />
                  <Stack spacing={5} direction="row" marginY="10px">
                    <Checkbox
                      colorScheme="whatsapp"
                      onChange={(e) =>
                        setStop((prev: any) => {
                          return {
                            ...prev,
                            details: { ...prev.details, pickUpPoint: true },
                          };
                        })
                      }
                    >
                      Punto de recojo
                    </Checkbox>
                    <Checkbox
                      colorScheme="whatsapp"
                      onChange={(e) =>
                        setStop((prev: any) => {
                          return {
                            ...prev,
                            details: { ...prev.details, watcher: true },
                          };
                        })
                      }
                    >
                      Mirador
                    </Checkbox>
                    <Checkbox
                      colorScheme="whatsapp"
                      onChange={(e) =>
                        setStop((prev: any) => {
                          return {
                            ...prev,
                            details: { ...prev.details, trekking: true },
                          };
                        })
                      }
                    >
                      Trekking
                    </Checkbox>
                  </Stack>
                </Box>
              ))}

              <Box display={"flex"} justifyContent="space-between">
                <Button
                  colorScheme="blue"
                  mr={3}
                  bg="#4ED972"
                  color="white"
                  borderRadius="10px"
                  onClick={() => {
                    setNumberStops((prev) => prev + 1);
                    if (numberStops === 0) return;
                    setStops((prev: any) => (prev ? [...prev, stop] : stop));
                    setStop({
                      name: null,
                      number: null,
                      direction: null,
                      coords: [0, 0],
                      height: 0,
                      details: {
                        watcher: false,
                        pickUpPoint: false,
                        trekking: false,
                      },
                    });
                  }}
                  type="submit"
                >
                  + Agregar parada
                </Button>

                {numberStops !== 0 && (
                  <Button
                    colorScheme="blue"
                    mr={3}
                    bg="#4ED972"
                    color="white"
                    borderRadius="10px"
                    onClick={() => {
                      setNumberStops((prev) => prev - 1);
                    }}
                    type="submit"
                  >
                    - Quitar parada
                  </Button>
                )}
              </Box>
            </Box>

            <Box flex={1} paddingX="20px">
              <Text fontSize={["x-large"]} borderBottom="1px solid #B5B5B5">
                Experiencia
              </Text>

              <Textarea
                name="whatYouWillDo"
                value={whatYouWillDo as [string]}
                onChange={(e) => {
                  setWhatYouWillDo(() => [e.target.value]);
                }}
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
                value={whatIncludes as [string]}
                onChange={(e) => {
                  setWhatIncludes(() => [e.target.value]);
                }}
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
                Imagenes
              </Text>

              <Input
                variant="filled"
                placeholder="URL de la imagen 1"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="file"
                onChange={handleFile}
              />

              <Input
                variant="filled"
                placeholder="URL de la imagen 2"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="file"
                onChange={handleFile}
              />
              <Input
                variant="filled"
                placeholder="URL de la imagen 3"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="file"
                onChange={handleFile}
              />
              <Input
                variant="filled"
                placeholder="URL de la imagen 4"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="file"
                onChange={handleFile}
              />
              <Input
                variant="filled"
                placeholder="URL de la imagen 5"
                marginY={[3, 3, 2]}
                focusBorderColor="#4ED972"
                colorScheme={"#EBEEF1"}
                bg="#EBEEF1"
                type="file"
                onChange={handleFile}
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
              onClick={() => {
                postData();
                onClose();

                setTitle(() => null);
                setPersonPriceUsd(() => null);
                setDays(() => null);
                setCountry(() => null);
                setRegion(() => null);
                setDescription(() => null);

                setWhatYouWillDo(() => null);
                setWhatIncludes(() => null);
                setMeetingPoint(() => null);
                if (!stop.name.trim() || !stop.direction.trim()) return;
                setStops((prev: any) => (prev ? [...prev, stop] : stop));
                setStop({
                  name: null,
                  number: null,
                  direction: null,
                  coords: [0, 0],
                  height: 0,
                  details: {
                    watcher: false,
                    pickUpPoint: false,
                    trekking: false,
                  },
                });
              }}
              type="submit"
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
