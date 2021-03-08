import {
  ADD_VIDEOGAME,
  SEARCH_VIDEOGAME,
  GET_GENRES,
} from "../actiontypes/index";
import axios from "axios";

export function searchVideogame(payload) {
  // http://localhost:4040/v1/videogames/basic/
  // if the url has any param after basic, it will search by id
  // else if have a query by name of "name", it will search by name
  // and if don't have any param o query, it will search the first 15 games
  let url = `/api/v1/videogames/basic/`;
  if (payload.id) {
    url += `${payload.id}`;
  }

  return async function (dispatch) {
    return await axios
      .get(url, {
        params: {
          name: payload.name || payload.name === "" ? payload.name : payload,
          page: payload.page ? payload.page : "",
          local: payload.local ? payload.local : false,
        },
      })
      .then((json) => {
        dispatch({ type: SEARCH_VIDEOGAME, payload: json });
      });
  };
}

export function getGenres(payload) {
  const url = "/api/v1/genres/basic";
  return async function (dispatch) {
    return await axios.get(url).then((json) => {
      dispatch({ type: GET_GENRES, payload: json });
    });
  };
}

export function addVideogame(payload) {
  const url = "/api/v1/videogame/basic";
  const {
    name,
    description,
    releaseDate,
    rating,
    /*genres,*/ platforms,
  } = payload;

  console.log(name, description, releaseDate, rating, platforms);
  return function (dispatch) {
    return axios
      .post(url, { name, description, releaseDate, rating, platforms })
      .then((json) => {
        dispatch({ type: ADD_VIDEOGAME, payload: json });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
}
