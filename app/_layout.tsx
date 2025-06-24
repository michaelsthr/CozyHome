import { Redirect, Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  initialRouteName: "(group)/index",
};

export default function RootLayout() {
  return <Stack initialRouteName="(group)/index" />;
}
