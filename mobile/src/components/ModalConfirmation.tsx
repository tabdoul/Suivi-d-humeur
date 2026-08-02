import React, { useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { couleurs } from "../theme/couleurs";

interface ModalConfirmationProps {
  visible: boolean;
  message: string;
  onFermer: () => void;
  dureeMs?: number; // duree d'affichage avant fermeture automatique
}

export function ModalConfirmation({ visible, message, onFermer, dureeMs = 1600 }: ModalConfirmationProps) {
  useEffect(() => {
    if (!visible) return;
    const minuteur = setTimeout(onFermer, dureeMs);
    return () => clearTimeout(minuteur);
  }, [visible, dureeMs, onFermer]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.fond}>
        <View style={styles.carte}>
          <View style={styles.cercleIcone}>
            <Ionicons name="checkmark" size={28} color={couleurs.succes} />
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
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
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 220,
    alignItems: "center",
  },
  cercleIcone: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: `${couleurs.succes}26`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    color: couleurs.texte,
    textAlign: "center",
  },
});