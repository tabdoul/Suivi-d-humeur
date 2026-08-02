import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COULEURS_HUMEUR, ICONES_HUMEUR } from "../theme/styleHumeur";
import { couleurs } from "../theme/couleurs";
import { EntreeHumeur, LIBELLES_HUMEUR } from "../types/typeHumeur";
import { formaterDate } from "../utils/formatDate";

interface ListeHumeursProps {
  humeurs: EntreeHumeur[];
}

            // ListeHumeurs
export function ListeHumeurs({ humeurs }: ListeHumeursProps) {
  if (humeurs.length === 0) {
    return (
      <View style={styles.vide}>
        <Text style={styles.texteVide}>Aucune humeur enregistree pour l'instant.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={humeurs}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.liste}
      renderItem={({ item }) => {
        const couleur = COULEURS_HUMEUR[item.humeur];
        return (
          <View style={styles.ligne}>
            <View style={[styles.cercleIcone, { backgroundColor: `${couleur}1A` }]}>
              <Ionicons name={ICONES_HUMEUR[item.humeur] as any} size={22} color={couleur} />
            </View>
            <View style={styles.colonneTexte}>
              <Text style={styles.libelle}>{LIBELLES_HUMEUR[item.humeur]}</Text>
              <Text style={styles.date}>{formaterDate(item.date)}</Text>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  liste: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: couleurs.surface,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: couleurs.bordure,
  },
  cercleIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  colonneTexte: {
    flex: 1,
  },
  libelle: {
    fontSize: 15,
    fontWeight: "600",
    color: couleurs.texte,
  },
  date: {
    fontSize: 12,
    color: couleurs.texteAttenue,
    marginTop: 2,
  },
  vide: {
    padding: 24,
    alignItems: "center",
  },
  texteVide: {
    color: couleurs.texteAttenue,
  },
});