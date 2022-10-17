import React from "react";
import {
  Input,
  InputLeftElement,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ITour } from "../../interfaces/ITour";

function SearchTours( props: ITour) {
  return (
    <>
      <InputGroup mx={["10px", '20px', '50px']} w={["full","full", "400px"]}>
        <InputLeftElement
          mx="4px"
          pointerEvents="none"
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
        />
        <InputRightElement
        w={"65px"}
        
            mr="7px"
          children={
            <Button bg="#4ED972" h='29px' color="white" fontWeight={600}  borderRadius="15px" fontSize={'sm'}>
              Buscar
            </Button>
          }
        />
      </InputGroup>
    </>
  );
}

export default SearchTours;
