import React, { useState, useEffect, useRef } from "react";
import { Animated, AppState, Dimensions, StyleSheet, View } from "react-native";
import HomePage from "~/components/HomePage";
import IntroLoader from "~/components/IntroLoader";

const Screen: React.FC = () => {
  // State to control whether the loader is displayed.
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef<string>(AppState.currentState);

  // Animated value for the loader's Y position.
  const loaderAnim = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      // When the app comes to the foreground, show the loader again.
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        showLoader();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Show the loader when the component mounts.
    showLoader();

    return () => {
      subscription.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showLoader = () => {
    // Reset the animated value in case the loader is shown again.
    loaderAnim.setValue(0);
    setIsLoading(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Animate the loader sliding upward off-screen.
      Animated.timing(loaderAnim, {
        toValue: -windowHeight,
        duration: 500, // Adjust duration for a faster or slower slide
        useNativeDriver: true,
      }).start(() => {
        // Once the animation completes, remove the loader.
        setIsLoading(false);
      });
    }, 1500);
  };

  return (
    <View style={{ flex: 1 }}>
      <HomePage />
      {isLoading && (
        // Position the loader absolutely so it covers the HomePage.
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateY: loaderAnim }],
            },
          ]}
        >
          <IntroLoader />
        </Animated.View>
      )}
    </View>
  );
};

export default Screen;
