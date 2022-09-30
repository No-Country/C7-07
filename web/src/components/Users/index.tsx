//rafc
import { Box, Text } from "@chakra-ui/react";

export const Users = () => {
  return (
    <Box bg="brand1.600" w={["100px", "500px"]}>
      <Text>Prueba</Text>
      <Box
        as="a"
        href="/asdasd"
        borderRadius="md"
        bg="tomato"
        color="white"
        px={4}
        h={8}
      >
        Button
      </Box>
    </Box>
  );
};
