import axios from "axios";
import { EntreeHumeur, NiveauHumeur } from "../types/typeHumeur";

// Adresse du serveur backend
const ADRESSE_SERVEUR = "http://192.168.1.169:4000";

const client = axios.create({
  baseURL: ADRESSE_SERVEUR,
  timeout: 8000, // si le serveur ne repond pas en 8 secondes, on abandonne
});


export async function recupererHumeurs(): Promise<EntreeHumeur[]> {
  try {
    const reponse = await client.get<EntreeHumeur[]>("/api/humeurs");
    return reponse.data;
  } catch (erreur) {
    throw new Error(transformerEnMessageLisible(erreur, "Impossible de recuperer l'historique des humeurs."));
  }
}


export async function envoyerHumeur(humeur: NiveauHumeur): Promise<EntreeHumeur> {
  try {
    const reponse = await client.post<EntreeHumeur>("/api/humeurs", { humeur });
    return reponse.data;
  } catch (erreur) {
    throw new Error(transformerEnMessageLisible(erreur, "Impossible d'enregistrer votre humeur."));
  }
}


function transformerEnMessageLisible(erreur: unknown, messageParDefaut: string): string {
  if (axios.isAxiosError(erreur)) {
    if (!erreur.response) {
      return "Pas de connexion au serveur. Verifiez votre reseau et reessayez.";
    }
    const messageServeur = erreur.response.data?.message;
    return typeof messageServeur === "string" ? messageServeur : messageParDefaut;
  }
  return messageParDefaut;
}