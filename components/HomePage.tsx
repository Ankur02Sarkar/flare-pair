import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage() {
  // Load the Pacifico font
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  // Create an animated value for the scaling effect
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Animate with a bounce effect
  useEffect(() => {
    Animated.sequence([
      // Animate from 0 to 1.2 (overshoot)
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      // Bounce back to 1
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient
      colors={["#f2665e", "#e2203f"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Animated.Text
        style={{
          fontSize: 60,
          paddingVertical: 6,
          color: "white",
          fontFamily: "Pacifico_400Regular",
          transform: [{ scale: scaleAnim }],
        }}
      >
        FlarePair
      </Animated.Text>
    </LinearGradient>
  );
}
