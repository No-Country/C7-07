import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Flex w="full" minH="100vh">
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        marginX="auto"
        alignItems="center"
        w="full"
        maxW="4xl"
        paddingX={{ base: "1.5rem" }}
        paddingY={{ base: "2rem" }}
      >
        <VStack
          w={{ base: "100%", md: "40%" }}
          marginBottom={{ base: "2rem", md: "0" }}
        >
          <VStack
            spacing={{ base: "1.5rem" }}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Box>
              <Image src="/logo.png" h="10" />
            </Box>
            <VStack
              spacing={{ base: "0.5rem", md: "1rem" }}
              alignItems={{ base: "center", md: "flex-start" }}
            >
              <Box textAlign={{ base: "center", md: "left" }}>
                <Text fontSize={{ base: "md" }}>
                  Inicio de sesión recientes
                </Text>
                <Text fontSize={{ base: "sm" }}>Haz clic en tu foto</Text>
              </Box>
              <Box>
                <Image
                  src="/avatar.png"
                  roundedTop="lg"
                  h={{ base: "150", sm: "170", md: "200" }}
                  w={{ base: "150", sm: "170", md: "200" }}
                />
                <Box
                  border="1px solid #aaa"
                  roundedBottom="lg"
                  paddingY={{ base: "0.3rem" }}
                >
                  <Text textAlign="center" fontWeight={600}>
                    Verónica
                  </Text>
                </Box>
              </Box>
            </VStack>
          </VStack>
        </VStack>
        <Flex w={{ base: "100%", md: "60%" }}>
          <VStack
            w="sm"
            maxW="sm"
            border="1px solid #ddd"
            padding="5"
            rounded="2xl"
            marginX="auto"
          >
            <Button
              type="button"
              // onClick={() => signIn("google")}
              leftIcon={<FaGoogle size={14} />}
              variant="solid"
              // borderColor="#ddd"
              fontWeight={400}
              colorScheme="red"
              paddingY="1.1rem"
              w="full"
            >
              Ingresa con Google
            </Button>
            <HStack w="full" alignItems="center" justifyContent="center">
              <Divider bg="gray.700" opacity={1} />
              <Text color="gray.400" fontWeight={300} fontSize="sm">
                o
              </Text>
              <Divider bg="gray.700" opacity={1} />
            </HStack>
            <Input
              placeholder="Correo electrónico o número de teléfono"
              fontSize={{ base: "xs", sm: "sm" }}
              _focus={{
                boxShadow: "none",
                borderColor: "#aaa",
              }}
            />
            <Input
              placeholder="Contraseña"
              fontSize={{ base: "xs", sm: "sm" }}
              _focus={{
                boxShadow: "none",
                borderColor: "#aaa",
              }}
            />
            <Button
              w="full"
              bg="brand.500"
              _hover={{ background: "brand.700" }}
              color="white"
            >
              Iniciar sesión
            </Button>
            <Text fontSize={{ base: "sm" }} fontWeight={500}>
              ¿Olvidaste tu contraseña?
            </Text>
            <Button
              onClick={() => navigate("/registrar")}
              bg="#222C37"
              color="white"
              _hover={{
                background: "#243241",
              }}
              size={{ base: "sm", sm: "md" }}
              fontSize="0.95rem"
            >
              Crear cuenta
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
