import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { EcranAujourdhui } from "../screens/EcranAujourdhui";
import { EcranHistorique } from "../screens/EcranHistorique";
import { couleurs } from "../theme/couleurs";

/**
 * "Onglets" definit la liste des noms d'ecrans valides pour la navigation
 * par onglets, avec les parametres que chaque ecran peut recevoir (aucun
 * ici, d'ou "undefined").
 */
export type ListeOnglets = {
  Aujourdhui: undefined;
  Historique: undefined;
};

const Tab = createBottomTabNavigator<ListeOnglets>();

/**
 * Navigation = le composant racine de la navigation. Definit les deux
 * onglets (Aujourdhui / Historique), avec leurs icones et couleurs.
 * A utiliser dans App.tsx, a l'interieur de ProviderHumeurs (pour que les
 * deux ecrans aient acces aux memes donnees partagees).
 */
export function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: couleurs.principal,
          tabBarInactiveTintColor: couleurs.texteAttenue,
          tabBarStyle: {
            backgroundColor: couleurs.surface,
            borderTopColor: couleurs.bordure,
          },
          tabBarIcon: ({ color, size }) => {
            const nomIcone = route.name === "Aujourdhui" ? "today-outline" : "time-outline";
            return <Ionicons name={nomIcone} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Aujourdhui" component={EcranAujourdhui} options={{ title: "Aujourd'hui" }} />
        <Tab.Screen name="Historique" component={EcranHistorique} options={{ title: "Historique" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}