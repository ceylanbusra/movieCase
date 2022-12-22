import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Home from "../screen/Home";
import Detail from "../screen/Detail";
import Splash from "../screen/Splash";
import PreviosList from "../screen/PreviosList";

const Stack = createNativeStackNavigator();
const RootRouter = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerTitleStyle: {},
            headerLeft: () => <></>,
            headerTitleAlign: "center",
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="PreviousLit" component={PreviosList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootRouter;
