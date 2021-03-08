import { GET_GENRES, SEARCH_VIDEOGAME } from "../actiontypes";
const initialState = {
  videogames: [],
  searchMsg: "",
  videogameDetail: {},
  genres: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_VIDEOGAME:
      return {
        ...state,
        videogames: action.payload.data.response,
        searchMsg: action.payload.data.msg,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload.data,
      };
    default:
      return state;
  }
}
