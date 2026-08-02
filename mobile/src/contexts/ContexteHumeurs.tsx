import React, { createContext, ReactNode, useContext } from "react";
import { useSuiviHumeur } from "../hooks/useSuiviHumeur";


type ValeurContexte = ReturnType<typeof useSuiviHumeur>;


const ContexteHumeurs = createContext<ValeurContexte | undefined>(undefined);


export function ProviderHumeurs({ children }: { children: ReactNode }) {
  const valeur = useSuiviHumeur();
  return <ContexteHumeurs.Provider value={valeur}>{children}</ContexteHumeurs.Provider>;
}


export function useSuiviHumeurContext(): ValeurContexte {
  const contexte = useContext(ContexteHumeurs);
  if (!contexte) {
 
    throw new Error("useSuiviHumeurContext doit etre utilise a l'interieur de <ProviderHumeurs>");
  }
  return contexte;
}