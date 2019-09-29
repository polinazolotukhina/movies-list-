import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import MoviePageCard from "./MoviePage";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function PaperSheet({ setActive, id }) {
  const [movie, getMovie] = useState([]);

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
        style={{ float: "left", margin: "20px 0" }}
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
          lg={8}
        >
          <MoviePageCard movie={movie} />
        </Grid>
      </Grid>
    </div>
  );
}
