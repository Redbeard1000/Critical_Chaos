import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import "../stylesheets/Home.css";

export const Home = () => {
  return (
    <>
      <header className="header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography
                className="header_name"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Critical Chaos
              </Typography>
              <Button className="button" color="success">
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </>
  );
};
