import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function PaperSheet({ setActive, id }) {
  const [movie, getMovie] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=33684a32&i=${id}`
      );
      res.json().then(res => getMovie(res));
    }

    fetchData();
  }, []);
  return (
    <div>
      <Button
        style={{ float: "left" }}
        variant="contained"
        onClick={() => {
          setActive();
        }}
      >
        <KeyboardArrowLeft />
        Back
      </Button>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          container
          item
          direction="row"
          justify="space-around"
          alignItems="center"
          lg={6}
        >
          <Paper className={classes.root}>
            {movie && (
              <div>
                <Typography variant="h5" component="h3">
                  {movie.Title}
                </Typography>
                <img alt={movie.Title} src={movie.Poster} />
                <Typography component="p">
                  {movie.Type && movie.Type} | Year: {movie.Year} |{" "}
                  {movie.Genre}
                </Typography>
                <Typography component="p">
                  Released Year:{movie.Released}
                </Typography>
                <div>
                  <br />

                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Typography variant="h7" component="h3">
                      Raiting:
                    </Typography>
                    {movie.Ratings &&
                      movie.Ratings.map((item, index) => (
                        <Typography key={index} component="p">
                          {item.Source} : {item.Value}
                        </Typography>
                      ))}
                  </Grid>
                </div>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
