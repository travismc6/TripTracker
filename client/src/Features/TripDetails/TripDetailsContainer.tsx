import { Box, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRoot } from "../../App/Helpers/Helpers";
import { TripListItem } from "../../App/Models/Trip";
import TripDetails from "./TripDetails";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function TripDetailsContainer() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<TripListItem>();
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else if(trip) {
    return (
      <>
        <div>
        <Link to={"/"} ><Typography sx={{marginTop:2}}>Back</Typography></Link>
          <Box sx={{ marginTop:2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Photos" {...a11yProps(1)} />
              <Tab label="Highlights" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel index={0} value={tabValue}>
            <TripDetails trip={trip} />
          </TabPanel>
          <TabPanel index={1} value={tabValue}>
            Coming soon...
          </TabPanel>
          <TabPanel index={2} value={tabValue}>
            Coming soon...
          </TabPanel>
        </div>
      </>
    );
  } else{
    // return error
    return(<></>);
  }
}
