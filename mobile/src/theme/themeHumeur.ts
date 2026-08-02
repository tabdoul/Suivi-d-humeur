import { NiveauHumeur } from "../types/typeHumer";

// COULEURS_HUMEUR = la couleur associee a chaque niveau.

export const COULEURS_HUMEUR: Record<NiveauHumeur, string> = {
  1: "#E76F51",
  2: "#F4A261",
  3: "#E9C46A",
  4: "#8AB17D",
  5: "#2A9D8F",
};

// ICONES_HUMEUR = le nom de l'icone (Ionicons) pour chaque niveau.

export const ICONES_HUMEUR: Record<NiveauHumeur, string> = {
  1: "sad-outline",
  2: "cloud-outline",
  3: "remove-outline",
  4: "partly-sunny-outline",
  5: "happy-outline",
};