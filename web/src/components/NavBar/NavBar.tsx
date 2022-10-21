import {
  Box,
  Image,
  ImageProps,
  List,
  ListItem,
  Link as ChakraLink,
  LinkProps,
  HStack,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import noActiveHouse from "../../assets/img/casa_desactivado.png";
import activeHouse from "../../assets/img/casa_activado.png";
import activeMountain from "../../assets/img/montana_activado.png";
import noActiveMountain from "../../assets/img/montana_desactivado.png";
import logoTravis from "../../assets/img/Logo_Travis.svg";
import MenuNavBar from "../MenuNavBar/MenuNavBar";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import logo from "../../assets/img/logoTravis.svg";
import { useEffect, useState } from "react";

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
        w: "35px",
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
        w: "50px",
      } as ImageProps,
      default: (filter: () => boolean) =>
        filter() ? activeMountain : noActiveMountain,
    },
  },
];

function NavBar() {
  const m = useLocation();

  const [name, setName] = useState<string>("Cargando");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URI}/users/me`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setName(data.data.name);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {m.pathname === "/" && <Navigate to="/home" replace={true} />}
      <HStack
        as="nav"
        position="sticky"
        top={0}
        h="80px"
        borderBottom="1px solid gray"
        zIndex={50}
        background="white"
      >
        <List
          display="flex"
          justifyContent={"space-between"}
          marginInline={["2.0625rem", "3.125rem"]}
          alignItems="center"
          flexDir={"row"}
          w="full"
          h="full"
        >
          <ListItem>
            <ChakraLink as={RouterLink} to="/home">
              <Image
                src={logoTravis}
                h="2.4rem"
                display={{
                  base: "none",
                  md: "block",
                }}
              />
              <Image
                src={logo}
                h="2.8rem"
                display={{
                  base: "block",
                  md: "none",
                }}
              />
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
          <ListItem
            bg="none"
            display={{
              base: "none",
              md: "flex",
            }}
            alignItems="center"
            _hover={{ bg: "none" }}
            h="100%"
          >
            <MenuNavBar name={name} />
          </ListItem>
          <ListItem
            bg="none"
            display={{
              base: "flex",
              md: "none",
            }}
            alignItems="center"
            _hover={{ bg: "none" }}
            h="100%"
          >
            <MenuDrawer />
          </ListItem>
        </List>
      </HStack>
      <Outlet />
    </Box>
  );
}

export default NavBar;
