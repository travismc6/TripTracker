import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoot } from "../../App/Helpers/Helpers";
import { TripListItem, UploadTrip } from "../../App/Models/Trip";

interface State {
  State: string;
  Abbrev: string;
  Code: string;
}

const stateOptions: State[] = [
  {
    State: "Alabama",
    Abbrev: "Ala.",
    Code: "AL",
  },
  {
    State: "Alaska",
    Abbrev: "Alaska",
    Code: "AK",
  },
  {
    State: "Arizona",
    Abbrev: "Ariz.",
    Code: "AZ",
  },
  {
    State: "Arkansas",
    Abbrev: "Ark.",
    Code: "AR",
  },
  {
    State: "California",
    Abbrev: "Calif.",
    Code: "CA",
  },
  {
    State: "Colorado",
    Abbrev: "Colo.",
    Code: "CO",
  },
  {
    State: "Connecticut",
    Abbrev: "Conn.",
    Code: "CT",
  },
  {
    State: "Delaware",
    Abbrev: "Del.",
    Code: "DE",
  },
  {
    State: "District of Columbia",
    Abbrev: "D.C.",
    Code: "DC",
  },
  {
    State: "Florida",
    Abbrev: "Fla.",
    Code: "FL",
  },
  {
    State: "Georgia",
    Abbrev: "Ga.",
    Code: "GA",
  },
  {
    State: "Hawaii",
    Abbrev: "Hawaii",
    Code: "HI",
  },
  {
    State: "Idaho",
    Abbrev: "Idaho",
    Code: "ID",
  },
  {
    State: "Illinois",
    Abbrev: "Ill.",
    Code: "IL",
  },
  {
    State: "Indiana",
    Abbrev: "Ind.",
    Code: "IN",
  },
  {
    State: "Iowa",
    Abbrev: "Iowa",
    Code: "IA",
  },
  {
    State: "Kansas",
    Abbrev: "Kans.",
    Code: "KS",
  },
  {
    State: "Kentucky",
    Abbrev: "Ky.",
    Code: "KY",
  },
  {
    State: "Louisiana",
    Abbrev: "La.",
    Code: "LA",
  },
  {
    State: "Maine",
    Abbrev: "Maine",
    Code: "ME",
  },
  {
    State: "Maryland",
    Abbrev: "Md.",
    Code: "MD",
  },
  {
    State: "Massachusetts",
    Abbrev: "Mass.",
    Code: "MA",
  },
  {
    State: "Michigan",
    Abbrev: "Mich.",
    Code: "MI",
  },
  {
    State: "Minnesota",
    Abbrev: "Minn.",
    Code: "MN",
  },
  {
    State: "Mississippi",
    Abbrev: "Miss.",
    Code: "MS",
  },
  {
    State: "Missouri",
    Abbrev: "Mo.",
    Code: "MO",
  },
  {
    State: "Montana",
    Abbrev: "Mont.",
    Code: "MT",
  },
  {
    State: "Nebraska",
    Abbrev: "Nebr.",
    Code: "NE",
  },
  {
    State: "Nevada",
    Abbrev: "Nev.",
    Code: "NV",
  },
  {
    State: "New Hampshire",
    Abbrev: "N.H.",
    Code: "NH",
  },
  {
    State: "New Jersey",
    Abbrev: "N.J.",
    Code: "NJ",
  },
  {
    State: "New Mexico",
    Abbrev: "N.M.",
    Code: "NM",
  },
  {
    State: "New York",
    Abbrev: "N.Y.",
    Code: "NY",
  },
  {
    State: "North Carolina",
    Abbrev: "N.C.",
    Code: "NC",
  },
  {
    State: "North Dakota",
    Abbrev: "N.D.",
    Code: "ND",
  },
  {
    State: "Ohio",
    Abbrev: "Ohio",
    Code: "OH",
  },
  {
    State: "Oklahoma",
    Abbrev: "Okla.",
    Code: "OK",
  },
  {
    State: "Oregon",
    Abbrev: "Ore.",
    Code: "OR",
  },
  {
    State: "Pennsylvania",
    Abbrev: "Pa.",
    Code: "PA",
  },
  {
    State: "Rhode Island",
    Abbrev: "R.I.",
    Code: "RI",
  },
  {
    State: "South Carolina",
    Abbrev: "S.C.",
    Code: "SC",
  },
  {
    State: "South Dakota",
    Abbrev: "S.D.",
    Code: "SD",
  },
  {
    State: "Tennessee",
    Abbrev: "Tenn.",
    Code: "TN",
  },
  {
    State: "Texas",
    Abbrev: "Tex.",
    Code: "TX",
  },
  {
    State: "Utah",
    Abbrev: "Utah",
    Code: "UT",
  },
  {
    State: "Vermont",
    Abbrev: "Vt.",
    Code: "VT",
  },
  {
    State: "Virginia",
    Abbrev: "Va.",
    Code: "VA",
  },
  {
    State: "Washington",
    Abbrev: "Wash.",
    Code: "WA",
  },
  {
    State: "West Virginia",
    Abbrev: "W.Va.",
    Code: "WV",
  },
  {
    State: "Wisconsin",
    Abbrev: "Wis.",
    Code: "WI",
  },
  {
    State: "Wyoming",
    Abbrev: "Wyo.",
    Code: "WY",
  },
];

export default function CreateTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState<UploadTrip>({
    river: "",
    flow: undefined,
    state: "",
    stage: "",
    startName: "",
    endName: "",
    startCoordinates: "",
    endCoordinates: "",
    date: undefined,
    distanceMiles: 0,
    timeHours: 0,
    notes: "",
    timeMinutes: 0,
    measuredAt: "",
    days: 1
  });

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (trip.river.length === 0) {
      setErrorMessage("River is required");
      return;
    }
    if (trip.date === undefined) {
      setErrorMessage("Date is required");
      return;
    }
    if (trip.days < 1) {
      setErrorMessage("Days is invalid");
      return;
    }
    if (trip.state.length === 0) {
      setErrorMessage("State is required");
      return;
    }
    if (trip.startName.length === 0) {
      setErrorMessage("Start name is required");
      return;
    }
    if (trip.startCoordinates.length === 0) {
      setErrorMessage("Start coordinates are required");
      return;
    }
    if (trip.endName.length === 0) {
      setErrorMessage("End name is required");
      return;
    }
    if (trip.endCoordinates.length === 0) {
      setErrorMessage("End coordinates are required");
      return;
    }

    setErrorMessage("");
    setIsUploading(true);

    trip.timeMinutes = +trip.timeHours * 60 + +trip.timeMinutes;

    axios
      .post<TripListItem>(apiRoot + `/api/trips`, trip)
      .then((resp) => {
        const id = resp.data.id;
        navigate(`/tripDetails/${id}`);
      })
      .catch((error) => setErrorMessage(error))
      .finally(() => setIsUploading(false));
  };

  const stateChangeHandler = (event: SelectChangeEvent) => {
    const state = event.target.value;

    let t: UploadTrip = { ...trip };
    t.state = state;
    setTrip(t);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
  }

  return (
    <Box sx={{mt:2}}>
      <Typography variant="h4" color="darkblue">
        Create a new trip
      </Typography>

      <Stack spacing={2} sx={{ mt: 2, maxWidth: 600 }}>
        <TextField
          label="River"
          name="river"
          variant="outlined"
          required
          value={trip.river}
          onChange={handleInputChange}
        />
        <TextField
          name="date"
          label="Date"
          variant="outlined"
          required
          type="date"
          onChange={handleInputChange}
          value={trip.date}
        />
        <TextField
          label="Days"
          name="days"
          variant="outlined"
          required
          value={trip.days}
          onChange={handleInputChange}
          type="number"
        />

        <FormControl>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            required
            name="state"
            labelId="demo-simple-select-label"
            value={trip.state}
            label="State"
            onChange={stateChangeHandler}
          >
            {stateOptions.map((state) => (
              <MenuItem value={state.Code}>{state.State}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="distanceMiles"
          required
          value={trip.distanceMiles}
          label="Distance (miles)"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          name="timeHours"
          value={trip.timeHours}
          label="Hours"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          name="timeMinutes"
          value={trip.timeMinutes}
          label="Minutes"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          name="stage"
          value={trip.stage}
          label="Stage"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          name="flow"
          value={trip.flow}
          label="Flow (cfs)"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          name="startName"
          required
          value={trip.startName}
          label="Start Name"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          name="startCoordinates"
          required
          value={trip.startCoordinates}
          label="Start Coordinates"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          name="endName"
          required
          value={trip.endName}
          label="End Name"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          name="endCoordinates"
          required
          value={trip.endCoordinates}
          label="End Coordinates"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          name="measuredAt"
          value={trip.measuredAt}
          label="Measured At"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          name="notes"
          value={trip.notes}
          label="Notes"
          variant="outlined"
          multiline
          onChange={handleInputChange}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{ mt: 5 }}
        onClick={handleSubmit}
        disabled={isUploading}
      >
        Create
      </Button>

      {errorMessage.length > 0 && (
        <Typography sx={{ mt: 1 }} color={"red"}>
          * {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
