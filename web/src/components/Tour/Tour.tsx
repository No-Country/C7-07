import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import ArrowLeft from "../../icons/ArrowLeft";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

function Tour() {
  return (
    <Box>
      <Box flex={1} marginX={"40px"}>
        <ChakraLink
          as={RouterLink}
          to="/tours"
          w={["full", "full", "full"]}
          flex={1}
          h={["50px", "50px", "50px"]}
          display={"flex"}
          alignItems={"center"}
        >
          <Box marginX={"12px"}>
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
        Senderismo por la montaña Arcoíris y el valle Rojo
      </Box>
      <Box>Mapa</Box>
    </Box>
  );
}

export default Tour;
