import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import LandingPage from "./components/landingpage";
import CreateVideogame from "./components/createvideogame"
import DetailGame from "./components/detailgame"

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route exact path="/videogame" component={CreateVideogame} />
      <Route path="/videogame/:name" component={DetailGame} />
    </React.Fragment>
  );
}

export default App;
