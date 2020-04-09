import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import withStyles from "@material-ui/styles/withStyles";
import { Grid, Paper, Typography } from "@material-ui/core";
const backgroundShape = require("../../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 200px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)",
    },
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  box: {
    marginBottom: 40,
    height: 65,
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

class Register extends Component {
  static contextType = AuthContext;

  state = {
    redirectToReferrer: false,
    error: ""
  }

  handleSubmit = (email, password) => {
    API.Users.create(email, password)
      .then(response => {
        this.setState({ redirectToReferrer: true })
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({ error: "Sorry, that email/password combination is not valid. Please try again." });
        }
      });
  }

  render() {
    const { classes } = this.props;

    const { from } = this.props.location.state || { from: { pathname: "/secret" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            gutterbottom="True"
            container
            className={classes.grid}
          >
            <Grid item xs={12} md={4}>
              <Grid item className={classes.box}>

                <Paper className={classes.paper}>
                  <Typography
                    style={{ textTransform: "uppercase" }}
                    color="secondary"
                    align='center'
                  >
                    <h1>Register Account</h1>
                  </Typography>
                  {this.state.error &&
                    <Grid item >
                      <div >
                        <div role='alert'>
                          {this.state.error}
                        </div>
                      </div>
                    </Grid>}
                  <div className='row'>
                    <div className='col'>
                      <RegistrationForm onSubmit={this.handleSubmit} />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
