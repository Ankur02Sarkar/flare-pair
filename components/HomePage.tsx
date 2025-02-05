import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { LinearGradient } from "react-native-svg";

export default function HomePage() {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize,
            color: "white",
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: "Pacifico_400Regular",
          }}
        >
          Pacifico Regular
        </Text>
      </View>
    );
  }
}
