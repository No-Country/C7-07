import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import perfil from "../../assets/img/perfil.png";
import { Candado } from "../../icons/Candado";
import { wrap } from "popmotion";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import PerfilIconGreen from "../../icons/PerfilIconGreen";
import PhotoPerfilXL from "../../icons/PhotoPerfilXL";

function Profile() {
  const location = useLocation();

  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      paddingTop={["0", "0", "0", "50px"]}
      justifyContent={"center"}
      paddingInline={["0", "0", "0", "3rem"]}
      gap="2rem"
      flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
    >
      <Box flex={1} w={["full", "full", "full", "full", "700px"]}>
        <Box
          w={["full", "full", "full", "380px"]}
          display={["block", "block", "flex", "block"]}
        >
          <Box
            bg="#222C37"
            h={"220px"}
            display="flex"
            w={["full", "full", "380px", "full", "380px"]}
            justifyContent="center"
            alignItems={"center"}
            flex={1}
          >
            <PhotoPerfilXL />
          </Box>

          <Box flex={1}>
            <ChakraLink
              as={RouterLink}
              to="/profile"
              w={["full", "full", "full"]}
              flex={1}
              h={["50px", "50px", "50px"]}
              display={"flex"}
              alignItems={"center"}
              border="1px solid #B5B5B5"
              bg={location.pathname.includes("password") ? "white" : "#EBEEF1"}
              borderBottom="none"
            >
              <Box marginX={"12px"}>
                <PerfilIconGreen />
              </Box>
              {/* <Image src={LogoIcon} w="30px" marginX={"12px"} /> */}
              <Text display={"flex"} fontWeight="bold" fontSize="medium">
                Perfil
              </Text>
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to={"/profile/password"}
              h={["50px", "50px", "50px"]}
              display={"flex"}
              alignItems={"center"}
              border="1px solid #B5B5B5"
              bg={location.pathname.includes("password") ? "#EBEEF1" : "white"}
            >
              <Candado
                color={
                  location.pathname.includes("password") ? "#4DDA73" : "black"
                }
                marginX={"12px"}
                height="26px"
                width="26px"
              />
              <Text display={"flex"} fontWeight="bold" fontSize="medium">
                Contraseña
              </Text>
            </ChakraLink>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        paddingInline={"1rem"}
        flexDirection="column"
        w={["full"]}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Profile;
