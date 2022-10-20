
import { 
    Box, 
    Image, 
    Text,
    Link as ChakraLink} from "@chakra-ui/react";
import NotFoundImage from "../../assets/img/NotFoundImage.png";
import logoTravis from "../../assets/img/Logo_Travis.svg";
import {
    Link as RouterLink,
} from "react-router-dom";

function NotFound() {
    return(
        <Box display={"flex"} minH="90vh" w="full"justifyContent={"center"} alignItems="center">
            <Box w={["full", "full", "400px"]}
                display={"flex"}
                flexDirection={"column"}
            >   
                <ChakraLink as={RouterLink} to="/home" >
                    <Image src={logoTravis} w="30vmin" marginBottom={"30px"}/>
                </ChakraLink>

                <Box>
                    <Text
                        fontWeight={300} fontSize="3xl"
                    >
                        ¡Oooops! No hemos podido encontrar la página que buscas.
                    </Text>
                    <Text
                        color="gray.500"
                        as={"i"}
                        marginTop={"20px"}
                        display={"flex"}
                        justifyContent={"flex-end"}
                        marginRight={"35px"}
                    >
                        - Equipo Travel Space
                    </Text>
                </Box>
            </Box>
            <Image src={NotFoundImage}/>
        </Box>
    )
}

export default NotFound;
