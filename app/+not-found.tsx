import { Link, Stack, usePathname } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  const pathname = usePathname();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 justify-center items-center bg-gray-900 p-4">
        <Text>This screen doesn't exist.</Text>

        <Text>
          Pathname was: <Text>{pathname}</Text>
        </Text>

        <Link href="/" className="font-bold">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
