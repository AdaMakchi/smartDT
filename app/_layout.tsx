import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider } from './(auth)/AuthProvider';
import { useAuth } from './(auth)/useAuth';

const AuthLayout = () => {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedGroup = segments[0] === '(protected)';

    if (!user && inProtectedGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/(protected)');
    }
  }, [user, isLoading, segments]);

  return null;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <AuthLayout />
        <Stack>
          {/* Public routes */}
          <Stack.Screen
            name="login"
            options={{
              title: 'Login',
              headerShown: false
            }}
          />
          
          {/* Protected routes */}
          <Stack.Screen 
            name="(protected)" 
            options={{ 
              headerShown: false 
            }} 
          />
          
          {/* Fallback route */}
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}