import React, { useEffect, useState } from "react";
import { Box, Wrap, WrapItem, Flex, Spacer } from "@chakra-ui/react";
import TourCard, { Props } from "../TourCard/TourCard";
import {
  selectTours,
  selectIsLoadingTours,
  selectHasErrorTours,
  loadTours,
} from "../../features/tours/toursSlice.js";
import { ITour } from "../../interfaces/ITour";
import SearchTours from "../SearchTours/SearchTours";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectUser,
  selectIsLoadingUser,
  selectHasErrorUser,
  loadUser,
} from "../../features/user/userSlice";
import ModalPostTour from "../ModalPostTour/ModalPostTour";
import decodeToken from "../../utils/decodeToken";
import { IUser } from "../../interfaces/IUser";

function Tours() {
  const dispatch: any = useAppDispatch();
  const toursData = useAppSelector<ITour[] | null>(selectTours);
  const [userData, setuserData] = useState<IUser | null>(null);

  useEffect(() => {
    dispatch(loadTours());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setuserData(decodeToken(localStorage.getItem("token")));
    }
  }, []);

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
  );
}

export default Tours;
