import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
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
  Photo,
  TripListItem,
} from "../../App/Models/Trip";

interface Props {
  trip: TripListItem;
}

function handleImportClick(){
    
}

export default function TripPhotos({ trip }: Props) {
  return (
    <>
      <Button variant="contained" onClick={handleImportClick}>
        Import
      </Button>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {trip.photos.map((item: Photo) => (
          <ImageListItem key={item.url}>
            <img
              onClick={() => {
                window.open(item.url);
              }}
              src={item.url}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>{" "}
    </>
  );
}
