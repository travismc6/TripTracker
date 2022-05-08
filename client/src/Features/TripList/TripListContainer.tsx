import axios from "axios";
import { useEffect, useState } from "react";
import { TripListItem } from "../../App/Models/Trip";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import TripMap from "./TripMap";
import TripGrid from "./TripGrid";
import { apiRoot } from "../../App/Helpers/Helpers";

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TripListContainer() {
  const [openModal, setOpenModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [tripList, setTripList] = useState<TripListItem[]>([]);
  const [view, setView] = useState<string>("list");
  const [isLoading, setIsLoading] = useState(false);
  const [yearSelected, setYearSelected] = useState<string>("All");

  // filters
  const [yearOptions, setYearOptions] = useState<number[]>([]);

  const [filteredList, setFilteredList] = useState<TripListItem[]>([
    ...tripList,
  ]);

  const yearChangeHandler = (event: SelectChangeEvent) => {
    const year = event.target.value;
    setYearSelected(year);

    if (year !== "All") {
      let list = [...tripList.filter((t) => t.date.getFullYear() === +year)];
      setFilteredList([...list]);
    } else {
      setFilteredList([...tripList]);
    }
  };

  const handleOpenModal = (id: number) => {
    setOpenModal(true);
    setDeletingId(id);
  }

  const handleCloseModal = () => {
    if(!isDeleting){
      setOpenModal(false);
    }
  }

  const deleteTrip = () => {
    setIsDeleting(true);

     axios
      .put(apiRoot + `/api/trips/delete/${deletingId}`)
      .then((resp) => {
        const modifiedTrips = [...tripList].filter((r) => r.id !== deletingId);
        setTripList([...modifiedTrips]);

        const modifiedFilteredTrips = [...filteredList].filter((r) => r.id !== deletingId);
        setFilteredList([...modifiedFilteredTrips]);
      })
      .catch((error) => alert("Error deleting trip."))
      .finally(() => {
        setIsDeleting(false)
        handleCloseModal();
      });
      setDeletingId(null);
  };

  useEffect(() => {
    axios
      .get<TripListItem[]>(apiRoot + "/api/trips")
      .then((resp) => {
        setIsLoading(true);
        setTripList(resp.data);
        setFilteredList(resp.data);

        const allYears = resp.data.map((item) => item.date.getFullYear());
        let yearSet = new Set<number>();
        allYears.forEach((y) => {
          yearSet.add(y);
        });
        setYearOptions(Array.from(yearSet.values()).sort().reverse());
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <h3>loading...</h3>}
      {!isLoading && filteredList.length > 0 && (
        <>
          <Box>
            <Typography variant="h5" sx={{ mt: 2 }}>
              {"\t\t"}Total Miles:{" "}
              {Math.round(
                filteredList
                  .map((a) => a.distanceMiles)
                  .reduce(function (a, b) {
                    return a + b;
                  })
              )}
            </Typography>
            <Button variant="contained" href="/create">
              Add Trip
            </Button>

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

            <FormControl
              sx={{
                marginLeft: 5,
                marginTop: 1,
                marginBottom: 2,
                minWidth: 80,
              }}
            >
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                value={yearSelected}
                label="Year"
                onChange={yearChangeHandler}
              >
                <MenuItem value="All">
                  <em>All</em>
                </MenuItem>
                {yearOptions.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box style={{ height: "75vh", overflow: "auto" }}>
            {view === "list" && <TripGrid tripList={filteredList} handleOpenModal={handleOpenModal} />}
            {view === "map" && <TripMap tripList={filteredList} />}
          </Box>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Trip
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete this trip?
              </Typography>

              <Box display="flex" sx={{mt:2}}>
                <Button disabled={isDeleting} variant="outlined" sx={{mr:2}} onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button disabled={isDeleting} variant="contained" onClick={deleteTrip}>
                  Delete
                </Button>
              </Box>

            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
