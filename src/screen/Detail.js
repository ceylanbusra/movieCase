import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetail } from "../redux/action/MovieAction";

const Detail = (props) => {
  const dispatch = useDispatch();
  const item = props.route.params;
  const id = item.id;

  const { movieDetail } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, []);
  useEffect(() => {}, [movieDetail]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ flex: 1 }}>
        {movieDetail !== undefined || movieDetail !== {} ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Image style={styles.Image} source={{ uri: movieDetail?.Poster }} />
            <View style={{ padding: 10, marginVertical: 10 }}>
              <Text style={styles.title}>{movieDetail?.Title}</Text>
              <View style={styles.container2}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.director}>Director:</Text>
                  <Text style={{ fontSize: 16 }}>{movieDetail?.Director}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.runTime}>Run Time:</Text>
                  <Text style={{ fontSize: 16 }}>{movieDetail?.Runtime}</Text>
                </View>
              </View>
              <Text style={styles.plot2}>Plot</Text>
              <Text style={styles.plot}>{movieDetail?.Plot}</Text>
            </View>
          </ScrollView>
        ) : (
          <LottieView
            style={{
              alignSelf: "center",
              width: 100,
              height: 100,
              marginTop: 10,
            }}
            source={require("../../assets/loading.json")}
            autoPlay
            loop
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Image: {
    resizeMode: "stretch",
    width: Dimensions.get("window").width / 1,
    height: Dimensions.get("window").height / 2.5,
    // width: "100%",
    // minHeight: "50%",
    backgroundColor: "white",
    alignSelf: "center",
  },
  title: {
    fontWeight: "500",
    padding: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    color: "black",
    textAlign: "center",
  },
  director: {
    fontSize: 16,
    fontWeight: "500",
    paddingRight: 6,
  },
  runTime: {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 6,
  },
  plot: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "justify",
  },
  plot2: {
    fontSize: 20,
    fontWeight: "500",
  },
  container2: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
