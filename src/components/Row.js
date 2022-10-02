import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Row.module.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const imgURL = "https://image.tmdb.org/t/p/original/";
const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const apiURL = "https://api.themoviedb.org/3" + props.fetchURL;
    async function fetchData() {
      const request = await axios.get(apiURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [props.fetchURL]);

  let screenWidth = window.screen.width;
  const opts = {
    height: screenWidth >= 750 ? "550" : "270",
    width: screenWidth >= 750 ? "100%" : "97%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name ||
          movie?.title ||
          movie?.original_name ||
          movie?.overview ||
          " "
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log(error);
          console.log("Cannot Found Trailer");
        });
    }
  };

  return (
    <div className={classes.row}>
      <h2>{props.title}</h2>
      <div className={classes["row_posters"]}>
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`${classes["row_poster"]} ${
                props.isLargeRow && classes["row_posterLarge"]
              }`}
              src={`${imgURL}${
                props.isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && (
        <button className={classes.close} onClick={handleClick}>
          Close
        </button>
      )}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
