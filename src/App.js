import React  from "react";
import "./App.css";
import requests from "./requests";
import Row from "./components/Row";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Banner/>
      <Row title = "NETFLIX ORIGINALS"  fetchURL = {requests.fetchNetflixOriginals} isLargeRow={true}/>
      <Row title = "Top Rated" fetchURL = {requests.fetchTopRated}/>
      <Row title = "Action Movies" fetchURL = {requests.fetchActionMovies}/>
      <Row title = "Comedy Movies" fetchURL = {requests.fetchComedyMovies}/>
      <Row title = "Horror Movies" fetchURL = {requests.fetchHorrorMovies}/>
      <Row title = "Romance Movies" fetchURL = {requests.fetchRomanceMovies}/>
      <Row title = "Documantary Movies" fetchURL = {requests.fetchDocumantaries}/>
    </div>
  );
};

export default App;
