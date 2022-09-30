import React, { Dispatch } from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import HomeIcon from "../../icons/HomeIcon";

interface Props {
  setTogglePosts: Dispatch<boolean>;
}

function NavBar({ setTogglePosts }: Props) {
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
        }}
      >
        <HomeIcon />
      </Box>

      <Box
        display="flex"
        alignItems={"center"}
        w="40px"
        h="100%"
        onClick={() => {
          setTogglePosts(true);
        }}
      >
        <Image src="https://cdn.iconscout.com/icon/premium/png-128-thumb/mountain-1889743-1597817.png" />
      </Box>

      <Box display="flex" alignItems={"center"} w="40px" h="100%">
        <Image src="https://cdn.iconscout.com/icon/premium/png-128-thumb/hamburger-menu-4318915-3613249.png" />
      </Box>
    </Box>
  );
}

export default NavBar;
