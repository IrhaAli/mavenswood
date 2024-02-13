import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Cookies from "universal-cookie";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    pass: "",
  });
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    if (loginDetails.email.length > 0 || loginDetails.pass.length > 0) {
      const url = `https://ns1.youngtalentz.com/wp-json/jwt-auth/v1/token`;
      let formData = new FormData();
      formData.append("username", loginDetails.email);
      formData.append("password", loginDetails.pass);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            setIsLoggedIn(true);
            const cookies = new Cookies();
            cookies.set("jwt", data["token"]);
            cookies.set("name", data["user_display_name"]);
            cookies.set("email", data["user_email"]);
            window.location.replace(
              "https://ns1.youngtalentz.com/apps/#/profile"
            );
          } else {
            setServerMessage(data["message"]);
          }
        });
    }
  }, [loginSubmitted]);

  function handleSubmit(event) {
    event.preventDefault();
    setLoginSubmitted((prev) => !prev);
  }

  return isLoggedIn ? (
    window.location.replace(
      "https://ns1.youngtalentz.com/apps/#/profile"
    )
  ) : (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {serverMessage}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={loginDetails.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="pass"
                  label="Password"
                  name="pass"
                  type="password"
                  autoComplete="current-password"
                  value={loginDetails.pass}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onSubmit={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
