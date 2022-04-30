import axios from "axios";
import { useEffect, useState } from "react";
import { TripListItem } from "../../App/Models/Trip";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import TripMap from "./TripMap";
import TripGrid from "./TripGrid";
import { apiRoot } from "../../App/Helpers/Helpers";

export default function TripListContainer() {
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
      let list = [...tripList.filter((t) => t.year === +year)];
      setFilteredList([...list]);
    } else {
      setFilteredList([...tripList]);
    }
  };

  useEffect(() => {
    axios
      .get<TripListItem[]>(apiRoot + "/api/trips")
      .then((resp) => {
        setIsLoading(true);
        setTripList(resp.data);
        setFilteredList(resp.data);

        const allYears = resp.data.map((item) => item.year);
        let yearSet = new Set<number>();
        allYears.forEach((y) => {
          yearSet.add(y);
        });
        setYearOptions(Array.from(yearSet.values()).sort());
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <h3>loading...</h3>}
      {!isLoading && filteredList.length > 0 && (
        <Box height="100vh" >
            <h3>
              {"\t\t"}Total Miles:{" "}
              {Math.round(
                filteredList
                  .map((a) => a.distanceMiles)
                  .reduce(function (a, b) {
                    return a + b;
                  })
              )}
            </h3>
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

          <FormControl sx={{ m: 1, minWidth: 80 }}>
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

          {view === "list" && <TripGrid tripList={filteredList} />}
          {view === "map" && <TripMap tripList={filteredList} />}
        </Box>
      )}
    </>
  );
}
