import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LIBELLES_HUMEUR, NiveauHumeur } from "../types/typeHumeur";
import { COULEURS_HUMEUR, ICONES_HUMEUR } from "../theme/styleHumeur";
import { couleurs } from "../theme/couleurs";

interface SelecteurHumeurProps {
  value: NiveauHumeur | null;
  onChange: (humeur: NiveauHumeur) => void;
  disabled?: boolean;
}

const NIVEAUX: NiveauHumeur[] = [1, 2, 3, 4, 5];

export function SelecteurHumeur({ value, onChange, disabled }: SelecteurHumeurProps) {
  return (
    <View style={styles.colonne}>
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
              styles.ligne,
              selected && { borderColor: couleur, backgroundColor: `${couleur}0D` },
              pressed && styles.lignePressee,
              disabled && styles.ligneDesactivee,
            ]}
          >
            <View style={[styles.cercleIcone, { backgroundColor: `${couleur}26` }]}>
              <Ionicons name={ICONES_HUMEUR[niveau] as any} size={19} color={couleur} />
            </View>
            <Text style={[styles.libelle, selected && { color: couleur, fontWeight: "700" }]}>
              {LIBELLES_HUMEUR[niveau]}
            </Text>
            {selected && <Ionicons name="checkmark" size={18} color={couleur} style={styles.coche} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  colonne: {
    gap: 8,
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: couleurs.surface,
    borderWidth: 1.5,
    borderColor: couleurs.bordure,
  },
  lignePressee: {
    opacity: 0.7,
  },
  ligneDesactivee: {
    opacity: 0.5,
  },
  cercleIcone: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  libelle: {
    fontSize: 14,
    fontWeight: "500",
    color: couleurs.texte,
  },
  coche: {
    marginLeft: "auto",
  },
});