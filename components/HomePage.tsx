import { View, Text } from "react-native";
import React from "react";

const HomePage: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-gray-50 p-4">
    <Text className="text-2xl font-bold text-gray-800 mb-4">Welcome Home!</Text>
    <Text className="text-gray-600 text-center">
      This is your main application screen
    </Text>
  </View>
);

export default HomePage;
