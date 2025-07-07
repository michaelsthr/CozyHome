import { SessionProvider } from '@/lib/context/SessionContext';
import { Slot, useRouter, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSession } from '@/lib/context/SessionContext';

function ProtectedLayout() {
  const { user } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null && !pathname.startsWith('/(auth)')) {
      router.replace('/(auth)/login');
    }
  }, [user, pathname]);

  if (user === null && !pathname.startsWith('/(auth)')) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}