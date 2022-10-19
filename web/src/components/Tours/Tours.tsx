import React, { useEffect, useState } from "react";
import { Box, Wrap, WrapItem, Flex, Spacer } from "@chakra-ui/react";
import TourCard, { Props } from "../TourCard/TourCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTours,
  selectIsLoadingTours,
  selectHasErrorTours,
  loadTours,
} from "../../features/tours/toursSlice";
import { useNavigate } from "react-router-dom";

function Tours() {
  const dispatch = useDispatch();
  const toursData = useSelector<[], []>(selectTours);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadTours());
    console.log(toursData)
  }, []);

  return (
    <Box bg="" py={5}>
      <Box display="flex" flexWrap="wrap" justifyContent={"space-around"} 
        onClick={()=> navigate(`/hola`)}
        >
        {toursData?.map((tour: Props) => (
          <TourCard
            
            key={tour.id}
            id={tour.id}
            country={tour.country}
            title={tour.title}
            personPriceUsd={tour.personPriceUsd}
            mainImages={tour.mainImages}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Tours;
