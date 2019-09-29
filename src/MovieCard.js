import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  title: {
    minHeight: 80
  }
});

export default function MediaCard({
  poster,
  title,
  type,
  id,
  year,
  toggleActivePage
}) {
  const classes = useStyles();
  console.log(id);
  return (
    <Card
      className={classes.card}
      onClick={() => {
        toggleActivePage(id);
      }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={poster}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Year: {year}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            Type: {type}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Button
        size="small"
        color="primary"
        onClick={() => {
          toggleActivePage(id);
        }}
      >
        Details
      </Button>
    </Card>
  );
}
MediaCard.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  toggleActivePage: PropTypes.func.isRequired
};
