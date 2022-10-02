import { useEffect, useState } from "react";
import requests from "../requests";
import axios from "axios";
import classes from "./Banner.module.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const Banner = () => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const apiURL =
      "https://api.themoviedb.org/3" + requests.fetchNetflixOriginals;
    async function fetchData() {
      const request = await axios.get(apiURL);
      setMovie(request.data.results[3]);
      return request;
    }
    fetchData();
  }, []);

  let truncate = (str = "Movie Description", length) => {
    var dots = str.length > length ? "..." : "";
    return str.substring(0, length) + dots;
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

  let screenWidth = window.screen.width;
  const opts = {
    height: screenWidth >= 750 ? "550" : "270",
    width: screenWidth >= 750 ? "100%" : "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <header
        className={classes.banner}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className={classes["banner_contents"]}>
          <h1 className={classes["banner_title"]}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className={classes["banner_buttons"]}>
            <button
              className={classes["banner_button"]}
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button className={classes["banner_button"]}>My List</button>
          </div>
          <h1 className={classes["banner_description"]}>
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className={classes["banner--fadeBottom"]} />
      </header>
      {trailerUrl && (
        <button className={classes.close} onClick={handleClick}>
          Close
        </button>
      )}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Banner;
