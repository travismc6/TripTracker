import axios from "axios";
import { useEffect, useState } from "react";
import { getTimeString, TripListItem } from "../Models/Trip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Link, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TripMap from "./TripMap";
import TripGrid from "./TripGrid";

export default function TripList() {
  const [tripList, setTripList] = useState<TripListItem[]>([]);
  const [view, setView] = useState<string>("list");

  useEffect(() => {
    //const url = 'https://localhost:7281';
    const url = "https://travistriptracker.azurewebsites.net";

    axios.get<TripListItem[]>(url + "/api/trips").then((resp) => {
      setTripList(resp.data);
    });
  }, []);

  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <Button variant="contained">Add Trip</Button>

        <ToggleButtonGroup
          sx={{ marginLeft: 5, marginTop: 2, marginBottom: 2 }}
          color="primary"
          value={view}
          exclusive
          onChange={() => {
            if (view === "list") {
              setView("map");
            } else {
              setView("list");
            }
          }}
        >
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="map">Map</ToggleButton>
        </ToggleButtonGroup>

        {view === "list" && (
          <TripGrid tripList={tripList}/>
        )}
        {view === "map" && <TripMap tripList={tripList} />}
      </div>
    </>
  );
}
