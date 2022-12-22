import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Home from "../screen/Home";
import Detail from "../screen/Detail";
import Splash from "../screen/Splash";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootRouter;
