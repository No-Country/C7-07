<<<<<<< HEAD
export const Home = () => {
  return <div>Home Travel Space</div>;
=======
import React, { useState } from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import ComunidadIcon from "../icons/ComunidadIcon";
import NavBar from "../components/NavBar/NavBar";
import Posts from "../components/Posts/Posts";
import Tours from "../components/Tours/Tours";

export const Home = () => {
  const [togglePosts, setTogglePosts] = useState(false);

  return (
    <Box h="100%" w="100%">
      {/* NavBar */}
      <NavBar setTogglePosts={setTogglePosts} />

      {/* Posts */}

      {!togglePosts ? <Posts /> : <Tours />}
    </Box>
  );
>>>>>>> 7e1a1eb65656f24913c5e5629bd6f0a82dbc3432
};
