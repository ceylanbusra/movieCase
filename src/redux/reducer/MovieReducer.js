const initial_state = {
  movies: [],
  movieDetail: {},
  movieButton: [],
};
const MovieReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "MOVIE_SEARCH_SUCCESS":
      return {
        ...state,
        movies: action.payload,

        // login: [...state.login, action.payload],
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

    case "MOVIE_LIST_RESET":
      return {
        initial_state,
      };

    default:
      return state;
  }
};
export default MovieReducer;
