import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
  HStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Flex w="full" minH="100vh">
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        marginX="auto"
        alignItems="center"
        w="full"
      >
        <Box
          h="100vh"
          minH="100vh"
          position="relative"
          display={{ base: "none", md: "block" }}
          overflow="hidden"
          w="full"
        >
          <Image
            src="/bg_login.jpg"
            minH="100vh"
            h="full"
            w="full"
            objectFit="cover"
            align="center"
          />
          <Box position="absolute" bg="black" inset="0" opacity="0.35"></Box>
        </Box>
        <VStack minH="100vh" justifyContent="center" position="relative">
          <Box
            position="absolute"
            top={{ base: 6, md: 4 }}
            left={{ base: 3, md: 4 }}
          >
            <Button
              onClick={() => navigate(-1)}
              color="brand.500"
              colorScheme="green"
              leftIcon={<ChevronLeftIcon w={6} h={6} />}
              variant="ghost"
              size="sm"
              sx={{
                ".chakra-button__icon": {
                  marginRight: "0.25rem",
                },
              }}
            >
              Atrás
            </Button>
          </Box>
          <Flex
            paddingY={{ base: "4rem", md: "2rem" }}
            paddingX={{ base: "1.5rem" }}
            w="full"
            h="full"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack w="100%" marginBottom="2rem">
              <Box>
                <Image src="/logo.png" h="14" />
              </Box>
            </VStack>
            <VStack
              as="form"
              onSubmit={onSubmit}
              w="22rem"
              maxW="22rem"
              marginX="auto"
              spacing="3"
            >
              <Text fontSize="xl" fontWeight="600" mb={{ base: "1rem", md: 0 }}>
                Inicia sesión
              </Text>
              <FormControl isInvalid={Boolean(errors.email)}>
                <Input
                  placeholder="Correo electrónico"
                  rounded="4px"
                  paddingY="1.3rem"
                  type="email"
                  fontSize="sm"
                  _focus={{
                    boxShadow: "none",
                    borderColor: "#aaa",
                  }}
                  {...register("email", {
                    required: "El correo es obligatorio",
                  })}
                />
                <FormErrorMessage
                  fontSize="0.75rem"
                  fontWeight="500"
                  marginTop="0.25rem"
                >
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.password)}>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  rounded="4px"
                  paddingY="1.3rem"
                  fontSize="sm"
                  _focus={{
                    boxShadow: "none",
                    borderColor: "#aaa",
                  }}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener mínimo 6 caracteres",
                    },
                  })}
                />
                <FormErrorMessage
                  fontSize="0.75rem"
                  fontWeight="500"
                  marginTop="0.25rem"
                >
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                w="full"
                bg="brand.500"
                _hover={{ background: "brand.700" }}
                color="white"
                rounded="4px"
                paddingY="1.4rem"
              >
                Iniciar sesión
              </Button>
              <HStack fontSize="0.8rem" fontWeight="500">
                <Text>¿Todavía no tienes una cuenta? </Text>
                <Text
                  onClick={() => navigate("/auth/register/turista")}
                  cursor="pointer"
                  color="brand.500"
                  fontWeight="600"
                >
                  Regístrate
                </Text>
              </HStack>
            </VStack>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};
