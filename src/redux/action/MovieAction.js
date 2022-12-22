import axios from "axios";
import { Alert } from "react-native";

export const getMovie = (data, page) => {
  //("gelen değerler data :", data, "page", page);
  return (dispatch) => {
    dispatch({ type: "MOVIE_SEARCH_REQUEST" }),
      // .get(`http://www.omdbapi.com/?apikey=4c8e58fe&s=star war&page=1`)
      axios
        .get(`http://www.omdbapi.com/?apikey=4c8e58fe&s=${data}&page=${page}`)
        .then((res) => {
          const movieButton = res.data.Search.filter(
            (item) => item.Type === "movie"
          );
          const episodeButton = res.data.Search.filter(
            (item) => item.Type === "game"
          );
          const series = res.data.Search.filter(
            (item) => item.Type === "series"
          );
          dispatch({ type: "MOVIE_SEARCH_SUCCESS", payload: res.data.Search });
          //(res.data, "response.data");
          dispatch({
            type: "MOVIE_BUTTON_SUCCESS",
            payload: movieButton,
          });
          dispatch({
            type: "EPISODE_BUTTON_SUCCESS",
            payload: episodeButton,
          });
          dispatch({
            type: "SERIES_BUTTON_SUCCESS",
            payload: series,
          });
        })

        .catch((err) => {
          Alert.alert(
            "Aradığınız içerik maalesef bulunamadı.Lütfen farklı şekilde aramayı deneyiniz.."
          );
        });
  };
};

export const getMovieDetail = (id) => {
  return (dispatch) => {
    dispatch({ type: "MOVIE_DETAIL_REQUEST" }),
      axios
        .get(`http://www.omdbapi.com/?apikey=4c8e58fe&i=${id}`)
        .then((res) => {
          dispatch({ type: "MOVIE_DETAIL_SUCCESS", payload: res.data });
        })
        .catch((err) => {
          console.error("get ile gelen error", err);
          Alert.alert("Maalesef isteğinizi şu an gerçekleştiremiyoruz..");
        });
  };
};
