import { SET_MOVIES,  SET_SELECTED_MOVIE, SET_CINEMAS, SET_SCHEDULE} from "./action";
import { produce } from "immer";
import { useState } from "react";


const initialState = {
  movies: null,
  selectedMovie: null,
  cinemas: null,
  schedule: null,
  checkSubmitUpdateFilm: true,
};

// shallow
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
      });
      return nextState;
    }

    case SET_SELECTED_MOVIE: {
      const nextState = produce(state, (draft) => {
        draft.selectedMovie = action.payload;
      });
      return nextState;
    }

    case SET_CINEMAS: {
      const nextState = produce(state, (draft) => {
        draft.cinemas = action.payload;
      });
      return nextState;
    }

    case SET_SCHEDULE: {
      const nextState = produce(state, (draft) => {
        draft.schedule = action.payload[0];
      });
      return nextState;
    }

    default:
      return state;
  }
};

export default reducer;
