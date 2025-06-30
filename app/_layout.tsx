import { Redirect, Stack } from "expo-router";
import React from "react";
import { SessionProvider } from '@/lib/context/SessionContext';


export const unstable_settings = {
  initialRouteName: "(group)/index",
};

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack initialRouteName="(group)/index" />
    </SessionProvider>
  );
}
