import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./landing.css"

export default class index extends Component {
  render() {
    return (
      <div className="page__leader">
        <div className="container">
          <div className="page__head">
            <NavLink to="/home" className="landing__title header__item-link header-logo">GO HOME</NavLink>
          </div>
        </div>
      </div>
    );
  }
}
