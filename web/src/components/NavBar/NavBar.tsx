import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import casaDesactivada from "../../assets/img/casa_desactivado.png";
import casaActivada from "../../assets/img/casa_activado.png";
import montanaActivada from "../../assets/img/montana_activado.png";
import montanaDesactivada from "../../assets/img/montana_desactivado.png";
import menu from "../../assets/img/menu.png";
import logoMain from "../../assets/img/Logo_Travis.svg";
import { Dispatch, useState } from "react";
import MenuNavBar from "../MenuNavBar/MenuNavBar";
import { Link } from "react-router-dom";
/* interface Props {
  setTogglePosts: Dispatch<boolean>;
} */
// function NavBar({ setTogglePosts }: Props) {
function NavBar() {
  const [casaIcon, setCasaIcon] = useState(false);
  const [tourIcon, setTourIcon] = useState(true);

  const burguer = useBreakpointValue({
    base: "block",
    md: "none",
  });

  return (
    <Box
      h="80px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid
      gray"
    >
      <Box
        display="flex"
        alignItems={"center"}
        h="40px"
        paddingLeft={[2, 3, 10]}
      >
        <Image src={logoMain}></Image>
      </Box>

      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={["center", "center", "center"]}
        flex={1}
      >
        <Link to={"/"}>
          <Box
            marginRight={[2, 5, 5]}
            onClick={() => {
              // setTogglePosts(false);
              if (casaIcon) {
                setCasaIcon(false);
                setTourIcon(true);
              }
            }}
          >
            {casaIcon ? (
              <Image src={casaDesactivada} w="40px" />
            ) : (
              <Image src={casaActivada} w="40px" />
            )}
          </Box>
        </Link>
        <Link to={"tours"}>
          <Box
            marginLeft={[2, 5, 5]}
            onClick={() => {
              // setTogglePosts(true);
              if (tourIcon) {
                setTourIcon(false);
                setCasaIcon(true);
              }
            }}
          >
            {tourIcon ? (
              <Image src={montanaDesactivada} w="50px" paddingTop={3} />
            ) : (
              <Image src={montanaActivada} w="50px" paddingTop={3} />
            )}
          </Box>
        </Link>
      </Box>

      <Box display="flex" alignItems={"center"} paddingRight={[2, 3, 10]}>
        <Box>
          <Image src={menu} display={burguer} w="40px" />
        </Box>
        <Box display={["none", "none", "block"]} maxW={"160px"} zIndex={10}>
          <MenuNavBar />
        </Box>
      </Box>
    </Box>
  );
}
export default NavBar;
