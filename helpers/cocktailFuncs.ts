const ingredientKeys = [
  "strIngredient1",
  "strIngredient2",
  "strIngredient3",
  "strIngredient4",
  "strIngredient5",
  "strIngredient6",
  "strIngredient7",
  "strIngredient8",
  "strIngredient9",
  "strIngredient10",
  "strIngredient11",
  "strIngredient12",
  "strIngredient13",
  "strIngredient14",
  "strIngredient15",
];

export function getNonNullIngredientKeys(ingredientObj: any) {
  return ingredientKeys.filter((key) => ingredientObj[key]);
}
