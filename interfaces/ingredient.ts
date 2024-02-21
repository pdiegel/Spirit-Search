export interface OriginalIngredient {
  idIngredient: string;
  strABV: string | null;
  strAlcohol: string | null;
  strDescription: string;
  strIngredient: string;
  strType: string | null;
}

export interface Ingredient {
  ingredientId: string;
  abbreviation: string | null;
  containsAlcohol: string | null;
  description: string;
  name: string;
  type: string | null;
}
