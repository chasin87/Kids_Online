import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { gebruikerLogin } from "../../Store/gebruiker/actions";
import { gebruikerSelectToken } from "../../Store/gebruiker/selectors";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "Tomato !important",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const gebruikerToken = useSelector(gebruikerSelectToken);
  const history = useHistory();

  useEffect(() => {
    if (gebruikerToken !== null) {
      history.push("/quiz");
    }
  }, [gebruikerToken, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(gebruikerLogin(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="title_admin">Gebruiker Login </div>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Wachtwoord"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Log In
          </Button>
          <div className="signUptext">
            <Link
              to="/signup"
              style={{
                textAlign: "center",
                color: "#0a0a45",
                fontSize: "20px",
                textDecoration: "underline",
              }}
            >
              Aanmelden voor Kids Online
            </Link>
          </div>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
