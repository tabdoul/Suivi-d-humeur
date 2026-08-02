import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { couleurs } from "../theme/couleurs";

interface SuggestionsRaisonProps {
  suggestions: string[];
  onChoix: (texte: string) => void;
}

export function SuggestionsRaison({ suggestions, onChoix }: SuggestionsRaisonProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.rangee}
      style={styles.conteneur}
    >
      {suggestions.map((texte) => (
        <Pressable key={texte} onPress={() => onChoix(texte)} style={styles.puce}>
          <Text style={styles.textePuce}>{texte}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    marginBottom: 10,
  },
  rangee: {
    gap: 6,
  },
  puce: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    backgroundColor: couleurs.surface,
  },
  textePuce: {
    fontSize: 11,
    color: couleurs.texte,
  },
});