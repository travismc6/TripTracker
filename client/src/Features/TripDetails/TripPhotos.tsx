import { ImageList, ImageListItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import AppDropzone from "../../App/Components/AppDropzone";
import { apiRoot } from "../../App/Helpers/Helpers";
import { Photo, TripListItem } from "../../App/Models/Trip";

interface Props {
  trip: TripListItem;
}

export default function TripPhotos({ trip }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([...trip.photos]);

  function handleImport(file: File) {
    var formData = new FormData();
    formData.append("uploadFile", file);

    // TODO: figure out why axios isn't working
    fetch(apiRoot + `/api/trips/image/${trip.id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const photo = data as Photo;
        let tripPhotos = [...photos];
        tripPhotos.push(photo);
        setPhotos([...tripPhotos]);
      });

  }
  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {photos.map((item: Photo) => (
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
      </ImageList>
      <AppDropzone onImport={handleImport} />
    </>
  );
}
