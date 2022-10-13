import {
  Box,
  Image,
  ImageProps,
  List,
  ListItem,
  Link as ChakraLink,
  LinkProps,
} from "@chakra-ui/react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import noActiveHouse from "../../assets/img/casa_desactivado.png";
import activeHouse from "../../assets/img/casa_activado.png";
import activeMountain from "../../assets/img/montana_activado.png";
import noActiveMountain from "../../assets/img/montana_desactivado.png";
import logoTravis from "../../assets/img/Logo_Travis.svg";
import MenuNavBar from "../MenuNavBar/MenuNavBar";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

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
          <MenuNavBar />
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
      <Outlet />
    </Box>
  );
}

export default NavBar;
