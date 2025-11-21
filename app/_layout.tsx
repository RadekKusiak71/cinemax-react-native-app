import { AuthProvider, useAuth } from "@/context/auth-context";
import { CinemaProvider } from "@/context/cinema-context";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Stack } from "expo-router";


const Layout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="cinema-select" options={{ headerShown: false }} />

    </Stack>
  )
}

export default function RootLayout() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CinemaProvider>
          <Layout />
        </CinemaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
