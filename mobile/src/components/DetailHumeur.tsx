import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COULEURS_HUMEUR, ICONES_HUMEUR } from "../theme/styleHumeur";
import { couleurs } from "../theme/couleurs";
import { EntreeHumeur, LIBELLES_HUMEUR } from "../types/typeHumeur";
import { formaterDate } from "../utils/formatDate";

interface DetailHumeurProps {
  humeur: EntreeHumeur | null;
  onFermer: () => void;
}

export function DetailHumeur({ humeur, onFermer }: DetailHumeurProps) {
  const estVisible = humeur !== null;
  const couleur = humeur ? COULEURS_HUMEUR[humeur.humeur] : couleurs.principal;

  return (
    <Modal visible={estVisible} transparent animationType="fade" onRequestClose={onFermer}>
      <Pressable style={styles.fond} onPress={onFermer}>
        <Pressable style={styles.carte} onPress={(e) => e.stopPropagation()}>
          <Pressable style={styles.boutonFermer} onPress={onFermer}>
            <Ionicons name="close" size={18} color={couleurs.texteAttenue} />
          </Pressable>

          {humeur && (
            <>
              <View style={[styles.cercleIcone, { backgroundColor: `${couleur}26` }]}>
                <Ionicons name={ICONES_HUMEUR[humeur.humeur] as any} size={48} color={couleur} />
              </View>
              <Text style={[styles.libelle, { color: couleur }]}>{LIBELLES_HUMEUR[humeur.humeur]}</Text>
              <Text style={styles.date}>{formaterDate(humeur.date)}</Text>

              {humeur.raison && (
                <View style={styles.blocRaison}>
                  <Text style={styles.texteRaison}>{humeur.raison}</Text>
                </View>
              )}
            </>
          )}

          <Pressable style={styles.boutonFermerBas} onPress={onFermer}>
            <Text style={styles.texteBoutonFermerBas}>Fermer</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  carte: {
    backgroundColor: couleurs.surface,
    borderRadius: 22,
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 28,
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
  },
  boutonFermer: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: couleurs.fond,
    alignItems: "center",
    justifyContent: "center",
  },
  cercleIcone: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  libelle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: couleurs.texteAttenue,
    marginBottom: 4,
  },
  blocRaison: {
    backgroundColor: couleurs.fond,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    marginBottom: 18,
    width: "100%",
  },
  texteRaison: {
    fontSize: 13,
    color: couleurs.texte,
    textAlign: "center",
    lineHeight: 18,
  },
  boutonFermerBas: {
    width: "100%",
    backgroundColor: couleurs.fond,
    borderWidth: 0.5,
    borderColor: couleurs.bordure,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  texteBoutonFermerBas: {
    fontSize: 14,
    fontWeight: "500",
    color: couleurs.texte,
  },
});