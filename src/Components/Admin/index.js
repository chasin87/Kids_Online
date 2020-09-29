import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Store/user/actions";
import { selectToken } from "../../Store/user/selectors";
import { useHistory } from "react-router-dom";

// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Box from "@material-ui/core/Box";

// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import "./index.css";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   form: {
//     width: "100%",
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     background: "Tomato !important",
//   },
// }));

export default function Admin() {
  // const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/quizdashboard");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  return (
    <div className="Container">
      <div class="login-form">
        <form>
          <div className="title_admin">Admin Login </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"></span>
              </div>
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                required="required"
                id="email"
                name="email"
                // autoComplete="email"
                // autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"></span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required="required"
                label="Password"
                id="password"
                // autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-primary btn-block"
              fullWidth
              variant="contained"
              onClick={submitForm}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// <Container component="main" maxWidth="xs">
// <div className="title_admin">Admin Login </div>
// <CssBaseline />

// <div className={classes.paper}>
//   <form className={classes.form} noValidate>
//     <TextField
//       variant="outlined"
//       margin="normal"
//       required
//       fullWidth
//       id="email"
//       label="Email Address"
//       name="email"
//       // autoComplete="email"
//       // autoFocus
//       value={email}
//       onChange={(event) => setEmail(event.target.value)}
//       type="email"
//     />
//     <TextField
//       variant="outlined"
//       margin="normal"
//       required
//       fullWidth
//       name="password"
//       label="Password"
//       type="password"
//       id="password"
//       // autoComplete="current-password"
//       value={password}
//       onChange={(event) => setPassword(event.target.value)}
//     />

//     <Button
//       type="submit"
//       fullWidth
//       variant="contained"
//       color="primary"
//       className={classes.submit}
//       onClick={submitForm}
//     >
//       Sign In
//     </Button>
//   </form>
// </div>

// <Box mt={8}></Box>
// </Container>
