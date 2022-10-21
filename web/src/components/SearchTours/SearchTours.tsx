import React, { useEffect, useState } from "react";
import {
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  InputRightElement,
  Text,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ITour } from "../../interfaces/ITour";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SearchTours() {
  const [search, setSearch] = useState("");

  const [tours, setTours] = useState<ITour[]>([]);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (search) {
      fetch(`http://localhost:3001/tours/search/?value=${search}`, {
        headers: {
          Authorization: "bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTours(json.data);
        });
    }
  }, [search]);

  return (
    <>
      <InputGroup
        mx={["10px", "20px", "50px"]}
        w={["full", "full", "400px"]}
        marginBottom="2px"
      >
        <InputLeftElement
          mx="4px"
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon color="gray.700" />}
        />

        <Input
          variant="filled"
          placeholder="¿A dónde viajas?"
          _placeholder={{
            opacity: 1,
            color: "#5C5454",
            fontWeight: "600",
            paddingLeft: "7px",
          }}
          rounded="full"
          focusBorderColor="#4ED972"
          colorScheme={"#D9D9D9"}
          bg="#D9D9D9"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setSearch("");
            }
          }}
        />
        <InputRightElement
          w={"65px"}
          mr="7px"
          // eslint-disable-next-line react/no-children-prop
          children={
            <Button
              bg="#4ED972"
              h="29px"
              color="white"
              fontWeight={600}
              borderRadius="15px"
              fontSize={"sm"}
              onClick={(e) => {
                e.preventDefault();
                setSearch("");
              }}
            >
              Buscar
            </Button>
          }
        />
        {search && tours && tours.length > 0 ? (
          <Box
            backgroundColor={"white"}
            maxH="400px"
            sx={{
              "::-webkit-scrollbar": {
                // display: "none",
                width: "7px",
              },
              "::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                marginY: "4px",
              },

              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#5C5454",
                borderRadius: "10px",
              },
            }}
            overflowY={"auto"}
            borderRadius="10px"
            marginTop="1px"
            top="40px"
            zIndex={10}
            w={["full", "full", "500px"]}
            border={"1px solid gray"}
            position="absolute"
            boxShadow={"2xl"}
            paddingY="10px"
          >
            {tours.map((tour, i) => (
              <Link to={tour._id} key={i}>
                <Box
                  _hover={{
                    background: "#4ED972",
                    color: "white",
                  }}
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={tour.mainImages[0]}
                    alt={tour.title}
                    maxWidth={"100px"}
                    objectFit="cover"
                    margin={"7px"}
                    borderRadius="5px"
                    marginBottom={"10px"}
                    display="inline-block"
                  />

                  <Box flex={1} display="flex" flexDirection="column">
                    <Text
                      fontSize="md"

                      // isTruncated
                    >
                      {tour.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="gray.700"
                      paddingBottom={"15px"}
                    >
                      Desde ${tour.personPriceUsd}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        ) : null}
      </InputGroup>
    </>
  );
}

export default SearchTours;
