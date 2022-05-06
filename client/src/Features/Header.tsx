import { Kayaking } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navStyles = {
  color: "white",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  // TODO: change color if other pages are active
  // '&.active' : {
  //   color: 'text.primary'
  // },
  textDecoration: "none",
};

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ flexGrow: 1 }} position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton
            onClick={() => navigate("/")}
            sx={{ mr: 2 }}
            size="large"
            color="inherit"
          >
            <Kayaking />
          </IconButton>
        <Typography sx={navStyles} variant="h6" component={NavLink} to="/">
          Kayak Trip Tracker
        </Typography>
        </Box>

        <Typography sx={navStyles}  component={NavLink} to="/">
          Login
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
