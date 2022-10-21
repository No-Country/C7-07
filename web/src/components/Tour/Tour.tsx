import { Box, Text, Link as ChakraLink, List, Spinner } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ArrowLeft from "../../icons/ArrowLeft";
import { Link as RouterLink, useParams } from "react-router-dom";
import { loadTourById, selectTour } from "../../features/tour/tourSlice";
import { ITour } from "../../interfaces/ITour";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import ListPoint from "../ListPoint/ListPoint";
import { loadTours, selectTours } from "../../features/tours/toursSlice";
import TourCard from "../TourCard/TourCard";

function Tour() {
  const { tourId } = useParams();
  const dispatch = useAppDispatch();
  const tourData = useAppSelector<ITour | null>(selectTour);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch1 = useAppDispatch();
  const toursData = useAppSelector<ITour[] | null>(selectTours);

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(loadTourById(tourId!));
    dispatch1(loadTours());
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    // eslint-disable-next-line
  }, []);

  return (
    <Box marginX={"40px"}>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#4ED972"
          size="xl"
          display={"flex"}
          marginLeft={"630px"}
          marginTop={"250px"}
        />
      ) : (
        <>
          <Box flex={1}>
            <ChakraLink
              as={RouterLink}
              to="/tours"
              w={["full", "full", "full"]}
              flex={1}
              h={["50px", "50px", "50px"]}
              display={"flex"}
              alignItems={"center"}
              _hover={{ textDecorationLine: "none" }}
            >
              <Box marginX={"10px"}>
                <ArrowLeft />
              </Box>
              <Text
                display={"flex"}
                fontWeight="bold"
                fontSize="medium"
                color="#4DDA73"
              >
                Ver todos los Tours
              </Text>
            </ChakraLink>
            <Box>
              <Box>{tourData?.title}</Box>
              <Box>
                {tourData?.region}, {tourData?.country} · {tourData?.days} dia
                {
                  // eslint-disable-next-line
                  tourData!.days > 1 ? "s" : ""
                }
              </Box>
            </Box>
          </Box>
          <Box>Mapa</Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box w={["full", "full", "800px"]}>
              {tourData?.description}
              <Box>
                <Text>Tu experiencia</Text>
                <Box>
                  <Box
                    display={"flex"}
                    borderBottom="1px solid #B5B5B5"
                    paddingY={"20px"}
                  >
                    <Text>Qué harás</Text>
                    <List marginX={"150px"}>
                      {tourData?.experience[0].whatYouWillDo.map(
                        (i: string) => {
                          return <ListPoint key={i} content={i} />;
                        }
                      )}
                    </List>
                  </Box>
                  <Box
                    display={"flex"}
                    borderBottom="1px solid #B5B5B5"
                    paddingY={"20px"}
                  >
                    <Text>Qué incluye</Text>
                    <List marginX={"140px"}>
                      {tourData?.experience[0].whatIncludes.map((i: string) => {
                        return <ListPoint key={i} content={i} />;
                      })}
                    </List>
                  </Box>
                  <Box
                    display={"flex"}
                    borderBottom="1px solid #B5B5B5"
                    paddingY={"20px"}
                  >
                    <Text>Punto de encuentro</Text>
                    <Box marginX={"90px"}>
                      {tourData?.experience[0].meetingPoint}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>Form</Box>
          </Box>
          <Box>
            <Text>Otras Sugerencias</Text>
            <Box display="flex" flexWrap="wrap" justifyContent={"space-around"}>
              {toursData &&
                toursData.map((tour: ITour, i: number) => {
                  return (
                    <TourCard
                      key={i}
                      id={tour.id}
                      days={tour.days}
                      city={tour.region}
                      country={tour.country}
                      title={tour.title}
                      personPriceUsd={tour.personPriceUsd}
                      mainImages={tour.mainImages}
                    />
                  );
                })}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Tour;
