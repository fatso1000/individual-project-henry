import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import Navbar from "./index";

describe("<Navbar /> Mounted", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });
  it("Deberia renderizar Tres <Link />", () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
  it("El primer NavLink debe de contener el texto 'RAWG API' y cambiar la ruta hacia '/'.", () => {
    expect(wrapper.find(NavLink).at(0).prop("to")).toEqual("/");
    expect(wrapper.find(NavLink).at(0).text()).toEqual("RAWG API");
  });
  it("El segundo NavLink debe de contener el texto 'Videogame' y cambiar la ruta hacia '/videogame'.", () => {
    expect(wrapper.find(NavLink).at(1).prop("to")).toEqual("/videogame");
    expect(wrapper.find(NavLink).at(1).text()).toEqual("Videogame");
  });
  it("El tercer NavLink debe de contener el texto 'Home' y cambiar la ruta hacia '/home'.", () => {
    expect(wrapper.find(NavLink).at(2).prop("to")).toEqual("/home");
    expect(wrapper.find(NavLink).at(2).text()).toEqual("Home");
  });
});
