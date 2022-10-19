import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  AsyncSelect,
  chakraComponents,
  OptionBase,
  OptionProps,
  GroupBase,
  LoadingIndicatorProps,
  SingleValueProps,
} from "chakra-react-select";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface Props {
  userType: string;
}

interface ICountryResponse {
  translations: {
    spa: {
      common: string;
    };
  };
  cca3: string;
  flags: {
    svg: string;
  };
}

interface ISelectCountries extends OptionBase {
  label: string;
  value: string;
  icon: string;
}

interface IFormData {
  name: string;
  description?: string;
  contact?: number;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
}

export const Register = ({ userType }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<IFormData>();

  const [countries, setCountries] = useState<ISelectCountries[]>([]);

  const onSubmit = handleSubmit((data) => console.log(data));

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((country: ICountryResponse) => {
          setCountries((c) => [
            ...c,
            {
              label: country.translations.spa.common,
              value: country.cca3,
              icon: country.flags.svg,
            },
          ]);
        });
      });
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
            src="/bg_register_tourist.jpg"
            minH="100vh"
            h="full"
            w="full"
            objectFit="cover"
            align="center"
          />
          <Box position="absolute" bg="black" inset="0" opacity="0.35"></Box>
        </Box>
        <VStack
          minH="100vh"
          justifyContent="center"
          position="relative"
          w="45rem"
          maxW="45rem"
        >
          <Box
            position="absolute"
            top={{ base: 6, md: 4 }}
            left={{ base: 3, md: 4 }}
          >
            <Button
              onClick={() => navigate("/auth/register")}
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
            paddingX={{ base: "2rem" }}
            w="full"
            h="full"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack w="100%" marginBottom="2rem">
              <Box position="relative">
                <Image src="/logo.png" h="14" />
                <Box position="absolute" right={0} bottom={-5}>
                  <Text
                    color="brand.500"
                    fontSize="xl"
                    fontWeight="700"
                    cursor="default"
                  >
                    {userType}
                  </Text>
                </Box>
              </Box>
            </VStack>
            <VStack
              as="form"
              onSubmit={onSubmit}
              w="23rem"
              maxW="23rem"
              marginX="auto"
              spacing="3"
            >
              <Text fontSize="xl" fontWeight="600" mb={{ base: "1rem", md: 0 }}>
                Crear una cuenta
              </Text>
              <FormControl isInvalid={Boolean(errors.name)}>
                <Input
                  placeholder={
                    userType == "turista"
                      ? "Nombres y Apellidos"
                      : "Nombre de la agencia"
                  }
                  rounded="4px"
                  fontSize="sm"
                  paddingY={{ base: "1.3rem", md: "1rem" }}
                  _focus={{
                    boxShadow: "none",
                    borderColor: "#aaa",
                  }}
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                />
                <FormErrorMessage
                  fontSize="0.75rem"
                  fontWeight="500"
                  marginTop="0.25rem"
                >
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              {userType == "agencia" && (
                <FormControl isInvalid={Boolean(errors.description)}>
                  <Input
                    placeholder="Descripción breve"
                    rounded="4px"
                    fontSize="sm"
                    paddingY={{ base: "1.3rem", md: "1rem" }}
                    _focus={{
                      boxShadow: "none",
                      borderColor: "#aaa",
                    }}
                    {...register("description", {
                      required: "La descripción es obligatoria",
                    })}
                  />
                  <FormErrorMessage
                    fontSize="0.75rem"
                    fontWeight="500"
                    marginTop="0.25rem"
                  >
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              <FormControl isInvalid={Boolean(errors.email)}>
                <Input
                  placeholder="Correo electrónico"
                  rounded="4px"
                  type="email"
                  fontSize="sm"
                  paddingY={{ base: "1.3rem", md: "1rem" }}
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
              {userType == "agencia" && (
                <FormControl isInvalid={Boolean(errors.contact)}>
                  <Input
                    placeholder="Contacto"
                    rounded="4px"
                    type="text"
                    fontSize="sm"
                    _focus={{
                      boxShadow: "none",
                      borderColor: "#aaa",
                    }}
                    {...register("contact", {
                      required: "El contacto es obligatorio",
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage
                    fontSize="0.75rem"
                    fontWeight="500"
                    marginTop="0.25rem"
                  >
                    {errors.contact && errors.contact.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              <Box width="full">
                <Controller<IFormData>
                  control={control}
                  name="country"
                  render={({ field: { onChange, value, name, ref } }) => (
                    <AsyncSelect<
                      ISelectCountries,
                      false,
                      GroupBase<ISelectCountries>
                    >
                      name="countries"
                      ref={ref}
                      value={countries.find((c) => c.value == value)}
                      onChange={(val, actionMeta) => onChange(val?.value)}
                      placeholder="País"
                      chakraStyles={{
                        menuList: (provided, state) => ({
                          ...provided,
                          maxH: "8rem",
                        }),
                        placeholder: (provided, state) => ({
                          ...provided,
                          fontSize: "sm",
                          color: "gray.500",
                        }),
                        singleValue: (provided, state) => ({
                          ...provided,
                          fontSize: "sm",
                          color: "gray.700",
                        }),
                      }}
                      components={{
                        SingleValue: (
                          props: SingleValueProps<
                            ISelectCountries,
                            false,
                            GroupBase<ISelectCountries>
                          >
                        ) => {
                          return (
                            <chakraComponents.SingleValue {...props}>
                              <HStack spacing="0.5rem" ml="0.2rem">
                                <Box w="1.2rem" h="0.8rem" overflow="hidden">
                                  <Image
                                    src={`${props.getValue()[0].icon}`}
                                    alt={`${props.children}`}
                                    objectFit="cover"
                                  />
                                </Box>
                                <Text>{props.children}</Text>
                              </HStack>
                            </chakraComponents.SingleValue>
                          );
                        },
                        LoadingIndicator: (
                          props: LoadingIndicatorProps<
                            ISelectCountries,
                            false,
                            GroupBase<ISelectCountries>
                          >
                        ) => {
                          const { color, emptyColor } = useColorModeValue(
                            {
                              color: "brand.700",
                              emptyColor: "blue.100",
                            },
                            {
                              color: "brand.500",
                              emptyColor: "blue.900",
                            }
                          );
                          return (
                            <chakraComponents.LoadingIndicator
                              color={color}
                              emptyColor={emptyColor}
                              speed="750ms"
                              spinnerSize="md"
                              thickness="3px"
                              {...props}
                            />
                          );
                        },
                        Option: ({
                          children,
                          ...props
                        }: OptionProps<
                          ISelectCountries,
                          false,
                          GroupBase<ISelectCountries>
                        >) => (
                          <chakraComponents.Option {...props}>
                            <HStack spacing="0.5rem">
                              <Box w="1.2rem" h="0.8rem" overflow="hidden">
                                <Image
                                  src={props.data.icon}
                                  alt={`${children}`}
                                  objectFit="cover"
                                />
                              </Box>
                              <Text>{children}</Text>
                            </HStack>
                          </chakraComponents.Option>
                        ),
                      }}
                      loadOptions={(inputValue, callback) => {
                        setTimeout(() => {
                          const values = countries.filter((option) =>
                            option.label
                              .toLowerCase()
                              .startsWith(inputValue.toLowerCase())
                          );
                          callback(values);
                        }, 500);
                      }}
                    />
                  )}
                />
              </Box>
              <FormControl isInvalid={Boolean(errors.password)}>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  rounded="4px"
                  fontSize="sm"
                  paddingY={{ base: "1.3rem", md: "1rem" }}
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
              <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                <Input
                  type="password"
                  placeholder="Confirmar contraseña"
                  rounded="4px"
                  fontSize="sm"
                  paddingY={{ base: "1.3rem", md: "1rem" }}
                  _focus={{
                    boxShadow: "none",
                    borderColor: "#aaa",
                  }}
                  {...register("confirmPassword", {
                    required: "La confirmación es obligatoria",
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "Las contraseñas no coinciden";
                      }
                    },
                  })}
                />
                <FormErrorMessage
                  fontSize="0.75rem"
                  fontWeight="500"
                  marginTop="0.25rem"
                >
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                w="full"
                bg="brand.500"
                _hover={{ background: "brand.700" }}
                color="white"
                rounded="4px"
                paddingY={{ base: "1.5rem", md: "1.2rem" }}
              >
                Registrarse
              </Button>
              <HStack fontSize="0.8rem" fontWeight="500">
                <Text>¿Ya tienes una cuenta? </Text>
                <Text
                  onClick={() => navigate("/auth/login")}
                  cursor="pointer"
                  color="brand.500"
                  fontWeight="600"
                >
                  Iniciar sesión
                </Text>
              </HStack>
            </VStack>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};