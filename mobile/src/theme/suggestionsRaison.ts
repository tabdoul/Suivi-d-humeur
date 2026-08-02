import { NiveauHumeur } from "../types/typeHumeur";


export const SUGGESTIONS_RAISON: Record<NiveauHumeur, string[]> = {
  1: ["Pas trouve d'alternance", "Journee difficile", "Stress", "Fatigue"],
  2: ["Journee compliquee", "Un peu de stress", "Manque de motivation"],
  3: ["Journee ordinaire", "Rien de particulier", "Entretien a venir"],
  4: ["Bonne nouvelle", "Entretien qui s'est bien passe", "Journee productive"],
  5: ["Embauche!!! CHEZ ULTEAM", "Tres bonne nouvelle", "Journee excellente"],
};