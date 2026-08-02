import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProviderHumeurs } from "./src/contexts/ContexteHumeurs";
import { Navigation } from "./src/navigation/Navigation";
import { couleurs } from "./src/theme/couleurs";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [pret, setPret] = useState(false);

  useEffect(() => {
    setPret(true);
  }, []);

  const surLayoutRacine = useCallback(async () => {
    if (pret) {
      // Cache le splash une fois que le premier rendu de l'app a eu lieu.
      await SplashScreen.hideAsync();
    }
  }, [pret]);

  if (!pret) {
    return null; // le splash natif reste affiche tant qu'on n'est pas "pret"
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={surLayoutRacine}>
        <StatusBar barStyle="dark-content" backgroundColor={couleurs.fond} />
        <ProviderHumeurs>
          <Navigation />
        </ProviderHumeurs>
      </View>
    </SafeAreaProvider>
  );
}