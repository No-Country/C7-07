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
import { useEffect, useState } from "react";

interface IFormData {
  email: string;
  password: string;
}

interface IError {
  status: boolean;
  message: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<IError>({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/login/auth?email=${
          data.email
        }&password=${data.password}`,
        {}
      );
      const dataResponse = await response.json();
      if (dataResponse.code == 200) {
        setIsLoading(false);
        localStorage.setItem("token", dataResponse.data.token);
        localStorage.setItem("user", dataResponse.data.user);
        navigate("/home", { replace: true });
      } else if (dataResponse.code == 404) {
        setIsLoading(false);
        setError({ status: true, message: "Credenciales incorrectas" });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <FormControl isInvalid={error.status}>
                <Button
                  type="submit"
                  w="full"
                  bg="brand.500"
                  _hover={{ background: "brand.700" }}
                  color="white"
                  rounded="4px"
                  paddingY="1.4rem"
                  isLoading={isLoading}
                >
                  Iniciar sesión
                </Button>
                <FormErrorMessage
                  fontSize="0.8rem"
                  fontWeight="500"
                  marginTop="0.25rem"
                >
                  <Text textAlign="center" w="full">
                    {error.status && error.message}
                  </Text>
                </FormErrorMessage>
              </FormControl>
              <HStack fontSize="0.8rem" fontWeight="500">
                <Text>¿Todavía no tienes una cuenta? </Text>
                <Text
                  onClick={() => navigate("/register")}
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
