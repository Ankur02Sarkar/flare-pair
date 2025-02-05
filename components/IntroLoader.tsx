import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

const IntroLoader: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <ActivityIndicator size="large" className="text-blue-500" />
    <Text className="mt-4 text-lg text-gray-600">Loading...</Text>
  </View>
);

export default IntroLoader;
