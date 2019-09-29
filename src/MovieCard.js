import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
          image={
            poster
              ? poster
              : "https://previews.123rf.com/images/ylivdesign/ylivdesign1610/ylivdesign161008497/66123513-popcorn-icon-gray-monochrome-illustration-of-popcorn-vector-icon-for-web.jpg"
          }
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
