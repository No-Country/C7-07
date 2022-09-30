import React, { useState } from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import ComunidadIcon from "../icons/ComunidadIcon";
import NavBar from "../components/NavBar/NavBar";
import Posts from "../components/Posts/Posts";
import Tours from "../components/Tours/Tours";

export const Home = () => {
  const [togglePosts, setTogglePosts] = useState(false);
  const [casaIcon, setCasaIcon] = useState(false);
  const [tourIcon, setTourIcon] = useState(false);

  return (
    <Box h="100%" w="100%">
      {/* NavBar */}
      <NavBar setCasaIcon={setCasaIcon} setTourIcon={setTourIcon}  setTogglePosts={setTogglePosts} />

      {/* Posts */}

      {!togglePosts ? <Posts /> : <Tours />}
    </Box>
  );
};
