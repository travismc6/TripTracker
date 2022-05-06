import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  LoadScript,
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { SetStateAction, useState } from "react";
import { googleMapsApiKey } from "../../App/Helpers/Credentials";
import { FlagEnd, FlagStart } from "../../App/Helpers/SvgIcons";
import {
  getDateString,
  getLatitude,
  getLongitude,
  getTimeString,
  TripListItem,
} from "../../App/Models/Trip";

interface Props {
  trip: TripListItem;
}

const mapStyles = {
  height: "50vh",
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
      lat: getLatitude(trip.startCoordinates),
      lng: getLongitude(trip.startCoordinates),
    }
  );

  return (
    <>
      <Typography variant="h4" color="darkblue">
        {trip.river}
      </Typography>
      <Typography variant="h5" color="darkblue">
        {getDateString(trip.date, trip.year)}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* <Typography variant="h5">{getDateString(trip.date, trip.year)}</Typography> */}

      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Distance</b>
              </TableCell>
              <TableCell>{trip.distanceMiles} miles</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Time</b>
              </TableCell>
              <TableCell>{getTimeString(trip.timeMinutes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Stage</b>
              </TableCell>
              <TableCell>{trip.stage}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Flow</b>
              </TableCell>
              <TableCell>{trip.flow}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Start</b>
              </TableCell>
              <TableCell>{trip.startName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>End</b>
              </TableCell>
              <TableCell>{trip.endName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {trip.notes !== "" && (
        <>
          <Typography sx={{ marginTop: 5 }} variant="h5">
            Notes
          </Typography>
          <Paper sx={{ padding: 5, marginTop: 2 }} variant="outlined">
            {trip.notes}
          </Paper>
        </>
      )}

      {isLoaded && trip.startCoordinates && (
        <Box sx={{ marginTop: 5 }}>
          <GoogleMap
            zoom={10}
            mapContainerStyle={mapStyles}
            center={defaultCenter}
            onLoad={loadHandler}
          >
            <Marker
              key={trip.startCoordinates}
              position={{
                lat: getLatitude(trip.startCoordinates),
                lng: getLongitude(trip.startCoordinates),
              }}
              icon={{
                path: FlagStart,
                fillColor: "green",
                fillOpacity: 1,
              }}
              title={`Start: ${trip.startName}`}
            />
            <Marker
              key={trip.endCoordinates}
              position={{
                lat: getLatitude(trip.endCoordinates),
                lng: getLongitude(trip.endCoordinates),
              }}
              icon={{
                path: FlagEnd,
                fillColor: "black",
                fillOpacity: 1,
              }}
              title={`End: ${trip.endCoordinates}`}
            />
          </GoogleMap>
        </Box>
      )}
    </>
  );
}
