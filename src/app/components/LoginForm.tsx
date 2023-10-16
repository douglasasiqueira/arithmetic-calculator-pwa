import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { request } from "../requests";
import Alert from "@mui/material/Alert";
import { Cookies, withCookies } from "react-cookie";
import { API_URL, AUTH_COOKIE, PAGES } from "../constants";

const LoginForm = ({ cookies }: { cookies: Cookies }) => {
  const [error, setError] = useState({ isError: false, message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    setError({ isError: false, message: "" });

    const response = await request(`${API_URL}/v1/auth`, "POST", {
      username: data.get("username"),
      password: data.get("password"),
    });

    if (response.status > 299) {
      setError({ isError: true, message: "Invalid credentials. Try again." });
    } else {
      const token = await response.text();
      cookies.set(AUTH_COOKIE, token);

      window.location.href = PAGES.record;
    }
  };

  return (
    <Box
      sx={{
        width: "100dvw",
        height: "100dvh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 2 }}>
          {error.isError && <Alert severity="error">{error.message}</Alert>}
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={error.isError}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={error.isError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default withCookies(LoginForm);
