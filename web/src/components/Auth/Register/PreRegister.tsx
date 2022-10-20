import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export const PreRegister = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <Flex
      w="full"
      minH="100vh"
      paddingX={{ base: "2.5rem", md: "4rem" }}
      paddingY="2.5rem"
    >
      <Flex flexDirection="column" marginX="auto" alignItems="center" w="full">
        <VStack w="100%" alignItems="flex-start" marginBottom="2rem">
          <Box cursor="pointer" onClick={() => navigate("/")}>
            <Image src="/logo.png" h={{ base: "8", md: "10" }} />
          </Box>
        </VStack>
        <VStack
          maxW="md"
          w="full"
          spacing={10}
          marginTop={{ base: "12", sm: "16" }}
        >
          <Text fontSize="xl" fontWeight={500} textAlign="center">
            Elige cómo verte en Travis
          </Text>
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "space-between" }}
            alignItems="center"
            w="full"
          >
            <MotionBox
              whileHover={{ scale: 1.05, borderColor: "#4ED972" }}
              transition={{ duration: 0.3 }}
              cursor="pointer"
              border="2px solid #ddd"
              rounded="lg"
              onClick={() => navigate("/register/turista")}
              mb={{ base: 8, sm: 0 }}
            >
              <VStack
                h={{ base: "36", sm: "48" }}
                w={{ base: "36", sm: "48" }}
                spacing={0}
                justifyContent="center"
              >
                <Image
                  src="/tourist_preregister.png"
                  w={{ base: "24", sm: "36" }}
                />
                <Text textAlign="center" fontWeight={600}>
                  Turista
                </Text>
              </VStack>
            </MotionBox>
            <MotionBox
              whileHover={{ scale: 1.05, borderColor: "#4ED972" }}
              transition={{ duration: 0.3 }}
              cursor="pointer"
              border="2px solid #ddd"
              rounded="lg"
              onClick={() => navigate("/register/agencia")}
            >
              <VStack
                h={{ base: "36", sm: "48" }}
                w={{ base: "36", sm: "48" }}
                spacing={0}
                justifyContent="center"
              >
                <Image
                  src="/agency_preregister.png"
                  w={{ base: "24", sm: "36" }}
                />
                <Text textAlign="center" fontWeight={600}>
                  Agencia de viaje
                </Text>
              </VStack>
            </MotionBox>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};
