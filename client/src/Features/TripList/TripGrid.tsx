import { Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getTimeString, TripListItem } from "../Models/Trip";

interface Props {
    tripList: readonly TripListItem[];
  }

export default function TripGrid({ tripList }: Props) {
  const columns: GridColDef[] = [
    { field: "year", headerName: "Year", minWidth: 100 },
    {
      field: "river",
      headerName: "River",
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        const startString: string = cellValues.row.startCoordinates.replace(
          /\s/g,
          ""
        );

        return (
          <Link href={"/tripDetails/" + cellValues.row.id}>
            {cellValues.row.river}
          </Link>
        );
      },
    },
    { field: "state", headerName: "State", minWidth: 100 },
    { field: "distanceMiles", headerName: "Distance (mi)" },
    {
      field: "timeMinutes",
      headerName: "Time",
      flex: 1,
      renderCell: (params) => {
        return getTimeString(params.row.timeMinutes);
      },
    },
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
  return (
    <>
      <DataGrid rows={tripList} columns={columns} rowsPerPageOptions={[5]} />
    </>
  );
}
