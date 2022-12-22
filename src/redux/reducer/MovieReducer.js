const initial_state = {
  movies: [],
  movieDetail: {},
  movieButton: [],
  gameButton: [],
  seriesButton: [],
  yearButton: [],
};
const MovieReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "MOVIE_SEARCH_SUCCESS":
      return {
        ...state,
        movies: action.payload,
      };
    case "MOVIE_DETAIL_SUCCESS":
      return {
        ...state,
        movieDetail: action.payload,
      };
    case "MOVIE_BUTTON_SUCCESS":
      return {
        ...state,
        movieButton: action.payload,
      };

    case "EPISODE_BUTTON_SUCCESS":
      return {
        ...state,
        gameButton: action.payload,
      };
    case "SERIES_BUTTON_SUCCESS":
      return {
        ...state,
        seriesButton: action.payload,
      };

    case "MOVIE_LIST_RESET":
      return {
        initial_state,
      };

    default:
      return state;
  }
};
export default MovieReducer;
