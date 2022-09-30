import React, { Dispatch, useState } from "react";

import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import casaDesactivada from "../../assets/img/casa_desactivado.png";
import casaActivada from "../../assets/img/casa_activado.png";
import montanaActivada from "../../assets/img/montana_activado.png";
import montanaDesactivada from "../../assets/img/montana_desactivado.png";
import menu from "../../assets/img/menu.png";

interface Props {
  setTogglePosts: Dispatch<boolean>;
}

function NavBar({ setTogglePosts }: Props) {
  const [casaIcon, setCasaIcon] = useState(false);
  const [tourIcon, setTourIcon] = useState(true);

  return (
    <Box
      h="80px"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      borderBottom="1px solid 
      gray"
    >
      <Box display="flex" alignItems={"center"} w="40px" h="40px">
        <Text fontWeight="bold" color="purple">
          Travis Space
        </Text>
      </Box>

      <Box
        display="flex"
        alignItems={"center"}
        w="40px"
        h="100%"
        onClick={() => {
          setTogglePosts(false);
          if (casaIcon) {
            setCasaIcon(false);
            setTourIcon(true);
          }
          // setCasaIcon(true);
          // setTourIcon(false);
        }}
      >
        {casaIcon ? (
          <Image src={casaDesactivada} />
        ) : (
          <Image src={casaActivada} />
        )}
      </Box>
      <Box
        display="flex"
        alignItems={"center"}
        w="40px"
        h="100%"
        onClick={() => {
          setTogglePosts(true);
          if (tourIcon) {
            setTourIcon(false);
            setCasaIcon(true);
          }
        }}
      >
        {tourIcon ? (
          <Image src={montanaDesactivada} />
        ) : (
          <Image src={montanaActivada} />
        )}
      </Box>
      <Box display="flex" alignItems={"center"} w="40px" h="100%">
        <Image src={menu} />
      </Box>
    </Box>
  );
}

export default NavBar;