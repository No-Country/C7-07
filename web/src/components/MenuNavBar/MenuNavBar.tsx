import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import perfil from "../../assets/img/perfil.png";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PhotoPerfilSmall from "../../icons/PhotoPerfilSmall";

interface Props {
  name: string;
}

function MenuNavBar({ name }: Props) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Box display={"flex"} maxW="10rem" minW={0}>
          <Image src={perfil} w="20px" marginRight={2} />
          <Text w="full" noOfLines={1}>
            {name}
          </Text>
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
