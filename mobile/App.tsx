import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ProviderHumeurs } from "./src/contexts/ContexteHumeurs";
import { EcranHumeur } from "./src/screens/EcranHumeur";

export default function App() {
  return (
    <SafeAreaView style={styles.zoneSure}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
      <ProviderHumeurs>
        <EcranHumeur />
      </ProviderHumeurs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  zoneSure: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
});