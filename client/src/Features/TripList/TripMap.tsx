import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { getLatitude, getLongitude, getTimeString, TripListItem } from "./Trip";

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

  const [yearSelected, setYearSelected] = useState<string>("All");

  // https://codesandbox.io/s/react-google-maps-api-ir5ks?from-embed=&file=/src/index.js:333-379

  const [filteredList, setFilteredList] = useState<TripListItem[]>([
    ...tripList,
  ]);

  // filters
  const [yearOptions, setYearOptions] = useState<number[]>([]);

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

    const allYears = tripList.map((item) => item.year);
    let yearSet = new Set<number>();
    allYears.forEach((y) => {
      yearSet.add(y);
    });
    setYearOptions(Array.from(yearSet.values()).sort());
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

  const yearChangeHandler = (event: SelectChangeEvent) => {
    const year = event.target.value;
    setYearSelected(year);

    if (year !== "All") {
      let list = [...tripList.filter((t) => t.year === +year)];
      setFilteredList([...list]);
    } else {
      setFilteredList([...tripList]);
    }
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            value={yearSelected}
            label="Year"
            onChange={yearChangeHandler}
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            {yearOptions.map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <h3>
          Trips: {filteredList.length}{"\t\t"}Total Miles:{" "}
          {Math.round(
            filteredList
              .map((a) => a.distanceMiles)
              .reduce(function (a, b) {
                return a + b;
              })
          )}
        </h3>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyAsds9xmjZs7Esa8LLAv2KT851d9RSDdLo">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={5}
          center={defaultCenter}
        >
          {filteredList.map((trip) => (
            <Marker
              onLoad={(marker) => markerLoadHandler(marker, trip)}
              onClick={(event) => markerClickHandler(event, trip)}
              key={trip.id}
              position={{
                lat: getLatitude(trip.startCoordinates),
                lng: getLongitude(trip.startCoordinates),
              }}
              icon={{
                path: "M21,23c-1.03,0-2.06-0.25-3-0.75h0c-1.89,1-4.11,1-6,0c-1.89,1-4.11,1-6,0C5.05,22.75,4.03,23,3,23H2l0-2h1 c1.04,0,2.08-0.35,3-1c1.83,1.3,4.17,1.3,6,0c1.83,1.3,4.17,1.3,6,0c0.91,0.65,1.96,1,3,1h1v2H21z M12,5.5c-1.1,0-2,0.9-2,2 s0.9,2,2,2s2-0.9,2-2S13.1,5.5,12,5.5z M24,17.5c0,0-1.52,0.71-3.93,1.37c-0.82-0.23-1.53-0.75-2.07-1.37c-0.73,0.84-1.8,1.5-3,1.5 s-2.27-0.66-3-1.5c-0.73,0.84-1.8,1.5-3,1.5s-2.27-0.66-3-1.5c-0.54,0.61-1.25,1.13-2.07,1.37C1.52,18.21,0,17.5,0,17.5 s2.93-1.36,7.13-2.08l1.35-4.17c0.31-0.95,1.32-1.47,2.27-1.16c0.09,0.03,0.19,0.07,0.27,0.11l0,0l2.47,1.3l2.84-1.5l1.65-3.71 l-0.51-1.32L18.8,2L22,3.43L20.67,6.4l-1.31,0.5l-3.72,8.34C20.49,15.87,24,17.5,24,17.5z M15.02,12.96l-1.52,0.8l-1.75-0.92 l-0.71,2.17C11.36,15.01,11.68,15,12,15c0.71,0,1.4,0.03,2.07,0.08L15.02,12.96z",
                fillColor: "blue",
                fillOpacity: 1,
                scale: 2,
                strokeColor: "white",
                strokeWeight: 2,
              }}
              title={`${trip.year} - ${trip.river}`}
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
                  {selectedTrip.year} - {selectedTrip.state}
                </b>
                <div>{getTimeString(selectedTrip.timeMinutes)}</div>
                <a href= {`/tripDetails/${selectedTrip.id}`} >details</a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
}
