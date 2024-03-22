export interface OriginalIngredient {
  idIngredient: string;
  strABV: string;
  strAlcohol: string;
  strDescription: string | null;
  strIngredient: string;
  strType: string;
}

export interface Ingredient {
  ingredientId: string;
  alcoholByVolume: string | null;
  containsAlcohol: string;
  description: string | null;
  name: string;
  type: string | null;
}
