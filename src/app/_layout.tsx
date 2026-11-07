import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão (Expo Starter)
      }}
    />
  );
}