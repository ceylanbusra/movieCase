import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { useDispatch } from "react-redux";

import LottieView from "lottie-react-native";
const Splash = ({ navigation }) => {
  const dispatch = useDispatch();
  setTimeout(() => {
    navigation.navigate("Home");
    dispatch({ type: "MOVIE_LIST_RESET" });
  }, 3000);
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={{ justifyContent: "center", alignItems: "center" }}
        source={require("../../assets/splash.movie.json")}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: "white",
  },
});
