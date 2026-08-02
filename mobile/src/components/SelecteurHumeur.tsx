import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LIBELLES_HUMEUR, NiveauHumeur } from "../types/typeHumeur";
import { COULEURS_HUMEUR, ICONES_HUMEUR } from "../theme/styleHumeur";


interface SelecteurHumeurProps {
  value: NiveauHumeur | null;
  onChange: (humeur: NiveauHumeur) => void;
  disabled?: boolean;
}

// La liste des 5 niveaux possibles, dans l'ordre d'affichage.
const NIVEAUX: NiveauHumeur[] = [1, 2, 3, 4, 5];

export function SelecteurHumeur({ value, onChange, disabled }: SelecteurHumeurProps) {
  return (
    <View style={styles.ligne}>
      {NIVEAUX.map((niveau) => {
        const selected = value === niveau;
        const couleur = COULEURS_HUMEUR[niveau];

        return (
          <Pressable
            key={niveau}
            accessibilityRole="button"
            accessibilityLabel={LIBELLES_HUMEUR[niveau]}
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(niveau)}
            style={({ pressed }) => [
              styles.bouton,
              selected && { borderColor: couleur, backgroundColor: `${couleur}1A` }, // 1A = 10% d'opacite en hexa
              pressed && styles.boutonPresse,
              disabled && styles.boutonDesactive,
            ]}
          >
            <Ionicons
              name={ICONES_HUMEUR[niveau] as any}
              size={26}
              color={selected ? couleur : "#9CA3AF"}
            />
            <Text style={[styles.libelle, selected && { color: couleur, fontWeight: "700" }]}>
              {LIBELLES_HUMEUR[niveau]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ligne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bouton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E4E7EC",
  },
  boutonPresse: {
    opacity: 0.7,
  },
  boutonDesactive: {
    opacity: 0.5,
  },
  libelle: {
    marginTop: 6,
    fontSize: 10,
    textAlign: "center",
    color: "#6B7280",
  },
});