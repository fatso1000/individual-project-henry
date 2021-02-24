import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./landing.css"
import videogameImg from "../../public/videogame.png"

export default class index extends Component {
  render() {
    return (
      <div className="page__leader">
        <div className="container display">
          <div className="page__head">
            <NavLink to="/home" className="landing__title header__item-link header-logo">GO HOME</NavLink>
          </div>
          <div>
            <img className="landing__img" src={videogameImg} alt="presentation"></img>
          </div>
        </div>
      </div>
    );
  }
}
