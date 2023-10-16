import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect } from "react";
import { Cookies, withCookies } from "react-cookie";
import { AUTH_COOKIE, PAGES } from "../constants";

const AuthSection = ({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: Cookies;
}) => {
  const logout = () => {
    cookies.remove(AUTH_COOKIE);
    window.location.href = PAGES.login;
  };

  const goToRecords = () => {
    window.location.href = PAGES.record;
  };

  const goToOperation = () => {
    window.location.href = PAGES.operation;
  };

  useEffect(() => {
    const authToken = cookies.get(AUTH_COOKIE);
    if (!authToken) {
      window.location.href = PAGES.login;
      return;
    }
  }, [cookies]);

  return (
    <>
      <Box sx={{ margin: 0 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={goToRecords}>
              See Records
            </Button>
            <Button color="inherit" onClick={goToOperation}>
              New Operation
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};

export default withCookies(AuthSection);
