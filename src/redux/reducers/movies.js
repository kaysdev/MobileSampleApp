import * as type from "../types";

//initialize state
const initialState = {
  movies: [],
  loading: false,
  error: null
};

//change state based on call
export default function movies(state = initialState, action) {
  switch (action.type) {
    case type.GET_MOVIES_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case type.GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movies
      };
    case type.GET_MOVIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message
      };
    default:
      return state;
  }
}
