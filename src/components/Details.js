import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Departures from "../api/Departures";
import Journeys from "../api/Journeys";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import StopIcon from "@material-ui/icons/Stop";
import CommuteIcon from "@material-ui/icons/Commute";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TimerIcon from "@material-ui/icons/Timer";
import DirectionsSubwayIcon from "@material-ui/icons/DirectionsSubway";
import DirectionsRailwayIcon from "@material-ui/icons/DirectionsRailway";
import BusinessIcon from "@material-ui/icons/Business";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import TrainIcon from "@material-ui/icons/Train";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import _ from "lodash";

function Details({ lines }) {
  const classes = useStyles();
  //state
  const [userDestination, setUSerDestination] = useState("");
  const [filtredResults, setFilterResult] = useState([]);
  const [departResults, setDepartResults] = useState([]);
  //router
  const stopAreaId = useParams();
  const history = useHistory();

  //state
  //const [place, setPlace] = React.useState("");
  //query
  const departsList = Departures(stopAreaId);
  //const arrivalsList = Arrival(stopAreaId);
  const { data, isLoading, isError, isSuccess } = Journeys(stopAreaId);
  //console.log("journeys", journeys.data);
  //console.log("departsList ", departsList.data);
  //console.log("arrivalsList ", arrivalsList.data);
  //parse time
  function timeConverter(str) {
    const date = moment(str);
    const dateComponent = date.utc().format("DD/MM/YYYY");
    const timeComponent = date.utc().format("HH:mm:ss");
    return "le " + dateComponent + " à " + timeComponent;
  }

  //duration parse
  function parseDuration(seconds) {
    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % 3600;

    let min = parseInt(duration / 60);
    duration = duration % 60;

    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)} : ${min} : ${sec}`;
    }
    return `${min} m : ${sec} s`;
  }
  //filter data
  const filterData = (e) => {
    let dataSet = [];
    let departData = [];
    data.map((res) => {
      const d = res.destination
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      if (d) {
        // console.log(d);
        dataSet.push(res);
      }
    });
    departsList?.data?.map((res) => {
      const d = res.display_informations?.direction
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      if (d) {
        // console.log(d);
        departData.push(res);
      }
    });
    // if (e.target.value > 1) {
    setFilterResult(dataSet);
    setDepartResults(departData);

    //   setUSerDestination(e.target.value.toLowerCase());
    // }
  };
  // setResults(data);

  useEffect(() => {
    if (isSuccess) {
      setFilterResult(data);
      setDepartResults(departsList.data);
    }
  }, [isSuccess, departsList.isSuccess]);
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Box margin={0}>
          <Grid container direction="column">
            <Grid item>
              <Card className={classes.textFieldContainer}>
                <Button
                  onClick={() => history.push("/")}
                  className={classes.btnBack}
                  variant="contained"
                  color="secondary"
                  startIcon={<ArrowBackIcon />}
                >
                  retour
                </Button>
                <TextField
                  id="outlined-full-width"
                  // label="destination"
                  // style={{ margin: 8 }}
                  placeholder="filtrer.."
                  //helperText={}
                  onChange={_.debounce(filterData, 2000)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Card>
            </Grid>
            <Grid
              container
              item
              sm={12}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Card className={classes.typoContainer} elevation={0}>
                <Grid container alignItems="center" justify="center">
                  <Hidden smDown>
                    <AirportShuttleIcon
                      style={{
                        marginRight: "0.1em",
                        fontSize: "6em",
                        color: "#009688",
                      }}
                    />
                  </Hidden>
                  <Typography
                    variant="h4"
                    style={{ margin: "1.2em", color: "#009688" }}
                  >
                    planning journalier
                  </Typography>
                  <Hidden smDown>
                    <TrainIcon
                      style={{
                        marginLeft: "0.1em",
                        fontSize: "6em",
                        color: "#009688",
                      }}
                    />
                  </Hidden>
                </Grid>
              </Card>
              <Grid container item justify="center" alignItems="center">
                {isSuccess &&
                  filtredResults?.map((res) => {
                    return (
                      <Grid item key={Math.random()} xs={12} sm={6} md={4}>
                        <Card className={classes.card} elevation={0}>
                          <List>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                  <ArrowForwardIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary="depart"
                                secondary={timeConverter(
                                  res.departure_date_time
                                )}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                  <ArrowBackIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary="Arrival"
                                secondary={timeConverter(res.arrival_date_time)}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                  <TimerIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary="duration"
                                secondary={parseDuration(res.duration)}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                  <DirectionsSubwayIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary=" de "
                                secondary={res.from.name}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                  <DirectionsRailwayIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary=" destination "
                                secondary={res.to.name}
                              />
                            </ListItem>
                          </List>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item alignItems="center" direction="column">
            <Card className={classes.typoContainerDepart} elevation={0}>
              <Grid container alignItems="center" justify="center">
                <Typography
                  variant="h4"
                  style={{ margin: "1.2em", color: "#fff" }}
                >
                  les Prochains departs
                </Typography>

                <Hidden smDown>
                  <ArrowForwardIcon
                    style={{
                      marginLeft: "0.1em",
                      fontSize: "6em",
                      color: "#fff",
                    }}
                  />
                </Hidden>
                <Hidden smDown>
                  <ArrowForwardIcon
                    style={{
                      marginLeft: "0.1em",
                      fontSize: "6em",
                      color: "#fff",
                    }}
                  />
                </Hidden>
                <Hidden smDown>
                  <ArrowForwardIcon
                    style={{
                      marginLeft: "0.1em",
                      fontSize: "6em",
                      color: "#fff",
                    }}
                  />
                </Hidden>
              </Grid>
            </Card>
            <Grid container item>
              {departResults?.map((res) => {
                return (
                  <Grid item key={Math.random()} xs={12} sm={6} md={4}>
                    <Card className={classes.cardDepart}>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.avatarDepart}>
                              <CommuteIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="by "
                            secondary={res?.display_informations?.physical_mode}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.avatarDepart}>
                              <ArrowForwardIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="direction "
                            secondary={res?.display_informations?.direction}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.avatarDepart}>
                              <BusinessIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="network "
                            secondary={res?.display_informations?.network}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.avatarDepart}>
                              <DragHandleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="lines "
                            secondary={res?.display_informations?.name}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.avatarDepart}>
                              <CalendarTodayIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="depart "
                            secondary={timeConverter(
                              res?.stop_date_time?.departure_date_time
                            )}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.avatarDepart}>
                              <StopIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="1er arret "
                            secondary={res?.route?.direction?.stop_area.name}
                          />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      )}
    </React.Fragment>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    margin: "1em",
    border: "solid 2px #009688",
  },
  cardDepart: {
    margin: "1em",
    border: "solid 2px #4a148c",
  },
  textFieldContainer: {
    padding: "4em",
    paddingLeft: "20em",
    paddingRight: "20em",
    background: "url('/tab2.jpg')",
    clipPath: "polygon(0% 0%,100% 0%,100% 80vh,0% 100%)",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "2em",
      paddingRight: "2em",
    },
  },
  typoContainer: {
    width: "98%",
    display: "flex",
    marginTop: "1em",
    marginBottom: "1em",
    backgroundColor: "#fff",
    color: "red",
    border: "solid 2px #009688",
  },
  typoContainerDepart: {
    width: "98%",
    display: "flex",
    marginTop: "1em",
    marginBottom: "1em",
    backgroundColor: "#009688",
  },
  btnBack: {
    marginBottom: "10px",
    position: "absolute",
    top: 10,
    left: 10,
  },
  avatar: {
    backgroundColor: "#009688",
    color: "#fff",
  },
  avatarDepart: { backgroundColor: "#4a148c", color: "#fff" },
  textCard: {
    color: "#001f3f",
  },
}));
export default Details;
