import { useCallback, useEffect, useState } from "react";
import { envoyerHumeur, recupererHumeurs } from "../services/apiHumeurs";
import { EntreeHumeur, NiveauHumeur, StatutReseau } from "../types/typeHumeur";


interface ResultatHook {
  humeurs: EntreeHumeur[];
  statut: StatutReseau;
  messageErreur: string | null;
  enEnvoi: boolean;
  rafraichir: () => void;
  ajouterHumeur: (humeur: NiveauHumeur, raison?: string) => Promise<boolean>;
}


export function useSuiviHumeur(): ResultatHook {
  const [humeurs, setHumeurs] = useState<EntreeHumeur[]>([]);
  const [statut, setStatut] = useState<StatutReseau>("inactif");
  const [messageErreur, setMessageErreur] = useState<string | null>(null);
  const [enEnvoi, setEnEnvoi] = useState(false);


  const charger = useCallback(async () => {
    setStatut("chargement");
    setMessageErreur(null);
    try {
      const donnees = await recupererHumeurs();
      setHumeurs(donnees);
      setStatut("succes");
    } catch (erreur) {
      setStatut("erreur");
      setMessageErreur(erreur instanceof Error ? erreur.message : "Une erreur est survenue.");
    }
  }, []);


  useEffect(() => {
    charger();
  }, [charger]);

const ajouterHumeur = useCallback(async (humeur: NiveauHumeur, raison?: string): Promise<boolean> => {
  setEnEnvoi(true);
  try {
    const nouvelleEntree = await envoyerHumeur(humeur, raison);
    setHumeurs((precedentes) => [nouvelleEntree, ...precedentes]);
    return true;
  } catch (erreur) {
    setMessageErreur(erreur instanceof Error ? erreur.message : "Une erreur est survenue.");
    return false;
  } finally {
    setEnEnvoi(false);
  }
}, []);

  return { humeurs, statut, messageErreur, enEnvoi, rafraichir: charger, ajouterHumeur };
}