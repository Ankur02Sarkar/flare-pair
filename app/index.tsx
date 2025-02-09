import React from "react";
import { View } from "react-native";
import HomePage from "~/components/HomePage";

const Screen: React.FC = () => {
  // State to control whether the loader is displayed.

  return (
    <View style={{ flex: 1 }}>
      <HomePage />
    </View>
  );
};

export default Screen;
