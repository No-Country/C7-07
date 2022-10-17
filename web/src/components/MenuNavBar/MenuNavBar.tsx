import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import perfil from "../../assets/img/perfil.png";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PhotoPerfilSmall from "../../icons/PhotoPerfilSmall";

function MenuNavBar() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Box display={"flex"}>
          <Image src={perfil} w="20px" marginRight={2} />
          <Text>JHOMAR</Text>
        </Box>
      </MenuButton>

      <MenuList zIndex={10}>
        <Link to={"profile"}>
          <MenuItem
            display={"flex"}
            justifyContent="space-between"
            fontWeight={"medium"}
          >
            Perfil <PhotoPerfilSmall />{" "}
          </MenuItem>
        </Link>

        <MenuItem fontWeight={"medium"}>Mis tours</MenuItem>
        
        <MenuItem fontWeight={"medium"}>Cerrar Sesión</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MenuNavBar;
