
const express = require("express");
const cors = require("cors");

const application = express();
application.use(cors());
application.use(express.json());

// Délai volontaire pour que l'état "chargement" soit réellement visible
// côté mobile (sinon la réponse est instantanée en local).
const DELAI_RESEAU_MS = 800;

/** @type {{ id: string, humeur: number, date: string, creeLe: string }[]} */
let humeurs = [
  {
    id: "seed-1",
    humeur: 4,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    creeLe: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-2",
    humeur: 3,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    creeLe: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

function avecDelaiReseau(gestionnaire) {
  return (requete, reponse) => setTimeout(() => gestionnaire(requete, reponse), DELAI_RESEAU_MS);
}

application.get(
  "/api/humeurs",
  avecDelaiReseau((requete, reponse) => {
    if (requete.query.echec === "1") {
      return reponse.status(500).json({ message: "Erreur interne simulée du serveur" });
    }
    const humeursTriees = [...humeurs].sort((a, b) => b.creeLe.localeCompare(a.creeLe));
    reponse.status(200).json(humeursTriees);
  })
);

application.post(
  "/api/humeurs",
  avecDelaiReseau((requete, reponse) => {
    const { humeur } = requete.body;

    if (typeof humeur !== "number" || humeur < 1 || humeur > 5) {
      return reponse.status(400).json({ message: "'humeur' doit être un nombre entre 1 et 5" });
    }

    const maintenant = new Date();
    const nouvelleEntree = {
      id: String(Date.now()),
      humeur,
      date: maintenant.toISOString().slice(0, 10),
      creeLe: maintenant.toISOString(),
    };

    humeurs.push(nouvelleEntree);
    reponse.status(201).json(nouvelleEntree);
  })
);

const PORT = process.env.PORT || 4000;
application.listen(PORT, () => {
  console.log(`Serveur ULTEAM (simulé) démarré sur http://localhost:${PORT}`);
});