import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { gebruikerRegistratie } from "../../Store/gebruiker/actions";
import { gebruikerSelectToken } from "../../Store/gebruiker/selectors";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function SignUp() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");

  const levels = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    { value: 3, label: "3" },
  ];
  const dispatch = useDispatch();
  const token = useSelector(gebruikerSelectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(gebruikerRegistratie(userName, email, password, level));
    setUserName("");
    setEmail("");
    setPassword("");
    setLevel(null);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="title_admin">Registreer Gebruiker</div>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            autoFocus
            fullWidth
            placeholder="Voer je Gebruikersnaam in... "
            id="gebruikersNaam"
            label="Gebruikersnaam"
            name="gebruikersnaam"
            autoComplete="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            type="text"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Adres"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
          />

          <TextField
            id="level"
            margin="normal"
            select
            required
            fullWidth
            label="Niveau"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            helperText="Selecteer je niveau"
            variant="outlined"
          >
            {levels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Registreer
          </Button>
          <div className="signUptext">
            <Link
              to="/login"
              style={{
                textAlign: "center",
                color: "#0a0a45",
                fontSize: "20px",
                textDecoration: "underline",
              }}
            >
              Heb je al een account?{" "}
            </Link>
          </div>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
