// EntreeHumeur = la forme d'une humeur enregistrée.

export interface EntreeHumeur {
  id: string;          // identifiant unique de cette humeur (donné par le serveur)
  humeur: NiveauHumeur; // la note choisie, un nombre entre 1 et 5
  date: string;         // le jour où l'humeur a été notée, format "2026-08-01"
  creeLe: string;       // la date ET l'heure exactes de l'enregistrement (format ISO)
}

// NiveauHumeur = les seules valeurs autorisees pour une humeur (1 a 5).

export type NiveauHumeur = 1 | 2 | 3 | 4 | 5;

// StatutReseau = les 4 etats possibles pendant qu'on parle au serveur.

export type StatutReseau = "inactif" | "chargement" | "succes" | "erreur";

// LIBELLES_HUMEUR = le texte a afficher pour chaque niveau d'humeur.

export const LIBELLES_HUMEUR: Record<NiveauHumeur, string> = {
  1: "Très mauvaise",
  2: "Mauvaise",
  3: "Neutre",
  4: "Bonne",
  5: "Excellente",
};