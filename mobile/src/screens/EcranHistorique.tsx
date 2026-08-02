import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EtatReseau } from "../components/EtatReseau";
import { ListeHumeurs } from "../components/ListeHumeurs";
import { useSuiviHumeurContext } from "../contexts/ContexteHumeurs";
import { couleurs } from "../theme/couleurs";


export function EcranHistorique() {
  const { humeurs, statut, messageErreur, rafraichir } = useSuiviHumeurContext();

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Historique</Text>
      <EtatReseau
        statut={statut}
        messageErreur={messageErreur}
        onReessayer={rafraichir}
        aDesDonnees={humeurs.length > 0}
      >
        <ListeHumeurs humeurs={humeurs} />
      </EtatReseau>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: couleurs.fond,
    paddingTop: 24,
  },
  titre: {
    fontSize: 22,
    fontWeight: "700",
    color: couleurs.texte,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});