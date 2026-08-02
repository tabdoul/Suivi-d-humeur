import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EtatReseau } from "../components/EtatReseau";
import { ListeHumeurs } from "../components/ListeHumeurs";
import { SelecteurHumeur } from "../components/SelecteurHumeur";
import { useSuiviHumeurContext } from "../contexts/ContexteHumeurs";
import { couleurs } from "../theme/couleurs";
import { NiveauHumeur } from "../types/typeHumeur";

export function EcranAujourdhui() {
  const { humeurs, statut, messageErreur, enEnvoi, rafraichir, ajouterHumeur } = useSuiviHumeurContext();
  const [valeurChoisie, setValeurChoisie] = useState<NiveauHumeur | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const validerHumeur = async () => {
    if (valeurChoisie === null) return;
    setConfirmation(null);
    const succes = await ajouterHumeur(valeurChoisie);
    if (succes) {
      setConfirmation("Humeur enregistree, merci !");
      setValeurChoisie(null);
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Mon humeur du jour</Text>
      <Text style={styles.sousTitre}>Comment vous sentez-vous aujourd'hui ?</Text>

      <SelecteurHumeur value={valeurChoisie} onChange={setValeurChoisie} disabled={enEnvoi} />

      <Pressable
        onPress={validerHumeur}
        disabled={valeurChoisie === null || enEnvoi}
        style={[
          styles.boutonValider,
          (valeurChoisie === null || enEnvoi) && styles.boutonValiderDesactive,
        ]}
      >
        <Text style={styles.texteBoutonValider}>{enEnvoi ? "Envoi..." : "Valider"}</Text>
      </Pressable>

      {confirmation && <Text style={styles.texteConfirmation}>{confirmation}</Text>}

      <Text style={styles.titreHistorique}>Historique</Text>
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
  },
  sousTitre: {
    fontSize: 14,
    color: couleurs.texteAttenue,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  boutonValider: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: couleurs.principal,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  boutonValiderDesactive: {
    opacity: 0.5,
  },
  texteBoutonValider: {
    color: couleurs.texteSurPrincipal,
    fontWeight: "700",
    fontSize: 15,
  },
  texteConfirmation: {
    textAlign: "center",
    color: couleurs.succes,
    marginTop: 10,
  },
  titreHistorique: {
    fontSize: 16,
    fontWeight: "700",
    color: couleurs.texte,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
});