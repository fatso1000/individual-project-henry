import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

export default function NavBar() {
  return (
    <header className="header page__header">
      <div className="header__item">
        <NavLink className="header__item-link header-logo" to="/">
          <div className="logo">RAWG API</div>
        </NavLink>
      </div>

      <div className="header__item">
        <NavLink className="header__item-link header-logo" to="/videogame">
          <div className="logo">Videogame</div>
        </NavLink>
      </div>
      <div className="header__item">
        <NavLink className="header__item-link header-logo" to="/home">
          <div className="logo">Home</div>
        </NavLink>
      </div>
    </header>
  );
}
