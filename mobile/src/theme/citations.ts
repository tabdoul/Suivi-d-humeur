
const CITATIONS: string[] = [
  "Chaque petit pas compte. Prends un instant pour toi aujourd'hui.",
  "Il est normal de ne pas aller bien tous les jours.",
  "Prendre soin de soi n'est jamais du temps perdu.",
  "Respire. Tu fais de ton mieux, et c'est suffisant.",
  "Une pause n'est pas un echec, c'est une necessite.",
  "Sois aussi bienveillant envers toi qu'envers les autres.",
  "Le calme d'aujourd'hui prepare l'energie de demain.",
  "Reconnaitre ce que l'on ressent est deja un pas en avant.",
  "Un jour a la fois suffit.",
  "Ta valeur ne depend pas de ta productivite du jour.",
];

            // citationDuJour = renvoie toujours la meme citation pour une meme date
export function citationDuJour(): string {
  const jours = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const index = jours % CITATIONS.length;
  return CITATIONS[index];
}