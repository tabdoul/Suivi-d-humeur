import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProviderHumeurs } from "./src/contexts/ContexteHumeurs";
import { Navigation } from "./src/navigation/Navigation";
import { couleurs } from "./src/theme/couleurs";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={couleurs.fond} />
      <ProviderHumeurs>
        <Navigation />
      </ProviderHumeurs>
    </SafeAreaProvider>
  );
}