import React from "react";

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Collapse,
  List,
  ListItem,
  Divider,
  ButtonProps,
} from "@material-ui/core";
import clsx from "clsx";
import CommuteIcon from "@material-ui/icons/Commute";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import TrainIcon from "@material-ui/icons/Train";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
//import RegionsQuery from "../api/RegionsQuery";
import PlaceQuery from "../api/PlaceQuery";
import { Link } from "react-router-dom";

function Home() {
  const classes = useStyles();

  //state
  //const [regionId, setRegionId] = useState("fr-ne");
  const [place, setPlace] = useState("paris");
  const [index, setIndex] = useState(null);
  //query
  //const regionsId = RegionsQuery();
  const places = PlaceQuery(place);
  //collapse
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (i) => {
    setExpanded(!expanded);
    setIndex(i);
  };
  return (
    <Box className={classes.container}>
      <Grid container justify="center" alignItems="center">
        <Grid item sm={8}>
          <Card className={classes.textFieldContainer}>
            <TextField
              id="outlined-full-width"
              label="transport publique"
              style={{ margin: 8 }}
              placeholder="recherche.."
              helperText={place}
              onChange={(e) => setPlace(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Card>
        </Grid>

        <Grid container item sm={12} justify="center">
          {places &&
            places?.data?.map((d, i) => (
              <Grid
                item
                key={d?.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.card}
              >
                <Card>
                  <CardContent className={classes.cardContent}>
                    <Link to={`/station/${d.id}`}>
                      <div
                        className={classes.gareName}
                        style={{ color: "blue" }}
                      >
                        <CommuteIcon />
                        <div style={{ marginLeft: "1em" }}>{d.name}</div>
                      </div>
                    </Link>
                    <h4 style={{ color: "grey", marginTop: "1em" }}>
                      moyen de transport disponible
                    </h4>
                    <div className={classes.moyenDeTransport}>
                      <div className={classes.stationName}>
                        {d.mode[0][0]?.name === "Train" ? <TrainIcon /> : ""}
                        {d.mode[0][0]?.name === "Bus" ? (
                          <DirectionsBusIcon />
                        ) : (
                          ""
                        )}

                        {d.mode[0][0]?.name}
                      </div>
                      <div className={classes.stationName}>
                        {d.mode[0][1]?.name &&
                        d.mode[0][1]?.name === "Train" ? (
                          <TrainIcon />
                        ) : (
                          ""
                        )}
                        {d.mode[0][1]?.name === "Bus" ? (
                          <DirectionsBusIcon />
                        ) : (
                          ""
                        )}
                        {d.mode[0][1]?.name}
                      </div>
                    </div>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded && index === i,
                      })}
                      onClick={(e) => handleExpandClick(i)}
                      aria-expanded={expanded && index === i}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={expanded && index === i}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <h4>liste des lignes qui passent par cette station: </h4>
                      {d.lines[0]?.map((line, indexItem) => {
                        return (
                          <List
                            key={line.id}
                            className={indexItem % 2 === 0 ? classes.grey : ""}
                          >
                            <Divider />
                            <ListItem>
                              <span style={{ paddingRight: "0.5em" }}>
                                ligne:
                              </span>
                              {line.name}
                            </ListItem>

                            <ListItem>
                              <span style={{ paddingRight: "0.5em" }}>
                                mode:
                              </span>{" "}
                              {line.commercial_mode?.name}
                            </ListItem>

                            <ListItem>
                              <span style={{ paddingRight: "0.5em" }}>
                                réseau:
                              </span>{" "}
                              {line.network?.name}
                            </ListItem>
                            <ListItem>
                              <span style={{ paddingRight: "0.5em" }}>
                                code:
                              </span>{" "}
                              {line.code}
                            </ListItem>
                          </List>
                        );
                      })}
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  container: {
    marginTop: "4em",
  },
  card: {
    margin: "1em",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gareName: {
    display: "flex",
  },

  textFieldContainer: {
    padding: "2em",
  },
  moyenDeTransport: {
    display: "flex",
    width: "100%",
    marginTop: ".4em",
    paddingLeft: "2em",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  stationName: {
    marginLeft: ".4em",
    display: "flex",
    marginTop: ".5em",
    // alignSelf: "flex-start",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  grey: {
    color: "grey",
  },
}));
export default Home;
