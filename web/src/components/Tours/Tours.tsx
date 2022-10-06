import React, { useEffect, useState } from "react";
import { Box, Wrap, WrapItem, Flex, Spacer } from "@chakra-ui/react";
import TourCard from "../TourCard/TourCard";

function Tours() {
  const [toursData, setToursData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3005/tours")
      .then((response) => response.json())
      .then((response) => setToursData(response));
  }, []);

  return (
    <Box bg="" py={5}>
      <Box display="flex" flexWrap="wrap" justifyContent={"space-around"}>
        {toursData?.map((tour) => (
          <TourCard
            key={tour.id}
            id={tour.id}
            pais={tour.pais}
            titulo={tour.titulo}
            precioPorPersonaUsd={tour.precioPorPersonaUsd}
            fotosPrincipales={tour.fotosPrincipales}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Tours;
