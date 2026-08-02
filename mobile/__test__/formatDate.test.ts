import { formaterDate } from "../src/utils/formatDate";


describe("formaterDate", () => {
  it("transforme une date ISO en texte lisible en francais", () => {
    expect(formaterDate("2026-08-01")).toBe("1 août 2026");
  });

  it("renvoie le texte d'origine si la date est invalide", () => {
    expect(formaterDate("pas-une-date")).toBe("pas-une-date");
  });
});