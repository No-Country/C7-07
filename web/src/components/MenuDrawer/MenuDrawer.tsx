import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Image,
  Text,
  Box,
  List,
  Link as ChakraLink,
} from "@chakra-ui/react";
import menu from "../../assets/img/menu.png";
import perfil from "../../assets/img/perfil.png";
import PhotoPerfilSmall from "../../icons/PhotoPerfilSmall";
import { Link as RouterLink } from "react-router-dom";

function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const menuDrawItems = ["Perfil", "Mis tours"];

  return (
    <>
      <Image
        src={menu}
        ref={btnRef}
        onClick={onOpen}
        w="70px"
        padding={3}
        cursor={"pointer"}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            display={"flex"}
            justifyContent="start"
            alignItems="center"
            fontWeight={"medium"}
          >
            <Image src={perfil} w="25px" marginRight={1} />
            <Text marginLeft={2}>JHOMAR</Text>
          </DrawerHeader>

          <DrawerBody marginX={-1}>
            <List>
              {menuDrawItems.map((item, index) => (
                <ChakraLink
                  as={RouterLink}
                  to={item === "Perfil" ? "profile" : item}
                  key={index}
                  onClick={onClose}
                >
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    fontWeight={"medium"}
                    fontSize={21}
                    marginTop={2}
                  >
                    <Text>{item}</Text>

                    {item === "Perfil" && <PhotoPerfilSmall />}
                  </Box>
                </ChakraLink>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter display={""}>
            <List>
              <ChakraLink onClick={onClose}>
                <Box fontWeight={"medium"} fontSize={21} marginTop={2}>
                  <Text>Cerrar sesión</Text>
                </Box>
              </ChakraLink>
            </List>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
