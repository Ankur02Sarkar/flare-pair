import React, { useState, useEffect, useRef } from "react";
import { AppState, View } from "react-native";
import HomePage from "~/components/HomePage";
import IntroLoader from "~/components/IntroLoader";

const Screen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef<string>(AppState.currentState);

  useEffect(() => {
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
    showLoader();

    return () => {
      subscription.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showLoader = () => {
    setIsLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <View className="flex-1">{isLoading ? <IntroLoader /> : <HomePage />}</View>
  );
};

export default Screen;
