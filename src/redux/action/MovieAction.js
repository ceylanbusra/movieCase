import axios from "axios";
import { Alert } from "react-native";

export const getMovie = (data, page) => {
  console.log("gelen değerler data :", data, "page", page);
  return (dispatch) => {
    dispatch({ type: "MOVIE_SEARCH_REQUEST" }),
      // .get(`http://www.omdbapi.com/?apikey=4c8e58fe&s=star war&page=1`)
      axios
        .get(`http://www.omdbapi.com/?apikey=4c8e58fe&s=${data}&page=${page}`)
        .then((res) => {
          const movieButton = res.data.Search.filter(
            (item) => item.Type === "movie"
          );
          dispatch({ type: "MOVIE_SEARCH_SUCCESS", payload: res.data.Search });
          console.log(res.data, "response.data");
          dispatch({
            type: "MOVIE_BUTTON_SUCCESS",
            payload: movieButton,
          });
        })
        .catch((err) => {
          console.error("get ile gelen error", err);
          Alert.alert("Maalesef isteğinizi şu an gerçekleştiremiyoruz..");
        });
  };
};

export const getMovieDetail = (id) => {
  return (dispatch) => {
    dispatch({ type: "MOVIE_DETAIL_REQUEST" }),
      // .get(`http://www.omdbapi.com/?apikey=4c8e58fe&s=star war&page=1`)
      axios
        .get(`http://www.omdbapi.com/?apikey=4c8e58fe&i=${id}`)
        .then((res) => {
          dispatch({ type: "MOVIE_DETAIL_SUCCESS", payload: res.data });
          console.log(res.data, "response.data");
        })
        .catch((err) => {
          console.error("get ile gelen error", err);
          Alert.alert("Maalesef isteğinizi şu an gerçekleştiremiyoruz..");
        });
  };
};
