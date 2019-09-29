import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import MovieCard from "./MovieCard";
import MovieDetailsPage from "./MovieDetailsPage";
import Spinner from "./Spinner";
import "./App.css";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 150
    }
  }
}));

function App() {
  const classes = useStyles();
  const [activePage, setActivePage] = useState("search");
  const [movie, setMovie] = useState("");
  const [data, setData] = useState({});
  const [err, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    name: "",
    type: "",
    year: ""
  });

  const getSearchResult = () => {
    if (values.name.length > 0) {
      setLoading(true);
      async function fetchData() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=33684a32&s=${values.name}&type=${values.type}&y=${values.year}`
        );
        res.json().then(res => {
          if (res.Response === "True") {
            setData(res.Search);
            setLoading(false);
          } else {
            setErrors(res.Error);
            setLoading(false);
          }
        });
      }

      fetchData();
    } else {
      setErrors("What movie are you looking for?");
      setData([]);
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    setErrors("");
  };

  console.log("movie", movie);
  console.log("data", data);
  return (
    <div className="App">
      <Container maxWidth="lg">
        {activePage === "search" ? (
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                container
                item
                direction="row"
                justify="space-around"
                alignItems="center"
                lg={6}
              >
                <TextField
                  id="standard-name"
                  label="Search"
                  value={values.name}
                  onChange={handleChange("name")}
                  margin="normal"
                  className={classes.textField}
                />
                <TextField
                  id="standard-name"
                  label="Year"
                  value={values.year}
                  onChange={handleChange("year")}
                  margin="normal"
                  className={classes.textField}
                />
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="type-native-simple">type</InputLabel>
                  <Select
                    native
                    value={values.type}
                    onChange={handleChange("type")}
                    inputProps={{
                      name: "type",
                      id: "type-native-simple"
                    }}
                  >
                    <option value="" />
                    <option value="movie">movie</option>
                    <option value="series">series</option>
                    <option value="episode">episode</option>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => {
                    getSearchResult();
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <h1>{err}</h1>
            {loading && <Spinner />}
            <Grid container spacing={3}>
              {data &&
                data[0] &&
                data.map((item, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <MovieCard
                      toggleActivePage={data => {
                        setActivePage("movieDatails");
                        setMovie(data);
                      }}
                      title={item.Title}
                      poster={item.Poster}
                      year={item.Year}
                      type={item.Type}
                      id={item.imdbID}
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
        ) : (
          <MovieDetailsPage
            id={movie}
            setActive={() => {
              setActivePage("search");
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
