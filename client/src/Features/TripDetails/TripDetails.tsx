import { useParams } from "react-router-dom";



export default function TripDetails() {
    const {id} = useParams<{id: string}>();

    return (
        <>
            Trip: {id}

            <h1>Details</h1>
            coming soon!!!
            <h1>Map</h1>
            coming soon!!!
            <h1>Photos</h1>
            coming soon!
        </>
    );
}