import { Box } from '@chakra-ui/react';
import { Map, Marker } from 'mapbox-gl';
import { useState, useRef, useEffect, useContext } from 'react';

function MapTour(){
    const mapDiv = useRef(null);
	// const { setMap } = useMap();

    useEffect(() => {
		const map = new Map({
			container: mapDiv.current, // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			// center: [-70.652817, -33.50118], // starting position [lng, lat]
			center: [23.23471227826963, 51.39569747015432],
			zoom: 5, // starting zoom
		});

	}, []);

    return(
        <Box ref={mapDiv}></Box>
    );
}

export default MapTour()