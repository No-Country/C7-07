import {
  Box,
<<<<<<< HEAD
  Image,
  ImageProps,
  List,
  ListItem,
  Link as ChakraLink,
  Button,
  LinkProps,
} from "@chakra-ui/react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import noActiveHouse from "../../assets/img/casa_desactivado.png";
import activeHouse from "../../assets/img/casa_activado.png";
import activeMountain from "../../assets/img/montana_activado.png";
import noActiveMountain from "../../assets/img/montana_desactivado.png";
import menu from "../../assets/img/menu.png";
import logoTravis from "../../assets/img/Logo_Travis.svg";
import { MouseEvent } from "react";

const LIST_ITEMS = [
  {
    name: "home",
    props: {
      h: "100%",
      display: "flex",
      alignItems: "center",
      paddingInline: "5px",
    } as LinkProps,
    icon: {
      props: {
        w: "45px",
        h: "40px",
      } as ImageProps,
      default: (filter: () => boolean) =>
        filter() ? activeHouse : noActiveHouse,
    },
  },

  {
    name: "tours",
    props: {
      h: "100%",
      display: "flex",
      alignItems: "center",
      paddingInline: "5px",
    } as LinkProps,
    icon: {
      props: {
        w: "60px",
        h: "70px",
      } as ImageProps,
      default: (filter: () => boolean) =>
        filter() ? activeMountain : noActiveMountain,
    },
  },
];

function NavBar() {
  const m = useLocation();
  const handleChangeSection = (e: MouseEvent<HTMLAnchorElement>) => {
    console.log(m);
  };

  return (
    <Box h="80px" borderBottom="1px solid gray">
      <List
        as="nav"
        display="flex"
        h="inherit"
        justifyContent={"space-between"}
        marginInline={["2.0625rem", "3.125rem"]}
        alignItems="center"
        flexDir={"row"}
      >
        <ListItem>
          <ChakraLink as={RouterLink} to="/home">
            <Image src={logoTravis} w="20vmin" />
          </ChakraLink>
        </ListItem>
        <ListItem display="flex" gap="2rem" h="100%">
          {LIST_ITEMS.map((element) => (
            <ChakraLink
              as={RouterLink}
              to={`/${element.name}`}
              key={`${element.name}`}
              {...element.props}
              position="relative"
              _after={{
                content: "''",
                position: "absolute",
                width: "100%",
                height: "3px",
                left: 0,
                bottom: 0,
                backgroundColor:
                  m.pathname === `/${element.name}` ? "#4ED972" : "none",
              }}
            >
              <Image
                src={
                  typeof element.icon.default === "function"
                    ? element.icon.default(
                        () => m.pathname === `/${element.name}`
                      )
                    : element.icon.default
                }
                {...element.icon.props}
              />
            </ChakraLink>
          ))}
        </ListItem>
        <ListItem as={Button} bg="none" _hover={{ bg: "none" }} h="100%">
          <Image src={menu} w="40px" />
        </ListItem>
      </List>
      <Outlet />
=======
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
>>>>>>> 83ce6775aaea0fd929396a502909ba7c761d784f
    </Box>
  );
}

export default NavBar;
