import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SelecteurHumeur } from "./src/components/SelecteurHumeur";
import { NiveauHumeur } from "./src/types/typeHumeur";

export default function App() {
  const [valeur, setValeur] = useState<NiveauHumeur | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <SelecteurHumeur value={valeur} onChange={setValeur} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});