import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TripListItem } from "../Models/Trip";

// interface Props {
//   existingTrip: TripListItem | null;
// }

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    //const url = 'https://localhost:7281';
    const url = "https://travistriptracker.azurewebsites.net";

    axios.get<TripListItem[]>(url + `/api/trips/${id}`).then((resp) => {
      // set trip state
    });
  }, []);

  return (
    <>
      <div>
        Trip: {id}
        <h1>Details</h1>
        coming soon!!!
        <h1>Map</h1>
        coming soon!!!
        <h1>Photos</h1>
        coming soon!
      </div>
    </>
  );
}
