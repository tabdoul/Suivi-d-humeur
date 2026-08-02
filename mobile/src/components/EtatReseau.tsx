import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { StatutReseau } from "../types/typeHumeur";
import { couleurs } from "../theme/couleurs";

interface EtatReseauProps {
  statut: StatutReseau;
  messageErreur: string | null;
  onReessayer: () => void;
  aDesDonnees: boolean;
  children: ReactNode;
}

// EtatReseau
export function EtatReseau({ statut, messageErreur, onReessayer, aDesDonnees, children }: EtatReseauProps) {
  if (statut === "chargement" && !aDesDonnees) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color={couleurs.principal} />
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
    color: couleurs.texteAttenue,
  },
  texteErreur: {
    color: couleurs.erreur,
    textAlign: "center",
    marginBottom: 16,
  },
  boutonReessayer: {
    backgroundColor: couleurs.principal,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  texteBoutonReessayer: {
    color: couleurs.texteSurPrincipal,
    fontWeight: "600",
  },
  bandeauAvertissement: {
    backgroundColor: couleurs.erreurFond,
    padding: 10,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  texteAvertissement: {
    color: couleurs.erreur,
    fontSize: 12,
  },
  lienReessayer: {
    color: couleurs.erreur,
    fontWeight: "700",
    fontSize: 12,
    marginTop: 4,
  },
});