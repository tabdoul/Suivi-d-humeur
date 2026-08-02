import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelecteurHumeur } from "../components/SelecteurHumeur";
import { SuggestionsRaison } from "../components/SuggestionsRaison";
import { useSuiviHumeurContext } from "../contexts/ContexteHumeurs";
import { citationDuJour } from "../theme/citations";
import { couleurs } from "../theme/couleurs";
import { SUGGESTIONS_RAISON } from "../theme/suggestionsRaison";
import { NiveauHumeur } from "../types/typeHumeur";

export function EcranAujourdhui() {
  const { enEnvoi, ajouterHumeur } = useSuiviHumeurContext();
  const [valeurChoisie, setValeurChoisie] = useState<NiveauHumeur | null>(null);
  const [raison, setRaison] = useState("");
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [citation] = useState(citationDuJour);

  const validerHumeur = async () => {
    if (valeurChoisie === null) return;
    setConfirmation(null);
    const succes = await ajouterHumeur(valeurChoisie, raison);
    if (succes) {
      setConfirmation("Humeur enregistree, merci !");
      setValeurChoisie(null);
      setRaison("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.conteneur}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        style={styles.conteneur}
        contentContainerStyle={styles.contenu}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titre}>Mon humeur du jour</Text>
        <Text style={styles.sousTitre}>Comment vous sentez-vous aujourd'hui ?</Text>

        <View style={styles.carteCitation}>
          <Ionicons name="chatbox-ellipses-outline" size={16} color={couleurs.succes} />
          <Text style={styles.texteCitation}>{citation}</Text>
        </View>

        <SelecteurHumeur value={valeurChoisie} onChange={setValeurChoisie} disabled={enEnvoi} />

        {valeurChoisie !== null && (
          <SuggestionsRaison
            suggestions={SUGGESTIONS_RAISON[valeurChoisie]}
            onChoix={setRaison}
          />
        )}

        <TextInput
          style={styles.champRaison}
          placeholder="Pourquoi cette humeur ? (facultatif)"
          placeholderTextColor={couleurs.texteAttenue}
          value={raison}
          onChangeText={setRaison}
          editable={!enEnvoi}
          multiline
          maxLength={200}
        />

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },
  contenu: {
    paddingTop: 90,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  titre: {
    fontSize: 20,
    fontWeight: "700",
    color: couleurs.texte,
  },
  sousTitre: {
    fontSize: 13,
    color: couleurs.texteAttenue,
    marginTop: 4,
    marginBottom: 14,
  },
  carteCitation: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: `${couleurs.succes}1A`,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  texteCitation: {
    flex: 1,
    fontSize: 12,
    fontStyle: "italic",
    color: couleurs.succes,
    lineHeight: 17,
  },
  champRaison: {
    backgroundColor: couleurs.surface,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: couleurs.texte,
    minHeight: 60,
    textAlignVertical: "top",
    marginTop: 14,
    marginBottom: 14,
  },
  boutonValider: {
    backgroundColor: couleurs.principal,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  boutonValiderDesactive: {
    opacity: 0.5,
  },
  texteBoutonValider: {
    color: couleurs.texteSurPrincipal,
    fontWeight: "700",
    fontSize: 14,
  },
  texteConfirmation: {
    textAlign: "center",
    color: couleurs.succes,
    marginTop: 10,
  },
});