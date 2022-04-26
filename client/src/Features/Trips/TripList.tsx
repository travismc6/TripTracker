import axios from "axios";
import { useEffect, useState } from "react";
import { TripListItem } from "./Trip";

export default function TripList() {

    const [tripList, setTripList]  = useState<TripListItem[]>([]);

    useEffect(() => {
        axios.get<TripListItem[]>('https://localhost:7281/api/trips').then(resp => {
            setTripList(resp.data);
        });
    }, []);

    return (
        <>
            <h1>My Trips</h1>

            <ul>
                {
                    tripList.map((item,index) => (
                    <li key={item.id}>{item.year} - {item.river}</li>
                    ))
                }

            </ul>
        </>
    );
}