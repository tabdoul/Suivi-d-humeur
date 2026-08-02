import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { StatutReseau } from "../types/typeHumeur";

interface EtatReseauProps {
  statut: StatutReseau;
  messageErreur: string | null;
  onReessayer: () => void;
  aDesDonnees: boolean; // true si on a deja des humeurs a afficher, meme en cas d'erreur
  children: ReactNode; // le contenu a afficher si tout va bien (la liste des humeurs)
}


export function EtatReseau({ statut, messageErreur, onReessayer, aDesDonnees, children }: EtatReseauProps) {
  if (statut === "chargement" && !aDesDonnees) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color="#2E6BE6" />
        <Text style={styles.texteAttenue}>Chargement de l'historique...</Text>
      </View>
    );
  }

  if (statut === "erreur" && !aDesDonnees) {
    return (
      <View style={styles.centre}>
        <Text style={styles.texteErreur}>{messageErreur ?? "Une erreur est survenue."}</Text>
        <Pressable style={styles.boutonReessayer} onPress={onReessayer}>
          <Text style={styles.texteBoutonReessayer}>Reessayer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {statut === "erreur" && aDesDonnees && (
        <View style={styles.bandeauAvertissement}>
          <Text style={styles.texteAvertissement}>
            Donnees non a jour (probleme reseau). {messageErreur}
          </Text>
          <Pressable onPress={onReessayer}>
            <Text style={styles.lienReessayer}>Reessayer</Text>
          </Pressable>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  texteAttenue: {
    marginTop: 12,
    color: "#6B7280",
  },
  texteErreur: {
    color: "#D64545",
    textAlign: "center",
    marginBottom: 16,
  },
  boutonReessayer: {
    backgroundColor: "#2E6BE6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  texteBoutonReessayer: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  bandeauAvertissement: {
    backgroundColor: "#FDEDEC",
    padding: 10,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  texteAvertissement: {
    color: "#D64545",
    fontSize: 12,
  },
  lienReessayer: {
    color: "#D64545",
    fontWeight: "700",
    fontSize: 12,
    marginTop: 4,
  },
});