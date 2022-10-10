import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React from "react";
import perfil from "../../assets/img/perfil.png";
import { Candado } from "../../icons/Candado";
import { wrap } from "popmotion";
import { Link, useLocation } from "react-router-dom";
import InputPerfil from "./InputPerfil";
import Contraseña from "./Contraseña";
import PerfilIconGreen from "../../icons/PerfilIconGreen";
import PhotoPerfilXL from "../../icons/PhotoPerfilXL";

function Perfil() {
  const location = useLocation();

  return (
    <Box
      h="500px"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
    >
      <Box
        paddingLeft={[0, 0, 0, 20]}
        flex={1}
        marginTop={[0, 0, 5, 16]}
        w={["full", "full", "full", "full", "700px"]}
      >
        <Box
          maxW={["full", "full", "full", "380px"]}
          display={["block", "block", "flex", "block"]}
        >
          <Box
            bg="#222C37"
            h={"220px"}
            display="flex"
            maxW={["full", "full", "380px", "full", "380px"]}
            justifyContent="center"
            alignItems={"center"}
            flex={1}
          >
            <PhotoPerfilXL />
          </Box>

          <Box flex={1}>
            <Link to="/perfil">
              <Box
                w={["full", "full", "full"]}
                flex={1}
                h={["50px", "50px", "50px"]}
                display={"flex"}
                alignItems={"center"}
                border="1px solid #B5B5B5"
                bg={
                  location.pathname.includes("contraseña") ? "white" : "#EBEEF1"
                }
                borderBottom="none"
              >
                <Box marginX={"12px"}>
                  <PerfilIconGreen />
                </Box>
                {/* <Image src={LogoIcon} w="30px" marginX={"12px"} /> */}
                <Text display={"flex"} fontWeight="bold" fontSize="medium">
                  Perfil
                </Text>
              </Box>
            </Link>

            <Link to={"/perfil/contraseña"}>
              <Box
                h={["50px", "50px", "50px"]}
                display={"flex"}
                alignItems={"center"}
                border="1px solid #B5B5B5"
                bg={
                  location.pathname.includes("contraseña") ? "#EBEEF1" : "white"
                }
              >
                <Candado
                  color={
                    location.pathname.includes("contraseña")
                      ? "#4DDA73"
                      : "black"
                  }
                  marginX={"12px"}
                  height="26px"
                  width="26px"
                />
                <Text display={"flex"} fontWeight="bold" fontSize="medium">
                  Contraseña
                </Text>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>

      {location.pathname === "/perfil" ? <InputPerfil /> : null}

      {location.pathname === "/perfil/contraseña" ? <Contraseña /> : null}
    </Box>
  );
}

export default Perfil;
