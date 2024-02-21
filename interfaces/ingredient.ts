export interface OriginalIngredient {
  idIngredient: string;
  strABV: string;
  strAlcohol: string;
  strDescription: string;
  strIngredient: string;
  strType: string;
}

export interface Ingredient {
  ingredientId: string;
  abbreviation: string;
  containsAlcohol: string;
  description: string;
  name: string;
  type: string;
}
