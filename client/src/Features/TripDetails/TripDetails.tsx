import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRoot } from "../../App/Helpers/Helpers";
import { getTimeString, TripListItem } from "../../App/Models/Trip";

// interface Props {
//   existingTrip: TripListItem | null;
// }

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<TripListItem>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get<TripListItem>(apiRoot + `/api/trips/${id}`)
      .then((resp) => {
        // set trip state
        setTrip(resp.data);
        setIsLoading(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else if (!trip) {
    return <h3>Trip not found!</h3>;
  } else {
    return (
      <>
        <div>
          <h1>
            {trip?.year} - {trip?.river}
          </h1>
          <h2>State: {trip?.state}</h2>
          <h2>Distance: {trip?.distanceMiles} miles</h2>
          <h2>Time: {getTimeString(trip.timeMinutes)}</h2>
          <h2>Stage: {trip?.stage}</h2>
          <h2>Flow: {trip?.flow}</h2>
          <h2>Notes: {trip.notes}</h2>
          <br />
          <br />
          <br />
          <br />
          <h2>Map</h2>
          coming soon!!!
          <h2>Photos</h2>
          coming soon!
          <h2>Highlights</h2>
          coming soon!
          <h2>Attendees</h2>
          coming soon!
        </div>
      </>
    );
  }
}
