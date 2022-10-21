import { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  Box,
  Text,
  Textarea,
  Stack,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { ITour } from "../../interfaces/ITour";
import { loadTours } from "../../features/tours/toursSlice.js";
import { useAppDispatch } from "../../app/hooks";

interface IStop {
  name: string | null;
  number: number | null;
  direction: string | null;
  coords: number[];
  height: number;
  details: {
    watcher: boolean;
    pickUpPoint: boolean;
    trekking: boolean;
  };
}

function ModalPostTour() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState<boolean>(false);
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

  const [mainImages, setmainImages] = useState<string[]>([]);

  const [stop, setStop] = useState<IStop>({
    name: null,
    number: null,
    direction: null,
    coords: [0, 0],
    height: 0,
    details: { watcher: false, pickUpPoint: false, trekking: false },
  });

  const [stops, setStops] = useState<IStop[]>([]);

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
      dispatch(loadTours());
    } catch (e) {
      console.error("Error:", e);
    }
  }

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    // eslint-disable-next-line
    reader.readAsDataURL(e.currentTarget.files![0]);
    return (reader.onloadend = () => {
      setmainImages([...mainImages, reader.result as string]);
    });
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setSelected(false);
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        event.target.value
      }.json?access_token=${
        import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      }&autocomplete=true&country=PE,AR,MX,BO,CL&language=es&types=region,district,place,locality,address`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
      // console.log(results);
    } catch (error) {
      // console.log("Error fetching data, ", error);
    }
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
                value={title ? (title as string) : ""}
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
                value={description ? (description as string) : ""}
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
                  value={personPriceUsd ? (personPriceUsd as string) : ""}
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
                  value={days ? (days as number) : ""}
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
                  value={country ? (country as string) : ""}
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
                  value={region ? (region as string) : ""}
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
                value={meetingPoint ? (meetingPoint as string) : ""}
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
                      setStop((prev) => {
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

                  <Box position="relative">
                    <Input
                      onChange={(e) => {
                        // setStop((prev: any) => {
                        //   return {
                        //     ...prev,
                        //     direction: e.target.value,
                        //     coords: [e.target.value],
                        //   };
                        // });
                        handleChange(e);
                      }}
                      variant="filled"
                      placeholder={`Dirección`}
                      marginY={[3, 3, 0]}
                      focusBorderColor="#4ED972"
                      colorScheme={"#EBEEF1"}
                      bg="#EBEEF1"
                      type="text"
                      value={(stops[index]?.direction as string) || value}
                    />
                    {index === numberStops - 1 &&
                      suggestions &&
                      suggestions.length > 0 &&
                      !selected && (
                        <VStack
                          position="absolute"
                          zIndex="10000"
                          background="white"
                          w="full"
                          top="2.8rem"
                          paddingY="0.4rem"
                          paddingX="0.6rem"
                          rounded="md"
                          boxShadow="lg"
                        >
                          {suggestions.map(
                            (suggestion: {
                              id: string;
                              place_name: string;
                              geometry: { coordinates: number[] };
                            }) => (
                              <Box
                                border="1px solid"
                                borderColor="gray.200"
                                paddingX="0.8rem"
                                paddingY="0.3rem"
                                rounded="md"
                                w="full"
                                key={suggestion.id}
                                cursor="pointer"
                                _hover={{
                                  background: "brand.500",
                                  color: "white",
                                  borderColor: "transparent",
                                }}
                                onClick={() => {
                                  setValue(suggestion.place_name);
                                  setSelected(true);
                                  setStop((prev) => ({
                                    ...prev,
                                    direction: suggestion.place_name,
                                    coords: [
                                      suggestion.geometry.coordinates[0],
                                      suggestion.geometry.coordinates[1],
                                    ],
                                  }));
                                }}
                              >
                                <Text>{suggestion.place_name}</Text>
                              </Box>
                            )
                          )}
                          )
                        </VStack>
                      )}
                  </Box>
                  <Stack spacing={5} direction="row" marginY="10px">
                    <Checkbox
                      colorScheme="whatsapp"
                      // eslint-disable-next-line
                      onChange={(e) =>
                        setStop((prev) => {
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
                      // eslint-disable-next-line
                      onChange={(e) =>
                        setStop((prev) => {
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
                      // eslint-disable-next-line
                      onChange={(e) =>
                        setStop((prev) => {
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
                    setStops((prev: IStop[]) =>
                      prev ? [...prev, stop] : [stop]
                    );
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
                    setValue("");
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
                value={whatYouWillDo ? (whatYouWillDo as [string]) : ""}
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
                value={whatIncludes ? (whatIncludes as [string]) : ""}
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
                /* if (!stop.name.trim() || !stop.direction.trim()) return;
                setStops((prev: any) => (prev ? [...prev, stop] : stop)); */
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
                setStops(() => []);
                setNumberStops(() => 0);
                setValue(() => "");
              }}
              type="submit"
            >
              Publicar Tour
            </Button>
            <Button
              onClick={() => {
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
                setStops(() => []);
                setNumberStops(() => 0);
                setValue(() => "");
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPostTour;
