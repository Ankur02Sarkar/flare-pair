import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  AppState,
  Dimensions,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { SupabaseProvider } from "~/context/supabase-provider";
import IntroLoader from "~/components/IntroLoader";
import "~/global.css";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

// A helper for using layout effect on native and web
const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  // Loader state and refs
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef<string>(AppState.currentState);
  const loaderAnim = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get("window").height;

  // Run once when the layout mounts to do initial setup (fonts, navigation bar, etc.)
  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;
    if (Platform.OS === "web") {
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  // Function to start the loader animation and hide it after a delay.
  const showLoader = () => {
    loaderAnim.setValue(0);
    setIsLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      Animated.timing(loaderAnim, {
        toValue: -windowHeight,
        duration: 500, // adjust duration as needed
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    }, 1500);
  };

  // Set up an effect so that when the app becomes active again, the loader is shown.
  useEffect(() => {
    showLoader(); // show loader on initial mount
    const handleAppStateChange = (nextAppState: string) => {
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
    return () => {
      subscription.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <SupabaseProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        {/* Wrap your navigator and any global elements in a container */}
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Your screens will be rendered here by Expo Router */}
          </Stack>
          {/* Render the loader overlay if active */}
          {isLoading && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                { transform: [{ translateY: loaderAnim }] },
              ]}
            >
              <IntroLoader />
            </Animated.View>
          )}
          <PortalHost />
        </View>
      </ThemeProvider>
    </SupabaseProvider>
  );
}
