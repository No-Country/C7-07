import React from "react";
import { Box, Wrap, WrapItem, Flex, Spacer} from "@chakra-ui/react";
import TourCard from "../TourCard/TourCard";

function Tours() {
  return (
    <Box bg="" py={5}>
      <Box display="flex" flexWrap="wrap" justifyContent={"space-around"}>
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
      </Box>
    </Box>
  );
}

export default Tours;
