import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomePage: React.FC = () => (
  <LinearGradient
    colors={["#f2665e", "#e2203f"]}
    className="flex-1 justify-center items-center p-4"
  >
    <Text className="text-[4rem] font-bold text-gray-200 mb-4">FlarePair</Text>
  </LinearGradient>
);

export default HomePage;
