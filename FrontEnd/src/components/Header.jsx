import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "#F7F2EF" }}
        >
          LinkOverflow.
        </Typography>

        <nav>
          <Auth />
        </nav>
      </Toolbar>
    </AppBar>
  );
};
