import { Box } from "@mui/material";
import { LoadScript, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { SetStateAction, useState } from "react";
import { googleMapsApiKey } from "../../App/Helpers/Credentials";
import { getTimeString, TripListItem } from "../../App/Models/Trip";

interface Props {
  trip: TripListItem;
}

const mapStyles = {
  height: "80vh",
  width: "100%",
};

export default function TripDetails({ trip }: Props) {
  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: googleMapsApiKey,
  });
  const [mapRef, setMapRef] = useState(null);


  const loadHandler = () => {
    // Store a reference to the google map instance in state
    //setMapRef(map);
    // Fit map bounds to contain all markers
  };

  const [defaultCenter, setDefaultCenter] = useState<google.maps.LatLngLiteral>(
    {
      lat: 41.264665920371726,
      lng: -84.38764950957754,
    }
  );

  return (
    <>

      {isLoaded && (
          <Box>
          <GoogleMap zoom={5} mapContainerStyle={mapStyles}             center={defaultCenter}
        onLoad={loadHandler}
          ></GoogleMap>
          </Box>
        )}
    </>
  );
}
