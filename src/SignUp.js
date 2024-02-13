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

function SignUp({ isLoggedIn, setIsLoggedIn }) {
  const [signUpDetails, setSignUpDetails] = useState({
    user: "",
    email: "",
    pass: "",
  });
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setSignUpDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      signUpDetails.user.length > 0 &&
      signUpDetails.email.length > 0 &&
      signUpDetails.pass.length > 0
    ) {
      const url = `https://ns1.youngtalentz.com/?rest_route=/simple-jwt-login/v1/users&email=${signUpDetails.email}&display_name=${signUpDetails.user.replaceAll(" ", "%20")}&password=${signUpDetails.pass}&AUTH_KEY=abc123`;
      fetch(url, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["success"]) {
            setIsLoggedIn(true);
            const cookies = new Cookies();
            cookies.set("jwt", data["jwt"]);
            cookies.set("name", data["user"]["display_name"]);
            cookies.set("email", data["user"]["user_email"]);
            window.location.replace(
              "https://ns1.youngtalentz.com/apps/#/profile"
            );
          } else {
            setServerMessage(data.message);
          }
        }).catch((data) => {
          setServerMessage(data.message);
        })
    } else {
      setServerMessage("<p>Please include a username, email and password.</p>");
    }
  }

  return isLoggedIn ? (
    window.location.replace("https://ns1.youngtalentz.com/apps/#/profile")
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
                Sign Up
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: serverMessage }} />
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
                  id="user"
                  label="Username"
                  name="user"
                  autoComplete="user"
                  value={signUpDetails.user}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={signUpDetails.email}
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
                  value={signUpDetails.pass}
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
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item >
                    <Link href="#/login" variant="body2">
                      {"Already have an account? Login"}
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

export default SignUp;
