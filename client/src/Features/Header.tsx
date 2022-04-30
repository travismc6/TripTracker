import { AppBar, Link, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Kayak Trip Tracker</Typography>
      </Toolbar>
    </AppBar>
  );
}
