import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ProviderHumeurs } from "./src/contexts/ContexteHumeurs";
import { EcranAujourdhui } from "./src/screens/EcranAujourdhui";
import { couleurs } from "./src/theme/couleurs";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.zoneSure}>
        <StatusBar barStyle="dark-content" backgroundColor={couleurs.fond} />
        <ProviderHumeurs>
          <EcranAujourdhui />
        </ProviderHumeurs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  zoneSure: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },
});