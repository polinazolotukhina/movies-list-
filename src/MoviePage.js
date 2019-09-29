import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    [theme.breakpoints.up("md")]: {
      width: 450,
      height: 450
    }
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  info: {
    [theme.breakpoints.up("md")]: {
      height: 410
    }
  }
}));

export default function MediaControlCard({ movie }) {
  const classes = useStyles();
  const theme = useTheme();

  console.log("movie", movie);

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.info}
          >
            <Grid item>
              <Typography component="h5" variant="h5">
                {movie.Title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {movie.Type && movie.Type} | Year: {movie.Year} | {movie.Genre}{" "}
                | {movie.Released}
              </Typography>
            </Grid>
            <Grid
              container
              item
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Typography component="p">Raiting:</Typography>
              {movie.Ratings &&
                movie.Ratings.map((item, index) => (
                  <Typography key={index} component="p">
                    {item.Source} : {item.Value}
                  </Typography>
                ))}
            </Grid>
          </Grid>
        </CardContent>
      </div>
      {movie.Poster && (
        <CardMedia
          className={classes.cover}
          image={movie.Poster}
          title={movie.Title}
        />
      )}
    </Card>
  );
}
MediaControlCard.propTypes = {
  movie: PropTypes.any.isRequired
};
