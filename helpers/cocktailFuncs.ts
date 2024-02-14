import { Cocktail } from "@/interfaces/cocktails";

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

function normalizeCocktails(cocktails: Cocktail[]) {
  return cocktails.map((cocktail: any) => {
    // Filter out null values and normalize ingredient names to lowercase
    const ingredients = Object.keys(cocktail)
      .filter((key) => key.includes("strIngredient") && cocktail[key])
      .map((key) => cocktail[key].toLowerCase());
    return { ...cocktail, ingredients };
  });
}

export function filterCocktails(
  cocktails: Cocktail[],
  pickedIngredients: string[],
  userAllergies: string[]
): Cocktail[] {
  // Preprocess cocktails to normalize ingredient keys and values
  const normalizedCocktails = normalizeCocktails(cocktails);

  // Convert normalized lowercase pickedIngredients to a Set for efficient lookup
  const pickedIngredientsSet = new Set(
    pickedIngredients.map((ingredient) => ingredient.toLowerCase())
  );

  // Filter cocktails based on picked ingredients
  const filteredCocktails = normalizedCocktails.filter((cocktail: any) =>
    // Ensure every picked ingredient is present in the cocktail's ingredients
    [...pickedIngredientsSet].every((pickedIngredient) =>
      cocktail.ingredients.includes(pickedIngredient)
    )
  );

  if (userAllergies.length === 0) {
    return filteredCocktails;
  }

  // Filter out cocktails with ingredients that the user is allergic to
  const filteredCocktailsWithAllergies = filteredCocktails.filter(
    (cocktail: any) =>
      !userAllergies.some((allergy) =>
        cocktail.ingredients.includes(allergy.toLowerCase())
      )
  );

  return filteredCocktailsWithAllergies;
}

export function getAllCocktails() {
  return fetch("/api/cocktails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.drinks);
}

// aggregates all unique ingredients from cocktails
function getAllCocktailIngredients(cocktails: Cocktail[]) {
  const normalizedCocktails = normalizeCocktails(cocktails); // Normalize cocktail ingredients
  const allIngredients = new Set(); // Use a Set to ensure uniqueness

  normalizedCocktails.forEach((cocktail) => {
    cocktail.ingredients.forEach((ingredient: string) => {
      allIngredients.add(ingredient.toLowerCase()); // Assuming ingredients are already normalized to lowercase
    });
  });

  return allIngredients; // Returns a Set of all unique ingredients
}

// filters out ingredients not used in any cocktail
export function filterUnusedIngredients(
  ingredients: string[],
  cocktails: Cocktail[],
  userAllergies: string[]
) {
  const usedIngredients = getAllCocktailIngredients(cocktails); // Get all used ingredients from cocktails

  // Filter the input list of ingredients to keep only those that are used
  const filteredIngredients = ingredients.filter(
    (ingredient) => usedIngredients.has(ingredient.toLowerCase()) // Ensure case-insensitive comparison
  );

  const lowercaseUserAllergies = userAllergies.map((allergy) =>
    allergy.toLowerCase()
  );

  const filteredIngredientsWithAllergies = filteredIngredients.filter(
    (ingredient) =>
      !lowercaseUserAllergies.some((allergy) =>
        ingredient.toLowerCase().includes(allergy)
      )
  );

  return filteredIngredientsWithAllergies;
}

export function getCocktailsWithIngredient(ingredient: string) {
  return fetch(`/api/cocktails/ingredientName?name=${ingredient}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.drinks);
}
