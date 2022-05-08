import { Delete } from "@mui/icons-material";
import { Box, IconButton, Link, Modal, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  getDateString,
  getFullDateString,
  getTimeString,
  TripListItem,
} from "../../App/Models/Trip";

interface Props {
  tripList: readonly TripListItem[];
  handleOpenModal: (id: number) => void;
}

export default function TripGrid({ tripList, handleOpenModal }: Props) {
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      minWidth: 110,
      renderCell: (cellValues) => {
        return getFullDateString(cellValues.row.date, cellValues.row.days);
      },
    },
    {
      field: "river",
      headerName: "River",
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Link href={"/tripDetails/" + cellValues.row.id}>
            {cellValues.row.river}
          </Link>
        );
      },
    },
    { field: "state", headerName: "State", minWidth: 100 },
    // {
    //   field: "days",
    //   headerName: "Days",
    //   renderCell: (params) => {
    //     return params.row.days ?? "1";
    //   },
    // },
    { field: "distanceMiles", headerName: "Distance (mi)" },
    {
      field: "timeMinutes",
      headerName: "Time",
      minWidth: 100,
      renderCell: (params) => {
        return getTimeString(params.row.timeMinutes);
      },
    },
    { field: "stage", headerName: "Stage" },
    { field: "flow", headerName: "Flow (cfs)" },
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
    {
      field: "delete",
      headerName: "",
      minWidth: 100,
      cellClassName: "actions",
      renderCell: (cellValues) => {
        return (
          <IconButton
            onClick={() => {
              handleOpenModal(cellValues.row.id);
            }}
          >
            <Delete />
          </IconButton>
        );
      },
    },
  ];
  return (
    <>
      <DataGrid rows={tripList} columns={columns} />
    </>
  );
}
