import { useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import TourCard from "../TourCard/TourCard";
import {
  selectTours,
  selectIsLoadingTours,
  loadTours,
} from "../../features/tours/toursSlice.js";
import { ITour } from "../../interfaces/ITour";
import SearchTours from "../SearchTours/SearchTours";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import ModalPostTour from "../ModalPostTour/ModalPostTour";

function Tours() {
  const dispatch: any = useAppDispatch();
  const toursData = useAppSelector<ITour[] | null>(selectTours);
  const isLoadingTours = useAppSelector<boolean | null>(selectIsLoadingTours);

  useEffect(() => {
    dispatch(loadTours());
  }, [dispatch]);

  const userData = {
    userType: localStorage.getItem("user_type"),
    token: localStorage.getItem("token"),
  };

  return (
    <Box bg="" py={5}>
      <Box
        h={["60px", "60px", "120px"]}
        marginBottom={["40px", "40px", "20px"]}
        display={"flex"}
        flexWrap="wrap"
        alignItems="center"
        justifyContent={["space-between"]}
      >
        <SearchTours />

        {userData?.userType === "Agency" && <ModalPostTour />}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent={"space-around"}>
        {isLoadingTours ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
            marginTop={"100px"}
          />
        ) : (
          toursData?.map((tour: ITour, i: number) => (
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
          ))
        )}
      </Box>
    </Box>
  );
}

export default Tours;
