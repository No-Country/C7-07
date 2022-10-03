import React from "react";
import { Box, Wrap, WrapItem, Flex, Spacer} from "@chakra-ui/react";
import TourCard from "../TourCard/TourCard";

function Tours() {
  return (
    <Wrap  >
      <Box bg="" py={5} h={1000}>
        <Flex color='white'>
        <WrapItem>
          <TourCard />
        </WrapItem>
        <WrapItem>
          <TourCard />
        </WrapItem>
        <WrapItem>
          <TourCard />
        </WrapItem>
        <WrapItem>
          <TourCard />
        </WrapItem>
        <WrapItem>
          <TourCard />
        </WrapItem>
        </Flex>
      </Box>    
    </Wrap>
      
  );
}

export default Tours;
