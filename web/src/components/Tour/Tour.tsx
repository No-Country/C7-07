import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import ArrowLeft from "../../icons/ArrowLeft";
import { Link as RouterLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadTourById, selectTour } from "../../features/tours/toursSlice";


// Revisar primer param de getTourbyId
// Correr url de Postman con agencia/tour

// Crear un UseNavigate
// Login
// const navigate = useNavigate();
// <Button
// onClick={() => navigate(`/registrar/${}`)}
// Una agencia o más***
// Consultar por la relacion Tours Agencias***


function Tour() {

    let {agencyId,tourId} = useParams();

    const dispatch = useDispatch();
    const tourData = useSelector<[], []>(selectTour);

    useEffect(() => {
        dispatch(loadTourById(agencyId,tourId));
    }, []);

    return (
        <Box  marginX={"40px"}>
            {tourData && "Sí"}
        <Box flex={1}>
            <ChakraLink
            as={RouterLink}
            to="/tours"
            w={["full", "full", "full"]}
            flex={1}
            h={["50px", "50px", "50px"]}
            display={"flex"}
            alignItems={"center"}
            >
            <Box marginX={"10px"}>
                <ArrowLeft />
            </Box>
            <Text
                display={"flex"}
                fontWeight="bold"
                fontSize="medium"
                color="#4DDA73"
            >
                Ver todos los Tours
            </Text>
            </ChakraLink>
            <Box>
                <Box>
                Senderismo por la montaña Arcoíris y el valle Rojo
                </Box>
                <Box>
                    Puno, Perú - 1 día
                </Box>
            </Box>
        </Box>
        <Box>Mapa</Box>
        </Box>
    );
}

export default Tour;
