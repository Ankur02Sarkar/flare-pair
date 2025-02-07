import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text } from "react-native";

export default function Example() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  if (!isSignedIn) {
    return <Text>Sign in to view this page</Text>;
  }

  return <Text>Hello {user.firstName}!</Text>;
}
