import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { LinearGradient } from "expo-linear-gradient";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function HomePage() {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fontsLoaded, scaleAnim]);

  // While fonts aren't loaded, render nothing (splash screen remains visible)
  if (!fontsLoaded) {
    return null;
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
