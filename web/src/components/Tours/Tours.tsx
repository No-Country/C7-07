import React, { useEffect, useState } from "react";
import { Box, Wrap, WrapItem, Flex, Spacer } from "@chakra-ui/react";
import TourCard, { Props } from "../TourCard/TourCard";
import { useSelector, useDispatch } from "react-redux";
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
import { useNavigate } from "react-router-dom";

function Tours() {
  const dispatch: any = useAppDispatch();
  const toursData = useAppSelector<ITour[] | null>(selectTours);
  const userData = useAppSelector(selectUser);


  useEffect(() => {
    dispatch(loadTours());
  }, []);

  return (
    <>
        <Box
          h={["60px", "60px", "120px"]}
          marginBottom="20px"
          display={"flex"}
          flexWrap="wrap"
          alignItems="center"
          justifyContent={["start"]}
        >
          <SearchTours />
          <ModalPostTour />
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
    </>
  );
}
export default Tours;
