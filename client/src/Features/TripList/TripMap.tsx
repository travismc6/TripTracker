import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { googleMapsApiKey } from "../../App/Helpers/Credentials";
import { KayakIcon } from "../../App/Helpers/SvgIcons";
import {
  getDateString,
  getLatitude,
  getLongitude,
  getTimeString,
  TripListItem,
} from "../../App/Models/Trip";

interface Props {
  tripList: readonly TripListItem[];
}

export default function TripMap({ tripList }: Props) {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripListItem | null>(null);
  const [markerMap, setMarkerMap] = useState<google.maps.Marker[]>([]);

  // https://codesandbox.io/s/react-google-maps-api-ir5ks?from-embed=&file=/src/index.js:333-379

  const [defaultCenter, setDefaultCenter] = useState<google.maps.LatLngLiteral>(
    {
      lat: 41.264665920371726,
      lng: -84.38764950957754,
    }
  );

  useEffect(() => {
    if (tripList.length > 0) {
      setDefaultCenter({
        lat: getLatitude(tripList[0].startCoordinates),
        lng: getLongitude(tripList[0].startCoordinates),
      });
    }
  }, []);

  const markerLoadHandler = (
    marker: google.maps.Marker,
    trip: TripListItem
  ) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [trip.id]: marker };
    });
  };

  const markerClickHandler = (
    event: google.maps.MapMouseEvent,
    trip: TripListItem
  ) => {
    if (infoOpen) {
      setInfoOpen(false);
    }

    setSelectedTrip(trip);
    setInfoOpen(true);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={5}
          center={defaultCenter}
        >
          {tripList.map((trip) => (
            <Marker
              onLoad={(marker) => markerLoadHandler(marker, trip)}
              onClick={(event) => markerClickHandler(event, trip)}
              key={trip.id}
              position={{
                lat: getLatitude(trip.startCoordinates),
                lng: getLongitude(trip.startCoordinates),
              }}
              icon={{
                path: KayakIcon,
                fillColor: "blue",
                fillOpacity: 1,
                scale: 1,
                strokeColor: "white",
                strokeWeight: 0,
              }}
              title={`${getDateString(trip.date)} - ${trip.river}`}
            />
          ))}
          {infoOpen && selectedTrip && (
            <InfoWindow
              position={{
                lat: getLatitude(selectedTrip.startCoordinates),
                lng: getLongitude(selectedTrip.startCoordinates),
              }}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h3>{selectedTrip.river}</h3>
                <b>
                  {getDateString(selectedTrip.date)} - {selectedTrip.state}
                </b>
                <div>{getTimeString(selectedTrip.timeMinutes)}</div>
                <a href={`/tripDetails/${selectedTrip.id}`}>details</a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}
