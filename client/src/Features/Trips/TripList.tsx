import axios from "axios";
import { useEffect, useState } from "react";
import { TripListItem } from "./Trip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Link, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TripMap from "./TripMap";

export default function TripList() {
  const [tripList, setTripList] = useState<TripListItem[]>([]);
  const [view, setView] = useState<string>("list");

  const columns: GridColDef[] = [
    { field: "year", headerName: "Year", minWidth: 100 },
    { field: "river", headerName: "River", minWidth: 100, flex: 1 },
    { field: "state", headerName: "State", minWidth: 100 },
    { field: "stage", headerName: "Stage" },
    { field: "flow", headerName: "Flow" },
    {
      field: "startName",
      headerName: "Start",
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        const startString: string = cellValues.row.startCoordinates.replace(
          /\s/g,
          ""
        );

        const link: string = `https://www.google.com/maps/search/?api=1&query=${startString}`;
        return (
          <Link target="_blank" href={link}>
            {cellValues.row.startName}
          </Link>
        );
      },
    },
    {
      field: "endName",
      headerName: "End",
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        const endString: string = cellValues.row.endCoordinates.replace(
          /\s/g,
          ""
        );

        const link: string = `https://www.google.com/maps/search/?api=1&query=${endString}`;
        return (
          <Link target="_blank" href={link}>
            {cellValues.row.endName}
          </Link>
        );
      },
    },
  ];

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
          <DataGrid
            rows={tripList}
            columns={columns}
            rowsPerPageOptions={[5]}
          />
        )}
        {view === "map" && <TripMap />}
      </div>
    </>
  );
}
