import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { getMovie } from "../redux/action/MovieAction";

const numColumns = 2;

const Home = (props) => {
  const [selected, setSelected] = useState(null);
  const [movieFilter, setMovieFilter] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [refresing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { movies, movieButton } = useSelector((state) => state.movie);
  useEffect(() => {
    setList(movies);
  }, [movies, movieButton]);

  console.log("movies", movies);

  console.log(value);

  const moviesFilter = () => {
    console.log("buraya geliyor mu");
    console.log("set List", list);

    list.push(movieButton);
  };

  const renderItem = (item, index) => {
    return (
      <View style={styles.listWrapper} key={index}>
        <View style={styles.itemWrapper}>
          <TouchableOpacity
            onPress={() => {
              console.log(item, ":item");

              console.log("basıldı ve teiklendi");
              let id = item.imdbID;
              setSelected(id), console.log(selected, "aa");

              props.navigation.navigate("Detail", { id });
            }}
            flex
            style={styles.item}
          >
            <View style={styles.itemInnerContainer}>
              <Image style={styles.Image} source={{ uri: item.Poster }} />
              <View>
                <Text numberOfLines={2} style={styles.title}>
                  {item.Title}
                </Text>
                <View style={styles.yearTypeWrapper}>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {item.Year}
                  </Text>
                  <Text style={{ color: "white", fontSize: 15 }}>
                    {item.Type}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const oncekiSayfa = () => {
    setPage(page === 1 ? page : page + -1);
    console.log(page, "page azaltıldı");
    dispatch(getMovie(value, page));
  };
  const sonrakiSayfa = () => {
    setPage(page === 100 ? page : page + 1);
    console.log("page:", page);
    dispatch(getMovie(value, page));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ara..."
            value={value}
            onChangeText={(text) => setValue(text)}
            onSubmitEditing={(value) => {
              setValue(value);
              if (movies !== undefined) {
                setButtonVisible(true);
                console.log(buttonVisible);
              }
            }}
          />
          <TouchableOpacity
            style={{ alignSelf: "center", paddingRight: 15 }}
            onPress={() => {
              dispatch(getMovie(value, page));
            }}
          >
            <FontAwesome5 name="search" size={25} />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView horizontal={true}>
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={() => {
                moviesFilter();
              }}
            >
              <Text style={styles.scrollText}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scrollButton}>
              <Text style={styles.scrollText}>Episode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scrollButton}>
              <Text style={styles.scrollText}>Series</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scrollButton}>
              <Text style={styles.scrollText}>2022 years</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {list !== undefined ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refresing}
                onRefresh={() => dispatch(getMovie(value, page))}
                tintColor="black"
              />
            }
          >
            {list?.map((item, index) => renderItem(item, index))}
          </ScrollView>
        ) : (
          <Text>Henüz Dizi-film aramadınız..</Text>
        )}
        {value.length !== 0 ? (
          <TouchableOpacity
            style={styles.leftButton}
            onPress={() => {
              oncekiSayfa();
            }}
          >
            <FontAwesome5
              name="arrow-circle-left"
              size={40}
              color={"#003865"}
            />
          </TouchableOpacity>
        ) : null}

        {value.length !== 0 ? (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => {
              sonrakiSayfa();
            }}
          >
            <FontAwesome5
              name="arrow-circle-right"
              size={40}
              color={"#003865"}
            />
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Image: {
    resizeMode: "stretch",
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  TextInput: {
    backgroundColor: "#eaeaea",
    borderRadius: 5,
    marginTop: 8,
    margin: 8,
    padding: 15,
    width: Dimensions.get("window").width * 0.85,
  },

  title: {
    fontWeight: "500",
    padding: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    fontSize: 18,
    color: "black",
  },
  scrollButton: {
    padding: 10,
    backgroundColor: "#003865",
    paddingHorizontal: 20,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  scrollText: {
    color: "white",
    fontSize: 15,
  },
  textInputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    left: 25,
    bottom: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    right: 25,
    bottom: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  listWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemWrapper: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  item: {
    borderRadius: 12,
    backgroundColor: "#87A2FB",
    padding: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //maxHeight: height / 1.2,
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  itemInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  yearTypeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 12,
  },
});
